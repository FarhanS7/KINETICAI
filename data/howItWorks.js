import { FileEdit, LineChart, UserPlus, Users } from "lucide-react";

export const howItWorks = [
  {
    title: "Initial Onboarding",
    description:
      "Provide your professional background for a personalized experience.",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    title: "Craft Your Professional Documents",
    description:
      "Build tailored resumes and impactful cover letters that stand out.",
    icon: <FileEdit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Prepare with AI-Powered Mock Interviews",
    description:
      "Practice with customized interview simulations for your specific role and get instant feedback.",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Track Your Growth",
    description:
      "Monitor your improvement with detailed performance reports and actionable insights.",
    icon: <LineChart className="w-8 h-8 text-primary" />,
  },
];
