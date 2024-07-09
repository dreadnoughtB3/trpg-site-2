import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CircleUserRound, Menu, X } from 'lucide-react';
import logoImage from '@/public/Logo.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="bg-[#121212] text-white">
        <div className="mx-auto px-4 md:px-0 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Image src={logoImage} alt="Logo" width={160} height={40} />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-9 font-light text-lg">
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
            
            {/* Desktop Login and CTA */}
            <div className="hidden md:flex">
              <Link href="/signin">
                <div className="flex items-center mr-4 mt-2 cursor-pointer">
                  <p className="mr-2">ログイン</p>
                  <CircleUserRound />
                </div>
              </Link>
              <div className='h-14 w-36 cursor-pointer bg-[#d3b88d] -mt-2 -mb-2 rounded-bl-3xl flex items-center justify-center'>
                <div className="text-black text-lg font-semibold">今すぐ参加</div>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="flex flex-col items-center py-4">
              <Link href="/">
                <p className="py-2 hover:text-gray-300">HOME</p>
              </Link>
              <Link href="/world">
                <p className="py-2 hover:text-gray-300">WORLD</p>
              </Link>
              <Link href="/story">
                <p className="py-2 hover:text-gray-300">STORY</p>
              </Link>
              <Link href="/news">
                <p className="py-2 hover:text-gray-300">NEWS</p>
              </Link>
              <div className="w-full h-px bg-white"></div>
              <Link href="/signin">
                <div className="flex items-center py-2 cursor-pointer">
                  <p>LOGIN</p>
                </div>
              </Link>
              <div className='mt-4 h-10 px-8 cursor-pointer bg-[#d3b88d] rounded-full flex items-center justify-center'>
                <div className="text-black text-sm font-semibold">今すぐ参加</div>
              </div>
            </nav>
          </div>
        )}
      </div>
      <div className='h-px w-full bg-neutral-500'></div>
    </div>
  );
}

export default Header;
