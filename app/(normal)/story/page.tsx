"use client";

import Header from '@/app/components/Header';
import Footer from "@/app/components/Footer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const StoryViewer = () => {
  const months = [1,2,3,4,5,6,7,8,9,10,11,12]
  const test = false

  return (
  <div>
    <div className="min-h-screen bg-cover bg-fixed bg-center bg-opacity-100" style={{backgroundImage: "url('/bg_02.png')"}}>
      <Header />
      <div className="mt-10 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <div className="flex my-2 mx-3">
            <Select>
              <SelectTrigger className="w-[110px] rounded-none border-slate-600 mr-2 bg-slate-700/70 text-[#d3b88d]
              ">
                <SelectValue placeholder="年を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="2022">2022年</SelectItem>
                  <SelectItem value="2023">2023年</SelectItem>
                  <SelectItem value="2024">2024年</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[110px] rounded-none border-slate-600 mr-2 bg-slate-700/70 text-[#d3b88d]">
                <SelectValue placeholder="月を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {months.map(v => {
                    return (
                      <SelectItem key={v} value={String(v)}>{v}月</SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[130px] rounded-none border-slate-600 mr-2 bg-slate-700/70 text-[#d3b88d]
              ">
                <SelectValue placeholder="世界を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="any">両方</SelectItem>
                  <SelectItem value="noct">ノクターン</SelectItem>
                  <SelectItem value="fant">ファンタジア</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className="bg-slate-700/70 rounded-none border-slate-600 border">検索</Button>
          </div>
          <div className="flex items-center align-middle justify-center bg-slate-100/20 border border-gray-700">
            <div className="w-full max-w-xl">
              <div className="text-center text-gray-300 my-6 text-xl">年月を選択してください</div>
              {test && 
                months.map(v => {
                  return (
                    <div key={v} className="my-3 w-full p-2 rounded-tr-xl rounded-bl-xl cursor-pointer
                    bg-slate-900/70 border-yellow-500 border ring ring-slate-900 ring-ring text-gray-300">
                      <p>開催日: 2024-07-08</p>
                      <p>世界: ノクターン</p>
                      <p>人数: 34人</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default StoryViewer;