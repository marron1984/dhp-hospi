import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/hero/HeroSection";
import ServicePillars from "@/components/services/ServicePillars";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import AboutSection from "@/components/ui/AboutSection";
import InquiryForm from "@/components/contact/InquiryForm";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ServicePillars />
      <PortfolioGallery />
      <AboutSection />
      <InquiryForm />
    </>
  );
}
