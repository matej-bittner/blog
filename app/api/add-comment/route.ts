import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const commentData = await request.json();
  const { content, postId, userId } = commentData;

  if (!content || !postId || !userId) {
    throw new Error();
  }

  await prisma.comment.create({
    data: {
      authorID: userId,
      postID: postId,
      content,
    },
  });

  return NextResponse.json("ok");
}
