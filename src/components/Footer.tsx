import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Globe } from 'lucide-react'

/**
 * Server Component footer — no client JS, no Motion.
 * Theme classes rely on html.dark from the FOUC script / ThemeProvider.
 */
export default function Footer() {
  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/products', label: 'Products' },
    { href: '/investors', label: 'Investors' },
    { href: '/technology', label: 'Technology' },
    { href: '/contact', label: 'Contact' },
    { href: '/resources/legal', label: 'Legal' },
    { href: '/support', label: 'Support' },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-maroon dark:from-brand-yellow dark:via-brand-logo dark:to-brand-yellow" />

      <div className="container mx-auto px-6 py-4">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Image
              src="/logo.png"
              alt="Sparq Systems"
              width={80}
              height={80}
              className="h-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <p className="text-brand-graytext dark:text-dark-text-secondary text-lg mb-6 leading-relaxed">
              Find out what solutions are right for you.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-brand-graytext dark:text-dark-text-secondary">
                <Mail
                  size={18}
                  className="text-brand-maroon dark:text-brand-yellow flex-shrink-0"
                />
                <Link
                  href="mailto:info@sparqsys.com"
                  className="hover:text-brand-maroon dark:hover:text-brand-yellow transition-colors duration-300"
                >
                  info@sparqsys.com
                </Link>
              </div>

              <div className="flex items-center gap-3 text-brand-graytext dark:text-dark-text-secondary">
                <Globe
                  size={18}
                  className="text-brand-maroon dark:text-brand-yellow flex-shrink-0"
                />
                <span>We provide products globally.</span>
              </div>

              <div className="flex items-start gap-3 text-brand-graytext dark:text-dark-text-secondary">
                <MapPin
                  size={18}
                  className="text-brand-maroon dark:text-brand-yellow flex-shrink-0 mt-1"
                />
                <Link
                  href="https://www.google.com/maps/place/SPARQ+Systems/@44.2441588,-76.5137419,16z/data=!3m2!4b1!5s0x4cd2ab9a2037b4b3:0x1ab4365f03d628f!4m6!3m5!1s0x4cd2ab9be77eb54d:0xe009de5ec0fdede2!8m2!3d44.244155!4d-76.511167!16s%2Fg%2F11b6gnsx96?entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  className="hover:text-brand-maroon dark:hover:text-brand-yellow transition-colors duration-300"
                >
                  945 Princess St
                  <br />
                  Kingston, ON K7L 0E9
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-4">
              Quick Links
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {navigationLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block px-3 py-2 text-brand-graytext dark:text-dark-text-secondary hover:text-brand-maroon dark:hover:text-brand-yellow hover:bg-brand-maroon/5 dark:hover:bg-brand-yellow/10 rounded-lg transition-all duration-300 font-medium"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-maroon/10 dark:border-gray-700/50 text-center">
          <p className="text-brand-graytext dark:text-dark-text-muted">
            © 2025 Sparq Systems Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
