"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillarImages: Record<string, string> = {
  "hotel-development": "/images/photo-03.jpg",
  "brand-attraction": "/images/photo-01.jpg",
  "fc-management": "/images/photo-07.jpg",
};

interface ServiceDetailClientProps {
  locale: string;
  pillarId: string;
  contentKey: string;
  pillarTitle: string;
  pillarDescription: string;
}

export default function ServiceDetailClient({
  locale,
  pillarId,
  contentKey,
  pillarTitle,
  pillarDescription,
}: ServiceDetailClientProps) {
  const t = useTranslations("serviceDetail");
  const tc = useTranslations(`serviceDetail.${contentKey}`);
  const heroRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const strengthsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      const els = heroRef.current.querySelectorAll(".reveal-item");
      gsap.fromTo(
        els,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }

    // Approach cards animation
    if (approachRef.current) {
      const cards = approachRef.current.querySelectorAll(".approach-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    }

    // Strengths animation
    if (strengthsRef.current) {
      const items = strengthsRef.current.querySelectorAll(".strength-item");
      gsap.fromTo(
        items,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: strengthsRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={pillarImages[pillarId] || "/images/photo-03.jpg"}
            alt={pillarTitle}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(61,46,34,0.95) 0%, rgba(61,46,34,0.6) 50%, rgba(61,46,34,0.4) 100%)",
            }}
          />
        </div>

        <div ref={heroRef} className="container-dhp relative z-10 pb-20 md:pb-32">
          <a
            href={`/${locale}/services`}
            className="reveal-item inline-flex items-center gap-2 text-neutral-400 transition-colors hover:text-cream opacity-0"
          >
            <svg
              width="16"
              height="8"
              viewBox="0 0 16 8"
              fill="none"
              className="rotate-180"
            >
              <path
                d="M15.354 4.354a.5.5 0 000-.708L12.172.464a.5.5 0 10-.707.708L14.293 4l-2.828 2.828a.5.5 0 10.707.708l3.182-3.182zM0 4.5h15v-1H0v1z"
                fill="currentColor"
              />
            </svg>
            <span className="label-text">{t("backToServices")}</span>
          </a>

          <h1 className="reveal-item heading-display heading-lg mt-8 max-w-3xl whitespace-pre-line text-cream opacity-0">
            {tc("headline")}
          </h1>

          <p className="reveal-item body-lg mt-6 max-w-2xl text-neutral-300 opacity-0">
            {tc("lead")}
          </p>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-32 md:py-40">
        <div className="container-dhp">
          <span className="label-text text-accent">{t("approach")}</span>
          <div className="mt-3 h-px w-8 bg-accent opacity-60" />

          <div ref={approachRef} className="mt-16 grid gap-px md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="approach-card border border-neutral-800/50 p-8 md:p-10 opacity-0"
              >
                <span className="label-text text-neutral-700 block mb-4">
                  0{n}
                </span>
                <h3 className="heading-display heading-sm text-cream mb-4">
                  {tc(`approach${n}Title`)}
                </h3>
                <p className="body-sm text-neutral-400 leading-relaxed">
                  {tc(`approach${n}Body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section className="py-24 md:py-32 bg-walnut-mid/20">
        <div className="container-dhp">
          <span className="label-text text-accent">{t("strengths")}</span>
          <div className="mt-3 h-px w-8 bg-accent opacity-60" />

          <div ref={strengthsRef} className="mt-12 space-y-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="strength-item flex items-start gap-6 border-l-2 border-accent/30 pl-6 opacity-0"
              >
                <span className="label-text text-accent mt-1 shrink-0">
                  0{n}
                </span>
                <p className="body-lg text-cream">
                  {tc(`strength${n}`)}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20">
            <a
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-4 border border-accent bg-accent/10 px-8 py-4 transition-all duration-500 hover:bg-accent/20"
            >
              <span className="label-text text-cream">{t("cta")}</span>
              <svg
                width="24"
                height="8"
                viewBox="0 0 24 8"
                fill="none"
                className="transition-transform duration-500 group-hover:translate-x-2"
              >
                <path
                  d="M23.354 4.354a.5.5 0 000-.708L20.172.464a.5.5 0 10-.707.708L22.293 4l-2.828 2.828a.5.5 0 10.707.708l3.182-3.182zM0 4.5h23v-1H0v1z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
