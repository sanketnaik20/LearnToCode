import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

export const PlaceholderPage = ({ title }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-8"
        >
            <div className="w-20 h-20 border border-brand-grey-100 dark:border-brand-grey-900 flex items-center justify-center rounded-full text-brand-grey-300">
                <Construction size={40} strokeWidth={1} />
            </div>
            
            <div className="space-y-4">
                <h1 className="text-4xl font-display font-bold text-foreground uppercase tracking-tighter italic opacity-20">{title}</h1>
                <div className="space-y-2">
                    <p className="text-brand-grey-500 font-mono text-sm uppercase tracking-[0.4em]">Feature yet to come</p>
                    <p className="text-brand-grey-400 font-light text-xs uppercase tracking-widest">Please wait for some days. System update in progress.</p>
                </div>
            </div>

            <div className="w-32 h-px bg-brand-grey-100 dark:bg-brand-grey-900" />
        </motion.div>
    );
};
