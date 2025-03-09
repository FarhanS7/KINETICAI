"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <Card className="relative overflow-hidden border-0 bg-transparent">
      {/* Background gradients and effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 rounded-xl"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-20 rounded-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 rounded-xl"></div>

      {/* Moving light effects */}
      <div className="absolute -top-10 left-1/3 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl animate-pulse opacity-70"></div>
      <div className="absolute -bottom-10 right-1/3 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse opacity-70"></div>

      {/* Edge highlight */}
      <div className="absolute inset-0 rounded-xl border border-cyan-500/20"></div>

      <CardHeader className="relative z-10">
        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-white text-3xl md:text-4xl font-extrabold transform transition-transform duration-500 hover:scale-105">
          Performance Trend
        </CardTitle>
        <CardDescription className="text-gray-300 text-lg">
          Your quiz scores over time
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="h-[300px] bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm border border-gray-700/50">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
              />
              <XAxis
                dataKey="date"
                tick={{ fill: "#9ca3af" }}
                axisLine={{ stroke: "rgba(255, 255, 255, 0.2)" }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#9ca3af" }}
                axisLine={{ stroke: "rgba(255, 255, 255, 0.2)" }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-gray-800/90 border border-cyan-500/30 rounded-lg p-3 shadow-lg backdrop-blur-sm">
                        <p className="text-cyan-400 font-semibold">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-gray-300 text-xs">
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="rgb(6, 182, 212)" // cyan-500
                strokeWidth={3}
                dot={{
                  stroke: "rgb(6, 182, 212)",
                  strokeWidth: 2,
                  r: 4,
                  fill: "#1e293b",
                }}
                activeDot={{
                  stroke: "rgb(6, 182, 212)",
                  strokeWidth: 2,
                  r: 6,
                  fill: "#0ea5e9",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Animated particles */}
        <div className="absolute right-6 top-1/4 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping"></div>
        <div className="absolute left-1/4 bottom-1/3 w-1 h-1 bg-blue-400/60 rounded-full animate-ping delay-300"></div>
        <div className="absolute right-1/3 bottom-10 w-1 h-1 bg-indigo-400/60 rounded-full animate-ping delay-700"></div>
      </CardContent>
    </Card>
  );
}
