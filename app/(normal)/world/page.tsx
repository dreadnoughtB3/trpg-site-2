"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Button } from "@/components/ui/button";

const WorldPage = () => {
  return (
  <div>
    <Header />
    <div className="min-h-screen bg-cover bg-center bg-opacity-100" style={{backgroundImage: "url('/167750.jpg')"}}>
      <div className="flex w-full justify-center pt-5">
        <Button className="rounded-none text-gray-300 bg-slate-800/70 w-[120px]">ノクターン</Button>
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default WorldPage;