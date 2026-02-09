import { setRequestLocale } from "next-intl/server";
import ServicePillars from "@/components/services/ServicePillars";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-20">
      <ServicePillars />
    </div>
  );
}
