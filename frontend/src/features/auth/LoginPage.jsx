import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, AlertCircle, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';

export const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { login, register, user } = useAuth();
    const { theme, toggleTheme } = useTheme();
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
        <>
            <SEO 
                title={isLogin ? "Login" : "Register"} 
                description="Securely access the LearnToCode central terminal to continue your C++ architectural journey."
                path="/login"
            />
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground relative">
            {/* Theme Toggle Button */}
            <div className="fixed top-8 right-8">
                <button
                    onClick={(e) => toggleTheme(e)}
                    className="p-3 text-brand-grey-400 hover:text-foreground transition-colors relative group border border-transparent hover:border-brand-grey-100 dark:hover:border-brand-grey-900 rounded-sm"
                >
                    {theme === 'light' ? <Moon size={20} strokeWidth={1.5} /> : <Sun size={20} strokeWidth={1.5} />}
                    <span className="absolute right-full mr-4 px-3 py-1.5 bg-foreground text-background text-[10px] uppercase tracking-widest font-display font-bold rounded-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-all transform translate-x-3 group-hover:translate-x-0 whitespace-nowrap">
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                </button>
            </div>

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
                                    className="w-full bg-transparent border-b border-brand-grey-200 dark:border-brand-grey-800 py-3 text-lg font-light focus:outline-none focus:border-brand-black dark:focus:border-brand-white transition-colors placeholder:text-brand-grey-400 dark:placeholder:text-brand-grey-600"
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
                                className="w-full bg-transparent border-b border-brand-grey-200 dark:border-brand-grey-800 py-3 text-lg font-light focus:outline-none focus:border-brand-black dark:focus:border-brand-white transition-colors placeholder:text-brand-grey-400 dark:placeholder:text-brand-grey-600"
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
                                className="w-full bg-transparent border-b border-brand-grey-200 dark:border-brand-grey-800 py-3 text-lg font-light focus:outline-none focus:border-brand-black dark:focus:border-brand-white transition-colors placeholder:text-brand-grey-400 dark:placeholder:text-brand-grey-600"
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
                        
                        <div className="relative">
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-brand-grey-100 dark:border-brand-grey-900" />
                            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-bold">
                                <span className="bg-background px-4 text-brand-grey-400">External Node</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/auth/google`}
                            className="w-full py-4 border border-brand-grey-200 dark:border-brand-grey-800 flex items-center justify-center gap-3 hover:bg-brand-grey-50 dark:hover:bg-brand-grey-900 transition-colors group"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                                    fill="#EB4335"
                                />
                            </svg>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-brand-grey-500 group-hover:text-brand-black dark:group-hover:text-brand-white">Authenticate with Google</span>
                        </button>
                        
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
                    <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-brand-grey-400">End Level Security // v1.0.4</p>
                </div>
            </div>
        </div>
        </>
    );
};


