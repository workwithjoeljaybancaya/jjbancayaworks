import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://www.automatebancaya.com/";
const PAGE_TITLE = "Privacy Policy | Joel Jay Bancaya";
const PAGE_DESC = "How information submitted through the Clinic Workflow Audit form is collected, used, retained, and handled.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: SITE_URL + "privacy" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "privacy" }],
  }),
  component: PrivacyPolicy,
});

const SECTIONS = [
  {
    title: "Information collected",
    body: [
      "When you submit the Clinic Workflow Audit form, the information collected may include your name, clinic name, work email, phone number, clinic website or Facebook page, clinic type, main operational problem, inquiry channels, preferred contact method, and any additional notes you choose to provide.",
      "Please do not submit patient records, clinical information, passwords, payment details, or other sensitive information through this form.",
    ],
  },
  {
    title: "How the information is used",
    body: [
      "The information is used to review your clinic’s current inquiry and appointment process, identify possible workflow gaps or integration opportunities, prepare practical recommendations, and contact you through your selected communication method.",
      "Submitting the form does not create a client relationship or commit your clinic to purchasing or implementing a system.",
    ],
  },
  {
    title: "Service providers and workflow tools",
    body: [
      "Form submissions may be processed through workflow-automation, hosting, email, messaging, record-keeping, or other technical service providers needed to receive, organize, and respond to your request. Those providers handle information under their own terms and privacy practices.",
      "Information is not sold to third parties.",
    ],
  },
  {
    title: "Data retention",
    body: [
      "Submitted information is kept only for as long as reasonably needed to review your request, communicate with you, maintain relevant business records, and meet applicable operational or legal requirements. Information that is no longer needed may be deleted or anonymized.",
    ],
  },
  {
    title: "Data security",
    body: [
      "Reasonable administrative and technical precautions are used when handling submitted information. However, no website, internet transmission, automation platform, or storage system can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You may request access to, correction of, or deletion of the personal information you submitted. You may also ask not to receive further communication. Some information may be retained when reasonably necessary for legal, security, or record-keeping purposes.",
    ],
  },
  {
    title: "Contact",
    body: [
      "For privacy questions or requests, email Joeljaybancaya16@gmail.com. Please describe the information or form submission connected to your request so it can be located and reviewed.",
    ],
  },
];

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-5 lg:px-8">
          <a href="/" className="text-sm font-extrabold text-foreground hover:text-brand">
            Joel Jay Bancaya
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:border-brand/40 hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span aria-hidden>←</span> Back to website
          </a>
        </div>
      </header>

      <main>
        <section className="border-b border-border bg-surface py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Legal
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">Privacy Policy</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/70">
              This policy explains how information submitted through the Clinic Workflow Audit form is handled.
            </p>
            <p className="mt-4 text-sm font-medium text-muted-foreground">Effective August 3, 2026</p>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-3xl space-y-6 px-5 lg:px-8">
            {SECTIONS.map((section) => (
              <article key={section.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-extrabold text-foreground">{section.title}</h2>
                <div className="mt-4 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-foreground/70">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}

            <div className="rounded-2xl border-l-4 border-brand bg-brand-soft/60 p-5 text-sm leading-relaxed text-foreground/75">
              This policy describes the current website form and may be updated when the website, workflow, or service providers change.
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-navy py-8 text-white/65">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© {new Date().getFullYear()} Joel Jay Bancaya</span>
          <a href="mailto:Joeljaybancaya16@gmail.com" className="hover:text-white">
            Joeljaybancaya16@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}
