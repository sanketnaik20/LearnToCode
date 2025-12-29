import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { User, School, CheckCircle2, AlertCircle, TrendingUp, Award, Zap, LayoutGrid, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../../components/common/SEO';
import api from '../../services/api';

export const ProfilePage = () => {
    const { user, updateProfile } = useAuth();
    const [username, setUsername] = useState(user?.username || '');
    const [collegeName, setCollegeName] = useState(user?.collegeName || '');
    const [leetcodeUsername, setLeetcodeUsername] = useState(user?.leetcodeUsername || '');
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }
    const [lcStats, setLcStats] = useState(null);
    const [loadingStats, setLoadingStats] = useState(false);
    const [lcError, setLcError] = useState(null);

    useEffect(() => {
        // First try to load from localStorage for immediate display
        if (user?.leetcodeUsername) {
            const cachedData = localStorage.getItem(`lc_stats_${user.leetcodeUsername}`);
            if (cachedData) {
                setLcStats(JSON.parse(cachedData));
            }
            // Then fetch fresh data
            fetchLeetCodeStats(user.leetcodeUsername);
        }
    }, [user?.leetcodeUsername]);

    const fetchLeetCodeStats = async (targetUsername) => {
        if (!targetUsername) return;
        setLoadingStats(true);
        setLcError(null);
        try {
            const res = await api.get(`/problems/stats/${targetUsername}`);
            const statsWithTimestamp = {
                ...res.data,
                lastSynced: new Date().toISOString()
            };
            setLcStats(statsWithTimestamp);
            // Save to localStorage
            localStorage.setItem(`lc_stats_${targetUsername}`, JSON.stringify(statsWithTimestamp));
            setLcError(null);
        } catch (err) {
            console.error('Failed to fetch LeetCode stats:', err);
            setLcError(err.response?.data?.message || 'Failed to fetch LeetCode statistics.');
            
            // On error, if we don't have stats yet, check if there's old cached data
            if (!lcStats) {
                const cachedData = localStorage.getItem(`lc_stats_${targetUsername}`);
                if (cachedData) {
                    setLcStats(JSON.parse(cachedData));
                }
            }
        } finally {
            setLoadingStats(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setStatus(null);
        
        try {
            await updateProfile({ username, collegeName, leetcodeUsername });
            setStatus({ type: 'success', message: 'Identity protocols updated successfully.' });
            // Stats will be fetched by the useEffect as user object in context updates
            setTimeout(() => setStatus(null), 3000);
        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || 'Failed to update identity. Sync error.';
            setStatus({ type: 'error', message });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20 animate-apple-in">
            <SEO 
                title={`${user?.username || 'User'} Profile`}
                description="Manage your learning identity and visualize your LeetCode progress."
                path="/profile"
            />
            
            {/* Header Section - More Compact */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-grey-100 dark:border-brand-grey-900 pb-10">
                <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-brand-grey-400">User Identity Profile</span>
                    <h1 className="text-4xl font-display font-bold text-foreground tracking-tight">Identity Settings</h1>
                    <p className="text-brand-grey-500 font-light max-w-sm text-sm">Update your logical identity and synchronization protocols.</p>
                </div>
                
                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl bg-brand-grey-50/50 dark:bg-brand-grey-900/40 border border-brand-grey-100 dark:border-brand-grey-800 flex items-center gap-3">
                        <Zap size={14} className="text-yellow-500" />
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-brand-grey-400 font-bold">XP Points</p>
                            <p className="text-lg font-display font-bold leading-none">{user?.xp?.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="px-6 py-3 rounded-2xl bg-brand-grey-50/50 dark:bg-brand-grey-900/40 border border-brand-grey-100 dark:border-brand-grey-800 flex items-center gap-3">
                        <CheckCircle2 size={14} className="text-green-500" />
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-brand-grey-400 font-bold">Streak</p>
                            <p className="text-lg font-display font-bold leading-none">{user?.streakCount}d</p>
                        </div>
                    </div>
                    <div className="px-6 py-3 rounded-2xl bg-brand-grey-50/50 dark:bg-brand-grey-900/40 border border-brand-grey-100 dark:border-brand-grey-800 flex items-center gap-3">
                        <Users size={14} className="text-cyan-500" />
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-brand-grey-400 font-bold">Karma</p>
                            <p className="text-lg font-display font-bold leading-none">{user?.karma || 0}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Form Section - Spans 5 columns */}
                <div className="lg:col-span-5 space-y-12">
                    <form onSubmit={handleSave} className="space-y-10">
                        <div className="space-y-10">
                            <div className="group relative">
                                <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-[0.3em] text-brand-grey-400 font-bold transition-colors group-focus-within:text-foreground">Username</label>
                                <div className="relative">
                                    <User className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-grey-300 pointer-events-none" size={18} strokeWidth={1.5} />
                                    <input 
                                        type="text"
                                        className="w-full bg-transparent border-b border-brand-grey-100 dark:border-brand-grey-900 pl-10 py-4 text-xl font-light focus:outline-none focus:border-foreground transition-colors placeholder:text-brand-grey-400"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="logical_architect_01"
                                    />
                                </div>
                            </div>

                            <div className="group relative">
                                <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-[0.3em] text-brand-grey-400 font-bold transition-colors group-focus-within:text-foreground">College Name</label>
                                <div className="relative">
                                    <School className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-grey-300 pointer-events-none" size={18} strokeWidth={1.5} />
                                    <input 
                                        type="text"
                                        className="w-full bg-transparent border-b border-brand-grey-100 dark:border-brand-grey-900 pl-10 py-4 text-xl font-light focus:outline-none focus:border-foreground transition-colors placeholder:text-brand-grey-400"
                                        value={collegeName}
                                        onChange={(e) => setCollegeName(e.target.value)}
                                        placeholder="Department of Logical Engineering"
                                    />
                                </div>
                            </div>

                            <div className="group relative">
                                <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-[0.3em] text-cyan-500/60 font-bold transition-colors group-focus-within:text-cyan-500">LeetCode Username</label>
                                <div className="relative flex items-center">
                                    <LayoutGrid className="absolute left-0 top-1/2 -translate-y-1/2 text-cyan-500/40 pointer-events-none" size={18} strokeWidth={1.5} />
                                    <input 
                                        type="text"
                                        className="w-full bg-transparent border-b border-brand-grey-100 dark:border-brand-grey-900 pl-10 py-4 text-xl font-light focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-brand-grey-400"
                                        value={leetcodeUsername}
                                        onChange={(e) => setLeetcodeUsername(e.target.value)}
                                        placeholder="leetcode_id"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => fetchLeetCodeStats(leetcodeUsername)}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest font-bold text-cyan-500 hover:text-cyan-400 transition-colors"
                                    >
                                        Verify
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <Button 
                                type="submit" 
                                size="lg" 
                                disabled={isSaving || (username === user?.username && collegeName === user?.collegeName && leetcodeUsername === user?.leetcodeUsername)}
                            >
                                {isSaving ? 'Synchronizing...' : 'Update Identity'}
                            </Button>

                            <AnimatePresence>
                                {status && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className={`flex items-center gap-3 p-5 border ${
                                            status.type === 'success' 
                                                ? 'border-foreground bg-brand-grey-50/50 dark:bg-brand-grey-900/10' 
                                                : 'border-red-500/20 bg-red-500/5'
                                        }`}
                                    >
                                        {status.type === 'success' ? (
                                            <CheckCircle2 size={18} className="text-foreground" />
                                        ) : (
                                            <AlertCircle size={18} className="text-red-500" />
                                        )}
                                        <span className="text-[10px] uppercase tracking-widest font-bold">{status.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>
                </div>

                {/* LeetCode Stats Section - Spans 7 columns */}
                <div className="lg:col-span-7">
                    <div className="p-8 rounded-3xl bg-brand-grey-50/10 dark:bg-brand-grey-900/40 border border-brand-grey-100 dark:border-brand-grey-800 space-y-8 relative overflow-hidden group min-h-[450px]">
                        {/* Decorative background element */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/5 blur-3xl rounded-full" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/5 blur-3xl rounded-full" />
                        
                        <div className="flex justify-between items-center relative z-10">
                            <div className="space-y-1">
                                <h3 className="text-xl font-display font-bold uppercase tracking-tight">LeetCode Mastery</h3>
                                <p className="text-[10px] font-mono text-brand-grey-400 uppercase tracking-widest leading-none">
                                    {lcStats?.lastSynced 
                                        ? `Last Sync: ${new Date(lcStats.lastSynced).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` 
                                        : 'Real-time terminal sync'}
                                </p>
                            </div>
                            {lcStats && (
                                <button 
                                    onClick={() => fetchLeetCodeStats(user?.leetcodeUsername)}
                                    className="p-3 rounded-full bg-brand-grey-100 dark:bg-brand-grey-800 text-brand-grey-400 hover:text-foreground transition-all hover:rotate-180"
                                    title="Sync Now"
                                >
                                    <Zap size={16} />
                                </button>
                            )}
                        </div>

                        {lcError && (
                            <div className="flex flex-col items-center justify-center space-y-4 py-12 px-6 bg-red-500/5 border border-red-500/10 rounded-2xl animate-apple-in">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                    <AlertCircle size={24} />
                                </div>
                                <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest text-center leading-relaxed max-w-xs">
                                    {lcError}
                                </p>
                                <button 
                                    onClick={() => fetchLeetCodeStats(leetcodeUsername)}
                                    className="px-6 py-2 rounded-full border border-red-500/20 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                >
                                    Retry Connection
                                </button>
                            </div>
                        )}

                        {!lcStats && !loadingStats && !lcError && (
                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                                <div className="w-20 h-20 rounded-full bg-brand-grey-50 dark:bg-brand-grey-800/50 flex items-center justify-center text-brand-grey-300">
                                    <Award size={40} strokeWidth={1} />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-brand-grey-400">No profile linked</p>
                                    <p className="text-[10px] font-mono text-brand-grey-500 uppercase tracking-widest leading-loose max-w-[200px] mx-auto">
                                        Enter your LeetCode ID to visualize your competitive journey.
                                    </p>
                                </div>
                            </div>
                        )}

                        {loadingStats && (
                            <div className="flex flex-col items-center justify-center py-20 space-y-6">
                                <div className="relative">
                                    <div className="w-16 h-16 border border-brand-grey-100 dark:border-brand-grey-800 rounded-full" />
                                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-cyan-500 rounded-full animate-spin" />
                                </div>
                                <span className="text-[10px] font-mono text-brand-grey-500 uppercase tracking-[0.3em] animate-pulse">Establishing Link...</span>
                            </div>
                        )}

                        {lcStats && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
                                {/* Large Stats Row */}
                                <div className="flex items-center gap-10">
                                    <div className="relative flex-shrink-0">
                                        <svg className="w-32 h-32 transform -rotate-90">
                                            <circle
                                                cx="64"
                                                cy="64"
                                                r="58"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="transparent"
                                                className="text-brand-grey-100 dark:text-brand-grey-800"
                                            />
                                            <circle
                                                cx="64"
                                                cy="64"
                                                r="58"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="transparent"
                                                strokeDasharray={2 * Math.PI * 58}
                                                strokeDashoffset={2 * Math.PI * 58 * (1 - (lcStats.totalSolved / (lcStats.totalQuestions || 3300)))}
                                                className="text-cyan-500 transition-all duration-1000 ease-out"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-display font-bold tracking-tighter">{lcStats.totalSolved}</span>
                                            <span className="text-[8px] uppercase tracking-widest text-brand-grey-400 font-bold">Solved</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-brand-grey-400 font-bold mb-1">Global Rank</p>
                                                <p className="text-xl font-display font-bold tracking-tight">#{lcStats.ranking?.toLocaleString() || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-brand-grey-400 font-bold mb-1">Acceptance</p>
                                                <p className="text-xl font-display font-bold tracking-tight text-cyan-500">{lcStats.acceptanceRate}%</p>
                                            </div>
                                        </div>
                                        <div className="h-[1px] w-full bg-gradient-to-r from-brand-grey-100 dark:from-brand-grey-800 to-transparent" />
                                        <div className="flex items-center gap-2">
                                            <TrendingUp size={14} className="text-cyan-500" />
                                            <p className="text-[10px] font-mono text-brand-grey-500 uppercase tracking-widest">Performance is optimized</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Difficulty Breakdown Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { label: 'Easy', count: lcStats.easySolved, total: lcStats.totalEasy, color: 'rgb(34, 197, 94)', bg: 'rgba(34, 197, 94, 0.1)' },
                                        { label: 'Medium', count: lcStats.mediumSolved, total: lcStats.totalMedium, color: 'rgb(234, 179, 8)', bg: 'rgba(234, 179, 8, 0.1)' },
                                        { label: 'Hard', count: lcStats.hardSolved, total: lcStats.totalHard, color: 'rgb(239, 68, 68)', bg: 'rgba(239, 68, 68, 0.1)' }
                                    ].map((diff) => (
                                        <div key={diff.label} className="p-4 rounded-2xl bg-brand-grey-50/50 dark:bg-white/5 border border-brand-grey-100 dark:border-brand-grey-800 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: diff.color }}>{diff.label}</span>
                                                <span className="text-xs font-bold text-brand-grey-400">{diff.count}/{diff.total}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-brand-grey-100 dark:bg-brand-grey-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full transition-all duration-1000 ease-out"
                                                    style={{ 
                                                        width: `${(diff.count / diff.total) * 100}%`,
                                                        backgroundColor: diff.color 
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Metadata */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-brand-grey-100 dark:border-brand-grey-900">
                <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-brand-grey-400 font-bold">Account Created</p>
                    <p className="font-mono text-xs">{new Date(user?.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-brand-grey-400 font-bold">Data Identity</p>
                    <p className="font-mono text-xs uppercase truncate">{user?.email}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-brand-grey-400 font-bold">System Status</p>
                    <p className="font-mono text-xs text-green-500">OPTIMIZED_ACTIVE</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-brand-grey-400 font-bold">Node Version</p>
                    <p className="font-mono text-xs">v1.0.42-STABLE</p>
                </div>
            </div>
        </div>
    );
};
