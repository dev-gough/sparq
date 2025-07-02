'use client'

import { useState, useEffect } from 'react'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ForceScroll from "@/components/ForceScroll"
import LeavingSite from "@/components/LeavingSite"
import { AnimationProvider } from '@/contexts/AnimationContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

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

function BackgroundWrapper({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false)
    
    useEffect(() => {
        setMounted(true)
    }, [])
    
    // Use system colors initially, then transition to custom gradients
    const backgroundClass = mounted 
        ? "min-h-screen bg-gradient-to-br from-slate-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-75"
        : "min-h-screen bg-white dark:bg-gray-900"
    
    return (
        <div className={backgroundClass} suppressHydrationWarning>
            {children}
        </div>
    )
}

function RootLayoutContent({ children, navbarItems, fontOptions }: RootLayoutClientProps) {
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

    const fontSelectOptions = [
        { name: 'PT Sans', value: 'pt_sans', className: fontOptions.pt_sans.className },
        { name: 'Nunito', value: 'nunito', className: fontOptions.nunito.className },
        { name: 'Roboto Flex', value: 'roboto_flex', className: fontOptions.roboto_flex.className },
        { name: 'Quicksand', value: 'quicksand', className: fontOptions.quicksand.className },
        { name: 'Inter', value: 'inter', className: fontOptions.inter.className },
        { name: 'Poppins', value: 'poppins', className: fontOptions.poppins.className },
        { name: 'Geist', value: 'geist', className: fontOptions.geist.className },
        { name: "Raleway", value: 'raleway', className: fontOptions.raleway.className },
        { name: "Crimson Text", value: 'crimson', className: fontOptions.crimson.className },
    ]

    return (
        <BackgroundWrapper>
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
        </BackgroundWrapper>
    )
}

export default function RootLayoutClient({ children, navbarItems, fontOptions }: RootLayoutClientProps) {
    const [currentFont, setCurrentFont] = useState('pt_sans')

    useEffect(() => {
        const savedFont = localStorage.getItem('selectedFont')
        if (savedFont && fontOptions[savedFont]) {
            setCurrentFont(savedFont)
        }
    }, [fontOptions])

    const activeFont = fontOptions[currentFont] || fontOptions['pt_sans']

    return (
        <body className={`${activeFont.className} flex flex-col min-h-screen overflow-y-scroll`} suppressHydrationWarning>
            <ThemeProvider>
                <AnimationProvider>
                    <RootLayoutContent
                        navbarItems={navbarItems}
                        fontOptions={fontOptions}
                    >
                        {children}
                    </RootLayoutContent>
                </AnimationProvider>
            </ThemeProvider>
        </body>
    )
}