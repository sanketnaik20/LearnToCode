import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { communityService } from '../services/communityService';
import MarkdownEditor from '../components/MarkdownEditor';

const CreatePostPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'DISCUSSION',
        tags: []
    });
    const [tagInput, setTagInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.content) return;

        try {
            setLoading(true);
            await communityService.createPost(formData);
            navigate('/community');
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTagAdd = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
            }
            setTagInput('');
        }
    };

    const removeTag = (tag) => {
        setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Link 
                to="/community" 
                className="inline-flex items-center gap-2 text-brand-grey-500 hover:text-brand-black dark:hover:text-brand-white font-bold mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Feed
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-brand-grey-900 border border-brand-grey-200 dark:border-brand-grey-800 rounded-3xl p-8 shadow-premium"
            >
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-brand-black dark:bg-brand-white rounded-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-brand-white dark:text-brand-black" />
                    </div>
                    <h1 className="text-3xl font-display font-black tracking-tight">CREATE POST</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-brand-grey-500 uppercase tracking-widest">Post Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-brand-grey-50 dark:bg-brand-grey-800/50 border border-brand-grey-200 dark:border-brand-grey-700 rounded-xl px-4 py-3 text-xl font-display font-bold focus:ring-2 focus:ring-brand-black dark:focus:ring-brand-white outline-hidden transition-all"
                            placeholder="Engineering a faster brain..."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-brand-grey-500 uppercase tracking-widest">Category</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full bg-brand-grey-50 dark:bg-brand-grey-800/50 border border-brand-grey-200 dark:border-brand-grey-700 rounded-xl px-4 py-3 font-bold appearance-none outline-hidden"
                            >
                                <option value="DISCUSSION">General Discussion</option>
                                <option value="INTERVIEW">Interview Experience</option>
                                <option value="ARTICLE">Technical Article</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-brand-grey-500 uppercase tracking-widest">Tags</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.tags.map(tag => (
                                    <span key={tag} className="bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)} className="hover:opacity-60">×</button>
                                    </span>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagAdd}
                                className="w-full bg-brand-grey-50 dark:bg-brand-grey-800/50 border border-brand-grey-200 dark:border-brand-grey-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-black dark:focus:ring-brand-white outline-hidden"
                                placeholder="Press Enter to add tags"
                            />
                        </div>
                    </div>

                    <MarkdownEditor 
                        label="Content"
                        value={formData.content}
                        onChange={(val) => setFormData({ ...formData, content: val })}
                    />

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading || !formData.title || !formData.content}
                            className="flex items-center gap-2 bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform disabled:opacity-50 shadow-lg"
                        >
                            {loading ? 'POSTING...' : (
                                <>
                                    PUBLISH 
                                    <Send className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CreatePostPage;
