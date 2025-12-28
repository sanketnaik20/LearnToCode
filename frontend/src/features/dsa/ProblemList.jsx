import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { PageLoader } from '../../components/layout/PageLoader';
import { ExternalLink } from 'lucide-react';

export const ProblemList = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const res = await api.get('/problems');
                setProblems(res.data);
            } catch (err) {
                console.error('Failed to fetch problems:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProblems();
    }, []);

    if (loading) return <PageLoader />;

    return (
        <div className="space-y-8 animate-apple-in">
            <div className="flex justify-between items-end border-b border-brand-grey-100 dark:border-brand-grey-900 pb-8">
                <div>
                    <h1 className="text-4xl font-display font-bold tracking-tight">LeetCode Lab</h1>
                    <p className="text-brand-grey-500 mt-2 font-mono text-xs uppercase tracking-widest">Protocol: external_solve_v2.0</p>
                </div>
            </div>

            <div className="grid gap-4">
                {problems.map(problem => (
                    <a 
                        key={problem._id} 
                        href={problem.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative bg-brand-grey-50/10 dark:bg-brand-grey-900/40 border border-brand-grey-100 dark:border-brand-grey-800 p-8 rounded-2xl transition-all hover:bg-brand-grey-50/20 dark:hover:bg-brand-grey-900/60 hover:border-brand-black dark:hover:border-brand-white hover:-translate-y-1 block"
                    >
                        <div className="flex justify-between items-center">
                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-2xl font-display font-bold group-hover:text-brand-blue-500 transition-colors uppercase tracking-tight">
                                        {problem.title}
                                    </h3>
                                    <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest ${
                                        problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                        problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                        {problem.difficulty}
                                    </span>
                                </div>
                                <p className="text-sm text-brand-grey-500 font-light max-w-2xl line-clamp-1">
                                    {problem.description}
                                </p>
                                <div className="flex gap-3">
                                    {problem.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-mono text-brand-grey-400 bg-brand-grey-100/50 dark:bg-brand-grey-800/50 px-2 py-0.5 rounded">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <ExternalLink size={20} className="text-brand-grey-300 group-hover:text-brand-black dark:group-hover:text-brand-white transition-colors" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-grey-400 opacity-0 group-hover:opacity-100 transition-opacity">Solve on LeetCode</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};
