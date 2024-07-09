"use client"
import Auth from '@/app/utils/Auth';
import React from 'react'
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const page: React.FC = () => {
  const loginUser = Auth();

  if (loginUser.discord){
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-slate-600">
          <div >
            <p>まだなにもないです</p>
          </div>
        </div>
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