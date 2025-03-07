const StatsSection = () => {
  return (
    <section className="w-full py-12 md:py-24 relative bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* Background futuristic grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      {/* Horizontal light sweep effect */}
      <div className="absolute inset-y-0 w-full h-1/3 top-1/3 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent blur-3xl"></div>

      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          {[
            { value: "50+", label: "Industries Covered" },
            { value: "1000+", label: "Interview Questions" },
            { value: "95%", label: "Success Rate" },
            { value: "24/7", label: "AI Support" },
          ].map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-2 relative group"
            >
              {/* Highlight glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/5 group-hover:to-cyan-400/0 rounded-lg transition-all duration-500 blur-md"></div>

              {/* Stat value with animated counting effect */}
              <h3 className="text-4xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-300 drop-shadow">
                {stat.value}
                <span className="absolute -inset-1 bg-cyan-400/10 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-700"></span>
              </h3>

              {/* Decorative line */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent group-hover:w-20 transition-all duration-300"></div>

              {/* Label */}
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative tech elements */}
        <div className="absolute right-10 top-10 w-2 h-2 bg-cyan-400/40 rounded-full animate-ping delay-300"></div>
        <div className="absolute left-1/4 bottom-10 w-3 h-3 bg-indigo-400/40 rounded-full animate-pulse"></div>
        <div className="absolute right-1/4 bottom-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-ping delay-700"></div>
      </div>
    </section>
  );
};

export default StatsSection;
