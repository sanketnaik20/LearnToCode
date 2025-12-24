import { motion } from 'framer-motion';

export const PageLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
            <div className="relative">
                <span className="w-3 h-3 block rounded-full bg-brand-black dark:bg-brand-white animate-ping absolute top-0 left-0 opacity-50" />
                <span className="w-3 h-3 block rounded-full bg-brand-black dark:bg-brand-white relative" />
            </div>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="text-[10px] font-mono uppercase tracking-[0.4em] text-brand-grey-400"
            >
                Loading Segment...
            </motion.p>
        </div>
    );
};
