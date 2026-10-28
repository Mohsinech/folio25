import CaseStudy from "@/components/CaseStudy/CaseStudy";
import { projects } from "../data";

// The Latest Project modals link here, so this stays the newest case study.
export default function LatestPage() {
  return <CaseStudy project={projects[0]} />;
}
