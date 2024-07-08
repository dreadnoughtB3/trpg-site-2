import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request:NextRequest){
  const body = await request.json();

  try {
    prisma.$connect();

    const formattedDate = new Date(body.date)

    const created_data = await prisma.news.create({
      data: {
        title: body.title,
        desc: body.desc
      }
    })
    return NextResponse.json({ message: "ニュース作成成功", data: created_data })

  } catch (error) {
    return NextResponse.json({ message: "ニュース作成失敗", data: error })
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request:NextRequest){
  let newsData = {}

  try {
    prisma.$connect;

    newsData = await prisma.news.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", data: error })
  } finally {
    await prisma.$disconnect();
  }
  return NextResponse.json({ message: "取得成功", data: newsData})
}