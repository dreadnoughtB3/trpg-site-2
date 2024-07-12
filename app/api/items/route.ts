import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request:NextRequest){
  const params = request.nextUrl.searchParams;
  const world = params.get('world') || undefined
  const name = params.get('name') || undefined
  const page = params.get('page') || 1

  try {
    prisma.$connect;

    const [items, meta] = await prisma.itemData
      .paginate({
        where: {
          world: world,
          name: {
            contains: name
          }
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
      .withPages({
        limit: 12,
        page: Number(page),
        includePageCount: true,
      });

    return NextResponse.json({ message: "取得成功", data: {"items": items, "meta": meta}})
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", data: error })
  } finally {
    await prisma.$disconnect();
  }
}