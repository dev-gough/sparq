import LegalAccordion from '@/components/LegalAccordion'
import TermsOfServiceContent from '@/content/legal/TermsOfServiceContent'
import PrivacyPolicyContent from '@/content/legal/PrivacyPolicyContent'

/**
 * Legal page: static shell + server-rendered legal copy.
 * Only accordion chrome is client (expand/collapse + analytics).
 */
export default function LegalPage() {
  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 py-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
              Legal Documents
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
            Important legal information for our products and services
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          <LegalAccordion title="Terms of Service" trackId="tos">
            <TermsOfServiceContent />
          </LegalAccordion>
          <LegalAccordion title="Privacy Policy" trackId="privacy_policy">
            <PrivacyPolicyContent />
          </LegalAccordion>
        </div>
      </div>
    </div>
  )
}
