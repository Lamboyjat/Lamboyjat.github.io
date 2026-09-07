type SourceLink = {
  label: string;
  url: string;
  note?: string;
  public?: boolean;
};

type PipelineStage = {
  index: string;
  title: string;
  detail: string;
  output: string;
};

type ContributionArea = {
  index: string;
  title: string;
  problem: string;
  work: string;
  significance: string;
};

type EngineeringDecision = {
  scope: string;
  title: string;
  decision: string;
  tradeoff: string;
};

type TechnologyGroup = {
  role: string;
  technologies: string[];
  purpose: string;
};

type InternalReview = {
  repositoryRevision: string;
  repositoryRevisionDate: string;
  attributionSources: SourceLink[];
};

export type MeriCaseStudy = {
  title: string;
  fullName: string;
  paperTitle: string;
  problemStatement: string;
  role: string;
  context: string;
  period: string;
  heroLinks: SourceLink[];
  problem: {
    title: string;
    paragraphs: string[];
    constraints: { title: string; detail: string }[];
  };
  pipeline: {
    title: string;
    introduction: string;
    stages: PipelineStage[];
    boundary: string;
  };
  collaboration: {
    introduction: string;
    software: string;
    research: string;
    currentRepository: string;
  };
  contributions: ContributionArea[];
  decisions: EngineeringDecision[];
  relationship: {
    title: string;
    introduction: string;
    paper: {
      title: string;
      detail: string;
      facts: { value: string; label: string }[];
    };
    repository: {
      title: string;
      detail: string;
      facts: { value: string; label: string }[];
    };
    conclusion: string;
  };
  technology: TechnologyGroup[];
  sources: SourceLink[];
  internalReview: InternalReview;
};

