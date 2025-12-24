import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { LogOut, LayoutDashboard, Terminal, Trophy, User, Sun, Moon } from "lucide-react";
import { cn } from "../../utils/cn";

export const Navbar = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Learn", icon: LayoutDashboard, path: "/" },
    { label: "Terminal", icon: Terminal, path: "/playground" },
    { label: "Leaderboard", icon: Trophy, path: "/leaderboard" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  return (
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
              <span className="absolute left-full ml-6 px-3 py-1.5 bg-foreground text-background text-[10px] uppercase tracking-widest font-display font-bold rounded-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap">
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
          <span className="absolute left-full ml-6 px-3 py-1.5 bg-foreground text-background text-[10px] uppercase tracking-widest font-display font-bold rounded-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </button>

        <button
          onClick={logout}
          className="p-3 text-brand-grey-400 hover:text-foreground transition-colors group relative"
        >
          <LogOut size={20} strokeWidth={1.5} />
          <span className="absolute left-full ml-6 px-3 py-1.5 bg-foreground text-background text-[10px] uppercase tracking-widest font-display font-bold rounded-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap">
            Logout
          </span>
        </button>
      </div>
    </nav>
  );
};

