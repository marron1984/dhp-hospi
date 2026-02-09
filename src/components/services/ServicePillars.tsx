"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import corporateData from "@/data/corporate-registry.json";

gsap.registerPlugin(ScrollTrigger);

const icons: Record<string, React.ReactNode> = {
  building: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="6" y="10" width="28" height="24" rx="1" />
      <line x1="6" y1="18" x2="34" y2="18" />
      <line x1="14" y1="10" x2="14" y2="34" />
      <line x1="26" y1="10" x2="26" y2="34" />
      <line x1="14" y1="26" x2="26" y2="26" />
      <line x1="20" y1="6" x2="20" y2="10" />
      <circle cx="20" cy="5" r="1.5" fill="currentColor" />
    </svg>
  ),
  sparkles: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M20 4L23 16L36 20L23 24L20 36L17 24L4 20L17 16Z" />
      <circle cx="32" cy="8" r="2" />
      <circle cx="8" cy="32" r="1.5" />
    </svg>
  ),
  shield: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M20 4L34 10V22C34 30 20 36 20 36C20 36 6 30 6 22V10L20 4Z" />
      <path d="M14 20L18 24L26 16" strokeWidth="1.5" />
    </svg>
  ),
};

export default function ServicePillars() {
  const t = useTranslations("services");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Label + Title reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    });

    tl.fromTo(
      labelRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

    // Card mask-reveal animation
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      Array.from(cards).forEach((card, i) => {
        const line = card.querySelector(".mask-reveal-line");
        const content = card.querySelector(".card-content");

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            once: true,
          },
          delay: i * 0.15,
        });

        // Red horizontal stroke sweeps across
        if (line) {
          cardTl.fromTo(
            line,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.6, ease: "power2.inOut" }
          );
          cardTl.to(line, { scaleX: 0, transformOrigin: "right center", duration: 0.4, ease: "power2.in" });
        }

        // Content fades in
        if (content) {
          cardTl.fromTo(
            content,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.3"
          );
        }
      });
    }
  }, []);

  const pillars = corporateData.corporation.businessPillars;

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 md:py-40"
    >
      <div className="container-dhp">
        {/* Section Header */}
        <div className="mb-20 max-w-2xl">
          <div ref={labelRef} className="mb-4 opacity-0">
            <span className="label-text text-accent">{t("label")}</span>
            <div className="mt-3 h-px w-8 bg-accent opacity-60" />
          </div>
          <h2
            ref={titleRef}
            className="heading-display heading-lg whitespace-pre-line text-cream opacity-0"
          >
            {t("title")}
          </h2>
          <p ref={descRef} className="body-lg mt-6 text-neutral-400 opacity-0">
            {t("description")}
          </p>
        </div>

        {/* Service Cards */}
        <div ref={cardsRef} className="grid gap-px md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="group relative overflow-hidden border border-neutral-800/50 p-8 md:p-10 transition-all duration-700 hover:border-accent/30 hover:bg-walnut-mid/30"
              data-cursor
              data-cursor-text={t("learnMore")}
            >
              {/* Mask Reveal Line */}
              <div className="mask-reveal-line absolute left-0 top-0 h-[2px] w-full bg-accent" />

              <div className="card-content opacity-0">
                {/* Icon */}
                <div className="mb-8 text-accent transition-transform duration-500 group-hover:scale-110">
                  {icons[pillar.icon]}
                </div>

                {/* Number */}
                <span className="label-text text-neutral-700 mb-4 block">
                  0{pillars.indexOf(pillar) + 1}
                </span>

                {/* Title */}
                <h3 className="heading-display heading-sm text-cream mb-4">
                  {pillar.title[locale as keyof typeof pillar.title]}
                </h3>

                {/* Description */}
                <p className="body-sm text-neutral-400 leading-relaxed">
                  {pillar.description[locale as keyof typeof pillar.description]}
                </p>

                {/* Learn More */}
                <div className="mt-8 flex items-center gap-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="label-text text-accent">
                    {t("learnMore")}
                  </span>
                  <svg
                    width="16"
                    height="6"
                    viewBox="0 0 16 6"
                    fill="none"
                    className="text-accent"
                  >
                    <path
                      d="M15.354 3.354a.5.5 0 000-.708L12.172.464a.5.5 0 10-.707.708L14.293 4l-2.828 2.828a.5.5 0 10.707.708l3.182-3.182zM0 3.5h15v-1H0v1z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
