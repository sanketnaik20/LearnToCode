import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Terminal, Check, X, ShieldAlert, ChevronLeft } from 'lucide-react';
import { cn } from '../../utils/cn';

export const QuizEngine = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(-1); // -1 is theory
    const [userAnswer, setUserAnswer] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/curriculum/${slug}`)
            .then(res => {
                setLesson(res.data.lesson);
                setQuestions(res.data.questions);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [slug]);

    const handleValidate = async () => {
        const q = questions[currentIdx];
        try {
            const res = await api.post('/progress/validate', {
                questionId: q._id,
                answer: userAnswer
            });
            setFeedback(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleNext = () => {
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(prev => prev + 1);
            setUserAnswer(null);
            setFeedback(null);
        } else {
            api.post('/progress/complete-lesson', { lessonId: lesson._id, score: 100 })
                .then(() => navigate('/'))
                .catch(err => console.error(err));
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-12 h-1px bg-brand-grey-200 dark:bg-brand-grey-800 animate-pulse" />
            <p className="font-display text-xs uppercase tracking-[0.4em] text-brand-grey-400">Loading Simulator</p>
        </div>
    );

    const currentQuestion = questions[currentIdx];

    return (
        <div className="max-w-4xl mx-auto min-h-[80vh] flex flex-col py-0 px-0">
            {/* Minimal Progress Line */}
            <div className="fixed top-0 left-20 right-0 h-1 bg-brand-grey-50 dark:bg-brand-grey-900 z-[100]">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIdx + 2) / (questions.length + 1)) * 100}%` }}
                    className="bg-foreground h-full transition-all duration-1000"
                />
            </div>

            <div className="mb-12">
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-brand-grey-400 hover:text-brand-black dark:hover:text-brand-white transition-colors group"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-display text-[10px] uppercase tracking-[0.3em] font-bold">Return to Console</span>
                </button>
            </div>

            <AnimatePresence mode="wait">
                {currentIdx === -1 ? (
                    <motion.div
                        key="theory"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        className="space-y-16"
                    >
                        <div className="space-y-6">
                            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-brand-grey-400">Conceptual Foundation</span>
                            <h1 className="text-6xl font-display font-bold text-foreground tracking-tight">{lesson.title}</h1>
                        </div>

                        <div className="space-y-12 max-w-2xl">
                            {lesson.content.map((item, i) => (
                                <div key={i} className="space-y-6">
                                    {item.type === 'text' && <p className="text-xl text-brand-grey-600 dark:text-brand-grey-400 font-light leading-relaxed">{item.body}</p>}
                                    {item.type === 'code' && (
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-brand-black/5 dark:bg-brand-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative border border-brand-grey-100 dark:border-brand-grey-900 overflow-hidden">
                                                <div className="flex border-b border-brand-grey-100 dark:border-brand-grey-900 p-3">
                                                    <div className="flex gap-1.5 font-mono text-[8px] uppercase tracking-widest text-brand-grey-400">
                                                        <span className="w-2 h-2 rounded-full border border-brand-grey-200  dark:border-brand-grey-800" /> Source_Main.cpp
                                                    </div>
                                                </div>
                                                <pre className="p-8 font-mono text-sm leading-relaxed overflow-x-auto bg-brand-grey-50/30 dark:bg-brand-grey-900/10">
                                                    <code className="text-foreground">{item.body}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button size="lg" onClick={() => setCurrentIdx(0)}>
                            Begin Practice <ArrowRight size={18} />
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key={currentIdx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                        className="space-y-16"
                    >
                        <div className="space-y-6">
                            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-brand-grey-400">Module Verification / {currentIdx + 1}</span>
                            <h2 className="text-4xl font-display font-bold text-foreground leading-tight max-w-2xl">{currentQuestion.prompt}</h2>
                        </div>

                        {currentQuestion.type === 'MCQ' && (
                            <div className="grid grid-cols-1 gap-4 max-w-2xl">
                                {currentQuestion.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setUserAnswer(i)}
                                        className={cn(
                                            "group p-8 border text-left transition-all duration-500 relative",
                                            userAnswer === i 
                                                ? "border-brand-black dark:border-brand-white bg-brand-grey-50 dark:bg-brand-grey-900/40" 
                                                : "border-brand-grey-100 dark:border-brand-grey-900 hover:border-brand-grey-400 dark:hover:border-brand-grey-600"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-6">
                                                <span className={cn(
                                                    "font-mono text-[10px] transition-colors",
                                                    userAnswer === i ? "text-foreground" : "text-brand-grey-300"
                                                )}>({String.fromCharCode(65 + i)})</span>
                                                <span className={cn(
                                                    "text-lg font-light transition-colors",
                                                    userAnswer === i ? "text-foreground" : "text-brand-grey-600 dark:text-brand-grey-400"
                                                )}>{opt}</span>
                                            </div>
                                            {userAnswer === i && <div className="w-1.5 h-1.5 bg-foreground rounded-full" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentQuestion.type === 'FILL_IN_BLANK' && (
                            <div className="border border-brand-grey-100 dark:border-brand-grey-900 bg-brand-grey-50/30 dark:bg-brand-grey-900/10 p-12 max-w-2xl">
                                <div className="font-mono text-lg leading-loose flex flex-wrap items-center gap-x-4">
                                    {currentQuestion.codeTemplate.split('___').map((part, i, arr) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <span className="text-brand-grey-600 dark:text-brand-grey-400">{part}</span>
                                            {i < arr.length - 1 && (
                                                <input
                                                    type="text"
                                                    autoFocus
                                                    onChange={(e) => setUserAnswer(e.target.value)}
                                                    className="min-w-[120px] bg-transparent border-b border-brand-grey-300 dark:border-brand-grey-700 focus:border-brand-black dark:focus:border-brand-white outline-none px-2 py-1 text-brand-black dark:text-brand-white transition-colors"
                                                    placeholder="type_logic"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="pt-12">
                            {!feedback ? (
                                <Button size="lg" disabled={userAnswer === null} onClick={handleValidate}>
                                    Validate Sequence
                                </Button>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex items-center justify-between p-10 border max-w-2xl",
                                        feedback.isCorrect 
                                            ? "border-brand-black dark:border-brand-white bg-brand-grey-50 dark:bg-brand-grey-900/40" 
                                            : "border-brand-grey-100 dark:border-brand-grey-900 bg-brand-grey-50/10"
                                    )}
                                >
                                    <div className="flex items-center gap-8">
                                        <div className={cn(
                                            "w-12 h-12 flex items-center justify-center rounded-full border",
                                            feedback.isCorrect ? "bg-brand-black dark:bg-brand-white border-brand-black dark:border-brand-white" : "border-brand-grey-300"
                                        )}>
                                            {feedback.isCorrect ? (
                                                <Check className="text-brand-white dark:text-brand-black" size={24} />
                                            ) : (
                                                <ShieldAlert className="text-brand-grey-600 dark:text-brand-grey-400" size={24} />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-display font-bold text-xl uppercase tracking-widest text-brand-black dark:text-brand-white">
                                                {feedback.isCorrect ? "Validated" : "Error Detected"}
                                            </p>
                                            <p className="text-brand-grey-500 text-sm font-light mt-1">
                                                {feedback.isCorrect ? `+${feedback.xpEarned} impact added to profile.` : "The logical sequence is invalid."}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="md" onClick={handleNext}>
                                        Proceed <ArrowRight size={16} />
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

