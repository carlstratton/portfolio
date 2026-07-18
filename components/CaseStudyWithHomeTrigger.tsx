"use client";

import { useLayoutEffect } from "react";
import type { CaseStudy } from "@/types/caseStudy";
import { CaseLayoutTypographic } from "./CaseLayoutTypographic";

interface Props {
  study: CaseStudy;
}

export function CaseStudyWithHomeTrigger({ study }: Props) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    root.style.scrollBehavior = previousScrollBehavior;
  }, [study.slug]);

  return <CaseLayoutTypographic study={study} />;
}
