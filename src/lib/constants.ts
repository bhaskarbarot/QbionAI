export const SITE = {
  name: "Qubion.Ai",
  tagline: "Shape What's Next. Intelligently.",
  subline: "AI Solutions, Design & Automation Studio",
  description:
    "Qubion.Ai builds AI products, AI-powered design systems, workflow automation and performance advertising for growing brands. Ship in weeks, not quarters.",
  email: "info@qubionai.in",
  phone: "+91 90000 00000",
  location: "Remote-first · Serving clients worldwide",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "GitHub", href: "https://github.com" },
  ],
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const SERVICES = [
  {
    icon: "BrainCircuit",
    title: "AI Solutions",
    slug: "ai-solutions",
    summary:
      "Custom AI agents, copilots and LLM-powered products built on your data — from prototype to production.",
    points: [
      "AI agents & autonomous workflows",
      "RAG pipelines & knowledge copilots",
      "Model fine-tuning & evaluation",
      "AI feature integration into existing products",
    ],
  },
  {
    icon: "Sparkles",
    title: "AI-Powered Design",
    slug: "design",
    summary:
      "Interfaces designed and iterated with AI-assisted workflows — shipped faster without losing craft.",
    points: [
      "Product & brand design systems",
      "AI-accelerated UI/UX prototyping",
      "Design-to-code handoff",
      "Motion & micro-interaction design",
    ],
  },
  {
    icon: "Workflow",
    title: "Automation",
    slug: "automation",
    summary:
      "We connect your tools and remove manual work with reliable, monitored automation pipelines.",
    points: [
      "Business process automation",
      "CRM, support & ops integrations",
      "Data pipelines & reporting",
      "Internal tools & dashboards",
    ],
  },
  {
    icon: "Target",
    title: "Performance Advertising",
    slug: "advertising",
    summary:
      "AI-optimized paid media and creative testing that turns ad spend into predictable pipeline.",
    points: [
      "Meta, Google & programmatic campaigns",
      "AI-generated creative testing at scale",
      "Conversion tracking & attribution",
      "Landing page & funnel optimization",
    ],
  },
];

export const STATS = [
  { value: "60+", label: "Projects shipped" },
  { value: "38", label: "Clients worldwide" },
  { value: "4.2x", label: "Avg. efficiency gain" },
  { value: "97%", label: "Client retention" },
];

export const PROCESS = [
  {
    step: "01",
    title: "Discover",
    text: "We audit your workflows, data and goals to find the highest-leverage AI opportunities.",
  },
  {
    step: "02",
    title: "Design",
    text: "We prototype the product, agent or automation with you in fast, visible iterations.",
  },
  {
    step: "03",
    title: "Build",
    text: "Engineering, design and AI specialists ship production-grade work on a weekly cadence.",
  },
  {
    step: "04",
    title: "Scale",
    text: "We monitor, evaluate and improve the system post-launch so results compound over time.",
  },
];

export const CASE_STUDIES = [
  {
    tag: "AI Solutions",
    title: "Support copilot that resolves 64% of tickets autonomously",
    client: "Fintech SaaS",
    metrics: [
      { value: "64%", label: "Auto-resolved" },
      { value: "-41%", label: "Response time" },
    ],
  },
  {
    tag: "Automation",
    title: "Order-to-invoice pipeline automated end-to-end",
    client: "D2C Retail Brand",
    metrics: [
      { value: "120h", label: "Saved / month" },
      { value: "0", label: "Manual entries" },
    ],
  },
  {
    tag: "Advertising",
    title: "AI creative testing cut cost-per-lead in half",
    client: "B2B Real Estate",
    metrics: [
      { value: "-52%", label: "Cost per lead" },
      { value: "3.1x", label: "ROAS" },
    ],
  },
  {
    tag: "Design",
    title: "Design system rebuilt with AI-assisted workflows",
    client: "Healthtech Platform",
    metrics: [
      { value: "3wk", label: "Full rebrand" },
      { value: "+29%", label: "Activation rate" },
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Qubion.Ai shipped our support agent in three weeks. It now handles two-thirds of tickets with zero drop in CSAT.",
    name: "Ananya Rao",
    role: "Head of Product, Fintech SaaS",
  },
  {
    quote:
      "The automation they built removed an entire day of manual ops work every week. It just runs, quietly, in the background.",
    name: "Marcus Lee",
    role: "COO, D2C Retail Brand",
  },
  {
    quote:
      "Best creative-to-performance loop we've worked with. Cost per lead dropped within the first sprint.",
    name: "Priya Sharma",
    role: "Growth Lead, B2B Real Estate",
  },
];

export const PRICING = [
  {
    name: "Sprint",
    price: "₹1,50,000",
    period: "/ project",
    desc: "A focused 2-week sprint to ship one AI feature, automation or design system.",
    features: ["1 dedicated pod", "Discovery + build + handoff", "Async daily updates", "2 weeks delivery"],
    featured: false,
  },
  {
    name: "Growth",
    price: "₹4,50,000",
    period: "/ month",
    desc: "An embedded team shipping AI products and automation on a continuous roadmap.",
    features: [
      "Dedicated AI + design + eng pod",
      "Weekly releases",
      "Analytics & evaluation loop",
      "Priority Slack support",
      "Monthly strategy review",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations that need dedicated infrastructure, compliance and scale.",
    features: [
      "Custom-scoped team",
      "Security & compliance review",
      "Dedicated success manager",
      "SLA-backed delivery",
    ],
    featured: false,
  },
];

export const FAQS = [
  {
    q: "How fast can you start?",
    a: "Most engagements kick off within 5–7 business days of a signed scope. Sprint projects can start sooner if requirements are ready.",
  },
  {
    q: "Do you work with our existing team and stack?",
    a: "Yes. We plug into your existing codebase, tools and workflows rather than replacing them — we integrate with what already works.",
  },
  {
    q: "What does 'AI-powered design' actually mean?",
    a: "We use AI tooling to accelerate research, prototyping and iteration, but every system is reviewed and refined by senior designers before it ships.",
  },
  {
    q: "How do you measure success?",
    a: "Every engagement starts with agreed metrics — resolution rate, hours saved, cost per lead, activation — and we report against them weekly.",
  },
  {
    q: "Can you sign an NDA?",
    a: "Yes, we sign NDAs and can work under your security requirements, including private repos and restricted data access.",
  },
];

export const TEAM = [
  { name: "Rhea Kapoor", role: "Founder & AI Lead" },
  { name: "Devansh Mehta", role: "Head of Engineering" },
  { name: "Sara Iqbal", role: "Head of Design" },
  { name: "Karan Malhotra", role: "Growth & Performance" },
];
