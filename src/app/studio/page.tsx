import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle, Process, SectionHead } from "@/components/editorial";
import { Media } from "@/components/media";

export const metadata: Metadata = { title: "Studio", description: "The illustrative philosophy behind Ira Menon Interiors, a fictional Bengaluru studio." };

export default function Studio() {
  return <><PageTitle eyebrow="The studio · Bengaluru" title={<>Less spectacle.<br /><em>More belonging.</em></>}>An imagined interiors practice with an interest in the spaces we return to, day after day.</PageTitle>
    <section className="p-section p-section--flush-top"><div className="p-container p-profile"><h2 className="p-h1">Start with the life.<br />Then shape the room.</h2><div className="p-body"><p>Ira Menon Interiors is a fictional studio created to demonstrate the Plinth design system. Its proposed approach begins with listening: how a room is used, what a place already offers, and what its occupants need from it.</p><p>The studio concept favours tactile materials, clear spatial arrangements and carefully resolved details. Its work is imagined as a conversation between the existing place and the life that will unfold within it.</p><p>No real designer, team, awards or completed commissions are represented here.</p></div></div></section>
    <figure className="p-container"><Media id="studio-material-table" ratio="21/9" sizes="(min-width: 1840px) 1680px, calc(100vw - 40px)" /><figcaption className="p-caption p-meta">01 — A place to explore materials. AI-generated studio concept.</figcaption></figure>
    <section className="p-section p-section--s"><div className="p-container"><SectionHead number="01" title="From conversation to space" /><Process /></div></section>
    <section className="p-section p-section--raised"><div className="p-container p-profile"><h2 className="p-h1">A useful first<br /><em>conversation.</em></h2><div className="p-body"><p>For a real project, a first conversation would cover the place, the brief, the budget and the timeline. The consultation demo shows how an enquiry could begin.</p><Link className="p-cta" href="/contact">Explore the consultation form</Link></div></div></section>
  </>;
}
