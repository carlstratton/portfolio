"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CaseStudy } from "@/types/caseStudy";
import styles from "./HomeLanding.module.css";

const EMAIL = "cgstratton+website@gmail.com";
const MAILTO = `mailto:${EMAIL}`;
const LANDING_STORAGE_KEY = "carl-home-landing-seen-v1";
const LANDING_DURATION_MS = 1700;

type SectionId =
  | "introduction"
  | "work"
  | "principles"
  | "references"
  | "case-studies"
  | "background"
  | "contact";

type IntroTab = "designer" | "founder" | "builder";

type SectionMeta = {
  id: SectionId;
  label: string;
};

type WorkMosaicImage = {
  id: string;
  src: string;
  alt: string;
  label: string;
};

type Experience = {
  company: string;
  title: string;
  years: string;
  location: string;
  logo?: string;
  logoAlt: string;
  body: string;
};

type BackgroundIntroBlock = {
  heading: string;
  paragraphs: string[];
};

const sections: SectionMeta[] = [
  { id: "introduction", label: "Introduction" },
  { id: "work", label: "Work" },
  { id: "principles", label: "Principles" },
  { id: "references", label: "References" },
  { id: "case-studies", label: "Case studies" },
  { id: "background", label: "Background" },
  { id: "contact", label: "Contact" },
];

const introCopy: Record<IntroTab, string> = {
  designer:
    "Hi there—I’m a Staff product designer, founder, builder and accelerator alum, with over a decade of experience crafting and building user-centric, impactful digital products.",
  founder:
    "I co-founded Emblzn (2013) and Shoesie (2018), taking them through Founder Centric and IGNITE accelerators. Emblzn won UK Innovate's Digital Innovation Award for mass customisation, and took me on a business mission to China with the British Consulate.",
  builder:
    "Over the past few years, I have built and released several secure, production ready web and iOS products, using AI agentic tools to design, research, prototype, and validate ideas.",
};

const introTabs: Array<{ id: IntroTab; label: string }> = [
  { id: "designer", label: "Designer" },
  { id: "founder", label: "Founder" },
  { id: "builder", label: "Builder" },
];

const workMosaicImages: WorkMosaicImage[] = [
  {
    id: "investment-amount",
    src: "/home-work/investment-amount.png",
    alt: "Investment amount interface for a private market product",
    label: "Investment flow detail",
  },
  {
    id: "cherryz-phone",
    src: "/home-work/cherryz-phone.png",
    alt: "Mobile commerce product grid shown inside an Android phone",
    label: "Mobile commerce exploration",
  },
  {
    id: "confirm-investment",
    src: "/home-work/confirm-investment.png",
    alt: "Swipe to confirm investment interaction",
    label: "Investment confirmation interaction",
  },
  {
    id: "simply-business",
    src: "/home-work/simply-business.png",
    alt: "Business health insurance landing page",
    label: "Insurance proposition page",
  },
  {
    id: "mendeley",
    src: "/home-work/mendeley.png",
    alt: "Research collaboration community interface",
    label: "Research community product",
  },
  {
    id: "republic-market",
    src: "/home-work/republic-market.png",
    alt: "Mobile market screen for investment discovery",
    label: "Market discovery experience",
  },
  {
    id: "wondr-rooms",
    src: "/home-work/wondr-rooms.png",
    alt: "Three mobile screens for Wondr Rooms clinical collaboration",
    label: "Clinical collaboration rooms",
  },
  {
    id: "whiteboard",
    src: "/home-work/whiteboard.png",
    alt: "Carl working at a whiteboard with sticky notes",
    label: "Discovery workshop",
  },
];

