"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./LandingIntro.module.css";

const DEFAULT_ITEMS = ["Product Design", "User Experience", "Applied AI"];
const EASE = [0.22, 1, 0.36, 1] as const;

const HEADING_DURATION_MS = 500;
const ITEM_DURATION_MS = 400;
const ITEM_STAGGER_MS = 140;
const ITEM_BASE_DELAY_MS = 320;
const HOLD_MS = 2900;
const EXIT_DURATION_MS = 420;

type Phase = "revealing" | "holding" | "exiting";

export type LandingIntroProps = {
  /** The large, static, always-dark primary heading. */
  heading?: string;
  /** The secondary items that fade in, stacked, beneath the heading. */
  items?: string[];
  /** Called exactly once, when the exit fade finishes (or immediately for reduced motion). */
  onSequenceComplete: () => void;
  /** Accessible label for the clickable wrapper. */
  ariaLabel?: string;
  /** Extra class name(s) applied to the root element, e.g. for positioning. */
  className?: string;
  /** Color of the heading. */
  activeColor?: string;
  /** Color of the stacked secondary items. */
  inactiveColor?: string;
};

function getPrefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(getPrefersReducedMotion);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}

/**
 * A one-shot cinematic entrance: the heading fades in alone, then each
 * secondary item fades in beneath it in a fixed stack (no cycling), the
 * whole block holds for a beat, then fades out together as one unit and
 * reports completion via `onSequenceComplete`. Clicking at any point before
 * the exit begins skips straight to the exit fade rather than snapping away.
 */
export function LandingIntro({
  heading = "Carl Stratton",
  items = DEFAULT_ITEMS,
  onSequenceComplete,
  ariaLabel,
  className,
  activeColor = "#000000",
  inactiveColor = "#B5B5B5",
}: LandingIntroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("revealing");
  const revealTimerRef = useRef<number | null>(null);
  const holdTimerRef = useRef<number | null>(null);
  const reducedMotionTimerRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  const completeOnce = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onSequenceComplete();
  }, [onSequenceComplete]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const revealTotalMs = ITEM_BASE_DELAY_MS + (items.length - 1) * ITEM_STAGGER_MS + ITEM_DURATION_MS;
    revealTimerRef.current = window.setTimeout(() => setPhase("holding"), revealTotalMs);

    return () => {
      if (revealTimerRef.current) window.clearTimeout(revealTimerRef.current);
    };
  }, [prefersReducedMotion, items.length]);

  useEffect(() => {
    if (phase !== "holding") return;

    holdTimerRef.current = window.setTimeout(() => setPhase("exiting"), HOLD_MS);

    return () => {
      if (holdTimerRef.current) window.clearTimeout(holdTimerRef.current);
    };
  }, [phase]);

  useEffect(() => {
    if (!prefersReducedMotion) return;

    reducedMotionTimerRef.current = window.setTimeout(completeOnce, 0);

    return () => {
      if (reducedMotionTimerRef.current) window.clearTimeout(reducedMotionTimerRef.current);
    };
  }, [prefersReducedMotion, completeOnce]);

  const handleClick = useCallback(() => {
    if (prefersReducedMotion || phase === "exiting") return;

    if (revealTimerRef.current) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setPhase("exiting");
  }, [phase, prefersReducedMotion]);

  const wrapperClassName = [styles.wrapper, className].filter(Boolean).join(" ");
  const isExiting = phase === "exiting";

  return (
    <motion.button
      type="button"
      className={wrapperClassName}
      onClick={handleClick}
      aria-label={ariaLabel}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={isExiting ? { duration: EXIT_DURATION_MS / 1000, ease: EASE } : { duration: 0 }}
      onAnimationComplete={() => {
        if (isExiting) completeOnce();
      }}
    >
      <span className={styles.sequence}>
        <motion.span
          className={styles.heading}
          style={{ color: activeColor }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: HEADING_DURATION_MS / 1000, ease: EASE }
          }
        >
          {heading}
        </motion.span>
        <div className={styles.stage}>
          {items.map((item, index) => (
            <motion.span
              key={item}
              className={styles.item}
              style={{ color: inactiveColor }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: ITEM_DURATION_MS / 1000,
                      delay: (ITEM_BASE_DELAY_MS + index * ITEM_STAGGER_MS) / 1000,
                      ease: EASE,
                    }
              }
            >
              {item}
            </motion.span>
          ))}
        </div>
      </span>
    </motion.button>
  );
}
