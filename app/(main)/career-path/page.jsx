"use client";
import { generateCareerRoadmap, getUserRoadmap } from "@/actions/career-path";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import AlternativePaths from "./_components/alter-paths";
import CareerGoalsForm from "./_components/career-goals-form";
import CurrentProfile from "./_components/current-profile";
import IndustryTrends from "./_components/industry-trends";
import RoadmapTimeline from "./_components/roadmap-timeline";

export default function CareerPathPage() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRoadmap() {
      try {
        const data = await getUserRoadmap();
        console.log("Fetched Roadmap:", data); // Debugging output
        setRoadmap(data || null);
      } catch (err) {
        console.error("Error fetching roadmap:", err);
        setError("Failed to load roadmap. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchRoadmap();
  }, []);

  return (
    <div className="relative">
      {/* Background elements */}
      <div className="absolute -inset-6 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 rounded-xl opacity-70"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-10 rounded-xl"></div>
      </div>

      <div className="flex items-center justify-between mb-8 relative">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 tracking-tight">
          Career Roadmap
          <div className="absolute -bottom-1 left-0 w-24 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-500"></div>
        </h1>
      </div>

      <div className="space-y-8 relative">
        {/* Career goals form */}
        <div className="transform transition-all duration-300 hover:scale-[1.01] relative">
          <CareerGoalsForm />
        </div>

        {/* Show loading state */}
        {loading && (
          <p className="text-center text-gray-400">Loading roadmap...</p>
        )}

        {/* Show error if any */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Generate roadmap button */}
        {!loading && (
          <div className="flex justify-center">
            <form action={generateCareerRoadmap}>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {roadmap ? "Refresh" : "Generate"} My Career Roadmap
              </Button>
            </form>
          </div>
        )}

        {/* If roadmap exists, show details */}
        {roadmap ? (
          <>
            <div className="transform transition-all duration-300 hover:scale-[1.01] relative">
              <CurrentProfile profile={roadmap.currentProfile || {}} />
            </div>

            <div className="transform transition-all duration-300 hover:scale-[1.01] relative">
              <RoadmapTimeline roadmap={roadmap.roadmap || []} />
            </div>

            <div className="transform transition-all duration-300 hover:scale-[1.01] relative">
              <IndustryTrends trends={roadmap.industryTrends || []} />
            </div>

            <div className="transform transition-all duration-300 hover:scale-[1.01] relative">
              <AlternativePaths paths={roadmap.alternativePaths || []} />
            </div>
          </>
        ) : (
          !loading && (
            <p className="text-center text-gray-400">
              No roadmap found. Please generate one.
            </p>
          )
        )}
      </div>
    </div>
  );
}
