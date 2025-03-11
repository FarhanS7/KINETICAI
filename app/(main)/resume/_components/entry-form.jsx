"use client";

import { improveWithAI } from "@/actions/resume";
import { entrySchema } from "@/app/lib/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import {
  AlertTriangle,
  BadgeCheck,
  Loader2,
  PlusCircle,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export function EntryForm({
  type,
  entries,
  onChange,
  onOptimize,
  isOptimizing,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [optimizingIndex, setOptimizingIndex] = useState(null);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const current = watch("current");

  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "Present" : formatDisplayDate(data.endDate),
    };

    onChange([...entries, formattedEntry]);

    reset();
    setIsAdding(false);
    toast.success(`${type} added successfully!`);
  });

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
    toast.success(`${type} removed`);
  };

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  // Add this effect to handle the improvement result
  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved for ATS compatibility!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve description");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  // Handle improvement of description for new entries
  const handleImproveDescription = async () => {
    const description = watch("description");
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    await improveWithAIFn({
      current: description,
      type: type === "Experience" ? "Work Experience" : type,
      jobDescription: "", // We don't have access to job description here directly
    });
  };

  // Handle optimization of existing entries
  const handleOptimizeEntry = async (index) => {
    if (onOptimize) {
      setOptimizingIndex(index);
      await onOptimize(index);
      setOptimizingIndex(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {entries.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title} @ {item.organization}
              </CardTitle>
              <div className="flex space-x-2">
                {/* Add asChild prop to avoid button nesting issues */}
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => handleOptimizeEntry(index)}
                  disabled={isOptimizing || optimizingIndex === index}
                  asChild={false}
                >
                  {isOptimizing && optimizingIndex === index ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <BadgeCheck className="h-4 w-4" />
                  )}
                  <span className="ml-2 hidden sm:inline">ATS Optimize</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => handleDelete(index)}
                  asChild={false}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {item.current || item.endDate === "Present"
                  ? `${item.startDate} - Present`
                  : `${item.startDate} - ${item.endDate}`}
              </p>
              <p className="mt-2 text-sm whitespace-pre-wrap">
                {item.description}
              </p>

              {/* ATS Tips */}
              {type === "Experience" && (
                <div className="mt-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="mr-2 bg-blue-50">
                    <AlertTriangle className="h-3 w-3 mr-1 text-blue-600" />
                    ATS Tip
                  </Badge>
                  Use action verbs and include metrics where possible.
                </div>
              )}
              {type === "Education" && (
                <div className="mt-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="mr-2 bg-blue-50">
                    <AlertTriangle className="h-3 w-3 mr-1 text-blue-600" />
                    ATS Tip
                  </Badge>
                  Include relevant coursework and academic achievements.
                </div>
              )}
              {type === "Project" && (
                <div className="mt-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="mr-2 bg-blue-50">
                    <AlertTriangle className="h-3 w-3 mr-1 text-blue-600" />
                    ATS Tip
                  </Badge>
                  Mention technologies used and quantifiable outcomes.
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Add {type}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  placeholder="Title/Position"
                  {...register("title")}
                  error={errors.title}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Organization/Company"
                  {...register("organization")}
                  error={errors.organization}
                />
                {errors.organization && (
                  <p className="text-sm text-red-500">
                    {errors.organization.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  type="month"
                  {...register("startDate")}
                  error={errors.startDate}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-500">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  type="month"
                  {...register("endDate")}
                  disabled={current}
                  error={errors.endDate}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-500">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="current"
                {...register("current")}
                onChange={(e) => {
                  setValue("current", e.target.checked);
                  if (e.target.checked) {
                    setValue("endDate", "");
                  }
                }}
              />
              <label htmlFor="current">Current {type}</label>
            </div>

            <div className="space-y-2">
              <Textarea
                placeholder={`Description of your ${type.toLowerCase()}`}
                className="h-32"
                {...register("description")}
                error={errors.description}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="bg-muted/30 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                ATS Optimization Tips
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                {type === "Experience" && (
                  <>
                    <li>
                      • Start bullets with strong action verbs (Developed, Led,
                      Orchestrated)
                    </li>
                    <li>
                      • Include metrics and quantifiable results (%, $, time
                      saved)
                    </li>
                    <li>
                      • Mention specific technologies and tools relevant to
                      target roles
                    </li>
                    <li>
                      • Focus on achievements rather than responsibilities
                    </li>
                  </>
                )}
                {type === "Education" && (
                  <>
                    <li>• Include GPA if above 3.5</li>
                    <li>
                      • List relevant coursework that matches job requirements
                    </li>
                    <li>
                      • Mention academic achievements, honors, or scholarships
                    </li>
                    <li>• Include certifications and training programs</li>
                  </>
                )}
                {type === "Project" && (
                  <>
                    <li>• Highlight technologies and methodologies used</li>
                    <li>• Quantify project outcomes and achievements</li>
                    <li>• Mention your specific role and contributions</li>
                    <li>• Link to repositories or live demos if applicable</li>
                  </>
                )}
              </ul>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleImproveDescription}
              disabled={isImproving || !watch("description")}
              className="w-full"
              asChild={false}
            >
              {isImproving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Optimizing for ATS...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Optimize Description for ATS
                </>
              )}
            </Button>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
              asChild={false}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleAdd} asChild={false}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </CardFooter>
        </Card>
      )}

      {!isAdding && (
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setIsAdding(true)}
          asChild={false}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {type}
        </Button>
      )}
    </div>
  );
}
