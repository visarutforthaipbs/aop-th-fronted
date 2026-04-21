"use client";

import Image from "next/image";

const FALLBACK_IMAGE = "/images/mobile-version-hero.jpg";

export default function ImageWithFallback({
  src,
  alt = "",
  className = "",
  fill,
  priority,
  sizes,
  ...props
}) {
  const imgSrc = src || FALLBACK_IMAGE;

  return (
    <div className={`relative bg-gray-100 ${className}`}>
      <Image
        src={imgSrc}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className="object-cover"
        onError={(e) => {
          if (e.target.src !== FALLBACK_IMAGE) {
            e.target.src = FALLBACK_IMAGE;
          }
        }}
        {...props}
      />
    </div>
  );
}
