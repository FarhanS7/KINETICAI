"use client";

import {
  analyzeSectionForATS,
  extractKeywordsFromJob,
  improveWithAI,
  saveResume,
} from "@/actions/resume";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
// Remove direct import of html2pdf.js
// import html2pdf from "html2pdf.js";

import {
  AlertTriangle,
  BadgeCheck,
  CheckCircle,
  Download,
  Edit,
  FileText,
  Loader2,
  Monitor,
  PlusCircle,
  Save,
  Target,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { EntryForm } from "./entry-form";

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");
  const [atsScore, setAtsScore] = useState(null);
  const [atsScoreLoading, setAtsScoreLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [showJobDescriptionDialog, setShowJobDescriptionDialog] =
    useState(false);
  const [extractedKeywords, setExtractedKeywords] = useState([]);
  const [keywordsLoading, setKeywordsLoading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [optimizationSuggestions, setOptimizationSuggestions] = useState([]);
  // Add state to hold the dynamically imported html2pdf.js
  const [html2pdfLib, setHtml2pdfLib] = useState(null);

  const jobDescriptionRef = useRef(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
      jobDescription: "",
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improveResult,
    error: improveError,
  } = useFetch(improveWithAI);

  // Watch form fields for preview updates
  const formValues = watch();

  // Dynamically import html2pdf.js only on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("html2pdf.js")
        .then((module) => {
          setHtml2pdfLib(module.default);
        })
        .catch((err) => {
          console.error("Failed to load html2pdf.js:", err);
        });
    }
  }, []);

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  // Update preview content when form values change
  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  // Handle save result
  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user?.fullName || "Your Name"}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    // Check if html2pdfLib has been loaded
    if (!html2pdfLib) {
      toast.error(
        "PDF generation library is still loading. Please try again in a moment."
      );
      return;
    }

    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-pdf");
      const opt = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdfLib().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formattedContent = previewContent
        .replace(/\n/g, "\n") // Normalize newlines
        .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
        .trim();

      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const handleAtsAnalysis = async () => {
    setAtsScoreLoading(true);
    try {
      const response = await analyzeSectionForATS({
        content: previewContent,
        jobDescription: jobDescription,
      });

      setAtsScore(response);
      toast.success("ATS analysis completed!");
    } catch (error) {
      toast.error("Failed to analyze resume for ATS compatibility");
    } finally {
      setAtsScoreLoading(false);
    }
  };

  const handleExtractKeywords = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description first");
      return;
    }

    setKeywordsLoading(true);
    try {
      const keywords = await extractKeywordsFromJob(jobDescription);
      setExtractedKeywords(keywords.split(",").map((k) => k.trim()));
      toast.success("Keywords extracted successfully!");
    } catch (error) {
      toast.error("Failed to extract keywords");
    } finally {
      setKeywordsLoading(false);
    }
  };

  const handleOptimizeSection = async (section) => {
    setIsOptimizing(true);
    setSelectedSection(section);

    try {
      let current = "";
      switch (section) {
        case "summary":
          current = getValues("summary");
          break;
        case "skills":
          current = getValues("skills");
          break;
      }

      if (!current) {
        toast.error(`Your ${section} section is empty`);
        setIsOptimizing(false);
        return;
      }

      const improved = await improveWithAIFn({
        current,
        type: section.charAt(0).toUpperCase() + section.slice(1),
        jobDescription: jobDescription,
      });

      if (improved) {
        setValue(section, improved);
        toast.success(
          `${
            section.charAt(0).toUpperCase() + section.slice(1)
          } optimized for ATS!`
        );
      }
    } catch (error) {
      toast.error(`Failed to optimize ${section}`);
    } finally {
      setIsOptimizing(false);
      setSelectedSection(null);
    }
  };

  const optimizeEntryDescription = async (type, index) => {
    setIsOptimizing(true);

    try {
      const entries = getValues(type);
      const current = entries[index].description;

      if (!current) {
        toast.error("Description is empty");
        setIsOptimizing(false);
        return;
      }

      const improved = await improveWithAIFn({
        current,
        type:
          type === "experience"
            ? "Work Experience"
            : type.charAt(0).toUpperCase() + type.slice(1),
        jobDescription: jobDescription,
      });

      if (improved) {
        const updatedEntries = [...entries];
        updatedEntries[index] = {
          ...updatedEntries[index],
          description: improved,
        };
        setValue(type, updatedEntries);
        toast.success("Description optimized for ATS!");
      }
    } catch (error) {
      toast.error("Failed to optimize description");
    } finally {
      setIsOptimizing(false);
    }
  };

  const parseAtsScore = (scoreText) => {
    if (!scoreText) return null;

    try {
      // Simple regex to extract a score out of 100
      const scoreMatch = scoreText.match(/(\d+)(?:\s*\/\s*100|%)/);
      return scoreMatch ? parseInt(scoreMatch[1]) : null;
    } catch (error) {
      return null;
    }
  };

  const renderAtsScore = () => {
    if (!atsScore) return null;

    const numericScore = parseAtsScore(atsScore);
    const scoreColor =
      numericScore > 80
        ? "text-green-600"
        : numericScore > 60
        ? "text-amber-600"
        : "text-red-600";

    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            ATS Compatibility Analysis
          </CardTitle>
          {numericScore && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span>Score:</span>
                <span className={`font-bold ${scoreColor}`}>
                  {numericScore}/100
                </span>
              </div>
              <Progress value={numericScore} className="h-2" />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{atsScore}</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderKeywords = () => {
    if (!extractedKeywords || extractedKeywords.length === 0) return null;

    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5" />
            Key ATS Keywords
          </CardTitle>
          <CardDescription>
            Include these keywords in your resume to improve ATS compatibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {extractedKeywords.map((keyword, index) => (
              <Badge key={index} variant="secondary">
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div data-color-mode="light" className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">
          Resume Builder
        </h1>
        <div className="space-x-2 flex">
          <Button
            variant="outline"
            onClick={() => setShowJobDescriptionDialog(true)}
            className="mr-2"
          >
            <FileText className="h-4 w-4 mr-2" />
            Add Job Description
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </Button>
          <Button onClick={generatePDF} disabled={isGenerating || !html2pdfLib}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ATS Optimization Panel */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>ATS Optimization</CardTitle>
          <CardDescription>
            Optimize your resume for Applicant Tracking Systems (ATS)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {jobDescription ? (
                <Badge variant="outline" className="py-2 px-3">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Job Description Added
                </Badge>
              ) : (
                <Badge variant="outline" className="py-2 px-3 bg-amber-50">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                  Add Job Description for Better Results
                </Badge>
              )}

              <Button
                onClick={handleAtsAnalysis}
                disabled={atsScoreLoading}
                variant="outline"
              >
                {atsScoreLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Target className="h-4 w-4 mr-2" />
                )}
                Analyze ATS Compatibility
              </Button>

              {jobDescription && (
                <Button
                  onClick={handleExtractKeywords}
                  disabled={keywordsLoading}
                  variant="outline"
                >
                  {keywordsLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <BadgeCheck className="h-4 w-4 mr-2" />
                  )}
                  Extract Keywords
                </Button>
              )}
            </div>

            {renderKeywords()}
            {renderAtsScore()}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    {...register("contactInfo.email")}
                    type="email"
                    placeholder="your@email.com"
                    error={errors.contactInfo?.email}
                  />
                  {errors.contactInfo?.email && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mobile Number</label>
                  <Input
                    {...register("contactInfo.mobile")}
                    type="tel"
                    placeholder="+1 234 567 8900"
                  />
                  {errors.contactInfo?.mobile && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.mobile.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">LinkedIn URL</label>
                  <Input
                    {...register("contactInfo.linkedin")}
                    type="url"
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                  {errors.contactInfo?.linkedin && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.linkedin.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Twitter/X Profile
                  </label>
                  <Input
                    {...register("contactInfo.twitter")}
                    type="url"
                    placeholder="https://twitter.com/your-handle"
                  />
                  {errors.contactInfo?.twitter && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.twitter.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Professional Summary</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOptimizeSection("summary")}
                  disabled={isOptimizing && selectedSection === "summary"}
                >
                  {isOptimizing && selectedSection === "summary" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <PlusCircle className="h-4 w-4 mr-2" />
                  )}
                  Optimize for ATS
                </Button>
              </div>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32"
                    placeholder="Write a compelling professional summary..."
                    error={errors.summary}
                  />
                )}
              />
              {errors.summary && (
                <p className="text-sm text-red-500">{errors.summary.message}</p>
              )}
              <div className="text-sm text-muted-foreground">
                <strong>ATS Tip:</strong> Include 3-4 key skills and
                quantifiable achievements relevant to the position.
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Skills</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOptimizeSection("skills")}
                  disabled={isOptimizing && selectedSection === "skills"}
                >
                  {isOptimizing && selectedSection === "skills" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <PlusCircle className="h-4 w-4 mr-2" />
                  )}
                  Optimize for ATS
                </Button>
              </div>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32"
                    placeholder="List your key skills..."
                    error={errors.skills}
                  />
                )}
              />
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
              <div className="text-sm text-muted-foreground">
                <strong>ATS Tip:</strong> List both technical and soft skills.
                Match keywords from the job description.
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Work Experience</h3>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Experience"
                    entries={field.value}
                    onChange={field.onChange}
                    onOptimize={(index) =>
                      optimizeEntryDescription("experience", index)
                    }
                    isOptimizing={isOptimizing}
                  />
                )}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
              <div className="text-sm text-muted-foreground">
                <strong>ATS Tip:</strong> Start bullet points with strong action
                verbs. Include specific metrics and achievements.
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Education</h3>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Education"
                    entries={field.value}
                    onChange={field.onChange}
                    onOptimize={(index) =>
                      optimizeEntryDescription("education", index)
                    }
                    isOptimizing={isOptimizing}
                  />
                )}
              />
              {errors.education && (
                <p className="text-sm text-red-500">
                  {errors.education.message}
                </p>
              )}
              <div className="text-sm text-muted-foreground">
                <strong>ATS Tip:</strong> Include relevant coursework, GPA (if
                strong), and academic achievements.
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Projects</h3>
              <Controller
                name="projects"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Project"
                    entries={field.value}
                    onChange={field.onChange}
                    onOptimize={(index) =>
                      optimizeEntryDescription("projects", index)
                    }
                    isOptimizing={isOptimizing}
                  />
                )}
              />
              {errors.projects && (
                <p className="text-sm text-red-500">
                  {errors.projects.message}
                </p>
              )}
              <div className="text-sm text-muted-foreground">
                <strong>ATS Tip:</strong> Focus on projects that demonstrate
                relevant skills. Include technologies used.
              </div>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="preview">
          {activeTab === "preview" && (
            <Button
              variant="link"
              type="button"
              className="mb-2"
              onClick={() =>
                setResumeMode(resumeMode === "preview" ? "edit" : "preview")
              }
            >
              {resumeMode === "preview" ? (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Resume
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4 mr-2" />
                  Show Preview
                </>
              )}
            </Button>
          )}

          {activeTab === "preview" && resumeMode !== "preview" && (
            <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">
                You will lose edited markdown if you update the form data.
              </span>
            </div>
          )}
          <div className="border rounded-lg">
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
            />
          </div>
          <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown
                source={previewContent}
                style={{
                  background: "white",
                  color: "black",
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Job Description Dialog */}
      <Dialog
        open={showJobDescriptionDialog}
        onOpenChange={setShowJobDescriptionDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Job Description</DialogTitle>
            <DialogDescription>
              Paste the job description to optimize your resume for ATS
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              ref={jobDescriptionRef}
              placeholder="Paste job description here..."
              className="min-h-[200px]"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setShowJobDescriptionDialog(false)}>
              Save & Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
