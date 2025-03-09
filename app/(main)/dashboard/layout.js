import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="relative px-5 py-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 opacity-80"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>

      {/* Accent elements */}
      <div className="absolute -top-20 right-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"></div>

      {/* Content container */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight relative group">
            Industry Insights
            {/* Animated underline effect */}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-700"></span>
            {/* Subtle glow effect */}
            <span className="absolute -inset-1 bg-cyan-500/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </h1>

          {/* Optional: you could add controls or filters here */}
          <div className="flex space-x-3">
            <div className="w-3 h-3 rounded-full bg-cyan-500/70 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-blue-500/70 animate-pulse delay-150"></div>
            <div className="w-3 h-3 rounded-full bg-indigo-500/70 animate-pulse delay-300"></div>
          </div>
        </div>

        {/* Content area with stylized loading state */}
        <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 shadow-xl">
          {/* Tech pattern accent */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0icmdiYSg1NiwgMTg5LCAyNDgsIDAuMikiLz48L3N2Zz4=')] opacity-20"></div>

          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-full max-w-md bg-gray-800/50 rounded-md overflow-hidden">
                  <div className="h-1 w-full bg-gray-700/50">
                    <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 animate-loadingBar"></div>
                  </div>
                </div>
                <p className="text-gray-400 mt-4 text-sm">
                  Loading insights...
                </p>
              </div>
            }
          >
            {children}
          </Suspense>
        </div>

        {/* Edge highlight */}
        <div className="absolute inset-0 border border-cyan-500/10 rounded-xl pointer-events-none"></div>
      </div>
    </div>
  );
}