export const meriCaseStudy = {
  title: "MERI",
  fullName: "Modality-Aware Extraction and Retrieval of Information",
  paperTitle: "Towards Automated Parameter Extraction from Engineering Documents",
  problemStatement:
    "MERI turns mixed-layout engineering documents into a structured intermediate form before asking a language model to extract parameters and their source locations.",
  role: "Co-author and software contributor",
  context: "Novia UAS · Åbo Akademi University · Virtual Sea Trial",
  period: "2024 to 2025",
  heroLinks: [
    {
      label: "Published paper",
      url: "https://www.sciencedirect.com/science/article/pii/S2405896325025856",
    },
    {
      label: "Repository",
      url: "https://github.com/Novia-RDI-Seafaring/MERI",
    },
  ],
  problem: {
    title: "Engineering documents do not expose parameters in one consistent form.",
    paragraphs: [
      "A datasheet can place one value in a paragraph, another in a table, and a third inside a figure. Layout changes between manufacturers, and even small changes to borders or spacing can alter what a document model detects.",
      "The task is not only to return a value. For engineering use, the result also needs its unit, page number, and bounding box so that someone can check where it came from.",
    ],
    constraints: [
      {
        title: "Mixed modalities",
        detail: "Text, tables, lists, drawings, and figures need different parsing strategies before they can be handled through one extraction interface.",
      },
      {
        title: "Layout variation",
        detail: "The same content can produce different detection results when table borders, widths, margins, or image sizes change.",
      },
      {
        title: "Source location",
        detail: "A useful parameter record includes the value and unit together with the page and bounding box that support it.",
      },
    ],
  },
  pipeline: {
    title: "From PDF structure to a populated engineering schema.",
    introduction:
      "The published method uses two main processing steps. The first creates an HTML representation of the document. The second asks a multimodal language model to populate a JSON schema from that representation.",
    stages: [
      {
        index: "01",
        title: "Document and task",
        detail:
          "MERI receives a PDF and a JSON schema describing the parameters and attributes to extract.",
        output: "PDF + parameter schema",
      },
      {
        index: "02",
        title: "Layout and modality parsing",
        detail:
          "The parser detects text, tables, and pictures, then keeps page and bounding-box information for each element.",
        output: "Typed document elements",
      },
      {
        index: "03",
        title: "Intermediate representation",
        detail:
          "Detected content is converted to HTML. Text remains text, images remain available to the multimodal model, and location data stays attached.",
        output: "Source-linked HTML",
      },
      {
        index: "04",
        title: "Structured extraction",
        detail:
          "The model receives the HTML, prompt, and schema, then returns a populated JSON object containing the requested parameter attributes.",
        output: "Schema-conformant JSON",
      },
    ],
    boundary:
      "The paper treats searchable retrieval and RAG over the intermediate representation as future work. Current main can chunk the HTML for model calls, but it does not implement vector retrieval or a RAG index.",
  },
  collaboration: {
    introduction:
      "MERI was collaborative work. Christian Möller and I are named as authors of the software package. The published study was written with Christoffer Björkskog, Andreas Lundell, Mikael Manngård, and Johan Westö.",
    software:
      "My public repository history is concentrated in the earlier research implementation. I worked on layout evaluation, extraction paths, table processing, the interactive demo, source highlighting, pipeline configuration, and maintenance.",
    research:
      "The research question, synthetic benchmark, final evaluation, and paper belong to the author team. I do not present those shared results as my work alone.",
    currentRepository:
      "Christian introduced the Docling integration and FastHTML demo that now define the package on main. That refactor replaced much of the earlier component pipeline where most of my attributable code appears.",
  },
  contributions: [
    {
      index: "01",
      title: "Layout evaluation and bounding boxes",
      problem:
        "Layout detection had to be checked against annotated document regions before downstream extraction errors could be understood.",
      work:
        "I added evaluation scripts and notebooks for comparing detected regions with CVAT annotations. The work covered bounding-box scaling, IoU matching, precision and recall calculations, visual overlays, and additional randomized bounding-box tests.",
      significance:
        "This gave the team a way to inspect the document stage separately from the language-model stage. It also made layout failures visible before they appeared as missing or incorrectly grounded parameters.",
    },
    {
      index: "02",
      title: "Common extraction paths",
      problem:
        "Tables could be processed through PDFPlumber, a language model, or a table-structure model. Each path produced different shapes and created repeated extraction logic.",
      work:
        "I changed table processing to produce a common HTML form and consolidated the one-to-one, one-to-many, and self-supervised JSON population strategies around a shared completion path. I also fixed table-cell validation where row and column identifiers did not match the typed model.",
      significance:
        "A common representation reduced branching between modalities. It also made the extraction stage easier to test and change without coupling it to one table parser.",
    },
    {
      index: "03",
      title: "Interactive extraction and source inspection",
      problem:
        "A JSON result alone did not show whether a parameter came from the correct place in the source document.",
      work:
        "I built the first full MERI demo flow for uploading a PDF and schema, running the configured pipeline, inspecting intermediate output, and viewing extracted results. I added source highlighting that scaled returned bounding boxes back onto rendered PDF pages.",
      significance:
        "The demo connected model output to the document during development. It made incorrect coordinates, missed layout elements, and schema problems easier to inspect with the result in view.",
    },
    {
      index: "04",
      title: "Configuration and research-code maintenance",
      problem:
        "The earlier component pipeline had scattered configuration paths, a large set of detector options, and dependencies that needed maintenance.",
      work:
        "I reorganized the layout and pipeline configuration, added a configuration manager, simplified how configured components were assembled, updated affected dependencies, and added small helpers for safer path, YAML, and subprocess handling.",
      significance:
        "These changes made the earlier research pipeline easier to configure and run. They are part of the project history rather than the current Docling architecture, which later replaced that code.",
    },
  ],
  decisions: [
    {
      scope: "Published method",
      title: "Create an intermediate representation before extraction",
      decision:
        "MERI separates document interpretation from parameter extraction. Layout elements are converted to HTML before the language model receives the task.",
      tradeoff:
        "The model receives cleaner structure, but errors from layout detection and conversion propagate into the final result.",
    },
    {
      scope: "Published method",
      title: "Keep location attributes in the extraction schema",
      decision:
        "Values and units are extracted together with page numbers and bounding boxes, rather than adding source locations after extraction.",
      tradeoff:
        "The output is easier to inspect, but the model must get both the parameter and its spatial attributes right.",
    },
    {
      scope: "My implementation work",
      title: "Normalize modality outputs before model calls",
      decision:
        "I moved table extraction paths toward a shared HTML representation and reused one completion flow across extraction strategies.",
      tradeoff:
        "Normalization removes duplicated branches, but it can hide parser-specific detail unless the intermediate format carries that detail explicitly.",
    },
    {
      scope: "Research evaluation",
      title: "Vary layout while keeping content fixed",
      decision:
        "The study generated 16 styled versions of the same four-page content document, with ground-truth locations updated for every version.",
      tradeoff:
        "This isolates layout effects, but one synthetic content document cannot establish reliability across all real engineering documents.",
    },
  ],
  relationship: {
    title: "The paper evaluates one configuration of a configurable system.",
    introduction:
      "The paper and current repository share the same Docling-to-HTML core. The difference is mainly between a fixed experimental setup and a package that exposes runtime options.",
    paper: {
      title: "Published evaluation",
      detail:
        "The study used Docling, EasyOCR, GPT-4o with temperature zero, and documents that fit within one model context. It compared MERI with a direct language-model baseline and with ground-truth HTML.",
      facts: [
        { value: "16", label: "layout variations" },
        { value: "512", label: "parameter tasks" },
        { value: "79.19%", label: "MERI mean F1" },
      ],
    },
    repository: {
      title: "Current repository",
      detail:
        "The package uses Docling 2.5.2 with TableFormer, an HTML format handler, LiteLLM-backed model calls, configurable chunking, optional OCR and cell matching, and a FastHTML demo.",
      facts: [
        { value: "2 steps", label: "parse, then extract" },
        { value: "HTML", label: "intermediate form" },
        { value: "JSON", label: "structured output" },
      ],
    },
    conclusion:
      "The repository was simplified before the paper was published, not after it. Current main no longer contains the earlier custom detector and evaluation stack where most of my implementation history sits. The published result also shows why that work mattered: perfect intermediate HTML reached 84.79% mean F1, while layout failures reduced the end-to-end result.",
  },
  technology: [
    {
      role: "Current document processing",
      technologies: ["Python", "Docling", "DocLayNet", "TableFormer", "PyPdfium2", "PyMuPDF"],
      purpose:
        "Detect document elements, extract their content, and retain page and bounding-box information in the HTML representation.",
    },
    {
      role: "Structured extraction",
      technologies: ["HTML", "JSON Schema", "LiteLLM", "Multimodal LLMs", "Tool calling"],
      purpose:
        "Prepare text and image content for model calls and return parameters through a defined JSON shape.",
    },
    {
      role: "Published evaluation",
      technologies: ["GPT-4o", "EasyOCR", "Synthetic HTML/CSS documents", "F1", "IoU"],
      purpose:
        "Compare extraction across controlled layout changes and measure both parameter attributes and source locations.",
    },
    {
      role: "Earlier research implementation",
      technologies: ["DeepDoctection", "PDFPlumber", "TATR", "Gradio", "YAML"],
      purpose:
        "Support the configurable detector, table-processing, evaluation, and demo work present during my main contribution period.",
    },
    {
      role: "Package and demo",
      technologies: ["FastHTML", "Poetry", "Docker", "Docker Compose"],
      purpose:
        "Install the Python package and run the current browser-based extraction demo in a repeatable environment.",
    },
  ],
  sources: [
    {
      label: "Published paper on ScienceDirect",
      url: "https://www.sciencedirect.com/science/article/pii/S2405896325025856",
      note: "Final peer-reviewed article in IFAC-PapersOnLine, volume 59, issue 24, pages 197 to 202.",
    },
    {
      label: "Åbo Akademi publication record",
      url: "https://research.abo.fi/en/publications/towards-automated-parameter-extraction-from-engineering-documents/",
      note: "Author list, publication metadata, DOI, and open-access manuscript.",
    },
    {
      label: "MERI repository",
      url: "https://github.com/Novia-RDI-Seafaring/MERI",
      note: "Current package, demo, documentation, software citation, and public project history.",
    },
    {
      label: "My MERI contribution history",
      url: "https://github.com/Novia-RDI-Seafaring/MERI/commits/main/?author=Lamboyjat",
      note: "Public commits associated with my primary GitHub identity and author records used during the project.",
    },
    {
      label: "Virtual Sea Trial project note",
      url: "https://virtualseatrial.fi/parameter-extraction-from-engineering-documents/",
      note: "Official project context for parameter extraction from engineering datasheets.",
    },
  ],
  internalReview: {
    repositoryRevision: "9db5a98354ebc9ae83b6930c88fb878cd8e3c9e3",
    repositoryRevisionDate: "2025-03-21",
    attributionSources: [
      {
        label: "Repository history for Lamin Jatta author records",
        url: "https://github.com/Novia-RDI-Seafaring/MERI/commits/main/?author=Lamboyjat",
        public: false,
      },
      {
        label: "Published paper PDF",
        url: "https://research.abo.fi/ws/files/72603046/1-s2.0-S2405896325025856-main.pdf",
        public: false,
      },
    ],
  },
} satisfies MeriCaseStudy;
