'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTrackEvent } from '@/hooks/useTrackEvent'
import SolarBackgroundElements from '@/components/SolarBackgroundElements'
import Reveal from '@/components/Reveal'

interface FeaturedProduct {
  id: string
  title: string
  tagline: string
  description: string
  href: string
  image: string
  features: string[]
  accentColor: string
  variants?: {
    id: string
    title: string
    tagline: string
    href: string
    image: string
  }[]
}

const unifiedQuadProduct: FeaturedProduct = {
  id: 'quad-series',
  title: 'Quad Series',
  tagline: 'Revolutionary Microinverter Technology',
  description:
    'Advanced microinverter technology delivering exceptional performance, reliability, and efficiency. Available in single-phase and three-phase configurations for residential, commercial & industrial solar installations.',
  href: '/products/quad2',
  image: '/q2000.webp',
  features: [
    'Advanced MPPT Technology',
    'Real-time Monitoring',
    'No Failure-Prone Components',
    'Easy Installation',
  ],
  accentColor: 'bg-gradient-to-bl from-brand-gray/80 to-brand-graytext/80',
  variants: [
    {
      id: 'quad2',
      title: 'Quad2',
      tagline: 'Single-Phase',
      href: '/products/quad2',
      image: '/q2000.webp',
    },
    {
      id: 'quad3',
      title: 'Quad3',
      tagline: 'Three-Phase',
      href: '/products/quad3',
      image: '/quad3.webp',
    },
  ],
}

