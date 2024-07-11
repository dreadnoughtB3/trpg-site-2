"use client";

import Auth from '@/app/utils/Auth';
import React, { useEffect, useState } from 'react';
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import BottomNav from '@/app/components/NavBar';
import { getCharacterSetting } from '@/features/api/CharacterSetting';
import CircularProgress from '@mui/material/CircularProgress';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Species } from '@/app/static/Species';

interface CharacterSetting {
    name: String,
    slug: number,
    world: String,
    sex: String,
    age: number,
    body: String,
    specie: number,
    updated_at: String,
    owner: {
      name: String
    }
  }

export default function Page({ params }: { params: { slug: string } }) {

  const LoginData = Auth();

  const [characterSetting, SetCharacterSetting] = useState<CharacterSetting>()
  const [isLoading, setIsLoadng] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  const editUrl = `/character-settings/${params.slug}/edit`

  useEffect(() => {
    getCharacterSetting(params.slug).then((value) => {
      SetCharacterSetting(value.data[0]);
      setIsLoadng(false);
      if(value.data[0]){
        setIsEmpty(false);
      }
    });
  }, [])

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#1e2124]">
      <div className="flex justify-center pt-3">
        <div className="flex w-full ml-2 max-w-3xl justify-between">
          <Link href="/character-settings">
            <ChevronLeft className="text-gray-300 mt-1"></ChevronLeft>
          </Link>
          {
            LoginData.username == characterSetting?.owner.name ?
            <Link href={editUrl}>
              <Button className="bg-slate-700/70 rounded-none h-[30px] mr-2 border-slate-600 border">編集</Button>
            </Link> : <></>
          }

        </div>
      </div>
        <div className="flex w-full justify-center min-h-screen">
          {
            isLoading ? 
            <div className="flex w-full justify-center pt-10">
              <CircularProgress />
            </div>
            :
            <div></div>
          }

          { 
            !isLoading && isEmpty ?
            <div className="flex w-full justify-center">
              <div className="pt-10 text-gray-300 font-bold text-xl">キャラ設定が存在しません</div>
            </div>
            :
            <div></div>
          }

          {
            !isLoading && !isEmpty ? 
            <div className="w-full  max-w-3xl mx-2 my-3 mb-10">
              <div className="bg-[#424549] rounded-sm border border-gray-400">
                <div className="bg-[#282b30] p-2 text-bold text-gray-300">
                  {characterSetting?.name}
                  <p className="text-xs mt-1 text-gray-500">
                    作成者: {characterSetting?.owner.name} | 
                    最終更新: {characterSetting?.updated_at.split("T")[0]}
                  </p>
                </div>
                <div className="text-gray-300 p-2 md:p-4 whitespace-pre-wrap text-sm md:text-base">
                  <div>世界: {characterSetting?.world} | 年齢: {characterSetting?.age} | 性別: {characterSetting?.sex}</div>
                  <div>種族: {Species[Number(characterSetting?.specie)].name}</div>
                  <div className="h-px w-full bg-gray-300 my-1"></div>
                  {characterSetting?.body}
                </div>
              </div>
            </div>
            :
            <div></div>
          }
        </div>
      </div>
      <BottomNav />
      <Footer />
    </div>
  )
}