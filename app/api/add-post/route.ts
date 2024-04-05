import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const postData = await request.json();
  const { userId, title, content, published, description } = postData;

  if (!title || !content || !description) {
    return new NextResponse("Nesjou vyplněna všechny pole", { status: 400 });
  }

  if (!userId) {
    throw new Error();
  }

  await prisma.post.create({
    data: {
      authorId: userId,
      content,
      title,
      description,
      published,
    },
  });

  return NextResponse.json("ok");
}
