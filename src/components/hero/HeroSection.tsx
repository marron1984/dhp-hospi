"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidShader from "./LiquidShader";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [shaderComplete, setShaderComplete] = useState(false);

  const handleShaderComplete = useCallback(() => {
    setShaderComplete(true);
  }, []);

  useEffect(() => {
    if (!shaderComplete) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Stagger reveal of text elements
    tl.fromTo(
      subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.3"
      );

    // Parallax on scroll
    if (sectionRef.current) {
      gsap.to(titleRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, [shaderComplete]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* WebGL Liquid Shader Entrance */}
      {!shaderComplete && <LiquidShader onComplete={handleShaderComplete} />}

      {/* Background Layers for Parallax */}
      <div className="absolute inset-0 z-0">
        {/* Layer 1: Deep background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(176,31,36,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Layer 2: Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.8) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="container-dhp relative z-10 flex flex-col items-center text-center">
        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-6 opacity-0">
          <span className="label-text text-imperial">
            {t("subtitle")}
          </span>
          <div className="mx-auto mt-3 h-px w-12 bg-imperial opacity-60" />
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="heading-display heading-xl max-w-4xl whitespace-pre-line text-pearl opacity-0"
        >
          {t("title")}
        </h1>

        {/* CTA */}
        <div ref={ctaRef} className="mt-12 opacity-0">
          <a
            href="#services"
            data-cursor
            data-cursor-text="Explore"
            className="group inline-flex items-center gap-4 border border-neutral-700 px-8 py-4 transition-all duration-500 hover:border-imperial hover:bg-imperial/5"
          >
            <span className="label-text text-pearl">
              {t("cta")}
            </span>
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

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
        >
          <span className="label-text text-neutral-500">
            {t("scroll")}
          </span>
          <div className="h-12 w-px overflow-hidden bg-neutral-800">
            <div
              className="h-full w-full bg-imperial"
              style={{
                animation: "scrollLine 2s ease-in-out infinite",
              }}
            />
          </div>
          <style jsx>{`
            @keyframes scrollLine {
              0% {
                transform: translateY(-100%);
              }
              50% {
                transform: translateY(0);
              }
              100% {
                transform: translateY(100%);
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
