"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import corporateData from "@/data/corporate-registry.json";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const t = useTranslations("about");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Content reveal
    if (contentRef.current) {
      const elements = contentRef.current.children;
      gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            once: true,
          },
        }
      );
    }

    // Timeline animation
    if (timelineRef.current) {
      const line = timelineRef.current.querySelector(".timeline-line");
      const items = timelineRef.current.querySelectorAll(".timeline-item");

      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      gsap.fromTo(
        items,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }

    // Stats counter
    if (statsRef.current) {
      const statItems = statsRef.current.children;
      gsap.fromTo(
        statItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }, []);

  const { corporation } = corporateData;

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 bg-obsidian">
      <div className="container-dhp">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          {/* Left: Heritage Narrative */}
          <div ref={contentRef}>
            <div>
              <span className="label-text text-imperial">{t("label")}</span>
              <div className="mt-3 h-px w-8 bg-imperial opacity-60" />
            </div>
            <h2 className="heading-display heading-lg mt-6 text-pearl">
              {t("title")}
            </h2>
            <h3 className="heading-display heading-sm mt-8 text-pearl">
              {t("heritageTitle")}
            </h3>
            <p className="body-lg mt-4 text-neutral-400 leading-relaxed">
              {t("heritageBody")}
            </p>

            {/* Name Change Heritage */}
            <div className="mt-12 border-l-2 border-imperial pl-6">
              <span className="label-text text-neutral-600">
                Legacy Narrative
              </span>
              <p className="body-sm mt-2 text-neutral-400 italic">
                {corporation.nameChangeNarrative[locale as keyof typeof corporation.nameChangeNarrative]}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="body-sm text-neutral-600 line-through">
                  {corporation.formerName[locale as keyof typeof corporation.formerName]}
                </span>
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="text-imperial">
                  <path d="M19.354 4.354a.5.5 0 000-.708L16.172.464a.5.5 0 10-.707.708L18.293 4l-2.828 2.828a.5.5 0 10.707.708l3.182-3.182zM0 4.5h19v-1H0v1z" fill="currentColor" />
                </svg>
                <span className="body-sm text-pearl font-medium">
                  {corporation.currentName[locale as keyof typeof corporation.currentName]}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Timeline + Stats */}
          <div>
            {/* Timeline */}
            <div ref={timelineRef} className="relative pl-8 mb-16">
              <div className="timeline-line absolute left-0 top-0 h-full w-px bg-imperial" />

              <div className="timeline-item mb-10 opacity-0">
                <div className="absolute left-0 -translate-x-1/2 h-2 w-2 rounded-full bg-imperial" />
                <span className="label-text text-neutral-600">2012.09</span>
                <p className="body-sm mt-1 text-neutral-300">
                  {corporation.formerName[locale as keyof typeof corporation.formerName]}
                </p>
              </div>

              <div className="timeline-item mb-10 opacity-0">
                <div className="absolute left-0 -translate-x-1/2 h-2 w-2 rounded-full bg-imperial" />
                <span className="label-text text-neutral-600">2025.12</span>
                <p className="body-sm mt-1 text-neutral-300">
                  {corporation.currentName[locale as keyof typeof corporation.currentName]}
                </p>
              </div>

              <div className="timeline-item opacity-0">
                <div className="absolute left-0 -translate-x-1/2 h-2 w-2 rounded-full bg-imperial" />
                <span className="label-text text-neutral-600">Present</span>
                <p className="body-sm mt-1 text-imperial">
                  A New Horizon in Hospitality
                </p>
              </div>
            </div>

            {/* Corporate Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-px border border-neutral-800/50">
              <div className="p-6 border-b border-r border-neutral-800/50">
                <span className="label-text text-neutral-600">{t("established")}</span>
                <p className="heading-sm text-pearl mt-2">{t("establishedValue")}</p>
              </div>
              <div className="p-6 border-b border-neutral-800/50">
                <span className="label-text text-neutral-600">{t("headquarters")}</span>
                <p className="heading-sm text-pearl mt-2">{t("headquartersValue")}</p>
              </div>
              <div className="p-6 border-r border-neutral-800/50">
                <span className="label-text text-neutral-600">{t("ceo")}</span>
                <p className="heading-sm text-pearl mt-2">
                  {corporation.leadership[0].name[locale as keyof typeof corporation.leadership[0]["name"]]}
                </p>
              </div>
              <div className="p-6">
                <span className="label-text text-neutral-600">{t("director")}</span>
                <p className="heading-sm text-pearl mt-2">
                  {corporation.leadership[1].name[locale as keyof typeof corporation.leadership[1]["name"]]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
