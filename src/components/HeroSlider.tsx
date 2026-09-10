"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SearchForm } from "@/components/SearchForm";

const slides = [
  {
    src: "/hero/workshop.jpg",
    alt: "Диагностический бокс с современной машиной на подъёмнике",
    caption: "Диагностика",
  },
  {
    src: "/hero/sedan.jpg",
    alt: "Седан на мокром асфальте на закате",
    caption: "Дорога",
  },
  {
    src: "/hero/engine.jpg",
    alt: "Моторный отсек крупным планом",
    caption: "Узлы",
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (next: number) => {
    setIndex((next + slides.length) % slides.length);
  };

  return (
    <section
      className="hero-plane relative isolate -mt-[4.25rem] min-h-[min(92vh,880px)] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`hero-slide absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${i === index ? "hero-ken" : ""}`}
          />
        </div>
      ))}

      <div className="hero-veil absolute inset-0" />

      <div className="relative z-10 mx-auto flex min-h-[min(92vh,880px)] max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:pb-16 sm:pt-32">
        <div className="hero-enter max-w-2xl">
          <p className="font-display text-5xl font-semibold tracking-tight text-white sm:text-7xl md:text-8xl">
            Узел
          </p>
          <h1 className="mt-4 max-w-xl text-2xl font-medium leading-snug tracking-tight text-white/95 sm:text-3xl">
            Марка → узел → симптом → решение
          </h1>
          <p className="mt-3 max-w-md text-base leading-7 text-white/75 sm:text-lg">
            Спокойный каталог поломок: что проверить и как чинить — без шума форумов.
          </p>
          <div className="mt-8 max-w-lg">
            <SearchForm size="lg" tone="hero" />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/25 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
              aria-label="Предыдущий слайд"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/25 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
              aria-label="Следующий слайд"
            >
              →
            </button>
          </div>

          <div className="flex gap-2" role="tablist" aria-label="Слайды">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-10 bg-signal" : "w-5 bg-white/35 hover:bg-white/55"
                }`}
                aria-label={slide.caption}
              />
            ))}
          </div>

          <p className="text-sm tracking-wide text-white/60">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} ·{" "}
            {slides[index].caption}
          </p>
        </div>
      </div>
    </section>
  );
}
