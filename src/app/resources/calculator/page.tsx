'use client'

import BoMCalc from '@/components/BomCalc'
import SolarBackgroundElements from '@/components/SolarBackgroundElements'

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      <SolarBackgroundElements />

      <section className="relative container mx-auto px-6 pt-10 pb-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
              BoM Calculator
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed">
            Calculate your Bill of Materials and system requirements with our comprehensive planning tool.
          </p>
        </div>
      </section>

      <section className="relative container mx-auto px-6 pb-20">
        <BoMCalc />
      </section>
    </div>
  )
}
