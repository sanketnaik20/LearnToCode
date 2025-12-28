import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const OAuthSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { loginWithToken } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            const handleLogin = async () => {
                try {
                    await loginWithToken(token);
                    navigate('/');
                } catch (err) {
                    console.error('OAuth sync failed:', err);
                    navigate('/login?error=sync_failed');
                }
            };
            handleLogin();
        } else {
            navigate('/login');
        }
    }, [searchParams, navigate, loginWithToken]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <div className="text-center space-y-4">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
                <p className="text-sm font-display uppercase tracking-widest animate-pulse">Synchronizing Identity...</p>
            </div>
        </div>
    );
};
