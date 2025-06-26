'use client'

import { useState, useEffect } from 'react'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ForceScroll from "@/components/ForceScroll"
import LeavingSite from "@/components/LeavingSite"

interface NavItem {
    href: string
    label: string
    dropdown?: NavItem[]
}

interface FontOption {
    className: string
}

interface RootLayoutClientProps {
    children: React.ReactNode
    navbarItems: NavItem[]
    fontOptions: Record<string, FontOption>
}

export default function RootLayoutClient({ children, navbarItems, fontOptions }: RootLayoutClientProps) {
    const [currentFont, setCurrentFont] = useState('pt_sans')

    useEffect(() => {
        const savedFont = localStorage.getItem('selectedFont')
        if (savedFont && fontOptions[savedFont]) {
            setCurrentFont(savedFont)
        }
    }, [fontOptions])

    const handleFontChange = (fontKey: string) => {
        setCurrentFont(fontKey)
        localStorage.setItem('selectedFont', fontKey)
    }

    const activeFont = fontOptions[currentFont] || fontOptions['pt_sans']

    const fontSelectOptions = [
        { name: 'PT Sans', value: 'pt_sans', className: fontOptions.pt_sans.className },
        { name: 'Nunito', value: 'nunito', className: fontOptions.nunito.className },
        { name: 'Roboto Flex', value: 'roboto_flex', className: fontOptions.roboto_flex.className },
        { name: 'Quicksand', value: 'quicksand', className: fontOptions.quicksand.className },
        { name: 'Inter', value: 'inter', className: fontOptions.inter.className },
        { name: 'Poppins', value: 'poppins', className: fontOptions.poppins.className },
        { name: 'Geist', value: 'geist', className: fontOptions.geist.className },
        { name: "Raleway", value: 'raleway', className: fontOptions.raleway.className},
        { name: "Crimson Text", value: 'crimson', className: fontOptions.crimson.className},
    ]

    return (
        <body className={`${activeFont.className} flex flex-col min-h-screen overflow-y-scroll`}>
            <Header 
                navItems={navbarItems} 
                currentFont={currentFont}
                onFontChange={handleFontChange}
                fontOptions={fontSelectOptions}
            />
            <ForceScroll />
            <LeavingSite />
            <main className="flex-grow h-full">
                {children}
            </main>
            <Footer />
        </body>
    )
}