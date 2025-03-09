import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Quiz from "../_components/quiz";

export default function MockInterviewPage() {
  return (
    <div className="container mx-auto space-y-6 py-8 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 rounded-xl overflow-hidden -m-4">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      </div>

      {/* Glowing elements */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="flex flex-col space-y-2 mx-2 relative">
        <Link href="/interview">
          <Button
            variant="ghost"
            className="gap-2 pl-0 text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 group relative overflow-hidden"
          >
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-cyan-500/10 to-transparent group-hover:w-full transition-all duration-300"></span>
            <ArrowLeft className="h-4 w-4 relative z-10" />
            <span className="relative z-10">Back to Interview Preparation</span>
          </Button>
        </Link>

        <div className="relative">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight relative group">
            Mock Interview
            <span className="absolute -inset-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </h1>
          <div className="absolute -bottom-1 left-0 w-24 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
          <p className="text-gray-400 mt-2">
            Test your knowledge with industry-specific questions
          </p>

          {/* Animated typing indicator */}
          <div className="absolute -right-2 top-1/2 flex space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-150"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse delay-300"></div>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Light glint on edge */}
        <div className="absolute -top-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

        <Quiz />

        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-500/30"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-500/30"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-500/30"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-500/30"></div>
      </div>

      {/* Animated particles */}
      <div className="absolute top-1/3 right-10 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping"></div>
      <div className="absolute left-10 bottom-1/3 w-1 h-1 bg-blue-400/60 rounded-full animate-ping delay-500"></div>
    </div>
  );
}
