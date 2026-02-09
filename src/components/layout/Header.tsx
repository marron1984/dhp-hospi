"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  ja: "日本語",
  en: "English",
  "zh-TW": "繁體中文",
};

const localeShortLabels: Record<string, string> = {
  ja: "JP",
  en: "EN",
  "zh-TW": "繁",
};

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 2.5 }
    );

    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  const navItems = [
    { key: "services", href: `/${locale}/services` },
    { key: "portfolio", href: `/${locale}/portfolio` },
    { key: "about", href: `/${locale}/about` },
    { key: "contact", href: `/${locale}/contact` },
  ] as const;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-walnut/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
      style={{ height: "var(--header-height)" }}
    >
      <div className="container-dhp flex h-full items-center justify-between">
        {/* Logo */}
        <a href={`/${locale}`} className="relative z-10 flex flex-col">
          <span
            className="text-lg font-light tracking-[0.15em] text-cream"
            style={{ fontVariant: "small-caps" }}
          >
            dhp hospitality
          </span>
          <span className="text-[0.5rem] tracking-[0.3em] text-neutral-500 uppercase">
            Redefining Five-Star Hospitality
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="label-text text-neutral-400 transition-colors duration-300 hover:text-cream"
            >
              {t(item.key)}
            </a>
          ))}

          {/* Language Switcher — inline buttons */}
          <div className="flex items-center gap-1 border border-neutral-700/50 rounded-sm px-1 py-0.5">
            {routing.locales.map((loc, i) => (
              <div key={loc} className="flex items-center">
                {i > 0 && (
                  <span className="text-neutral-700 mx-0.5 select-none">|</span>
                )}
                <button
                  onClick={() => switchLocale(loc)}
                  className={`px-2 py-1 text-[0.65rem] font-medium tracking-wider transition-all duration-300 rounded-sm ${
                    loc === locale
                      ? "bg-accent/15 text-accent"
                      : "text-neutral-500 hover:text-cream"
                  }`}
                  aria-label={localeLabels[loc]}
                >
                  {localeShortLabels[loc]}
                </button>
              </div>
            ))}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span
            className={`h-px w-6 bg-cream transition-all duration-500 ${
              isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-cream transition-all duration-500 ${
              isMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-walnut transition-all duration-700 md:hidden ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="heading-display heading-md text-cream"
              >
                {t(item.key)}
              </a>
            ))}
            <div className="mt-10 flex items-center gap-2 border border-neutral-700/50 rounded-sm px-2 py-1">
              {routing.locales.map((loc, i) => (
                <div key={loc} className="flex items-center">
                  {i > 0 && (
                    <span className="text-neutral-700 mx-1 select-none">|</span>
                  )}
                  <button
                    onClick={() => {
                      switchLocale(loc);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 text-sm font-medium tracking-wider transition-all duration-300 rounded-sm ${
                      loc === locale
                        ? "bg-accent/15 text-accent"
                        : "text-neutral-500 hover:text-cream"
                    }`}
                  >
                    {localeLabels[loc]}
                  </button>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
