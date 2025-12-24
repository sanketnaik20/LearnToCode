import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { User, School, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProfilePage = () => {
    const { user, updateProfile } = useAuth();
    const [username, setUsername] = useState(user?.username || '');
    const [collegeName, setCollegeName] = useState(user?.collegeName || '');
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setStatus(null);
        
        try {
            await updateProfile({ username, collegeName });
            setStatus({ type: 'success', message: 'Identity protocols updated successfully.' });
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
        <div className="max-w-2xl space-y-16 py-10">
            <div className="space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-brand-grey-400">User Identity Profile</span>
                <h1 className="text-5xl font-display font-bold text-foreground tracking-tight">Identity Settings</h1>
                <p className="text-brand-grey-500 font-light max-w-md">Update your logical identity and institutional affiliation to synchronize with the global leaderboard.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-12">
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

                    <div className="group relative opacity-40">
                        <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-[0.3em] text-brand-grey-400 font-bold">Email Address (Locked)</label>
                        <div className="py-4 text-xl font-light font-mono truncate">{user?.email}</div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <Button 
                        type="submit" 
                        size="lg" 
                        disabled={isSaving || (username === user?.username && collegeName === user?.collegeName)}
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

            <div className="pt-10 grid grid-cols-2 gap-10 border-t border-brand-grey-100 dark:border-brand-grey-900">
                <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-brand-grey-400 font-bold">Account Created</p>
                    <p className="font-mono text-sm">{new Date(user?.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-brand-grey-400 font-bold">Logic Level</p>
                    <p className="font-mono text-sm">Architect v1.0</p>
                </div>
            </div>
        </div>
    );
};
