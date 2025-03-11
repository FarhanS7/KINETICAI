"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type, jobDescription = "" }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });
  if (!user) throw new Error("User not found");

  const jobKeywords = jobDescription
    ? `Consider these specific job description keywords: "${jobDescription}"`
    : `Focus on standard ${user.industry} industry keywords`;

  const prompt = `As an expert resume writer specializing in ATS optimization, improve the following ${type} description for a ${user.industry} professional.

Current content: "${current}"

${jobKeywords}

Optimization requirements:
1. Use powerful action verbs at the beginning of bullet points
2. Include specific, quantifiable metrics and results (numbers, percentages, dollar amounts)
3. Incorporate 4-6 relevant hard technical skills and industry-specific keywords for ATS scanning
4. Maintain proper formatting for ATS compatibility (no tables, columns, headers, or footers)
5. Focus on achievements and impact rather than just responsibilities
6. Use industry-standard terminology that matches common job descriptions
7. Keep entries concise (25-35 words per bullet point)
8. Avoid abbreviations unless they are industry-standard
9. Include relevant certifications, systems, and tools with proper formatting

Format the response as clean bullet points or a single paragraph (depending on the section type) without any additional text or explanations. Ensure it flows naturally while maximizing keyword density for ATS systems.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const improvedContent = response.text().trim();

    // Save this optimization to analytics (optional future feature)
    // await db.resumeOptimization.create({
    //   data: {
    //     userId: user.id,
    //     sectionType: type,
    //     originalContent: current,
    //     optimizedContent: improvedContent,
    //   },
    // });

    return improvedContent;
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}

export async function analyzeSectionForATS({ content, jobDescription = "" }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const prompt = `Analyze this resume section for ATS compatibility:
  
  "${content}"
  
  ${jobDescription ? `For this job description: "${jobDescription}"` : ""}
  
  Provide a score out of 100 and 3 specific improvement suggestions to better pass ATS systems.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Error analyzing content:", error);
    throw new Error("Failed to analyze content");
  }
}

export async function extractKeywordsFromJob(jobDescription) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const prompt = `Extract the most important 10-15 keywords and skills from this job description that an ATS system would likely scan for:
  
  "${jobDescription}"
  
  Format as a simple comma-separated list of keywords without numbering or additional explanation.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Error extracting keywords:", error);
    throw new Error("Failed to extract keywords");
  }
}
