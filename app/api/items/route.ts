import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request:NextRequest){
  const params = request.nextUrl.searchParams;
  const world = params.get('world') || undefined
  const name = params.get('name') || undefined

  try {
    prisma.$connect;

    const items = await prisma.itemData.findMany({
      where: {
        world: world,
        name: {
          contains: name
        },
      },
      select: {
        world: true,
        name: true,
        obtain: true,
        require: true,
        category: true,
        slug: true,
        updated_at: true
      }
    })

    return NextResponse.json({ message: "取得成功", data: items})
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", data: error })
  } finally {
    await prisma.$disconnect();
  }
}