"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    const cursorLabel = labelRef.current;
    if (!cursor || !cursorLabel) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(cursorLabel, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const onMouseEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      const cursorText = target.dataset.cursorText || "View";
      setLabel(cursorText);
      setIsHovering(true);
    };

    const onMouseLeaveInteractive = () => {
      setLabel("");
      setIsHovering(false);
    };

    document.addEventListener("mousemove", onMouseMove);

    const interactiveElements = document.querySelectorAll("[data-cursor]");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`magnetic-cursor ${isHovering ? "hovering" : ""}`}
        aria-hidden="true"
      />
      <div
        ref={labelRef}
        className={`magnetic-cursor-label ${isHovering && label ? "visible" : ""}`}
        aria-hidden="true"
      >
        {label}
      </div>
    </>
  );
}
