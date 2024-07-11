"use client";

import Auth from '@/app/utils/Auth';
import React, { useEffect, useState } from 'react';
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import BottomNav from '@/app/components/NavBar';
import { postCharacterSetting } from '@/features/api/CharacterSetting';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Species } from '@/app/static/Species';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function Page() {

  const LoginData = Auth();
  const router = useRouter();

  const [isLoading, setIsLoadng] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleConfirm, setToggleConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [inputData, SetInputData] = useState({
    body: "",
    name: "",
    specie: "",
    world: "",
    sex: "",
    age: 0,
    id: ""
  })

  async function handleInput(value:string, name:string){
    SetInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  function createCharacter(){
    setIsProcessing(true);
    console.log(inputData);
    postCharacterSetting(inputData).then((value) => {
        console.log(value)
        if(value.message == "キャラ設定作成失敗"){
            setErrorMessage("キャラクター設定の作成に失敗しました。");
            setIsProcessing(false);
        }else if(value.data.slug){
            router.push(`/character-settings/${value.data.slug}`)
        }
    })
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#1e2124]">
      <div className="flex justify-center pt-3">
        <div className="flex w-full ml-2 max-w-3xl justify-between">
          <Link href="/mypage">
            <ChevronLeft className="text-gray-300 mt-1"></ChevronLeft>
          </Link>
        <Button onClick={() => setToggleConfirm(true)} className="bg-slate-700/70 rounded-none h-[30px] mr-2 border-slate-600 border">保存</Button> 
        </div>
      </div>
        <div className="flex w-full justify-center min-h-screen">
            <div className="w-full  max-w-3xl mx-2 my-3 mb-10">
              <div className="bg-[#424549] rounded-sm border border-gray-400">
                <div className="bg-[#282b30] p-2 text-bold text-gray-300">
                    <div>新規作成</div>
                </div>
                <div className="text-gray-300 p-2 md:py-4 whitespace-pre-wrap text-sm md:text-base">
                  <div>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="bg-[#282b30] font-bold data-[state=closed]:rounded-xl data-[state=open]:rounded-t-xl data-[state=open]:border-b-0 border">
                          基本項目
                        </AccordionTrigger>
                        <AccordionContent className="rounded-b-xl p-2 border border-t-0 bg-[#36393e]">
                          <div className="flex">
                            <div className="flex w-[70px] text-sm md:text-base font-bold bg-slate-800 rounded-none items-center justify-center">
                              <p>名前</p>
                            </div>
                            <Input onChange={(e) => (handleInput(e.target.value, "name"))} value={inputData.name}
                            className="bg-gray-500 max-w-md text-sm md:text-base font-bold rounded-none border-0 h-[30px]"></Input>
                          </div>
                          <div className="flex mt-2">
                            <div className="flex w-[70px] text-sm md:text-base font-bold bg-slate-800 rounded-none items-center justify-center">
                              <p>世界</p>
                            </div>
                            <Select value={inputData.world} onValueChange={((v) => handleInput(v, 'world'))}>
                              <SelectTrigger className="w-[80px] min-w-[80px] h-[30px] bg-gray-500 border-0 rounded-none font-bold text-[#d3b88d]">
                                <SelectValue placeholder="選択" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="ノクターン">N</SelectItem>
                                  <SelectItem value="ファンタジア">F</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <div className="flex ml-1 w-[70px] h-[30px] min-h-[30px] text-sm md:text-base font-bold bg-slate-800 rounded-none items-center justify-center">
                              <p>性別</p>
                            </div>
                            <Select value={inputData.sex} onValueChange={((v) => handleInput(v, 'sex'))}>
                              <SelectTrigger className="w-[80px] min-w-[80px] h-[30px] min-h-[30px] bg-gray-500 border-0 rounded-none font-bold text-[#d3b88d]">
                                <SelectValue placeholder="選択" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="女性">女性</SelectItem>
                                  <SelectItem value="男性">男性</SelectItem>
                                  <SelectItem value="中性">中性</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <div className="flex ml-1 w-[70px] h-[30px] min-h-[30px] text-sm md:text-base font-bold bg-slate-800 rounded-none items-center justify-center">
                              <p>年齢</p>
                            </div>
                            <Input value={inputData.age} type="number" onChange={(e) => (handleInput(e.target.value, "age"))}
                            className="bg-gray-500 max-w-32 text-sm md:text-base font-bold rounded-none border-0 h-[30px]">
                            </Input>
                          </div>
                          <div className="flex mt-2">
                          <div className="flex w-[70px] h-[30px] min-h-[30px] text-sm md:text-base font-bold bg-slate-800 rounded-none items-center justify-center">
                              <p>種族</p>
                            </div>
                            <Select value={inputData.specie} onValueChange={((v) => handleInput(v, 'specie'))}>
                              <SelectTrigger className="h-[30px] min-h-[30px] max-w-md bg-gray-500 border-0 rounded-none font-bold text-[#d3b88d]">
                                <SelectValue placeholder="選択" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                {Species.map(v => {
                                  return (
                                    <SelectItem key={v.key} value={String(v.key)}>{v.name}</SelectItem>
                                  );
                                })}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Accordion className="mt-2" type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="bg-[#282b30] border font-bold data-[state=closed]:rounded-xl data-[state=open]:rounded-t-xl">
                          設定本文
                        </AccordionTrigger>
                        <AccordionContent className="rounded-b-xl ">
                          <Textarea onChange={(e) => (handleInput(e.target.value, "body"))} value={inputData.body} 
                          className="rounded-t-none rounded-b-xl text-gray-700 text-sm md:text-base" />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <Dialog onOpenChange={(v) => {setToggleConfirm(v)}} open={toggleConfirm}>
        <DialogContent className="sm:rounded-none md:rounded-none max-w-sm sm:max-w-sm md:max-w-sm bg-slate-400/20">
          <DialogHeader>
            <DialogTitle className="text-white p-2 pt-3 text-center">保存しますか?</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center mb-2">
            <Button disabled={isProcessing} onClick={() => createCharacter()} className="mr-1 w-[90px] rounded-none border border-yellow-800">はい</Button>
            <Button onClick={() => setToggleConfirm(false)} className="ml-1 w-[90px] rounded-none border border-yellow-800">いいえ</Button>
          </div>
        </DialogContent>
      </Dialog>
      <BottomNav />
      <Footer />
    </div>
  )
}