/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type RefObject } from "react";
import type { CaseStudy } from "@/types/caseStudy";
import styles from "./CaseLayoutTypographic.module.css";
import { CaseTypographicStory } from "./CaseTypographicBlocks";

interface Props {
  study: CaseStudy;
  embedded?: boolean;
  embeddedHeaderRef?: RefObject<HTMLElement | null>;
}

export function CaseLayoutTypographic({
  study,
  embedded = false,
  embeddedHeaderRef,
}: Props) {
  const router = useRouter();
  const backHref = "/#case-studies";
  const [viewMode, setViewMode] = useState<"full" | "summary">("full");

  const content = (
    <>
      <header
        ref={embedded ? embeddedHeaderRef : undefined}
        className={styles.header}
        data-embedded-header={embedded || undefined}
      >
        <div className={styles.titleGrid}>
          <h1 className={styles.title}>{study.title}</h1>
          <p className={styles.summary}>{study.summary}</p>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <strong>View:</strong>
            <select
              className={styles.metaNativeSelect}
              aria-label="Case study view"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as "full" | "summary")}
            >
              <option value="full">Full case study</option>
              <option value="summary">Quick read</option>
            </select>
          </span>
          {(study.company ?? study.client) && (
            <span className={styles.metaItem}>
              <strong>Company:</strong> {(study.company ?? study.client)}
            </span>
          )}
          {study.role?.length ? (
            <span className={styles.metaItem}>
              <strong>Role:</strong> {study.role.join(", ")}
            </span>
          ) : null}
          {study.sector && (
            <span className={styles.metaItem}>
              <strong>Sector:</strong> {study.sector}
            </span>
          )}
          {study.timeframe && (
            <span className={styles.metaItem}>
              <strong>Year:</strong> {study.timeframe}
            </span>
          )}
        </div>
      </header>

      <main className={styles.main}>
        {viewMode === "full" ? (
          <div className={styles.hero}>
            <div className={styles.heroImageWrap}>
              <img src={study.hero} alt={study.title} />
            </div>
          </div>
        ) : null}
        <CaseTypographicStory study={study} mode={viewMode} />
        {!embedded ? (
          <footer className={styles.footer}>
            <Link
              href={backHref}
              className={styles.backLink}
              aria-label="Back"
              onClick={(e) => {
                if (typeof window !== "undefined" && window.history.length > 1) {
                  e.preventDefault();
                  router.back();
                }
              }}
            >
              <svg
                className={styles.backGraphic}
                width="131"
                height="29"
                viewBox="0 0 131 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M17.4355 3.03613L8.21973 12.2529H28.7998V16.5469H8.21875L17.4355 25.7637L14.4004 28.7998L0 14.4004L14.4004 0L17.4355 3.03613Z" fill="#939393" />
                <path d="M112.795 0H116.315V17.12H116.275L125.915 7.6H130.515L122.155 15.8L130.955 28.2H126.755L119.755 18.2L116.315 21.48V28.2H112.795V0Z" fill="black" fillOpacity="0.4" />
                <path d="M99.4919 28.8C97.4652 28.8 95.6652 28.3467 94.0919 27.44C92.5452 26.5067 91.3452 25.2133 90.4919 23.56C89.6386 21.9067 89.2119 20.0133 89.2119 17.88C89.2119 15.7467 89.6386 13.8667 90.4919 12.24C91.3452 10.5867 92.5452 9.30667 94.0919 8.4C95.6652 7.46667 97.4919 7 99.5719 7C101.412 7 103.025 7.36 104.412 8.08C105.825 8.8 106.919 9.8 107.692 11.08C108.492 12.3333 108.959 13.72 109.092 15.24H105.452C105.159 13.5867 104.479 12.3467 103.412 11.52C102.345 10.6933 101.039 10.28 99.4919 10.28C98.1319 10.28 96.9452 10.5867 95.9319 11.2C94.9452 11.7867 94.1719 12.6667 93.6119 13.84C93.0519 14.9867 92.7719 16.3333 92.7719 17.88C92.7719 19.4533 93.0519 20.8267 93.6119 22C94.1719 23.1467 94.9452 24.0267 95.9319 24.64C96.9452 25.2267 98.1319 25.52 99.4919 25.52C101.039 25.52 102.332 25.12 103.372 24.32C104.412 23.52 105.092 22.28 105.412 20.6H109.052C108.919 22.12 108.452 23.5067 107.652 24.76C106.852 26.0133 105.759 27 104.372 27.72C102.985 28.44 101.359 28.8 99.4919 28.8Z" fill="black" fillOpacity="0.4" />
                <path d="M74.8885 28.8C72.7818 28.8 71.0485 28.2533 69.6885 27.16C68.3551 26.0667 67.6885 24.5733 67.6885 22.68C67.6885 20.8667 68.2351 19.4667 69.3285 18.48C70.4485 17.4667 71.9018 16.8 73.6885 16.48L78.8085 15.48C79.7151 15.32 80.3818 15.08 80.8085 14.76C81.2351 14.44 81.4485 13.92 81.4485 13.2C81.4485 12.56 81.2751 12.0133 80.9285 11.56C80.6085 11.08 80.1151 10.72 79.4485 10.48C78.7818 10.24 77.9818 10.12 77.0485 10.12C75.6351 10.12 74.4485 10.4267 73.4885 11.04C72.5285 11.6533 72.0085 12.5733 71.9285 13.8H68.2885C68.3418 12.4133 68.7685 11.2133 69.5685 10.2C70.3685 9.16 71.4085 8.37333 72.6885 7.84C73.9685 7.28 75.4085 7 77.0085 7C78.8485 7 80.3551 7.28 81.5285 7.84C82.7285 8.37333 83.6085 9.10667 84.1685 10.04C84.7551 10.9733 85.0485 12.04 85.0485 13.24V23.6C85.0485 24.24 85.1685 24.6933 85.4085 24.96C85.6751 25.2 86.0351 25.32 86.4885 25.32C86.9151 25.32 87.3151 25.2667 87.6885 25.16V28.12C87.3418 28.2533 86.9551 28.36 86.5285 28.44C86.1018 28.5467 85.6485 28.6 85.1685 28.6C84.2618 28.6 83.4751 28.3867 82.8085 27.96C82.1685 27.5067 81.7685 26.84 81.6085 25.96H81.5685C80.9818 26.7067 80.1285 27.3733 79.0085 27.96C77.9151 28.52 76.5418 28.8 74.8885 28.8ZM75.5685 25.72C77.2751 25.72 78.6751 25.28 79.7685 24.4C80.8885 23.4933 81.4485 22.3333 81.4485 20.92V17.48C81.2618 17.6667 80.8885 17.8533 80.3285 18.04C79.7685 18.2267 79.1018 18.3867 78.3285 18.52L74.9685 19.2C73.7418 19.44 72.8218 19.8267 72.2085 20.36C71.6218 20.8933 71.3285 21.6133 71.3285 22.52C71.3285 23.2133 71.5018 23.8 71.8485 24.28C72.2218 24.76 72.7285 25.12 73.3685 25.36C74.0085 25.6 74.7418 25.72 75.5685 25.72Z" fill="black" fillOpacity="0.4" />
                <path d="M44.8 0H55.8401C57.4667 0 58.9067 0.306667 60.16 0.92C61.4134 1.53333 62.3734 2.41333 63.0401 3.56C63.7334 4.68 64.0801 5.97333 64.0801 7.44C64.0801 8.8 63.7334 10 63.0401 11.04C62.3734 12.0533 61.4134 12.8 60.16 13.28V13.32C61.68 13.7467 62.8267 14.5733 63.6 15.8C64.4 17 64.8 18.5067 64.8 20.32C64.8 21.8933 64.4667 23.28 63.8 24.48C63.1334 25.6533 62.1734 26.5733 60.9201 27.24C59.6667 27.88 58.2 28.2 56.52 28.2H44.8V0ZM56 24.96C57.5734 24.96 58.8 24.5467 59.68 23.72C60.5867 22.8667 61.0401 21.6533 61.0401 20.08C61.0401 18.5333 60.5867 17.32 59.68 16.44C58.8 15.56 57.5734 15.12 56 15.12H48.48V24.96H56ZM55.4001 12.04C56.8934 12.04 58.08 11.64 58.96 10.84C59.8401 10.0133 60.28 8.93333 60.28 7.6C60.28 6.24 59.8401 5.17333 58.96 4.4C58.08 3.62667 56.8934 3.24 55.4001 3.24H48.48V12.04H55.4001Z" fill="black" fillOpacity="0.4" />
              </svg>
            </Link>
          </footer>
        ) : null}
      </main>
    </>
  );

  return (
    <div className={styles.wrap} data-embedded={embedded}>
      {embedded ? content : <div className="page-shell">{content}</div>}
    </div>
  );
}

