import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request:NextRequest){
    const body = await request.json();
  
    try {
        prisma.$connect();
	
        const created_data = await prisma.user.create({
            data: {
                name: body.username,
                password: body.password,
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