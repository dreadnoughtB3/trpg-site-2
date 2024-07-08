import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CircleUserRound } from 'lucide-react';
import logoImage from '@/public/Logo.png';

const Header: React.FC = () => {
  return (
    <div>
      <div className="bg-[#121212] text-white flex items-center justify-between pl-6 py-2">
        <div className="flex items-center">
          <Link href="/">
            <Image src={logoImage} alt="Logo" width={160} height={40} />
          </Link>
        </div>
        <nav className="flex space-x-9 font-light text-lg">
          <Link href="/">
            <p className="hover:text-gray-300">HOME</p>
          </Link>
          <Link href="/world">
            <p className="hover:text-gray-300">WORLD</p>
          </Link>
          <Link href="/story">
            <p className="hover:text-gray-300">STORY</p>
          </Link>
          <Link href="/news">
            <p className="hover:text-gray-300">NEWS</p>
          </Link>
        </nav>
        <div className="flex">
          <Link href="/signin">
            <div className="flex items-center justify-center mr-5 mt-2 cursor-pointer">
              <p className="mr-2">ログイン</p>
              <CircleUserRound />
            </div>
          </Link>
          <div className='h-14 w-36 cursor-pointer bg-[#d3b88d] -mt-2 -mb-2 rounded-bl-3xl flex items-center justify-center'>
            <div className="text-black text-lg font-semibold">今すぐ参加</div>
          </div>
        </div>
      </div>
      <div className='h-px w-full bg-neutral-500'></div>
    </div>
  );
}

export default Header;
