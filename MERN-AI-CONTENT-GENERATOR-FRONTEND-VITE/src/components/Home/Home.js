import HomeFeatures from "./HomeFeatures";
import FreeTrial from "./FreeTrial";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="relative isolate overflow-hidden min-h-screen flex items-center justify-center pt-24 cyber-grid">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyber-secondary/20 rounded-full blur-3xl animate-pulse" />

        <div className="relative container mx-auto px-6 py-20 text-center z-10 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyber-secondary/30 bg-cyber-secondary/10 text-cyber-secondary text-sm font-semibold mb-8 animate-float">
            <span className="w-2 h-2 rounded-full bg-cyber-secondary animate-ping" />
            Empowering Creativity with AI
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Next-Gen AI <br />
            <span className="bg-gradient-to-r from-cyber-secondary via-cyber-primary to-cyber-accent bg-clip-text text-transparent animate-text-glow">
              Content Engine
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Create high-converting blogs, social campaigns, and stunning copy in seconds. Supercharge your workflow with our advanced intelligence platform.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/free-plan"
              className="rounded-full bg-gradient-to-r from-cyber-primary to-cyber-accent px-8 py-4 text-base font-bold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
            >
              Start 3-Day Free Trial
            </Link>
            <Link
              to="/features"
              className="rounded-full bg-white/5 border border-white/10 hover:border-white/20 px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition-all duration-300"
            >
              Explore Features
            </Link>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { label: "Content Generated", val: "2.5M+" },
              { label: "Time Saved", val: "10x Faster" },
              { label: "User Rating", val: "4.9/5.0" },
            ].map((stat, idx) => (
              <div key={idx} className="glass-panel rounded-2xl p-6 hover:border-cyber-primary/30 transition-all duration-300">
                <div className="text-3xl font-extrabold text-white bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {stat.val}
                </div>
                <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HomeFeatures />
      <FreeTrial />
    </>
  );
}
