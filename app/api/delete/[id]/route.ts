import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE({ request }: any, { params }: any) {
  const sas = await params.id;
  const [type, id] = sas.split(":");

  if (type === "comment") {
    await prisma.comment.delete({
      where: { id },
    });
  }

  if (type === "article") {
    await prisma.post.delete({
      where: { id },
    });
  }

  return NextResponse.json("ok");
}
