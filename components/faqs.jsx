import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@data/faqs";

const FAQSection = () => {
  return (
    <section className="w-full py-12 md:py-24 relative bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Background futuristic grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      {/* Diagonal light effect */}
      <div className="absolute -left-40 -bottom-40 h-96 w-96 bg-gradient-to-r from-cyan-400/5 via-blue-400/10 to-indigo-500/5 rounded-full blur-3xl animate-pulse"></div>

      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-slate-100 to-gray-300 drop-shadow-sm relative">
            Frequently Asked Questions
            <span className="absolute -inset-x-20 -inset-y-2 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 blur-sm opacity-30 animate-shine"></span>
          </h2>
          <p className="text-gray-400">
            Find answers to common questions about our platform
          </p>
        </div>

        <div className="max-w-3xl mx-auto backdrop-blur-sm">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="relative group border border-gray-800/70 bg-gradient-to-r from-gray-900/70 to-gray-800/70 rounded-lg overflow-hidden shadow-md hover:shadow-cyan-900/20 transition-all duration-300"
              >
                {/* Subtle highlight effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>

                <AccordionTrigger className="text-left px-4 py-4 text-gray-200 group-hover:text-white transition-colors duration-300">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-cyan-400/70 rounded-full mr-2 group-hover:scale-125 transition-transform duration-300"></div>
                    {faq.question}
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 pb-4 text-gray-400 group-hover:text-gray-300 transition-colors duration-300 bg-gray-900/30">
                  <div className="pt-2 pl-4 border-l border-cyan-800/30">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Decorative tech elements */}
        <div className="absolute right-10 top-10 w-2 h-2 bg-cyan-400/40 rounded-full animate-ping delay-300"></div>
        <div className="absolute left-1/4 bottom-10 w-3 h-3 bg-indigo-400/40 rounded-full animate-pulse"></div>
      </div>
    </section>
  );
};

export default FAQSection;
