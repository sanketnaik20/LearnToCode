import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowBigUp, ArrowBigDown, Tag, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../../context/AuthContext';
import clsx from 'clsx';

import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, onVote }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const {
        _id,
        title,
        author,
        type,
        tags,
        upvotes = [],
        downvotes = [],
        createdAt,
        voteCount
    } = post;

    const isUpvoted = user && upvotes.includes(user.id);
    const isDownvoted = user && downvotes.includes(user.id);

    const handleCardClick = () => {
        navigate(`/community/post/${_id}`);
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'INTERVIEW': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
            case 'ARTICLE': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
            case 'DISCUSSION': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={handleCardClick}
            className="group relative bg-white dark:bg-brand-grey-900 border border-brand-grey-200 dark:border-brand-grey-800 rounded-2xl p-6 hover:shadow-minimal transition-all duration-300 overflow-hidden cursor-pointer"
        >
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-linear-to-br from-white/50 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="flex gap-6 relative z-10">
                {/* Vote Section */}
                <div className="flex flex-col items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            onVote(_id, isUpvoted ? 'unvote' : 'upvote'); 
                        }}
                        className={clsx(
                            "p-1.5 rounded-lg transition-colors",
                            isUpvoted ? "bg-red-50 dark:bg-red-950/30" : "hover:bg-brand-grey-100 dark:hover:bg-brand-grey-800"
                        )}
                    >
                        <ArrowBigUp 
                            className={clsx(
                                "w-7 h-7 transition-all",
                                isUpvoted ? "text-red-500 fill-red-500" : "text-brand-grey-400 group-hover:text-brand-black dark:group-hover:text-brand-white"
                            )} 
                        />
                    </button>
                    <span className={clsx(
                        "font-display font-bold text-lg",
                        isUpvoted ? "text-red-500" : isDownvoted ? "text-blue-500" : ""
                    )}>{voteCount || 0}</span>
                    <button 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            onVote(_id, isDownvoted ? 'unvote' : 'downvote'); 
                        }}
                        className={clsx(
                            "p-1.5 rounded-lg transition-colors",
                            isDownvoted ? "bg-blue-50 dark:bg-blue-950/30" : "hover:bg-brand-grey-100 dark:hover:bg-brand-grey-800"
                        )}
                    >
                        <ArrowBigDown 
                            className={clsx(
                                "w-7 h-7 transition-all",
                                isDownvoted ? "text-blue-500 fill-blue-500" : "text-brand-grey-400 group-hover:text-brand-black dark:group-hover:text-brand-white"
                            )} 
                        />
                    </button>
                </div>

                {/* Content Section */}
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                        <span className={clsx("px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase", getTypeColor(type))}>
                            {type}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-brand-grey-400 font-bold uppercase tracking-widest">
                            <Clock className="w-3.5 h-3.5" />
                            {formatDistanceToNow(new Date(createdAt))} ago
                        </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-display font-black tracking-tight group-hover:text-brand-grey-700 dark:group-hover:text-brand-grey-300 transition-colors leading-tight">
                        {title}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {tags?.map(tag => (
                            <span key={tag} className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-brand-grey-500 bg-brand-grey-50 dark:bg-brand-grey-800/50 px-2.5 py-1 rounded-md border border-brand-grey-200 dark:border-brand-grey-800">
                                <Tag className="w-3 h-3" />
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-brand-grey-100 dark:border-brand-grey-800 mt-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-brand-grey-100 dark:bg-brand-grey-800 flex items-center justify-center overflow-hidden border border-brand-grey-200 dark:border-brand-grey-700">
                                {author?.avatar ? (
                                    <img src={author.avatar} alt={author.username} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-4 h-4 text-brand-grey-400" />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black">{author?.username}</span>
                                <span className="text-[10px] text-brand-grey-400 font-bold uppercase tracking-tighter">{author?.karma || 0} REPUTATION</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-grey-50/50 dark:bg-white/5 border border-brand-grey-100 dark:border-transparent text-brand-grey-500 group-hover:text-brand-black dark:group-hover:text-brand-white group-hover:bg-brand-grey-100 dark:group-hover:bg-white/10 transition-all">
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-xs font-black uppercase tracking-widest">View Post</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PostCard;
