"use client";

import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Button } from "@/components/ui/button";
import logoImage from '@/public/Logo.png';
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
  <div>
    <div>
    <Header />
      <div className="min-h-screen bg-cover bg-fixed bg-center" style={{backgroundImage: "url('/bg_02.png')"}}>
        <div className="flex justify-center mx-4 pt-16">
          <Image className="border rounded-lg border-yellow-600 bg-gray-800/50" src={logoImage} alt="Logo" width={700} height={40} />
        </div>
        <div className='flex justify-end w-full h-full mt-28'>
          <div className='content-center text-xl md:text-2xl lg:text-4xl '>
            <p className="bg-black text-white px-2 z-10">——それは、二つの星を舞台にした年代記。</p>
          </div>
        </div>
      </div>
      <div className="h-72 w-full bg-gray-900 border-y">
        <div className="flex justify-center items-center w-full h-full top-0">
          <div>
            <Card className="bg-slate-700">
              <CardHeader>
                <CardTitle className="text-white">——Discordだけで遊べるMMOTRPG</CardTitle>
                <CardDescription className="text-gray-200">
                    Stellariaは、全く新しいMMOTRPGサーバーです。<br/>
                  その特徴は、Discordのみで完全に完結したゲームシステム。<br/>
                  Discordさえあれば、どのような場所でも気軽に遊ぶことができます。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="bg-blue-700 text-white">サーバーへ参加する</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: "url('/bg_01.png')"}}>
        <div className='relative z-0'>
          <div className="absolute h-full top-0 md:mt-12 mt-4 pl-4 md:pl-12 text-gray-100">
            <div className="bg-slate-600/50 p-3 border border-black">
            <p className="font-bold text-5xl font-serif ">▣WORLD</p>
            <p className="font-bold">　二つの世界——ノクターンとファンタジア</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  );
}
