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

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Aggressive stagger — big movements, fast timing, scale punch
    tl.fromTo(
      subtitleRef.current,
      { y: 80, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7 }
    )
      .fromTo(
        titleRef.current,
        { y: 120, opacity: 0, scale: 0.92, rotateX: 8 },
        { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 1, ease: "expo.out" },
        "-=0.3"
      )
      .fromTo(
        ctaRef.current,
        { y: 60, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
        "-=0.4"
      )
      .fromTo(
        scrollIndicatorRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.2"
      );

    // Parallax on scroll — faster response
    if (sectionRef.current) {
      gsap.to(titleRef.current, {
        yPercent: -50,
        scale: 0.95,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      gsap.to(subtitleRef.current, {
        yPercent: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: 0.5,
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

      {/* Background Layers — walnut wood warmth */}
      <div className="absolute inset-0 z-0">
        {/* Layer 1: Deep walnut gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #4E3D30 0%, #3D2E22 40%, #453525 100%)",
          }}
        />
        {/* Layer 2: Warm gold radiance */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 35% 45%, rgba(176,141,87,0.1) 0%, transparent 65%)",
          }}
        />
        {/* Layer 3: Natural vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(61,46,34,0.7) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="container-dhp relative z-10 flex flex-col items-center text-center">
        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-6 opacity-0">
          <span className="label-text text-accent">
            {t("subtitle")}
          </span>
          <div className="mx-auto mt-3 h-px w-12 bg-accent opacity-60" />
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="heading-display heading-xl max-w-4xl whitespace-pre-line text-cream opacity-0"
        >
          {t("title")}
        </h1>

        {/* CTA */}
        <div ref={ctaRef} className="mt-12 opacity-0">
          <a
            href="#services"
            data-cursor
            data-cursor-text="Explore"
            className="group inline-flex items-center gap-4 border border-neutral-700 px-8 py-4 transition-all duration-500 hover:border-accent hover:bg-accent/5"
          >
            <span className="label-text text-cream">
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
              className="h-full w-full bg-accent"
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
