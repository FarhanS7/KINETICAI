import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, GitBranch } from "lucide-react";

export default function AlternativePaths({ paths = [] }) {
  if (!paths || paths.length === 0) {
    return null;
  }

  return (
    <Card className="border border-violet-800/20 bg-black/30 backdrop-blur-md">
      <CardHeader className="bg-gradient-to-r from-violet-900/50 to-indigo-900/50">
        <CardTitle className="text-xl font-semibold text-violet-100 flex items-center">
          <GitBranch className="w-5 h-5 mr-2 text-violet-400" />
          Alternative Career Paths
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {paths.map((path, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-violet-900/30 to-indigo-900/30 p-5 rounded-lg border border-violet-700/20"
            >
              <h3 className="text-violet-100 text-lg font-medium mb-2">
                {path.pathName}
              </h3>
              <p className="text-violet-200 text-sm mb-4">{path.description}</p>

              <div>
                <h4 className="text-violet-300 text-xs font-medium mb-2">
                  Potential Roles:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {path.potentialRoles.map((role, roleIdx) => (
                    <Badge
                      key={roleIdx}
                      variant="outline"
                      className="bg-violet-800/20 text-violet-200 border-violet-500/30 text-xs flex items-center"
                    >
                      <ArrowRight className="w-3 h-3 mr-1" />
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
