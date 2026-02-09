import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });

  const sections = [1, 2, 3, 4, 5] as const;

  return (
    <div className="pt-20">
      <section className="py-32 md:py-40">
        <div className="container-dhp max-w-3xl">
          <span className="label-text text-accent">{t("label")}</span>
          <div className="mt-3 h-px w-8 bg-accent opacity-60" />
          <h1 className="heading-display heading-lg mt-6 text-cream">
            {t("title")}
          </h1>
          <p className="body-sm mt-4 text-neutral-500">{t("lastUpdated")}</p>

          <p className="body-lg mt-10 text-neutral-300 leading-relaxed">
            {t("intro")}
          </p>

          <div className="mt-16 space-y-12">
            {sections.map((n) => (
              <div key={n}>
                <h2 className="heading-display heading-sm text-cream">
                  {t(`section${n}Title`)}
                </h2>
                <p className="body-sm mt-4 whitespace-pre-line text-neutral-400 leading-relaxed">
                  {t(`section${n}Body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
