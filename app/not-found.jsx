import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800"></div>

      {/* Futuristic grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      {/* Dynamic glow effects */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Glitchy 404 error code */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <div className="relative">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            404
          </h1>

          {/* Glitch effect layers */}
          <span className="absolute -inset-0.5 text-9xl font-extrabold text-cyan-500/20 opacity-50 blur-sm animate-pulse">
            404
          </span>
          <span className="absolute -left-1 top-0.5 text-9xl font-extrabold text-red-500/10">
            404
          </span>
          <span className="absolute -right-1 -top-0.5 text-9xl font-extrabold text-blue-500/10">
            404
          </span>

          {/* Horizontal scan line */}
          <div className="absolute left-0 right-0 h-1 bg-cyan-400/30 blur-sm animate-scan"></div>
        </div>

        <h2 className="mt-8 text-3xl font-bold text-white">Page Not Found</h2>
        <p className="mt-4 text-gray-300 max-w-md text-lg">
          The digital destination you're looking for has been moved, deleted, or
          perhaps never existed in this dimension.
        </p>

        {/* Animated particles */}
        <div className="absolute left-1/3 top-1/4 w-1 h-1 bg-cyan-400/70 rounded-full animate-ping"></div>
        <div className="absolute right-1/3 bottom-1/4 w-1 h-1 bg-blue-400/70 rounded-full animate-ping delay-300"></div>
        <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-indigo-400/70 rounded-full animate-ping delay-700"></div>

        {/* Return button */}
        <Link href="/" className="mt-8">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600
                      text-white px-8 py-6 rounded-full font-medium shadow-lg
                      hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105
                      relative overflow-hidden group"
          >
            {/* Shine effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

            <span className="flex items-center relative z-10">
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Return to Safety
            </span>
          </Button>
        </Link>
      </div>

      {/* Additional tech elements */}
      <div className="absolute bottom-12 left-12 text-gray-500/40 text-sm font-mono">
        ERROR::SYSTEM_FAILURE::PATH_NOT_FOUND
      </div>
      <div className="absolute top-12 right-12 text-gray-500/40 text-sm font-mono">
        SYS::NAVIGATOR::REDIRECT_INITIATED
      </div>
    </div>
  );
}
