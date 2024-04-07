import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: any) {
  const subscribeData = await request.json();
  const { userId, email, accept } = subscribeData;

  if (!email || !userId) {
    throw new Error("něco se nepovedlo");
  }

  if (userId) {
    await prisma.user.update({
      where: { id: userId },
      data: { subscribe: accept },
    });
  }

  return NextResponse.json("ok");
}
