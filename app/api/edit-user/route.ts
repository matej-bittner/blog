import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: any) {
  const editData = await request.json();
  const { email, name, surname, userId } = editData;

  if (!email || !name || !surname) {
    return new NextResponse("Vyplň všechna pole", { status: 400 });
  }

  const findUser = await prisma.user.update({
    where: { id: userId },
    data: {
      email,
      name,
      surname,
    },
  });

  return NextResponse.json("ok");
}
