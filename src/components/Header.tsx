import Image from "next/image";
import Link from "next/link";
import DropdownMenu from "./DropdownMenu";
import StockDisplay from "./StockDisplay";

interface NavItem {
    label: string;
    href: string;
    dropdown?: NavItem[]
}

interface HeaderProps {
    navItems: NavItem[];
}

export default function Header({ navItems }: HeaderProps) {
    return (
        <header className="flex flex-col">
            <div className="relative flex justify-between items-center p-2 bg-brand-graytext shadow-md">
                <Link href="/">
                    <Image src="/logo.png" alt="Logo" width={63} height={43}/>
                </Link>
                <nav className="flex flex-wrap space-x-2">
                    {navItems.map((item, index) =>
                        item.dropdown ? (
                            <DropdownMenu key={index} navItem={item} />
                        ) : (
                            <Link
                                key={index}
                                href={item.href}
                                className="text-white px-3 py-1 text-md rounded hover:text-gray-300"
                            >
                                {item.label}
                            </Link>
                        )
                    )}
                </nav>
            </div>
            <StockDisplay/>
        </header>
    );
}