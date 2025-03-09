import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="px-5 py-6">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-full max-w-md bg-gray-800/50 rounded-md overflow-hidden">
              <div className="h-1.5 w-full bg-gray-700/50">
                <div
                  className="h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Loading interview data...
            </p>
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
