"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name, imageFit = "cover" }: { images: string[]; name: string; imageFit?: "cover" | "contain" }) {
  const [selected, setSelected] = useState(images[0]);
  const containImage = imageFit === "contain";
  return (
    <div className="grid gap-4 sm:grid-cols-[90px_1fr]">
      <div className="flex gap-3 sm:flex-col">
        {images.map((image, index) => (
          <button key={image} type="button" onClick={() => setSelected(image)} aria-label={`View ${name} image ${index + 1}`} className={`overflow-hidden rounded-sm border-2 ${selected === image ? "border-gold" : "border-transparent"}`}>
            <Image src={image} alt="" width={100} height={100} className={cn("h-20 w-20", containImage ? "object-contain p-1" : "object-cover")} />
          </button>
        ))}
      </div>
      <div className="group overflow-hidden rounded-sm bg-white">
        <Image
          src={selected}
          alt={name}
          width={850}
          height={850}
          className={cn(
            "aspect-square w-full transition duration-500",
            containImage ? "object-contain p-5" : "object-cover group-hover:scale-110",
          )}
        />
      </div>
    </div>
  );
}
