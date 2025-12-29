import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowBigUp, ArrowBigDown, MessageSquare, Tag, User, Clock, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { useAuth } from '../../../context/AuthContext';
import { communityService } from '../services/communityService';
import CommentItem from '../components/CommentItem';
import clsx from 'clsx';

const PostDetailPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commentContent, setCommentContent] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);

    const isUpvoted = user && post?.upvotes?.includes(user.id);
    const isDownvoted = user && post?.downvotes?.includes(user.id);

    useEffect(() => {
        fetchPostData();
    }, [id]);

    const fetchPostData = async () => {
        try {
            setLoading(true);
            const [postData, commentsData] = await Promise.all([
                communityService.getPost(id),
                communityService.getComments(id)
            ]);
            setPost(postData);
            setComments(commentsData);
        } catch (error) {
            console.error('Error fetching post details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVotePost = async (voteType) => {
        try {
            await communityService.votePost(id, voteType);
            const updatedPost = await communityService.getPost(id);
            setPost(updatedPost);
        } catch (error) {
            console.error('Error voting on post:', error);
        }
    };

    const handleVoteComment = async (commentId, voteType) => {
        try {
            await communityService.voteComment(commentId, voteType);
            // Refresh comments
            const updatedComments = await communityService.getComments(id);
            setComments(updatedComments);
        } catch (error) {
            console.error('Error voting on comment:', error);
        }
    };

    const handlePostComment = async () => {
        if (!commentContent.trim()) return;
        try {
            setSubmittingComment(true);
            await communityService.createComment(id, { content: commentContent });
            setCommentContent('');
            // Refresh comments
            const updatedComments = await communityService.getComments(id);
            setComments(updatedComments);
        } catch (error) {
            console.error('Error posting comment:', error);
        } finally {
            setSubmittingComment(false);
        }
    };

    const handleReply = async (parentId, content) => {
        try {
            await communityService.createComment(id, { content, parentId });
            // Refresh comments
            const updatedComments = await communityService.getComments(id);
            setComments(updatedComments);
        } catch (error) {
            console.error('Error posting reply:', error);
        }
    };

    if (loading) return (
        <div className="max-w-4xl mx-auto px-4 py-20 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-brand-black dark:border-brand-white border-t-transparent rounded-full animate-spin" />
            <p className="font-display font-bold text-brand-grey-500">DECODING SIGNAL...</p>
        </div>
    );

    if (!post) return (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-display font-black">404: POST NOT FOUND</h1>
            <Link to="/community" className="mt-4 inline-block text-brand-grey-500 font-bold underline">Return to safety</Link>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            <Link 
                to="/community" 
                className="inline-flex items-center gap-2 text-brand-grey-500 hover:text-brand-black dark:hover:text-brand-white font-bold transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Community
            </Link>

            <div className="bg-white dark:bg-brand-grey-900 border border-brand-grey-200 dark:border-brand-grey-800 rounded-3xl overflow-hidden shadow-premium">
                {/* Post Header */}
                <div className="p-8 pb-4 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black rounded-full text-xs font-black tracking-widest uppercase">
                            {post.type}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-brand-grey-500 font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            {formatDistanceToNow(new Date(post.createdAt))} ago
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-grey-200 dark:bg-brand-grey-800 flex items-center justify-center">
                                {post.author?.avatar ? (
                                    <img src={post.author.avatar} alt={post.author.username} className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <User className="w-5 h-5 text-brand-grey-500" />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold">{post.author?.username}</span>
                                <span className="text-[10px] text-brand-grey-500 uppercase tracking-widest leading-none">{post.author?.karma || 0} Karma</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-brand-grey-50 dark:bg-brand-grey-800/50 p-2 rounded-2xl border border-brand-grey-100 dark:border-brand-grey-800">
                            <button 
                                onClick={() => handleVotePost(isUpvoted ? 'unvote' : 'upvote')}
                                className={clsx(
                                    "p-2 rounded-xl transition-all",
                                    isUpvoted ? "bg-red-100 dark:bg-red-950/30 text-red-500" : "text-brand-grey-400 hover:text-brand-black dark:hover:text-brand-white"
                                )}
                            >
                                <ArrowBigUp className={clsx("w-6 h-6", isUpvoted && "fill-red-500")} />
                            </button>
                            <span className={clsx("font-display font-black text-xl px-2", isUpvoted && "text-red-500")}>{post.voteCount || 0}</span>
                            <button 
                                onClick={() => handleVotePost(isDownvoted ? 'unvote' : 'downvote')}
                                className={clsx(
                                    "p-2 rounded-xl transition-all",
                                    isDownvoted ? "bg-blue-100 dark:bg-blue-950/30 text-blue-500" : "text-brand-grey-400 hover:text-brand-black dark:hover:text-brand-white"
                                )}
                            >
                                <ArrowBigDown className={clsx("w-6 h-6", isDownvoted && "fill-blue-500")} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-8 py-6 prose prose-lg dark:prose-invert max-w-none border-t border-brand-grey-100 dark:border-brand-grey-800">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                        {post.content}
                    </ReactMarkdown>
                </div>

                {/* Tags */}
                <div className="px-8 pb-8 flex flex-wrap gap-2">
                    {post.tags?.map(tag => (
                        <span key={tag} className="flex items-center gap-1.5 text-xs text-brand-grey-500 bg-brand-grey-50 dark:bg-brand-grey-800/50 px-3 py-1.5 rounded-full border border-brand-grey-200 dark:border-brand-grey-800 font-bold uppercase tracking-wider">
                            <Tag className="w-3.5 h-3.5" />
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <MessageSquare className="w-6 h-6" />
                    <h2 className="text-2xl font-display font-bold">{comments.length} Comments</h2>
                </div>

                {/* Post Comment Input */}
                <div className="bg-brand-grey-100/50 dark:bg-brand-grey-900/50 border border-brand-grey-200 dark:border-brand-grey-800 rounded-2xl p-4">
                    <textarea 
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Join the conversation..."
                        className="w-full bg-transparent border-none focus:ring-0 text-brand-grey-700 dark:text-brand-grey-300 resize-none min-h-[100px] text-lg outline-hidden"
                    />
                    <div className="flex justify-end pt-2">
                        <button 
                            onClick={handlePostComment}
                            disabled={submittingComment || !commentContent.trim()}
                            className="flex items-center gap-2 bg-brand-black text-brand-white dark:bg-brand-white dark:text-brand-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50"
                        >
                            {submittingComment ? 'Sending...' : (
                                <>
                                    Post Comment
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                    {comments.filter(c => !c.parentId).map(comment => (
                        <CommentItem 
                            key={comment._id} 
                            comment={comment} 
                            allComments={comments}
                            onVote={handleVoteComment}
                            onReply={handleReply}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostDetailPage;
