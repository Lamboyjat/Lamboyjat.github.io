type EvidenceLink = {
  label: string;
  url: string;
  note?: string;
  public?: boolean;
};

type ArchitectureLayer = {
  index: string;
  title: string;
  role: string;
  detail: string;
  technologies: string[];
};

type ContributionArea = {
  index: string;
  title: string;
  problem: string;
  work: string;
  significance: string;
  evidence: EvidenceLink[];
};

type EngineeringDecision = {
  title: string;
  decision: string;
  tradeoff: string;
  attribution: string;
};

type TechnologyGroup = {
  role: string;
  technologies: string[];
  purpose: string;
};

export type AnchorCaseStudy = {
  title: string;
  problemStatement: string;
  role: string;
  organization: string;
  period: string;
  snapshot: string;
  heroLinks: EvidenceLink[];
  problem: {
    title: string;
    paragraphs: string[];
    pressures: { label: string; detail: string }[];
  };
  architecture: {
    summary: string;
    layers: ArchitectureLayer[];
    boundaryNote: string;
  };
  attribution: {
    lamin: string;
    christoffer: string;
    team: string;
  };
  contributions: ContributionArea[];
  decisions: EngineeringDecision[];
  technology: TechnologyGroup[];
  evidence: EvidenceLink[];
  demonstrates: { title: string; detail: string }[];
};

const commitUrl = (sha: string) =>
  `https://github.com/Novia-RDI-Seafaring/anchor/commit/${sha}`;

