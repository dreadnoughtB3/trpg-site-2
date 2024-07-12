import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }){
  const slug = params.slug
  if (!slug) {
    return NextResponse.json({ status: 400, message: "Slug is required." })
  }

  try {
    prisma.$connect;

    const item = await prisma.itemData.findFirst({
    where: {
        slug: slug
        },
    select: {
        world: true,
        name: true,
        obtain: true,
        require: true,
        category: true,
        desc: true,
        slug: true,
        updated_at: true
    }
    })

    return NextResponse.json({ message: "取得成功", data: item})
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", data: error })
  } finally {
    await prisma.$disconnect();
  }
}