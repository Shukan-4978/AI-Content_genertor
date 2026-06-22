import { Link } from "react-router-dom";
import { FaCreativeCommonsShare, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200/50 dark:border-white/10 bg-white/70 dark:bg-cyber-bg/70 backdrop-blur-md transition-all duration-300 py-8 px-4">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 px-6 md:px-8">
        {/* Brand/Logo Section */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 text-slate-900 dark:text-white hover:opacity-90 transition-opacity">
            <FaCreativeCommonsShare className="h-6 w-6 text-cyber-secondary animate-pulse" />
            <span className="font-bold text-md tracking-wider bg-gradient-to-r from-cyber-secondary to-cyber-primary bg-clip-text text-transparent">
              GEN.AI
            </span>
          </Link>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          <Link to="/" className="text-sm text-slate-600 dark:text-gray-400 hover:text-cyber-secondary transition-colors duration-200">
            Home
          </Link>
          <Link to="/features" className="text-sm text-slate-600 dark:text-gray-400 hover:text-cyber-secondary transition-colors duration-200">
            Features
          </Link>
          <Link to="/plans" className="text-sm text-slate-600 dark:text-gray-400 hover:text-cyber-secondary transition-colors duration-200">
            Pricing
          </Link>
          <Link to="/about" className="text-sm text-slate-600 dark:text-gray-400 hover:text-cyber-secondary transition-colors duration-200">
            About
          </Link>
        </div>

        {/* Socials & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyber-primary dark:text-gray-400 dark:hover:text-cyber-secondary transition-colors duration-200"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyber-primary dark:text-gray-400 dark:hover:text-cyber-secondary transition-colors duration-200"
              aria-label="Twitter"
            >
              <FaTwitter className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyber-primary dark:text-gray-400 dark:hover:text-cyber-secondary transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>
          <span className="text-xs text-slate-500 dark:text-gray-500">
            &copy; {currentYear} GEN.AI. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
