import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { login, register, user } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                if (!username) {
                    setError('Username is required for initialization.');
                    setIsLoading(false);
                    return;
                }
                await register(username, email, password);
            }
            // Navigate will be handled by the useEffect above
        } catch (err) {
            console.error('Auth Error:', err);
            const message = err.response?.data?.message || 'Authentication sequence failed.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white">
            <div className="w-full max-w-sm space-y-16 animate-apple-in">
                <div className="text-center space-y-8">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 border-2 border-brand-black dark:border-brand-white flex items-center justify-center">
                            <ShieldCheck size={32} strokeWidth={1} />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-4xl font-display font-bold tracking-tight">LearnToCode</h1>
                        <p className="text-brand-grey-500 font-light text-sm uppercase tracking-[0.3em]">Accessing Central Terminal</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="space-y-10">
                        {error && (
                            <div className="flex items-center gap-3 p-4 bg-brand-grey-50 dark:bg-brand-grey-900 border border-brand-black/10 dark:border-brand-white/10 animate-apple-in">
                                <AlertCircle size={16} className="text-brand-black dark:text-brand-white" />
                                <p className="text-xs font-display font-bold uppercase tracking-widest">{error}</p>
                            </div>
                        )}

                        {!isLogin && (
                            <div className="group relative">
                                <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-widest text-brand-grey-400 font-bold transition-colors group-focus-within:text-brand-black dark:group-focus-within:text-brand-white">Username</label>
                                <input 
                                    type="text"
                                    required
                                    className="w-full bg-transparent border-b border-brand-grey-200 dark:border-brand-grey-800 py-3 text-lg font-light focus:outline-none focus:border-brand-black dark:focus:border-brand-white transition-colors placeholder:text-brand-grey-100 dark:placeholder:text-brand-grey-900"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="identity_01"
                                />
                            </div>
                        )}
                        <div className="group relative">
                            <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-widest text-brand-grey-400 font-bold transition-colors group-focus-within:text-brand-black dark:group-focus-within:text-brand-white">Email</label>
                            <input 
                                type="email"
                                required
                                className="w-full bg-transparent border-b border-brand-grey-200 dark:border-brand-grey-800 py-3 text-lg font-light focus:outline-none focus:border-brand-black dark:focus:border-brand-white transition-colors placeholder:text-brand-grey-100 dark:placeholder:text-brand-grey-900"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="protocol@system.io"
                            />
                        </div>
                        <div className="group relative">
                            <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-widest text-brand-grey-400 font-bold transition-colors group-focus-within:text-brand-black dark:group-focus-within:text-brand-white">Password</label>
                            <input 
                                type="password"
                                required
                                className="w-full bg-transparent border-b border-brand-grey-200 dark:border-brand-grey-800 py-3 text-lg font-light focus:outline-none focus:border-brand-black dark:focus:border-brand-white transition-colors placeholder:text-brand-grey-100 dark:placeholder:text-brand-grey-900"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
                            {isLoading ? 'Processing...' : (isLogin ? 'Initiate Session' : 'Create Profile')}
                        </Button>
                        
                        <div className="text-center">
                            <button 
                                type="button"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError('');
                                }}
                                className="text-brand-grey-400 hover:text-brand-black dark:hover:text-brand-white text-xs font-display uppercase tracking-widest transition-colors pb-1 border-b border-transparent hover:border-brand-grey-200"
                            >
                                {isLogin ? "No account? Register" : "Existing? Login"}
                            </button>
                        </div>
                    </div>
                </form>

                <div className="pt-20 text-center">
                    <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-grey-300">End Level Security // v1.0.4</p>
                </div>
            </div>
        </div>
    );
};


