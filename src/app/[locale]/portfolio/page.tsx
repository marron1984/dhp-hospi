import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-20">
      <PortfolioGallery />
    </div>
  );
}
