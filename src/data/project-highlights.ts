import { anchorCaseStudy } from "./anchor-case-study";
import { meriCaseStudy, meriEvaluation } from "./meri-case-study";
import { agentInTheLoopCaseStudy } from "./agent-in-the-loop-case-study";

type ProjectHighlight = {
  indicators: string[];
  context?: string;
  links: { label: string; url: string }[];
};

// Presentation selections over the existing case-study sources, not a second
// publication or attribution record. Keys match the Astro project collection.
export const projectHighlights: Record<string, ProjectHighlight> = {
  anchor: {
    indicators: ["Open-source workspace", "Source-linked extraction"],
    links: anchorCaseStudy.heroLinks,
  },
  meri: {
    indicators: [
      "Peer-reviewed",
      `${meriEvaluation.parameterTasks} parameter tasks`,
      `${meriEvaluation.layoutVariations} layout variations`,
    ],
    context: "Published evaluation on synthetic layouts of one content document.",
    links: meriCaseStudy.heroLinks,
  },
  "control-agent": {
    indicators: [
      `${agentInTheLoopCaseStudy.evaluation.experiments.length}-task FMU benchmark`,
      "Deterministic evaluation",
      "ECC 2026",
    ],
    links: agentInTheLoopCaseStudy.heroLinks,
  },
};
