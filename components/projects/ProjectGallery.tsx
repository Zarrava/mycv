"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/utils";

export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const cover = images[0];
  const lightboxImage = images[index] ?? cover;

  function open(nextIndex: number) {
    setIndex(nextIndex);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  if (!cover) return null;

  return (
    <div>
      <div className="grid gap-3">
        <button
          type="button"
          className="surface relative aspect-video w-full overflow-hidden text-left"
          onClick={() => open(0)}
        >
          <Image
            src={cover}
            alt={`${title} cover`}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 960px"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
          <span className="sr-only">Open larger view</span>
        </button>
        {images.length > 1 ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {images.map((image, imageIndex) => (
              <li key={image}>
                <button
                  type="button"
                  className="surface relative aspect-video w-full overflow-hidden"
                  onClick={() => open(imageIndex)}
                  aria-label={`Open image ${imageIndex + 1} of ${images.length}`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <dialog
        ref={dialogRef}
        className="w-[min(100%-2rem,960px)] max-w-none rounded-3xl border border-border bg-background p-3 text-foreground backdrop:bg-background/80"
        aria-label={`${title} image`}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        <div className="relative aspect-video w-full">
          {lightboxImage ? (
            <Image
              src={lightboxImage}
              alt={`${title} enlarged`}
              fill
              sizes="90vw"
              className="rounded-2xl object-contain"
            />
          ) : null}
        </div>
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground"
            onClick={close}
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}
