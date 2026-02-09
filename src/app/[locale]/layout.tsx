import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/providers/LenisProvider";
import GrainOverlay from "@/components/effects/GrainOverlay";
import MagneticCursor from "@/components/effects/MagneticCursor";
import RedThread from "@/components/effects/RedThread";
import "../globals.css";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://dhp-hospi.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ja: "/ja",
        en: "/en",
        "zh-TW": "/zh-TW",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: "dhp hospitality",
      locale: locale === "zh-TW" ? "zh_TW" : locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className="lenis">
      <head>
        {/* Preconnect to Google Fonts for production */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Cormorant Garamond for headings, Inter for body */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider>
          <LenisProvider>
            <GrainOverlay />
            <MagneticCursor />
            <RedThread />
            <Header locale={locale} />
            <main>{children}</main>
            <Footer locale={locale} />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
