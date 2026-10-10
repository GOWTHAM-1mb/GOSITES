import type { Metadata } from "next";
import { PageTitle } from "@/components/editorial";

export const metadata: Metadata = { title: "Demo privacy notice" };

export default function Privacy() {
  return <><PageTitle eyebrow="Demo privacy notice" title={<>Your information<br /><em>stays in the form.</em></>} />
    <section className="p-section p-section--flush-top"><div className="p-container p-body p-stack"><h2 className="p-h2">A demonstration, without submission</h2><p>The consultation form checks your entries in this browser. It does not send enquiry content to a server, email anyone, upload attachments or save entries in browser storage. Use fictional details when exploring it.</p><h2 className="p-h2">Website requests</h2><p>Loading this website makes normal requests to its host. Fonts are served with the website. No analytics, embedded maps or social-media widgets have been added.</p><h2 className="p-h2">Before a real launch</h2><p>A real studio website will need a privacy notice reflecting its actual enquiry processing, service providers, retention practices and contact details. This demo notice is not that production policy.</p></div></section>
  </>;
}
