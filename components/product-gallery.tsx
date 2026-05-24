"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [selected, setSelected] = useState(images[0]);
  return (
    <div className="grid gap-4 sm:grid-cols-[90px_1fr]">
      <div className="flex gap-3 sm:flex-col">
        {images.map((image, index) => (
          <button key={image} type="button" onClick={() => setSelected(image)} aria-label={`View ${name} image ${index + 1}`} className={`overflow-hidden rounded-sm border-2 ${selected === image ? "border-gold" : "border-transparent"}`}>
            <Image src={image} alt="" width={100} height={100} className="h-20 w-20 object-cover" />
          </button>
        ))}
      </div>
      <div className="group overflow-hidden rounded-sm bg-white">
        <Image src={selected} alt={name} width={850} height={850} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-110" />
      </div>
    </div>
  );
}
