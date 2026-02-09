"use client";

import { useEffect, useRef } from "react";

export default function RedThread() {
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thread = threadRef.current;
    if (!thread) return;

    const onScroll = () => {
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      const height = scrollPercent * 100;
      thread.style.height = `${height}vh`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={threadRef} className="red-thread" aria-hidden="true" />;
}
