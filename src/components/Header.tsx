'use client';

import Image from "next/image";
import Link from "next/link";
import DropdownMenu from "./DropdownMenu";
import { usePathname } from 'next/navigation'

interface NavItem {
    label: string;
    href: string;
    dropdown?: NavItem[]
}

interface HeaderProps {
    navItems: NavItem[];
}

export default function Header({ navItems }: HeaderProps) {
    const pathname = usePathname();

    return (
        <header className="flex flex-col sticky top-0 z-[999]">
            <div className="relative flex justify-between items-center p-2 bg-brand-graytext shadow-md">
                <Link href="/" className="flex flex-row items-center">
                    <Image src="/logo.png" alt="Logo" width={63} height={43} />
                    <h1 className="ml-6 text-3xl font-bold text-brand-yellow">Sparq Systems</h1>
                </Link>
                <nav className="flex flex-wrap space-x-2">
                    {navItems.map((item, index) => {
                        const isActive = item.dropdown
                            ? item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                            : pathname === item.href;

                        return item.dropdown ? (
                            <DropdownMenu key={index} navItem={item} isActive={isActive} />
                        ) : (
                            <Link
                                key={index}
                                href={item.href}
                                className={`px-3 py-1 text-md rounded ${
                                    isActive
                                        ? 'text-brand-yellow font-bold'
                                        : 'text-white hover:text-gray-300'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}