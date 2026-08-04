import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import processMapImg from "@/assets/process-map.jpg";
import joelAvatar from "@/assets/joel-avatar.jpg";
import systemDemoVideo from "@/assets/demo/system-demo.mp4";
import wf1 from "@/assets/demo/workflow-01-lead-intake.webp";
import wf2 from "@/assets/demo/workflow-02-missing-details.webp";
import wf3 from "@/assets/demo/workflow-03-follow-up.webp";
import wf4 from "@/assets/demo/workflow-04-triage-booking.webp";
import wf5 from "@/assets/demo/workflow-05-alternative-slot.webp";
import wf6 from "@/assets/demo/workflow-06-reminders.webp";
import wf7 from "@/assets/demo/workflow-07-rescheduling-cancellation.webp";
import sampleFacebookWorkflow from "@/assets/demo/sample-facebook-page-agent.png";
import sampleTelegramWorkflow from "@/assets/demo/sample-telegram-ai-assistant.png";
import { n8nCertificate, promptEngineeringCertificate } from "@/assets/credentials/replacement-certificate-assets";
import makeCertificate from "@/assets/credentials/make-training-certificate.webp";
import zapierCertificate from "@/assets/credentials/zapier-training-certificate.webp";
import crmPipelineImg from "@/assets/projects/crm-lead-pipeline.png";
import leadEnrichmentImg from "@/assets/projects/lead-enrichment.png";
import contentRepurposingImg from "@/assets/projects/content-repurposing.png";
import intakeConfirmationImg from "@/assets/projects/intake-confirmation.png";
import appointmentRemindersImg from "@/assets/projects/appointment-reminders.png";
import documentFilingImg from "@/assets/projects/document-filing.png";
import financialReportingImg from "@/assets/projects/financial-reporting.png";


const PAGE_TITLE = "Dental Clinic Automation Specialist | Inquiry & Consultation Booking Systems";
const PAGE_DESC = "Workflow systems for orthodontic and cosmetic dental clinics: patient inquiry response, consultation booking, appointment reminders, staff notifications, and lead follow-up.";
const SITE_URL = "https://www.automatebancaya.com/";
const LINKEDIN_URL = "https://www.linkedin.com/in/joel-jay-bancaya-b4a718409/";
const SOCIAL_IMAGE = new URL(processMapImg, SITE_URL).href;
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": SITE_URL + "#joel-jay-bancaya",
      name: "Joel Jay Bancaya",
      url: SITE_URL,
      email: "mailto:Joeljaybancaya16@gmail.com",
      sameAs: [LINKEDIN_URL],
      address: { "@type": "PostalAddress", addressLocality: "Metro Manila", addressCountry: "PH" },
      jobTitle: "Dental Clinic AI Automation Specialist",
    },
    {
      "@type": "ProfessionalService",
      "@id": SITE_URL + "#automation-service",
      name: "Joel Jay Bancaya — Dental Clinic Workflow Systems",
      url: SITE_URL,
      email: "mailto:Joeljaybancaya16@gmail.com",
      areaServed: "Dental clinics",
      serviceType: "Dental clinic administrative workflow automation",
      founder: { "@id": SITE_URL + "#joel-jay-bancaya" },
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: SOCIAL_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:image", content: SOCIAL_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Home,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Solution", href: "#solution" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Demo", href: "#demo" },
  { label: "Sample Projects", href: "#sample-projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* ---------------- Reusable ---------------- */
function CtaPrimary({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`motion-interactive inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition hover:brightness-110 hover:shadow-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}
function CtaSecondary({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`motion-interactive inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-foreground/40 hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </a>
  );
}
function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}
function PlaceholderCallout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="placeholder-note">
      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Development Placeholder</div>
      <div className="mb-2 font-semibold text-foreground">{title}</div>
      <div className="text-sm leading-relaxed text-foreground/70">{children}</div>
    </div>
  );
}

