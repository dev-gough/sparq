import Image from "next/image";
import Link from "next/link";
import { Nunito } from "next/font/google"
import DropdownMenu from "./DropdownMenu";

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["500", "800"],
})

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
        <header className="flex justify-between items-center p-4 bg-[#454345] shadow-md">
            <Link href="/">
                <Image src="/logo.png" alt="Logo" width={126} height={85} />
            </Link>
            <nav className="flex flex-wrap space-x-2">
                {navItems.map((item, index) =>
                    item.dropdown ? (
                        <DropdownMenu key={index} navItem={item}/>
                    ) : (
                        <Link
                            key={index}
                            href={item.href}
                            className={`text-white px-3 py-1 text-md rounded hover:text-gray-300 ${nunito.className}`}
                        >
                            {item.label}
                        </Link>
                    )
                )}
            </nav>
        </header>
    );
}