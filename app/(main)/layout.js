const MainLayout = ({ children }) => {
  //Redirect User After Onboarding

  return (
    <div className="relative container mx-auto mt-24 mb-20">
      {/* Background elements */}
      <div className="absolute inset-0 rounded-xl overflow-hidden -m-6">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjEpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 border border-gray-700/30 rounded-xl"></div>
      </div>

      {/* Content container with padding */}
      <div className="relative z-10 px-6 py-8">{children}</div>

      {/* Subtle animated accents */}
      <div className="absolute top-5 right-10 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping"></div>
      <div className="absolute bottom-5 left-10 w-1 h-1 bg-blue-400/60 rounded-full animate-ping delay-500"></div>
    </div>
  );
};

export default MainLayout;