export const anchorCaseStudy = {
  title: "ANCHOR",
  problemStatement:
    "ANCHOR brings technical documents, extracted knowledge, agent actions, and simulation work into one shared workspace, with links back to the source material.",
  role: "Co-developer / substantial contributor",
  organization: "Novia UAS · Novia-RDI-Seafaring",
  period: "Nov 2025 to Aug 2026",
  snapshot: "Current architecture reviewed at main · 42ff01d · 1 Sep 2026",
  heroLinks: [
    {
      label: "Repository",
      url: "https://github.com/Novia-RDI-Seafaring/anchor",
    },
    {
      label: "Official Novia story",
      url: "https://www.novia.fi/en/news/news/beyond-chatbots-novia-develops-interactive-ai-workspace-for-engineers",
    },
  ],
  problem: {
    title: "Engineering information loses context when it moves between tools.",
    paragraphs: [
      "Engineering work often starts in PDFs, tables, diagrams, and simulation files. A chat answer can be useful, but the link between an extracted value, its source, and the task that uses it is easily lost.",
      "Christoffer and I developed ANCHOR as a shared canvas for people and agents. Documents, source regions, structured nodes, connections, and simulation artifacts stay inside the same project.",
    ],
    pressures: [
      {
        label: "Grounding",
        detail: "A value must remain linked to the page, bounding box, and source content that support it.",
      },
      {
        label: "Interoperability",
        detail: "Human UI actions and agent tool calls must operate on the same workspace semantics.",
      },
      {
        label: "Execution",
        detail: "Extracted knowledge must be usable in downstream engineering and FMU workflows, not stop at retrieval.",
      },
    ],
  },
  architecture: {
    summary:
      "ANCHOR v2 is a local-first hexagonal modular monolith. A Python runtime brings together the domain services, adapters, extensions, stores, and event bus. The React workspace ships in the same wheel.",
    layers: [
      {
        index: "01",
        title: "Human and agent interfaces",
        role: "Interaction",
        detail:
          "The React canvas uses REST for commands and SSE for live state. Agents and scripts reach the same project through MCP and the CLI.",
        technologies: ["React 19", "TypeScript", "FastAPI", "SSE", "MCP", "Typer"],
      },
      {
        index: "02",
        title: "Shared project runtime",
        role: "Application boundary",
        detail:
          "ProjectRuntime builds the services for one project. WorkspaceService handles mutations, with per-workspace locks, an event reducer, durable snapshots, and domain events.",
        technologies: ["Python 3.12", "Pydantic", "async services", "import-linter"],
      },
      {
        index: "03",
        title: "Document intelligence",
        role: "Producer extension",
        detail:
          "PDFs move from bronze originals to silver Docling output and then to gold semantic regions. Gold content comes from selected source items or table cells and keeps page and bbox provenance.",
        technologies: ["Docling", "PyMuPDF", "structured regions", "embeddings"],
      },
      {
        index: "04",
        title: "Extension and simulation boundary",
        role: "Tool integration",
        detail:
          "Extension manifests describe producer capabilities without pulling PDF or FMU code into the canvas core. FMU operations use a separate service and an optional FMPy runtime.",
        technologies: ["OIP", "extension manifests", "FMI / FMU", "FMPy"],
      },
      {
        index: "05",
        title: "Project substrate and trust policy",
        role: "Persistence and configuration",
        detail:
          "Projects are folders containing document and canvas state as plain files. Named environments own the provider, endpoint, credentials, and local-only policy. A project cannot weaken that boundary.",
        technologies: ["anchor.toml", ".anchor_data", "JSON / JSONL", "environment policy"],
      },
    ],
    boundaryNote:
      "ANCHOR currently runs as a single-tenant local application. HTTP has no authentication, and workspace locks only coordinate work inside one process. One server process must write to a shared project directory.",
  },
  attribution: {
    lamin:
      "I worked across the current v2 codebase. Most of my contribution was in document ingestion, provenance, runtime composition, extension discovery, configuration, and cross-platform fixes.",
    christoffer:
      "Christoffer built the v2 hexagonal foundation and worked on ingestion, the canvas, region handling, and FMU features. Christoffer and I developed ANCHOR as a shared platform.",
    team:
      "ANCHOR is collaborative work at Novia. Mikael Manngård and Johan Westö are also credited in the software citation. The wider project direction is shared team work.",
  },
  contributions: [
    {
      index: "01",
      title: "Source-grounded document extraction",
      problem:
        "Coarse table and page extraction can detach an engineering value from the exact cells and visual region that support it.",
      work:
        "I implemented cell-granular table regions and worked on row- and value-level PDF provenance. I also fixed source highlighting and evidence-edge behavior in the canvas.",
      significance:
        "The work kept extracted values tied to inspectable source content when they were added to a canvas or specification table.",
      evidence: [
        {
          label: "Cell-granular table regions",
          url: commitUrl("dccdc36118424566952806f6aef96fced9077f2c"),
        },
        {
          label: "Row-level value provenance",
          url: commitUrl("79f2a54f823c77024a0bd8b1bf3f8bab1aa7c999"),
        },
        {
          label: "Value-level PDF provenance",
          url: commitUrl("824e0eca826f5a8f2472db7c3a221020304dd016"),
        },
      ],
    },
    {
      index: "02",
      title: "Runtime composition and synchronization",
      problem:
        "HTTP, MCP, and CLI entry points can drift when each constructs its own services, while concurrent workspace edits can interleave across a load–validate–persist sequence.",
      work:
        "I refactored project composition around ProjectRuntime, simplified service boundaries, added per-workspace mutation locks, and connected external canvas events to the SSE update path.",
      significance:
        "The same runtime now serves human and agent operations. Within one process, ANCHOR serializes a complete workspace mutation while other workspaces can continue.",
      evidence: [
        {
          label: "ProjectRuntime composition",
          url: commitUrl("5a816be34e331c2a75204250993404b1c3cb5e63"),
        },
        {
          label: "Serialized workspace mutations",
          url: commitUrl("a75f51d2f02c100923a7148a1f99700e355300d7"),
        },
        {
          label: "External events bridged live",
          url: commitUrl("040755d02b1b86c68e0b3fb80971ed6488e48491"),
        },
      ],
    },
    {
      index: "03",
      title: "Extension discovery and adapter parity",
      problem:
        "Extension metadata and runtime wiring were duplicated across adapters, increasing the risk that the CLI, HTTP, and MCP surfaces exposed different capabilities.",
      work:
        "I centralized manifest discovery and worked on consistent runtime support across HTTP, MCP, and CLI. I also added operation descriptors, a wire-schema snapshot, and registration-path validation.",
      significance:
        "The refactoring reduced duplicated adapter logic and kept producer-specific infrastructure outside the canvas domain.",
      evidence: [
        {
          label: "Centralized manifest discovery",
          url: commitUrl("3b11b21e66e1b5cfb9b01b048f564866d6e02eb7"),
        },
        {
          label: "Runtime adapter parity",
          url: commitUrl("262307e1b385c6ad7ff464534928bf5a08b4f8c6"),
        },
        {
          label: "Manifest path validation",
          url: commitUrl("0fe9d84e7f5d1ceea4e86cdc8b28c77f3f8470f8"),
        },
      ],
    },
    {
      index: "04",
      title: "Configuration, egress boundaries, and portability",
      problem:
        "Ambient credentials, project overrides, and platform-specific filesystem defaults can make document handling unpredictable, especially when a corpus has a strict data policy.",
      work:
        "I implemented environment-owned egress isolation and separated named configuration layers. I also fixed Windows home-path handling and made PDF-store text I/O explicitly UTF-8.",
      significance:
        "Provider and endpoint choices now belong to an explicit environment policy. The Windows fixes also made project setup and extracted text more consistent across operating systems.",
      evidence: [
        {
          label: "Environment egress isolation",
          url: commitUrl("4007ba396f0be39412012ea8e7c462bd3c252683"),
        },
        {
          label: "Named environment isolation",
          url: commitUrl("68080e674d2b1572781dc92854ead37e31456f45"),
        },
        {
          label: "Cross-platform UTF-8 storage",
          url: commitUrl("962d590f240eee32ed91096e259db793f658938a"),
        },
      ],
    },
  ],
  decisions: [
    {
      title: "One domain path, several interfaces",
      decision:
        "ANCHOR keeps transport code outside the canvas core. UI, HTTP, MCP, and CLI operations go through shared services and one project composition root.",
      tradeoff:
        "The ports, runtime profiles, and adapter contracts add structure. In return, behavior stays in one place, and small CLI operations can skip the heavier ingestion dependencies.",
      attribution: "Christoffer and I worked on the current v2 architecture. My contribution here focused on runtime composition and keeping the adapters aligned.",
    },
    {
      title: "Source-derived gold regions",
      decision:
        "ANCHOR builds gold-region content on the server from Docling items or selected table cells. It does not accept that content as agent-authored text.",
      tradeoff:
        "Region resolution and validation are more complex, but stored content stays tied to source geometry instead of an agent paraphrase.",
      attribution: "This is an ANCHOR system decision. I contributed cell-level table regions, document retrieval changes, and value-level provenance.",
    },
    {
      title: "Portable files before managed infrastructure",
      decision:
        "ANCHOR stores documents, canvas snapshots, and append-only events as project-local files. An in-process bus and per-workspace locks coordinate live updates.",
      tradeoff:
        "Projects are inspectable, movable, and require no database, but multi-process writes are deliberately unsupported and a single process remains authoritative.",
      attribution: "This is an ANCHOR system decision. I added the per-workspace mutation locks used by the current runtime.",
    },
    {
      title: "Environment-owned egress",
      decision:
        "ANCHOR resolves the provider and endpoint policy at the environment boundary before it builds model clients. Projects cannot redirect or weaken that policy.",
      tradeoff:
        "Setup is more explicit and local mode omits gold extraction without a local or harness provider, but credentials cannot silently turn a local project into a remote-data workflow.",
      attribution: "I implemented this boundary with tests and updated the shared runtime and documentation.",
    },
    {
      title: "Discover extensions separately from wiring them",
      decision:
        "Extension manifests describe the public surface. Runtime builders provide the stores, clients, and optional services used when the extension runs.",
      tradeoff:
        "The host must validate two related contracts, but discovery no longer requires adapters to know each extension’s filesystem layout or infrastructure details.",
      attribution: "I refactored manifest discovery and the runtime support used by the adapters.",
    },
  ],
  technology: [
    {
      role: "Domain and runtime",
      technologies: ["Python 3.12", "Pydantic", "async services", "import-linter"],
      purpose: "Typed domain models, service orchestration, validation, and enforced dependency direction.",
    },
    {
      role: "Web and agent interfaces",
      technologies: ["FastAPI", "MCP", "SSE", "Typer"],
      purpose: "REST, live browser updates, agent tools, and headless command-line workflows.",
    },
    {
      role: "Interactive workspace",
      technologies: ["TypeScript", "React 19", "Vite", "React Flow", "Zustand", "TanStack Query", "Tailwind CSS 4"],
      purpose: "Canvas interaction, client state, server-state queries, and the bundled production UI.",
    },
    {
      role: "Document intelligence",
      technologies: ["Docling", "PyMuPDF", "sentence-transformers", "OpenAI-compatible vision providers"],
      purpose: "Layout extraction, page rendering, semantic retrieval, and optional gold-region extraction.",
    },
    {
      role: "Simulation and extension contracts",
      technologies: ["FMI / FMU", "FMPy", "Open Ingestion Protocol"],
      purpose: "Inspecting and executing simulation models and exposing swappable producer capabilities.",
    },
    {
      role: "Packaging and quality checks",
      technologies: ["Hatch", "PyPI", "pytest", "Ruff", "GitHub Actions", "CodeQL"],
      purpose: "A wheel containing backend and frontend assets, plus cross-platform build, test, lint, and security checks.",
    },
  ],
  evidence: [
    {
      label: "Current ANCHOR repository",
      url: "https://github.com/Novia-RDI-Seafaring/anchor",
      note: "Source, tests, releases, and current README.",
    },
    {
      label: "Current architecture documentation",
      url: "https://github.com/Novia-RDI-Seafaring/anchor/blob/main/docs/concepts/architecture.md",
      note: "Runtime composition, boundaries, data substrate, interfaces, and stated limitations.",
    },
    {
      label: "Lamin’s attributable commit history",
      url: "https://github.com/Novia-RDI-Seafaring/anchor/commits/main/?author=Lamboyjat",
      note: "Internal attribution source for the contribution areas on this page.",
      public: false,
    },
    {
      label: "Official Novia project story",
      url: "https://www.novia.fi/en/news/news/beyond-chatbots-novia-develops-interactive-ai-workspace-for-engineers",
      note: "Novia's account of the project context and collaboration within Virtual Sea Trial.",
    },
    {
      label: "Software citation and authorship",
      url: "https://github.com/Novia-RDI-Seafaring/anchor/blob/main/CITATION.cff",
      note: "Repository-maintained authorship and release citation.",
    },
  ],
  demonstrates: [
    {
      title: "Agentic system engineering",
      detail: "I worked on services and state used by both people and agents, rather than building a separate chat layer.",
    },
    {
      title: "RAG and document intelligence",
      detail: "I worked on extraction and retrieval paths that keep values tied to source geometry and inspectable document content.",
    },
    {
      title: "System integration",
      detail: "My contribution crossed runtime composition, synchronization, configuration, data policy, Windows support, frontend behavior, packaging, and tests.",
    },
  ],
} satisfies AnchorCaseStudy;
