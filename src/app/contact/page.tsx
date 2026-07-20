import Link from 'next/link'
import SolarBackgroundElements from '@/components/SolarBackgroundElements'
import ContactSection from '@/components/ContactSection'

/** Server page — contact cards are client islands for GA4 click tracking. */
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      <SolarBackgroundElements />

      <section className="relative container mx-auto px-6 pt-10 sm:pb-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
              Contact
            </span>
            <br />
            <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
              Sparq Systems
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-brand-graytext dark:text-dark-text-secondary max-w-4xl mx-auto leading-relaxed mb-12">
            Connect with our global network of offices and distribution partners to discover how Sparq
            microinverter technology can power your solar projects.
          </p>
        </div>
      </section>

      <section className="relative bg-white dark:bg-gray-900 py-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
              Our Offices
            </h2>
            <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
              Reach out to our global offices for sales inquiries, technical support, and partnership
              opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <ContactSection
              title="Head Office - Canada"
              companyName="Sparq Systems Inc."
              address={`945 Princess Street\nKingston, Ontario, Canada\nK7L 0E9`}
              email="sales@sparqsys.com"
              website="https://www.sparqsys.com/"
            />
            <ContactSection
              title="Office - India"
              companyName="Sparq Systems India Pvt. Ltd."
              email="sgupta@sparqsys.com"
              phone="(+91) 9810 899 033"
            />
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
              How to Order
            </h2>
            <p className="text-xl text-brand-graytext dark:text-dark-text-secondary max-w-3xl mx-auto">
              Contact our authorized distribution partners worldwide for product orders and local
              support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <ContactSection
              title="India Distribution & Service"
              companyName="Jio Things Ltd."
              website="https://www.jiothings.com/"
              email="sales@jiothings.com"
            />
            <ContactSection
              title="Africa, Australia, Gulf, Southeast Asia Distribution & Service"
              companyName="Rolaz Green Energy PVT. Ltd."
              address={`Kalypso Tower 4, Unit 1202\nJaypee Greens Wish Town, Sector 128\nNoida, Uttar Pradesh, India 201304`}
              phone="(+91) 8595 414 392"
              email="info@rolazge.com"
              website="http://www.rolazge.com/"
            />
            <ContactSection
              title="North America Distributer"
              companyName="GPSI Solar"
              address={`131 Sheldon Drive, Unit 22\nCambridge, Ontario, Canada\nN1R 6S2`}
              phone="519-645-9649"
              email="sales@gpsi.solar"
              website="https://www.gpsi.ca/Solar-EV.htm"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20 sm:py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-brand-graytext dark:text-dark-text-secondary mb-12 max-w-2xl mx-auto">
            Discover our breakthrough microinverter technology and explore our complete product
            portfolio.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
            <Link
              href="/technology"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-maroon to-brand-darkmaroon text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-h-[44px] inline-flex items-center justify-center text-center"
            >
              Explore Technology
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-yellow to-brand-logo text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-h-[44px] inline-flex items-center justify-center text-center"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
