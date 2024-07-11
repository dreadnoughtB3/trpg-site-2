import React from 'react';
import Link from 'next/link';
import { cn } from "../../lib/utils";
import { usePathname } from 'next/navigation';
import { Home, Search, Bell, User } from 'lucide-react';

type NavItem = {
  icon: React.ElementType;
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { icon: User, href: '/character-settings', label: 'キャラ設定' },
  { icon: Home, href: '/mypage', label: 'ホーム' }
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 shadow-lg">
      <div className="h-px bg-gray-400"></div>
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} passHref>
                <div className={cn(
                  "flex flex-col items-center justify-center w-full h-full",
                  " text-gray-300 hover:text-blue-400",
                  "transition-colors duration-200",
                  pathname === item.href && " text-blue-400"
                )}>
                  <item.icon className="w-6 h-6" />
                  <span className="text-xs mt-1">{item.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default BottomNav;