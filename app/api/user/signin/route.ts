import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";
import { createHash } from "crypto";

const prisma = new PrismaClient();

export async function POST(request:NextRequest){
  const body = await request.json();
  
  try {
    prisma.$connect();

    const user = await prisma.user.findUnique({
      where:{
        name:body.username
      }
    });

    if(!user){
      return NextResponse.json({message:"ユーザーが存在しません",flg:false})
    }
    const hashedPassword = createHash('sha256').update(body.password).digest('hex')
    if(user.password !== hashedPassword){
      return NextResponse.json({message:"パスワードが間違っています",flg:false})
    }

    const secretKey = new TextEncoder().encode("for-the-emperor");

    const payload = {
      discord:user.discord,
      username:user.name,
    }

    const token = await new SignJWT(payload).setProtectedHeader({alg:"HS256"})
    .setExpirationTime("2h")
    .sign(secretKey);

    return NextResponse.json({message:"ログイン成功",flg:true,token:token})
  } catch (error) {
    return NextResponse.json({message:"ログイン失敗",flg:false})
  } finally {
    await prisma.$disconnect();
  } 
}