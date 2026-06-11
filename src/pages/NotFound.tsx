import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#040914] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-stars opacity-50 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] rounded-full bg-[#b92b6a]/20 blur-[140px] pointer-events-none" />

      <div className="text-center relative z-10 px-6">
        <p className="font-mono text-sm text-primary mb-4 tracking-widest">
          ERROR 404 — ROUTE NOT FOUND
        </p>
        <h1 className="text-7xl md:text-9xl font-extrabold mb-4 text-gradient">404</h1>
        <p className="mb-2 text-xl text-gray-300">This page drifted off into deep space.</p>
        <p className="mb-8 font-mono text-sm text-gray-500">
          requested: {location.pathname}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-primary text-white font-semibold hover:-translate-y-1 hover:scale-105 transition-all duration-300"
        >
          <Home className="w-4 h-4" /> Return to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
