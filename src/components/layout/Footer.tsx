"use client";

import { useTranslations } from "next-intl";

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800/50 bg-walnut">
      <div className="container-dhp py-20">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <span
              className="text-xl font-light tracking-[0.15em] text-cream"
              style={{ fontVariant: "small-caps" }}
            >
              dhp hospitality
            </span>
            <p className="body-sm text-neutral-500">{t("tagline")}</p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <span className="label-text text-neutral-600">Navigation</span>
            <nav className="flex flex-col gap-3">
              <a
                href={`/${locale}/services`}
                className="body-sm text-neutral-400 transition-colors hover:text-cream"
              >
                {t("company")}
              </a>
              <a
                href={`/${locale}/portfolio`}
                className="body-sm text-neutral-400 transition-colors hover:text-cream"
              >
                Portfolio
              </a>
              <a
                href={`/${locale}/contact`}
                className="body-sm text-neutral-400 transition-colors hover:text-cream"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <span className="label-text text-neutral-600">Legal</span>
            <nav className="flex flex-col gap-3">
              <a
                href="#"
                className="body-sm text-neutral-400 transition-colors hover:text-cream"
              >
                {t("privacy")}
              </a>
              <a
                href="#"
                className="body-sm text-neutral-400 transition-colors hover:text-cream"
              >
                {t("terms")}
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-800/50 pt-8 md:flex-row">
          <p className="text-xs tracking-wider text-neutral-600">
            {t("copyright", { year })}
          </p>
          <div className="flex items-center gap-1">
            <span className="h-px w-8 bg-accent opacity-60" />
            <span className="text-[0.6rem] tracking-[0.3em] text-neutral-600 uppercase">
              Osaka, Japan
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
