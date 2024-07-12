"use client"

import React, { useEffect, useState, Suspense } from 'react'
import { ChevronRight, ChevronLeft } from "lucide-react"
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { ItemCategory } from '@/app/static/ItemCategory'
import { getItems } from '@/features/api/getItem';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CircularProgress from '@mui/material/CircularProgress';

const worldConvert: { [key: string]: string } = {
  "F": "ファンタジア", "N": "ノクターン"
}

interface ItemData {
  world: string;
  name: string;
  obtain: string;
  require: string;
  category: number;
  slug: string;
}

const DBPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoadng] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [buttonState, setButtonState] = useState(true)
  const [formData, setFormData] = useState({
    name: searchParams.get('name') || "",
    world: searchParams.get('world') || ""
  });
  const [pageData, setPageData] = useState({
    isFirstPage: false,
    isLastPage: false,
    currentPage: 0,
    previousPage: 0,
    nextPage: 0,
    pageCount: 0,
    totalCount: 0
  })
  const [items, setItems] = useState<ItemData[]>([])

  async function handleSelect(value:string, name:string){
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setButtonState(false);
  }

  function handlePush(type:string) {
    if(type == "search"){
      router.push(`/db/?name=${formData.name}&world=${formData.world}`)
    }else if(type == "next"){
      router.push(`/db/?name=${ searchParams.get('name') }&world=${ searchParams.get('world') }&page=${pageData.nextPage}`)
    }else if(type == "previous"){
      router.push(`/db/?name=${ searchParams.get('name') }&world=${ searchParams.get('world') }&page=${pageData.previousPage}`)
    }
    window.location.reload();
  }

  useEffect(() => {
    getItems({
      name: searchParams.get('name') || "",
      world: searchParams.get('world') || "",
      page: Number(searchParams.get('page')) || 1
    }).then((value) => {
      setIsLoadng(false)
      if(!value.data.items[0]){
        setIsEmpty(true);
      }else{
        setItems(value.data.items)
        setPageData(value.data.meta)
      }
    })
  }, [])
  
  return (
  <div>
    <Suspense >
    <Header />
    <div className="min-h-screen bg-[#1e2124]">
      <div className="flex justify-center">
        <div className="flex flex-col w-full justify-center items-center pt-5 space-y-3 mx-2">
          <div className="flex w-full justify-center">
            <Input onChange={((e) => handleSelect(e.target.value, 'name'))} value={formData.name} type="text" placeholder="キーワード"
            className="max-w-lg rounded-none border-slate-600 bg-slate-700/70 text-[#d3b88d]" />
            <Select onValueChange={((v) => handleSelect(v, 'world'))} value={formData.world}>
              <SelectTrigger className="w-[80px] min-w-[80px] rounded-none border-slate-600 mx-2 bg-slate-700/70 text-[#d3b88d]">
                <SelectValue placeholder="世界" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="any">両方</SelectItem>
                  <SelectItem value="N">N</SelectItem>
                  <SelectItem value="F">F</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button onClick={() => handlePush('search')} disabled={buttonState} className="bg-slate-700/70 rounded-none border-slate-600 border">
              検索
            </Button>
          </div>
          {
            !isEmpty && isLoading ? <div className="pt-10"><CircularProgress /></div> : <></>
          }
          {
            isEmpty && !isLoading ? <div className="pt-10 text-center text-gray-300 text-xl">検索結果がありません</div> : <></>
          }
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full max-w-5xl px-2 ">
            {items.map((val, index) => {
              return (
                <div key={index} onClick={() => {router.push(`/db/${val.slug}`)}}
                className="min-w-full h-28 rounded-md bg-slate-700 border border-yellow-700 text-xs text-white cursor-pointer">
                  <div className="bg-slate-900 rounded-t-md p-1 rounded-br-3xl">{val.name}</div>
                  <div className="p-1">
                    <div>世界: {worldConvert[val.world]} | カテゴリ: {ItemCategory[val.category-1].name}</div>
                    <div>必要: {val.require}</div>
                    <div>入手: {val.obtain}</div>
                  </div>
                </div>
              )
            })}
          </div>
          { !isEmpty && !isLoading ?
          <div className="w-full flex justify-evenly py-6 text-gray-300">
            <div>
            <Button disabled={pageData.isFirstPage} onClick={() => handlePush('previous')} className="border-none bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            </div>
            <div className="mt-1">
              {pageData.currentPage} / {pageData.pageCount}
            </div>
            <div>
            <Button disabled={pageData.isLastPage} onClick={() => handlePush('next')} className="border-none bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
            </div>
          </div>
          : <></>
          }
        </div>
      </div>
    </div>
    <Footer />
    </Suspense>
  </div>
  )
}

export default DBPage