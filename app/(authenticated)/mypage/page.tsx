"use client"
import useAuth from '@/app/utils/useAuth';
import React from 'react'

const page = () => {
  const loginUser = useAuth();

  if (loginUser) {
    return (
      <div>
        <h1>マイページ</h1>
        <p>ユーザー名：{ loginUser.username && loginUser.username }</p>
        <p>メールアドレス：{ loginUser.discord && loginUser.discord }</p>
      </div>
    )
  } else {
    return (
      <div>
        <div>ERROR!</div>
      </div>
    )
  }
}

export default page