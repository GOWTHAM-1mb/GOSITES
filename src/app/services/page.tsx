import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle, Process, SectionHead, Services } from "@/components/editorial";

export const metadata: Metadata = { title: "Services", description: "Illustrative interior design, renovation and custom joinery services, with a four-stage project process." };

export default function ServicesPage() {
  return <><PageTitle eyebrow="Services · illustrative offering" title={<>From the whole room<br />to the <em>smallest detail.</em></>}>A proposed scope of work for homes and a small number of commercial spaces.</PageTitle>
    <section className="p-section p-section--flush-top"><div className="p-container"><Services /></div></section>
    <section className="p-section p-section--s p-section--raised"><div className="p-container"><SectionHead number="01" title="The process" /><Process /></div></section>
    <section className="p-section"><div className="p-container p-profile"><h2 className="p-h1">Every brief begins<br />with a <em>question.</em></h2><div className="p-body"><p>What would you like your space to make possible? Explore the form with a fictional brief. No enquiry will be sent.</p><Link className="p-cta" href="/contact">Try a consultation brief</Link></div></div></section>
  </>;
}