function FloatingProductHero({ product }: { product: FeaturedProduct }) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null)
  const trackEvent = useTrackEvent()

  return (
    <div className="flex flex-col lg:flex-row items-center gap-16 mb-8 sm:mb-32">
      <div className="flex-1 max-w-2xl order-1 lg:order-none">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-brand-darkmaroon to-brand-maroon bg-clip-text text-transparent dark:from-brand-yellow dark:to-brand-logo">
            {product.title}
          </span>
        </h2>
        <p className="text-xl md:text-2xl font-semibold text-brand-darkmaroon dark:text-brand-maroon mb-6">
          {product.tagline}
        </p>
        <p className="text-lg text-brand-graytext dark:text-dark-text-secondary mb-8 leading-relaxed">
          {product.description}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {product.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo" />
              <span className="text-brand-graytext dark:text-dark-text-secondary font-medium">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {product.variants ? (
          <div className="flex gap-4 w-full">
            {product.variants.map((variant, i) => (
              <Link key={variant.id} href={variant.href} className="flex-1">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('product_variant_clicked', {
                      variant: variant.id,
                      product: product.id,
                    })
                  }}
                  className={`w-full px-6 py-5 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer ${
                    i === 0
                      ? 'bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white'
                      : 'bg-white dark:bg-gray-900/90 text-brand-darkmaroon dark:text-brand-yellow border-2 border-brand-maroon/20 dark:border-brand-yellow/30'
                  }`}
                  onMouseEnter={() => setSelectedVariant(variant)}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg">Explore {variant.title}</span>
                    <span className="text-sm opacity-80">{variant.tagline}</span>
                  </div>
                </button>
              </Link>
            ))}
          </div>
        ) : (
          <Link href={product.href}>
            <button
              type="button"
              className="px-8 py-4 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-100 cursor-pointer"
            >
              Explore {product.title}
            </button>
          </Link>
        )}
      </div>

      <div className="flex-1 max-w-lg w-full min-w-0 order-2 lg:order-none">
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative overflow-hidden border-0 shadow-2xl rounded-2xl h-64 sm:h-80 lg:h-96 w-full bg-neutral-100 dark:bg-gray-800/60">
            <Image
              src={selectedVariant?.image || product.image}
              alt={selectedVariant?.title || product.title}
              fill
              className="object-contain transition-all duration-500 ease-out"
              style={{
                filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)',
              }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
            <div
              className={`absolute inset-0 ${product.accentColor} rounded-2xl transition-opacity duration-300 ${
                isHovered ? 'opacity-20' : 'opacity-40'
              }`}
            />
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 transform rotate-45 translate-x-12 -translate-y-12" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const trackEvent = useTrackEvent()

  const handleCtaClick = (action: string) => {
    trackEvent('button_click', {
      btn_name: `home_${action}`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <SolarBackgroundElements />

      {/* Hero — fully painted for LCP (no opacity:0 / Motion entrance) */}
      <section className="relative container mx-auto pt-10 pb-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-brand-maroon via-[#ca9a31] to-brand-maroon bg-clip-text text-transparent">
              Power the Future
            </span>
            <br />
            <span className="bg-gradient-to-r from-brand-maroon via-[#ca9a31] to-brand-maroon bg-clip-text text-transparent">
              With Sparq Systems
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed mb-12">
            Discover our cutting-edge microinverter technology that&apos;s transforming solar energy
            with unmatched efficiency, reliability, and innovation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
            <Link href="/products" onClick={() => handleCtaClick('explore_products')}>
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                Explore Our Products
              </button>
            </Link>
            <Link href="/about" onClick={() => handleCtaClick('learn_more')}>
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-900/90 text-brand-darkmaroon dark:text-brand-yellow font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border-2 border-brand-maroon/20 dark:border-brand-yellow/30 cursor-pointer"
              >
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative bg-white dark:bg-gray-900/80 py-10">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-brand-darkmaroon to-brand-maroon bg-clip-text text-transparent dark:from-brand-yellow dark:to-brand-logo">
                Revolutionary Technology
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed">
              Three breakthrough innovations that set Sparq Systems apart from every other solar
              microinverter company in the world.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'Proprietary Quad Architecture',
                body: 'One microinverter powers four PV panels with individual MPPT, reducing the cost of installation and Bill of Materials considerably.',
                badge: '4x Fewer Inverters Needed',
                iconBg: 'from-brand-maroon to-brand-darkmaroon',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                ),
              },
              {
                title: 'Electrolytic Capacitor Free Design',
                body: 'Revolutionary power electronics that eliminate failure-prone electrolytic capacitors, matching the true lifetime of PV panels.',
                badge: '25-Year Design Life',
                iconBg: 'from-brand-logo to-brand-yellow',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                ),
              },
              {
                title: 'Dual-Mode Operation',
                body: 'Seamlessly switch between on-grid and off-grid operation; providing reliable electricity generation during grid outages and independent of energy storage.',
                badge: 'Grid Independence Ready',
                iconBg: 'from-brand-gray to-brand-graytext',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                ),
              },
            ].map((card) => (
              <Reveal key={card.title} className="group">
                <div className="h-full bg-gradient-to-br from-slate-100 to-neutral-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105 flex flex-col">
                  <div
                    className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${card.iconBg} rounded-2xl mb-6 mx-auto group-hover:rotate-6 transition-transform duration-500`}
                  >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {card.icon}
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-4 text-center">
                    {card.title}
                  </h3>
                  <p className="text-brand-graytext dark:text-dark-text-secondary text-center mb-6 leading-relaxed">
                    {card.body}
                  </p>
                  <div className="text-center mt-auto">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand-maroon dark:text-brand-logo">
                      <span>{card.badge}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center bg-gradient-to-br from-brand-maroon/5 to-brand-logo/5 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
              The Result: Industry-Leading Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-maroon dark:text-brand-logo mb-2">75%</div>
                <div className="text-brand-graytext dark:text-dark-text-secondary font-medium">
                  Fewer Inverters Required
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-maroon dark:text-brand-logo mb-2">
                  Lowest
                </div>
                <div className="text-brand-graytext dark:text-dark-text-secondary font-medium">
                  Cost Per Watt in Industry
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-maroon dark:text-brand-logo mb-2">Zero</div>
                <div className="text-brand-graytext dark:text-dark-text-secondary font-medium">
                  Maintenance Required
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <Reveal className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-brand-darkmaroon to-brand-maroon bg-clip-text text-transparent dark:from-brand-yellow dark:to-brand-logo">
                Microinverter Product Family
              </span>
            </h2>
            <p className="text-lg md:text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
              Single-phase and three-phase microinverter solutions for residential and commercial solar
              installations.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative container mx-auto py-10">
        <FloatingProductHero product={unifiedQuadProduct} />
      </section>

      <section className="container mx-auto px-6 pb-20 sm:py-20">
        <Reveal className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
            Ready to Transform Your Solar Future?
          </h2>
          <p className="text-lg text-brand-graytext dark:text-dark-text-secondary mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have chosen Sparq Systems for their solar energy
            needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
            <Link href="/technology">
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                onClick={() => handleCtaClick('technology')}
              >
                Explore Technology
              </button>
            </Link>
            <Link href="/investors">
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-logo text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                onClick={() => handleCtaClick('investors')}
              >
                For Investors
              </button>
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
