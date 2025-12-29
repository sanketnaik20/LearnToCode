import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, TrendingUp, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { communityService } from '../services/communityService';
import PostCard from '../components/PostCard';

const CommunityPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ type: '', sort: 'latest' });

    useEffect(() => {
        fetchPosts();
    }, [filter]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const data = await communityService.getPosts(filter);
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async (postId, voteType) => {
        try {
            await communityService.votePost(postId, voteType);
            fetchPosts(); 
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    const types = [
        { label: 'All', value: '' },
        { label: 'Interviews', value: 'INTERVIEW' },
        { label: 'Articles', value: 'ARTICLE' },
        { label: 'Discussions', value: 'DISCUSSION' }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-apple-in">
            {/* Toolbar & Action Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-4 bg-brand-grey-50 dark:bg-brand-grey-900 border border-brand-grey-200 dark:border-brand-grey-800 p-1.5 rounded-2xl w-full md:w-auto">
                    <div className="flex items-center gap-1">
                        {types.map(t => (
                            <button
                                key={t.value}
                                onClick={() => setFilter({ ...filter, type: t.value })}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                    filter.type === t.value 
                                    ? 'bg-white dark:bg-brand-grey-800 shadow-minimal text-brand-black dark:text-brand-white' 
                                    : 'text-brand-grey-500 hover:text-brand-black dark:hover:text-brand-white'
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-1 border-l border-brand-grey-200 dark:border-brand-grey-800 pl-4 h-6">
                        <button
                            onClick={() => setFilter({ ...filter, sort: 'latest' })}
                            className={`p-1.5 rounded-lg transition-colors ${filter.sort === 'latest' ? 'text-brand-black dark:text-brand-white' : 'text-brand-grey-400'}`}
                        >
                            <Clock className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setFilter({ ...filter, sort: 'top' })}
                            className={`p-1.5 rounded-lg transition-colors ${filter.sort === 'top' ? 'text-brand-black dark:text-brand-white' : 'text-brand-grey-400'}`}
                        >
                            <TrendingUp className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <Link 
                    to="/community/create" 
                    className="flex w-full md:w-auto items-center justify-center gap-2 bg-linear-to-b from-brand-grey-900 to-brand-black dark:from-brand-white dark:to-brand-grey-100 text-brand-white dark:text-brand-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-brand-black/20 dark:hover:shadow-brand-white/10"
                >
                    <Plus className="w-4 h-4" strokeWidth={4} />
                    Create Post
                </Link>
            </div>

            {/* Feed */}
            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="h-48 bg-brand-grey-100 dark:bg-brand-grey-800 rounded-2xl animate-pulse" />
                        ))
                    ) : posts.length > 0 ? (
                        posts.map(post => (
                            <PostCard key={post._id} post={post} onVote={handleVote} />
                        ))
                    ) : (
                        <div className="text-center py-20 border-2 border-dashed border-brand-grey-200 dark:border-brand-grey-800 rounded-3xl">
                            <h3 className="text-xl font-display font-bold text-brand-grey-400">No signals found in this frequency.</h3>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CommunityPage;
