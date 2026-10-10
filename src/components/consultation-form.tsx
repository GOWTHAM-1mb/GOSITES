"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent, type ReactNode } from "react";

type Errors = Record<string, string>;
const labels: Record<string, string> = { name: "Name", email: "Email", phone: "Phone", city: "Project city", type: "Project type", area: "Area in sq ft", budget: "Budget", start: "Start time", brief: "About the project", consent: "Consent" };

export function ConsultationForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [complete, setComplete] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const status = useRef<HTMLDivElement>(null);
  function errorFor(field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
    field.setCustomValidity("");
    if (["name", "city", "brief"].includes(field.name) && !field.value.trim()) field.setCustomValidity("Please enter a value rather than spaces.");
    if (field.name === "phone" && field.value) {
      const digits = field.value.replace(/\D/g, "").length;
      if (digits < 10 || digits > 15) field.setCustomValidity("Use a phone number containing 10–15 digits.");
    }
    return field.willValidate && !field.checkValidity() ? field.dataset.error || field.validationMessage : undefined;
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const issues: Errors = {};
    for (const field of Array.from(form.elements)) {
      if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) continue;
      const message = errorFor(field);
      if (message) issues[field.name] = message;
    }
    setErrors(issues);
    setComplete(!Object.keys(issues).length);
    requestAnimationFrame(() => Object.keys(issues).length ? summary.current?.focus() : status.current?.focus());
  }

  function field(name: string, children: ReactNode, optional = false, full = false) {
    return <div className={`p-field ${full ? "p-field--full" : ""}`} data-invalid={errors[name] ? true : undefined}><label className="p-field__label" htmlFor={name}>{labels[name]}{optional ? " (optional)" : ""}</label>{children}{errors[name] && <p id={`${name}-error`} className="p-field__error">{errors[name]}</p>}</div>;
  }

  const attrs = (name: string) => ({ id: name, name, "aria-invalid": errors[name] ? true as const : undefined, "aria-describedby": errors[name] ? `${name}-error` : undefined });

  return <form className="p-form" noValidate onSubmit={submit} onBlur={event => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
    const message = errorFor(target);
    setErrors(previous => { const next = { ...previous }; if (message) next[target.name] = message; else delete next[target.name]; return next; });
  }} onInput={event => {
    setComplete(false);
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      target.setCustomValidity("");
      if (errors[target.name]) {
        const message = errorFor(target);
        setErrors(previous => { const next = { ...previous }; if (message) next[target.name] = message; else delete next[target.name]; return next; });
      }
    }
  }}>
    <noscript><p className="p-alert">This form is a browser-only demonstration and requires JavaScript. No enquiries are sent.</p><style>{`.s-demo-fields { display: none; }`}</style></noscript>
    {Object.keys(errors).length > 0 && <div ref={summary} className="p-alert p-alert--error p-field--full" tabIndex={-1} role="alert"><p>Please check the following:</p><ul>{Object.entries(errors).map(([name, message]) => <li key={name}><a className="p-link" href={`#${name}`}>{labels[name]}: {message}</a></li>)}</ul></div>}
    <fieldset className="s-demo-fields s-form-fields"><legend className="p-visually-hidden">Your illustrative project brief</legend>
      {field("name", <input {...attrs("name")} className="p-input" autoComplete="name" required maxLength={120} data-error="Enter a name for this fictional enquiry." />)}
      {field("email", <input {...attrs("email")} className="p-input" type="email" autoComplete="email" required maxLength={254} data-error="Enter an email address such as name@example.com." />)}
      {field("phone", <input {...attrs("phone")} className="p-input" type="tel" inputMode="tel" autoComplete="tel" pattern="[+]?[0-9 ()-]{10,20}" maxLength={20} data-error="Use 10–15 digits, with optional spaces, brackets, hyphens or a leading +." />, true)}
      {field("city", <input {...attrs("city")} className="p-input" autoComplete="address-level2" required maxLength={120} data-error="Enter the project city." />)}
      {field("type", <select {...attrs("type")} className="p-select" required defaultValue="" data-error="Choose a project type."><option value="" disabled>Select a project type</option><option>Apartment</option><option>House</option><option>Renovation</option><option>Retail or hospitality</option><option>Other</option></select>)}
      {field("area", <input {...attrs("area")} className="p-input" type="number" inputMode="numeric" min="1" max="1000000" data-error="Enter an area between 1 and 10,00,000 sq ft." aria-label="Area in sq ft (optional)" />, true)}
      {field("budget", <select {...attrs("budget")} className="p-select" required defaultValue="" data-error="Choose a budget range, or Not sure yet."><option value="" disabled>Select a budget range</option><option>Under ₹25 lakh</option><option>₹25–75 lakh</option><option>₹75 lakh – ₹2 crore</option><option>Above ₹2 crore</option><option>Not sure yet</option></select>)}
      {field("start", <select {...attrs("start")} className="p-select" required defaultValue="" data-error="Choose a start time, or Just exploring."><option value="" disabled>When would you like to begin?</option><option>Within 3 months</option><option>3–6 months</option><option>6–12 months</option><option>Just exploring</option></select>)}
      {field("brief", <textarea {...attrs("brief")} className="p-textarea" required maxLength={3000} rows={5} data-error="Tell us a little about the illustrative project." />, false, true)}
      <div className="p-field p-field--full"><p className="p-small">Plans and file uploads are omitted from this demo. Use fictional details; nothing will be sent or stored.</p></div>
      <div className="p-field p-field--full" data-invalid={errors.consent ? true : undefined}><label className="p-choice"><input {...attrs("consent")} type="checkbox" required data-error="Confirm that you understand this is a demo." /><span>I understand this is a demo and no enquiry will be sent.</span></label>{errors.consent && <p className="p-field__error" id="consent-error">{errors.consent}</p>}<p className="p-small"><Link href="/privacy">Read the demo privacy notice</Link></p></div>
      <div className="p-form__actions"><button className="p-btn p-btn--large s-form-button" type="submit">Check demo enquiry</button><p className="p-small">Local validation only. No submission.</p></div>
    </fieldset>
    {complete && <div ref={status} className="p-alert p-alert--success p-field--full s-form-status" tabIndex={-1} role="status"><p>Your demo enquiry is valid. Nothing has been sent or stored.</p><p className="p-small">Your entries stay here so you can review them. A live website would connect this form to an enquiry service.</p></div>}
  </form>;
}
