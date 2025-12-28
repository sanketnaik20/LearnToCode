import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { LogOut, LayoutDashboard, Terminal, Trophy, User, Sun, Moon, AlertTriangle, Code } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";

export const Navbar = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navItems = [
    { label: "Learn", icon: LayoutDashboard, path: "/" },
    { label: "Playground", icon: Terminal, path: "/playground" },
    { label: "DSA Lab", icon: Code, path: "/dsa" },
    { label: "Leaderboard", icon: Trophy, path: "/leaderboard" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <nav className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-10 bg-background border-r border-brand-grey-100 dark:border-brand-grey-900 z-50">
        <div 
          className="mb-14 cursor-pointer group" 
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 border-2 border-foreground rounded-sm flex items-center justify-center font-display font-bold text-foreground text-lg transition-transform hover:scale-110 active:scale-95">
            L2C
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={cn(
                  "group relative p-3 transition-all duration-500",
                  isActive 
                    ? "text-foreground scale-110" 
                    : "text-brand-grey-400 hover:text-foreground"
                )}
              >
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                <div className={cn(
                  "absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-foreground rounded-full transition-all duration-500",
                  isActive ? "opacity-100" : "opacity-0 scale-0"
                )} />
                <span className="absolute left-full ml-6 px-3 py-1.5 bg-foreground text-background text-[10px] uppercase tracking-widest font-display font-bold rounded-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-all transform translate-x-3 group-hover:translate-x-0 whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={(e) => toggleTheme(e)}
            className="p-3 text-brand-grey-400 hover:text-foreground transition-colors relative group"
          >
            {theme === 'light' ? <Moon size={20} strokeWidth={1.5} /> : <Sun size={20} strokeWidth={1.5} />}
            <span className="absolute left-full ml-6 px-3 py-1.5 bg-foreground text-background text-[10px] uppercase tracking-widest font-display font-bold rounded-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-all transform translate-x-3 group-hover:translate-x-0 whitespace-nowrap">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </span>
          </button>

          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="p-3 text-brand-grey-400 hover:text-red-500 transition-colors group relative"
          >
            <LogOut size={20} strokeWidth={1.5} />
            <span className="absolute left-full ml-6 px-3 py-1.5 bg-red-500 text-white text-[10px] uppercase tracking-widest font-display font-bold rounded-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-all transform translate-x-3 group-hover:translate-x-0 whitespace-nowrap">
              Terminate Session
            </span>
          </button>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-brand-black/20 dark:bg-brand-white/5 animate-apple-in">
          <div className="w-full max-w-sm bg-background border border-brand-grey-100 dark:border-brand-grey-900 shadow-premium p-10 space-y-8 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50" />
            
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 border border-brand-grey-100 dark:border-brand-grey-900 flex items-center justify-center text-red-500">
                <AlertTriangle size={32} strokeWidth={1} className="animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold tracking-tight">Terminate Session?</h3>
                <p className="text-brand-grey-500 text-sm font-light leading-relaxed">
                  You are about to disconnect from the central terminal. Unsaved playground calculations may be lost.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                variant="primary" 
                className="w-full bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 text-white"
                onClick={handleLogout}
              >
                Confirm Termination
              </Button>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-4 text-[10px] uppercase tracking-widest font-bold text-brand-grey-400 hover:text-foreground transition-colors"
              >
                Cancel Protocol
              </button>
            </div>

            <div className="pt-4 text-center">
              <p className="text-[9px] font-mono text-brand-grey-300 uppercase tracking-[0.4em]">Auth Lock // Reference: 0x99282</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
