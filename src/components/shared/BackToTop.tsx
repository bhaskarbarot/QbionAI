"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import clsx from "clsx";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={clsx(
        "fixed bottom-6 left-6 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-slate/90 text-white backdrop-blur-md transition-all duration-300 hover:bg-violet",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <ArrowUp size={18} />
    </button>
  );
}
