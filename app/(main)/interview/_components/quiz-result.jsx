"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, CheckCircle2, Trophy, XCircle } from "lucide-react";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  return (
    <div className="mx-auto relative">
      {/* Animated particles */}
      <div className="absolute right-0 top-6 w-2 h-2 bg-yellow-400/60 rounded-full animate-ping"></div>
      <div className="absolute left-1/4 top-1/3 w-1 h-1 bg-indigo-400/60 rounded-full animate-ping delay-500"></div>
      <div className="absolute right-1/4 bottom-10 w-1 h-1 bg-purple-400/60 rounded-full animate-ping delay-700"></div>

      <h1 className="flex items-center gap-2 text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 font-extrabold mb-6">
        <Trophy className="h-8 w-8 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent className="space-y-8 relative">
        {/* Score Overview with glowing effect */}
        <div className="text-center space-y-4 p-6 rounded-xl bg-gray-800/30 border border-yellow-500/20 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute -top-10 left-1/2 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl animate-pulse opacity-70"></div>

          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
            {result.quizScore.toFixed(1)}%
          </h3>

          <div className="relative">
            <Progress
              value={result.quizScore}
              className="w-full h-3 bg-gray-700/50"
              style={{
                "--theme-primary":
                  "linear-gradient(to right, #fde047, #f59e0b)",
              }}
            />
            <div className="absolute inset-0 rounded-full border border-yellow-500/30"></div>
          </div>

          {/* Score label */}
          <div className="text-sm text-gray-300 mt-2">
            {result.quizScore >= 90
              ? "Exceptional"
              : result.quizScore >= 75
              ? "Very Good"
              : result.quizScore >= 60
              ? "Good Progress"
              : "Keep Practicing"}
          </div>
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-gray-800/30 p-6 rounded-xl border border-indigo-500/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute -bottom-10 right-1/4 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl animate-pulse opacity-70"></div>

            <p className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 text-lg mb-2">
              Improvement Tip:
            </p>
            <p className="text-gray-300">{result.improvementTip}</p>

            {/* Edge highlight */}
            <div className="absolute -left-1 top-1/2 h-1/2 w-1 bg-gradient-to-b from-indigo-500/50 to-transparent rounded-full"></div>
          </div>
        )}

        {/* Questions Review */}
        <div className="space-y-6">
          <h3 className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-white text-xl">
            Question Review
          </h3>

          {result.questions.map((q, index) => (
            <div
              key={index}
              className={`border rounded-xl p-5 space-y-3 backdrop-blur-sm transition-all duration-300 hover:shadow-md ${
                q.isCorrect
                  ? "border-green-500/30 bg-green-500/5 hover:shadow-green-500/10"
                  : "border-red-500/30 bg-red-500/5 hover:shadow-red-500/10"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium text-gray-100">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                )}
              </div>

              <div className="text-sm text-gray-300 space-y-1">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Your answer:</span>
                  <span
                    className={q.isCorrect ? "text-green-300" : "text-red-300"}
                  >
                    {q.userAnswer}
                  </span>
                </p>

                {!q.isCorrect && (
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Correct answer:</span>
                    <span className="text-green-300">{q.answer}</span>
                  </p>
                )}
              </div>

              <div className="text-sm bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <p className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-300 mb-1">
                  Explanation:
                </p>
                <p className="text-gray-300">{q.explanation}</p>
              </div>

              {/* Corner accent */}
              <div
                className={`absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl ${
                  q.isCorrect
                    ? "from-green-500/20 to-transparent"
                    : "from-red-500/20 to-transparent"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter className="mt-6">
          <Button
            onClick={onStartNew}
            className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-md font-semibold shadow-xl transition-all duration-300 hover:shadow-indigo-500/30 transform hover:scale-105 relative overflow-hidden group border-none"
          >
            {/* Shine effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></span>
            <span className="relative z-10 flex items-center justify-center">
              Start New Quiz{" "}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </CardFooter>
      )}
    </div>
  );
}
