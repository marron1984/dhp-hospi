"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    id: 1,
    aspect: "portrait",
    label: "Entrance",
    bg: "linear-gradient(135deg, #3D2E22 0%, #2C1E16 100%)",
  },
  {
    id: 2,
    aspect: "landscape",
    label: "Guest Room",
    bg: "linear-gradient(135deg, #3A2A1E 0%, #291C12 100%)",
  },
  {
    id: 3,
    aspect: "square",
    label: "Garden",
    bg: "linear-gradient(135deg, #352818 0%, #241A10 100%)",
  },
  {
    id: 4,
    aspect: "landscape",
    label: "Dining",
    bg: "linear-gradient(135deg, #3E2D1F 0%, #2D1F13 100%)",
  },
  {
    id: 5,
    aspect: "portrait",
    label: "Onsen",
    bg: "linear-gradient(135deg, #382614 0%, #261B0F 100%)",
  },
];

export default function PortfolioGallery() {
  const t = useTranslations("portfolio");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!section || !scrollContainer) return;

    // Header reveal
    gsap.fromTo(
      headerRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      }
    );

    // Horizontal scroll
    const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

    gsap.to(scrollContainer, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Highlights reveal
    if (highlightsRef.current) {
      const items = highlightsRef.current.children;
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-walnut-mid/30">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-20 md:pt-32">
        <div ref={headerRef} className="container-dhp opacity-0">
          <span className="label-text text-accent">{t("label")}</span>
          <div className="mt-3 h-px w-8 bg-accent opacity-60" />
          <h2 className="heading-display heading-lg mt-4 text-cream">
            {t("title")}
          </h2>
          <p className="heading-display heading-sm mt-2 text-neutral-400">
            {t("tagline")}
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="h-screen">
        <div
          ref={scrollContainerRef}
          className="flex h-full items-end gap-6 px-8 pb-32 pt-48 md:gap-8 md:px-16"
          style={{ width: "max-content" }}
        >
          {/* Spacer for header area */}
          <div className="w-[40vw] shrink-0 md:w-[30vw]" />

          {galleryImages.map((img) => (
            <div
              key={img.id}
              className={`relative shrink-0 overflow-hidden ${
                img.aspect === "portrait"
                  ? "h-[65vh] w-[35vw] md:w-[25vw]"
                  : img.aspect === "landscape"
                    ? "h-[45vh] w-[50vw] md:w-[35vw]"
                    : "h-[50vh] w-[40vw] md:w-[28vw]"
              }`}
              data-cursor
              data-cursor-text="View"
            >
              {/* Placeholder gradient (replace with actual images) */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ background: img.bg }}
              />

              {/* Image overlay info */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-6">
                <span className="label-text text-neutral-400">
                  {String(img.id).padStart(2, "0")}
                </span>
                <span className="heading-display heading-sm text-cream mt-1">
                  {img.label}
                </span>
              </div>
            </div>
          ))}

          {/* Description Card at end */}
          <div className="flex h-[65vh] w-[40vw] shrink-0 flex-col justify-center px-8 md:w-[30vw]">
            <p className="body-lg text-neutral-300 leading-relaxed">
              {t("description")}
            </p>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-3 group"
              data-cursor
              data-cursor-text="Explore"
            >
              <span className="label-text text-accent">
                {t("viewDetails")}
              </span>
              <svg
                width="20"
                height="6"
                viewBox="0 0 20 6"
                fill="none"
                className="text-accent transition-transform duration-500 group-hover:translate-x-2"
              >
                <path
                  d="M19.354 3.354a.5.5 0 000-.708L16.172.464a.5.5 0 10-.707.708L18.293 4l-2.828 2.828a.5.5 0 10.707.708l3.182-3.182zM0 3.5h19v-1H0v1z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Property Highlights */}
      <div className="py-24 md:py-32">
        <div className="container-dhp">
          <div
            ref={highlightsRef}
            className="grid gap-px border border-neutral-800/50 md:grid-cols-3"
          >
            <div className="flex flex-col gap-3 border-b border-neutral-800/50 p-8 md:border-b-0 md:border-r">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-accent"
              >
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" />
              </svg>
              <h4 className="heading-sm text-cream">{t("heritage")}</h4>
            </div>
            <div className="flex flex-col gap-3 border-b border-neutral-800/50 p-8 md:border-b-0 md:border-r">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-accent"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9H21M9 3V21" />
              </svg>
              <h4 className="heading-sm text-cream">{t("architecture")}</h4>
            </div>
            <div className="flex flex-col gap-3 p-8">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-accent"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6V12L16 14" />
              </svg>
              <h4 className="heading-sm text-cream">{t("experience")}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
