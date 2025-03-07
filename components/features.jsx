import { features } from "@data/features";

import { Card, CardContent } from "@/components/ui/card";

const FeatureSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-24 relative bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Background futuristic grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      {/* Moving light effects */}
      <div className="absolute -left-40 top-20 h-96 w-96 bg-gradient-to-r from-blue-400/10 via-cyan-400/15 to-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -right-40 bottom-20 h-96 w-96 bg-gradient-to-r from-indigo-400/10 via-purple-400/15 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <h2 className="text-3xl font-bold mb-12 tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-slate-100 to-gray-300 drop-shadow-sm relative">
          Powerful Features for Your Career Growth
          <span className="absolute -inset-x-20 -inset-y-2 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 blur-sm opacity-30 animate-shine"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            return (
              <Card
                key={index}
                className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 border-0 shadow-xl backdrop-blur-sm hover:shadow-cyan-500/10 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Card inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/0 via-cyan-500/5 to-gray-800/0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>

                {/* Card border glow */}
                <div className="absolute inset-0 border border-gray-700/50 rounded-lg group-hover:border-cyan-500/20 transition-colors duration-300"></div>

                <CardContent className="pt-6 text-center flex flex-col items-center relative z-10">
                  <div className="flex flex-col items-center justify-center">
                    {/* Icon wrapper with glow effect */}
                    <div className="relative p-3 mb-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 shadow-inner">
                      <div className="absolute inset-0 rounded-full bg-cyan-400/5 blur-sm group-hover:bg-cyan-400/10 transition-colors duration-300"></div>
                      <div className="relative z-10 text-cyan-400/80 group-hover:text-cyan-400 transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </div>

                    <h3 className="font-bold text-xl mb-2 text-gray-100 group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Decorative tech elements */}
        <div className="absolute right-10 bottom-10 w-2 h-2 bg-cyan-400/40 rounded-full animate-ping"></div>
        <div className="absolute left-10 top-1/3 w-3 h-3 bg-indigo-400/40 rounded-full animate-pulse"></div>
      </div>
    </section>
  );
};

export default FeatureSection;
