import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }){
    const slug = params.slug;
    if (!slug) {
      return NextResponse.json({ status: 400, message: "Slug is required." })
    }
    try {
      prisma.$connect();
  
      const charaSetting = await prisma.characterSetting.findMany({
        where: {
          slug: Number(slug)
        },
        orderBy: {
          updated_at: 'desc',
        },
        select: {
          owner: {
            select: {
              name: true,
            },
          },
          slug: true,
          name: true,
          world: true,
          sex: true,
          age: true,
          body: true,
          specie: true,
          updated_at: true,
          id: true,
        }
      })

      return NextResponse.json({ message: "取得成功", data: charaSetting })
    } catch (error) {
      return NextResponse.json({ message: "取得失敗", data: error })
    } finally {
      await prisma.$disconnect();
    }
  }

export async function PATCH(request: NextRequest, { params }: { params: {slug: string } }){
  if (!params.slug) {
    return NextResponse.json({ status: 400, message: "Slug is required." })
  }
  const reqBody = await request.json();
  try {
    prisma.$connect();

    const res = await prisma.characterSetting.update({
      where: {
        id: reqBody.id
      },
      data: {
        name: reqBody.name,
        world: reqBody.world,
        sex: reqBody.sex,
        age: reqBody.age,
        specie: reqBody.specie,
        body: reqBody.body,
      }
    })

    return NextResponse.json({ message: "キャラ設定更新成功", data: res })

  } catch (error) {
    return NextResponse.json({ message: "キャラ設定更新失敗", data: error })
  } finally {
    await prisma.$disconnect();
  }
}