import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

interface RegisterProps {
  name: string | null;
  surname: string | null;
  email: string | null;
  password: string | null | number;
  json(): any;
}
export async function POST(request: RegisterProps) {
  const register_data = await request.json();
  const { email, name, surname, password } = register_data;

  if (!name || !surname || !email || !password) {
    return new NextResponse("Nebyla vyplněna všechny pole", { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return new NextResponse("Někdo už tento email používá", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      password: hashedPassword,
      surname,
      email,
    },
  });
  return NextResponse.json("ok");
}
