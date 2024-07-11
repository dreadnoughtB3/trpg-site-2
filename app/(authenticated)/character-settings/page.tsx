"use client";

import Auth from '@/app/utils/Auth';
import React, { useState, useEffect } from 'react'
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BottomNav from '@/app/components/NavBar';
import { useRouter } from 'next/navigation';
import { getCharacterSettings } from '@/features/api/CharacterSetting';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Species } from '@/app/static/Species';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CharacterSetting {
  name: String,
  slug: number,
  world: String,
  sex: String,
  age: number,
  specie: number,
  updated_at: String,
  owner: {
    name: String
  }
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const CharacterSettings = () => {

  const loginUser = Auth();

  const router = useRouter();
  const [isLoading, setIsLoadng] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [buttonState, setButtonState] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    world: ""
  });
  const [characterSettings, SetCharacterSettings] = useState<CharacterSetting[]>([])

  async function handleSelect(value:string, name:string){
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    await sleep(500);
    setButtonState(false);
  }

  function searchCharaSetting(){
    if(formData.name == "" && formData.world == ""){ return }
    SetCharacterSettings([]);
    setIsLoadng(true);
    setButtonState(true);
    getCharacterSettings(formData.name, formData.world).then((value) => {
      SetCharacterSettings(value.data);
      setIsLoadng(false);
      if(!value.data[0]){
        setIsEmpty(true);
      }
    });
  }

  useEffect(() => {
    getCharacterSettings().then((value) => {
      SetCharacterSettings(value.data);
      setIsLoadng(false);
      if(!value.data[0]){
        setIsEmpty(true);
      }
    });
  }, [])

  return ( 
  <div>
    <Header />
    <div className="min-h-screen bg-[#1e2124]">
      <div className="flex justify-center">
        <div className="flex flex-col w-full justify-center items-center pt-5 space-y-3 mx-2">
          <div className="flex w-full justify-center">
            <Input onChange={((e) => handleSelect(e.target.value, 'name'))} value={formData.name} className="max-w-lg rounded-none border-slate-600 bg-slate-700/70 text-[#d3b88d]" type="text" placeholder="名前" />
            <Select onValueChange={((v) => handleSelect(v, 'world'))}>
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
            <Button disabled={buttonState} onClick={() => {searchCharaSetting()}} className="bg-slate-700/70 rounded-none border-slate-600 border">検索</Button>
          </div>
          {
            !isEmpty && isLoading ? <div className="pt-10"><CircularProgress /></div> : <></>
          }
          {
            isEmpty && !isLoading ? <div className="pt-10 text-center text-gray-300 text-xl">検索結果がありません</div> : <></>
          }
          {characterSettings.map((item, index) => {
            return (
              <div key={index} onClick={() => {router.push(`/character-settings/${item.slug}`)}}
              className="w-full max-w-2xl rounded-lg text-sm bg-gray-600 text-white p-2 cursor-pointer">
                <div className="text-base">名前: {item.name}</div>
                <div>世界: {item.world} | 性別: {item.sex} | 年齢: {item.age} | 種族: {Species[item.specie-1].name}</div>
                <div className="text-xs text-gray-400 mt-1">最終更新: {item.updated_at.split("T")[0]} | {item.owner.name}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
    <BottomNav />
    <Footer />
  </div> 
  );
}
 
export default CharacterSettings;