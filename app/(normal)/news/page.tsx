"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { getNews } from '@/features/api/getNews';

interface NewsItem {
  id: number;
  title: string;
  desc: string;
  created_at: string;
}

const NewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);

  const pageCount = Math.ceil(news.length / itemsPerPage);
  // const currentNews = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const truncate = (str: string, n: number) => {
    return (str.length > n) ? str.substring(0, n-1) + '...' : str;
  };

  function newsCards (){
    if(news.length == 0) {
      return (
        <div>now loading</div>
      )
    }
    return (
      news.map((item, index) => (
        <Card key={index} className="bg-zinc-800/80 border-gray-700 hover:border-red-500 transition-colors duration-300">
          <CardHeader className='bg-amber-200/50 rounded-br-full mr-10'>
            <CardTitle className="text-xl text-white">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{truncate(item.desc, 100)}</p>
          </CardContent>
          <CardFooter className="text-sm text-gray-500">
            {item.created_at.split("T")[0]}
          </CardFooter>
        </Card>
      ))
    )
  }

  useEffect(() => {
    const data = getNews().then((value) => {
      setNews(value.data);
    });
  }, [])

  return (
  <div>
    <Header />
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: "url('/bg_02.png')"}}>
      <div className="min-h-screen w-full text-gray-200 p-8 overflow-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">NEWS</h1>
        </header>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-[1000px] space-y-6">
            {newsCards()}
          </div>
        </div>
          <div className="mt-8 flex justify-center items-center space-x-4">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="icon"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-gray-400">
              {currentPage} / {pageCount}
            </span>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
              variant="outline"
              size="icon"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default NewsPage;