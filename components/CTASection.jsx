import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const CTASection = () => {
  return (
    <section className="w-full py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 rounded-xl"></div>

      {/* Background futuristic grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-20 rounded-xl"></div>

      {/* Dynamic radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 rounded-xl"></div>

      {/* Moving light effects */}
      <div className="absolute -top-10 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse opacity-70"></div>
      <div className="absolute -bottom-10 right-1/4 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-pulse opacity-70"></div>

      <div className="mx-auto max-w-3xl text-center space-y-8 relative z-10">
        <h2 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-white sm:text-5xl md:text-6xl transform transition-transform duration-500 hover:scale-105 relative">
          Ready to Accelerate Your Career?
          <span className="absolute -inset-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 blur-sm opacity-30 animate-shine"></span>
        </h2>

        <p className="mx-auto max-w-[650px] text-gray-300 text-lg md:text-xl font-medium">
          Join thousands of professionals who are advancing their careers with
          AI-powered guidance.
        </p>

        <Link href="/dashboard" passHref>
          <Button
            size="lg"
            className="h-12 mt-6 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-cyan-500/30 transform hover:scale-105 relative overflow-hidden group"
          >
            {/* Pulsing background effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></span>

            {/* Shine effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></span>

            <span className="relative z-10 flex items-center">
              Start Your Journey Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </Link>

        {/* Animated particles */}
        <div className="absolute -right-2 top-1/3 w-2 h-2 bg-cyan-400/60 rounded-full animate-ping"></div>
        <div className="absolute left-10 bottom-1/4 w-1 h-1 bg-blue-400/60 rounded-full animate-ping delay-300"></div>
        <div className="absolute right-1/4 bottom-0 w-1 h-1 bg-indigo-400/60 rounded-full animate-ping delay-700"></div>
      </div>

      {/* Edge highlight */}
      <div className="absolute inset-0 rounded-xl border border-cyan-500/10"></div>
    </section>
  );
};

export default CTASection;
