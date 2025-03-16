// app/(main)/career-path/layout.js

export const metadata = {
  title: "Career Roadmap | Your Career Path",
  description:
    "AI-driven career path suggestions based on your skills, experience, and industry trends",
};

export default function CareerPathLayout({ children }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Career Development</h1>
        <p className="text-gray-400">
          Plan your professional growth with AI-powered insights
        </p>
      </div>

      {children}
    </div>
  );
}
