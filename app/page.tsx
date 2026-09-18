import { HomeLanding } from "@/components/HomeLanding";
import { getPublicCaseStudies } from "@/lib/case-studies";
import { Suspense } from "react";

export default function Home() {
  const studies = getPublicCaseStudies();

  return (
    <Suspense fallback={null}>
      <HomeLanding studies={studies} />
    </Suspense>
  );
}
