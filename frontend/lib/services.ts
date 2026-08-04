import { BrainCircuit, Cloud, Code2, Layers3, Workflow, type LucideIcon } from 'lucide-react';

export type Service = {
  slug: string;
  shortTitle: string;
  title: string;
  description: string;
  overview: string;
  problems: string[];
  audience: string;
  outcomes: string[];
  process: string[];
  technologies: string[];
  why: string[];
  faqs: { question: string; answer: string }[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: 'ai-development',
    shortTitle: 'AI development',
    title: 'AI Development Company',
    description:
      'Build useful AI features and products with reliable data flows, clear evaluation, and an architecture your team can operate.',
    overview:
      'Pomvix helps teams turn AI ideas into focused software: from retrieval and document workflows to AI-assisted product experiences and task-specific agents. We start with the user problem, then choose the model, data, and safeguards that make the feature useful in production.',
    problems: [
      'Unclear AI use cases that are difficult to measure',
      'Manual knowledge or document workflows that slow teams down',
      'Prototype prompts that are not ready for real users or sensitive data',
    ],
    audience:
      'Product teams, operators, and founders exploring a responsible AI capability or bringing an AI product to market.',
    outcomes: [
      'A tested AI workflow tied to a real business task',
      'Observable integrations with model and data providers',
      'A maintainable foundation for improving quality over time',
    ],
    process: [
      'Identify the user task and success criteria',
      'Map data, permissions, and failure modes',
      'Prototype prompts, retrieval, or agent flows',
      'Build the product experience and integrations',
      'Evaluate quality, latency, and cost with representative inputs',
      'Deploy with monitoring and a practical improvement plan',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'OpenAI',
      'LLMs',
      'AI agents',
      'Vector search',
      'PostgreSQL',
      'React',
    ],
    why: [
      'We focus on useful workflows rather than novelty.',
      'We make model behavior and trade-offs visible to stakeholders.',
      'We design for evaluation, privacy, and future model changes from the start.',
    ],
    faqs: [
      {
        question: 'What kinds of AI products does Pomvix build?',
        answer:
          'We build AI-enabled web products, internal knowledge tools, document workflows, recommendation features, and task-specific agent experiences.',
      },
      {
        question: 'Can you work with our existing data and systems?',
        answer:
          'Yes. We can connect AI features to approved internal data, databases, and REST APIs while keeping access and failure behavior explicit.',
      },
      {
        question: 'How do you evaluate an AI feature?',
        answer:
          'We define representative cases and assess usefulness, accuracy, latency, cost, and safe handling before expanding the feature.',
      },
      {
        question: 'Do you build custom models?',
        answer:
          'We typically start with a proven model and a strong product and evaluation layer. Custom training is considered only when the use case justifies it.',
      },
      {
        question: 'Can you improve an existing AI prototype?',
        answer:
          'Yes. We can review the current prompts, data flow, UX, and observability, then turn the strongest path into a dependable product feature.',
      },
    ],
    icon: BrainCircuit,
  },
  {
    slug: 'saas-development',
    shortTitle: 'SaaS products',
    title: 'SaaS Development Services',
    description:
      'Launch and evolve a SaaS product with thoughtful product decisions, multi-tenant foundations, and an application built for steady growth.',
    overview:
      'SaaS development is more than shipping screens. Pomvix works with product teams on the workflows, account boundaries, billing-ready architecture, and operational details that make a subscription product dependable for both customers and its internal team.',
    problems: [
      'A promising product idea without a clear first release',
      'A growing codebase that makes every change feel risky',
      'Customer, account, permission, or operational workflows that are hard to manage',
    ],
    audience:
      'Founders and established teams building a new subscription product or replacing a fragile first version.',
    outcomes: [
      'A focused product roadmap and release scope',
      'A clear foundation for users, organizations, and permissions',
      'A SaaS application that can be improved without constant rewrites',
    ],
    process: [
      'Clarify the customer and core workflow',
      'Shape the release plan and product architecture',
      'Design account, permission, and data boundaries',
      'Build, integrate, and validate the application',
      'Prepare deployment, documentation, and operational handoff',
      'Support measured iteration after launch',
    ],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Python',
      'PostgreSQL',
      'REST APIs',
      'Docker',
    ],
    why: [
      'We keep the first release focused without treating it as disposable.',
      'We balance customer experience with the operational needs of your team.',
      'We communicate decisions, trade-offs, and progress in plain language.',
    ],
    faqs: [
      {
        question: 'Can Pomvix build a SaaS product from the ground up?',
        answer:
          'Yes. We can help define the first release, design the core workflows, and build the web application and supporting services.',
      },
      {
        question: 'Do you support multi-tenant SaaS architecture?',
        answer:
          'We design data and access boundaries around the product’s account model, whether that means individual users, teams, or organizations.',
      },
      {
        question: 'Can you work with an existing SaaS codebase?',
        answer:
          'Yes. We can extend an existing product, reduce technical friction, or plan a safer replacement where the current foundation limits progress.',
      },
      {
        question: 'How involved should our product team be?',
        answer:
          'Your domain context is essential. We work collaboratively while taking responsibility for clear engineering decisions and delivery.',
      },
      {
        question: 'What happens after launch?',
        answer:
          'We can continue with product iterations, technical support, performance work, and architecture planning as the product develops.',
      },
    ],
    icon: Layers3,
  },
  {
    slug: 'mvp-development',
    shortTitle: 'MVP development',
    title: 'MVP Development for Startups',
    description:
      'Test a product direction with a focused MVP that creates real learning without sacrificing the engineering decisions that matter later.',
    overview:
      'A useful MVP gives a specific audience a complete enough experience to respond to. Pomvix helps startups separate essential learning from distractions, then builds the smallest credible product around that insight.',
    problems: [
      'A broad idea with too many possible features',
      'Pressure to validate demand before investing in a full platform',
      'A rushed prototype that cannot support meaningful user feedback',
    ],
    audience:
      'Early-stage founders and innovation teams that need a credible first product to learn from customers, partners, or internal users.',
    outcomes: [
      'A sharper definition of the first release',
      'A working product for structured customer feedback',
      'Technical choices that leave room for the next validated step',
    ],
    process: [
      'Frame the hypothesis and target user',
      'Prioritize the smallest meaningful workflow',
      'Sketch the experience and technical approach',
      'Build in short, reviewable increments',
      'Test with realistic scenarios and users',
      'Document what was learned and what to build next',
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'FastAPI',
      'PostgreSQL',
      'Docker',
      'AWS',
    ],
    why: [
      'We protect the learning goal from unnecessary scope.',
      'We make progress tangible early so decisions can change cheaply.',
      'We build MVPs as foundations for evidence, not throwaway demos.',
    ],
    faqs: [
      {
        question: 'How long does MVP development take?',
        answer:
          'The timeline depends on the workflow, integrations, and validation goals. We define a focused scope before committing to a delivery plan.',
      },
      {
        question: 'Can you help decide what belongs in the MVP?',
        answer:
          'Yes. We use the target user and learning objective to distinguish the essential path from features that can wait.',
      },
      {
        question: 'Will the MVP be production-ready?',
        answer:
          'We build an appropriate level of reliability, security, and usability for the intended users rather than presenting a clickable prototype as a finished product.',
      },
      {
        question: 'Do you work with non-technical founders?',
        answer:
          'Yes. We explain technical decisions in terms of product risk, speed, maintenance, and future options.',
      },
      {
        question: 'Can you continue after the MVP?',
        answer:
          'Yes. We can use the feedback from the first release to plan and deliver the next product or technical milestone.',
      },
    ],
    icon: Workflow,
  },
  {
    slug: 'web-development',
    shortTitle: 'Web applications',
    title: 'Custom Web Development',
    description:
      'Create fast, accessible web applications that fit your users, business rules, and long-term product direction.',
    overview:
      'Pomvix builds custom web applications for teams whose work does not fit an off-the-shelf tool. We combine a clear interface with dependable data flows, responsive behavior, and the integrations your operation actually needs.',
    problems: [
      'A manual process spread across disconnected tools',
      'A customer-facing experience that no longer reflects the business',
      'Performance, accessibility, or maintenance issues in an existing web application',
    ],
    audience:
      'Businesses and product teams that need a tailored web experience, internal platform, portal, or application.',
    outcomes: [
      'A responsive experience designed around real workflows',
      'Clear interfaces for customers and internal teams',
      'A maintainable application with room for future integrations',
    ],
    process: [
      'Understand users, workflows, and constraints',
      'Define information architecture and interaction patterns',
      'Plan the frontend, backend, and integration boundaries',
      'Implement responsive, accessible interfaces',
      'Test behavior across devices and realistic data',
      'Launch with documentation and support options',
    ],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'REST APIs',
    ],
    why: [
      'We treat accessibility and performance as product requirements.',
      'We build around the way people work, not around a generic template.',
      'We keep the frontend and backend boundaries understandable for your team.',
    ],
    faqs: [
      {
        question: 'What is custom web development?',
        answer:
          'It is the design and engineering of a web application tailored to your users, workflows, business rules, and integrations.',
      },
      {
        question: 'Can you modernize an existing web application?',
        answer:
          'Yes. We can improve selected workflows, performance, accessibility, or architecture without requiring an all-at-once rewrite.',
      },
      {
        question: 'Do you build internal tools as well as public products?',
        answer:
          'Yes. We build customer-facing applications, portals, operational tools, and other browser-based products.',
      },
      {
        question: 'How do you handle responsive design?',
        answer:
          'We validate key workflows across screen sizes and build layouts that remain usable on phones, tablets, and desktop devices.',
      },
      {
        question: 'Can you connect the application to other services?',
        answer:
          'Yes. We integrate approved REST APIs, data sources, authentication systems, and operational services as needed.',
      },
    ],
    icon: Code2,
  },
  {
    slug: 'backend-development',
    shortTitle: 'Backend development',
    title: 'Backend Development Services',
    description:
      'Design reliable APIs, data systems, and service foundations that keep your product secure, observable, and ready to evolve.',
    overview:
      'Pomvix develops backend systems that make product behavior dependable: well-defined APIs, sensible data models, background work, integrations, and deployment foundations. We make the system understandable so future changes do not depend on guesswork.',
    problems: [
      'Slow or inconsistent APIs that affect the product experience',
      'Data models and business rules that have become difficult to change',
      'A service with limited visibility into errors, performance, and operational health',
    ],
    audience:
      'Teams launching a new product, extending an existing application, or needing experienced backend engineering for a critical system.',
    outcomes: [
      'Stable APIs and clear service boundaries',
      'Data structures that support current workflows and planned growth',
      'Better visibility into failures, performance, and operational work',
    ],
    process: [
      'Map domain behavior and integration requirements',
      'Design data models, API contracts, and service boundaries',
      'Implement core services and background processes',
      'Add validation, access controls, and error handling',
      'Test with realistic data and failure cases',
      'Deploy with documentation and operational guidance',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'Node.js',
      'PostgreSQL',
      'REST APIs',
      'Docker',
      'AWS',
      'TypeScript',
    ],
    why: [
      'We model business behavior before choosing abstractions.',
      'We prioritize predictable APIs, explicit validation, and maintainable code.',
      'We leave teams with documentation and boundaries they can work with.',
    ],
    faqs: [
      {
        question: 'What backend systems does Pomvix build?',
        answer:
          'We build APIs, data services, background jobs, integrations, authentication flows, and backend foundations for web and SaaS products.',
      },
      {
        question: 'Can you improve an existing API?',
        answer:
          'Yes. We can diagnose reliability and design issues, improve selected endpoints, and create a safer path for further changes.',
      },
      {
        question: 'Which backend languages do you use?',
        answer:
          'We commonly use Python with FastAPI and Node.js with TypeScript, choosing based on the product’s needs and existing ecosystem.',
      },
      {
        question: 'How do you approach backend security?',
        answer:
          'We use explicit validation, access boundaries, careful data handling, and appropriate testing for the application’s risk profile.',
      },
      {
        question: 'Do you provide cloud deployment support?',
        answer:
          'We can prepare and support containerized services and cloud deployments while keeping operational responsibilities clear.',
      },
    ],
    icon: Cloud,
  },
];

export const serviceBySlug = Object.fromEntries(
  services.map((service) => [service.slug, service]),
) as Record<string, Service>;
