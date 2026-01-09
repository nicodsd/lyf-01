import React, { useState } from 'react';

interface Comment {
    id: number;
    author: string;
    text: string;
    timestamp: string;
}

interface CommentsProps {
    initialComments?: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ initialComments = [] }) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newCommentText, setNewCommentText] = useState<string>('');
    const [newCommentAuthor, setNewCommentAuthor] = useState<string>('Anonymous');

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCommentText.trim()) {
            const newComment: Comment = {
                id: comments.length + 1,
                author: newCommentAuthor.trim() || 'Anonymous',
                text: newCommentText.trim(),
                timestamp: new Date().toLocaleString(),
            };
            setComments([...comments, newComment]);
            setNewCommentText('');
            setNewCommentAuthor('Anonymous'); // Reset author or keep it
        }
    };

    return (
        <div className="comments-section">
            <h2 className="text-xl font-bold mb-4">Comments</h2>

            <div className="comment-list mb-6">
                {comments.length === 0 ? (
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-100 p-3 rounded-lg mb-3">
                            <p className="font-semibold text-gray-800">{comment.author}</p>
                            <p className="text-gray-700 mt-1">{comment.text}</p>
                            <p className="text-sm text-gray-500 mt-1">{comment.timestamp}</p>
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={handleSubmitComment} className="comment-form">
                <h3 className="text-lg font-semibold mb-3">Add a Comment</h3>
                <div className="mb-3">
                    <label htmlFor="commentAuthor" className="block text-sm font-medium text-gray-700">
                        Your Name (optional)
                    </label>
                    <input
                        type="text"
                        id="commentAuthor"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={newCommentAuthor}
                        onChange={(e) => setNewCommentAuthor(e.target.value)}
                        placeholder="Anonymous"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="commentText" className="block text-sm font-medium text-gray-700">
                        Your Comment
                    </label>
                    <textarea
                        id="commentText"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        rows={4}
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        placeholder="Write your comment here..."
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Post Comment
                </button>
            </form>
        </div>
    );
};

export default Comments;
