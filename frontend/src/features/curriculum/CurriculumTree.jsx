import { useState, useEffect } from 'react';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { SEO } from '../../components/common/SEO';

export const LessonNode = ({ lesson, index }) => {
    const navigate = useNavigate();
    const isLocked = lesson.status === 'LOCKED';
    const isCompleted = lesson.status === 'COMPLETED';
    
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="w-full max-w-xl group relative"
        >
            <button
                disabled={isLocked}
                onClick={() => navigate(`/lesson/${lesson.slug}`)}
                className={cn(
                    "w-full flex items-center justify-between p-8 text-left transition-all duration-500",
                    "border-b border-brand-grey-100 dark:border-brand-grey-900",
                    isLocked 
                        ? "opacity-40 cursor-not-allowed" 
                        : isCompleted
                            ? "bg-brand-grey-50/50 dark:bg-brand-grey-900/10"
                            : "hover:bg-brand-grey-50/80 dark:hover:bg-brand-grey-900/40"
                )}
            >
                <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-brand-grey-400 mb-1">
                        Module {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className={cn(
                        "text-xl font-display font-bold tracking-tight",
                        isLocked ? "text-brand-grey-400" : "text-foreground"
                    )}>
                        {lesson.title}
                    </h3>
                    <p className="text-sm text-brand-grey-500 font-light mt-2 max-w-md leading-relaxed">
                        {lesson.description || "Mastering the core fundamentals of logical architecture and syntax."}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {isLocked ? (
                        <Lock size={18} className="text-brand-grey-300" />
                    ) : isCompleted ? (
                        <div className="w-8 h-8 rounded-full border border-foreground flex items-center justify-center">
                            <Check size={16} />
                        </div>
                    ) : (
                        <div className="w-10 h-10 flex items-center justify-center group-hover:translate-x-2 transition-transform duration-500">
                            <ArrowRight size={24} strokeWidth={1.5} />
                        </div>
                    )}
                </div>
            </button>
        </motion.div>
    );
};

export const CurriculumTree = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/curriculum')
            .then(res => setLessons(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-12 h-1px bg-brand-grey-200 dark:bg-brand-grey-800 animate-pulse" />
            <p className="font-display text-xs uppercase tracking-[0.4em] text-brand-grey-400">Synchronizing</p>
        </div>
    );

    return (
        <div className="space-y-4 pb-20">
            <SEO 
                title="Curriculum" 
                description="Explore our comprehensive C++ curriculum, from basic variables to advanced kernel concepts."
                path="/"
            />
            <div className="mb-12">
                <p className="text-brand-grey-500 text-sm max-w-lg leading-relaxed">
                    Build your technical foundation through a curated sequence of logical challenges. Each module is designed to challenge your existing mental models.
                </p>
            </div>
            <div className="flex flex-col border-t border-brand-grey-100 dark:border-brand-grey-900">
                {lessons.map((lesson, idx) => (
                    <LessonNode key={lesson._id} lesson={lesson} index={idx} />
                ))}
            </div>
        </div>
    );
};

