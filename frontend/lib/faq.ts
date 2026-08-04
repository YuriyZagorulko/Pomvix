export type FaqGroup = { title: string; items: { question: string; answer: string }[] };

export const faqGroups: FaqGroup[] = [
  {
    title: 'Hiring',
    items: [
      {
        question: 'What does Pomvix help businesses build?',
        answer:
          'Pomvix builds custom web applications, SaaS products, MVPs, AI-enabled workflows, and backend systems for teams with a clear product or operational need.',
      },
      {
        question: 'Do you work with US businesses?',
        answer:
          'Yes. Pomvix works remotely with US businesses, founders, and product teams and structures communication around their working hours and decision cadence.',
      },
      {
        question: 'Can you join an existing team?',
        answer:
          'Yes. We can deliver a defined capability or provide product and engineering capacity inside an existing team.',
      },
      {
        question: 'What should we include in an initial inquiry?',
        answer:
          'Share the business goal, users, current situation, desired timing, and any existing product or technical context. A rough description is enough to start.',
      },
      {
        question: 'Do you sign confidentiality agreements?',
        answer:
          'Confidentiality and information handling can be discussed as part of the engagement and your project requirements.',
      },
    ],
  },
  {
    title: 'Development and delivery',
    items: [
      {
        question: 'What happens during discovery?',
        answer:
          'We clarify users, workflows, constraints, risks, success criteria, and a sensible first scope before implementation begins.',
      },
      {
        question: 'Do you provide UX and UI design?',
        answer:
          'We shape information architecture, flows, and interface decisions as part of product delivery and can work with an existing design team.',
      },
      {
        question: 'How do you communicate progress?',
        answer:
          'We use agreed reviews, written decisions, demos, and direct communication so you can make informed trade-offs throughout delivery.',
      },
      {
        question: 'How do you test software?',
        answer:
          'We test important workflows with realistic data, include appropriate automated coverage, and review accessibility, responsive behavior, integrations, and failure states.',
      },
      {
        question: 'Can you take over an existing codebase?',
        answer:
          'Yes. We begin with a focused review of architecture, workflows, delivery risks, and documentation before recommending changes.',
      },
      {
        question: 'Do you provide documentation?',
        answer:
          'Yes. We document important decisions, setup, interfaces, operational behavior, and handoff information appropriate to the product.',
      },
    ],
  },
  {
    title: 'Pricing and timeline',
    items: [
      {
        question: 'How is software development priced?',
        answer:
          'Pricing depends on scope clarity, team shape, technical risk, integrations, and the level of ongoing support. We discuss those factors before proposing an engagement.',
      },
      {
        question: 'Do you offer fixed-scope projects?',
        answer:
          'Yes. Fixed Scope works best when the outcome and boundaries can be described clearly after discovery.',
      },
      {
        question: 'What is Dedicated Team engagement?',
        answer:
          'It is an integrated product and engineering group that works with your team over a longer delivery period.',
      },
      {
        question: 'What is Staff Augmentation?',
        answer:
          'It adds focused product or engineering capability to your current team while your organization retains overall product ownership.',
      },
      {
        question: 'How long does a typical project take?',
        answer:
          'Focused projects commonly take four to sixteen weeks, but timeline depends on workflow complexity, integrations, validation, and risk.',
      },
      {
        question: 'Can the scope change during development?',
        answer:
          'Yes. We make scope, impact, and trade-offs visible so changes can be prioritized without hiding their effect on timing or effort.',
      },
    ],
  },
  {
    title: 'Communication and support',
    items: [
      {
        question: 'How involved does our team need to be?',
        answer:
          'Your domain context and feedback are important. We agree on a practical cadence so decisions happen quickly without creating unnecessary meetings.',
      },
      {
        question: 'What happens after launch?',
        answer:
          'We can provide support, fixes, product iterations, performance work, and architecture planning according to the engagement.',
      },
      {
        question: 'Can you work with our stakeholders?',
        answer:
          'Yes. We can communicate technical decisions in clear business terms and include the people responsible for product, operations, and technology.',
      },
      {
        question: 'How do you handle risks?',
        answer:
          'We identify assumptions early, test the riskiest paths first, and keep decisions and unresolved issues visible.',
      },
      {
        question: 'Who owns the code and product work?',
        answer:
          'Ownership and handoff terms are defined in the engagement agreement. We aim to leave your team with understandable, maintainable work.',
      },
    ],
  },
  {
    title: 'Technology',
    items: [
      {
        question: 'Which frontend technologies do you use?',
        answer:
          'We commonly use React, Next.js, TypeScript, and Tailwind CSS when they fit the application and team.',
      },
      {
        question: 'Which backend technologies do you use?',
        answer:
          'We commonly use Python with FastAPI, Node.js with TypeScript, PostgreSQL, REST APIs, and containerized delivery.',
      },
      {
        question: 'Do you build cloud applications?',
        answer:
          'Yes. We can prepare and support containerized cloud deployments while keeping operational responsibilities explicit.',
      },
      {
        question: 'Do you use microservices by default?',
        answer:
          'No. We choose a modular architecture first and introduce independent services only when scaling, ownership, or operational needs justify them.',
      },
      {
        question: 'Can you integrate third-party APIs?',
        answer:
          'Yes. We can connect approved APIs, data sources, identity systems, and operational tools with explicit validation and error handling.',
      },
    ],
  },
  {
    title: 'AI and SaaS',
    items: [
      {
        question: 'Can Pomvix build an AI agent?',
        answer:
          'Yes. We build bounded agents with defined tools, permissions, review points, fallbacks, and evaluation criteria.',
      },
      {
        question: 'Can you add AI to an existing SaaS product?',
        answer:
          'Yes. We can integrate model-powered features into an existing workflow while considering data access, UX, quality, latency, and cost.',
      },
      {
        question: 'Can you build a multi-tenant SaaS platform?',
        answer:
          'Yes. We design organization, user, permission, data ownership, and administration boundaries around the product model.',
      },
      {
        question: 'Do you build SaaS MVPs?',
        answer:
          'Yes. We focus the first release on a complete customer workflow and the evidence needed for the next product decision.',
      },
      {
        question: 'How do you protect private AI data?',
        answer:
          'We design approved data flows, access controls, retrieval boundaries, and provider choices around your security requirements.',
      },
      {
        question: 'Can you modernize an AI or SaaS prototype?',
        answer:
          'Yes. We can assess the current product and turn the strongest workflow into a more reliable, maintainable feature.',
      },
    ],
  },
];
