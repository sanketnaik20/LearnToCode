import { cn } from "../../utils/cn";

export const Button = ({ className, variant = "primary", size = "md", children, ...props }) => {
  const variants = {
    primary: "bg-brand-black dark:bg-brand-white text-brand-white dark:text-brand-black hover:opacity-90 active:scale-[0.98]",
    secondary: "bg-brand-grey-100 dark:bg-brand-grey-900 text-brand-black dark:text-brand-white hover:bg-brand-grey-200 dark:hover:bg-brand-grey-800",
    outline: "border border-brand-black dark:border-brand-white text-brand-black dark:text-brand-white hover:bg-brand-black hover:text-brand-white dark:hover:bg-brand-white dark:hover:text-brand-black",
    ghost: "bg-transparent text-brand-grey-500 hover:text-brand-black dark:hover:text-brand-white"
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px] uppercase tracking-widest font-bold",
    md: "px-6 py-3 text-xs uppercase tracking-widest font-bold",
    lg: "px-10 py-5 text-sm uppercase tracking-[0.2em] font-bold"
  };

  return (
    <button
      className={cn(
        "rounded-sm transition-all duration-300 disabled:opacity-20 disabled:pointer-events-none flex items-center justify-center gap-3 font-display",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
