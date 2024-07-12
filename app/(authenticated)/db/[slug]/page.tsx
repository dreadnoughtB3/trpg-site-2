"use client";

import React, { useEffect, useState } from 'react';
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import CircularProgress from '@mui/material/CircularProgress';
import { ChevronLeft } from 'lucide-react';
import { getItemDetail } from '@/features/api/getItem';
import Link from 'next/link';
import { ItemCategory } from '@/app/static/ItemCategory';

const worldConvert: { [key: string]: string } = {
  "F": "ファンタジア", "N": "ノクターン"
}

interface ItemData {
  world: string;
  name: string;
  obtain: string;
  require: string;
  category: number;
  desc: string;
}

export default function Page({ params }: { params: { slug: string } }) {

  const [itemData, SetItemData] = useState<ItemData>()
  const [isLoading, setIsLoadng] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    getItemDetail(params.slug).then((value) => {
      SetItemData(value.data);
      setIsLoadng(false);
      if(value.data){
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
          <Link href="/db">
            <ChevronLeft className="text-gray-300 mt-1"></ChevronLeft>
          </Link>

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
              <div className="pt-10 text-gray-300 font-bold text-xl">アイテムデータが存在しません</div>
            </div>
            :
            <div></div>
          }
          {
            !isLoading && !isEmpty ? 
            <div className="w-full  max-w-3xl mx-2 my-3 mb-10">
              <div className="bg-[#424549] rounded-sm border border-gray-400">
                <div className="bg-[#282b30] p-2 md:text-lg text-bold text-gray-300">
                  <p>{itemData?.name}</p>
                </div>
                <div className="text-gray-300 p-2 md:p-4 whitespace-pre-wrap text-sm md:text-base">
                  <div>世界: {worldConvert[itemData?.world || "F"]}</div>
                  <div>カテゴリ: {ItemCategory[(itemData?.category || 1) -1].name}</div>
                  <div>入手条件: {itemData?.require}</div>
                  <div>入手方法: {itemData?.obtain}</div>
                  <div className="h-px w-full bg-gray-300 my-2"></div>
                  {itemData?.desc.replace("\\n", "\n")}
                </div>
              </div>
            </div>
            :
            <div></div>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}