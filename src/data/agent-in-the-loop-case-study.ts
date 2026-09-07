type SourceLink = {
  label: string;
  url: string;
  note?: string;
  public?: boolean;
};

type FlowStage = {
  index: string;
  title: string;
  detail: string;
};

type ContributionArea = {
  index: string;
  scope: string;
  title: string;
  problem: string;
  work: string;
  significance: string;
};

type EngineeringDecision = {
  title: string;
  decision: string;
  tradeoff: string;
};

type Experiment = {
  index: string;
  name: string;
  task: string;
  checks: string;
};

type TechnologyGroup = {
  role: string;
  technologies: string[];
  purpose: string;
};

type InternalReview = {
  repositoryRevision: string;
  publishedExperimentRevision: string;
  contributionRevisions: string[];
  attributionSources: SourceLink[];
};

export type AgentInTheLoopCaseStudy = {
  title: string;
  paperTitle: string;
  problemStatement: string;
  role: string;
  context: string;
  period: string;
  heroLinks: SourceLink[];
  problem: {
    title: string;
    paragraphs: string[];
    pressures: { title: string; detail: string }[];
  };
  workflow: {
    title: string;
    introduction: string;
    stages: FlowStage[];
    feedback: string;
  };
  collaboration: {
    introduction: string;
    publishedWork: string;
    currentRepository: string;
    branchWork: string;
  };
  contributions: ContributionArea[];
  decisions: EngineeringDecision[];
  evaluation: {
    title: string;
    introduction: string;
    experiments: Experiment[];
    result: string;
    interpretation: string;
  };
  limitations: {
    title: string;
    items: { title: string; detail: string }[];
  };
  relationship: {
    title: string;
    paper: string;
    current: string;
    conclusion: string;
  };
  technology: TechnologyGroup[];
  sources: SourceLink[];
  internalReview: InternalReview;
};

