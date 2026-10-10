import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { PageTitle } from "@/components/editorial";
import { ConsultationForm } from "@/components/consultation-form";

export const metadata: Metadata = { title: "Contact", description: "Explore an illustrative consultation form. Browser-only validation; no enquiries are sent or stored." };

export default function Contact() {
  return <><PageTitle eyebrow="Start a conversation · demo" title={<>Tell us about<br /><em>your space.</em></>}>A place, a possibility, a few questions. A useful conversation starts there.</PageTitle>
    <section className="p-section p-section--flush-top"><div className="p-container p-grid">
      <div className="p-stack" style={{ "--l": 4 } as CSSProperties}><h2 className="p-h2">A considered beginning.</h2><p className="p-body">For a real consultation, we would begin with your brief, location, budget and a sense of how you want to live in the space.</p><div className="s-contact-note p-stack"><h3 className="p-label">Before you begin</h3><p className="p-small">This is a fictional studio demo. Use illustrative details to try the form. There is no real studio address, phone number or email service behind this website.</p><p className="p-meta p-muted">Bengaluru, Karnataka · en-IN</p></div></div>
      <div style={{ "--l": 7, "--ls": 6 } as CSSProperties}><h2 className="p-visually-hidden">Consultation demo form</h2><ConsultationForm /></div>
    </div></section>
  </>;
}
