"use client"

import React, { useEffect, useState, Suspense } from 'react'
import DBPageComponent from '@/app/components/page/DBPage';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';


const DBPage: React.FC = () => {
  return (
  <div>
    <Suspense >
    <Header />
      <DBPageComponent></DBPageComponent>
    <Footer />
    </Suspense>
  </div>
  )
}

export default DBPage