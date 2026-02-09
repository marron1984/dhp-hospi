import { setRequestLocale } from "next-intl/server";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";

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
