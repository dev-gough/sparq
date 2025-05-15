'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';

/**
 * Displays a responsive photo gallery for a specific site.
 *
 * Props:
 * - siteName: Title displayed above the gallery.
 * - photos: Array of objects containing `src` & optional `alt`.
 */
export type Photo = {
  src: string;
  alt?: string;
};

export interface SitePhotosGalleryProps {
  siteName: string;
  photos: Photo[];
}

const SitePhotosGallery: React.FC<SitePhotosGalleryProps> = ({ siteName, photos }) => {
  return (
    <section className="container mx-auto px-4 py-8">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center drop-shadow-sm">
        {siteName}
      </h1>

      {/* Responsive Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, idx) => (
          <motion.a
            key={idx}
            href={photo.src}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
          >
            <Image
              src={photo.src}
              alt={photo.alt ?? `Photo ${idx + 1} of ${siteName}`}
              width={400}
              height={300}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI1IiBoZWlnaHQ9Ijk0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIC8+"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              priority={idx === 0}
            />
            <span className="sr-only">Open photo in new tab</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default SitePhotosGallery;
