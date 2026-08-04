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
  challenges?: string[];
  benefits?: string[];
  industries?: string[];
  projectTypes?: string[];
  engagementModels?: { name: string; description: string }[];
  timeline?: string;
  features?: string[];
  longDescription?: string[];
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

const commercialContent: Record<
  string,
  Pick<
    Service,
    | 'challenges'
    | 'benefits'
    | 'industries'
    | 'projectTypes'
    | 'engagementModels'
    | 'timeline'
    | 'features'
    | 'longDescription'
    | 'faqs'
  >
> = {
  'ai-development': {
    challenges: [
      'Unclear opportunities that are difficult to connect to revenue or operational efficiency',
      'Sensitive business knowledge that is trapped in documents, tickets, or disconnected systems',
      'AI prototypes that produce inconsistent results, unclear citations, or unpredictable costs',
    ],
    benefits: [
      'A measurable AI use case with success criteria your team can review',
      'Human-centered workflows that keep people in control of consequential decisions',
      'A maintainable application layer around models, prompts, retrieval, permissions, and evaluation',
      'A practical plan for improving quality as your data and usage grow',
    ],
    industries: [
      'SaaS and software',
      'Healthcare operations',
      'Financial services',
      'Logistics and supply chain',
      'E-commerce',
      'Professional services',
      'Internal business operations',
    ],
    projectTypes: [
      'LLM applications and copilots',
      'AI agents for bounded business tasks',
      'Document search and retrieval-augmented generation',
      'OpenAI integration and model-powered product features',
      'AI workflow automation and classification',
      'Internal knowledge assistants',
    ],
    engagementModels: [
      {
        name: 'Fixed Scope',
        description:
          'A defined discovery, prototype, or production feature with agreed deliverables.',
      },
      {
        name: 'Dedicated Team',
        description:
          'A focused product and engineering group for an AI capability that will evolve.',
      },
      {
        name: 'Staff Augmentation',
        description: 'Specialist AI engineering that works inside your existing product team.',
      },
      {
        name: 'MVP Development',
        description: 'A narrow, testable AI product for validating a user and business hypothesis.',
      },
    ],
    timeline:
      'A focused AI discovery may take one to two weeks. A production feature commonly takes four to twelve weeks depending on integrations, evaluation depth, and security requirements.',
    features: [
      'Prompt and model orchestration',
      'Structured outputs and tool calling',
      'Document ingestion and vector search',
      'Role-aware retrieval',
      'Human review queues',
      'Usage, latency, and cost visibility',
    ],
    longDescription: [
      'Custom AI development is most valuable when it removes a specific point of friction. Pomvix helps you define that point before selecting a model or writing a prompt. We map the user journey, available data, permissions, and acceptable failure modes so the result is a product feature rather than an impressive demo.',
      'Our AI software development work can sit inside a SaaS product, customer portal, or internal business tool. We connect approved data sources, design the interaction around user confidence, and evaluate representative cases. When an AI agent is appropriate, we keep its tools and authority bounded, observable, and easy to interrupt.',
      'The result is an AI capability your team can operate and improve. We document assumptions, measure quality and cost, and avoid making your roadmap dependent on one provider.',
    ],
    faqs: [
      {
        question: 'When is custom AI development a good fit?',
        answer:
          'It is a good fit when a repeatable knowledge, language, classification, or decision-support workflow can be measured and improved with software.',
      },
      {
        question: 'Can you integrate OpenAI into an existing product?',
        answer:
          'Yes. We can add OpenAI models to an approved product workflow with server-side controls, structured outputs, error handling, and usage visibility.',
      },
      {
        question: 'What is an AI agent?',
        answer:
          'An AI agent is a model-powered workflow that can use defined tools to complete a bounded task. We design permissions, review points, and fallbacks around the task.',
      },
      {
        question: 'Do you build LLM applications with private data?',
        answer:
          'Yes. We can design retrieval and access boundaries around your approved documents and systems, subject to your security and compliance requirements.',
      },
      {
        question: 'How do you reduce hallucinations?',
        answer:
          'We combine better data boundaries, retrieval, structured responses, clear UX, representative evaluation cases, and human review where the risk requires it.',
      },
      {
        question: 'Can AI automate an entire business process?',
        answer:
          'Some processes can be highly automated, but we first identify exceptions and accountability. A staged workflow is often safer and more useful than full automation.',
      },
      {
        question: 'How do you manage AI costs?',
        answer:
          'We select models and context deliberately, track usage and latency, and design caching, routing, or smaller-model paths where appropriate.',
      },
      {
        question: 'Can you improve an AI feature that is already in production?',
        answer:
          'Yes. We can review quality, prompts, retrieval, UX, observability, and failure cases before recommending targeted improvements.',
      },
      {
        question: 'Do you train foundation models?',
        answer:
          'We generally use proven models and invest in the product, data, and evaluation layer. Custom training is considered only when the evidence supports it.',
      },
      {
        question: 'How do users know when an AI answer is reliable?',
        answer:
          'We design confidence cues, source references, editable outputs, and review steps that match the consequence of the task.',
      },
    ],
  },
  'saas-development': {
    challenges: [
      'Turning a broad product vision into a release customers can understand and use',
      'Designing tenant, user, permission, billing, and data boundaries before they become expensive to change',
      'Maintaining momentum while a SaaS codebase, integrations, and operational needs grow',
    ],
    benefits: [
      'A focused SaaS MVP or roadmap grounded in a real customer workflow',
      'Multi-tenant SaaS architecture with explicit account and access boundaries',
      'A product foundation that supports onboarding, billing-ready growth, and iteration',
      'Clear technical decisions and documentation for your team',
    ],
    industries: [
      'B2B SaaS',
      'Healthcare technology',
      'FinTech',
      'Logistics',
      'E-commerce operations',
      'Professional services',
      'Internal enterprise platforms',
    ],
    projectTypes: [
      'New SaaS product development',
      'Multi-tenant customer portals',
      'Subscription and account platforms',
      'Workflow management products',
      'SaaS modernization and rescue',
      'Internal platforms with organization-level access',
    ],
    engagementModels: [
      {
        name: 'Fixed Scope',
        description:
          'A defined release, feature set, or architecture milestone with a clear boundary.',
      },
      {
        name: 'Dedicated Team',
        description:
          'An integrated team for a product that needs continuous discovery and delivery.',
      },
      {
        name: 'Staff Augmentation',
        description: 'Additional product or engineering capacity for your existing SaaS team.',
      },
      {
        name: 'MVP Development',
        description:
          'A focused first release designed to validate a customer and pricing hypothesis.',
      },
    ],
    timeline:
      'A focused SaaS MVP often takes eight to sixteen weeks. Existing-product improvements can be shorter or longer depending on codebase condition, integrations, and release risk.',
    features: [
      'Organizations and workspaces',
      'Role-based permissions',
      'Onboarding flows',
      'Usage and account administration',
      'Billing-ready domain design',
      'Audit trails and notifications',
    ],
    longDescription: [
      'SaaS product development requires decisions that connect product experience to operational reality. Pomvix helps define the first valuable workflow, then designs the account model, permissions, data ownership, and lifecycle states that support it.',
      'For a new SaaS product, we keep the MVP narrow without treating the code as disposable. For an existing platform, we can work within the current architecture, isolate risk, and improve the areas that limit delivery. We use clear interfaces between frontend, backend, integrations, and background work.',
      'A strong SaaS architecture gives your team options. It lets you learn from customers without rewriting the product after every insight, while keeping performance, security, and support needs visible as usage changes.',
    ],
    faqs: [
      {
        question: 'What does a SaaS development company do?',
        answer:
          'A SaaS development company helps define, design, build, and evolve software delivered to multiple customer accounts through a subscription or recurring-use model.',
      },
      {
        question: 'How do you design a multi-tenant SaaS product?',
        answer:
          'We start with the organization and user model, then define data ownership, access checks, isolation, and administrative workflows before implementation.',
      },
      {
        question: 'Can you build a SaaS MVP?',
        answer:
          'Yes. We focus the first release on a complete customer workflow and the evidence you need to decide what to build next.',
      },
      {
        question: 'Should billing be included in the first release?',
        answer:
          'It depends on the validation goal. We can make the domain billing-ready while including payment flows only when they are essential to learning.',
      },
      {
        question: 'Can Pomvix modernize an older SaaS application?',
        answer:
          'Yes. We can improve selected workflows, introduce safer boundaries, and plan incremental modernization instead of assuming a rewrite is necessary.',
      },
      {
        question: 'How do you handle SaaS permissions?',
        answer:
          'Permissions are modeled as explicit product behavior and enforced at the relevant application and API boundaries.',
      },
      {
        question: 'What is SaaS architecture?',
        answer:
          'It is the structure of the product, services, data, tenancy, integrations, and operations that lets a shared application serve customers reliably.',
      },
      {
        question: 'Can you support our internal product team?',
        answer:
          'Yes. We can deliver a defined capability or join an existing team with clear ownership and communication.',
      },
      {
        question: 'How do you prepare a SaaS product for growth?',
        answer:
          'We prioritize sound data boundaries, observable workflows, predictable APIs, and a release foundation that can be measured before it is optimized.',
      },
      {
        question: 'What happens after our SaaS launch?',
        answer:
          'We can continue with roadmap delivery, technical support, performance work, and architecture decisions based on real usage.',
      },
    ],
  },
  'mvp-development': {
    challenges: [
      'A product idea with more possible features than the first release can responsibly contain',
      'Pressure to show progress before the customer, workflow, or business model is fully understood',
      'A prototype that demonstrates screens but cannot support meaningful user feedback',
    ],
    benefits: [
      'A clear product hypothesis and definition of the first useful release',
      'Rapid prototyping that turns assumptions into something users can respond to',
      'Production-appropriate reliability for the intended validation audience',
      'A documented technical and product path after the MVP',
    ],
    industries: [
      'Startups',
      'SaaS',
      'Healthcare innovation',
      'FinTech concepts',
      'Logistics',
      'E-commerce',
      'Internal innovation teams',
    ],
    projectTypes: [
      'Startup MVPs',
      'Clickable-to-working prototype transitions',
      'Customer validation products',
      'New workflow experiments',
      'AI-enabled product concepts',
      'Internal proof-of-value applications',
    ],
    engagementModels: [
      {
        name: 'Fixed Scope',
        description:
          'A tightly bounded MVP with a defined hypothesis, workflow, and delivery milestone.',
      },
      {
        name: 'Dedicated Team',
        description:
          'A collaborative team for evolving a product through several validation cycles.',
      },
      {
        name: 'Staff Augmentation',
        description:
          'Experienced delivery support alongside your founder or internal product team.',
      },
      {
        name: 'MVP Development',
        description: 'A focused engagement centered on learning from a usable first product.',
      },
    ],
    timeline:
      'Many focused MVPs take six to twelve weeks. The right timeline depends on the core workflow, integrations, compliance context, and how much real-world validation is required.',
    features: [
      'Account and onboarding flows',
      'Core workflow and state management',
      'Feedback and measurement hooks',
      'Admin tools',
      'Third-party integrations',
      'Responsive product experience',
    ],
    longDescription: [
      'MVP development is a product validation exercise supported by engineering. Pomvix helps you decide what must be real for a target user to complete the core job, what can be manual behind the scenes, and what should wait until evidence exists.',
      'Rapid prototyping is useful when it changes a decision. We move from assumptions to flows, then to a working product that can be placed in front of realistic users. That means paying attention to empty states, errors, permissions, and the details that make feedback meaningful.',
      'The MVP is not a promise that every future feature will fit unchanged. It is a well-chosen next step: useful enough to learn from, responsibly built for its audience, and documented so the next investment is informed.',
    ],
    faqs: [
      {
        question: 'What is MVP development?',
        answer:
          'MVP development is the focused design and construction of a minimum viable product that tests a meaningful product or business hypothesis with real users.',
      },
      {
        question: 'How do you define MVP scope?',
        answer:
          'We start with the target user, the core job, and the decision you need to make after launch. Features outside that path are challenged or deferred.',
      },
      {
        question: 'Is an MVP just a prototype?',
        answer:
          'No. A prototype can test an idea visually; an MVP provides enough working behavior for the intended users to complete a valuable workflow and provide evidence.',
      },
      {
        question: 'Can you help validate my product idea?',
        answer:
          'We can help frame assumptions, map the workflow, prototype the experience, and build a product that supports structured validation.',
      },
      {
        question: 'Do you work with startup founders without a technical background?',
        answer:
          'Yes. We explain decisions in terms of learning, risk, speed, maintenance, and future options rather than unnecessary technical jargon.',
      },
      {
        question: 'Should my MVP include mobile apps?',
        answer:
          'Only if mobile behavior is essential to the hypothesis. A responsive web MVP can often validate the workflow sooner.',
      },
      {
        question: 'How quickly can you build a startup MVP?',
        answer:
          'A focused MVP can often be delivered in six to twelve weeks, but we set a timeline after understanding the workflow and validation audience.',
      },
      {
        question: 'Will the MVP be secure?',
        answer:
          'We apply security, access control, validation, and data-handling practices appropriate to the users and risk of the product.',
      },
      {
        question: 'Can an MVP include AI?',
        answer:
          'Yes. We can include a bounded AI workflow when it is central to the hypothesis and can be evaluated with realistic cases.',
      },
      {
        question: 'What do we do after the MVP?',
        answer:
          'We review usage and feedback, document what was learned, and prioritize the next product and engineering milestone.',
      },
    ],
  },
  'web-development': {
    challenges: [
      'Manual work spread across spreadsheets, email, and disconnected tools',
      'A customer-facing experience that no longer reflects your business or users',
      'A web application with accessibility, performance, or maintenance problems',
    ],
    benefits: [
      'A custom web application mapped to real user and business workflows',
      'Responsive, accessible interfaces that are easier to use and maintain',
      'Clean integration boundaries for data, authentication, and operational systems',
      'A delivery plan that improves the product without unnecessary rewrite risk',
    ],
    industries: [
      'SaaS',
      'Healthcare',
      'FinTech',
      'Logistics',
      'E-commerce',
      'Professional services',
      'Internal business tools',
    ],
    projectTypes: [
      'Customer portals',
      'Enterprise web applications',
      'Operations dashboards',
      'Partner and vendor portals',
      'Workflow automation tools',
      'Web product modernization',
    ],
    engagementModels: [
      {
        name: 'Fixed Scope',
        description: 'A defined application, workflow, or modernization milestone.',
      },
      {
        name: 'Dedicated Team',
        description: 'A product team for a web application with an evolving roadmap.',
      },
      {
        name: 'Staff Augmentation',
        description: 'Frontend, backend, or full-stack support inside your existing team.',
      },
      {
        name: 'MVP Development',
        description: 'A focused web product to validate a new workflow or market.',
      },
    ],
    timeline:
      'A focused web application release commonly takes six to fourteen weeks. Larger enterprise applications are delivered in milestones based on workflow and integration complexity.',
    features: [
      'Responsive layouts',
      'Role-based experiences',
      'Forms and workflow states',
      'Dashboards and reporting',
      'Search and filtering',
      'REST API integrations',
    ],
    longDescription: [
      'Custom web development is a strong fit when your business has a workflow worth improving but generic software creates more work than it removes. Pomvix starts with the people, decisions, and information moving through the process.',
      'Our Next.js and React development work emphasizes clear information architecture, accessible interaction, responsive behavior, and predictable data loading. We build the frontend and backend boundaries around the product rather than forcing business rules into presentation code.',
      'Whether the result is a public product, customer portal, or internal business tool, we test realistic states and devices. The goal is software that people can use confidently and your team can extend without depending on fragile workarounds.',
    ],
    faqs: [
      {
        question: 'What is custom web development?',
        answer:
          'It is the design and engineering of a web application tailored to your users, business rules, workflows, and integrations rather than a generic template.',
      },
      {
        question: 'Do you provide Next.js development?',
        answer:
          'Yes. We use Next.js where its routing, rendering, performance, and application patterns fit the product requirements.',
      },
      {
        question: 'Can you build enterprise web applications?',
        answer:
          'Yes. We can build internal platforms, portals, dashboards, and customer applications with role-aware workflows and integration boundaries.',
      },
      {
        question: 'When should a business replace an existing web app?',
        answer:
          'Replacement is appropriate when the current system blocks important changes, but we first consider targeted modernization and incremental risk reduction.',
      },
      {
        question: 'How do you make web applications accessible?',
        answer:
          'We use semantic HTML, keyboard-friendly interaction, meaningful labels, readable contrast, and testing of important user paths.',
      },
      {
        question: 'Can you connect a web app to our existing systems?',
        answer:
          'Yes. We can integrate approved APIs, authentication systems, databases, and operational tools with explicit error behavior.',
      },
      {
        question: 'Do you build public websites or applications?',
        answer:
          'We focus on product and application experiences, including public-facing web products, portals, and internal tools.',
      },
      {
        question: 'How do you improve web performance?',
        answer:
          'We consider rendering strategy, asset weight, data loading, caching, interaction cost, and the performance of the underlying APIs.',
      },
      {
        question: 'Can you work with our designer?',
        answer:
          'Yes. We can implement an existing system or collaborate to turn product requirements into a coherent, accessible interface.',
      },
      {
        question: 'Do you support web applications after launch?',
        answer:
          'Yes. Support can include defect resolution, iterations, performance work, and technical planning for the next release.',
      },
    ],
  },
  'backend-development': {
    challenges: [
      'APIs that are inconsistent, slow, or difficult for product teams to consume',
      'Business rules and data models that have become risky to change',
      'Limited visibility into errors, background work, integrations, and system health',
    ],
    benefits: [
      'Stable API contracts and service boundaries',
      'Data models designed around domain behavior and access needs',
      'Explicit validation, authentication, authorization, and failure handling',
      'A backend your team can observe, document, and evolve',
    ],
    industries: [
      'SaaS',
      'Healthcare',
      'FinTech',
      'Logistics',
      'E-commerce',
      'Professional services',
      'Internal systems',
    ],
    projectTypes: [
      'API development',
      'FastAPI development',
      'Backend modernization',
      'Microservices and service boundaries',
      'Data and integration services',
      'Authentication and background processing',
    ],
    engagementModels: [
      {
        name: 'Fixed Scope',
        description: 'A defined API, integration, data, or architecture milestone.',
      },
      {
        name: 'Dedicated Team',
        description: 'Backend ownership for a product that needs sustained delivery.',
      },
      {
        name: 'Staff Augmentation',
        description: 'Experienced backend engineering within your existing team.',
      },
      {
        name: 'MVP Development',
        description: 'A reliable backend foundation for a new product validation effort.',
      },
    ],
    timeline:
      'A focused API or integration project may take four to eight weeks. Broader backend architecture or modernization is planned as a sequence of measurable milestones.',
    features: [
      'REST API design',
      'FastAPI services',
      'PostgreSQL data modeling',
      'Authentication and authorization',
      'Background jobs',
      'Integration and error handling',
    ],
    longDescription: [
      'Backend development services are about making product behavior dependable. Pomvix maps domain rules and data ownership before choosing abstractions, then creates APIs and services that are understandable to the frontend, operators, and future maintainers.',
      'We use Python and FastAPI or Node.js with TypeScript where they fit the product and team. We can work in a modular monolith or define microservices when independent boundaries and operational maturity justify the cost. “Microservices” is not a default solution.',
      'Good backend engineering also makes failure visible. Validation, access checks, structured errors, background work, documentation, and tests help your team diagnose issues and ship changes with confidence.',
    ],
    faqs: [
      {
        question: 'What are backend development services?',
        answer:
          'They include API design and implementation, data modeling, business logic, integrations, authentication, background work, testing, and operational support.',
      },
      {
        question: 'Do you provide API development?',
        answer:
          'Yes. We design and build documented APIs with clear resources, validation, access rules, errors, and integration behavior.',
      },
      {
        question: 'What is FastAPI development?',
        answer:
          'FastAPI development uses Python’s FastAPI framework to build typed, high-performance HTTP services with validation and documentation support.',
      },
      {
        question: 'When should a team use microservices?',
        answer:
          'Microservices can help when service boundaries, independent scaling, or team ownership are real needs. We do not add them without a clear operational reason.',
      },
      {
        question: 'Can you repair an unreliable backend?',
        answer:
          'Yes. We can diagnose failure patterns, improve selected paths, add visibility, and create a safer plan for deeper changes.',
      },
      {
        question: 'How do you model backend architecture?',
        answer:
          'We start with business behavior, data ownership, integrations, and operational constraints, then choose boundaries that keep change understandable.',
      },
      {
        question: 'Which databases do you use?',
        answer:
          'We commonly use PostgreSQL and choose data structures based on consistency, query behavior, ownership, and product requirements.',
      },
      {
        question: 'How do you secure APIs?',
        answer:
          'We use appropriate authentication, authorization, input validation, careful data handling, and testing aligned with the application risk profile.',
      },
      {
        question: 'Can you support a Node.js backend?',
        answer:
          'Yes. We can use Node.js and TypeScript when they fit your existing ecosystem or product requirements.',
      },
      {
        question: 'Do you document backend systems?',
        answer:
          'Yes. We document contracts, important decisions, setup, operational behavior, and handoff information appropriate to the project.',
      },
    ],
  },
};

services.forEach((service) => Object.assign(service, commercialContent[service.slug]));
