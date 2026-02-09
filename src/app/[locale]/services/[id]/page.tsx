import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import corporateData from "@/data/corporate-registry.json";
import ServiceDetailClient from "@/components/services/ServiceDetailClient";

const pillarMap: Record<string, { metaKey: string; contentKey: string; icon: string }> = {
  "hotel-development": {
    metaKey: "hotelDev",
    contentKey: "hotelDev",
    icon: "building",
  },
  "brand-attraction": {
    metaKey: "brandAttraction",
    contentKey: "brandAttraction",
    icon: "sparkles",
  },
  "fc-management": {
    metaKey: "fcManagement",
    contentKey: "fcManagement",
    icon: "shield",
  },
};

export async function generateStaticParams() {
  return corporateData.corporation.businessPillars.map((pillar) => ({
    id: pillar.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const config = pillarMap[id];
  if (!config) return {};

  const t = await getTranslations({
    locale,
    namespace: `serviceDetail.meta.${config.metaKey}`,
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const config = pillarMap[id];

  if (!config) {
    notFound();
  }

  setRequestLocale(locale);

  const pillar = corporateData.corporation.businessPillars.find(
    (p) => p.id === id
  );

  if (!pillar) {
    notFound();
  }

  return (
    <ServiceDetailClient
      locale={locale}
      pillarId={id}
      contentKey={config.contentKey}
      pillarTitle={pillar.title[locale as keyof typeof pillar.title]}
      pillarDescription={pillar.description[locale as keyof typeof pillar.description]}
    />
  );
}
