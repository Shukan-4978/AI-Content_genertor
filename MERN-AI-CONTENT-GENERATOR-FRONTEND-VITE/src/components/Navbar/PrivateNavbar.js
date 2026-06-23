import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { FiLogOut } from "react-icons/fi";
import { FaCreativeCommonsShare } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutAPI } from "../../apis/user/usersAPI";
import { useAuth } from "../../AuthContext/AuthContext";
import { useTheme } from "../../ThemeContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Pricing", href: "/plans" },
  { name: "History", href: "/history" },
];

export default function PrivateNavbar() {
  const { logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const mutation = useMutation({ mutationFn: logoutAPI });
  const { theme, toggleTheme } = useTheme();

  const navLinks = isAdmin
    ? [{ name: "Admin Panel", href: "/admin" }]
    : navigation;

  const handleLogout = () => {
    mutation.mutate(null, {
      onSuccess: () => {
        logout();
        navigate("/login");
      },
      onError: () => {
        // Fallback: logout even if API call fails
        logout();
        navigate("/login");
      }
    });
  };

  return (
    <Disclosure as="nav" className="fixed top-4 inset-x-0 z-50 px-4">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl rounded-full border border-slate-200/50 dark:border-white/10 bg-white/70 dark:bg-cyber-bg/70 backdrop-blur-md shadow-lg shadow-purple-500/5 transition-all duration-300 hover:border-purple-500/30 px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-slate-900 dark:hover:text-white focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Link to="/" className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <FaCreativeCommonsShare className="h-8 w-8 text-cyber-secondary animate-pulse" />
                    <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-cyber-secondary to-cyber-primary bg-clip-text text-transparent">
                      GEN.AI
                    </span>
                  </Link>
                </div>
                <div className="hidden md:ml-8 md:flex md:items-center md:space-x-6">
                  {navLinks.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`text-sm font-semibold transition-all duration-300 relative py-1 ${
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
              </div>
              
              <div className="flex items-center gap-3">
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
                  to="/generate-content"
                  className="relative inline-flex items-center gap-x-1.5 rounded-full bg-gradient-to-r from-cyber-primary to-cyber-accent px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
                >
                  <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                  Generate
                </Link>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="rounded-full p-2 bg-slate-200/50 dark:bg-white/5 border border-slate-300/50 dark:border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all duration-300"
                  title="Sign Out"
                >
                  <FiLogOut className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden mt-2 mx-auto max-w-7xl rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-cyber-bg/95 px-4 py-3 space-y-1">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={`block rounded-lg px-3 py-2 text-base font-semibold transition-all ${
                    isActive
                      ? "text-cyber-secondary bg-slate-200/50 dark:bg-white/5"
                      : "text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Disclosure.Button>
              );
            })}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
