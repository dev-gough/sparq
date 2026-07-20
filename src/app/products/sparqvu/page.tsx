import ProductPage from '@/components/ProductPage'
import Image from 'next/image'
import { ListEntry } from '@/components/ProductPage'
import DocsAccordion from '@/components/DocsAccordion'

function image() {
  return (
    <Image
      src="/sparqvu.webp"
      alt="SparqVu Monitoring Tool"
      width={800}
      height={451}
      sizes="(max-width: 1024px) 90vw, 480px"
      className="object-contain sticky top-[100px] z-10 rounded-xl w-full h-auto"
      priority
    />
  )
}

function body() {
  return (
    <p className="text-brand-gray dark:text-dark-text-secondary mt-4">
      Manage multi-site monitoring with SparqVu, a performance management system with intuitive
      displays to help you quickly spot issues and troubleshoot in real time.
    </p>
  )
}

const listContent: ListEntry[] = [
  {
    heading: 'Data when you need it',
    items: [
      'Advanced performance and communication tools with no app required',
      'Real-time metrics, historical records and panel-by-panel information',
      'Cloud-based monitoring',
    ],
  },
  {
    heading: 'Quick Installation',
    items: [
      'Automatically detects connected inverters before AC is connected',
      'Installation layout syncs automatically to your cloud account',
    ],
  },
]

const accordionSections = [
  {
    title: 'Documentation',
    accentColor: 'bg-gradient-to-br from-brand-gray/60 to-brand-graytext/80',
    content: (
      <div className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-neutral-50 dark:from-gray-800 dark:to-gray-800">
        <h3 className="font-bold text-brand-logo dark:text-brand-logo mb-4">Manual</h3>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-logo flex-shrink-0" />
          <a
            href="/SparqVu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-maroon hover:text-brand-darkmaroon font-medium hover:underline transition-colors"
          >
            SparqVu Manual (PDF)
          </a>
        </div>
      </div>
    ),
  },
]

/** Server page — ProductPage + DocsAccordion are client islands. */
export default function SparqVuPage() {
  return (
    <ProductPage
      heading="SparqVu - Your Energy Management System"
      animated={true}
      parent="SparqVu"
      href="sparqvu"
      animatedList={listContent}
      bodyContent={body()}
      accordianContent={<DocsAccordion parent="sparqvu" sections={accordionSections} />}
      imageContent={image()}
    />
  )
}