/* ---------------- Theme toggle ---------------- */
function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    >
      {dark ? (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}


/* ---------------- Site motion ---------------- */
function SiteMotion() {
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const selector = "[data-scroll-reveal], [data-motion-card], [data-motion-media], [data-motion]";
    const items = Array.from(document.querySelectorAll<HTMLElement>(selector));

    root.classList.add("motion-ready");

    items.forEach((item) => {
      const parent = item.parentElement;
      if (!parent) return;
      const siblings = Array.from(parent.children).filter((child) => child.matches(selector));
      const position = Math.max(0, siblings.indexOf(item));
      item.style.setProperty("--motion-delay", String(Math.min(position * 70, 350)) + "ms");
    });

    let observer: IntersectionObserver | null = null;

    const revealItem = (item: Element) => {
      item.classList.add("motion-visible");
      observer?.unobserve(item);
    };

    const revealVisibleItems = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      items.forEach((item) => {
        if (item.classList.contains("motion-visible")) return;
        const rect = item.getBoundingClientRect();
        if (rect.top <= viewportHeight * 0.98 && rect.bottom >= 0) revealItem(item);
      });
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(revealItem);
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) revealItem(entry.target);
          });
        },
        { threshold: 0.01, rootMargin: "0px 0px 8% 0px" }
      );
      items.forEach((item) => observer?.observe(item));
      window.requestAnimationFrame(revealVisibleItems);
    }

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      revealVisibleItems();
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = "scaleX(" + String(progress) + ")";
      }
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("motion-ready");
    };
  }, []);

  return (
    <>
      <div
        ref={progressRef}
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-sky-400 via-brand to-cyan-300 shadow-[0_0_12px_rgba(14,165,233,.65)]"
      />
      <style>{"html{scrollbar-gutter:stable}html,body{max-width:100%;overflow-x:clip}html.motion-ready body{overflow-x:clip}html.motion-ready [data-scroll-reveal],html.motion-ready [data-motion-card],html.motion-ready [data-motion-media],html.motion-ready [data-motion]{opacity:0;translate:0 24px;transition:opacity 750ms cubic-bezier(.22,1,.36,1),translate 750ms cubic-bezier(.22,1,.36,1),scale 750ms cubic-bezier(.22,1,.36,1),rotate 750ms cubic-bezier(.22,1,.36,1),clip-path 950ms cubic-bezier(.22,1,.36,1),filter 650ms ease,box-shadow 300ms ease,border-color 300ms ease;transition-delay:var(--motion-delay,0ms)}html.motion-ready [data-motion-card]{translate:0 18px;scale:.985}html.motion-ready [data-motion=hero-copy]{translate:-46px 0}html.motion-ready [data-motion=hero-demo]{translate:46px 0;scale:.965}html.motion-ready [data-motion=breakdown-heading]{scale:.94;translate:0 14px}html.motion-ready [data-motion=solution-map]{translate:-40px 0;scale:.97}html.motion-ready [data-motion=solution-copy]{translate:42px 0}html.motion-ready [data-motion=process-heading]{translate:0 -28px}html.motion-ready [data-motion=demo-heading]{scale:.94;translate:0 18px}html.motion-ready [data-motion=demo-stage]{scale:.94;rotate:-.6deg}html.motion-ready [data-motion=demo-heading-secondary]{translate:0 30px}html.motion-ready [data-motion=demo-gallery]{translate:0 34px;scale:.97}html.motion-ready [data-motion=sample-heading]{scale:.94}html.motion-ready [data-motion=sample-left]{translate:-48px 0;rotate:-.7deg}html.motion-ready [data-motion=sample-right]{translate:48px 0;rotate:.7deg}html.motion-ready [data-motion=case-heading]{translate:0 -24px}html.motion-ready [data-motion=case-card]{scale:.9;filter:blur(5px)}html.motion-ready [data-motion=why-heading]{scale:.95;translate:0 18px}html.motion-ready [data-motion=why-callout]{translate:-38px 0}html.motion-ready [data-motion=why-tools]{translate:38px 0}html.motion-ready [data-motion=about-media]{translate:-48px 0;rotate:-1.5deg;scale:.95}html.motion-ready [data-motion=about-copy]{translate:48px 0}html.motion-ready [data-motion=credentials-heading]{translate:0 -24px}html.motion-ready [data-motion=credentials-stage]{translate:0 32px;scale:.98}html.motion-ready [data-motion=portfolio-heading]{translate:0 -24px}html.motion-ready [data-motion=portfolio-stage]{translate:0 32px;scale:.98}html.motion-ready [data-motion=faq-heading]{scale:.94}html.motion-ready [data-motion=faq-left]{translate:-38px 0}html.motion-ready [data-motion=faq-right]{translate:38px 0}html.motion-ready [data-motion=contact-copy]{translate:-48px 0}html.motion-ready [data-motion=contact-form]{translate:48px 0;scale:.97}html.motion-ready .motion-visible{opacity:1;translate:0 0;scale:1;rotate:0deg;clip-path:inset(0);filter:none}@media(hover:hover) and (pointer:fine){[data-motion-card].motion-visible:hover{translate:0 -7px;scale:1.015;border-color:color-mix(in oklab,var(--brand) 48%,transparent);box-shadow:0 20px 45px color-mix(in oklab,var(--brand) 18%,transparent)}[data-motion-media].motion-visible{overflow:hidden}[data-motion-media].motion-visible img{transition:scale 700ms cubic-bezier(.22,1,.36,1),filter 400ms ease}[data-motion-media].motion-visible:hover img{scale:1.025;filter:saturate(1.04) contrast(1.02)}.motion-interactive{transition-property:translate,scale,filter,box-shadow,background-color,border-color!important;transition-duration:220ms!important}.motion-interactive:hover{translate:0 -2px;scale:1.025}.motion-interactive:active{translate:0 0;scale:.98}}@media(prefers-reduced-motion:reduce){html.motion-ready [data-scroll-reveal],html.motion-ready [data-motion-card],html.motion-ready [data-motion-media],html.motion-ready [data-motion]{opacity:1!important;translate:0!important;scale:1!important;rotate:0deg!important;clip-path:inset(0)!important;filter:none!important;transition:none!important}.motion-interactive{transition:none!important}}"}</style>
    </>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const [open, setOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-card/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <a href="#home" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-brand shadow-md shadow-brand/25">
            <img src={joelAvatar} alt="Joel Jay Bancaya" className="h-full w-full object-cover" />
          </span>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-extrabold text-foreground sm:text-base">Joel Jay Bancaya</div>
            <div className="hidden text-[9px] font-medium uppercase leading-[1.2] tracking-[0.14em] text-muted-foreground sm:block">
              <span className="block">Dental Clinic</span>
              <span className="block whitespace-nowrap">AI Automation Specialist</span>
            </div>
          </div>
        </a>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary"
          onMouseLeave={() => setActiveNav(null)}
        >
          {NAV.map((n) => {
            const isFocused = activeNav === n.href;
            const isMuted = activeNav !== null && !isFocused;

            return (
              <a
                key={n.href}
                href={n.href}
                onMouseEnter={() => setActiveNav(n.href)}
                onFocus={() => setActiveNav(n.href)}
                onBlur={() => setActiveNav(null)}
                className={[
                  "relative isolate text-sm font-medium transition-[color,opacity,filter,scale,translate] duration-300 ease-out focus-visible:outline-none",
                  isFocused ? "z-10 -translate-y-1 scale-[1.1] text-brand opacity-100 blur-0" : "text-foreground/75",
                  isMuted ? "scale-[0.95] opacity-25 blur-[1.2px]" : "opacity-100",
                ].join(" ")}
              >
                <span
                  aria-hidden
                  className={[
                    "absolute -inset-x-3 -inset-y-2 -z-10 rounded-full border border-brand/25 bg-brand-soft/90 shadow-lg shadow-brand/20 transition-[opacity,scale] duration-300",
                    isFocused ? "scale-100 opacity-100" : "scale-75 opacity-0",
                  ].join(" ")}
                />
                <span className="relative">{n.label}</span>
                <span
                  aria-hidden
                  className={[
                    "absolute -bottom-2.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_10px_rgba(14,165,233,.65)] transition-transform duration-300",
                    isFocused ? "scale-x-100" : "scale-x-0",
                  ].join(" ")}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <CtaPrimary href="#contact">Request a Clinic Workflow Audit</CtaPrimary>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-lg border border-border text-foreground"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <><path d="M6 6l12 12"/><path d="M18 6l-12 12"/></> : <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-brand-soft">
                {n.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-brand px-4 py-3 text-center text-sm font-semibold text-brand-foreground">
              Request a Clinic Workflow Audit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}


/* ---------------- Hero ---------------- */
const DEMO_STEPS = [
  {
    tag: "New Inquiry",
    title: "New Inquiry Received",
    detail: "Patient interested in braces consultation",
    meta: "via clinic website form",
  },
  {
    tag: "Availability Checked",
    title: "Checking Schedule",
    detail: "Three suitable schedules found",
    meta: "Jul 22 · Jul 24 · Jul 26",
  },
  {
    tag: "Consultation Booked",
    title: "Consultation Booked",
    detail: "July 24 · 1:30 PM · Confirmed",
    meta: "Dr. Reyes · Orthodontics",
  },
  {
    tag: "Clinic Notified",
    title: "Clinic Notified",
    detail: "Calendar updated · Front desk notified",
    meta: "Staff alert sent",
  },
  {
    tag: "Follow-Up Scheduled",
    title: "Follow-Up Scheduled",
    detail: "Reminder scheduled 24 hours before",
    meta: "SMS + email reminder",
  },
];

const STEP_MS = 2000;
const RESTART_PAUSE_MS = 1200;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function DemoWorkflow() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setActive(DEMO_STEPS.length - 1);
      return;
    }
    if (!playing) return;
    const isLast = active === DEMO_STEPS.length - 1;
    const delay = isLast ? RESTART_PAUSE_MS : STEP_MS;
    timerRef.current = window.setTimeout(() => {
      setActive((i) => (i + 1) % DEMO_STEPS.length);
    }, delay);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [active, playing, reduced]);

  const showCompleted = reduced;
  const canControl = !reduced;

  return (
    <div
      className="relative rounded-3xl border border-border bg-card p-3 shadow-2xl shadow-brand/15 sm:p-4"
      role="group"
      aria-label="Animated demo of the inquiry-to-consultation workflow"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand">Demo Workflow</div>
            <div className="truncate text-sm font-semibold text-foreground">Inquiry → Consultation</div>
          </div>
        </div>
        {canControl && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause demo workflow animation" : "Play demo workflow animation"}
            aria-pressed={!playing}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-foreground/15 bg-card px-2.5 text-[11px] font-semibold text-foreground transition hover:border-foreground/40 hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {playing ? (
              <>
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                Pause
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                Play
              </>
            )}
          </button>
        )}
      </div>

      {/* Progress rail */}
      <ol className="mt-3 space-y-2" aria-live="polite">
        {DEMO_STEPS.map((step, i) => {
          const state = showCompleted || i < active ? "done" : i === active ? "active" : "upcoming";
          return (
            <li key={step.tag} className="relative">
              {i < DEMO_STEPS.length - 1 && (
                <span
                  aria-hidden
                  className={`absolute left-[15px] top-8 h-[calc(100%-4px)] w-0.5 rounded-full transition-colors duration-500 ${
                    state === "done" ? "bg-brand" : "bg-border"
                  }`}
                />
              )}
              <div
                className={`relative flex items-start gap-2.5 rounded-xl border p-2.5 transition-all duration-500 ${
                  state === "active"
                    ? "border-brand/40 bg-brand-soft/60 shadow-sm shadow-brand/10"
                    : state === "done"
                      ? "border-border bg-card"
                      : "border-border/70 bg-surface/60"
                }`}
              >
                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 transition-colors duration-500 ${
                    state === "done"
                      ? "border-brand bg-brand text-brand-foreground"
                      : state === "active"
                        ? "border-brand bg-card text-brand"
                        : "border-border bg-card text-foreground/40"
                  }`}
                  aria-hidden
                >
                  {state === "done" ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  ) : (
                    <span className="text-xs font-bold">{i + 1}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-[0.12em] ${
                        state === "upcoming" ? "text-foreground/40" : "text-brand"
                      }`}
                    >
                      {step.tag}
                    </span>
                    {state === "active" && !reduced && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-brand">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                        Processing
                      </span>
                    )}
                    {state === "done" && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50">Complete</span>
                    )}
                  </div>
                  <div className={`mt-0.5 truncate text-[13px] font-semibold leading-tight ${state === "upcoming" ? "text-foreground/50" : "text-foreground"}`}>
                    {step.title}
                  </div>
                  <div className={`truncate text-[11px] leading-tight ${state === "upcoming" ? "text-foreground/40" : "text-foreground/65"}`}>{step.detail}</div>
                  <div
                    aria-hidden
                    className={`mt-1.5 h-1 w-full overflow-hidden rounded-full bg-border ${state === "active" && !reduced ? "visible" : "invisible"}`}
                  >
                    {state === "active" && !reduced ? (
                      <div
                        key={active}
                        className="h-full rounded-full bg-brand"
                        style={{ animation: `demo-progress ${STEP_MS}ms linear forwards` }}
                      />
                    ) : (
                      <div className="h-full" />
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <style>{`@keyframes demo-progress { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-brand-soft/70 via-background to-background">
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-brand/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-32 h-[380px] w-[380px] rounded-full bg-brand/5 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:px-8 lg:py-20">
        <div data-motion="hero-copy" className="min-w-0">
          <SectionEyebrow>For orthodontic & cosmetic dental clinics</SectionEyebrow>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Turn More Dental Inquiries Into <span className="text-brand">Confirmed Consultations</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 dark:text-foreground/80 sm:text-lg">
            I build connected inquiry, consultation-booking, reminder, and follow-up systems that help dental clinics respond consistently, reduce administrative back-and-forth, and keep staff informed throughout the patient journey.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaPrimary href="#contact">Request a Clinic Workflow Audit</CtaPrimary>
            <CtaSecondary href="#how-it-works">See How the System Works</CtaSecondary>
          </div>
          <p className="mt-6 max-w-lg text-sm text-foreground/55 dark:text-foreground/70">
            Designed around your clinic's existing process, staff responsibilities, and appointment rules.
          </p>
        </div>

        <div data-motion="hero-demo" className="relative min-w-0 lg:w-full lg:max-w-[34rem] lg:justify-self-end">
          <DemoWorkflow />
        </div>
      </div>

    </section>
  );
}

/* ---------------- Problems ---------------- */
const PROBLEMS = [
  { icon: "⏱", title: "Slow or Missed Inquiry Responses", body: "Patients may contact several clinics at once. Delayed or inconsistent responses can cause qualified inquiries to go unanswered." },
  { icon: "↺", title: "Too Much Booking Back-and-Forth", body: "Staff spend time repeatedly checking dates, confirming details, and offering alternative consultation schedules." },
  { icon: "✕", title: "Unconfirmed Appointments and No-Shows", body: "Without consistent confirmation and reminder processes, consultation slots may remain uncertain or be missed." },
  { icon: "…", title: "Leads Receive No Structured Follow-Up", body: "Potential patients who inquire but do not immediately book can be forgotten when follow-up depends entirely on manual tracking." },
];
function Problems() {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div data-motion="breakdown-heading" className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Common breakdowns</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">Where Dental Clinics Commonly Lose Inquiries and Appointments</h2>
          <p className="mt-5 text-foreground/65">
            Small breakdowns in response, booking, confirmation, and follow-up can create unnecessary work for staff and a frustrating experience for potential patients.
          </p>
        </div>
        <div className="problem-sequence-grid mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((p, index) => (
            <div
              key={p.title}
              data-motion-card
              style={{ animationDelay: `${index * 1300}ms` }}
              className="sequence-card problem-sequence-card group relative rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-xl font-bold text-brand">{p.icon}</div>
              <h3 className="mt-5 text-lg font-bold text-foreground">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/65">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{"@keyframes problem-sequence-outline{0%,30%,100%{opacity:0;border-color:transparent;box-shadow:none}8%,22%{opacity:1;border-color:rgba(14,165,233,.68);box-shadow:0 0 0 1px rgba(14,165,233,.16),0 0 26px rgba(14,165,233,.24)}}@keyframes process-sequence-outline{0%,15%,100%{opacity:0;border-color:transparent;box-shadow:none}3%,10%{opacity:1;border-color:rgba(56,189,248,.78);box-shadow:0 0 0 1px rgba(56,189,248,.2),0 0 30px rgba(14,165,233,.3)}}.sequence-card::after{content:\"\";pointer-events:none;position:absolute;inset:-1px;z-index:5;border:1px solid transparent;border-radius:inherit;animation-delay:inherit}.problem-sequence-card::after{animation-name:problem-sequence-outline;animation-duration:5.2s;animation-timing-function:ease-in-out;animation-iteration-count:infinite}.process-sequence-card::after{animation-name:process-sequence-outline;animation-duration:10.4s;animation-timing-function:ease-in-out;animation-iteration-count:infinite}.problem-sequence-grid:hover .problem-sequence-card::after,.process-sequence-paused .process-sequence-card::after{animation:none;opacity:0}@media(prefers-reduced-motion:reduce){.problem-sequence-card::after,.process-sequence-card::after{animation:none!important;opacity:0!important}}"}</style>
    </section>
  );
}

/* ---------------- Flagship Solution ---------------- */
const SOLUTION_OUTCOMES = [
  {
    title: "Complete Patient Information",
    body: "Captures inquiry details, identifies missing information, and follows up when completion is needed.",
  },
  {
    title: "Smarter Consultation Scheduling",
    body: "Checks the preferred schedule, confirms available appointments, and offers alternatives when necessary.",
  },
  {
    title: "Clear Patient Communication",
    body: "Sends acknowledgements, booking confirmations, and scheduled appointment reminders.",
  },
  {
    title: "Staff Visibility and Control",
    body: "Notifies the clinic team, escalates special cases, and keeps appointment statuses organized.",
  },
];
function Solution() {
  return (
    <section id="solution" className="py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div data-motion="solution-copy" className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Flagship solution</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Dental Lead-to-Consultation System
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-base">
            Seven connected workflows coordinate inquiry capture, information recovery, scheduling, booking, reminders, and appointment changes.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="min-w-0">
            <div data-motion-media data-motion="solution-map" className="mx-auto w-full max-w-[31rem] rounded-3xl border border-border bg-white p-3 shadow-xl shadow-navy/5 sm:p-4">
              <img
                src={processMapImg}
                alt="Dental lead-to-consultation system process map: inquiry received, details completed, inquiry triaged, availability checked, appointment confirmed, patient reminded"
                loading="lazy"
                width={2048}
                height={2048}
                className="mx-auto block h-auto max-h-[31rem] w-full object-contain"
              />
            </div>
          </div>

          <div className="flex min-w-0 flex-col lg:min-h-[31rem]">
            <div className="grid gap-3 sm:grid-cols-2">
              {SOLUTION_OUTCOMES.map((o) => (
                <div key={o.title} data-motion-card className="rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/10">
                  <div className="mb-2.5 grid h-8 w-8 place-items-center rounded-lg bg-brand-soft text-brand">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l5 5L20 7"/></svg>
                  </div>
                  <h3 className="text-sm font-bold leading-snug text-foreground">{o.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-foreground/65">{o.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border-l-4 border-brand bg-brand-soft/50 p-4">
              <p className="text-xs font-medium leading-relaxed text-foreground sm:text-sm">
                Your clinic remains in control of appointment rules, messages, availability, exceptions, and staff handoffs.
              </p>
            </div>
            <div className="mt-4">
              <CtaPrimary href="#contact">Request a Clinic Workflow Audit</CtaPrimary>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------------- How It Works ---------------- */
const STEPS = [
  { t: "Review the Current Workflow", d: "Review inquiry sources, booking steps, clinic rules, follow-up, and staff handoffs." },
  { t: "Map Gaps and Requirements", d: "Identify delays, repetitive work, exceptions, approval points, and integration requirements." },
  { t: "Recommend a Practical Scope", d: "Present the clearest automation opportunity, workflow boundaries, and implementation priorities." },
  { t: "Build, Test, and Hand Over", d: "Only after scope approval, configure and test the system, document it, and guide the clinic team." },
];
function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-navy py-16 text-white lg:py-20">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div data-motion="process-heading" className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-card/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Working Process
          </span>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">What Happens After You Request an Audit</h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/65">
            The audit is the first step. It helps define the clearest next action and does not commit your clinic to a system build.
          </p>
        </div>

        <div className={["mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4", activeStep !== null ? "process-sequence-paused" : ""].join(" ")}>
          {STEPS.map((step, index) => {
            const stepNumber = index + 1;
            const isSelected = activeStep === stepNumber;
            const isMuted = activeStep !== null && !isSelected;

            return (
              <article
                key={step.t}
                style={{ animationDelay: `${index * 1300}ms` }}
                onMouseEnter={() => setActiveStep(stepNumber)}
                onMouseLeave={() => setActiveStep(null)}
                className={[
                  "process-sequence-card relative min-h-[14rem] rounded-3xl border bg-card/5 p-6 backdrop-blur-sm",
                  "transition-[transform,opacity,filter,background-color,border-color,box-shadow] duration-300 ease-out",
                  isSelected
                    ? "z-20 -translate-y-2 scale-[1.045] border-brand/80 bg-card/15 opacity-100 shadow-2xl shadow-brand/25 blur-0"
                    : "z-10 border-white/10",
                  isMuted ? "scale-[0.985] opacity-30 grayscale blur-[1.5px]" : "opacity-100",
                ].join(" ")}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className={[
                    "grid h-10 w-10 place-items-center rounded-xl text-sm font-bold transition-all duration-300",
                    isSelected ? "bg-white text-navy shadow-lg shadow-brand/30" : "bg-brand text-brand-foreground",
                  ].join(" ")}>
                    {String(stepNumber).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Step {stepNumber}</span>
                </div>
                <h3 className="text-base font-bold">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.d}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Demo ---------------- */
const DEMO_CHAPTERS = [
  { time: 0, label: "Inquiry and Validation", desc: "See how a patient inquiry is captured, validated, and prepared for the consultation journey." },
  { time: 25, label: "Missing Details and Follow-Up", desc: "See how incomplete information is recovered and unanswered inquiries receive controlled follow-up." },
  { time: 57, label: "Availability and Booking", desc: "See how clinic rules and calendar availability guide direct booking or suitable alternatives." },
  { time: 76, label: "Alternative Slots and Safe Confirmation", desc: "See how the patient's selected time is rechecked before the consultation is confirmed." },
  { time: 101, label: "Appointment Reminders", desc: "See how tracked 48-hour, 24-hour, and 2-hour reminders are sent without duplication." },
  { time: 115, label: "Rescheduling and Cancellation", desc: "See how confirmed patients can request a controlled schedule change or cancellation." },
];

const WORKFLOW_SLIDES = [
  {
    src: wf1,
    title: "Lead Intake and Validation",
    desc: "Captures each inquiry, validates the patient's contact and consultation details, and sends incomplete inquiries to a secure completion form.",
  },
  {
    src: wf2,
    title: "Missing Patient Details Completion",
    desc: "Lets the patient supply missing details, merges them into the same record, and marks valid inquiries ready for scheduling.",
  },
  {
    src: wf3,
    title: "Incomplete Intake Follow-Up",
    desc: "Checks incomplete inquiries on a schedule, sends limited follow-up emails, and flags unresponsive leads for staff review.",
  },
  {
    src: wf4,
    title: "Inquiry Triage, Availability and Direct Booking",
    desc: "Separates routine inquiries from cases needing staff review, checks the clinic calendar, and either books the preferred time or offers alternatives.",
  },
  {
    src: wf5,
    title: "Alternative Slot Selection and Rebooking",
    desc: "Lets the patient choose another time, rechecks availability before booking, confirms the consultation, and notifies the clinic.",
  },
  {
    src: wf6,
    title: "Appointment Reminder Sequence",
    desc: "Checks booked consultations and sends tracked 48-hour, 24-hour, and 2-hour reminders without duplicate messages.",
  },
  {
    src: wf7,
    title: "Appointment Rescheduling and Cancellation",
    desc: "Gives booked patients a controlled path to reschedule or cancel, updates the calendar and records, and notifies both the patient and clinic team.",
  },
];

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function Demo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [slide, setSlide] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const activeChapter = (() => {
    let idx = 0;
    for (let i = 0; i < DEMO_CHAPTERS.length; i++) {
      if (currentTime + 0.25 >= DEMO_CHAPTERS[i].time) idx = i;
    }
    return idx;
  })();

  const seekTo = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
    void video.play().catch(() => {});
  };

  const prev = useCallback(() => {
    setSlide((current) => (current - 1 + WORKFLOW_SLIDES.length) % WORKFLOW_SLIDES.length);
  }, []);

  const next = useCallback(() => {
    setSlide((current) => (current + 1) % WORKFLOW_SLIDES.length);
  }, []);

  useEffect(() => {
    if (!lightbox) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox, prev, next]);

  const onGalleryKey = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(distance) > 40) distance < 0 ? next() : prev();
    touchStartX.current = null;
  };

  const lightboxViewer = lightbox && typeof document !== "undefined"
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="workflow-lightbox-title"
          className="fixed inset-0 z-[120] grid place-items-center bg-navy/90 p-3 backdrop-blur-md sm:p-6"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setLightbox(false);
          }}
        >
          <div className="relative flex max-h-[94vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-navy shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-300">
                  Workflow {slide + 1} of {WORKFLOW_SLIDES.length}
                </div>
                <h3 id="workflow-lightbox-title" className="truncate text-sm font-bold text-white sm:text-base">
                  {WORKFLOW_SLIDES[slide].title}
                </h3>
              </div>
              <button
                type="button"
                autoFocus
                onClick={() => setLightbox(false)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close workflow screenshot"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="relative min-h-0 flex-1 bg-black/30">
              <img
                key={WORKFLOW_SLIDES[slide].src}
                src={WORKFLOW_SLIDES[slide].src}
                alt={WORKFLOW_SLIDES[slide].title}
                className="h-full max-h-[76vh] w-full object-contain"
              />
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-navy/80 text-white shadow-lg backdrop-blur transition hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-5"
                aria-label="Previous workflow screenshot"
              >
                <span aria-hidden className="text-xl">←</span>
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-navy/80 text-white shadow-lg backdrop-blur transition hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5"
                aria-label="Next workflow screenshot"
              >
                <span aria-hidden className="text-xl">→</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3 text-xs text-white/65 sm:px-5">
              <p className="line-clamp-2">{WORKFLOW_SLIDES[slide].desc}</p>
              <div className="hidden shrink-0 items-center gap-1.5 sm:flex" aria-hidden>
                {WORKFLOW_SLIDES.map((_, index) => (
                  <span key={index} className={`h-1.5 rounded-full ${index === slide ? "w-5 bg-sky-400" : "w-1.5 bg-white/25"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <section id="demo" className="relative overflow-hidden bg-surface py-16 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-32 bottom-40 h-96 w-96 rounded-full bg-sky-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div data-motion="demo-heading" className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>System Demo</SectionEyebrow>
            <h2 className="mt-5 text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
              See the Complete Patient Journey in Action
            </h2>
            <p className="mt-5 text-foreground/65">
              Watch how seven connected workflows move a patient from inquiry and validation through booking, reminders, rescheduling, or cancellation.
            </p>
          </div>

          <div data-motion="demo-stage" className="mx-auto mt-8 max-w-6xl">
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-lg shadow-navy/5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-40" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-brand" />
                </span>
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-foreground">Interactive System Walkthrough</div>
                  <div className="mt-0.5 text-xs text-foreground/50">Follow one patient across the complete administrative journey.</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em]">
                <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-foreground/65">7 Workflows</span>
                <span className="rounded-full bg-brand-soft px-3 py-1.5 text-brand">2:33 Demo</span>
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] lg:items-start lg:justify-center">
              <div data-motion-media className="w-full self-start rounded-[2rem] border border-white/10 bg-navy/95 p-3 shadow-xl shadow-navy/10 sm:p-4">
                <div className="aspect-square w-full overflow-hidden rounded-[1.35rem] bg-black shadow-2xl">
                  <video
                    ref={videoRef}
                    src={systemDemoVideo}
                    controls
                    playsInline
                    preload="metadata"
                    className="block h-full w-full object-contain"
                    onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                    aria-label="Dental Lead-to-Consultation System walkthrough"
                  />
                </div>
                <div className="flex flex-col gap-1 px-1 pb-1 pt-3 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span>Dental Lead-to-Consultation System</span>
                  <span>Fictional demonstration—not connected to a real clinic.</span>
                </div>
              </div>

              <aside className="self-start rounded-[2rem] border border-border bg-card p-4 shadow-xl shadow-navy/5 sm:p-5" aria-label="Video chapter navigation">
                <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Video Chapters</div>
                    <p className="mt-1.5 text-xs leading-relaxed text-foreground/60">Select a timestamp to jump directly to that part.</p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-brand-soft px-2.5 py-1.5 text-xs font-extrabold tabular-nums text-brand">
                    {activeChapter + 1}/{DEMO_CHAPTERS.length}
                  </span>
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
                  <div
                    className="h-full rounded-full bg-brand transition-[width] duration-500"
                    style={{ width: `${((activeChapter + 1) / DEMO_CHAPTERS.length) * 100}%` }}
                  />
                </div>

                <ol className="mt-4 grid grid-cols-2 gap-3" aria-label="Video chapters">
                  {DEMO_CHAPTERS.map((chapter, index) => {
                    const active = index === activeChapter;
                    return (
                      <li key={chapter.label}>
                        <button
                          type="button"
                          onClick={() => seekTo(chapter.time)}
                          aria-current={active ? "true" : undefined}
                          className={[
                            "group relative h-full min-h-[7.25rem] w-full overflow-hidden rounded-xl border px-3 py-3 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            active
                              ? "border-brand bg-brand-soft shadow-md shadow-brand/10"
                              : "border-border bg-surface/55 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand-soft/40",
                          ].join(" ")}
                        >
                          <span
                            aria-hidden
                            className={[
                              "absolute inset-y-0 left-0 w-1 bg-brand transition-opacity",
                              active ? "opacity-100" : "opacity-0",
                            ].join(" ")}
                          />
                          <div className="flex items-center justify-between gap-2">
                            <span className={[
                              "grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-extrabold transition",
                              active ? "bg-brand text-brand-foreground" : "bg-muted text-foreground/55 group-hover:text-brand",
                            ].join(" ")}>
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="text-[10px] font-bold tabular-nums text-brand">{formatTime(chapter.time)}</span>
                          </div>
                          <div className="mt-2 text-sm font-bold leading-tight text-foreground">{chapter.label}</div>
                          <p className="mt-1.5 line-clamp-2 text-[10px] leading-relaxed text-foreground/55">{chapter.desc}</p>
                        </button>
                      </li>
                    );
                  })}
                </ol>

              </aside>
            </div>
          </div>

          <div className="mt-14 lg:mt-20">
            <div data-motion="demo-heading-secondary" className="mx-auto max-w-3xl text-center">
              <SectionEyebrow>Behind the System</SectionEyebrow>
              <h3 className="mt-5 text-3xl font-extrabold text-foreground sm:text-4xl">
                Explore the Workflows Powering the Patient Journey
              </h3>
              <p className="mt-5 text-foreground/65">
                Follow the patient journey in order, from the first inquiry through booking, reminders, rescheduling, or cancellation. Use the arrows, keyboard controls, or swipe gesture to explore all seven workflows.
              </p>
            </div>

            <div
              ref={galleryRef}
              data-motion="demo-gallery"
              className="mx-auto mt-8 max-w-6xl rounded-[2rem] border border-border bg-card p-4 shadow-xl shadow-navy/5 focus:outline-none sm:p-6"
              tabIndex={0}
              role="region"
              aria-roledescription="carousel"
              aria-label="Workflow screenshot explorer"
              onKeyDown={onGalleryKey}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-stretch">
                <div className="flex min-w-0 flex-col">
                  <button
                    type="button"
                    onClick={() => setLightbox(true)}
                    className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/5 bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Open full-size screenshot ${slide + 1} of ${WORKFLOW_SLIDES.length}: ${WORKFLOW_SLIDES[slide].title}`}
                  >
                    <img
                      key={WORKFLOW_SLIDES[slide].src}
                      src={WORKFLOW_SLIDES[slide].src}
                      alt={WORKFLOW_SLIDES[slide].title}
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-contain transition duration-700 ease-out group-hover:scale-[1.02] group-hover:brightness-110"
                    />
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-70" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-4 sm:p-5">
                      <span className="rounded-full border border-white/15 bg-navy/75 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-300 backdrop-blur">
                        Click to enlarge
                      </span>
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-navy/75 text-white backdrop-blur transition group-hover:bg-brand">
                        ↗
                      </span>
                    </div>
                  </button>

                  <div className="flex flex-1 flex-col px-1 pt-5 sm:px-2">
                    <div className="text-xs font-semibold uppercase tracking-wider text-brand">
                      Workflow {slide + 1} of {WORKFLOW_SLIDES.length}
                    </div>
                    <h4 className="mt-1 text-xl font-extrabold text-foreground">{WORKFLOW_SLIDES[slide].title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/65">{WORKFLOW_SLIDES[slide].desc}</p>

                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface/60 p-3 sm:p-4">
                  <div className="mb-3 flex items-center justify-between gap-3 px-1">
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-foreground/55">Choose a Workflow</div>
                    <div className="text-xs font-bold tabular-nums text-brand">{slide + 1}/{WORKFLOW_SLIDES.length}</div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="tablist" aria-label="Workflow screenshot navigation">
                    {WORKFLOW_SLIDES.map((workflow, index) => {
                      const active = index === slide;
                      return (
                        <button
                          key={workflow.title}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setSlide(index)}
                          className={[
                            "flex min-h-[4.5rem] items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            index === WORKFLOW_SLIDES.length - 1 ? "sm:col-span-2" : "",
                            active
                              ? "border-brand bg-brand-soft shadow-sm"
                              : "border-transparent bg-card hover:border-brand/30 hover:bg-brand-soft/35",
                          ].join(" ")}
                        >
                          <span className={[
                            "grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-extrabold",
                            active ? "bg-brand text-brand-foreground" : "bg-muted text-foreground/50",
                          ].join(" ")}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="line-clamp-2 text-xs font-bold leading-snug text-foreground">{workflow.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxViewer}
    </>
  );
}

/* ---------------- Sample Projects ---------------- */
const SAMPLE_PROJECTS = [
  {
    label: "Sample Project 01",
    title: "24/7 AI Patient Chat Assistant (Messenger)",
    description:
      "A demonstration of how a dental clinic could respond to common Messenger inquiries after hours while keeping clinical questions and sensitive concerns with the clinic team.",
    features: [
      "Answers clinic-approved questions about services, hours, location, and consultation steps",
      "Collects contact details, treatment interest, and preferred appointment times",
      "Routes urgent, unusual, or clinical questions to a staff member",
      "Keeps inquiry details organized for front-desk follow-up",
    ],
    channel: "Facebook Messenger concept",
    image: sampleFacebookWorkflow,
    imageAlt: "Sample n8n workflow for a Facebook Messenger patient chat assistant",
  },
  {
    label: "Sample Project 02",
    title: "AI Front-Desk Assistant (Chat-Based Scheduling)",
    description:
      "A demonstration of a chat-based scheduling flow that could guide prospective patients from an initial inquiry to a requested consultation slot using clinic-defined rules.",
    features: [
      "Guides patients through a short, clinic-approved intake conversation",
      "Checks available consultation times and presents suitable options",
      "Collects missing details before confirming or handing off a request",
      "Prepares confirmations, reminders, and staff notifications",
    ],
    channel: "Website chat concept",
    image: sampleTelegramWorkflow,
    imageAlt: "Sample n8n workflow for a chat-based scheduling assistant connected to records and Google Calendar",
  },
];

function SampleProjectCard({ project, index }: { project: (typeof SAMPLE_PROJECTS)[number]; index: number }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const titleId = `sample-project-title-${index + 1}`;

  useEffect(() => {
    if (!previewOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [previewOpen]);

  return (
    <>
      <article
        data-motion-card
        data-motion={index === 0 ? "sample-left" : "sample-right"}
        aria-labelledby={titleId}
        className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-navy/5 transition-colors duration-300 hover:border-brand/40"
      >
        <div className="relative aspect-video overflow-hidden border-b border-border bg-navy">
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035] group-hover:brightness-110"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/5 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-navy/75 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-300 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Workflow preview
              </span>
            </div>
            <span className="rounded-full border border-white/15 bg-navy/75 px-3 py-1 text-[10px] font-semibold text-white/75 backdrop-blur">
              {String(index + 1).padStart(2, "0")} / {String(SAMPLE_PROJECTS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {project.label}
            </span>
            <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-semibold text-foreground/55">
              {project.channel}
            </span>
          </div>

          <h3 id={titleId} className="mt-5 text-xl font-extrabold leading-tight text-foreground sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-foreground/65">{project.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <div
                key={feature}
                className="flex min-h-[6.25rem] items-start gap-3 rounded-2xl border border-border/80 bg-surface/70 p-4 transition-colors duration-300 group-hover:bg-surface"
              >
                <span
                  aria-hidden
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-soft text-xs font-extrabold text-brand"
                >
                  ✓
                </span>
                <span className="text-xs leading-relaxed text-foreground/70 sm:text-[13px]">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="motion-interactive inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/20 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              View Full Workflow
              <span aria-hidden>↗</span>
            </button>
            <p className="mt-4 border-t border-border pt-4 text-center text-[11px] leading-relaxed text-foreground/50">
              Demonstration concept only — not a deployed client system or measured clinic result.
            </p>
          </div>
        </div>
      </article>

      {previewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[110] grid place-items-center bg-navy/85 p-4 backdrop-blur-md sm:p-8"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setPreviewOpen(false);
          }}
        >
          <div className="relative w-full max-w-7xl overflow-hidden rounded-2xl border border-white/15 bg-navy shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-300">{project.label}</div>
                <div className="truncate text-sm font-semibold text-white">{project.title}</div>
              </div>
              <button
                type="button"
                autoFocus
                onClick={() => setPreviewOpen(false)}
                aria-label="Close workflow preview"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-xl text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                ×
              </button>
            </div>
            <img
              src={project.image}
              alt={project.imageAlt}
              className="max-h-[78vh] w-full bg-navy object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

function SampleProjects() {
  return (
    <section id="sample-projects" className="relative overflow-hidden bg-surface/45 py-16 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute -left-36 top-24 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-16 h-96 w-96 rounded-full bg-sky-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div data-motion="sample-heading" className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Sample Projects</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
            Demonstration Systems for Dental Clinic Inquiries
          </h2>
          <p className="mt-5 text-foreground/65">
            Explore two practical workflow concepts designed around patient communication and consultation scheduling. Each example shows the structure behind the experience without presenting unverified client results.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {SAMPLE_PROJECTS.map((project, index) => (
            <SampleProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Case Study ---------------- */
/* ---------------- Why Work With Me ---------------- */
const VALUES = [
  { t: "Clinic-Specific Workflow Design", d: "The system is structured around your consultation process, treatment categories, operating hours, scheduling rules, and communication channels." },
  { t: "Human Handoff When Needed", d: "Unusual questions, sensitive concerns, and exceptions can be routed to the appropriate clinic staff member." },
  { t: "Clinic-Approved Communication", d: "Messages, follow-up rules, reminder timing, and patient instructions are reviewed and approved by the clinic." },
  { t: "Clear Inquiry and Appointment Tracking", d: "Staff can see where each inquiry stands without relying only on memory or scattered conversations." },
  { t: "Documentation and Staff Guidance", d: "The clinic receives clear documentation and guidance for using, reviewing, and managing the workflow." },
  { t: "Ongoing Monitoring and Support", d: "The workflow can be reviewed, maintained, and adjusted as clinic processes change." },
];
const TOOLS = ["Calendar", "Website Forms", "Email", "Messaging", "Appointment Records", "Staff Notifications"];
function MovingValueRow({
  values,
  direction,
}: {
  values: Array<(typeof VALUES)[number] & { number: number }>;
  direction: "right" | "left";
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeValue, setActiveValue] = useState<number | null>(null);
  const items = reducedMotion ? values : [...values, ...values];

  if (reducedMotion) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((value) => (
          <article key={value.number} className="min-h-[11.5rem] rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="text-xs font-bold text-brand">0{value.number}</div>
            <h3 className="mt-2 text-lg font-bold text-foreground">{value.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/65">{value.d}</p>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div
      className="why-values-row relative overflow-hidden py-5"
      onMouseLeave={() => setActiveValue(null)}
      aria-label={direction === "right" ? "Clinic value cards moving right" : "Clinic value cards moving left"}
    >
      <div
        className={[
          "why-values-marquee flex w-max gap-5",
          direction === "right" ? "why-values-right" : "why-values-left",
          activeValue !== null ? "why-values-paused" : "",
        ].join(" ")}
      >
        {items.map((value, copyIndex) => {
          const isSelected = activeValue === value.number;
          const isMuted = activeValue !== null && !isSelected;

          return (
            <article
              key={value.number + "-" + copyIndex}
              aria-hidden={copyIndex >= values.length}
              onMouseEnter={() => setActiveValue(value.number)}
              onMouseLeave={() => setActiveValue(null)}
              className={[
                "why-value-card relative min-h-[11.5rem] w-[min(82vw,25rem)] shrink-0 rounded-3xl border bg-card p-6 text-left shadow-sm",
                "transition-[transform,opacity,filter,box-shadow,border-color] duration-300 ease-out",
                isSelected
                  ? "z-10 -translate-y-1 scale-[1.045] border-brand/60 opacity-100 shadow-2xl shadow-brand/20 blur-0"
                  : "border-border",
                isMuted ? "scale-[0.98] opacity-35 grayscale blur-[1.5px]" : "opacity-100",
              ].join(" ")}
            >
              <div className="text-xs font-bold text-brand">0{value.number}</div>
              <h3 className="mt-2 text-lg font-bold text-foreground">{value.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/65">{value.d}</p>
            </article>
          );
        })}
      </div>

      <div
        aria-hidden
        className="pointer-events-auto absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-surface via-surface/85 to-transparent backdrop-blur-[2px] sm:w-24 lg:w-32"
      />
      <div
        aria-hidden
        className="pointer-events-auto absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-surface via-surface/85 to-transparent backdrop-blur-[2px] sm:w-24 lg:w-32"
      />
    </div>
  );
}

function AboutApproach() {
  const topValues = VALUES.slice(0, 3).map((value, index) => ({ ...value, number: index + 1 }));
  const bottomValues = VALUES.slice(3, 6).map((value, index) => ({ ...value, number: index + 4 }));

  return (
    <section id="about" className="bg-surface py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div data-motion="why-heading" className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>About My Approach</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
            Dental Workflow Systems Built Around Your Clinic
          </h2>
          <p className="mt-5 text-foreground/65">
            I specialize in practical workflow systems for orthodontic and cosmetic dental clinics. My approach starts by understanding your current inquiry, scheduling, communication, and staff-handoff process before recommending what should be automated.
          </p>
        </div>

        <div className="mt-8 space-y-1">
          <MovingValueRow values={topValues} direction="right" />
          <MovingValueRow values={bottomValues} direction="left" />
        </div>

        <style>{"@keyframes why-values-scroll-right{from{transform:translateX(calc(-50% - .625rem))}to{transform:translateX(0)}}@keyframes why-values-scroll-left{from{transform:translateX(0)}to{transform:translateX(calc(-50% - .625rem))}}.why-values-right{animation:why-values-scroll-right 22s linear infinite}.why-values-left{animation:why-values-scroll-left 24s linear infinite}.why-values-marquee{will-change:transform}.why-values-paused{animation-play-state:paused!important}@media(prefers-reduced-motion:reduce){.why-values-marquee{animation:none;transform:none}}"}</style>

        <div data-motion="why-tools" className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">Designed to Work With Your Existing Process</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/60">
                Depending on your clinic's setup, the workflow may connect with existing calendars, forms, email, messaging channels, appointment records, or clinic-management platforms.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((tool) => (
                <span key={tool} className="rounded-full border border-border bg-brand-soft/50 px-3.5 py-1.5 text-xs font-semibold text-foreground">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-7">
            <CtaPrimary href="#contact">Request a Clinic Workflow Audit</CtaPrimary>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Training credentials ---------------- */
const CREDENTIALS = [
  {
    id: "n8n",
    platform: "n8n",
    title: "AI Automation with n8n — Full Training",
    provider: "Tara AI Community / Technical Virtual Assistants PH",
    date: "July 5, 2026",
    image: n8nCertificate,
    imageZoom: 1.06,
    alt: "Certificate of completion for Joel Jay in AI Automation with n8n training",
  },
  {
    id: "make",
    platform: "Make.com",
    title: "No-Code Automation with Make.com — Full Training",
    provider: "Technical Virtual Assistants PH",
    date: "May 14, 2026",
    image: makeCertificate,
    imageZoom: 1,
    alt: "Certificate of completion for Joel Jay in No-Code Automation with Make.com training",
  },
  {
    id: "zapier",
    platform: "Zapier",
    title: "No-Code Automation with Zapier — Full Training",
    provider: "Technical Virtual Assistants PH",
    date: "May 4, 2026",
    image: zapierCertificate,
    imageZoom: 1,
    alt: "Certificate of completion for Joel Jay Bancaya in No-Code Automation with Zapier training",
  },
  {
    id: "prompt-engineering",
    platform: "Prompt Engineering",
    title: "Prompt Engineering — Full Training",
    provider: "Tara AI Community",
    date: "August 4, 2026",
    image: promptEngineeringCertificate,
    imageZoom: 1.06,
    alt: "Certificate of completion for Joel Jay in Prompt Engineering training",
  },
];

function Credentials() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeCredential, setActiveCredential] = useState<string | null>(null);
  const [selectedCredential, setSelectedCredential] = useState<(typeof CREDENTIALS)[number] | null>(null);
  const carouselItems = reducedMotion ? CREDENTIALS : [...CREDENTIALS, ...CREDENTIALS];

  useEffect(() => {
    if (!selectedCredential) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCredential(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedCredential]);

  return (
    <section id="credentials" className="overflow-hidden bg-surface py-16 lg:py-20">
      <div data-motion="credentials-heading" className="mx-auto max-w-7xl px-5 text-center lg:px-8">
        <SectionEyebrow>Training &amp; Credentials</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
          Training Across Leading Automation Platforms
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-foreground/70 sm:text-lg">
          Hands-on training in n8n, Make.com, Zapier, and prompt engineering covering workflow design,
          integrations, data processing, APIs, AI agents, and practical prompt techniques.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
          These are training-completion credentials issued by independent training providers.
          Practical workflow builds and demonstrations remain the primary proof of capability.
        </p>
      </div>

      <div
        data-motion="credentials-stage"
        className="credentials-stage mt-8 py-4"
        onMouseLeave={() => setActiveCredential(null)}
      >
        <div className={reducedMotion ? "mx-auto flex max-w-7xl snap-x gap-5 overflow-x-auto px-5 pb-4 lg:px-8" : "credentials-marquee flex w-max gap-5 px-5"}>
          {carouselItems.map((credential, index) => {
            const isClone = !reducedMotion && index >= CREDENTIALS.length;
            const isMuted = activeCredential !== null && activeCredential !== credential.id;
            return (
              <button
                key={credential.id + "-" + index}
                type="button"
                aria-hidden={isClone}
                tabIndex={isClone ? -1 : 0}
                onClick={() => setSelectedCredential(credential)}
                onMouseEnter={() => setActiveCredential(credential.id)}
                onFocus={() => setActiveCredential(credential.id)}
                onBlur={() => setActiveCredential(null)}
                aria-label={"View " + credential.platform + " training certificate"}
                className={[
                  "credential-card group w-[min(82vw,25rem)] shrink-0 snap-center overflow-hidden rounded-3xl border border-border bg-card text-left shadow-lg shadow-navy/5",
                  "transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.045] hover:border-brand/50 hover:shadow-2xl hover:shadow-brand/20",
                  "focus-visible:-translate-y-2 focus-visible:scale-[1.045] focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isMuted ? "scale-[0.98] opacity-40 grayscale blur-[1px]" : "opacity-100",
                ].join(" ")}
              >
                <div className="relative aspect-[1400/990] overflow-hidden bg-white">
                  <div
                    aria-hidden
                    className="absolute inset-0 transition duration-500 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
                  >
                    <div
                      className="absolute inset-0 bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url("${credential.image}")`,
                        backgroundSize: "100% 100%",
                        transform: `scale(${credential.imageZoom})`,
                        transformOrigin: "center",
                      }}
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-navy/90 via-navy/35 to-transparent px-5 pb-4 pt-16 text-white">
                    <span className="text-xs font-bold uppercase tracking-[0.16em]">View certificate</span>
                    <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-white/15 backdrop-blur">↗</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand">
                      {credential.platform}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">{credential.date}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{credential.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">Issued by {credential.provider}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style>{"@keyframes credentials-scroll-right{from{transform:translateX(calc(-50% - .625rem))}to{transform:translateX(0)}}.credentials-marquee{animation:credentials-scroll-right 18s linear infinite;will-change:transform}.credentials-stage:hover .credentials-marquee,.credentials-stage:focus-within .credentials-marquee{animation-play-state:paused}@media(prefers-reduced-motion:reduce){.credentials-marquee{animation:none;transform:none}}"}</style>

      {selectedCredential && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedCredential.platform + " training certificate"}
          className="fixed inset-0 z-[100] grid place-items-center bg-navy/80 p-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelectedCredential(null);
          }}
        >
          <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-card shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedCredential(null)}
              aria-label="Close certificate"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-navy/80 text-xl text-white shadow-lg transition hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              ×
            </button>
            <img
              src={selectedCredential.image}
              alt={selectedCredential.alt}
              width={1400}
              height={990}
              className="max-h-[86vh] w-full bg-white object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------- Cross-industry automation portfolio ---------------- */
const OTHER_PROJECTS = [
  {
    id: "crm-pipeline",
    name: "Automated Lead Pipeline & CRM Stages",
    platform: "Zapier",
    industry: "Sales & Agency Operations",
    summary:
      "A multi-step Zapier build that turns a task board into a working CRM, moving each lead through its stage with the right email, folder, and timed follow-up.",
    image: crmPipelineImg,
    alt: "Zapier workflow diagram of an automated lead pipeline with CRM stages",
  },
  {
    id: "lead-enrichment",
    name: "AI Lead Enrichment & Priority Routing",
    platform: "Zapier",
    industry: "B2B Sales",
    summary:
      "Form submissions are cleaned, enriched with company and role data, then routed so high-value prospects receive a personalised outreach email automatically.",
    image: leadEnrichmentImg,
    alt: "Zapier workflow diagram of AI lead enrichment and priority routing",
  },
  {
    id: "content-repurposing",
    name: "AI Content Repurposing Engine",
    platform: "Zapier",
    industry: "Marketing & Media",
    summary:
      "A single uploaded video is transcribed, rewritten into a long-form article, and reshaped into platform-ready social posts published without manual editing.",
    image: contentRepurposingImg,
    alt: "Zapier workflow diagram of an AI content repurposing engine",
  },
  {
    id: "intake-confirmation",
    name: "Instant Intake Confirmation & Team Alerts",
    platform: "Zapier",
    industry: "Service Businesses",
    summary:
      "Every submission triggers a branded acknowledgement to the customer, an internal alert to the team, and a clean record in a central spreadsheet.",
    image: intakeConfirmationImg,
    alt: "Zapier workflow diagram of instant intake confirmation and team alerts",
  },
  {
    id: "appointment-reminders",
    name: "Booking Confirmation & Reminder Sequence",
    platform: "Zapier",
    industry: "Consulting & Coaching",
    summary:
      "New bookings are logged, confirmed with a tailored message, and followed by a timed reminder before the meeting to reduce no-shows.",
    image: appointmentRemindersImg,
    alt: "Zapier workflow diagram of a booking confirmation and reminder sequence",
  },
  {
    id: "document-filing",
    name: "AI Document Filing & Audit Trail",
    platform: "Make.com",
    industry: "Finance & Administration",
    summary:
      "Incoming email attachments are read by an AI agent, renamed descriptively, filed into the correct drive folder, and logged for a complete audit trail.",
    image: documentFilingImg,
    alt: "Make.com scenario diagram of AI document filing with an audit trail",
  },
  {
    id: "financial-reporting",
    name: "Accounting-to-Project Reporting Bridge",
    platform: "Make.com",
    industry: "Finance & Operations",
    summary:
      "Live accounting transactions are pulled on demand, compiled into a clean CSV report, and delivered straight back into the relevant project task.",
    image: financialReportingImg,
    alt: "Make.com scenario diagram of an accounting to project reporting bridge",
  },
];

function OtherAutomationWork() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<(typeof OTHER_PROJECTS)[number] | null>(null);
  const carouselItems = reducedMotion ? OTHER_PROJECTS : [...OTHER_PROJECTS, ...OTHER_PROJECTS];

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedProject]);

  return (
    <section id="automation-portfolio" className="overflow-hidden bg-background py-16 lg:py-20">
      <div data-motion="portfolio-heading" className="mx-auto max-w-7xl px-5 text-center lg:px-8">
        <SectionEyebrow>Wider Automation Portfolio</SectionEyebrow>
        <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
          Automation Systems Built Outside Dental Clinics
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-foreground/70 sm:text-lg">
          Portfolio and demonstration systems built across sales, marketing, finance, support, and operations. The
          same engineering principles behind the clinic system — reliable intake, controlled
          follow-up, safe scheduling, and clear staff handoffs.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
          Select any project to view the full workflow architecture.
        </p>
      </div>

      <div
        data-motion="portfolio-stage"
        className="portfolio-stage mt-8 py-4"
        onMouseLeave={() => setActiveProject(null)}
      >
        <div className={reducedMotion ? "mx-auto flex max-w-7xl snap-x gap-5 overflow-x-auto px-5 pb-4 lg:px-8" : "portfolio-marquee flex w-max gap-5 px-5"}>
          {carouselItems.map((project, index) => {
            const isClone = !reducedMotion && index >= OTHER_PROJECTS.length;
            const isMuted = activeProject !== null && activeProject !== project.id;
            return (
              <button
                key={project.id + "-" + index}
                type="button"
                aria-hidden={isClone}
                tabIndex={isClone ? -1 : 0}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setActiveProject(project.id)}
                onFocus={() => setActiveProject(project.id)}
                onBlur={() => setActiveProject(null)}
                aria-label={"View workflow architecture for " + project.name}
                className={[
                  "group w-[min(82vw,24rem)] shrink-0 snap-center overflow-hidden rounded-3xl border border-border bg-card text-left shadow-lg shadow-navy/5",
                  "transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.04] hover:border-brand/50 hover:shadow-2xl hover:shadow-brand/20",
                  "focus-visible:-translate-y-2 focus-visible:scale-[1.04] focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isMuted ? "scale-[0.98] opacity-40 grayscale blur-[1px]" : "opacity-100",
                ].join(" ")}
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-white">
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    className="h-full w-full object-cover object-left-top transition duration-500 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-navy/90 via-navy/35 to-transparent px-5 pb-4 pt-16 text-white">
                    <span className="text-xs font-bold uppercase tracking-[0.16em]">View workflow</span>
                    <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-white/15 backdrop-blur">↗</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="inline-flex rounded-full border border-brand/25 bg-brand-soft/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                    Portfolio Project
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand">
                      {project.platform}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">{project.industry}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{project.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">{project.summary}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style>{"@keyframes portfolio-scroll-left{from{transform:translateX(0)}to{transform:translateX(calc(-50% - .625rem))}}.portfolio-marquee{animation:portfolio-scroll-left 60s linear infinite;will-change:transform}.portfolio-stage:hover .portfolio-marquee,.portfolio-stage:focus-within .portfolio-marquee{animation-play-state:paused}@media(prefers-reduced-motion:reduce){.portfolio-marquee{animation:none;transform:none}}"}</style>

      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.name + " workflow architecture"}
          className="fixed inset-0 z-[100] grid place-items-center bg-navy/80 p-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelectedProject(null);
          }}
        >
          <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-card shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close workflow preview"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-navy/80 text-xl text-white shadow-lg transition hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              ×
            </button>
            <img
              src={selectedProject.image}
              alt={selectedProject.alt}
              className="max-h-[70vh] w-full bg-white object-contain"
            />
            <div className="border-t border-border p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand">
                  {selectedProject.platform}
                </span>
                <span className="text-xs font-medium text-muted-foreground">{selectedProject.industry}</span>
              </div>
              <h3 className="mt-3 text-xl font-bold text-foreground">{selectedProject.name}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/70">{selectedProject.summary}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  { q: "Will this replace our receptionist?", a: "No. The system is designed to handle repetitive administrative steps and support your front-desk team. Staff remain responsible for patient care, exceptions, sensitive concerns, and situations that require human judgment." },
  { q: "Can it work with our existing calendar or tools?", a: "Possibly. Compatibility depends on the tools your clinic currently uses and the access they provide. The workflow audit identifies what can be connected and where a practical alternative may be needed." },
  { q: "What happens when a preferred time is unavailable?", a: "The workflow can suggest suitable alternative consultation times based on the clinic's availability, operating hours, appointment duration, and scheduling rules." },
  { q: "Can staff approve messages before they are sent?", a: "Yes. Approval steps can be included for selected messages, exceptions, or sensitive situations when the clinic wants staff review." },
  { q: "Can patients reschedule?", a: "A rescheduling process can be included based on the clinic's policies, notice requirements, available times, and staff approval rules." },
  { q: "How is patient information handled?", a: "The workflow should collect only the information needed for the administrative process. Access, storage, retention, and security must be reviewed based on the clinic's tools, policies, and applicable legal requirements." },
  { q: "How long does implementation take?", a: "The timeline depends on the number of communication channels, scheduling rules, approval steps, integrations, and testing requirements. A clearer estimate is provided after the workflow audit." },
  { q: "Do you provide ongoing support?", a: "Ongoing monitoring, maintenance, troubleshooting, and workflow improvements can be included based on the clinic's needs." },
];
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-surface py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <div data-motion="faq-heading" className="text-center">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
        </div>
        <div className="mt-8 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} data-motion-card data-motion={i % 2 === 0 ? "faq-left" : "faq-right"} className="overflow-hidden rounded-2xl border border-border bg-card">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="text-base font-semibold text-foreground sm:text-lg">{f.q}</span>
                  <span aria-hidden className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition ${isOpen ? "rotate-45" : ""}`}>
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-foreground/70">{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact / Final CTA ---------------- */
type FormState = {
  name: string; clinic: string; email: string; phone: string; website: string;
  clinicType: string; problem: string; channels: string; contactMethod: string; notes: string;
};
const CLINIC_TYPES = ["Orthodontic Clinic", "Cosmetic Dental Clinic", "General Dental Clinic", "Multi-Specialty Dental Clinic", "Other"];
const PROBLEMS_OPTS = ["Slow Inquiry Response", "Appointment Booking", "Unconfirmed Consultations", "No-Shows", "Lead Follow-Up", "Front-Desk Workload", "Inquiry Tracking", "Other"];
const CONTACT_METHODS = ["Email", "Phone Call", "Messaging App"];

function Contact() {
  const empty: FormState = { name: "", clinic: "", email: "", phone: "", website: "", clinicType: "", problem: "", channels: "", contactMethod: "", notes: "" };
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  }
  function validate() {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.clinic.trim()) e.clinic = "Please enter your clinic name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (!form.clinicType) e.clinicType = "Please select a clinic type.";
    if (!form.problem) e.problem = "Please select a main problem.";
    if (!form.contactMethod) e.contactMethod = "Please select a contact method.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  async function submit(ev: FormEvent) {
    ev.preventDefault();
    if (status === "loading") return;
    if (!validate()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("https://n8n.automatebancaya.com/webhook/405f03ec-b691-4abb-a0ff-16cf5419bada", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "Website Workflow Audit Form",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const inputCls = "w-full rounded-xl border border-white/15 bg-card/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-brand focus:bg-card/10";
  const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70";
  const errCls = "mt-1 text-xs text-red-300";

  return (
    <section id="contact" className="relative overflow-hidden bg-navy py-16 text-white lg:py-20">
      <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-brand/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-[380px] w-[380px] rounded-full bg-brand/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-start gap-8 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <div data-motion="contact-copy">
          <span className="inline-flex items-center gap-2 rounded-full bg-card/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Workflow audit
          </span>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">Request a Clinic Workflow Audit</h2>
          <p className="mt-5 text-white/70">
            Share your current inquiry and appointment process so I can identify practical workflow gaps, integration opportunities, and the clearest next step.
          </p>
          <p className="mt-3 text-sm text-white/60">
            After submission, I will review your workflow information and contact you using your preferred method.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/80">
            {[
              "Review of current inquiry & booking flow",
              "Identification of common leaks and delays",
              "Practical workflow recommendations",
              "Clear scope for a possible next step",
            ].map((x) => (
              <li key={x} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-xs font-bold">✓</span>
                {x}
              </li>
            ))}
          </ul>
        </div>

        <form data-motion="contact-form" onSubmit={submit} noValidate className="rounded-3xl border border-white/10 bg-card/[0.03] p-6 shadow-2xl backdrop-blur sm:p-8">
          {status === "success" ? (
            <div className="grid place-items-center py-16 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-brand text-2xl">✓</div>
              <h3 className="mt-6 text-xl font-bold">Thank you.</h3>
              <p className="mt-3 max-w-md text-sm text-white/70">
                Your clinic workflow details have been received. I will review the information and contact you using your preferred method.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelCls}>Full Name <span className="text-brand">*</span></label>
                  <input id="name" name="name" autoComplete="name" className={inputCls} value={form.name} onChange={(e) => update("name", e.target.value)} aria-invalid={!!errors.name} required />
                  {errors.name && <p className={errCls}>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="clinic" className={labelCls}>Clinic Name <span className="text-brand">*</span></label>
                  <input id="clinic" name="clinic" autoComplete="organization" className={inputCls} value={form.clinic} onChange={(e) => update("clinic", e.target.value)} aria-invalid={!!errors.clinic} required />
                  {errors.clinic && <p className={errCls}>{errors.clinic}</p>}
                </div>
                <div>
                  <label htmlFor="email" className={labelCls}>Work Email <span className="text-brand">*</span></label>
                  <input id="email" name="email" type="email" autoComplete="email" className={inputCls} value={form.email} onChange={(e) => update("email", e.target.value)} aria-invalid={!!errors.email} required />
                  {errors.email && <p className={errCls}>{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className={labelCls}>Phone Number</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputCls} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="website" className={labelCls}>Clinic Website or Facebook Page</label>
                  <input id="website" name="website" autoComplete="url" className={inputCls} value={form.website} onChange={(e) => update("website", e.target.value)} />
                </div>
                <div>
                  <label htmlFor="clinicType" className={labelCls}>Clinic Type <span className="text-brand">*</span></label>
                  <select id="clinicType" name="clinicType" className={inputCls} value={form.clinicType} onChange={(e) => update("clinicType", e.target.value)} required>
                    <option value="" className="bg-navy">Select…</option>
                    {CLINIC_TYPES.map((c) => <option key={c} value={c} className="bg-navy">{c}</option>)}
                  </select>
                  {errors.clinicType && <p className={errCls}>{errors.clinicType}</p>}
                </div>
                <div>
                  <label htmlFor="problem" className={labelCls}>Main Operational Problem <span className="text-brand">*</span></label>
                  <select id="problem" name="problem" className={inputCls} value={form.problem} onChange={(e) => update("problem", e.target.value)} required>
                    <option value="" className="bg-navy">Select…</option>
                    {PROBLEMS_OPTS.map((c) => <option key={c} value={c} className="bg-navy">{c}</option>)}
                  </select>
                  {errors.problem && <p className={errCls}>{errors.problem}</p>}
                </div>
                <div>
                  <label htmlFor="channels" className={labelCls}>Current Inquiry Channels</label>
                  <input id="channels" name="channels" className={inputCls} placeholder="e.g. Website, Facebook, Email" value={form.channels} onChange={(e) => update("channels", e.target.value)} />
                </div>
                <div>
                  <label htmlFor="contactMethod" className={labelCls}>Preferred Contact Method <span className="text-brand">*</span></label>
                  <select id="contactMethod" name="contactMethod" className={inputCls} value={form.contactMethod} onChange={(e) => update("contactMethod", e.target.value)} required>
                    <option value="" className="bg-navy">Select…</option>
                    {CONTACT_METHODS.map((c) => <option key={c} value={c} className="bg-navy">{c}</option>)}
                  </select>
                  {errors.contactMethod && <p className={errCls}>{errors.contactMethod}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className={labelCls}>Additional Notes</label>
                  <textarea id="notes" name="notes" rows={4} className={inputCls} value={form.notes} onChange={(e) => update("notes", e.target.value)} />
                </div>
              </div>
              {status === "error" && (
                <div role="alert" className="mt-6 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  <span className="font-semibold">We couldn't send your request.</span> {errorMsg} Your details are still here — please try again.
                </div>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                aria-busy={status === "loading"}
                className="motion-interactive mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/30 transition hover:brightness-110 disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : status === "error" ? "Retry Sending" : "Request a Clinic Workflow Audit"}
                <span aria-hidden>→</span>
              </button>
              <p className="mt-3 text-center text-xs text-white/50">
                Fields marked <span className="text-brand">*</span> are required.
              </p>
              <p className="mt-2 text-center text-xs text-white/50">
                By submitting this form, you acknowledge the{" "}
                <a href="/privacy" className="font-semibold text-sky-300 underline-offset-4 hover:underline">Privacy Policy</a>.
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-8 text-white/70">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-brand">
                <img src={joelAvatar} alt="Joel Jay Bancaya" className="h-full w-full object-cover" />
              </span>
              <span className="text-base font-extrabold text-white">Joel Jay Bancaya</span>
            </div>
            <p className="mt-4 max-w-md text-sm">Workflow systems for orthodontic and cosmetic dental clinics.</p>
            <div className="mt-6 space-y-1.5 text-sm">
              <div><a href="mailto:Joeljaybancaya16@gmail.com" className="hover:text-white">Joeljaybancaya16@gmail.com</a></div>
              <div><a href="tel:+639310905178" className="hover:text-white">+63 931 090 5178</a></div>
              <div>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  LinkedIn: Joel Jay Bancaya
                </a>
              </div>
              <div>Metro Manila, Philippines</div>
            </div>

          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white">Navigate</div>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((n) => <li key={n.href}><a href={n.href} className="hover:text-white">{n.label}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white">Legal</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 rounded-2xl border border-white/10 bg-card/[0.03] p-5 text-xs leading-relaxed text-white/60">
          This website describes administrative workflow and automation services. It does not provide dental, medical, legal, or regulatory advice.
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Joel Jay Bancaya. All rights reserved.</div>
          <div>Dental clinic workflow systems</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */
function Home() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
      <SiteMotion />
      <Header />
      <main>
        <Hero />
        <Problems />
        <Solution />
        <HowItWorks />
        <Demo />
        <SampleProjects />
        <AboutApproach />
        <Credentials />
        <OtherAutomationWork />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
