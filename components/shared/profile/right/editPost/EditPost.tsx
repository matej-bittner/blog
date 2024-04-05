import React, { useState } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditPostForm from "@/components/shared/profile/right/editPost/EditPostForm";

async function GetArticle({ articleId }: any) {
  const session = await getServerSession(authOptions);
  const article = await prisma.post.findUnique({
    where: { id: articleId, authorId: session?.user.id },
  });
  return article;
}
const EditPost = async ({ articleId }: any) => {
  const article = await GetArticle({ articleId });

  return <EditPostForm article={article} />;
};

export default EditPost;
