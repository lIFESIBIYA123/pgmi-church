'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";


interface BackgroundSlideshowProps {
  images?: string[];
  interval?: number; // in milliseconds
  className?: string;
  pageKey?: string; // to ensure different backgrounds for different pages
}

// Background images for different pages
const backgroundImages = [
  "/images/background.jpg",
  "/images/background2.jpg",
  "/images/background3.jpg",
  "/images/background4.jpg",
  "/images/background5.jpg",
  "/images/background6.jpg",
];

export function BackgroundSlideshow({
  images = backgroundImages,
  interval = 180000, // 3 minutes default
  className = "",
  pageKey
}: BackgroundSlideshowProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  // Generate a unique starting index based on the page path
  useEffect(() => {
    if (pageKey || pathname) {
      const key = pageKey || pathname;
      const hash = key.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      const startIndex = Math.abs(hash) % images.length;
      setCurrentImageIndex(startIndex);
    }
  }, [pageKey, pathname, images.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);

      // Wait for fade out, then change image
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 1000); // 1 second fade transition
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {images.map((image, index) => (
        <div
          key={`${pageKey || pathname}-${image}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex && !isTransitioning
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt="Church background"
            fill
            className="object-cover"
            priority={index === currentImageIndex}
            quality={90}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}
    </div>
  );
}