export const agentInTheLoopCaseStudy = {
  title: "Agent-in-the-Loop",
  paperTitle: "Using AI Agents to Perform Control-Oriented Simulation Tasks",
  problemStatement:
    "We studied whether an AI agent could carry out control-engineering experiments through executable simulation tools, then checked both the result and the path it took.",
  role: "Co-author and software contributor",
  context: "Novia UAS · Virtual Sea Trial · ECC 2026",
  period: "2025 to 2026",
  heroLinks: [
    {
      label: "Published paper",
      url: "https://ieeexplore.ieee.org/document/11625625",
    },
    {
      label: "Repository",
      url: "https://github.com/Novia-RDI-Seafaring/control-agent",
    },
  ],
  problem: {
    title: "A correct answer is not enough when an agent controls an experiment.",
    paragraphs: [
      "A control-engineering task can require several dependent actions. The agent may need to inspect a model, configure an FMU, run a simulation, read the response, identify system parameters, and tune a controller. A mistake early in that sequence changes every result that follows.",
      "The research question was practical: can a language-model agent choose and execute the right tools for these workflows, and can we evaluate more than the final text response? The implementation therefore records tool use and checks numerical outputs against deterministic control calculations.",
    ],
    pressures: [
      {
        title: "Executable actions",
        detail:
          "Simulation and analysis must happen through tools with typed inputs, not through values invented in the model response.",
      },
      {
        title: "State between steps",
        detail:
          "Later actions depend on the selected FMU and the data produced by earlier simulations.",
      },
      {
        title: "Measurable results",
        detail:
          "A fluent response can still hide a wrong time series, parameter estimate, controller setting, or tool sequence.",
      },
    ],
  },
  workflow: {
    title: "The agent works inside an execution and evaluation loop.",
    introduction:
      "The current package keeps the language model at the orchestration layer. Simulation, signal analysis, identification, and tuning are exposed as Python tools around an FMU runtime.",
    stages: [
      {
        index: "01",
        title: "Task and output contract",
        detail:
          "An experiment supplies a natural-language task, a typed response model, and task-specific evaluators.",
      },
      {
        index: "02",
        title: "Agent decision",
        detail:
          "A PydanticAI agent receives the available tool descriptions and selects the next action and arguments.",
      },
      {
        index: "03",
        title: "Tool execution",
        detail:
          "The control toolbox runs FMU simulation, signal analysis, system identification, or controller tuning code.",
      },
      {
        index: "04",
        title: "State and observation",
        detail:
          "Simulation data and derived values are returned to the agent or retained in a typed simulation context for the next step.",
      },
      {
        index: "05",
        title: "Evaluation",
        detail:
          "The runner inspects the response, required tool calls, and task-specific numerical checks, then saves reports and result data when requested.",
      },
    ],
    feedback:
      "For a multi-step task, the observation feeds the next agent decision. Completion is evaluated separately from how efficiently the agent reached it.",
  },
  collaboration: {
    introduction:
      "This was collaborative research with Christoffer Björkskog and Mikael Manngård. We share authorship of the paper and the benchmark design.",
    publishedWork:
      "Mikael finalized several experiment definitions and evaluators used for the publication. The control methods, benchmark tasks, evaluation design, experiments, and conclusions are shared research work.",
    currentRepository:
      "Christoffer prepared the later public release, removed unused research code, moved the prompt and response schemas into their current locations, and documented the model used in the experiments.",
    branchWork:
      "I also explored planning and precondition guardrails on a separate development branch. That work was not part of the published benchmark and is not present on current main.",
  },
  contributions: [
    {
      index: "01",
      scope: "Published software path",
      title: "PydanticAI agent and typed tool calls",
      problem:
        "The early prototype needed an agent runtime that could call simulation functions with structured arguments and return typed results.",
      work:
        "I implemented the initial PydanticAI tool-calling path, including the agent setup, FMI tool wrappers, response schemas, and supporting runtime code. I also added validation to keep signal arrays aligned with their timestamps and fixed failures in repeated tool execution.",
      significance:
        "The agent could execute control operations through defined interfaces instead of treating simulation as a text-only reasoning task. Typed data also made malformed results visible before evaluation.",
    },
    {
      index: "02",
      scope: "Current repository",
      title: "Separating the agent from the control toolbox",
      problem:
        "Simulation, signal analysis, and tuning code had accumulated inside the agent package, which made the orchestration layer harder to change and reuse.",
      work:
        "I removed unused interfaces and migrated the control functions into the shared agent-control-toolbox dependency. I then reorganized the remaining package around the agent, experiments, evaluators, and command-line runner.",
      significance:
        "The current repository keeps agent behavior separate from deterministic engineering functions. The same control tools can be tested and reused without the language-model runtime.",
    },
    {
      index: "03",
      scope: "Published evaluation path",
      title: "Experiment execution and result reporting",
      problem:
        "Running an agent once did not provide enough information to compare tasks or inspect where a run succeeded or failed.",
      work:
        "I worked on the experiment runner, report serialization, console reporting, and multi-experiment execution. I added CSV and pickle exports containing evaluator output, tool-call histories, response messages, model information, and timing data.",
      significance:
        "The research team could inspect the result together with the execution trace. That made redundant calls and evaluator failures visible instead of reducing each run to one final answer.",
    },
    {
      index: "04",
      scope: "Evaluation and debugging",
      title: "Ground-truth checks and evaluator fixes",
      problem:
        "Nested agent outputs and stored simulation state made it easy for an evaluator to read the wrong object or count a failed tool attempt as successful work.",
      work:
        "I fixed step-response extraction and comparison against a deterministic simulation. I also improved result handling, evaluator diagnostics, and export of the messages needed to debug a run.",
      significance:
        "The checks compared the agent's result with the simulation output rather than accepting a plausible description. The reporting work also exposed the action sequence behind that result.",
    },
    {
      index: "05",
      scope: "Separate development branch",
      title: "Planning and tool precondition experiments",
      problem:
        "Longer tasks can fail when the agent repeats an action, skips a prerequisite, or continues after a tool reports an error.",
      work:
        "I built an experimental planning path with tool precondition guardrails, plan execution, validation, and unit tests. I also changed evaluator utilities to distinguish failed calls from successful calls.",
      significance:
        "The branch tested a more explicit way to control multi-step execution. It remains experimental and is not presented here as part of the ECC results or current main branch.",
    },
  ],
  decisions: [
    {
      title: "Expose engineering operations as typed tools",
      decision:
        "The language model chooses actions, while Python functions perform simulation, identification, analysis, and tuning. Pydantic models define tool arguments and result shapes.",
      tradeoff:
        "The boundary makes execution inspectable, but tool descriptions and schemas become part of the agent's behavior. Ambiguous descriptions can still produce the wrong action or arguments.",
    },
    {
      title: "Hide plant dynamics inside the FMU",
      decision:
        "The benchmark packages a first-order plus dead-time plant and an ideal PI controller in one FMU. Controller parameters are exposed, while plant parameters are hidden from the agent.",
      tradeoff:
        "The setup prevents direct parameter lookup and forces experimentation. It is still a controlled benchmark and does not represent the range of models found in industrial simulation work.",
    },
    {
      title: "Check the path as well as the response",
      decision:
        "Task evaluators compare numerical outputs with known calculations, while tool-use evaluators inspect required actions and repeated calls.",
      tradeoff:
        "The checks catch more than a text comparison, but they require task-specific ground truth and do not prove that an unexpected but valid strategy is wrong.",
    },
    {
      title: "Increase task complexity one dependency at a time",
      decision:
        "The benchmark starts with one simulation and then adds response analysis, system identification, formula-based tuning, and iterative tuning against performance limits.",
      tradeoff:
        "The sequence makes execution failures easier to locate. Six tasks on one plant remain too narrow for claims about general control-engineering autonomy.",
    },
  ],
  evaluation: {
    title: "Six tasks tested increasingly long chains of action.",
    introduction:
      "The published experiments used GPT-5-mini through Azure OpenAI. Each task required a structured response, and the repository defines numerical or tool-use checks suited to that task.",
    experiments: [
      {
        index: "01",
        name: "Open-loop step",
        task: "Configure and run one open-loop FMU simulation.",
        checks: "Tool use and simulated response",
      },
      {
        index: "02",
        name: "Closed-loop step",
        task: "Run a closed-loop simulation with supplied PI settings.",
        checks: "Tool use and simulated response",
      },
      {
        index: "03",
        name: "Response analysis",
        task: "Simulate, then calculate rise time, settling time, and overshoot.",
        checks: "Required analysis calls and response metrics",
      },
      {
        index: "04",
        name: "System identification",
        task: "Run an open-loop test and estimate a FOPDT model.",
        checks: "Tool use and identified K, T, and L",
      },
      {
        index: "05",
        name: "Lambda tuning",
        task: "Identify the system and calculate PI settings with the lambda method.",
        checks: "Tool use and controller parameters",
      },
      {
        index: "06",
        name: "Specification tuning",
        task: "Adjust PI settings iteratively until rise-time and overshoot limits are met.",
        checks: "Re-simulation of the proposed controller",
      },
    ],
    result:
      "The paper reports that every run satisfied its response evaluators across the six benchmark tasks.",
    interpretation:
      "Success did not mean every execution path was efficient. Redundant and non-optimal tool calls appeared more often as the tasks required longer chains, which is why the work reports both completion and tool behavior.",
  },
  limitations: {
    title: "What did not work cleanly",
    items: [
      {
        title: "Longer chains added unnecessary work",
        detail:
          "The agent completed the benchmark responses, but more complex tasks produced redundant or non-optimal tool calls.",
      },
      {
        title: "Tool interfaces shaped the result",
        detail:
          "Success depended on the tool descriptions, typed arguments, returned observations, and the amount of state passed between calls.",
      },
      {
        title: "The benchmark was intentionally narrow",
        detail:
          "The experiments used one FOPDT plant, one PI-controller structure, six tasks, and one model deployment. They test this workflow, not control engineering in general.",
      },
    ],
  },
  relationship: {
    title: "The paper evaluates the same core system that the repository now publishes.",
    paper:
      "The study asks whether an agent can plan and execute deterministic simulation workflows. It evaluates six tasks built from the control-agent package and agent-control-toolbox, using GPT-5-mini on Azure OpenAI.",
    current:
      "Current main is a cleaned public release descended from the experiment branch. The core PydanticAI, FMU tool, experiment, and evaluator structure remains. Later changes mainly remove unused research code, move modules, and improve documentation.",
    conclusion:
      "My planning and guardrail experiments live on a separate branch. I keep them separate from the published system because they were not used to produce the reported results.",
  },
  technology: [
    {
      role: "Agent and model interface",
      technologies: ["Python", "PydanticAI", "Pydantic", "GPT-5-mini", "Azure OpenAI"],
      purpose:
        "Create the agent, define typed tool and response contracts, and connect the published experiment to its model deployment.",
    },
    {
      role: "Simulation and control",
      technologies: ["FMI / FMU", "FMPy", "agent-control-toolbox", "NumPy", "SciPy"],
      purpose:
        "Run deterministic simulations and provide signal analysis, FOPDT identification, and PI-tuning operations.",
    },
    {
      role: "Evaluation",
      technologies: ["Pydantic Evals", "pytest", "Pandas", "Rich"],
      purpose:
        "Define benchmark cases, compare numerical outputs, inspect tool use, and save readable and machine-processable results.",
    },
    {
      role: "Runtime and development",
      technologies: ["Typer", "uv", "Logfire", "pyproject.toml"],
      purpose:
        "Run experiments from the command line, manage the package, and support local instrumentation and debugging.",
    },
  ],
  sources: [
    {
      label: "Published paper on IEEE Xplore",
      url: "https://ieeexplore.ieee.org/document/11625625",
      note: "European Control Conference 2026, pages 3109 to 3115.",
    },
    {
      label: "ECC 2026 conference programme",
      url: "https://controls.papercept.net/conferences/conferences/ECC26/program/ECC26_ContentListWeb_3.html",
      note: "Paper title, authors, session, abstract, and conference presentation record.",
    },
    {
      label: "control-agent repository",
      url: "https://github.com/Novia-RDI-Seafaring/control-agent",
      note: "Current package, benchmark definitions, evaluators, FMU models, and public project history.",
    },
    {
      label: "My control-agent contribution history",
      url: "https://github.com/Novia-RDI-Seafaring/control-agent/commits/main/?author=Lamboyjat",
      note: "Public commits associated with my primary GitHub identity and author records used during the project.",
    },
    {
      label: "agent-control-toolbox repository",
      url: "https://github.com/Novia-RDI-Seafaring/agent-control-toolbox",
      note: "The deterministic simulation, signal-analysis, identification, and controller-tuning tools used by the agent.",
    },
    {
      label: "Virtual Sea Trial",
      url: "https://virtualseatrial.fi/",
      note: "Official project context for virtual commissioning, FMU tooling, and AI-enhanced engineering interfaces.",
    },
  ],
  internalReview: {
    repositoryRevision: "2b559c3fde70adf24e108b4e17ea3aad5ecbfc35",
    publishedExperimentRevision: "55c732e7d1e9547a3d9feebc7947a7bdde560b35",
    contributionRevisions: [
      "bab4e64",
      "e7ba187",
      "32f5008",
      "f9698d1",
      "9b767d9",
      "30aff34",
      "e0d36ea",
      "b439786",
      "a1ac391",
      "d23ddc1",
      "988a05b",
      "e901358",
    ],
    attributionSources: [
      {
        label: "Repository history for Lamboyjat and Lamin Jatta author records",
        url: "https://github.com/Novia-RDI-Seafaring/control-agent/commits/main/?author=Lamboyjat",
        public: false,
      },
      {
        label: "Planning and guardrails branch",
        url: "https://github.com/Novia-RDI-Seafaring/control-agent/tree/feat/planning-guardrails",
        public: false,
      },
    ],
  },
} satisfies AgentInTheLoopCaseStudy;
