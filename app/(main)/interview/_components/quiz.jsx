"use client";

import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import { ArrowRight, Brain, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import QuizResult from "./quiz-result";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };

  if (generatingQuiz) {
    return (
      <div className="relative flex items-center justify-center min-h-64 w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg opacity-50"></div>
        <div className="relative z-10 text-center">
          <div className="text-lg font-medium text-cyan-400 mb-4">
            Generating Your Quiz
          </div>
          <BarLoader
            className="mx-auto"
            width={200}
            color="#22d3ee"
            height={4}
          />
          <div className="text-sm text-gray-400 mt-4">
            AI is crafting personalized questions...
          </div>
        </div>
        <div className="absolute -top-5 -right-5 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
    );
  }

  // Show results if quiz is completed
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <Card className="mx-2 bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 shadow-lg relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="absolute -top-10 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 left-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Ready to test your knowledge?
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-gray-400">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter className="relative z-10">
          <Button
            onClick={generateQuizFn}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 group"
          >
            Start Quiz
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </CardFooter>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-70"></div>
      </Card>
    );
  }

  const question = quizData[currentQuestion];
  const progressPercentage = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <Card className="mx-2 bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      <div className="absolute -top-10 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 left-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white">
            Question {currentQuestion + 1} of {quizData.length}
          </CardTitle>
          <div className="text-sm font-medium text-gray-400">
            {progressPercentage.toFixed(0)}% Complete
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 relative z-10">
        <p className="text-lg font-medium text-gray-100">{question.question}</p>

        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                answers[currentQuestion] === option
                  ? "border-cyan-500/50 bg-cyan-500/10"
                  : "border-gray-800 hover:border-gray-700 hover:bg-gray-800/30"
              }`}
            >
              <RadioGroupItem
                value={option}
                id={`option-${index}`}
                className="text-cyan-500 border-gray-700"
              />
              <Label
                htmlFor={`option-${index}`}
                className="w-full cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-500 to-blue-600"></div>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <p className="font-medium text-yellow-500">Explanation:</p>
            </div>
            <p className="text-gray-300 pl-1">{question.explanation}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between relative z-10">
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
            className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800/70 hover:text-white"
          >
            <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
            Show Explanation
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className={`ml-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 flex items-center gap-2 ${
            savingResult ? "opacity-70" : ""
          }`}
        >
          {savingResult ? (
            <BarLoader
              className="mx-auto"
              width={80}
              color="#ffffff"
              height={4}
            />
          ) : (
            <>
              {currentQuestion < quizData.length - 1
                ? "Next Question"
                : "Finish Quiz"}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600 opacity-50"></div>
    </Card>
  );
}
