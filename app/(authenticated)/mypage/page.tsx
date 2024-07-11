"use client"
import Auth from '@/app/utils/Auth';
import React from 'react'
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BottomNav from '@/app/components/NavBar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page: React.FC = () => {
  const loginUser = Auth();

  if (loginUser.discord){
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[#1e2124]">
          <div className="flex w-full justify-center pt-10 text-white">
            <div>
              <p>ようこそ、{loginUser.username}！</p>
              <p>あなたのDiscordID: {loginUser.discord}</p>
              <div>
                <Link href="/character-settings/new">
                  <Button className="bg-slate-700/70 rounded-none mt-3 border-slate-600 border">
                  キャラクター設定を作成
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <BottomNav />
        <Footer />
      </div>
    )
  } else {
    return (
      <div>確認中...</div>
    )
  }
}

export default page