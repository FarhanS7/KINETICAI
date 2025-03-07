import CTASection from "@components/CTASection";
import FAQSection from "@components/faqs";
import FeatureSection from "@components/features";
import HeroSection from "@components/hero";
import HowItWorksSection from "@components/howItworksSection";
import StatsSection from "@components/statsSection";
import TestimonialSection from "@components/testimonialSection";

const page = () => {
  return (
    <div className="">
      <div className="grid-background"></div>

      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <HowItWorksSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default page;
