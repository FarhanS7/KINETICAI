import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Briefcase, DollarSign, User } from "lucide-react";

export default function CurrentProfile({ profile }) {
  if (!profile) {
    return null;
  }

  return (
    <Card className="border border-purple-800/20 bg-black/30 backdrop-blur-md">
      <CardHeader className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50">
        <CardTitle className="text-xl font-semibold text-purple-100 flex items-center">
          <User className="w-5 h-5 mr-2 text-purple-400" />
          Your Current Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-4 rounded-lg border border-purple-700/20">
            <h3 className="text-purple-300 text-sm font-medium mb-2 flex items-center">
              <Briefcase className="w-4 h-4 mr-1.5 text-purple-400" />
              Current Position
            </h3>
            <p className="text-white text-lg font-semibold">{profile.title}</p>
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-4 rounded-lg border border-purple-700/20">
            <h3 className="text-purple-300 text-sm font-medium mb-2 flex items-center">
              <Award className="w-4 h-4 mr-1.5 text-purple-400" />
              Core Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-purple-800/20 text-purple-200 border-purple-500/30 text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-4 rounded-lg border border-purple-700/20">
            <h3 className="text-purple-300 text-sm font-medium mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-1.5 text-purple-400" />
              Estimated Market Value
            </h3>
            <p className="text-green-300 text-lg font-semibold">
              {profile.estimatedSalary}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
