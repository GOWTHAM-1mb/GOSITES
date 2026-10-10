"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ProjectCard } from "./editorial";
import { projects } from "@/content/studio";

const categories = ["All", "Residential", "Hospitality", "Retail"] as const;

export function Portfolio() {
  const initialType = useSearchParams().get("type") || "all";
  const selected = categories.find(item => item.toLowerCase() === initialType.toLowerCase()) || "All";
  const category = selected;
  const router = useRouter();
  const pathname = usePathname();
  const visible = projects.filter(p => category === "All" || p.category === category);

  return <>
    <div className="p-filter s-filter" role="group" aria-label="Filter projects by type">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => {
      router.replace(item === "All" ? pathname : `${pathname}?type=${item.toLowerCase()}`, { scroll: false });
    }}>{item}</button>)}<span className="p-filter__count p-meta" aria-live="polite">{visible.length} concept {visible.length === 1 ? "study" : "studies"}</span></div>
    <p className="p-visually-hidden" role="status">Showing {visible.length} concept {visible.length === 1 ? "study" : "studies"}</p>
    <div className="p-staggered">{visible.map(project => <ProjectCard project={project} key={project.slug} />)}</div>
  </>;
}
