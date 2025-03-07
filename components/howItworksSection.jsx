import { howItWorks } from "@data/howItWorks";

const HowItWorksSection = () => {
  return (
    <section className="w-full py-12 md:py-24 relative bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Background futuristic grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      {/* Moving light effect */}
      <div className="absolute -right-40 top-20 h-96 w-96 bg-gradient-to-r from-cyan-400/5 via-blue-400/10 to-indigo-500/5 rounded-full blur-3xl animate-pulse"></div>

      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-slate-100 to-gray-300 drop-shadow-sm relative">
            How It Works
            <span className="absolute -inset-x-20 -inset-y-2 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 blur-sm opacity-30 animate-shine"></span>
          </h2>
          <p className="text-gray-400">
            Four simple steps to accelerate your career growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {howItWorks.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4 relative group"
            >
              {/* Step number with line connector */}
              <div className="absolute -top-6 text-6xl font-bold text-gray-800/30 group-hover:text-cyan-900/20 transition-colors duration-300">
                {index + 1}
              </div>

              {/* Horizontal connector line (except for last item) */}
              {index < howItWorks.length - 1 && (
                <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-700/70 to-transparent hidden lg:block"></div>
              )}

              {/* Icon with glow effect */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center relative z-10 border border-gray-700 shadow-lg group-hover:shadow-cyan-900/30 transition-all duration-300">
                <div className="absolute inset-0 rounded-full bg-cyan-400/5 blur-sm group-hover:bg-cyan-400/10 transition-colors duration-300"></div>
                <div className="relative z-10 text-cyan-400/90 group-hover:text-cyan-400 transition-colors duration-300">
                  {item.icon}
                </div>
              </div>

              <h3 className="font-semibold text-xl text-gray-200 group-hover:text-white transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
