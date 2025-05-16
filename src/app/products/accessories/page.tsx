"use client"

import Image from "next/image";
import Link from "next/link";

// -----------------------------------------------------------------------------
// AC‑cable specification data (edit in one spot)
// -----------------------------------------------------------------------------

interface CableLengthVariant {
  length: number; // metres
  partNumber: string;
}

interface CableSpec {
  description: string;
  gauge: string;
  variants: CableLengthVariant[];
}

const cableSpecs: CableSpec[] = [
  {
    description: "T5 female → open",
    gauge: "2C/3C 14 AWG",
    variants: [
      { length: 2, partNumber: "65069‑17" },
      { length: 2.5, partNumber: "65069‑19" },
      { length: 4, partNumber: "65069‑18" },
    ],
  },
  {
    description: "T6 female → T5 female",
    gauge: "2C/3C 14 AWG",
    variants: [
      { length: 0.7, partNumber: "65015‑09" },
      { length: 3, partNumber: "65015‑10" },
    ],
  },
  {
    description: "T6 female → T6 male",
    gauge: "2C/3C 10 AWG",
    variants: [
      { length: 1, partNumber: "65011‑10" },
      { length: 2, partNumber: "65011‑11" },
    ],
  },
  {
    description: "T6 female → T6 tee male",
    gauge: "2C/3C 10 AWG",
    variants: [
      { length: 2, partNumber: "65013‑16" },
      { length: 4, partNumber: "65013‑17" },
    ],
  },
  {
    description: "T6 female → T6 cross male",
    gauge: "2C/3C 10 AWG",
    variants: [
      { length: 2, partNumber: "65014‑25" },
      { length: 4, partNumber: "65014‑26" },
    ],
  },
  {
    description: "T6 tee male → open",
    gauge: "2C/3C 10 AWG",
    variants: [
      { length: 2, partNumber: "65012‑14" },
      { length: 4, partNumber: "65012‑15" },
    ],
  },
  {
    description: "T6 cross male → open",
    gauge: "2C/3C 10 AWG",
    variants: [
      { length: 2, partNumber: "65014‑19" },
      { length: 4, partNumber: "65014‑20" },
    ],
  },
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function CableTable() {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow">
      <table className="min-w-full divide-y divide-gray-300 text-xl">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900">Gauge</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900">Length (m)</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900">Part #</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {cableSpecs.map((spec) =>
            spec.variants.map((v, idx) => (
              <tr key={`${spec.description}-${v.length}`} className="whitespace-nowrap">
                {idx === 0 && (
                  <>
                    <td
                      rowSpan={spec.variants.length}
                      className="px-4 py-3 align-top font-medium text-gray-900"
                    >
                      {spec.description}
                    </td>
                    <td
                      rowSpan={spec.variants.length}
                      className="px-4 py-3 align-top text-gray-700"
                    >
                      {spec.gauge}
                    </td>
                  </>
                )}
                <td className="px-4 py-3 text-gray-700">{v.length}</td>
                <td className="px-4 py-3 text-gray-700">{v.partNumber}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <p className="mt-2 px-4 pb-4 text-md italic text-gray-500">
        * Color coding for North America:&nbsp;
        <span className="font-semibold">Black</span> (Line 1),
        <span className="font-semibold"> Red</span> (Line 2),
        <span className="font-semibold"> White</span> (Neutral).
      </p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Page component
// -----------------------------------------------------------------------------

export default function AccessoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-0">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm text-brand-gray">
        <Link href="/products" className="px-2 hover:underline">
          Products
        </Link>
        <span className="px-1">›</span>
        <span className="px-2 text-brand-gray-600">Accessories</span>
      </nav>

      {/* page title */}
      <h1 className="mb-10 text-3xl font-bold text-gray-900">Accessories</h1>

      {/* ------------------------------ AC Cables ------------------------------ */}
      <section id="cables" className="scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">AC Cable Specifications</h2>
        <div className="mb-6 flex justify-center">
          <Image
            src="/Accessories/cables.png" // add this fourth image
            alt="AC cable family photo"
            width={800}
            height={400}
            className="h-auto w-full max-w-3xl object-contain rounded-lg border"
            priority
          />
        </div>
        <CableTable />
      </section>

      {/* -------------------------- Waterproof Cable Caps ---------------------- */}
      <section id="caps" className="mt-16 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">Waterproof Cable Caps</h2>
        <div className="flex justify-center">
          <Image
            src="/Accessories/caps.png"
            alt="T‑series waterproof cable caps"
            width={900}
            height={250}
            className="h-auto w-full max-w-4xl object-contain rounded-lg border"
          />
        </div>
      </section>

      {/* ------------------------------ Tools ---------------------------------- */}
      <section id="tools" className="mt-16 scroll-mt-20">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">DC/AC Unlock Tool</h2>
        <div className="flex justify-center">
          <Image
            src="/Accessories/unlocking.png"
            alt="AC unlocking tool"
            width={600}
            height={300}
            className="h-auto w-full max-w-xl object-contain rounded-lg border"
          />
        </div>
      </section>
    </div>
  );
}
