import React from 'react';
import { ChevronUp, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-gray-900 text-gray-300 py-8 font-gothic">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">ゲーム情報</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">新着情報</a></li>
              <li><a href="#" className="hover:text-white transition-colors">アップデート情報</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ゲームガイド</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">コミュニティ</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">カスタマーサポート</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">アカウント</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">アカウント管理</a></li>
              <li><a href="#" className="hover:text-white transition-colors">セキュリティ</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">その他</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
              <li><a href="#" className="hover:text-white transition-colors">利用規約</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="https://twitter.com/SFTN_TRPG">
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="text-sm">&copy;2024 mayonaka4355. All Rights Reserved.</p>
        </div>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 bg-gray-800 text-white hover:bg-gray-700"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Footer;