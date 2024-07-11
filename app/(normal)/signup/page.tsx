"use client";

import React, { useState, useEffect } from 'react';
import { Terminal, User, Lock, MessageSquare, AlertCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { postUser } from '@/features/api/postUser';
import Header from '@/app/components/Header';
import CheckAuth from '@/app/utils/CheckAuth';
import { AxiosResponse } from 'axios';

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

const SignupPage: React.FC = () => {
  const [terminalContent, setTerminalContent] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [discordId, setDiscordId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isProcessed, setIsProcessed] = useState(false);

  CheckAuth()

  const router = useRouter();

  useEffect(() => {
    const text = '$ sudo useradd -m ';
    setTerminalContent(text)
  }, []);

  const isPasswordStrong = (password: string): boolean => {
    // This is a basic check. You might want to implement a more robust check.
    return password.length > 6 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !discordId) {
      setError('All fields are required.');
    } else if (password.length <= 6) {
      setError('Password must be longer than 6 characters.');
    } else if (!isPasswordStrong(password)) {
      setError('Password is too weak. It should contain uppercase, lowercase, and numbers.');
    } else {
      setError('');
      setIsProcessed(true);
      const res = await postUser({ "discord": discordId, "name": username, "password": password })
      .then((v:AxiosResponse) => {
        if(v.data.message == 'アカウント作成失敗'){
          if(v.data.code == 'P2002'){
            setError('Username or ID already exists.')
          }
        }else{
          router.push('/signin')
        }

        setIsProcessed(false);
      })
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
            <span className="text-xl font-bold">ArchLinux Account Creation</span>
          </div>
          
          <div className="mb-1 h-24 bg-black p-2 rounded overflow-hidden">
            <p className="text-green-400- text-sm">Welcome to ArchLinux Account Creation</p>
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
            
            <div>
              <Label htmlFor="discordId" className="text-green-400 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Discord ID
              </Label>
              <Input
                id="discordId"
                value={discordId}
                onChange={(e) => setDiscordId(e.target.value)}
                className="bg-gray-800 border-green-400 text-green-400 placeholder-green-600"
                placeholder="Enter Discord ID"
              />
            </div>

            {error && (
            <div className="text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
            
            <Button disabled={isProcessed} type="submit" className="w-full bg-green-600 hover:bg-green-700 text-black">
              Create Account
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/signin">
              <p className="text-green-400 hover:underline">Already have account?</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;