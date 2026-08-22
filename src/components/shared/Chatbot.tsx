"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MessageSquare, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/constants";

type Msg = { from: "bot" | "user"; text: string };

const INITIAL: Msg[] = [
  {
    from: "bot",
    text: `Hi, I'm the Qubion.Ai assistant (demo preview). Ask me about our AI, design, automation or advertising services.`,
  },
];

const CANNED =
  "Thanks for the message. This chatbot is a UI preview for now. For a real answer right away, email us at " +
  SITE.email +
  " or use the contact form.";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function send() {
    const text = value.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setValue("");
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: CANNED }]);
    }, 550);
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel mb-4 flex h-[440px] w-[88vw] max-w-[360px] flex-col overflow-hidden rounded-3xl"
            >
              <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-black">
                  <Image src="/brand/emblem-dark.svg" alt="" width={1080} height={1080} className="h-full w-full object-contain" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-white">Qubion.Ai Assistant</p>
                  <p className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Demo Preview
                  </p>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={
                      m.from === "bot"
                        ? "max-w-[85%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 px-3.5 py-2.5 text-[13px] leading-relaxed text-white/90"
                        : "ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-violet to-glow px-3.5 py-2.5 text-[13px] leading-relaxed text-white"
                    }
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 border-t border-white/10 p-3">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Type a message…"
                  className="flex-1 rounded-full border border-white/12 bg-white/5 px-4 py-2.5 text-[13px] text-white placeholder:text-muted-2 outline-none focus:border-glow/60"
                />
                <button
                  onClick={send}
                  aria-label="Send"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet to-glow-2 text-white transition hover:brightness-110"
                >
                  <Send size={15} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Open chat"
          className="ml-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-violet to-violet-2 text-white shadow-[0_14px_32px_rgba(4,14,9,0.6)] transition hover:scale-105"
        >
          {open ? <X size={22} /> : <MessageSquare size={22} />}
        </button>
      </div>
    </>
  );
}
