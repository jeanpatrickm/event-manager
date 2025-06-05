"use client";

import type React from "react";
import { useState, useRef } from "react"; // Adicionado useRef
import { MessageSquare, Paperclip, X as LucideX } from "lucide-react";
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
  AttachedImagePreviewContainer,
  AttachedImagePreview,
  RemoveAttachedImageButton,
  FileInputLabel,
} from "./styles";

// Interface local para o formato esperado dos comentários na UI
interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  time: string;
  content: string;
  attachedImageUrl?: string | null;
}

interface CommentSectionProps {
  comments: Comment[];
  // Assinatura de onAddComment MODIFICADA para aceitar um arquivo de imagem opcional
  onAddComment: (commentText: string, imageFile?: File | null) => void;
  isUserAuthenticated?: boolean;
  isLoadingComment?: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
  isUserAuthenticated = false,
  isLoadingComment = false,
}) => {
  const [newComment, setNewComment] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validação simples de tipo e tamanho (exemplo)
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecione um arquivo de imagem.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        // Limite de 2MB como exemplo
        alert("A imagem é muito grande. O limite é 2MB.");
        return;
      }
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreviewUrl(null);
    }
  };

  const removeSelectedImage = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((newComment.trim() === "" && !imageFile) || isLoadingComment) return;

    onAddComment(newComment.trim(), imageFile);
    setNewComment("");
    removeSelectedImage();
  };

  return (
    <DiscussionContainer>
      <DiscussionHeader>
        <h3>
          <MessageSquare size={20} />
          Discussão ({comments.length})
        </h3>
      </DiscussionHeader>

      {isUserAuthenticated && (
        <CommentForm onSubmit={handleSubmit}>
          <CommentInput
            placeholder="Adicione um comentário construtivo..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isLoadingComment}
            rows={imagePreviewUrl ? 2 : 1}
          />
          {imagePreviewUrl && (
            <AttachedImagePreviewContainer>
              <AttachedImagePreview
                src={imagePreviewUrl}
                alt="Preview da imagem anexada"
              />
              <RemoveAttachedImageButton
                type="button"
                onClick={removeSelectedImage}
                disabled={isLoadingComment}
              >
                <LucideX size={14} />
              </RemoveAttachedImageButton>
            </AttachedImagePreviewContainer>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "8px",
              gap: "10px",
            }}
          >
            <FileInputLabel
              htmlFor="comment-image-upload"
              disabled={isLoadingComment}
            >
              <Paperclip size={18} /> Anexar Imagem
            </FileInputLabel>
            <input
              type="file"
              id="comment-image-upload"
              accept="image/*"
              onChange={handleImageFileChange}
              style={{ display: "none" }}
              ref={fileInputRef}
              disabled={isLoadingComment}
            />
            <CommentButton
              type="submit"
              disabled={
                isLoadingComment || (newComment.trim() === "" && !imageFile)
              }
            >
              {isLoadingComment ? "Enviando..." : "Comentar"}
            </CommentButton>
          </div>
        </CommentForm>
      )}

      <CommentsList>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentAvatar
              src={
                comment.authorAvatar || "/placeholder.svg?height=40&width=40"
              }
              alt={comment.author}
            />
            <div>
              <CommentHeader>
                <CommentAuthor>{comment.author}</CommentAuthor>
                <CommentTime>{comment.time}</CommentTime>
              </CommentHeader>
              <CommentContent>{comment.content}</CommentContent>
              {/* Exibir imagem anexada se houver */}
              {comment.attachedImageUrl && (
                <img
                  src={comment.attachedImageUrl}
                  alt="Imagem anexada ao comentário"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    borderRadius: "8px",
                    marginTop: "8px",
                  }}
                />
              )}
            </div>
          </CommentItem>
        ))}
      </CommentsList>
    </DiscussionContainer>
  );
};

export default CommentSection;
