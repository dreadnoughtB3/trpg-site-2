import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request:NextRequest){
  const body = await request.json();

  try {
    prisma.$connect();

    const formattedDate = new Date(body.date)

    const created_data = await prisma.scenario.create({
      data: {
        event_date: formattedDate,
        members: body.members,
        world: body.world,
        desc: body.desc
      }
    })
    return NextResponse.json({ message: "シナリオ作成成功", data: created_data })

  } catch (error) {
    return NextResponse.json({ message: "シナリオ作成失敗", data: error })
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request:NextRequest){
  const body = await request.json();
  let scenarioData = {}

  try {
    prisma.$connect;
    if (body.world != "any") {
      scenarioData = await prisma.scenario.findMany({
        where: {
          event_date: {
            gte: new Date(`${body.year}-${body.month}-1`),
            lt: new Date(`${body.year}-${body.month}-31`)
          },
          world: body.world
        }
      })
    } else {
      scenarioData = await prisma.scenario.findMany({
        where: {
          event_date: {
            gte: new Date(`${body.year}-${body.month}-1`),
            lt: new Date(`${body.year}-${body.month}-31`)
          }
        }
      })
    }
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", data: error })
  } finally {
    await prisma.$disconnect();
  }
  return NextResponse.json({ message: "取得成功", data: scenarioData})
}