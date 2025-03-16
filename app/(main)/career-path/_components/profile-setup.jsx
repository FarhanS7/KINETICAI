// app/(main)/career-path/_components/profile-setup.jsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Save, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// This would be a server action that updates the user's profile
async function updateUserProfile(data) {
  const response = await fetch("/api/user/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
}

export default function ProfileSetup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    industry: "",
    jobTitle: "",
    experience: "",
    skills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Process skills into an array
      const processedData = {
        ...formData,
        experience: parseInt(formData.experience, 10) || 0,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      await updateUserProfile(processedData);
      router.refresh();
    } catch (error) {
      console.error("Error updating profile:", error);
      // Here you might want to show an error message
    } finally {
      setLoading(false);
    }
  };

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Marketing",
    "Sales",
    "Design",
    "Engineering",
    "Hospitality",
    "Retail",
    "Manufacturing",
    "Consulting",
  ];

  return (
    <Card className="border border-indigo-800/20 bg-black/30 backdrop-blur-md">
      <CardHeader className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
        <CardTitle className="text-xl font-semibold text-indigo-100 flex items-center">
          <UserPlus className="w-5 h-5 mr-2 text-indigo-400" />
          Complete Your Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-indigo-200 text-sm mb-6">
          To generate a personalized career roadmap, we need some information
          about your professional background.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-indigo-200">
                Industry
              </Label>
              <Select
                name="industry"
                value={formData.industry}
                onValueChange={(value) => handleSelectChange("industry", value)}
                required
              >
                <SelectTrigger className="bg-indigo-950/30 border-indigo-700/30 text-indigo-100">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-indigo-200">
                Current Job Title
              </Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Software Engineer"
                className="bg-indigo-950/30 border-indigo-700/30 text-indigo-100 placeholder:text-indigo-400/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="text-indigo-200">
                Years of Experience
              </Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                min="0"
                max="50"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 5"
                className="bg-indigo-950/30 border-indigo-700/30 text-indigo-100 placeholder:text-indigo-400/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills" className="text-indigo-200">
                Key Skills (comma separated)
              </Label>
              <Input
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. JavaScript, React, Node.js"
                className="bg-indigo-950/30 border-indigo-700/30 text-indigo-100 placeholder:text-indigo-400/50"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 w-full mt-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving Profile...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save & Continue
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
