import { testimonial } from "@data/testimonial";

import Image from "next/image";
const { Card, CardContent } = require("./ui/card");

const TestimonialSection = () => {
  return (
    <section className="w-full py-12 md:py-24 relative bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* Background futuristic grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      {/* Horizontal light sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent"></div>

      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-slate-100 to-gray-300 drop-shadow-sm relative">
          What Our Users Say
          <span className="absolute -inset-x-20 -inset-y-2 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 blur-sm opacity-30 animate-shine"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonial.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 border-0 shadow-xl backdrop-blur-sm hover:shadow-cyan-500/10 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Card inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800/0 via-cyan-500/5 to-gray-800/0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>

              {/* Card border glow */}
              <div className="absolute inset-0 border border-gray-700/50 rounded-lg group-hover:border-cyan-500/20 transition-colors duration-300"></div>

              <CardContent className="pt-6 relative z-10">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative h-12 w-12 flex-shrink-0">
                      {/* Image glow effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/40 to-blue-500/40 rounded-full blur-sm opacity-70"></div>

                      <Image
                        width={40}
                        height={40}
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="rounded-full object-cover border-2 border-gray-700 relative z-10"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-100">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-gray-400">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-cyan-400/90">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <blockquote>
                    <p className="text-gray-300 italic relative group-hover:text-gray-200 transition-colors duration-300">
                      <span className="text-3xl text-cyan-400/80 absolute -top-4 -left-2">
                        &quot;
                      </span>
                      {testimonial.quote}
                      <span className="text-3xl text-cyan-400/80 absolute -bottom-4">
                        &quot;
                      </span>
                    </p>
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Decorative tech elements */}
        <div className="absolute right-10 bottom-10 w-2 h-2 bg-cyan-400/40 rounded-full animate-ping"></div>
        <div className="absolute left-10 top-1/3 w-3 h-3 bg-indigo-400/40 rounded-full animate-pulse"></div>
      </div>
    </section>
  );
};

export default TestimonialSection;
