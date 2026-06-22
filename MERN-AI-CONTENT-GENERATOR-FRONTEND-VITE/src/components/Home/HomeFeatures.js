import React from "react";
import { CpuChipIcon, AdjustmentsHorizontalIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function HomeFeatures() {
  const features = [
    {
      title: "AI-Powered Generation",
      desc: "Revolutionize your creation process. Intelligent neural engines generate accurate, high-quality material in seconds.",
      icon: SparklesIcon,
      color: "from-purple-500 to-indigo-500",
      glow: "shadow-purple-500/20"
    },
    {
      title: "Highly Customizable",
      desc: "Generate blogs, code, copies, or social media scripts. Adjust creativity, tone, and length parameters to fit your brand.",
      icon: AdjustmentsHorizontalIcon,
      color: "from-cyan-500 to-blue-500",
      glow: "shadow-cyan-500/20"
    },
    {
      title: "Optimized Workflows",
      desc: "Integrate content flows seamlessly. Export generated copies, organize search archives, and scale throughput.",
      icon: CpuChipIcon,
      color: "from-pink-500 to-rose-500",
      glow: "shadow-pink-500/20"
    }
  ];

  return (
    <section className="relative py-24 bg-cyber-bg overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber-primary/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-6 z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            Built for the <span className="bg-gradient-to-r from-cyber-secondary to-cyber-primary bg-clip-text text-transparent">Future of Content</span>
          </h2>
          <p className="text-gray-400 mt-4">
            Leverage state-of-the-art neural engines to automate, scale, and polish your creative campaigns.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx} 
                className={`glass-panel p-8 rounded-3xl hover:border-cyber-secondary/30 transition-all duration-500 group hover:-translate-y-2`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white mb-6 shadow-lg ${feat.glow} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyber-secondary transition-colors">
                  {feat.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
