type Link = {
  label: string;
  url: string;
};

type ExperienceItem = {
  role: string;
  organization: string;
  period: string;
  location: string;
  organizationDescription: string;
  detail: string[];
  links: Link[];
};

type EducationItem = {
  qualification: string;
  institution: string;
  period: string;
  detail: string;
  links: Link[];
};

type PracticeGroup = {
  title: string;
  purpose: string;
  technologies: string[];
};

type WorkingPrinciple = {
  title: string;
  detail: string;
};

type InternalSource = {
  subject: string;
  url: string;
  purpose: string;
};

export type AboutPageData = {
  introduction: string[];
  profileFacts: { label: string; value: string }[];
  currentWork: {
    title: string;
    paragraphs: string[];
    areas: { title: string; detail: string }[];
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  practice: PracticeGroup[];
  approach: WorkingPrinciple[];
  contact: {
    text: string;
    links: Link[];
  };
  internalSources: InternalSource[];
};

export const aboutPage = {
  introduction: [
    "I’m a project researcher at Novia University of Applied Sciences in Turku. I develop software for applied AI and machine-learning research, with most of my recent work focused on technical documents, agent workflows, structured knowledge, and simulation.",
    "I came to this work through software development and systems work, then moved further into data science and machine learning through graduate study. That background still shapes how I build. A model is one part of a system that also needs clear interfaces, traceable data, tests, and a usable way for people to inspect the result.",
  ],
  profileFacts: [
    { label: "Current role", value: "Project Researcher" },
    { label: "Organization", value: "Novia University of Applied Sciences" },
    { label: "Location", value: "Turku, Finland" },
    { label: "Primary GitHub", value: "Lamboyjat" },
  ],
  currentWork: {
    title: "I work on the software around applied AI research.",
    paragraphs: [
      "At Novia, I work in maritime and intelligent-systems research. My role combines data science, machine learning, and application development. Depending on the project, that can mean a Python service, a document-processing pipeline, an agent tool, an evaluation workflow, or a React interface.",
      "My recent work includes ANCHOR, MERI, and Agent-in-the-Loop. These are collaborative projects. Together they cover source-grounded document extraction, retrieval, tool-using agents, interactive engineering workspaces, and simulation workflows using FMUs.",
    ],
    areas: [
      {
        title: "Documents and structured knowledge",
        detail:
          "I work on ingestion, extraction, retrieval, and provenance paths that keep technical information connected to its source.",
      },
      {
        title: "Agents and evaluation",
        detail:
          "I build tool-calling workflows and evaluation paths where intermediate actions can be checked against the engineering task.",
      },
      {
        title: "Engineering interfaces",
        detail:
          "I connect backend services, agent operations, interactive frontends, and simulation tools around shared project state.",
      },
    ],
  },
  experience: [
    {
      role: "Project Researcher",
      organization: "Novia University of Applied Sciences",
      period: "February 2024 to present",
      location: "Turku, Finland",
      organizationDescription:
        "A Finnish university of applied sciences whose Maritime Technology RDI work covers digitalization, automation, simulation, data processing, and AI.",
      detail: [
        "I contribute to Novia’s Maritime Technology RDI work through the Virtual Sea Trial project. My work includes shared test environments for virtual sea trials, commissioning, and simulation-based system integration, with an emphasis on automation, data, and AI.",
      ],
      links: [
        {
          label: "Novia staff profile",
          url: "https://www.novia.fi/en/contact-us/staff?start=168",
        },
        {
          label: "Research group",
          url: "https://intelligent-systems.fi/research-group/",
        },
      ],
    },
    {
      role: "Data Scientist",
      organization: "JUICER",
      period: "August 2022 to August 2024",
      location: "United States",
      organizationDescription:
        "A US software company providing restaurant pricing and margin-management tools using POS, sales, cost, and market data.",
      detail: [
        "I collected and prepared data, ran exploratory analyses, and built client-facing visual reports. I engineered features and deployed machine-learning models for time-series forecasting and price recommendations.",
      ],
      links: [
        {
          label: "JUICER",
          url: "https://www.juicerpricing.com/",
        },
      ],
    },
    {
      role: "AI Software Developer Intern",
      organization: "SUPPLYZ Oy (now RESONIKS)",
      period: "December 2022 to May 2023",
      location: "Tampere Metropolitan Area, Finland",
      organizationDescription:
        "A Tampere-based engineering RDI company developing AI-assisted acoustic inspection and non-destructive testing for structural defects.",
      detail: [
        "I analyzed acoustic and relational datasets and developed machine-learning models. I also worked with MLflow, GCP, Vertex AI, BigQuery, Cloud Run, DVC, TensorFlow, and PyTorch in the development and deployment workflow.",
      ],
      links: [
        {
          label: "RESONIKS",
          url: "https://www.resoniks.com/",
        },
      ],
    },
    {
      role: "Assistant System Administrator",
      organization: "Guaranty Trust Bank (Gambia) Ltd",
      period: "October 2017 to October 2019",
      location: "Fajara, The Gambia",
      organizationDescription:
        "An active Gambian commercial bank providing personal, business, corporate, and SME banking services.",
      detail: [
        "I supported application developers and support staff by maintaining Active Directory and server applications, testing and debugging banking systems, running end-of-day backups, and helping staff use operational applications.",
      ],
      links: [
        {
          label: "GTBank Gambia",
          url: "https://www.gtbankgambia.com/",
        },
      ],
    },
    {
      role: "Web Developer",
      organization: "Xanda Limited",
      period: "January 2017 to October 2017",
      location: "London, United Kingdom",
      organizationDescription:
        "A London technology and digital agency providing website and software development services.",
      detail: [
        "I contributed to project development, implementation, testing, and release, with a focus on WordPress websites.",
      ],
      links: [
        {
          label: "Xanda",
          url: "https://www.xanda.net/",
        },
      ],
    },
    {
      role: "Quality Assurance Technician",
      organization: "International Consumer Services Sweden AB / alaTest",
      period: "April 2016 to September 2016",
      location: "Stockholm, Sweden",
      organizationDescription:
        "A Stockholm company that collects and publishes consumer information through web portals and software services.",
      detail: [
        "I monitored the quality of review-to-product matching, provided feedback to production teams, and worked on delivery-flow and pipeline problems.",
      ],
      links: [],
    },
    {
      role: "Lecturer and Course Trainer",
      organization: "Management Development Institute",
      period: "January 2014 to November 2015",
      location: "The Gambia",
      organizationDescription:
        "A public Gambian institute providing professional training, research, and consultancy to public, private, and NGO sectors.",
      detail: [
        "I delivered Cisco networking training covering network cabling and inter-networking for homes and small to medium-sized organizations.",
      ],
      links: [
        {
          label: "Management Development Institute",
          url: "https://www.mdi.edu.gm/",
        },
      ],
    },
  ],
  education: [
    {
      qualification: "Master’s degree in Computer Science",
      institution: "Åbo Akademi University",
      period: "2024",
      detail:
        "My thesis studied post-processing for maritime VHF speech transcripts using sentence embeddings, Standard Maritime Communication Phrases, and a fine-tuned language model.",
      links: [
        {
          label: "Research page",
          url: "/research/#maritime-asr",
        },
        {
          label: "Thesis record",
          url: "https://urn.fi/URN:NBN:fi-fe2024060343553",
        },
      ],
    },
    {
      qualification: "Master’s degree in Computer Science",
      institution: "Ca’ Foscari University of Venice",
      period: "2022/2023",
      detail:
        "My thesis compared Naive Bayes, k-nearest neighbours, logistic regression, and linear and quadratic discriminant analysis. I evaluated classification accuracy and precision through simulations and an application to a real dataset, with the analysis implemented in R.",
      links: [
        {
          label: "Official UNITesi record",
          url: "https://unitesi.unive.it/handle/20.500.14247/11685",
        },
      ],
    },
  ],
  practice: [
    {
      title: "AI and machine learning",
      purpose:
        "Language, document, and multimodal workflows, from embeddings and retrieval to tool-using agents.",
      technologies: ["Python", "PydanticAI", "sentence-transformers", "scikit-learn", "multimodal LLMs"],
    },
    {
      title: "Backend and agent systems",
      purpose:
        "Typed services and explicit tool boundaries shared by web interfaces, command-line workflows, and agents.",
      technologies: ["FastAPI", "Pydantic", "MCP", "async Python", "Typer"],
    },
    {
      title: "Frontend",
      purpose:
        "Interactive workspaces for inspecting documents, structured information, agent actions, and engineering state.",
      technologies: ["TypeScript", "React", "Vite", "React Flow", "Zustand"],
    },
    {
      title: "Data and retrieval",
      purpose:
        "Document parsing, semantic retrieval, source regions, and portable structured project data.",
      technologies: ["Docling", "PyMuPDF", "semantic search", "JSON / JSONL", "document provenance"],
    },
    {
      title: "Infrastructure and delivery",
      purpose:
        "Packaging, automated checks, and repeatable local or hosted software workflows.",
      technologies: ["Docker", "GitHub Actions", "Hatch / PyPI", "pytest", "Ruff"],
    },
    {
      title: "Research and evaluation",
      purpose:
        "Experiments that connect model behavior to source material, deterministic calculations, and engineering tasks.",
      technologies: ["Jupyter", "experiment design", "ground-truth evaluators", "FMI / FMU", "synthetic datasets"],
    },
  ],
  approach: [
    {
      title: "Keep the source attached",
      detail:
        "When a system extracts information from a document, I prefer carrying the page, region, or source item with the value instead of treating provenance as a later addition.",
    },
    {
      title: "Evaluate the workflow",
      detail:
        "For agent systems, I look at tool calls and intermediate results as well as the final response. A plausible answer is not enough when the task includes retrieval, calculation, or simulation.",
    },
    {
      title: "Make boundaries explicit",
      detail:
        "Typed interfaces, validation, configuration boundaries, and small modules make it easier to understand what a model can change and what the surrounding software must control.",
    },
    {
      title: "Keep research code usable",
      detail:
        "I try to keep experiments close to software that can be tested, packaged, run from a command line, or used through an interface. That makes the research easier to repeat and extend.",
    },
  ],
  contact: {
    text:
      "For project or role discussions, email is the most direct route. GitHub and LinkedIn provide the public code and professional context behind this portfolio.",
    links: [
      { label: "Email", url: "mailto:lamin.jatta@novia.fi" },
      { label: "GitHub", url: "https://github.com/Lamboyjat" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/lamin-jatta/" },
    ],
  },
  internalSources: [
    {
      subject: "Current Novia role and public email",
      url: "https://www.novia.fi/en/contact-us/staff?start=168",
      purpose: "Current title, organization, Turku unit, and contact address.",
    },
    {
      subject: "Novia Intelligent Systems research group",
      url: "https://intelligent-systems.fi/research-group/",
      purpose: "Project researcher role and public focus in frontend development, data science, and machine learning.",
    },
    {
      subject: "Primary GitHub profile",
      url: "https://github.com/Lamboyjat",
      purpose: "Primary development identity, earlier systems and development background, and technology context.",
    },
    {
      subject: "Åbo Akademi master’s thesis",
      url: "https://urn.fi/URN:NBN:fi-fe2024060343553",
      purpose: "Author, year, degree programme, thesis title, methods, and research scope.",
    },
    {
      subject: "Ca’ Foscari thesis record",
      url: "https://unitesi.unive.it/handle/20.500.14247/11685",
      purpose: "Author, thesis title, abstract, methods, academic year, course of study, and degree level.",
    },
    {
      subject: "ANCHOR case-study sources",
      url: "https://github.com/Novia-RDI-Seafaring/anchor",
      purpose: "Current architecture, attributable implementation work, and technical practice.",
    },
    {
      subject: "MERI research record",
      url: "https://research.abo.fi/en/publications/towards-automated-parameter-extraction-from-engineering-documents/",
      purpose: "Collaborative document-intelligence work, authorship, methods, and publication context.",
    },
    {
      subject: "Agent-in-the-Loop repository",
      url: "https://github.com/Novia-RDI-Seafaring/control-agent",
      purpose: "Collaborative agent workflow, evaluation, simulation, and attributable implementation work.",
    },
  ],
} satisfies AboutPageData;
