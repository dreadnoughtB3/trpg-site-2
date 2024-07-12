import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const rand = (min: number, max: number): number => {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
};

export async function POST(request:NextRequest){
  const reqBody = await request.json();
  console.log(reqBody)

  try {
    prisma.$connect();

    const created_data = await prisma.characterSetting.create({
      data: {
        slug: rand(10000,99999),
        name: reqBody.name,
        world: reqBody.world,
        sex: reqBody.sex,
        age: reqBody.age,
        specie: reqBody.specie,
        body: reqBody.body,
        ownerId: reqBody.user_id
      }
    })
    return NextResponse.json({ message: "キャラ設定作成成功", data: created_data })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "キャラ設定作成失敗", data: reqBody })
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request:NextRequest){
  const params = request.nextUrl.searchParams;
  const world = params.get('world') || undefined
  const name = params.get('name') || undefined
  let CharacterSettings = []

  try {
    prisma.$connect;

    CharacterSettings = await prisma.characterSetting.findMany({
      where: {
        world: world,
        name: {
          contains: name
        },
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
        specie: true,
        updated_at: true,
      }
    })
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", data: error })
  } finally {
    await prisma.$disconnect();
  }
  return NextResponse.json({ message: "取得成功", data: CharacterSettings})
}