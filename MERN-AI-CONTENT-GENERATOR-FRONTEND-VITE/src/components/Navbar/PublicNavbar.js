import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { FaCreativeCommonsShare } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../ThemeContext";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/plans" },
  { name: "About", href: "/about" },
];

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4">
      <nav
        className="mx-auto max-w-7xl flex items-center justify-between p-4 px-6 md:px-8 rounded-full border border-slate-200/50 dark:border-white/10 bg-white/70 dark:bg-cyber-bg/70 backdrop-blur-md shadow-lg shadow-purple-500/5 transition-all duration-300 hover:border-purple-500/30"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 items-center gap-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-slate-900 dark:text-white hover:opacity-90 transition-opacity">
            <FaCreativeCommonsShare className="h-8 w-8 text-cyber-secondary animate-pulse" />
            <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-cyber-secondary to-cyber-primary bg-clip-text text-transparent">
              GEN.AI
            </span>
          </Link>
        </div>

        <div className="flex lg:hidden gap-3 items-center">
          <button
            onClick={toggleTheme}
            type="button"
            className="rounded-full p-2 bg-slate-200/30 dark:bg-white/5 border border-slate-300/30 dark:border-white/10 text-slate-700 dark:text-gray-300"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-slate-900 dark:hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-semibold leading-6 transition-all duration-300 relative py-1 ${
                  isActive 
                    ? "text-cyber-secondary" 
                    : "text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyber-secondary to-cyber-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 items-center">
          <button
            onClick={toggleTheme}
            type="button"
            className="rounded-full p-2 bg-slate-200/50 dark:bg-white/5 border border-slate-300/50 dark:border-white/10 hover:border-purple-500/30 text-slate-700 dark:text-gray-300 hover:text-purple-500 transition-all duration-300"
            title="Toggle theme mode"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
          <Link
            to="/login"
            className="text-sm font-semibold leading-6 text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-gradient-to-r from-cyber-primary to-cyber-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-50 dark:bg-cyber-bg/95 border-l border-slate-200 dark:border-white/10 px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-slate-900 dark:text-white" onClick={() => setMobileMenuOpen(false)}>
              <FaCreativeCommonsShare className="h-8 w-8 text-cyber-secondary" />
              <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-cyber-secondary to-cyber-primary bg-clip-text text-transparent">
                GEN.AI
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-slate-900 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-8 flow-root">
            <div className="-my-6 divide-y divide-slate-200 dark:divide-white/5">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-4">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center rounded-full bg-gradient-to-r from-cyber-primary to-cyber-accent px-5 py-2.5 text-base font-semibold text-white shadow-lg shadow-purple-500/20"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
