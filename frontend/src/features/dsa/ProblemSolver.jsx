import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme
import './dsa.css';
import api from '../../services/api';
import { PageLoader } from '../../components/layout/PageLoader';
import { CheckCircle, XCircle, Play, Send, ChevronLeft } from 'lucide-react';

export const ProblemSolver = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [results, setResults] = useState(null);
    const [activeTab, setActiveTab] = useState('description'); // 'description' or 'results'

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const res = await api.get(`/problems/${slug}`);
                setProblem(res.data);
                setCode(res.data.starterCode.cpp || res.data.starterCode.javascript || '');
            } catch (err) {
                console.error('Failed to fetch problem:', err);
                navigate('/dsa');
            } finally {
                setLoading(false);
            }
        };
        fetchProblem();
    }, [slug, navigate]);

    const handleSubmit = async () => {
        setSubmitting(true);
        setActiveTab('results');
        try {
            const res = await api.post('/problems/submit', {
                problemId: problem._id,
                language: 'cpp',
                code: code
            });
            setResults(res.data);
        } catch (err) {
            console.error('Submission failed:', err);
            setResults({ error: 'Failed to run code. Please check your syntax.' });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <PageLoader />;
    if (!problem) return null;

    return (
        <div className="flex flex-col h-[calc(100vh-250px)]">
            <button 
                onClick={() => navigate('/dsa')}
                className="flex items-center gap-2 text-brand-grey-500 hover:text-brand-black dark:hover:text-brand-white transition-colors mb-6 group w-fit"
            >
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-mono uppercase tracking-widest">Back to Problems</span>
            </button>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
                {/* Left Side: Problem Detail */}
                <div className="flex flex-col bg-brand-grey-50/10 dark:bg-brand-grey-900/40 border border-brand-grey-100 dark:border-brand-grey-800 rounded-3xl overflow-hidden">
                    <div className="flex border-b border-brand-grey-100 dark:border-brand-grey-800">
                        <button 
                            onClick={() => setActiveTab('description')}
                            className={`px-8 py-4 text-xs font-mono uppercase tracking-widest transition-colors ${activeTab === 'description' ? 'border-b-2 border-brand-black dark:border-brand-white text-brand-black dark:text-brand-white' : 'text-brand-grey-500 hover:text-brand-black dark:hover:text-brand-white'}`}
                        >
                            Description
                        </button>
                        <button 
                            onClick={() => setActiveTab('results')}
                            className={`px-8 py-4 text-xs font-mono uppercase tracking-widest transition-colors ${activeTab === 'results' ? 'border-b-2 border-brand-black dark:border-brand-white text-brand-black dark:text-brand-white' : 'text-brand-grey-500 hover:text-brand-black dark:hover:text-brand-white'}`}
                        >
                            Results
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        {activeTab === 'description' ? (
                            <div className="prose prose-invert max-w-none">
                                <div className="flex items-center gap-3 mb-4">
                                    <h1 className="text-2xl font-display font-bold m-0 uppercase tracking-tight">{problem.title}</h1>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${
                                        problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                        problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                        {problem.difficulty}
                                    </span>
                                </div>
                                <div className="flex gap-2 mb-8">
                                    {problem.tags.map(tag => (
                                        <span key={tag} className="text-[10px] bg-brand-grey-100 dark:bg-brand-grey-800 px-2 py-1 rounded text-brand-grey-500 italic">#{tag}</span>
                                    ))}
                                </div>
                                <div className="text-brand-grey-600 dark:text-brand-grey-400 leading-relaxed font-mono text-sm whitespace-pre-wrap">
                                    {problem.description}
                                </div>

                                {problem.testCases && problem.testCases.filter(tc => !tc.isHidden).length > 0 && (
                                    <div className="mt-12 space-y-6">
                                        <h4 className="text-xs font-mono uppercase tracking-widest text-brand-black dark:text-brand-white font-bold decoration-brand-blue-500 underline underline-offset-4">Examples</h4>
                                        {problem.testCases.filter(tc => !tc.isHidden).map((tc, idx) => (
                                            <div key={idx} className="space-y-3 bg-brand-black/5 dark:bg-brand-white/5 p-4 rounded-xl border border-brand-grey-100 dark:border-brand-grey-800">
                                                <div className="grid grid-cols-2 gap-4 text-[11px] font-mono">
                                                    <div>
                                                        <p className="text-brand-grey-400 uppercase tracking-widest mb-1 text-[9px]">Input</p>
                                                        <code className="text-brand-grey-600 dark:text-brand-grey-300">{tc.input}</code>
                                                    </div>
                                                    <div>
                                                        <p className="text-brand-grey-400 uppercase tracking-widest mb-1 text-[9px]">Expected</p>
                                                        <code className="text-brand-grey-600 dark:text-brand-grey-300">{tc.expectedOutput}</code>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {submitting ? (
                                    <div className="flex flex-col items-center justify-center h-full py-20 space-y-4">
                                        <div className="w-10 h-10 border-4 border-brand-grey-800 border-t-brand-black dark:border-t-brand-white rounded-full animate-spin"></div>
                                        <p className="text-xs font-mono uppercase tracking-widest text-brand-grey-500">Executing Test Cases...</p>
                                    </div>
                                ) : results ? (
                                    <div className="space-y-6">
                                        <div className={`p-6 rounded-2xl border ${results.allPassed ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                                            <div className="flex items-center gap-3">
                                                {results.allPassed ? <CheckCircle className="text-green-500" size={24} /> : <XCircle className="text-red-500" size={24} />}
                                                <div>
                                                    <h3 className={`text-lg font-display font-bold uppercase tracking-tight ${results.allPassed ? 'text-green-500' : 'text-red-500'}`}>
                                                        {results.allPassed ? 'Accepted' : 'Failed'}
                                                    </h3>
                                                    <p className="text-xs font-mono text-brand-grey-500">
                                                        {results.results?.filter(r => r.passed).length} / {results.results?.length} Test Cases Passed
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {results.results?.map((res, idx) => (
                                                <div key={idx} className={`p-4 rounded-xl border ${res.passed ? 'bg-green-500/5 border-green-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-grey-400">Test Case {idx + 1}</span>
                                                        {res.passed ? <span className="text-[10px] text-green-500 font-bold">PASS</span> : <span className="text-[10px] text-red-500 font-bold">FAIL</span>}
                                                    </div>
                                                    {!res.isHidden && (
                                                        <div className="grid grid-cols-2 gap-4 text-[10px] font-mono">
                                                            <div>
                                                                <p className="text-brand-grey-500 mb-1">Input:</p>
                                                                <code className="text-brand-grey-400">{res.input}</code>
                                                            </div>
                                                            <div>
                                                                <p className="text-brand-grey-500 mb-1">Output:</p>
                                                                <code className={res.passed ? 'text-green-500' : 'text-red-500'}>{res.actual || res.error}</code>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {res.isHidden && (
                                                        <p className="text-[10px] font-mono italic text-brand-grey-500">Hidden Test Case</p>
                                                    )}
                                                </div>
                                            ))}
                                            {results.error && (
                                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                                    <p className="text-xs font-mono text-red-500">{results.error}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-20 text-center space-y-4">
                                        <Play size={40} className="text-brand-grey-200 dark:text-brand-grey-800" />
                                        <p className="text-xs font-mono uppercase tracking-widest text-brand-grey-500">Run your code to see results</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Code Editor */}
                <div className="flex flex-col bg-brand-grey-50/10 dark:bg-brand-grey-900/40 border border-brand-grey-100 dark:border-brand-grey-800 rounded-3xl overflow-hidden">
                    <div className="flex justify-between items-center border-b border-brand-grey-100 dark:border-brand-grey-800 px-6">
                        <div className="flex items-center gap-4">
                             <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                            </div>
                            <span className="py-4 text-xs font-mono uppercase tracking-widest text-brand-black dark:text-brand-white border-b-2 border-brand-black dark:border-brand-white">
                                main.cpp
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                             <div className="text-[10px] font-mono text-brand-grey-400 uppercase tracking-widest">Language: C++</div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-[#0a0a0a]">
                        <Editor
                            value={code}
                            onValueChange={code => setCode(code)}
                            highlight={code => Prism.highlight(code, Prism.languages.cpp, 'cpp')}
                            padding={20}
                            style={{
                                fontFamily: '"Fira Code", "Fira Mono", monospace',
                                fontSize: 13,
                                minHeight: '100%',
                                color: '#abb2bf',
                            }}
                            className="outline-none"
                        />
                    </div>

                    <div className="p-6 border-t border-brand-grey-100 dark:border-brand-grey-800 flex justify-end gap-4 bg-background">
                         <button 
                            disabled={submitting}
                            className="px-6 py-2.5 rounded-xl border border-brand-grey-200 dark:border-brand-grey-800 text-[10px] font-mono uppercase tracking-widest hover:bg-brand-grey-50 dark:hover:bg-brand-grey-900 transition-colors flex items-center gap-2"
                        >
                            <Play size={12} />
                            Run Local
                        </button>
                        <button 
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="px-8 py-2.5 rounded-xl bg-brand-black dark:bg-brand-white text-brand-white dark:text-brand-black text-[10px] font-mono uppercase tracking-widest hover:scale-[1.02] transition-all active:scale-[0.98] flex items-center gap-2 shadow-xl shadow-brand-black/10 dark:shadow-brand-white/10"
                        >
                            {submitting ? 'Testing...' : (
                                <>
                                    <Send size={12} />
                                    Submit Solution
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
