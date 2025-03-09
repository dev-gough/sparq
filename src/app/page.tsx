import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
        <div className="relative h-[50vh] overflow-hidden">
            <Image layout="fill" objectFit="cover" objectPosition="top" src="/hero.webp" alt="hero" />
        </div>
        {/* Q2000 header, image, and blurb */}
          <div className="container mx-auto py-16">
              {/* Boxed Header */}
              <div className="max-w-[600px] mx-auto text-center rounded-xl border-4 border-[#F5A623] p-4">
                  <p className="text-[#A52A2A] font-bold text-2xl">
                    Introducing the Q2000: The most powerful microinverter in the industry!
                  </p>
              </div>
              {/* Content: Image and Text Blurb */}
              <div className="mt-6 flex flex-col md:flex-row items-center gap-6">
                  {/* Image */}
                  <div className="w-full md:w-1/2">
                      <Image
                          src="/q2000.webp"
                          alt="SPARQ Quad 2000 Microinverter"
                          width={1920}
                          height={1084}
                          className="w-full h-auto"
                      />
                  </div>
                  {/* Text Blurb */}
                  <div className="w-full md:w-1/2 space-y-4">
                      <h2 className="text-2xl font-bold text-gray-800">THE Q2000</h2>
                      <p className="text-base text-gray-600">
                          SPARQ is pleased to introduce the Quad 2000, the industry's most powerful microinverter that produces electrical energy from 4 solar panels of 550W+ each, without any power clipping. Our advanced software allows the Q2000 to operate seamlessly in grid-tied, standalone and dual-mode solar panel applications.
                      </p>
                      <Link
                          href="/Q2000-2022-ver_9.2.pdf"
                          className="bg-[#8c344e] hover:bg-[#8c344e]/90 text-white text-xl rounded-xl px-4 py-2 font-bold"
                          rel="noopener noreferrer"
                          target="_blank"
                        >

                          Learn More
                      </Link>
                  </div>
              </div>
          </div>
    </div>
  );
}
