"use client";

import React, { useState, useEffect } from 'react';
import { Terminal, User, Lock, AlertCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Header from '@/app/components/Header';
import Auth from '@/app/utils/Auth';

const LEDLCDBackground: React.FC = () => (
  <div className="fixed inset-0 bg-black overflow-hidden">
    <div className="absolute inset-0 bg-gray-500 opacity-20" 
         style={{backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '4px 4px'}} />
    <div className="scanline absolute top-0 left-0 w-full h-2 bg-white opacity-10 animate-scanline" />
    <style jsx>{`
      @keyframes scanline {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
      }
      .animate-scanline {
        animation: scanline 5s linear infinite;
      }
    `}</style>
  </div>
);

const LoginPage: React.FC = () => {
  const [terminalContent, setTerminalContent] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const loginUser = Auth();
  if (loginUser.discord) {
    const router = useRouter();
    router.push("/mypage");
  }

  let flg = false;
  let msg = "";

  useEffect(() => {
    const text = '$ sudo login ';
    setTerminalContent(text);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username and password are required.');
    } else {
      setError('');
      try {
        const response = await fetch("/api/user/signin", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"username": username, "password": password}),
        });
  
        const jsondata = await response.json();
  
        flg = jsondata.flg;
        msg = jsondata.message;
  
        if (flg) {
          //成功したら、トークンを保存
          if ("token" in jsondata) {
            localStorage.setItem("token", jsondata.token);
            alert(msg);
          }
        } else {
          setError(msg);
        }
      } catch (error) {
        setError("Login failed");
      }
    }
  };

  return (
    <div>
      <div className='z-50 w-full absolute'>
        <Header />
      </div>
      <LEDLCDBackground />
      <div className="pt-24 min-h-screen flex items-center justify-center p-4 bg-gray-900 text-green-400 font-mono">
        <div className="w-full max-w-md bg-black bg-opacity-80 p-6 rounded-lg shadow-2xl border border-green-400 z-10">
          <div className="mb-4">
            <Terminal className="w-6 h-6 inline-block mr-2" />
            <span className="text-xl font-bold">ArchLinux Login</span>
          </div>
          
          <div className="mb-4 h-24 bg-black p-2 rounded overflow-hidden">
            <span className="text-green-400 text-sm">Welcome to ArchLinux Login</span>
            <pre className="text-green-400 text-sm">{terminalContent}<span className="animate-pulse">█</span></pre>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-green-400 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Username
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-800 border-green-400 text-green-400 placeholder-green-600"
                placeholder="Enter username"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-green-400 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-green-400 text-green-400 placeholder-green-600"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="text-red-500 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}
            
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-black">
              Login
            </Button>
          </form>
          
          <div className="flex mt-4 justify-center">
            <Link href="/help">
              <p className="text-green-400 hover:underline">Forgot password?</p>
            </Link>
            <span className="mx-2">|</span>
            <Link href="/signup">
              <p className="text-green-400 hover:underline">Create an account</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;