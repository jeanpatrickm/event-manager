"use client";

import type React from "react";
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import {
  DiscussionContainer,
  DiscussionHeader,
  CommentForm,
  CommentInput,
  CommentButton,
  CommentsList,
  CommentItem,
  CommentAvatar,
  CommentContent,
  CommentHeader,
  CommentAuthor,
  CommentTime,
} from "./styles";

interface Comment {
  id: number;
  author: string;
  authorAvatar: string;
  time: string;
  content: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (comment: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <DiscussionContainer>
      <DiscussionHeader>
        <h3>
          <MessageSquare size={20} />
          Discussão ({comments.length})
        </h3>
      </DiscussionHeader>

      <CommentForm onSubmit={handleSubmit}>
        <CommentInput
          placeholder="Adicione um comentário..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <CommentButton type="submit">Comentar</CommentButton>
      </CommentForm>

      <CommentsList>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentAvatar src={comment.authorAvatar} alt={comment.author} />
            <div>
              <CommentHeader>
                <CommentAuthor>{comment.author}</CommentAuthor>
                <CommentTime>{comment.time}</CommentTime>
              </CommentHeader>
              <CommentContent>{comment.content}</CommentContent>
            </div>
          </CommentItem>
        ))}
      </CommentsList>
    </DiscussionContainer>
  );
};

export default CommentSection;
