import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, Trophy } from "lucide-react";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  const averageScore = getAverageScore();
  const totalQuestions = getTotalQuestions();
  const latestScore = getLatestAssessment()?.quizScore.toFixed(1) || 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Average Score Card */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 shadow-lg relative overflow-hidden group hover:border-cyan-800/50 transition-all duration-300">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl group-hover:bg-yellow-500/10 transition-all duration-500"></div>

        {/* Progress indicator based on score */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-500 to-amber-600"
          style={{ width: `${averageScore}%` }}
        ></div>

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-gray-300">
            Average Score
          </CardTitle>
          <div className="p-2 rounded-full bg-gray-800/50 group-hover:bg-yellow-500/10 transition-all duration-300">
            <Trophy className="h-4 w-4 text-yellow-500" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
            {averageScore}%
          </div>
          <p className="text-xs text-gray-400 mt-1">Across all assessments</p>
        </CardContent>
      </Card>

      {/* Questions Practiced Card */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 shadow-lg relative overflow-hidden group hover:border-cyan-800/50 transition-all duration-300">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-500"></div>

        {/* Vertical bar indicator */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600"></div>

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-gray-300">
            Questions Practiced
          </CardTitle>
          <div className="p-2 rounded-full bg-gray-800/50 group-hover:bg-cyan-500/10 transition-all duration-300">
            <Brain className="h-4 w-4 text-cyan-500" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            {totalQuestions}
          </div>
          <p className="text-xs text-gray-400 mt-1">Total questions answered</p>

          {/* Animated dots for visual interest */}
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-cyan-400 rounded-full opacity-70 animate-ping"></div>
          <div className="absolute bottom-3 right-6 w-1 h-1 bg-blue-400 rounded-full opacity-70 animate-ping delay-300"></div>
        </CardContent>
      </Card>

      {/* Latest Score Card */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 shadow-lg relative overflow-hidden group hover:border-cyan-800/50 transition-all duration-300">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all duration-500"></div>

        {/* Circular progress indicator */}
        <div className="absolute -bottom-8 -right-8 w-24 h-24 border-4 border-purple-500/20 rounded-full"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 border-t-4 border-purple-500 rounded-full transform -rotate-45"></div>

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-gray-300">
            Latest Score
          </CardTitle>
          <div className="p-2 rounded-full bg-gray-800/50 group-hover:bg-purple-500/10 transition-all duration-300">
            <Target className="h-4 w-4 text-purple-500" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
            {latestScore}%
          </div>
          <p className="text-xs text-gray-400 mt-1">Most recent quiz attempt</p>
        </CardContent>
      </Card>
    </div>
  );
}
