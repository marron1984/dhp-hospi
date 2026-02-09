import { setRequestLocale } from "next-intl/server";
import InquiryForm from "@/components/contact/InquiryForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-20">
      <InquiryForm />
    </div>
  );
}
