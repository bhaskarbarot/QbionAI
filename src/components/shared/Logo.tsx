import Image from "next/image";
import { SITE } from "@/lib/constants";

export default function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const iconCls = size === "lg" ? "h-10 sm:h-12" : "h-9 sm:h-10";
  const textCls = size === "lg" ? "text-2xl sm:text-[1.5rem]" : "text-xl sm:text-2xl";

  return (
    <span className="flex items-center gap-1.5">
      <Image
        src="/brand/emblem.svg"
        alt={SITE.name}
        width={1080}
        height={1080}
        className={`${iconCls} w-auto object-contain drop-shadow-[0_6px_16px_rgba(74,222,128,0.3)]`}
        priority
      />
      <span className={`font-display ${textCls} font-extrabold leading-none tracking-tight text-white`}>
        qubion<span className="text-glow-2">.ai</span>
      </span>
    </span>
  );
}
