"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format, formatDistanceToNow } from "date-fns";
import {
  Brain,
  BriefcaseIcon,
  LineChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DashboardView = ({ insights }) => {
  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  // Format dates using date-fns
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-8 bg-gray-950 text-gray-200">
      <div className="flex justify-between items-center">
        <Badge
          variant="outline"
          className="border-cyan-500/30 text-cyan-400 bg-cyan-950/20 px-3 py-1"
        >
          Last updated: {lastUpdatedDate}
        </Badge>
      </div>

      {/* Market Overview Cards with Futuristic Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900/80 border-cyan-500/20 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 relative overflow-hidden group">
          {/* Animated gradient accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
          {/* Hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Market Outlook
            </CardTitle>
            <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {insights.marketOutlook}
            </div>
            <p className="text-xs text-gray-400">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 border-cyan-500/20 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Industry Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress
              value={insights.growthRate}
              className="mt-2 bg-gray-800 h-2"
              style={{
                "--progress-background":
                  "linear-gradient(to right, #0ea5e9, #2563eb)",
              }}
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 border-cyan-500/20 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Demand Level
            </CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {insights.demandLevel}
            </div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                insights.demandLevel
              )} bg-opacity-80 shadow-md`}
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 border-cyan-500/20 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-600"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Top Skills
            </CardTitle>
            <Brain className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-gray-800 text-gray-200 border border-purple-500/20 hover:bg-purple-500/10 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Ranges Chart */}
      <Card className="col-span-4 bg-gray-900/80 border-cyan-500/20 shadow-lg relative overflow-hidden">
        {/* Animated light effect */}
        <div className="absolute top-0 left-1/4 w-64 h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 blur-sm animate-pulse"></div>

        <CardHeader>
          <CardTitle className="text-gray-100">Salary Ranges by Role</CardTitle>
          <CardDescription className="text-gray-400">
            Displaying minimum, median, and maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(75, 85, 99, 0.3)"
                />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-800 border border-cyan-500/20 rounded-lg p-3 shadow-xl">
                          <p className="font-medium text-white">{label}</p>
                          {payload.map((item) => (
                            <p
                              key={item.name}
                              className="text-sm text-gray-300 flex items-center gap-2"
                            >
                              <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.fill }}
                              ></span>
                              {item.name}: ${item.value}K
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="min" fill="#3b82f6" name="Min Salary (K)" />
                <Bar dataKey="median" fill="#06b6d4" name="Median Salary (K)" />
                <Bar dataKey="max" fill="#8b5cf6" name="Max Salary (K)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Industry Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900/80 border-cyan-500/20 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
          {/* Animated particle */}
          <div className="absolute top-8 right-8 w-1 h-1 bg-cyan-400/70 rounded-full animate-ping"></div>

          <CardHeader>
            <CardTitle className="text-gray-100">Key Industry Trends</CardTitle>
            <CardDescription className="text-gray-400">
              Current trends shaping the industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-3 group">
                  <div className="h-2 w-2 mt-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {trend}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 border-cyan-500/20 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          {/* Animated particle */}
          <div className="absolute bottom-8 left-8 w-1 h-1 bg-blue-400/70 rounded-full animate-ping delay-300"></div>

          <CardHeader>
            <CardTitle className="text-gray-100">Recommended Skills</CardTitle>
            <CardDescription className="text-gray-400">
              Skills to consider developing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className={`text-gray-200 border bg-gray-800/60 hover:bg-gray-700/60 transition-colors duration-300 px-3 py-1
                          border-${
                            index % 3 === 0
                              ? "cyan"
                              : index % 3 === 1
                              ? "blue"
                              : "indigo"
                          }-500/30
                          hover:border-${
                            index % 3 === 0
                              ? "cyan"
                              : index % 3 === 1
                              ? "blue"
                              : "indigo"
                          }-400/60`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
