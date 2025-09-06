// src/components/CommentBox.tsx
import React, { useState } from "react";

interface Comment {
  id: string;
  authorEmail: string;
  content: string;
  createdAt: string;
}

const mockComments: Comment[] = [
  {
    id: "1",
    authorEmail: "user1@example.com",
    content: "This task looks good!",
    createdAt: "2025-09-01T12:00:00Z",
  },
  {
    id: "2",
    authorEmail: "user2@example.com",
    content: "I’ll handle this today.",
    createdAt: "2025-09-02T08:30:00Z",
  },
];

const CommentBox: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const fakeNewComment: Comment = {
      id: String(Date.now()),
      authorEmail: "me@example.com", // later replace with real user
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, fakeNewComment]);
    setNewComment("");
  };

  return (
    <div className="p-4 bg-gray-50 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-3">Comments</h2>

      <ul className="space-y-2 mb-4">
        {comments.map((c) => (
          <li key={c.id} className="p-3 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-800">{c.content}</p>
            <span className="text-xs text-gray-500">
              {c.authorEmail} • {new Date(c.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CommentBox;

