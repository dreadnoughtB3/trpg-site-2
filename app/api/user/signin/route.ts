import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";

const prisma = new PrismaClient();

export async function POST(request:NextRequest){
    const body = await request.json();
  
    try {
        //接続
        prisma.$connect();
	
        const user = await prisma.user.findUnique({
            where:{
                name:body.username
            }
        });

        if(!user){
            return NextResponse.json({message:"ユーザーが存在しません",flg:false})
        }

        if(user.password !== body.password){
            return NextResponse.json({message:"パスワードが間違っています",flg:false})
        }

        //1：JWT用のシークレットキーを作成
        const secretKey = new TextEncoder().encode("for-the-emperor");

        //2:JWTのペイロードを作成
        const payload = {
            discord:body.discord,
            username:user.name,
        }

        //3:JWTでトークンを発行
        const token = await new SignJWT(payload).setProtectedHeader({alg:"HS256"})
        .setExpirationTime("2h") //有効期限 2hは2時間　1dは1日
        .sign(secretKey);
    
        return NextResponse.json({message:"ログイン成功",flg:true,token:token})

    } catch (error) {

        return NextResponse.json({message:"ログイン失敗",flg:false})

    } finally {
        await prisma.$disconnect();
    }
    
}