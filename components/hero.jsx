"use client";
import Link from "@node_modules/next/link";
import { useEffect, useRef } from "react";

import Image from "@node_modules/next/image";
import { Button } from "./ui/button";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10 relative">
      <div className="relative space-y-8 text-center bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        {/* Background futuristic grid overlay - enhanced with hexagonal pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMDAsIDE5MCwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTAgMCBMMzAgMzAgTDYwIDAgTTAgNjAgTDMwIDMwIEw2MCA2MCIgc3Ryb2tlPSJyZ2JhKDYwLCAxNDAsIDI1NSwgMC4wOCkiIHN0cm9rZS13aWR0aD0iLjI1Ii8+PC9nPjwvc3ZnPg==')] opacity-25"></div>

        {/* Digital circuit pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9InJnYmEoMCwgMjA1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjAuNSI+PHBhdGggZD0iTTIwIDQwIGgxNjAgdjEyMCBINjAgdjIwIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTgwIDIwIHY0MCBoNDAgdjQwIGg0MCB2LTIwIGgyMCB2NDAgaC00MCIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjIiIGZpbGw9InJnYmEoMCwgMTk1LCAyNTUsIDAuMSkiLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSI2MCIgcj0iMiIgZmlsbD0icmdiYSgwLCAxOTUsIDI1NSwgMC4xKSIvPjxjaXJjbGUgY3g9IjgwIiBjeT0iMTAwIiByPSIyIiBmaWxsPSJyZ2JhKDAsIDE5NSwgMjU1LCAwLjEpIi8+PC9nPjwvc3ZnPg==')] opacity-20 bg-blend-overlay"></div>

        {/* Moving light effects - enhanced */}
        <div className="absolute -inset-x-40 -top-40 h-96 w-96 bg-gradient-to-r from-blue-400/10 via-cyan-400/20 to-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -inset-x-40 -bottom-40 h-96 w-96 bg-gradient-to-r from-indigo-400/10 via-purple-400/20 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute right-10 top-1/3 h-64 w-64 bg-gradient-to-r from-cyan-400/5 to-blue-500/10 rounded-full blur-3xl animate-pulse opacity-70"></div>

        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdub2lzZUZpbHRlcic+PGZlVHVyYnVsZW5jZSB0eXBlPSdmcmFjdGFsTm9pc2UnIGJhc2VGcmVxdWVuY3k9JzAuNjUnIG51bU9jdGF2ZXM9JzMnIHN0aXRjaFRpbGVzPSdzdGl0Y2gnLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWx0ZXI9J3VybCgjbm9pc2VGaWx0ZXIpJyBvcGFjaXR5PScwLjA1Jy8+PC9zdmc+')] opacity-20 mix-blend-overlay"></div>

        <div className="relative space-y-8 mx-auto px-4 py-16">
          {/* Glitch effect wrapper */}
          <div className="relative group">
            <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-slate-100 to-gray-300 drop-shadow-sm transition-all duration-500 group-hover:scale-[1.01] group-hover:brightness-110">
              Your AI Career Coach for <br /> Professional Success
              <span className="absolute -inset-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 blur-sm opacity-30 animate-shine"></span>
            </h1>
            {/* Glitch line effects */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute left-0 w-full h-[1px] bg-cyan-400/30 animate-glitch-line-1"></div>
              <div className="absolute left-0 w-full h-[1px] bg-blue-400/30 animate-glitch-line-2"></div>
            </div>
          </div>

          <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl backdrop-blur-sm bg-black/10 p-4 rounded-lg border border-gray-800/50 shadow-inner relative overflow-hidden group hover:border-cyan-900/30 transition-all duration-500">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/10 to-transparent animate-shine"></span>
            {/* Highlight scan effect */}
            <span className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-in-out"></span>
          </p>

          {/* Buttons - enhanced */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="relative px-8 py-3 overflow-hidden font-medium tracking-wider text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg group shadow-lg hover:scale-105 transition-all duration-300 border border-gray-600"
              >
                <span className="absolute w-0 h-0 transition-all duration-700 ease-out bg-cyan-500 rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
                <span className="relative flex items-center">
                  GET STARTED
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
                <span className="absolute inset-0 border border-gray-400/20 rounded-lg animate-pulse"></span>
                {/* Button glow effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <span className="absolute inset-0 rounded-lg border border-cyan-500/30 blur-sm"></span>
                  <span className="absolute -inset-1 rounded-lg border border-cyan-500/20 blur-md"></span>
                </span>
              </Button>
            </Link>
            <Link href="https://www.youtube.com/roadsidecoder">
              <Button
                size="lg"
                variant="outline"
                className="relative px-8 py-3 font-medium tracking-wider text-gray-300 border border-gray-700 rounded-lg group shadow-md hover:border-cyan-500/30 hover:text-white transition-all duration-300"
              >
                <span className="absolute w-0 h-0 transition-all duration-700 ease-out bg-gray-700 rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
                <span className="relative flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  WATCH DEMO
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative tech elements - enhanced */}
        <div className="absolute right-8 top-1/3 w-2 h-2 bg-cyan-400/50 rounded-full animate-ping"></div>
        <div className="absolute left-8 top-2/3 w-3 h-3 bg-indigo-400/50 rounded-full animate-pulse"></div>

        {/* Additional floating elements */}
        <div className="absolute right-1/4 top-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"></div>
        <div className="absolute left-1/4 bottom-1/3 w-1 h-1 bg-cyan-400/40 rounded-full animate-ping"></div>
        <div className="absolute right-1/3 bottom-1/4 w-2 h-2 bg-purple-400/40 rounded-full animate-ping delay-1000"></div>

        {/* Dashboard Image with enhanced futuristic frame */}
        <div className="relative mx-auto px-4 pb-16 max-w-5xl">
          <div className="relative mx-auto group">
            {/* Animated border glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/30 via-blue-500/20 to-purple-600/30 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>

            {/* Image with enhanced frame */}
            <div className="relative rounded-lg p-1 bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/50"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400/50"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400/50"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400/50"></div>

              {/* Data points around the frame */}
              <div className="absolute top-0 left-1/4 h-2 w-2 bg-cyan-400/50 rounded-full"></div>
              <div className="absolute top-0 right-1/4 h-2 w-2 bg-cyan-400/50 rounded-full"></div>
              <div className="absolute bottom-0 left-1/3 h-2 w-2 bg-cyan-400/50 rounded-full"></div>
              <div className="absolute bottom-0 right-1/3 h-2 w-2 bg-cyan-400/50 rounded-full"></div>

              {/* Enhanced scanner line effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-x-0 h-px bg-cyan-400/70 w-full animate-scanner"></div>
                <div className="absolute inset-y-0 w-px bg-cyan-400/30 h-full animate-scanner-vertical"></div>
              </div>

              {/* Interactive HUD overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-2 left-2 text-xs font-mono text-cyan-400/70">
                  SYS.INIT
                </div>
                <div className="absolute top-2 right-2 text-xs font-mono text-cyan-400/70">
                  AI.COACH.v1
                </div>
                <div className="absolute bottom-2 left-2 text-xs font-mono text-cyan-400/70">
                  STATUS: ONLINE
                </div>
                <div className="absolute bottom-2 right-2 text-xs font-mono text-cyan-400/70">
                  LOADING: 100%
                </div>
              </div>

              <Image
                src="/8957067.jpeg"
                width={1280}
                height={720}
                alt="Dashboard Preview"
                className="rounded-sm group-hover:brightness-110 transition-all duration-500"
                priority
              />

              {/* <div className="spline-container">
                <Spline scene="https://prod.spline.design/n8t-ji0o4P-4qX1p/scene.splinecode" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
