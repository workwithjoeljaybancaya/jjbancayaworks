import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import aboutImg from "@/assets/about-clinic.jpg";
import solutionImg from "@/assets/solution-clinic.jpg";
import joelAvatar from "@/assets/joel-avatar.jpg.asset.json";

const PAGE_TITLE = "Dental Clinic Automation Specialist | Inquiry & Consultation Booking Systems";
const PAGE_DESC = "Workflow systems for orthodontic and cosmetic dental clinics: patient inquiry response, consultation booking, appointment reminders, staff notifications, and lead follow-up.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Solution", href: "#solution" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Demo", href: "#demo" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* ---------------- Reusable ---------------- */
function CtaPrimary({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition hover:brightness-110 hover:shadow-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
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
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:border-navy/40 hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
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
      <div className="mb-2 font-semibold text-navy">{title}</div>
      <div className="text-sm leading-relaxed text-navy/70">{children}</div>
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <a href="#home" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-brand shadow-md shadow-brand/25">
            <img src={joelAvatar.url} alt="Joel Jay Bancaya" className="h-full w-full object-cover" />
          </span>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-extrabold text-navy sm:text-base">Joel Jay Bancaya</div>
            <div className="hidden text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:block">Dental Clinic Workflow Systems</div>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-navy/75 transition hover:text-brand">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CtaPrimary href="#contact">Book a Workflow Audit</CtaPrimary>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-lg border border-border text-navy lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <><path d="M6 6l12 12"/><path d="M18 6l-12 12"/></> : <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-navy hover:bg-brand-soft">
                {n.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-brand px-4 py-3 text-center text-sm font-semibold text-brand-foreground">
              Book a Workflow Audit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
const WORKFLOW = ["Patient Inquiry", "Qualification", "Availability Check", "Consultation Booking", "Confirmation", "Reminder", "Follow-Up"];

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
      className="relative rounded-3xl border border-border bg-white p-5 shadow-2xl shadow-brand/15 sm:p-6"
      role="group"
      aria-label="Animated demo of the inquiry-to-consultation workflow"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand">Demo Workflow</div>
            <div className="truncate text-sm font-semibold text-navy">Inquiry → Consultation</div>
          </div>
        </div>
        {canControl && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause demo workflow animation" : "Play demo workflow animation"}
            aria-pressed={!playing}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-navy/15 bg-white px-3 text-xs font-semibold text-navy transition hover:border-navy/40 hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
      <ol className="mt-5 space-y-3" aria-live="polite">
        {DEMO_STEPS.map((step, i) => {
          const state = showCompleted || i < active ? "done" : i === active ? "active" : "upcoming";
          return (
            <li key={step.tag} className="relative">
              {i < DEMO_STEPS.length - 1 && (
                <span
                  aria-hidden
                  className={`absolute left-[19px] top-10 h-[calc(100%-8px)] w-0.5 rounded-full transition-colors duration-500 ${
                    state === "done" ? "bg-brand" : "bg-border"
                  }`}
                />
              )}
              <div
                className={`relative flex items-start gap-3 rounded-2xl border p-3.5 transition-all duration-500 ${
                  state === "active"
                    ? "border-brand/40 bg-brand-soft/60 shadow-sm shadow-brand/10"
                    : state === "done"
                      ? "border-border bg-white"
                      : "border-border/70 bg-surface/60"
                }`}
              >
                <div
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 transition-colors duration-500 ${
                    state === "done"
                      ? "border-brand bg-brand text-brand-foreground"
                      : state === "active"
                        ? "border-brand bg-white text-brand"
                        : "border-border bg-white text-navy/40"
                  }`}
                  aria-hidden
                >
                  {state === "done" ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-bold">{i + 1}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-[0.14em] ${
                        state === "upcoming" ? "text-navy/40" : "text-brand"
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
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-navy/50">Complete</span>
                    )}
                  </div>
                  <div className={`mt-0.5 truncate text-sm font-semibold ${state === "upcoming" ? "text-navy/50" : "text-navy"}`}>
                    {step.title}
                  </div>
                  <div className={`text-xs ${state === "upcoming" ? "text-navy/40" : "text-navy/65"}`}>{step.detail}</div>
                  {state !== "upcoming" && (
                    <div className="mt-1 text-[11px] text-navy/45">{step.meta}</div>
                  )}
                  {state === "active" && !reduced && (
                    <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-brand"
                        style={{ animation: `demo-progress ${STEP_MS}ms linear forwards` }}
                      />
                    </div>
                  )}
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
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-brand-soft/70 via-white to-white">
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-brand/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-32 h-[380px] w-[380px] rounded-full bg-brand/5 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8 lg:py-24">
        <div className="min-w-0">
          <SectionEyebrow>For orthodontic & cosmetic dental clinics</SectionEyebrow>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] text-navy sm:text-5xl lg:text-6xl">
            Turn More Dental Inquiries Into <span className="text-brand">Confirmed Consultations</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy/70 sm:text-lg">
            I build connected inquiry, consultation-booking, reminder, and follow-up systems that help dental clinics respond consistently, reduce administrative back-and-forth, and keep staff informed throughout the patient journey.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaPrimary href="#contact">Book a Clinic Workflow Audit</CtaPrimary>
            <CtaSecondary href="#how-it-works">See How the System Works</CtaSecondary>
          </div>
          <p className="mt-6 max-w-lg text-sm text-navy/55">
            Designed around your clinic's existing process, staff responsibilities, and appointment rules.
          </p>
        </div>

        <div className="relative min-w-0">
          <DemoWorkflow />
        </div>
      </div>

      {/* Workflow strip */}
      <div className="mx-auto max-w-7xl px-5 pb-16 lg:px-8 lg:pb-24">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-lg shadow-navy/5 sm:p-8">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-navy/60">Inquiry-to-Consultation Workflow</div>
          <ol className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-2">
            {WORKFLOW.map((step, i) => (
              <li key={step} className="flex items-center gap-2 lg:flex-1">
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-brand-soft/40 px-3.5 py-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-brand-foreground">{i + 1}</span>
                  <span className="text-sm font-semibold text-navy">{step}</span>
                </div>
                {i < WORKFLOW.length - 1 && <span aria-hidden className="hidden text-brand lg:inline">→</span>}
              </li>
            ))}
          </ol>
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
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Common breakdowns</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl">Where Dental Clinics Commonly Lose Inquiries and Appointments</h2>
          <p className="mt-5 text-navy/65">
            Small breakdowns in response, booking, confirmation, and follow-up can create unnecessary work for staff and a frustrating experience for potential patients.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="group rounded-3xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-xl font-bold text-brand">{p.icon}</div>
              <h3 className="mt-5 text-lg font-bold text-navy">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy/65">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Flagship Solution ---------------- */
const SOLUTION_ITEMS = [
  "Capture patient inquiries from connected channels",
  "Respond promptly using clinic-approved messaging",
  "Collect contact details and treatment interest",
  "Identify new vs. returning patients",
  "Check consultation availability against clinic rules",
  "Book preferred times, suggest alternatives when unavailable",
  "Send confirmations and scheduled reminders",
  "Allow rescheduling based on clinic policy",
  "Notify staff and record appointment status",
  "Structured follow-up for unbooked leads",
  "Escalate unusual requests to a staff member",
];
function Solution() {
  return (
    <section id="solution" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-3xl border border-border shadow-xl shadow-navy/5">
            <img src={solutionImg} alt="Clean modern dental consultation room" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden max-w-[260px] rounded-2xl border border-border bg-white p-5 shadow-2xl shadow-navy/10 sm:block">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand">Connected workflow</div>
            <div className="mt-2 text-sm font-semibold text-navy">One system from inquiry to follow-up</div>
          </div>
        </div>

        <div className="order-1 min-w-0 lg:order-2">
          <SectionEyebrow>Flagship solution</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl">Dental Lead-to-Consultation System</h2>
          <p className="mt-5 text-navy/70">
            One connected workflow for handling a patient inquiry from first contact through consultation booking and follow-up.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {SOLUTION_ITEMS.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-border bg-white p-3.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-[11px] font-bold text-brand-foreground">✓</span>
                <span className="text-sm leading-snug text-navy/80">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border-l-4 border-brand bg-brand-soft/50 p-5">
            <p className="text-sm font-medium text-navy">
              Your clinic remains in control of appointment rules, messages, availability, exceptions, and staff handoffs.
            </p>
          </div>
          <div className="mt-8">
            <CtaPrimary href="#contact">Review My Clinic's Current Workflow</CtaPrimary>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- How It Works ---------------- */
const STEPS = [
  { t: "Patient Sends an Inquiry", d: "An inquiry arrives through a connected website form, messaging channel, email, or another supported source." },
  { t: "The System Responds", d: "The patient receives an immediate clinic-approved response and is guided through the next required details." },
  { t: "Patient Details Are Collected", d: "The workflow records contact information, treatment interest, patient type, and preferred consultation schedule." },
  { t: "Availability Is Checked", d: "The system checks the clinic's appointment rules and available consultation times." },
  { t: "The Consultation Is Booked", d: "An available preferred time is booked. When it is unavailable, the patient receives suitable alternative options." },
  { t: "Confirmation and Reminders Are Sent", d: "The patient receives clear appointment information and scheduled reminders based on the clinic's process." },
  { t: "Clinic Staff Are Updated", d: "Relevant staff receive the inquiry, appointment, and follow-up status without manually checking multiple channels." },
  { t: "Unbooked Leads Receive Follow-Up", d: "Patients who do not complete the booking process receive structured follow-up or are handed over to clinic staff." },
];
function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-navy py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Process
          </span>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">How the Inquiry-to-Consultation Workflow Works</h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.t} className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Step {i + 1}</span>
              </div>
              <h3 className="text-base font-bold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.d}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-3xl text-center text-sm text-white/60">
          The final workflow is customized to the clinic's services, operating hours, appointment rules, communication channels, and staff responsibilities.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Demo ---------------- */
function Demo() {
  return (
    <section id="demo" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>System demo</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl">See the System in Action</h2>
          <p className="mt-5 text-navy/65">
            A demonstration environment can show how a patient inquiry moves through qualification, availability checking, booking, reminders, staff notification, and follow-up.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-border bg-white p-4 shadow-lg shadow-navy/5">
            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-brand text-white">
              <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 30% 30%, white, transparent 40%)" }} />
              <button
                type="button"
                className="relative grid h-20 w-20 place-items-center rounded-full bg-white/95 text-navy shadow-2xl transition hover:scale-105"
                aria-label="View demonstration"
              >
                <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <div className="absolute bottom-5 left-5 text-left">
                <div className="text-xs font-semibold uppercase tracking-widest text-white/70">Demonstration</div>
                <div className="text-lg font-bold">Inquiry → Consultation walkthrough</div>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-navy/60">Sample flow. Not tied to a real clinic.</p>
              <CtaSecondary href="#contact">View Demonstration</CtaSecondary>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              { l: "Patient Inquiry", v: "Interested in Invisalign consultation" },
              { l: "Available Schedule", v: "Tue 2:30 PM · Thu 10:00 AM · Sat 9:15 AM" },
              { l: "Booking Confirmation", v: "Thu, 10:00 AM · Confirmed" },
              { l: "Staff Notification", v: "New consultation added to schedule" },
            ].map((c) => (
              <div key={c.l} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-brand">{c.l}</div>
                <div className="mt-1 text-sm font-semibold text-navy">{c.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <PlaceholderCallout title="Add a short video or screenshots showing the complete inquiry-to-consultation workflow.">
            The demonstration should include: sample patient inquiry, detail collection, treatment interest, preferred schedule, availability check, alternative time suggestions, booking confirmation, reminder example, staff notification, and appointment status tracking. Label all sample content as a demonstration system until implemented for a real dental clinic.
          </PlaceholderCallout>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Case Study ---------------- */
function CaseStudy() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Results & case studies</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl">Clinic Results and Case Studies</h2>
          <p className="mt-5 text-navy/65">
            Verified results will be added after the system has been implemented and measured in a real dental clinic environment.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-4xl">
          <PlaceholderCallout title="Add a real dental clinic case study after completing a project.">
            Include: clinic type, original process, main bottleneck, system implemented, channels connected, response-time improvement, consultations booked, confirmation rate, no-show reduction, staff time saved, follow-up improvement, implementation period, verified testimonial, and client permission for any names, images, or data shown. Leave the primary case-study area intentionally empty until real data is available.
          </PlaceholderCallout>
        </div>
      </div>
    </section>
  );
}

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
function WhyWorkWithMe() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Why work with me</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl">Built Around How Your Clinic Already Works</h2>
          <p className="mt-5 text-navy/65">
            The goal is not to force your clinic into a generic system. The workflow should support your existing process, staff responsibilities, patient communication style, and appointment rules.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <div key={v.t} className="rounded-3xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/10">
              <div className="text-xs font-bold text-brand">0{i + 1}</div>
              <h3 className="mt-2 text-lg font-bold text-navy">{v.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy/65">{v.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border-l-4 border-brand bg-white p-5 shadow-sm">
          <p className="text-sm text-navy/80">
            <span className="font-semibold text-navy">Important:</span> The system supports administrative processes. It does not replace clinical judgment, diagnosis, treatment decisions, or professional patient care.
          </p>
        </div>

        <div className="mt-14 rounded-3xl border border-border bg-white p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-bold text-navy">Designed to Work With Your Existing Process</h3>
              <p className="mt-2 max-w-2xl text-sm text-navy/60">
                Depending on the clinic's current setup, the workflow may connect with existing calendars, forms, email, messaging channels, spreadsheets, booking tools, or clinic-management platforms.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((t) => (
                <span key={t} className="rounded-full border border-border bg-brand-soft/50 px-3.5 py-1.5 text-xs font-semibold text-navy">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-border shadow-xl shadow-navy/5">
            <img src={aboutImg} alt="Front-desk staff coordinating patient scheduling" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
          </div>
          <div className="mt-4 text-xs text-navy/50">
            PLACEHOLDER: Replace this image with a professional portrait that matches the website's clean healthcare style.
          </div>
        </div>
        <div className="min-w-0">
          <SectionEyebrow>About</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl">Focused on Better Dental Clinic Workflows</h2>
          <div className="mt-6 space-y-4 text-navy/70">
            <p>I specialize in building practical workflow systems for orthodontic and cosmetic dental clinics.</p>
            <p>My approach begins with understanding how the clinic currently handles patient inquiries, consultation booking, appointment confirmation, reminders, follow-up, and staff handoffs.</p>
            <p>The goal is to reduce repetitive administrative work, create a more consistent patient communication process, and give clinic staff clearer visibility over inquiries and appointments.</p>
            <p>Each system is designed around the clinic's existing operations rather than forcing the team to adopt an unnecessary or overly complicated process.</p>
          </div>
          <div className="mt-8">
            <CtaPrimary href="#contact">Discuss Your Clinic Workflow</CtaPrimary>
          </div>
        </div>
      </div>
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
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <div className="text-center">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
        </div>
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-white">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="text-base font-semibold text-navy sm:text-lg">{f.q}</span>
                  <span aria-hidden className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition ${isOpen ? "rotate-45" : ""}`}>
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-navy/70">{f.a}</div>
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
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

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
  function submit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setTimeout(() => setStatus("success"), 700);
  }

  const inputCls = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-brand focus:bg-white/10";
  const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70";
  const errCls = "mt-1 text-xs text-red-300";

  return (
    <section id="contact" className="relative overflow-hidden bg-navy py-20 text-white lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-brand/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-[380px] w-[380px] rounded-full bg-brand/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Workflow audit
          </span>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">Find Where Your Clinic Is Losing Inquiries and Appointments</h2>
          <p className="mt-5 text-white/70">
            Book a workflow audit to review how your clinic currently handles patient inquiries, consultation booking, appointment confirmation, reminders, follow-up, and staff coordination.
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

        <form onSubmit={submit} noValidate className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur sm:p-8">
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
                  <input id="name" className={inputCls} value={form.name} onChange={(e) => update("name", e.target.value)} aria-invalid={!!errors.name} required />
                  {errors.name && <p className={errCls}>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="clinic" className={labelCls}>Clinic Name <span className="text-brand">*</span></label>
                  <input id="clinic" className={inputCls} value={form.clinic} onChange={(e) => update("clinic", e.target.value)} aria-invalid={!!errors.clinic} required />
                  {errors.clinic && <p className={errCls}>{errors.clinic}</p>}
                </div>
                <div>
                  <label htmlFor="email" className={labelCls}>Work Email <span className="text-brand">*</span></label>
                  <input id="email" type="email" className={inputCls} value={form.email} onChange={(e) => update("email", e.target.value)} aria-invalid={!!errors.email} required />
                  {errors.email && <p className={errCls}>{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className={labelCls}>Phone Number</label>
                  <input id="phone" type="tel" className={inputCls} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="website" className={labelCls}>Clinic Website or Facebook Page</label>
                  <input id="website" className={inputCls} value={form.website} onChange={(e) => update("website", e.target.value)} />
                </div>
                <div>
                  <label htmlFor="clinicType" className={labelCls}>Clinic Type <span className="text-brand">*</span></label>
                  <select id="clinicType" className={inputCls} value={form.clinicType} onChange={(e) => update("clinicType", e.target.value)} required>
                    <option value="" className="bg-navy">Select…</option>
                    {CLINIC_TYPES.map((c) => <option key={c} value={c} className="bg-navy">{c}</option>)}
                  </select>
                  {errors.clinicType && <p className={errCls}>{errors.clinicType}</p>}
                </div>
                <div>
                  <label htmlFor="problem" className={labelCls}>Main Operational Problem <span className="text-brand">*</span></label>
                  <select id="problem" className={inputCls} value={form.problem} onChange={(e) => update("problem", e.target.value)} required>
                    <option value="" className="bg-navy">Select…</option>
                    {PROBLEMS_OPTS.map((c) => <option key={c} value={c} className="bg-navy">{c}</option>)}
                  </select>
                  {errors.problem && <p className={errCls}>{errors.problem}</p>}
                </div>
                <div>
                  <label htmlFor="channels" className={labelCls}>Current Inquiry Channels</label>
                  <input id="channels" className={inputCls} placeholder="e.g. Website, Facebook, Email" value={form.channels} onChange={(e) => update("channels", e.target.value)} />
                </div>
                <div>
                  <label htmlFor="contactMethod" className={labelCls}>Preferred Contact Method <span className="text-brand">*</span></label>
                  <select id="contactMethod" className={inputCls} value={form.contactMethod} onChange={(e) => update("contactMethod", e.target.value)} required>
                    <option value="" className="bg-navy">Select…</option>
                    {CONTACT_METHODS.map((c) => <option key={c} value={c} className="bg-navy">{c}</option>)}
                  </select>
                  {errors.contactMethod && <p className={errCls}>{errors.contactMethod}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className={labelCls}>Additional Notes</label>
                  <textarea id="notes" rows={4} className={inputCls} value={form.notes} onChange={(e) => update("notes", e.target.value)} />
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/30 transition hover:brightness-110 disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Book My Clinic Workflow Audit"}
                <span aria-hidden>→</span>
              </button>
              <p className="mt-3 text-center text-xs text-white/50">
                Fields marked <span className="text-brand">*</span> are required.
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
                <img src={joelAvatar.url} alt="Joel Jay Bancaya" className="h-full w-full object-cover" />
              </span>
              <span className="text-base font-extrabold text-white">Joel Jay Bancaya</span>
            </div>
            <p className="mt-4 max-w-md text-sm">Workflow systems for orthodontic and cosmetic dental clinics.</p>
            <div className="mt-6 space-y-1.5 text-sm">
              <div>[EMAIL ADDRESS]</div>
              <div>[PHONE NUMBER]</div>
              <div>[BUSINESS LOCATION OR SERVICE AREA]</div>
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
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-xs leading-relaxed text-white/60">
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
      <Header />
      <main>
        <Hero />
        <Problems />
        <Solution />
        <HowItWorks />
        <Demo />
        <CaseStudy />
        <WhyWorkWithMe />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
