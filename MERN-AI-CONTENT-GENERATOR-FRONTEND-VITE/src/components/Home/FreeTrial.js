import { Link } from "react-router-dom";

export default function FreeTrial() {
  return (
    <div className="relative isolate overflow-hidden bg-cyber-bg border-t border-white/5 py-24 sm:py-32">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyber-primary/10 to-cyber-accent/10 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <div className="glass-panel-glow rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-primary/5 to-cyber-secondary/5" />
          
          <h2 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Start Generating Tomorrow's <br />
            <span className="bg-gradient-to-r from-cyber-secondary via-cyber-primary to-cyber-accent bg-clip-text text-transparent">
              Content Today.
            </span>
          </h2>
          <p className="relative mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-400">
            Join thousands of modern creators leveraging our neural network engine to write faster and drive larger audience engagement.
          </p>
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/free-plan"
              className="rounded-full bg-gradient-to-r from-cyber-primary to-cyber-accent px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
            >
              Start 3-Day Free Trial
            </Link>
            <Link
              to="/plans"
              className="rounded-full bg-white/5 border border-white/10 hover:border-white/20 px-8 py-3.5 text-base font-bold text-white hover:bg-white/10 transition-all duration-300"
            >
              View Pricing Tiers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
