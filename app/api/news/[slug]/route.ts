import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { slug: string } },) {
  const slug = params.slug;
  if (!slug) {
    return NextResponse.json({ status: 400, message: "Slug is required." })
  }
  try {
    prisma.$connect;

    const news = await prisma.news.findFirst({
      where: {
        slug: Number(slug)
      }
    })

    return NextResponse.json({ message: "取得成功", data: news })
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", data: error })
  } finally {
    await prisma.$disconnect;
  }
}