import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { CurriculumTree } from './features/curriculum/CurriculumTree';
import { QuizEngine } from './features/quiz/QuizEngine';
import { LoginPage } from './features/auth/LoginPage';
import { Flame, Zap } from 'lucide-react';

const ProtectedLayout = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen pl-20 bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white selection:bg-brand-black selection:text-brand-white dark:selection:bg-brand-white dark:selection:text-brand-black">
      <Navbar />
      <main className="flex-1 px-12 py-16 animate-apple-in">
        <header className="flex justify-between items-end mb-20 max-w-6xl mx-auto border-b border-brand-grey-100 dark:border-brand-grey-900 pb-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-display font-bold tracking-tight">Console</h2>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-brand-black dark:bg-brand-white animate-pulse" />
              <p className="text-brand-grey-500 font-mono text-xs uppercase tracking-[0.2em]">Session: master_cpp_v1.0</p>
            </div>
          </div>
          <div className="flex gap-12 items-baseline">
            <div className="group transition-transform hover:-translate-y-1">
              <p className="text-[10px] uppercase tracking-widest text-brand-grey-400 font-display font-bold mb-1">Streak</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-display font-bold leading-none">{user.streakCount || 0}</span>
                <span className="text-xs text-brand-grey-400">Days</span>
              </div>
            </div>
            <div className="group transition-transform hover:-translate-y-1">
              <p className="text-[10px] uppercase tracking-widest text-brand-grey-400 font-display font-bold mb-1">Impact</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-display font-bold leading-none">{user.xp || 0}</span>
                <span className="text-xs text-brand-grey-400">XP</span>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedLayout><CurriculumTree /></ProtectedLayout>} />
        <Route path="/lesson/:slug" element={<ProtectedLayout><QuizEngine /></ProtectedLayout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
