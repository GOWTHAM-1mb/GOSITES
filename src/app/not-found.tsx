import Link from "next/link";
import { PageTitle } from "@/components/editorial";

export default function NotFound() {
  return <><PageTitle eyebrow="404 · Page not found" title={<>A little<br /><em>off the plan.</em></>}>The page you’re looking for isn’t here.</PageTitle><div className="p-container p-section p-section--s p-section--flush-top"><Link className="p-cta" href="/">Return to the home page</Link></div></>;
}
