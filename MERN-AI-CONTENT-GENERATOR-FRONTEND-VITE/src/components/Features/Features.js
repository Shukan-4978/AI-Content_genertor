import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Instant Generation",
    description:
      "Generate high-quality blog posts, articles, social media copy, and code explanations in seconds using state-of-the-art GPT intelligence.",
    href: "#",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Secure & Authorized",
    description:
      "Your personal prompts and generated history are protected under private authentication with secure session handling.",
    href: "#",
    icon: LockClosedIcon,
  },
  {
    name: "History Log",
    description:
      "Review your historical content generation activity. Search, revisit, or copy previous drafts at any time directly from your console.",
    href: "#",
    icon: ArrowPathIcon,
  },
];

export default function AppFeatures() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Generate Smarter
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to create content with AI
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Empower your workflow with a powerful neural writer console designed to generate, log, and manage your AI-crafted content effortlessly.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <feature.icon
                     className="h-5 w-5 flex-none text-indigo-400"
                     aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a
                      href={feature.href}
                      className="text-sm font-semibold leading-6 text-indigo-400"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
