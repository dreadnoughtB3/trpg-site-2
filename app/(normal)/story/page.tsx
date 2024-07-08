"use client";
import Header from '@/app/components/Header';
import Image from "next/image";

import React, { useState, useEffect } from 'react';

const StoryViewer = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div>
      <Image
          src="/bg_03.png" // ロゴ画像のパスを指定
          alt="Logo"
          layout="responsive"
          width={100} // 100%幅で表示
          height={40} // アスペクト比を維持
          objectFit="contain" // 画像のフィットを調整
        /> 
      </div>
    </div>
  );
};

export default StoryViewer;