const references = [
  {
    quote:
      "Carl had a huge impact, leading the visual design and user experience for the first iteration of our app, which helped put Cherryz on the trajectory we're on today.”",
    person: "Product Designer, Republic",
  },
  {
    quote:
      "Carl’s passion and dedication have motivated the team to push through challenges and embrace opportunities for innovation and improvement.”",
    person: "Product Manager – Republic",
  },
  {
    quote:
      "Carl's understanding of the design process was instrumental to our success as he led our team. His suggestion to use the opportunity tree played a crucial role in the discovery of Wondr Rooms.”",
    person: "Product Designer, Wondr Medical",
  },
  {
    quote:
      "Carl's guidance has been instrumental in shaping my professional development, and I am grateful for the mentorship he has generously offered.”",
    person: "Product Designer, Republic",
  },
];

const experience: Experience[] = [
  {
    company: "Republic",
    title: "Staff Product Designer",
    years: "2021",
    location: "Current",
    logo: "/case-studies/badges/republic.png",
    logoAlt: "Republic logo",
    body:
      "Leading design of new investing experiences across Republic's web and mobile products, from launching the industry's first mobile-native private secondary market to reimagining discovery and checkout experiences. Alongside shaping product strategy through research and experimentation, I established a shared design system, mentored designers, and helped scale the platform across the UK, Europe, and US.",
  },
  {
    company: "Wondr Medical",
    title: "Founding Product Designer",
    years: "2020—2021",
    location: "London",
    logo: "/case-studies/badges/wondr-medical.png",
    logoAlt: "Wondr Medical logo",
    body:
      "I led product design through a critical time of finding product market fit, using continuous discovery to shape the roadmap and launch Wondr Rooms, a HIPAA-compliant networking platform that supported the company's £12M seed raise. Alongside designing engagement features for global healthcare events, I helped establish Wondr's first design system and grow the design practice.",
  },
  {
    company: "Simply Business",
    title: "UX Consultant",
    years: "2020",
    location: "London",
    logo: "/case-studies/badges/simply-business.png",
    logoAlt: "Simply Business logo",
    body:
      "As the Lead UX designer working within a Product Discovery Unit, I helped discover, design, and launch new insurance products through continuous customer research and rapid experimentation. Coached by Teresa Torres in Continuous Discovery Habits, I partnered with cross-functional teams to validate opportunities and deliver products for millions of UK small businesses.",
  },
  {
    company: "Cherryz",
    title: "Founding Designer",
    years: "2020",
    location: "London",
    logo: "/case-studies/badges/cherryz.png",
    logoAlt: "Cherryz logo",
    body:
      "As Cherryz's founding fractional designer, I established the brand and product foundations, shaping the design system, user experience, and early product strategy across web and mobile apps.",
  },
  {
    company: "Farfetch",
    title: "Lead UX Designer",
    years: "2016—2017",
    location: "London",
    logo: "/case-studies/badges/farfetch.png",
    logoAlt: "Farfetch logo",
    body:
      "I led UX work across commerce and mobile experiences, helping teams translate product strategy into clearer customer journeys and stronger design foundations.",
  },
];

const backgroundIntro: BackgroundIntroBlock[] = [
  {
    heading: "I was exposed to",
    paragraphs: [
      "the London start-up scene in 2010 and have been designing interfaces, products and digital experiences ever since. I have led design at start-ups including Farfetch, Seedrs, and Simply Business, and advised organisations including Workspace, Vodafone, and the NHS on digital strategy and user experience.",
      "The projects I work on typically involve strategy, research, and problem-solving, to deliver meaningful digital solutions. They combine business thinking with product craft and interface design to shape clear, useful experiences.",
    ],
  },
  {
    heading: "Applied AI Product Design",
    paragraphs: [
      "Over the past few years, I have increasingly integrated AI into my work, using agentic tools to design, prototype, and validate.",
      "The outcome of that work can be seen in iOS apps and web products, most recently working with a small team to build and launch Top of the League — a social app built around the idea of social football predictions, including releases spanning user accounts, game mechanics, global leaderboards, social groups, notifications, and third-party data integrations.",
    ],
  },
];

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function shortCompany(study: CaseStudy) {
  return (study.client ?? study.company ?? "Project").replace(/\.(com|co\.uk)$/i, "");
}

