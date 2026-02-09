"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type InquiryType = "hotelDev" | "brandAttraction" | "fcManagement" | "other";

interface FormData {
  type: InquiryType | null;
  companyName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function InquiryForm() {
  const t = useTranslations("contact");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    type: null,
    companyName: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      }
    );
  }, []);

  const inquiryTypes: { key: InquiryType; label: string }[] = [
    { key: "hotelDev", label: t("typeHotelDev") },
    { key: "brandAttraction", label: t("typeBrandAttraction") },
    { key: "fcManagement", label: t("typeFcManagement") },
    { key: "other", label: t("typeOther") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const stepIndicator = (
    <div className="mb-12 flex items-center gap-4">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-4">
          <div
            className={`flex h-8 w-8 items-center justify-center border text-xs tracking-wider transition-all duration-500 ${
              s === step
                ? "border-imperial bg-imperial text-pearl"
                : s < step
                  ? "border-imperial/50 text-imperial"
                  : "border-neutral-700 text-neutral-600"
            }`}
          >
            {s < step ? (
              <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                <path d="M1 4L4.5 7.5L11 1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            ) : (
              s
            )}
          </div>
          {s < 3 && (
            <div
              className={`h-px w-12 transition-colors duration-500 ${
                s < step ? "bg-imperial/50" : "bg-neutral-800"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  if (submitted) {
    return (
      <section ref={sectionRef} className="relative py-32 md:py-40">
        <div className="container-dhp flex flex-col items-center text-center">
          <div className="h-px w-12 bg-imperial mb-8" />
          <h2 className="heading-display heading-md text-pearl">
            {t("thankYou")}
          </h2>
          <p className="body-lg mt-4 text-neutral-400 max-w-md">
            {t("thankYouMessage")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 bg-obsidian-mid/20">
      <div className="container-dhp">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          {/* Left: Header */}
          <div ref={headerRef} className="opacity-0">
            <span className="label-text text-imperial">{t("label")}</span>
            <div className="mt-3 h-px w-8 bg-imperial opacity-60" />
            <h2 className="heading-display heading-lg mt-6 whitespace-pre-line text-pearl">
              {t("title")}
            </h2>
            <p className="body-lg mt-6 text-neutral-400">
              {t("description")}
            </p>
          </div>

          {/* Right: Multi-Step Form */}
          <div>
            {stepIndicator}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Inquiry Type */}
              {step === 1 && (
                <div className="space-y-3">
                  <h3 className="heading-sm text-pearl mb-6">
                    {t("step1Title")}
                  </h3>
                  {inquiryTypes.map((type) => (
                    <button
                      key={type.key}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, type: type.key });
                        setStep(2);
                      }}
                      className={`flex w-full items-center justify-between border p-5 transition-all duration-300 ${
                        formData.type === type.key
                          ? "border-imperial bg-imperial/5 text-pearl"
                          : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-pearl"
                      }`}
                    >
                      <span className="text-sm tracking-wider">{type.label}</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                        <path d="M15.354 4.354a.5.5 0 000-.708L12.172.464a.5.5 0 10-.707.708L14.293 4l-2.828 2.828a.5.5 0 10.707.708l3.182-3.182zM0 4.5h15v-1H0v1z" fill="currentColor" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2: Personal Info */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="heading-sm text-pearl mb-6">
                    {t("step2Title")}
                  </h3>
                  <div>
                    <label className="label-text text-neutral-500 mb-2 block">
                      {t("companyName")}
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({ ...formData, companyName: e.target.value })
                      }
                      className="w-full border-b border-neutral-700 bg-transparent py-3 text-pearl outline-none transition-colors focus:border-imperial"
                    />
                  </div>
                  <div>
                    <label className="label-text text-neutral-500 mb-2 block">
                      {t("name")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full border-b border-neutral-700 bg-transparent py-3 text-pearl outline-none transition-colors focus:border-imperial"
                    />
                  </div>
                  <div>
                    <label className="label-text text-neutral-500 mb-2 block">
                      {t("email")} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full border-b border-neutral-700 bg-transparent py-3 text-pearl outline-none transition-colors focus:border-imperial"
                    />
                  </div>
                  <div>
                    <label className="label-text text-neutral-500 mb-2 block">
                      {t("phone")}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full border-b border-neutral-700 bg-transparent py-3 text-pearl outline-none transition-colors focus:border-imperial"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="border border-neutral-700 px-6 py-3 text-sm tracking-wider text-neutral-400 transition-colors hover:border-neutral-500 hover:text-pearl"
                    >
                      {t("back")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="border border-imperial bg-imperial/10 px-8 py-3 text-sm tracking-wider text-pearl transition-colors hover:bg-imperial/20"
                    >
                      {t("next")}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Message */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="heading-sm text-pearl mb-6">
                    {t("step3Title")}
                  </h3>
                  <div>
                    <label className="label-text text-neutral-500 mb-2 block">
                      {t("message")} *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full resize-none border-b border-neutral-700 bg-transparent py-3 text-pearl outline-none transition-colors focus:border-imperial"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="border border-neutral-700 px-6 py-3 text-sm tracking-wider text-neutral-400 transition-colors hover:border-neutral-500 hover:text-pearl"
                    >
                      {t("back")}
                    </button>
                    <button
                      type="submit"
                      className="group flex items-center gap-3 border border-imperial bg-imperial px-8 py-3 text-sm tracking-wider text-pearl transition-all hover:bg-imperial-dark"
                    >
                      {t("submit")}
                      <svg
                        width="16"
                        height="8"
                        viewBox="0 0 16 8"
                        fill="none"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M15.354 4.354a.5.5 0 000-.708L12.172.464a.5.5 0 10-.707.708L14.293 4l-2.828 2.828a.5.5 0 10.707.708l3.182-3.182zM0 4.5h15v-1H0v1z" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
