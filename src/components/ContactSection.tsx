'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, MapPin, Network } from 'lucide-react'
import { useTrackEvent, trackContactClick } from '@/hooks/useTrackEvent'

export interface ContactSectionProps {
  title: string
  companyName: string
  address?: string
  phone?: string
  email?: string
  website?: string
}

/** Client island: tracks tel/mailto/website clicks for GA4. */
export default function ContactSection({
  title,
  companyName,
  address,
  phone,
  email,
  website,
}: ContactSectionProps) {
  useTrackEvent()

  const handleClick = (type: string, detail: string) => {
    const linkUrl =
      type === 'phone' ? `tel:${detail}` : type === 'email' ? `mailto:${detail}` : detail
    trackContactClick({ method: type, link_url: linkUrl })
  }

  return (
    <div className="group">
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 py-0 h-full bg-white dark:bg-gray-700">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 min-w-[3rem] min-h-[3rem] bg-gradient-to-br from-brand-maroon to-brand-logo rounded-full text-white flex-shrink-0">
              <MapPin className="w-5 h-5" aria-hidden />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-brand-darkmaroon dark:text-brand-yellow leading-tight">
                {title}
              </h3>
              <p className="text-lg font-semibold text-brand-graytext dark:text-dark-text-secondary">
                {companyName}
              </p>
            </div>
          </div>

          <div className="space-y-4 flex-grow">
            {address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-brand-maroon flex-shrink-0" aria-hidden />
                <p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
                  {address.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-maroon flex-shrink-0" aria-hidden />
                <Link
                  onClick={() => handleClick('phone', phone)}
                  href={`tel:${phone}`}
                  className="text-brand-maroon dark:text-brand-logo hover:text-brand-darkmaroon dark:hover:text-brand-yellow font-medium transition-colors duration-200"
                >
                  {phone}
                </Link>
              </div>
            )}
            {email && (
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-maroon flex-shrink-0" aria-hidden />
                <Link
                  onClick={() => handleClick('email', email)}
                  href={`mailto:${email}`}
                  className="text-brand-maroon dark:text-brand-logo hover:text-brand-darkmaroon dark:hover:text-brand-yellow font-medium transition-colors duration-200"
                >
                  {email}
                </Link>
              </div>
            )}
            {website && (
              <div className="flex items-center gap-3">
                <Network className="w-4 h-4 text-brand-maroon flex-shrink-0" aria-hidden />
                <Link
                  onClick={() => handleClick('website', website)}
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-maroon dark:text-brand-logo hover:text-brand-darkmaroon dark:hover:text-brand-yellow font-medium transition-colors duration-200"
                >
                  {website}
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