export function HomeLanding({
  studies,
  embeddedInCaseStudy = false,
}: {
  studies: CaseStudy[];
  embeddedInCaseStudy?: boolean;
  initialFlowOverride?: string;
}) {
  const sectionRefs = useRef<Partial<Record<SectionId, HTMLElement>>>({});
  const landingTimerRef = useRef<number | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("introduction");
  const [introTab, setIntroTab] = useState<IntroTab>("designer");
  const [landingChecked, setLandingChecked] = useState(embeddedInCaseStudy);
  const [showLanding, setShowLanding] = useState(false);

  const caseStudies = useMemo(() => studies.slice(0, 5), [studies]);
  const setSectionRef = useCallback(
    (id: SectionId) => (node: HTMLElement | null) => {
      if (node) sectionRefs.current[id] = node;
      else delete sectionRefs.current[id];
    },
    []
  );

  const scrollToSection = useCallback((id: SectionId) => {
    const target = sectionRefs.current[id];
    if (!target) return;
    setActiveSection(id);
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
    try {
      window.history.replaceState({}, "", `#${id}`);
    } catch {
      // Ignore history updates in constrained browser contexts.
    }
  }, []);

  const enterFullPage = useCallback(() => {
    if (landingTimerRef.current) window.clearTimeout(landingTimerRef.current);
    try {
      window.localStorage.setItem(LANDING_STORAGE_KEY, "true");
    } catch {
      // If storage is unavailable, still let the visitor enter the page.
    }
    setShowLanding(false);
    setLandingChecked(true);
  }, []);

  useEffect(() => {
    if (embeddedInCaseStudy) return;

    let frame = 0;
    let hasSeenLanding = false;
    try {
      hasSeenLanding = window.localStorage.getItem(LANDING_STORAGE_KEY) === "true";
    } catch {
      hasSeenLanding = false;
    }

    frame = window.requestAnimationFrame(() => {
      setLandingChecked(true);
      setShowLanding(!hasSeenLanding);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [embeddedInCaseStudy]);

  useEffect(() => {
    if (!showLanding) return;
    landingTimerRef.current = window.setTimeout(
      enterFullPage,
      prefersReducedMotion() ? 400 : LANDING_DURATION_MS
    );
    return () => {
      if (landingTimerRef.current) window.clearTimeout(landingTimerRef.current);
    };
  }, [enterFullPage, showLanding]);

  useEffect(() => {
    if (!landingChecked || showLanding) return;

    let frame = 0;

    const updateActiveSection = () => {
      const triggerLine = window.scrollY + window.innerHeight * 0.35;
      let current: SectionId = sections[0]?.id ?? "introduction";
      for (const section of sections) {
        const node = sectionRefs.current[section.id];
        if (!node) continue;
        const top = node.getBoundingClientRect().top + window.scrollY;
        if (top <= triggerLine) {
          current = section.id;
        } else {
          break;
        }
      }
      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const handleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", handleUpdate, { passive: true });
    window.addEventListener("resize", handleUpdate);

    return () => {
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [landingChecked, showLanding]);

  if (!landingChecked && !embeddedInCaseStudy) {
    return <div className={styles.loadingScreen} aria-hidden="true" />;
  }

  if (showLanding && !embeddedInCaseStudy) {
    return <LandingGate activeSection={activeSection} onEnter={enterFullPage} />;
  }

  return (
    <main className={styles.home}>
      <LeftMenu activeSection={activeSection} onSelect={scrollToSection} />

      <div className={styles.pageColumn}>
        <section
          id="introduction"
          ref={setSectionRef("introduction")}
          data-section-id="introduction"
          className={`${styles.section} ${styles.introductionSection}`}
          aria-labelledby="introduction-heading"
        >
          <div className={styles.introTabs} role="tablist" aria-label="Introduction views">
            {introTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={introTab === tab.id}
                aria-controls="introduction-copy"
                className={styles.introTab}
                data-active={introTab === tab.id}
                onClick={() => setIntroTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <h1 id="introduction-heading" className="sr-only">
            Introduction
          </h1>
          <p id="introduction-copy" className={styles.heroStatement}>
            {introCopy[introTab]}
          </p>
        </section>

        <section
          id="work"
          ref={setSectionRef("work")}
          data-section-id="work"
          className={styles.section}
          aria-labelledby="work-heading"
        >
          <h2 id="work-heading" className="sr-only">
            Work
          </h2>
          <WorkMosaic />
        </section>

        <section
          id="principles"
          ref={setSectionRef("principles")}
          data-section-id="principles"
          className={styles.section}
          aria-labelledby="principles-heading"
        >
          <div className={styles.principlesCopy}>
            <h2 id="principles-heading">
              High Craft
              <br />
              User Obsessed
              <br />
              Always Curious
              <br />
              Beauty Matters
            </h2>
            <p>
              These are the principles that shape how I design, lead, and work with others, and that
              oscillate with the products I build. I put users at the heart of the process, using
              research and insight to challenge assumptions and shape better products. I’m endlessly
              curious, always looking to learn, question, and refine my perspective. I believe great
              work combines ambitious thinking with deep focus—zooming out to understand the bigger
              picture, then obsessing over the details that make experiences simple, intuitive, and
              beautiful. Above all, I care deeply about making things that are beautiful, functional
              and with a high degree of craft.
            </p>
          </div>
        </section>

        <section
          id="references"
          ref={setSectionRef("references")}
          data-section-id="references"
          className={styles.section}
          aria-labelledby="references-heading"
        >
          <h2 id="references-heading" className="sr-only">
            References
          </h2>
          <div className={styles.referenceList}>
            {references.map((reference, index) => (
              <figure key={reference.quote} className={styles.reference} data-offset={index % 2 === 1}>
                <span className={styles.referenceMark} aria-hidden="true">
                  “
                </span>
                <div className={styles.referenceBody}>
                  <blockquote>{reference.quote}</blockquote>
                  <figcaption>{reference.person}</figcaption>
                </div>
              </figure>
            ))}
          </div>
        </section>

        <section
          id="case-studies"
          ref={setSectionRef("case-studies")}
          data-section-id="case-studies"
          className={styles.section}
          aria-labelledby="case-studies-heading"
        >
          <h2 id="case-studies-heading" className="sr-only">
            Case studies
          </h2>
          <div className={styles.caseStudyList}>
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </section>

        <section
          id="background"
          ref={setSectionRef("background")}
          data-section-id="background"
          className={styles.section}
          aria-labelledby="background-heading"
        >
          <h2 id="background-heading" className="sr-only">
            Background
          </h2>
          <div className={styles.backgroundIntro}>
            {backgroundIntro.map((block) => (
              <div key={block.heading} className={styles.backgroundIntroBlock}>
                <h3>{block.heading}</h3>
                <div className={styles.backgroundIntroText}>
                  {block.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.experienceList}>
            {experience.slice(0, -1).map((item) => (
              <ExperienceCard key={item.company} item={item} />
            ))}
            <div className={styles.experienceFinal}>
              <ExperienceCard item={experience[experience.length - 1]} />
              <p className={styles.cvNote}>CV available on request</p>
            </div>
          </div>
        </section>

        <section
          id="contact"
          ref={setSectionRef("contact")}
          data-section-id="contact"
          className={`${styles.section} ${styles.contactSection}`}
          aria-labelledby="contact-heading"
        >
          <h2 id="contact-heading">Let’s make something useful, considered, beautiful, and well made.</h2>
          <p>
            Email is best, but I’m also on LinkedIn. If good conversation happens over a chessboard
            or between padel points, you’ll find me there too.
          </p>
          <div className={styles.contactLinks}>
            <a href={MAILTO}>Email</a>
            <a href="https://www.linkedin.com/in/cgstratton/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://www.chess.com/member/strattonsphere" target="_blank" rel="noreferrer">
              Chess.com
            </a>
            <a
              href="https://app.playtomic.io/profile/user/5987380?utm_source=app_ios&utm_medium=share"
              target="_blank"
              rel="noreferrer"
            >
              Playtomic
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const eyebrow = `${shortCompany(study).toUpperCase()} · ${study.readTime ?? 5} MINUTE READ`;

  return (
    <article className={styles.caseStudyItem}>
      <div className={styles.caseAvatars}>
        {study.avatar && (
          <div className={styles.caseAvatar} aria-hidden="true">
            <Image src={study.avatar} alt="" width={80} height={80} unoptimized className={styles.avatarImage} />
          </div>
        )}
        <div className={styles.caseLogo} aria-hidden="true">
          {study.badge ? (
            <Image src={study.badge} alt="" fill sizes="80px" className={styles.logoImage} />
          ) : (
            <span>{shortCompany(study).slice(0, 2)}</span>
          )}
        </div>
      </div>
      <div className={styles.caseStudyCopy}>
        <div className={styles.caseStudyHeader}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h3>
            <Link href={`/work/${study.slug}`}>{study.title}</Link>
          </h3>
        </div>
        <p>{study.summary}</p>
        {study.typeBadges && study.typeBadges.length > 0 && (
          <ul className={styles.caseMeta}>
            {study.typeBadges.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function ExperienceCard({ item }: { item: Experience }) {
  return (
    <article className={styles.experienceItem}>
      <div className={styles.caseLogo} aria-hidden="true">
        {item.logo ? (
          <Image src={item.logo} alt="" fill sizes="80px" className={styles.logoImage} />
        ) : (
          <span>{item.company.slice(0, 2)}</span>
        )}
      </div>
      <div className={styles.experienceCopy}>
        <div className={styles.experienceHeader}>
          <div className={styles.experienceTitleGroup}>
            <p className={styles.company}>{item.company}</p>
            <h3>{item.title}</h3>
          </div>
          <ul className={styles.caseMeta}>
            <li>{item.years}</li>
            <li>{item.location}</li>
          </ul>
        </div>
        <p>{item.body}</p>
      </div>
    </article>
  );
}

function WorkMosaic() {
  return (
    <div className={styles.workMosaic} aria-label="Selected work imagery">
      {workMosaicImages.map((image) => (
        <figure
          key={image.id}
          className={`${styles.mosaicTile} ${styles[`mosaic_${image.id.replace(/-/g, "_")}`]}`}
          tabIndex={0}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 980px) 90vw, 900px"
            className={styles.mosaicImage}
          />
          <figcaption className={styles.mosaicTooltip}>{image.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function LandingGate({
  activeSection,
  onEnter,
}: {
  activeSection: SectionId;
  onEnter: () => void;
}) {
  return (
    <main className={`${styles.home} ${styles.landingGate}`} aria-label="Carl Stratton landing page">
      <LeftMenu activeSection={activeSection} onSelect={onEnter} />
      <button type="button" className={styles.landingButton} onClick={onEnter} aria-label="Enter homepage">
        <span>Carl Stratton</span>
        <span>Product Design</span>
        <span>User Experience</span>
        <span>Applied AI</span>
      </button>
    </main>
  );
}

function LeftMenu({
  activeSection,
  onSelect,
}: {
  activeSection: SectionId;
  onSelect: (id: SectionId) => void;
}) {
  return (
    <nav className={styles.leftMenu} aria-label="Homepage sections">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => onSelect(section.id)}
          aria-current={activeSection === section.id ? "true" : undefined}
          className={styles.menuItem}
          data-active={activeSection === section.id}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}
