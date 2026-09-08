type ResearchLink = {
  label: string;
  url: string;
};

type ResearchArea = {
  index: string;
  slug: string;
  period: string;
  title: string;
  shortTitle: string;
  role: string;
  status: string;
  problem: string;
  contribution: string[];
  methods: string[];
  outcome: string;
  links: ResearchLink[];
};

type Publication = {
  year: string;
  type: string;
  title: string;
  authors: string;
  venue: string;
  links: ResearchLink[];
};

type InternalResearchSource = {
  subject: string;
  url: string;
  purpose: string;
};

export type ResearchPageData = {
  overview: string[];
  areas: ResearchArea[];
  publications: Publication[];
  engineering: {
    title: string;
    paragraphs: string[];
    themes: { title: string; detail: string }[];
  };
  internalSources: InternalResearchSource[];
};

export const researchPage = {
  overview: [
    "My research started with a language problem in maritime radio: how to improve noisy speech transcripts without losing the identifiers and phrases that matter at sea.",
    "From there, I moved into engineering documents and simulation. The recurring question is practical: how can an AI system work with technical information, use the right tools, and leave enough structure behind for someone to inspect the result?",
  ],
  areas: [
    {
      index: "01",
      slug: "maritime-asr",
      period: "2024",
      title: "Maritime Automatic Speech Recognition",
      shortTitle: "Maritime ASR",
      role: "Master's thesis author and developer",
      status: "Completed master's thesis",
      problem:
        "Maritime VHF transcripts are affected by noise, accents, specialist vocabulary, and inconsistent phrasing. The thesis asked whether language models and text embeddings could improve the transcript after speech recognition and align it more closely with Standard Maritime Communication Phrases.",
      contribution: [
        "I designed and built the post-processing module studied in the thesis. It took existing speech-to-text output, compared it with SMCP material, corrected phrasing, and extracted maritime identifiers such as ship names and call signs.",
        "I tested sentence embeddings and a fine-tuned GPT-3.5 model, then brought the workflow into a prototype interface. The scope was the language-processing layer, not the development of a complete speech-recognition model.",
      ],
      methods: [
        "Whisper transcription",
        "Sentence-BERT",
        "Semantic similarity",
        "Fine-tuned GPT-3.5",
        "SMCP",
      ],
      outcome:
        "The work produced a functioning post-processing prototype and a completed master's thesis. The evaluation also exposed important limits: generated SMCP wording was not always consistent, and domain-specific data and evaluation remained necessary.",
      links: [
        {
          label: "Read the thesis",
          url: "https://urn.fi/URN:NBN:fi-fe2024060343553",
        },
        {
          label: "Thesis PDF",
          url: "https://www.doria.fi/bitstream/handle/10024/189693/jatta_lamin.pdf?sequence=3",
        },
      ],
    },
    {
      index: "02",
      slug: "meri",
      period: "2024 to 2025",
      title: "MERI: Modality-Aware Extraction and Retrieval of Information",
      shortTitle: "MERI",
      role: "Co-author and software contributor",
      status: "Peer-reviewed conference article",
      problem:
        "Engineering PDFs mix text, tables, figures, and layouts that vary between manufacturers. Directly asking a model for parameters can miss this structure and make it difficult to locate the source of an extracted value.",
      contribution: [
        "MERI was collaborative work with Christian Möller, Christoffer Björkskog, Andreas Lundell, Mikael Manngård, and Johan Westö. I contributed to layout evaluation, unified extraction paths for different document elements, and source highlighting in the project demo.",
        "I later worked on pipeline configuration, dependency maintenance, and security-related updates. These changes supported the research workflow without changing the broader team ownership of the method or paper.",
      ],
      methods: [
        "Layout detection",
        "Intermediate document format",
        "Schema-guided extraction",
        "Multimodal LLMs",
        "Synthetic document evaluation",
      ],
      outcome:
        "The study found that converting a document into a machine-friendly intermediate representation improved parameter extraction compared with a direct approach. It also found that further work was needed before extraction could be treated as reliable across engineering documents.",
      links: [
        {
          label: "View case study",
          url: "/work/meri/",
        },
        {
          label: "ScienceDirect article",
          url: "https://www.sciencedirect.com/science/article/pii/S2405896325025856",
        },
        {
          label: "Publication record",
          url: "https://research.abo.fi/en/publications/towards-automated-parameter-extraction-from-engineering-documents/",
        },
        {
          label: "MERI repository",
          url: "https://github.com/Novia-RDI-Seafaring/MERI",
        },
        {
          label: "Virtual Sea Trial project note",
          url: "https://virtualseatrial.fi/parameter-extraction-from-engineering-documents/",
        },
      ],
    },
    {
      index: "03",
      slug: "agent-in-the-loop",
      period: "2025 to 2026",
      title: "Agent-in-the-Loop",
      shortTitle: "Agent-in-the-Loop",
      role: "Co-author and software contributor",
      status: "Published and presented at ECC 2026",
      problem:
        "A control-engineering agent has to do more than produce a plausible answer. It must choose tools, run simulations, interpret numerical outputs, and carry intermediate results through tasks such as system identification and controller tuning.",
      contribution: [
        "Christoffer Björkskog, Mikael Manngård, and I developed and evaluated the research system. I implemented the initial PydanticAI tool-calling path and worked on experiment execution, evaluation reporting, result export, and evaluator debugging.",
        "I later reorganized the current repository into clearer agent, experiment, evaluation, and command-line layers. I also explored planning and tool-precondition guardrails on a separate development branch. That branch was not part of the published benchmark and is not present on current main. The benchmark design, control methods, paper, and final system were shared work.",
      ],
      methods: [
        "PydanticAI",
        "Tool-calling agents",
        "FMI and FMUs",
        "Ground-truth evaluators",
        "Six-task benchmark",
      ],
      outcome:
        "Across six benchmark tasks, every run satisfied the response evaluators, but redundant and non-optimal tool calls increased with task complexity. The result was published in the ECC 2026 proceedings and presented in Reykjavík.",
      links: [
        {
          label: "View case study",
          url: "/work/agent-in-the-loop/",
        },
        {
          label: "IEEE publication",
          url: "https://ieeexplore.ieee.org/document/11625625",
        },
        {
          label: "Control-agent repository",
          url: "https://github.com/Novia-RDI-Seafaring/control-agent",
        },
        {
          label: "ECC 2026 programme",
          url: "https://controls.papercept.net/conferences/conferences/ECC26/program/ECC26_ContentListWeb_3.html",
        },
      ],
    },
    {
      index: "04",
      slug: "agentic-gui-test-generation",
      period: "2026",
      title: "Agentic Generation of GUI End-to-End Tests for Microservice-Based Systems",
      shortTitle: "Agentic GUI test generation",
      role: "Second author and software contributor",
      status: "Accepted for presentation at QUATIC 2026",
      problem:
        "Generating a GUI test is not enough if it only reproduces isolated clicks. The research asks how an agent can use system and use-case specifications to produce executable end-to-end tests for a microservice application while retaining a structured journey that can be evaluated.",
      contribution: [
        "I added structured system and use-case specifications, then worked on prompt and execution-brief code that selected the relevant application context for each journey. This gave the agent a clearer contract for browser exploration and test generation.",
        "I also worked on persisted browsing traces and evaluation records, coverage and mutation analysis, failure classification, and reporting. I reorganized the Python runtime and later separated the source into agent, workflow, and evaluation modules so experiments were easier to run and inspect.",
      ],
      methods: [
        "PydanticAI",
        "Playwright MCP",
        "Structured journey contracts",
        "Generated pytest-Playwright tests",
        "Evaluation and reporting",
      ],
      outcome:
        "The collaborative work resulted in a full paper accepted for presentation at QUATIC 2026. The programme schedules it in the Quality for AI session on 10 September 2026 at 12:10 in Genoa, Italy.",
      links: [
        {
          label: "Current project repository",
          url: "https://gitlab.abo.fi/eovsiann/microservice-testing-agent",
        },
        {
          label: "Original development repository",
          url: "https://github.com/elenaovv/microservice-testing-agent",
        },
        {
          label: "QUATIC 2026 programme",
          url: "https://2026.quatic.org/program/scientific-program",
        },
      ],
    },
  ],
  publications: [
    {
      year: "2026",
      type: "Accepted full paper",
      title: "Agentic Generation of GUI End-to-End Tests for Microservice-Based Systems",
      authors: "Elena Ovsiannikova, Lamin Jatta, and co-authors",
      venue: "Accepted for presentation at QUATIC 2026, Quality for AI, Genoa, Italy",
      links: [
        {
          label: "Programme",
          url: "https://2026.quatic.org/program/scientific-program",
        },
        {
          label: "Current repository",
          url: "https://gitlab.abo.fi/eovsiann/microservice-testing-agent",
        },
        {
          label: "Original repository",
          url: "https://github.com/elenaovv/microservice-testing-agent",
        },
      ],
    },
    {
      year: "2026",
      type: "Conference paper",
      title: "Agent-in-the-Loop: Using AI Agents to Perform Control-Oriented Simulation Tasks",
      authors: "Christoffer Björkskog, Lamin Jatta, Mikael Manngård",
      venue: "2026 European Control Conference (ECC), pp. 3109-3115",
      links: [
        {
          label: "IEEE",
          url: "https://ieeexplore.ieee.org/document/11625625",
        },
        {
          label: "Repository",
          url: "https://github.com/Novia-RDI-Seafaring/control-agent",
        },
      ],
    },
    {
      year: "2025",
      type: "Peer-reviewed conference article",
      title: "Towards Automated Parameter Extraction from Engineering Documents",
      authors:
        "Christian Möller, Christoffer Björkskog, Lamin Jatta, Andreas Lundell, Mikael Manngård, Johan Westö",
      venue:
        "IFAC-PapersOnLine, 59(24), pp. 197-202. IFAC Workshop on Intelligent Manufacturing Systems",
      links: [
        {
          label: "ScienceDirect",
          url: "https://www.sciencedirect.com/science/article/pii/S2405896325025856",
        },
        {
          label: "Publication record",
          url: "https://research.abo.fi/en/publications/towards-automated-parameter-extraction-from-engineering-documents/",
        },
        {
          label: "DOI",
          url: "https://doi.org/10.1016/j.ifacol.2025.11.864",
        },
        {
          label: "Repository",
          url: "https://github.com/Novia-RDI-Seafaring/MERI",
        },
      ],
    },
    {
      year: "2024",
      type: "Master's thesis",
      title:
        "Maritime Automatic Speech Recognition: Improving the Quality of Transcriptions using Artificial Intelligence",
      authors: "Lamin Jatta",
      venue:
        "Master Degree Programme in Computer Science, Department of Computer Science, Åbo Akademi University",
      links: [
        {
          label: "Doria",
          url: "https://urn.fi/URN:NBN:fi-fe2024060343553",
        },
      ],
    },
  ],
  engineering: {
    title: "What I carried from the research into engineering",
    paragraphs: [
      "The thesis taught me that generated language needs a domain reference and a way to inspect what changed. MERI moved that question into technical documents, where layout, structure, and source location are part of the information. Agent-in-the-Loop added tool execution and evaluation against deterministic calculations.",
      "I use those lessons in my current software work. In ANCHOR, retrieved document values stay connected to their source regions, agents work through explicit tools, and engineering tasks can continue into simulation instead of ending with a text response.",
    ],
    themes: [
      {
        title: "Document intelligence",
        detail: "Treat layout, source location, and structured output as part of extraction, not as cleanup after the model responds.",
      },
      {
        title: "Agent evaluation",
        detail: "Test tool use and intermediate results against the engineering task, not only the final wording.",
      },
      {
        title: "Engineering workflows",
        detail: "Connect retrieval and agent decisions to executable tools, simulation models, and inspectable project state.",
      },
    ],
  },
  internalSources: [
    {
      subject: "Master's thesis metadata and full text",
      url: "https://urn.fi/URN:NBN:fi-fe2024060343553",
      purpose: "Authorship, title, year, degree programme, methods, scope, and conclusions.",
    },
    {
      subject: "MERI publication record",
      url: "https://research.abo.fi/en/publications/towards-automated-parameter-extraction-from-engineering-documents/",
      purpose: "Authors, venue, DOI, pages, and publication type.",
    },
    {
      subject: "MERI repository history",
      url: "https://github.com/Novia-RDI-Seafaring/MERI/commits/main/?author=Lamboyjat",
      purpose: "Attribution for implementation contributions.",
    },
    {
      subject: "MERI project context",
      url: "https://virtualseatrial.fi/parameter-extraction-from-engineering-documents/",
      purpose: "Project problem, method, and Virtual Sea Trial context.",
    },
    {
      subject: "Agent-in-the-Loop publication",
      url: "https://ieeexplore.ieee.org/document/11625625",
      purpose: "Published paper record.",
    },
    {
      subject: "Agent-in-the-Loop conference programme",
      url: "https://controls.papercept.net/conferences/conferences/ECC26/program/ECC26_ContentListWeb_3.html",
      purpose: "Presentation date, abstract, and reported results.",
    },
    {
      subject: "Control-agent repository history",
      url: "https://github.com/Novia-RDI-Seafaring/control-agent/commits/main/?author=Lamboyjat",
      purpose: "Attribution for implementation contributions.",
    },
    {
      subject: "Original microservice-testing-agent history",
      url: "https://github.com/elenaovv/microservice-testing-agent",
      purpose: "Original development history and attribution before the university-hosted migration.",
    },
    {
      subject: "Current microservice-testing-agent repository",
      url: "https://gitlab.abo.fi/eovsiann/microservice-testing-agent",
      purpose: "Current software architecture and university-hosted project history.",
    },
    {
      subject: "QUATIC 2026 scientific programme",
      url: "https://2026.quatic.org/program/scientific-program",
      purpose: "Paper title, full-paper status, session, presentation date, and time.",
    },
  ],
} satisfies ResearchPageData;
