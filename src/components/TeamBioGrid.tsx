'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { useTrackEvent, trackSelectContent } from '@/hooks/useTrackEvent'

export type BioMember = {
  imgSrc: string
  name: string
  title: string
  blurb: string
  location?: string
}

type TeamBioGridProps = {
  members: BioMember[]
  /** Analytics item_list_name: leadership | board */
  listName: string
  columnsClassName?: string
}

/**
 * Client island: team/board cards + biography modal.
 * Page shell (hero copy) stays on the server.
 */
export default function TeamBioGrid({
  members,
  listName,
  columnsClassName = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto',
}: TeamBioGridProps) {
  const [selected, setSelected] = useState<BioMember | null>(null)
  useTrackEvent()

  const open = (member: BioMember) => {
    setSelected(member)
    trackSelectContent({
      content_type: 'bio_popup',
      content_id: member.name.toLowerCase().replace(/\s+/g, '_'),
      content_name: member.name,
      item_list_name: listName,
    })
  }

  return (
    <>
      <div className={columnsClassName}>
        {members.map((member) => (
          <button
            key={member.name}
            type="button"
            onClick={() => open(member)}
            className="cursor-pointer group text-left w-full"
            aria-label={`View biography for ${member.name}`}
          >
            <Card className="h-full backdrop-blur-md bg-white/90 dark:bg-gray-800/90 border-brand-maroon/10 dark:border-gray-600/30 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-2xl py-0">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={member.imgSrc}
                    alt=""
                    width={512}
                    height={512}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-brand-maroon/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden
                  />
                </div>
                <div className="px-6 pb-6 pt-4 text-center">
                  <span className="block text-xl font-bold text-brand-darkmaroon dark:text-dark-text-primary mb-2 group-hover:text-brand-maroon dark:group-hover:text-brand-yellow transition-colors duration-300">
                    {member.name}
                  </span>
                  <p className="text-brand-graytext dark:text-dark-text-secondary font-medium">
                    {member.title}
                  </p>
                  {member.location && (
                    <p className="text-sm text-brand-graytext dark:text-dark-text-muted mt-1">
                      {member.location}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black/80 z-[60]"
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <div
            className="absolute w-full flex items-center justify-center px-4"
            style={{
              top: '153px',
              height: 'calc(100dvh - 153px)',
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="bio-dialog-title"
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-full overflow-y-auto border border-brand-maroon/20 dark:border-gray-600/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-4 md:p-8">
                <button
                  type="button"
                  className="absolute top-4 right-4 min-h-[44px] min-w-[44px] bg-brand-maroon/10 hover:bg-brand-maroon text-brand-maroon hover:text-white rounded-full inline-flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                  onClick={() => setSelected(null)}
                  aria-label="Close biography"
                >
                  <span aria-hidden>✕</span>
                </button>

                <div className="border-b border-brand-maroon/20 dark:border-gray-600/50 pb-4 md:pb-6 mb-4 md:mb-6">
                  <h2
                    id="bio-dialog-title"
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-darkmaroon dark:text-dark-text-primary mb-2"
                  >
                    {selected.name}
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl text-brand-logo dark:text-brand-yellow font-medium">
                    {selected.title}
                  </p>
                </div>

                <div className="prose prose-sm md:prose-lg max-w-none">
                  <p className="text-brand-graytext dark:text-dark-text-secondary leading-relaxed text-sm md:text-base lg:text-lg">
                    {selected.blurb}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
