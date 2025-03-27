"use server";

import { db } from "@/lib/prisma"; // Ensure this is correctly set up
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateCareerRoadmap() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        id: true,
        name: true,
        industry: true,
        skills: true,
        experience: true,
        jobTitle: true,
        careerGoals: true,
      },
    });

    if (!user) throw new Error("User not found");

    const prompt = `
      Generate a personalized 5-year career roadmap for a ${
        user.industry
      } professional${
      user.jobTitle ? ` currently working as a ${user.jobTitle}` : ""
    }${user.skills?.length ? ` with skills in ${user.skills.join(", ")}` : ""}${
      user.experience ? ` and ${user.experience} years of experience` : ""
    }${
      user.careerGoals
        ? `. Their stated career goals are: ${user.careerGoals}`
        : ""
    }.
      
      Include:
      1. A progression of potential job titles/roles over the 5 years
      2. Key skills to develop at each stage
      3. Certifications or education that would be valuable
      4. Industry trends that might affect this career path
      5. Estimated salary ranges for each stage
      
      Return the response in this JSON format only, no additional text:
      {
        "currentProfile": {
          "title": "string",
          "skills": ["string"],
          "estimatedSalary": "string"
        },
        "roadmap": [
          {
            "timeframe": "string",
            "role": "string",
            "keySkills": ["string"],
            "certifications": ["string"],
            "estimatedSalary": "string",
            "description": "string"
          }
        ],
        "industryTrends": ["string"],
        "alternativePaths": [
          {
            "pathName": "string",
            "description": "string",
            "potentialRoles": ["string"]
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response; // Await properly
    const text = await response.text(); // Await `.text()` properly
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const roadmap = JSON.parse(cleanedText);

    await saveCareerRoadmap(user.id, roadmap);

    return roadmap;
  } catch (error) {
    console.error("Error generating career roadmap:", error);
    return null;
  }
}

async function saveCareerRoadmap(userId, roadmapData) {
  try {
    if (!db) {
      throw new Error("Database client not initialized.");
    }

    const existingRoadmap = await db.careerRoadmap.findFirst({
      where: { userId },
    });

    if (existingRoadmap) {
      await db.careerRoadmap.update({
        where: { id: existingRoadmap.id },
        data: {
          data: roadmapData,
          updatedAt: new Date(),
        },
      });
    } else {
      await db.careerRoadmap.create({
        data: {
          userId,
          data: roadmapData,
        },
      });
    }
  } catch (error) {
    console.error("Error saving career roadmap:", error);
    return null;
  }
}

export async function getUserRoadmap() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    if (!db) {
      throw new Error("Database client not initialized.");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const roadmap = await db.careerRoadmap.findFirst({
      where: { userId: user.id },
    });

    return roadmap?.data || null;
  } catch (error) {
    console.error("Error fetching roadmap:", error);
    return null;
  }
}

export async function updateCareerGoals(goals) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    if (!db) {
      throw new Error("Database client not initialized.");
    }

    await db.user.update({
      where: { clerkUserId: userId },
      data: { careerGoals: goals },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating career goals:", error);
    return null;
  }
}
