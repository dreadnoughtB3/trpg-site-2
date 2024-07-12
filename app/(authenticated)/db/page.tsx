"use client"
import Auth from '@/app/utils/Auth';
import React, { useEffect } from 'react'
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
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
import Link from 'next/link';

const DBPage: React.FC = () => {

  useEffect(() => {
  }, [])
  
  return (
  <div>
    <Header />
    <div className="min-h-screen bg-[#1e2124]">
      <div className="flex justify-center">
        <div className="flex flex-col w-full justify-center items-center pt-5 space-y-3 mx-2">
          <div className="flex w-full justify-center">
            <Input type="text" placeholder="キーワード"
            className="max-w-lg rounded-none border-slate-600 bg-slate-700/70 text-[#d3b88d]" />
            <Select >
              <SelectTrigger className="w-[80px] min-w-[80px] rounded-none border-slate-600 mx-2 bg-slate-700/70 text-[#d3b88d]">
                <SelectValue placeholder="世界" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="any">両方</SelectItem>
                  <SelectItem value="ノクターン">N</SelectItem>
                  <SelectItem value="ファンタジア">F</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className="bg-slate-700/70 rounded-none border-slate-600 border">
              検索
            </Button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default DBPage