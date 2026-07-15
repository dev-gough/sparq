import { Target, Lightbulb, Award } from 'lucide-react'
import SolarBackgroundElements from '@/components/SolarBackgroundElements'
import Reveal from '@/components/Reveal'

/**
 * About page shell is static-friendly: no Motion entrance animations.
 * Hero is fully painted for LCP; lower sections use CSS Reveal.
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative scroll-mt-[115px]">
      <SolarBackgroundElements />
      <div className="relative container mx-auto px-6 py-8 sm:py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-brand-maroon via-brand-logo to-brand-darkmaroon bg-clip-text text-transparent">
              About Sparq Systems
            </span>
          </h1>
        </div>

        <Reveal className="mb-16">
          <div className="space-y-8 text-brand-graytext dark:text-dark-text-secondary leading-relaxed text-lg sm:text-xl lg:text-2xl">
            <p>
              Founded in 2009, Sparq Systems emerged from a critical observation: traditional solar
              inverter technology was fundamentally flawed. With issues ranging from non-optimal energy
              production to low reliability, the industry needed a complete rethink.
            </p>

            <p>
              The vision was clear - create a technological solution that would allow the extraction of
              all the available energy from every PV solar panel, convert it into high-quality AC
              electricity at the highest possible efficiency, and meet or exceed the life of a solar
              panel. This led to years of passionate research in coming up with the most flexible
              inverter architecture that is driven by mathematical algorithms.
            </p>

            <p>
              Breaking hardware constraints through implementation of differential geometry digital
              control has resulted in a compact, light-weight, low-cost, highly-efficient, and
              highly-reliable inverter design. Our patented &apos;Quad&apos; inverter offers higher
              performance at significantly lower cost than either the microinverter or the
              optimizer-string inverter based Module Level Power Electronics (MLPE) solutions currently
              available in the market. The Quad brings down the cost of a MLPE solution at par with the
              cost of a conventional string inverter solution, which is an industry first.
            </p>

            <p>
              Today, we&apos;re a publicly traded company (TSXV: SPRQ) with global manufacturing
              capabilities and strategic partnerships, including our collaboration with Jio Reliance,
              India&apos;s largest IoT company. From our initial Quad2 single-phase microinverter to our
              latest three-phase Quad3 technology, we continue to push the boundaries of what&apos;s
              possible in solar energy conversion.
            </p>

            <p>
              Our culture is built on six core principles: <strong>Integrity</strong>,{' '}
              <strong>Collaboration</strong>, <strong>Innovation</strong>, <strong>Quality</strong>,{' '}
              <strong>Social Responsibility</strong>, and <strong>Teamwork</strong>. These aren&apos;t
              just values on paper - they guide every decision we make, every product we design, and
              every relationship we build.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Our Mission',
              body: 'Accelerate the transition to energy self-sufficiency by serving residential, commercial and industrial customers world-wide.',
              Icon: Target,
            },
            {
              title: 'Our Vision',
              body: 'Become the #1 Leader for Microinverters, Battery Storage, and Energy Management.',
              Icon: Lightbulb,
            },
            {
              title: 'Our Promise',
              body: 'Deliver safe, reliable, and cost-effective solutions that are best-in-class, easy to install, and maintenance-free.',
              Icon: Award,
            },
          ].map(({ title, body, Icon }) => (
            <Reveal
              key={title}
              className="text-center p-6 sm:p-8 bg-white/50 dark:bg-gray-800/30 rounded-xl border-3 border-brand-maroon/10 dark:border-brand-logo/10"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-maroon to-brand-darkmaroon rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                <Icon size={24} className="sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-darkmaroon dark:text-brand-yellow mb-3 sm:mb-4">
                {title}
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-brand-graytext dark:text-dark-text-secondary leading-relaxed">
                {body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
