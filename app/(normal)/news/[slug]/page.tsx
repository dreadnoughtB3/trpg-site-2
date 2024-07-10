"use client";

import React, { useEffect, useState } from 'react';
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import { getNewsDetail } from "@/features/api/getNews";
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface NewsItem {
  id: number;
  title: string;
  desc: string;
  published_at: string;
  slug: number;
  body: string;
}

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const [news, setNews] = useState<NewsItem>();
  const [isLoading, setIsLoadng] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    getNewsDetail(params.slug).then((value) => {
      setNews(value.data);
      setIsLoadng(false);
      if(value.data){
        setIsEmpty(false);
      }
    });
  }, [])

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: "url('/bg_02.png')"}}>
      <div className="flex justify-center bg-gray-900/50 pt-4">
        <div className="w-full ml-2 max-w-3xl">
          <Link href="/news">
            <ChevronLeft className="text-gray-300"></ChevronLeft>
          </Link>
        </div>
      </div>
        <div className="flex w-full justify-center min-h-screen bg-gray-900/50">
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
              <div className="pt-10 text-gray-300 font-bold text-xl">記事が存在しません</div>
            </div>
            :
            <div></div>
          }

          {
            !isLoading && !isEmpty ? 
            <div className="w-full  max-w-3xl mx-2 my-3 mb-10 bg-zinc-800/80">
              <div className="bg-black p-2 text-gray-300 font-bold">
                <p className="text-lg">アナウンス: {news?.title}</p>
                <p className="text-sm text-gray-600">公開日: {news?.published_at.split("T")[0]}</p>
                </div>
              <p className="p-3 whitespace-pre-wrap text-gray-300">{news?.body}</p>
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