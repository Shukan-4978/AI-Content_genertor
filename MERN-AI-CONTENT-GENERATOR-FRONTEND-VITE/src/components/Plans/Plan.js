import { CheckIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tiers = [
  {
    name: "Free",
    id: "Free",
    href: "checkout",
    price: "₹0.00",
    amount: 0,
    description: "The essentials to explore the neural generator ecosystem.",
    features: ["5 Credits", "1 User Console Access", "Standard Core Nodes"],
    mostPopular: false,
    gradient: "from-gray-500 to-slate-500"
  },
  {
    name: "Basic",
    id: "Basic",
    href: "checkout",
    price: "₹1,600",
    amount: 1600,
    description: "Ideal plan that scales for professional content creators.",
    features: [
      "50 Credits / month",
      "5 Active Consoles",
      "Priority Pipeline Support",
      "Content generation history",
    ],
    mostPopular: true,
    gradient: "from-cyber-primary to-cyber-accent"
  },
  {
    name: "Premium",
    id: "Premium",
    href: "checkout",
    price: "₹4,000",
    amount: 4000,
    description: "Dedicated resources and hyper-priority nodes for teams.",
    features: [
      "100 Credits / month",
      "10 Active Consoles",
      "Hyper-priority Nodes",
      "Extended content log history",
    ],
    mostPopular: false,
    gradient: "from-cyber-secondary to-cyber-primary"
  },
];

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (plan) => {
    setSelectedPlan(plan);
    if (plan?.id === "Free") {
      navigate("/free-plan");
    } else {
      navigate(`/checkout/${plan?.id}?amount=${plan?.amount}`);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto cyber-grid">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-base font-semibold tracking-widest text-cyber-secondary uppercase">
          Subscription Tiers
        </h2>
        <h1 className="mt-2 text-4xl md:text-5xl font-extrabold text-white tracking-wider">
          ACQUIRE <span className="bg-gradient-to-r from-cyber-secondary to-cyber-primary bg-clip-text text-transparent">GEN.AI LICENSE</span>
        </h1>
        <p className="mt-4 text-gray-400">
          Scale your creative processing nodes. Choose the license capacity that fits your operation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            onClick={() => handleSelect(tier)}
            className={`cursor-pointer rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
              tier.mostPopular
                ? "glass-panel-glow md:scale-105 border-cyber-primary/45 shadow-lg shadow-purple-500/10 hover:scale-102 hover:md:scale-[1.07]"
                : "glass-panel hover:scale-102 hover:border-white/20"
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">{tier.name}</h3>
                {tier.mostPopular && (
                  <span className="rounded-full bg-cyber-primary px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">{tier.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                <span className="text-xs text-gray-400"> / month</span>
              </div>

              <ul className="space-y-4 border-t border-white/5 pt-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckIcon className="h-5 w-5 text-cyber-secondary shrink-0" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button
                type="button"
                className={`w-full py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 ${
                  tier.mostPopular
                    ? "bg-gradient-to-r from-cyber-primary to-cyber-accent text-white shadow-lg shadow-purple-500/20"
                    : "bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                }`}
              >
                License Core
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
