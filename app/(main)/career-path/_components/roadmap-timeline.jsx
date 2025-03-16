// app/(main)/career-path/_components/roadmap-timeline.jsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Award,
  Book,
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

export default function RoadmapTimeline({ roadmap }) {
  const [expandedSteps, setExpandedSteps] = useState({});

  if (!roadmap || !roadmap.steps || roadmap.steps.length === 0) {
    return (
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-indigo-500/20">
        <div className="text-center text-gray-400">
          <p>Generate your roadmap to view your personalized career path.</p>
        </div>
      </Card>
    );
  }

  const toggleStep = (index) => {
    setExpandedSteps({
      ...expandedSteps,
      [index]: !expandedSteps[index],
    });
  };

  const getStepIcon = (type) => {
    switch (type) {
      case "education":
        return <Book className="w-4 h-4 mr-1" />;
      case "certification":
        return <Award className="w-4 h-4 mr-1" />;
      case "job":
        return <Briefcase className="w-4 h-4 mr-1" />;
      default:
        return <Calendar className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-indigo-500/20">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Your Career Roadmap
      </h2>

      <div className="space-y-4">
        {roadmap.steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline line */}
            {index < roadmap.steps.length - 1 && (
              <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/50 to-purple-500/30"></div>
            )}

            <div className="flex items-start gap-4">
              {/* Timeline icon */}
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                {getStepIcon(step.type)}
              </div>

              <div className="flex-grow">
                <Card className="bg-white/10 border-indigo-500/20 overflow-hidden">
                  <div
                    className="p-4 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleStep(index)}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">
                          {step.title}
                        </h3>
                        <Badge className="bg-indigo-500/30 text-indigo-200 text-xs">
                          {step.timeframe}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm">
                        {step.description}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400">
                      {expandedSteps[index] ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </div>

                  {expandedSteps[index] && (
                    <div className="p-4 pt-0 border-t border-indigo-500/20">
                      <div className="space-y-3 text-sm">
                        {step.skills && step.skills.length > 0 && (
                          <div>
                            <h4 className="text-gray-400 font-medium mb-1">
                              Skills to develop:
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {step.skills.map((skill, idx) => (
                                <Badge
                                  key={idx}
                                  className="bg-purple-500/20 text-purple-200"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {step.resources && step.resources.length > 0 && (
                          <div>
                            <h4 className="text-gray-400 font-medium mb-1">
                              Recommended resources:
                            </h4>
                            <ul className="space-y-1 pl-5 list-disc text-gray-300">
                              {step.resources.map((resource, idx) => (
                                <li key={idx}>{resource}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {step.advice && (
                          <div>
                            <h4 className="text-gray-400 font-medium mb-1">
                              Pro tip:
                            </h4>
                            <p className="text-gray-300">{step.advice}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
