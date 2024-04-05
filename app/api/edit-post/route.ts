import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: any) {
  const editData = await request.json();
  const { postId, userId, description, title, content, published } = editData;

  if (!postId || !userId) {
    throw new Error();
  }

  if (!description || !content || !title) {
    await prisma.post.update({
      where: { id: postId, authorId: userId },
      data: { published: true },
    });
  }

  await prisma.post.update({
    where: { authorId: userId, id: postId },
    data: { description, title, content, published },
  });

  return NextResponse.json("ok");
}
