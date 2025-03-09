import { getAssessments } from "@/actions/interview";
import PerformanceChart from "./_components/performance-chart";
import QuizList from "./_components/quiz-list";
import StatsCards from "./_components/stats-cards";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();

  return (
    <div className="relative">
      {/* Background elements */}
      <div className="absolute -inset-6 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl opacity-70"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-10 rounded-xl"></div>
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 border border-gray-700/30 rounded-xl"></div>
      </div>

      <div className="flex items-center justify-between mb-8 relative">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
          Interview Preparation
          <div className="absolute -bottom-1 left-0 w-24 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
        </h1>

        {/* Optional animated indicator */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500/70 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500/70 animate-pulse delay-150"></div>
          <div className="w-2 h-2 rounded-full bg-indigo-500/70 animate-pulse delay-300"></div>
        </div>
      </div>

      <div className="space-y-8 relative">
        {/* Subtle connecting line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/20 via-blue-500/10 to-transparent"></div>

        <div className="transform transition-all duration-300 hover:scale-[1.01] relative">
          <StatsCards assessments={assessments} />
          {/* Animated accent */}
          <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-cyan-500/50"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-cyan-500/50"></div>
        </div>

        <div className="transform transition-all duration-300 hover:scale-[1.01] relative">
          <PerformanceChart assessments={assessments} />
          {/* Animated accent */}
          <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-blue-500/50"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-blue-500/50"></div>
        </div>

        <div className="transform transition-all duration-300 hover:scale-[1.01] relative">
          <QuizList assessments={assessments} />
          {/* Animated accent */}
          <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-indigo-500/50"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-indigo-500/50"></div>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute top-1/4 right-10 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping"></div>
      <div className="absolute left-10 bottom-1/3 w-1 h-1 bg-blue-400/60 rounded-full animate-ping delay-300"></div>
      <div className="absolute right-1/4 bottom-10 w-1 h-1 bg-indigo-400/60 rounded-full animate-ping delay-700"></div>
    </div>
  );
}
