import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp } from "lucide-react";

export default function IndustryTrends({ trends = [] }) {
  if (!trends || trends.length === 0) {
    return null;
  }

  return (
    <Card className="border border-blue-800/20 bg-black/30 backdrop-blur-md">
      <CardHeader className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50">
        <CardTitle className="text-xl font-semibold text-blue-100 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
          Industry Trends to Watch
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trends.map((trend, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 p-4 rounded-lg border border-blue-700/20 flex"
            >
              <div className="mr-3 mt-1">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-blue-400" />
                </div>
              </div>
              <p className="text-blue-200 text-sm">{trend}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
