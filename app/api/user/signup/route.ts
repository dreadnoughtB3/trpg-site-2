import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";

const prisma = new PrismaClient();

export async function POST(request:NextRequest){
  const body = await request.json();
  try {
    prisma.$connect();

    const created_data = await prisma.user.create({
      data: {
        name: body.name,
        password: createHash('sha256').update(body.password).digest('hex'),
        discord: body.discord
      }
    })
    return NextResponse.json({ message: "アカウント作成成功", data: created_data })
  } catch (error) {
    return NextResponse.json({ message: "アカウント作成失敗", data: error })
  } finally {
    await prisma.$disconnect();
  }
}