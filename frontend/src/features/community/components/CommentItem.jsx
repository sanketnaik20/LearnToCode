import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBigUp, ArrowBigDown, Reply, User, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../../context/AuthContext';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const CommentItem = ({ comment, allComments, onVote, onReply, depth = 0 }) => {
    const { user } = useAuth();
    const {
        _id,
        content,
        author,
        createdAt,
        voteCount,
        upvotes = [],
        downvotes = []
    } = comment;

    const isUpvoted = user && upvotes.includes(user.id);
    const isDownvoted = user && downvotes.includes(user.id);

    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    const children = allComments.filter(c => c.parentId === _id);

    const handleReplySubmit = () => {
        onReply(_id, replyContent);
        setReplyContent('');
        setIsReplying(false);
    };

    return (
        <div className={clsx("relative", depth > 0 && "ml-8 mt-4")}>
            {/* Thread line */}
            {depth > 0 && (
                <div className="absolute left-[-20px] top-0 bottom-0 w-[1px] bg-brand-grey-200 dark:bg-brand-grey-800" />
            )}

            <div className="group bg-white dark:bg-brand-grey-900 border border-brand-grey-100 dark:border-brand-grey-800 rounded-xl p-4 shadow-sm hover:border-brand-grey-300 dark:hover:border-brand-grey-700 transition-all duration-300">
                <div className="flex items-start gap-4">
                    {/* Vote Column */}
                    <div className="flex flex-col items-center pt-1">
                        <button 
                            onClick={() => onVote(_id, isUpvoted ? 'unvote' : 'upvote')}
                            className={clsx(
                                "p-1 rounded transition-colors",
                                isUpvoted ? "bg-red-50 dark:bg-red-950/30" : "hover:bg-brand-grey-100 dark:hover:bg-brand-grey-800"
                            )}
                        >
                            <ArrowBigUp className={clsx("w-5 h-5 transition-all", isUpvoted ? "text-red-500 fill-red-500" : "text-brand-grey-400 group-hover:text-brand-black dark:group-hover:text-brand-white")} />
                        </button>
                        <span className={clsx("text-xs font-bold my-0.5", isUpvoted && "text-red-500", isDownvoted && "text-blue-500")}>{voteCount || 0}</span>
                        <button 
                            onClick={() => onVote(_id, isDownvoted ? 'unvote' : 'downvote')}
                            className={clsx(
                                "p-1 rounded transition-colors",
                                isDownvoted ? "bg-blue-50 dark:bg-blue-950/30" : "hover:bg-brand-grey-100 dark:hover:bg-brand-grey-800"
                            )}
                        >
                            <ArrowBigDown className={clsx("w-5 h-5 transition-all", isDownvoted ? "text-blue-500 fill-blue-500" : "text-brand-grey-400 group-hover:text-brand-black dark:group-hover:text-brand-white")} />
                        </button>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-brand-grey-200 dark:bg-brand-grey-800 flex items-center justify-center overflow-hidden">
                                    {author?.avatar ? (
                                        <img src={author.avatar} alt={author.username} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-3 h-3 text-brand-grey-500" />
                                    )}
                                </div>
                                <span className="text-sm font-bold">{author?.username}</span>
                                <span className="text-[10px] text-brand-grey-500">• {formatDistanceToNow(new Date(createdAt))} ago</span>
                            </div>
                            <button className="text-brand-grey-400 hover:text-brand-black dark:hover:text-brand-white">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="text-sm text-brand-grey-700 dark:text-brand-grey-300 prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                                {content}
                            </ReactMarkdown>
                        </div>

                        <div className="pt-2 flex items-center gap-4">
                            <button 
                                onClick={() => setIsReplying(!isReplying)}
                                className="flex items-center gap-1.5 text-xs font-bold text-brand-grey-500 hover:text-brand-black dark:hover:text-brand-white transition-colors"
                            >
                                <Reply className="w-3.5 h-3.5" />
                                Reply
                            </button>
                        </div>

                        <AnimatePresence>
                            {isReplying && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden mt-3"
                                >
                                    <textarea
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        className="w-full bg-brand-grey-50 dark:bg-brand-grey-800/50 border border-brand-grey-200 dark:border-brand-grey-700 rounded-lg p-3 text-sm focus:ring-1 focus:ring-brand-black dark:focus:ring-brand-white outline-hidden"
                                        placeholder="Write a reply..."
                                        rows={3}
                                    />
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button 
                                            onClick={() => setIsReplying(false)}
                                            className="px-3 py-1.5 text-xs font-bold text-brand-grey-500 hover:text-brand-black dark:hover:text-brand-white"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={handleReplySubmit}
                                            disabled={!replyContent.trim()}
                                            className="px-3 py-1.5 text-xs font-bold bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black rounded-md disabled:opacity-50"
                                        >
                                            Post Reply
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Render children recursively */}
            {children.map(child => (
                <CommentItem 
                    key={child._id} 
                    comment={child} 
                    allComments={allComments}
                    onVote={onVote}
                    onReply={onReply}
                    depth={depth + 1}
                />
            ))}
        </div>
    );
};

export default CommentItem;
