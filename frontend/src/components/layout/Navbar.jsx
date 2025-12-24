import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut, LayoutDashboard, Terminal, Trophy, User } from "lucide-react";
import { cn } from "../../utils/cn";

export const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Learn", icon: LayoutDashboard, path: "/" },
    { label: "Terminal", icon: Terminal, path: "/playground" },
    { label: "Leaderboard", icon: Trophy, path: "/leaderboard" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-10 bg-brand-white dark:bg-brand-black border-r border-brand-grey-100 dark:border-brand-grey-900 z-50">
      <div 
        className="mb-14 cursor-pointer group" 
        onClick={() => navigate("/")}
      >
        <div className="w-10 h-10 border-2 border-brand-black dark:border-brand-white rounded-sm flex items-center justify-center font-display font-bold text-brand-black dark:text-brand-white text-lg transition-transform hover:scale-110 active:scale-95">
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
                  ? "text-brand-black dark:text-brand-white scale-110" 
                  : "text-brand-grey-400 hover:text-brand-black dark:hover:text-brand-white"
              )}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
              <div className={cn(
                "absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-brand-black dark:bg-brand-white rounded-full transition-all duration-500",
                isActive ? "opacity-100" : "opacity-0 scale-0"
              )} />
              <span className="absolute left-full ml-6 px-3 py-1.5 bg-brand-black dark:bg-brand-white text-brand-white dark:text-brand-black text-[10px] uppercase tracking-widest font-display font-bold rounded-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={logout}
        className="p-3 text-brand-grey-400 hover:text-brand-black dark:hover:text-brand-white transition-colors"
      >
        <LogOut size={20} strokeWidth={1.5} />
      </button>
    </nav>
  );
};

