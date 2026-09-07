---
title: "Agent-in-the-Loop Control Simulation"
shortTitle: "Agent-in-the-Loop"
summary: "An evaluated AI-agent workflow for multi-step control-engineering tasks using executable tools and Functional Mock-up Units."
problem: "Control-oriented simulation tasks require agents to plan, invoke tools, interpret outputs, and validate multi-stage engineering work rather than produce a single text response."
contribution: "Contributed PydanticAI tool calling, experiment execution, evaluation reporting, debugging, packaging cleanup, and repository restructuring."
roleLabel: "Research co-author and contributor"
ownership: "collaborative"
status: "published"
verificationStatus: "verified"
featured: true
order: 3
caseStudyPath: "/work/agent-in-the-loop/"
technologies:
  - "Python"
  - "PydanticAI"
  - "FMU / FMI"
  - "Azure OpenAI"
  - "Evaluation Pipelines"
homepageTechnologies:
  - "Python"
  - "PydanticAI"
  - "FMU / FMI"
  - "Evaluation Pipelines"
homepageContribution: "Implemented and evaluated PydanticAI tool-calling and experiment workflows, while improving debugging, packaging, and repository structure."
engineeringDecisions:
  - "Use executable FMU models and tool calls instead of relying on model-only answers."
  - "Evaluate increasingly complex workflows from simulation through system identification and controller tuning."
  - "Keep ground-truth engineering methods available for result validation."
outcome: "A reproducible benchmark suite covering six increasingly complex simulation, analysis, system-identification, and PI-tuning experiments."
collaborators:
  - "Christoffer Björkskog"
  - "Mikael Manngård"
evidence:
  - label: "Source repository and paper citation"
    url: "https://github.com/Novia-RDI-Seafaring/control-agent"
    type: "repository"
  - label: "Lamin's commit history"
    url: "https://github.com/Novia-RDI-Seafaring/control-agent/commits/main/?author=Lamboyjat"
    type: "commit-history"
---

This case study will focus on how agent behavior was made measurable through tools, staged experiments, and ground-truth validation.
