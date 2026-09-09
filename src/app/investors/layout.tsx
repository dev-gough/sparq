import Subheader from '@/components/Subheader'

const items = [
  { label: 'Investor Homepage', href: '/investors' },
  {
    label: 'Stock',
    href: 'https://money.tmx.com/en/quote/SPRQ',
    target: '_blank',
  },
  { label: 'Reports & Filings', href: '/investors/reports' },
  { label: 'Governance', href: '/investors/governance' },
  { label: 'IR Contact', href: '/investors#contact' },
]

/** Server layout — Subheader is a client island. */
export default function InvestorsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-full">
      <Subheader items={items} />
      {children}
    </div>
  )
}
