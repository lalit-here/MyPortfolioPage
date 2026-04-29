"use client";

import { motion } from "framer-motion";

const CHAR_DELAY = 0.08;

type TypewriterTextProps = {
  text: string;
  delay?: number;
  className?: string;
};

export function TypewriterText({ text, delay = 0, className }: TypewriterTextProps) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * CHAR_DELAY, duration: 0.01 }}
          className="inline-block"
        >
          {character === " " ? "\u00A0" : character}
        </motion.span>
      ))}
    </span>
  );
}
