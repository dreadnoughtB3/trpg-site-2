"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const WorldPage: React.FC = () => {
  const [world, setWorld] = useState('');

  function showWorldInfo(){
    if (world == "F"){
      return (
        <div className="flex justify-center">
          <div className="mx-2">
            <div className="text-center mt-7 text-2xl text-gray-300 font-bold">FANTASIA - 魔法の世界</div>
            <Image className="w-full border border-gray-700 bg-gray-800/50" src="/bg_05.png" alt="Logo" width={700} height={40} />
            <p className="text-gray-300 mt-4 p-1 bg-gray-900/70">
              ファンタジア：数万年に渡る長い文明史を持ち、幻想の力と神々の存在が文明の主体を占める世界。<br/>
              嘗て小月『ルーナリア』を本拠としていた月文明が神々によってそのあらゆる痕跡ごと滅ぼされて以降、幾多の種族が文明を興しては戦乱によって衰退していった。<br/>
              現代では魔導機関の発明や大陸諸国がいくつかの大国によって統治されている事もあり表面上は安定しているものの、戦乱の種は未だあちこちに残されている。<br/>
            </p>
          </div>
        </div>
      )
    } else if (world == "N") {
      return (
        <div className="flex justify-center">
          <div className="mx-2">
            <div className="text-center mt-7 text-2xl text-gray-300 font-bold">NOCTURNE - 科学の世界</div>
            <Image className="w-full border border-gray-700 bg-gray-800/50" src="/bg_01.png" alt="Logo" width={700} height={40} />
            <p className="text-gray-300 mt-4 p-1 bg-gray-900/70">
              ノクターン：スチームパンクじみた19世紀世界がとある奇跡と偶然によって数十・数百年先の技術力を得たような世界。<br/>
              しかしそれらの技術は行き渡ることなく軍事品のみに注力され、一部の資産階級以外の大半はほぼ技術革新前とたいして変わらない生活を過ごしている。<br/>
              スチームパンク・サイバーパンク・レトロフューチャーが主。各地の紛争による戦争経済や大国同士のグレート・ゲームによる血と鉄香る冷たくも哀愁的で、しかし未だ冷めやらぬ冒険の星でもある<br/>
            </p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="text-center mt-7 text-2xl text-gray-300 font-bold">世界を選択してください</div>
      )
    }

  }

  return (
  <div>
    <Header />
    <div className="min-h-screen bg-cover bg-center bg-opacity-100" style={{backgroundImage: "url('/167750.jpg')"}}>
      <div className="flex w-full justify-center pt-5">
        <div className="w-[167px] h-[41px] mx-1 bg-transparent border-gray-800 border flex justify-center items-center">
          <Button onClick={ function(){setWorld('N')} } className="rounded-none text-gray-300 bg-slate-800/70 w-[160px] h-[35px]
           border-yellow-600/50 border text-md font-light">NOCTURNE</Button>
        </div>
        <div className="w-[167px] h-[41px] mx-1 bg-transparent border-gray-800 border flex justify-center items-center">
          <Button onClick={ function(){setWorld('F')} } className="rounded-none text-gray-300 bg-slate-800/70 w-[160px] h-[35px]
           border-yellow-600/50 border text-md font-light">FANTASIA</Button>
        </div>
      </div>
      <div className="w-full flex justify-center mt-6">
        <div className="w-full min-h-[700px] bg-gray-900/50 rounded-xl border border-yellow-600 mx-4 max-w-3xl">
          {showWorldInfo()}
        </div>
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default WorldPage;