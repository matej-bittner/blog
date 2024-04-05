"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const PublishedButton = ({ postId, userId }: any) => {
  const router = useRouter();
  const handlePublished = async () => {
    try {
      const allData = Object.assign({}, { postId }, { userId });
      await axios.put("/api/edit-post", allData);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      onClick={handlePublished}
      className="border-2 border-main-green py-1 px-2 rounded-md"
    >
      publikovat
    </button>
  );
};

export default PublishedButton;
