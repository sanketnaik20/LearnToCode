import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Zap, Target, TrendingUp, Search } from 'lucide-react';
import { cn } from '../../utils/cn';
import api from '../../services/api';
import { SEO } from '../../components/common/SEO';

export const LeaderboardPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        rank: '--',
        percentile: 'Analyzing...',
        totalUsers: 0
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('ALL'); // ALL, TOP_10

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await api.get('/leaderboard');
                setUsers(res.data.users);
                setStats(res.data.userStats);
            } catch (err) {
                console.error("Failed to fetch leaderboard", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filter === 'ALL' || user.rank <= 10)
    );

    return (
        <div className="space-y-12 pb-20 max-w-5xl mx-auto">
            <SEO 
                title="Global Leaderboard" 
                description="Check your ranking among top C++ architects. See where you stand in the global hierarchy of logic mastered."
                path="/leaderboard"
            />
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Global Rank', value: `#${stats.rank}`, icon: Target },
                    { label: 'Top Percentile', value: stats.percentile, icon: TrendingUp },
                    { label: 'Total Architects', value: stats.totalUsers, icon: Zap },
                ].map((stat, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={stat.label}
                        className="p-8 border border-brand-grey-100 dark:border-brand-grey-900 bg-brand-grey-50/30 dark:bg-brand-grey-900/10"
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-grey-400">{stat.label}</p>
                                <p className="text-3xl font-display font-bold">{stat.value}</p>
                            </div>
                            <stat.icon size={20} className="text-brand-grey-300" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-end border-b border-brand-grey-100 dark:border-brand-grey-900 pb-8">
                <div className="flex gap-8">
                    {['ALL', 'TOP_10'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "text-[10px] font-display font-bold uppercase tracking-widest pb-2 transition-all relative",
                                filter === f ? "text-foreground" : "text-brand-grey-400 hover:text-foreground"
                            )}
                        >
                            {f.replace('_', ' ')}
                            {filter === f && (
                                <motion.div layoutId="activeFilter" className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                            )}
                        </button>
                    ))}
                </div>
                
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-grey-400" size={14} />
                    <input 
                        type="text"
                        placeholder="SEARCH_USER..."
                        className="w-full bg-transparent border-b border-brand-grey-100 dark:border-brand-grey-900 py-2 pl-10 text-[10px] font-mono tracking-widest focus:outline-none focus:border-foreground transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden border border-brand-grey-100 dark:border-brand-grey-900 min-h-[400px]">
                {loading ? (
                    <div className="flex items-center justify-center h-64 text-brand-grey-400 font-mono text-xs uppercase tracking-widest">
                        Loading Network Data...
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="flex items-center justify-center h-64 text-brand-grey-400 font-mono text-xs uppercase tracking-widest">
                        No architectures found.
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-grey-50 dark:bg-brand-grey-900/50 border-b border-brand-grey-100 dark:border-brand-grey-900">
                                <th className="p-6 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-grey-400 font-medium">Rank</th>
                                <th className="p-6 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-grey-400 font-medium">Architect</th>
                                <th className="p-6 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-grey-400 font-medium">Clearance</th>
                                <th className="p-6 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-grey-400 font-medium">Streak</th>
                                <th className="p-6 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-grey-400 font-medium text-right">Impact (XP)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, idx) => (
                                <motion.tr 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.02 }}
                                    key={user._id}
                                    className={cn(
                                        "border-b border-brand-grey-100/50 dark:border-brand-grey-900/50 transition-colors group",
                                        user.isCurrentUser ? "bg-brand-grey-50/50 dark:bg-brand-grey-900/20" : "hover:bg-brand-grey-50/30 dark:hover:bg-brand-grey-900/10"
                                    )}
                                >
                                    <td className="p-6 font-mono text-xs">
                                        <div className="flex items-center gap-3">
                                            {user.rank <= 3 ? (
                                                <Medal size={14} className={cn(
                                                    user.rank === 1 ? "text-foreground" : "text-brand-grey-400"
                                                )} />
                                            ) : (
                                                <span className="text-brand-grey-300">#</span>
                                            )}
                                            {String(user.rank).padStart(2, '0')}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "font-display font-bold uppercase tracking-widest text-sm",
                                                user.isCurrentUser ? "underline underline-offset-4" : ""
                                            )}>
                                                {user.username}
                                            </span>
                                            {user.isCurrentUser && (
                                                <span className="px-1.5 py-0.5 border border-foreground text-[8px] font-bold uppercase tracking-widest">Self</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="text-[9px] font-mono uppercase tracking-widest text-brand-grey-400 px-2 py-1 border border-brand-grey-100 dark:border-brand-grey-900 rounded-sm bg-background">
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            <Zap size={12} className={user.streakCount > 15 ? "fill-foreground" : "text-brand-grey-300"} />
                                            <span className="font-mono text-xs font-bold">{user.streakCount}d</span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-right font-mono text-xs font-bold tabular-nums">
                                        {user.xp.toLocaleString()}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            
            <div className="flex justify-center pt-8">
                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-brand-grey-300">Showing 50 identified architectures</p>
            </div>
        </div>
    );
};
