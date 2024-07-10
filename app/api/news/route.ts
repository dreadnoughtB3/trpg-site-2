import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request:NextRequest){
  const reqBody = await request.json();

  try {
    prisma.$connect();

    const cnt = await prisma.news.count()

    const formattedDate = new Date(reqBody.published_at)

    const created_data = await prisma.news.create({
      data: {
        title: reqBody.title,
        desc: reqBody.desc,
        body: reqBody.body,
        published_at: formattedDate,
        slug: cnt + 1
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
        published_at: 'asc',
      },
    })
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", data: error })
  } finally {
    await prisma.$disconnect();
  }
  return NextResponse.json({ message: "取得成功", data: newsData})
}