"use client";

import { updateUser } from "@/actions/user";
import { onboardingSchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch"; // Correct import of the useFetch hook
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  // Using the useFetch hook to fetch data
  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const watchIndustry = watch("industry");

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-15"></div>

      {/* Moving light effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      <Card className="w-full max-w-lg mt-10 mx-2 bg-gray-900/60 backdrop-blur-sm border border-gray-800 relative overflow-hidden">
        {/* Card decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full opacity-30"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-tr-full opacity-30"></div>

        {/* Animated corner accent */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/70"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500/70"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500/70"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/70"></div>

        <CardHeader>
          <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-4xl font-bold tracking-tight relative">
            Complete Your Profile
            <div className="absolute -bottom-1 left-0 w-20 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
          </CardTitle>
          <CardDescription className="text-gray-400">
            Select your industry to get personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="industry"
                className="text-gray-300 flex items-center"
              >
                <span className="w-1 h-1 bg-cyan-500 rounded-full mr-2"></span>
                Industry
              </Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value)
                  );
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger
                  id="industry"
                  className="bg-gray-800/80 border-gray-700 text-gray-200 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                >
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <SelectGroup>
                    <SelectLabel className="text-gray-400">
                      Industries
                    </SelectLabel>
                    {industries.map((ind) => (
                      <SelectItem
                        key={ind.id}
                        value={ind.id}
                        className="focus:bg-gray-700 focus:text-cyan-300"
                      >
                        {ind.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-400">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {watchIndustry && (
              <div className="space-y-2">
                <Label
                  htmlFor="subIndustry"
                  className="text-gray-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  Specialization
                </Label>
                <Select
                  onValueChange={(value) => setValue("subIndustry", value)}
                >
                  <SelectTrigger
                    id="subIndustry"
                    className="bg-gray-800/80 border-gray-700 text-gray-200 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                  >
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                    <SelectGroup>
                      <SelectLabel className="text-gray-400">
                        Specializations
                      </SelectLabel>
                      {selectedIndustry?.subIndustries.map((sub) => (
                        <SelectItem
                          key={sub}
                          value={sub}
                          className="focus:bg-gray-700 focus:text-cyan-300"
                        >
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-400">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="experience"
                className="text-gray-300 flex items-center"
              >
                <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2"></span>
                Years of Experience
              </Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                className="bg-gray-800/80 border-gray-700 text-gray-200 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-sm text-red-400">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="skills"
                className="text-gray-300 flex items-center"
              >
                <span className="w-1 h-1 bg-cyan-500 rounded-full mr-2"></span>
                Skills
              </Label>
              <Input
                id="skills"
                placeholder="e.g., Python, JavaScript, Project Management"
                className="bg-gray-800/80 border-gray-700 text-gray-200 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                {...register("skills")}
              />
              <p className="text-sm text-gray-500">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-400">{errors.skills.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-300 flex items-center">
                <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                Professional Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background..."
                className="h-32 bg-gray-800/80 border-gray-700 text-gray-200 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-red-400">{errors.bio.message}</p>
              )}
            </div>

            <Button
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 relative group overflow-hidden"
              type="submit"
              disabled={updateLoading}
            >
              {/* Button shine effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></span>

              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <span className="relative z-10 flex items-center justify-center">
                  Complete Profile
                </span>
              )}
            </Button>
          </form>
        </CardContent>

        {/* Animated particles */}
        <div className="absolute top-1/4 right-10 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping"></div>
        <div className="absolute left-10 bottom-1/3 w-1 h-1 bg-blue-400/60 rounded-full animate-ping delay-300"></div>
        <div className="absolute right-1/4 bottom-10 w-1 h-1 bg-indigo-400/60 rounded-full animate-ping delay-700"></div>
      </Card>
    </div>
  );
};

export default OnboardingForm;
