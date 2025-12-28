import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { PageLoader } from './components/layout/PageLoader';

// Lazy load feature components
const CurriculumTree = lazy(() => import('./features/curriculum/CurriculumTree').then(module => ({ default: module.CurriculumTree })));
const QuizEngine = lazy(() => import('./features/quiz/QuizEngine').then(module => ({ default: module.QuizEngine })));
const Playground = lazy(() => import('./features/playground/Playground').then(module => ({ default: module.Playground })));
const LeaderboardPage = lazy(() => import('./features/leaderboard/LeaderboardPage').then(module => ({ default: module.LeaderboardPage })));
const LoginPage = lazy(() => import('./features/auth/LoginPage').then(module => ({ default: module.LoginPage })));
const ProfilePage = lazy(() => import('./features/auth/ProfilePage').then(module => ({ default: module.ProfilePage })));
const OAuthSuccess = lazy(() => import('./features/auth/OAuthSuccess').then(module => ({ default: module.OAuthSuccess })));
const ProblemList = lazy(() => import('./features/dsa/ProblemList').then(module => ({ default: module.ProblemList })));

const ProtectedLayout = ({ children, title = "Console" }) => {
  const { user, loading, refreshUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (user) refreshUser();
  }, [location.pathname]); // Refresh on route change
  
  if (loading) return <div className="h-screen w-screen flex items-center justify-center"><PageLoader /></div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen pl-20 bg-background text-foreground selection:bg-foreground selection:text-background">
      <Navbar />
      <main className="flex-1 px-12 py-10 animate-apple-in">
        <header className="flex justify-between items-end mb-12 max-w-6xl mx-auto border-b border-brand-grey-100 dark:border-brand-grey-900 pb-8">
          <div className="space-y-1">
            <h2 className="text-4xl font-display font-bold tracking-tight">{title}</h2>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-black dark:bg-brand-white animate-pulse" />
              <p className="text-brand-grey-500 font-mono text-[10px] uppercase tracking-[0.2em]">Session: master_cpp_v1.0</p>
            </div>
          </div>
          <div className="flex gap-10 items-baseline">
            <div className="group transition-transform hover:-translate-y-1">
              <p className="text-[9px] uppercase tracking-widest text-brand-grey-400 font-display font-bold mb-1">Streak</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-display font-bold leading-none">{user.streakCount || 0}</span>
                <span className="text-[10px] text-brand-grey-400">Days</span>
              </div>
            </div>
            <div className="group transition-transform hover:-translate-y-1">
              <p className="text-[9px] uppercase tracking-widest text-brand-grey-400 font-display font-bold mb-1">Impact</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-display font-bold leading-none">{user.xp || 0}</span>
                <span className="text-[10px] text-brand-grey-400">XP</span>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-6xl mx-auto min-h-[50vh]">
            <Suspense fallback={<PageLoader />}>
                {children}
            </Suspense>
        </div>
      </main>
    </div>
  );
};


function App() {
  return (
    <Router>
      <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><PageLoader /></div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/" element={<ProtectedLayout title="Console"><CurriculumTree /></ProtectedLayout>} />
          <Route path="/playground" element={<ProtectedLayout title="Playground"><Playground /></ProtectedLayout>} />
          <Route path="/leaderboard" element={<ProtectedLayout title="Leaderboard"><LeaderboardPage /></ProtectedLayout>} />
          <Route path="/dsa" element={<ProtectedLayout title="DSA Lab"><ProblemList /></ProtectedLayout>} />
          <Route path="/profile" element={<ProtectedLayout title="Profile"><ProfilePage /></ProtectedLayout>} />
          <Route path="/lesson/:slug" element={<ProtectedLayout title="Simulator"><QuizEngine /></ProtectedLayout>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
