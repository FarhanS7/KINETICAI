"use client";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QuizResult from "./quiz-result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <Card className="relative overflow-hidden border-0 bg-transparent">
        {/* Background gradients and effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 rounded-xl"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-20 rounded-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-purple-500/10 rounded-xl"></div>

        {/* Moving light effects */}
        <div className="absolute -top-10 right-1/4 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-pulse opacity-70"></div>
        <div className="absolute -bottom-10 left-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse opacity-70"></div>

        {/* Edge highlight */}
        <div className="absolute inset-0 rounded-xl border border-indigo-500/20"></div>

        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-white text-3xl md:text-4xl font-extrabold transform transition-transform duration-500 hover:scale-105">
                Recent Quizzes
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Review your past quiz performance
              </CardDescription>
            </div>
            <Button
              onClick={() => router.push("/interview/mock")}
              className="h-12 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-md font-semibold shadow-xl transition-all duration-300 hover:shadow-indigo-500/30 transform hover:scale-105 relative overflow-hidden group border-none"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></span>
              <span className="relative z-10 flex items-center">
                Start New Quiz{" "}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="space-y-4">
            {assessments?.map((assessment, i) => (
              <Card
                key={assessment.id}
                className="cursor-pointer transition-all duration-300 hover:scale-[1.01] relative overflow-hidden border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5"
                onClick={() => setSelectedQuiz(assessment)}
              >
                {/* Quiz card subtle glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                <CardHeader>
                  <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 text-2xl font-bold">
                    Quiz {i + 1}
                  </CardTitle>
                  <CardDescription className="flex justify-between w-full text-gray-300">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          assessment.quizScore >= 80
                            ? "bg-emerald-400"
                            : assessment.quizScore >= 60
                            ? "bg-amber-400"
                            : "bg-red-400"
                        }`}
                      ></div>
                      Score: {assessment.quizScore.toFixed(1)}%
                    </div>
                    <div className="text-gray-400">
                      {format(
                        new Date(assessment.createdAt),
                        "MMMM dd, yyyy HH:mm"
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>

                {assessment.improvementTip && (
                  <CardContent>
                    <p className="text-sm text-gray-400 border-l-2 border-indigo-500/50 pl-3">
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                )}

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-indigo-500/20 to-transparent"></div>
              </Card>
            ))}
          </div>

          {/* Animated particles */}
          <div className="absolute right-6 top-1/4 w-1 h-1 bg-indigo-400/60 rounded-full animate-ping"></div>
          <div className="absolute left-1/4 bottom-1/3 w-1 h-1 bg-purple-400/60 rounded-full animate-ping delay-300"></div>
          <div className="absolute right-1/3 bottom-10 w-2 h-2 bg-blue-400/60 rounded-full animate-ping delay-700"></div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900/95 border border-indigo-500/20 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 text-2xl font-bold"></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
