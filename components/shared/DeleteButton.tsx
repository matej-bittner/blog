"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

interface DeleteButtonProps {
  articleId?: string;
  commentId?: string;
  confirmMessage: string;
  toastMessage: string;
  buttonText: string;
  variant: string;
}
const DeleteButton = ({
  articleId,
  commentId,
  confirmMessage,
  toastMessage,
  buttonText,
  variant,
}: DeleteButtonProps) => {
  const router = useRouter();
  const del = async () => {
    if (confirm(confirmMessage)) {
      try {
        let id, type;
        if (articleId) {
          id = articleId;
          type = "article";
        }
        if (commentId) {
          id = commentId;
          type = "comment";
        }

        await axios.delete(`/api/delete/${type}:${id}`);
        router.refresh();
        toast({
          title: "Hotovo",
          description: `${toastMessage}`,
        });
      } catch (error) {
        toast({
          title: "Chyba",
          description: `Oops! Něco se nepovedlo.`,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <button
      onClick={del}
      className={`${variant === "comment" && "max-w-[70px] text-sm font-light text-center"}`}
    >
      {buttonText}
    </button>
  );
};

export default DeleteButton;
