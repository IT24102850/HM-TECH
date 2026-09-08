export type PortfolioProject = {
  slug: string;
  name: string;
  /** Full industry name, shown on the project card. */
  industry: string;
  /** Compact label used by the filter chips, where the full name is too long. */
  industryShort: string;
  tagline: string;
  description: string;
  services: string[];
  features: string[];
  technology: string[];
  /** Product logo, rendered contained on a light panel (not a screenshot). */
  logo: string;
  /** Tailwind gradient stops tinting the logo panel for this product. */
  accent: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "novaerp",
    name: "NovaERP",
    industry: "Enterprise Resource Planning (ERP)",
    industryShort: "ERP",
    tagline: "Manage Everything. Grow Smarter.",
    description:
      "An intelligent enterprise resource planning platform designed to streamline business operations through integrated finance, HR, inventory, procurement, CRM, and analytics modules.",
    services: ["UI/UX Design", "Web Application Development", "ERP System", "Dashboard Development"],
    features: [
      "Financial Management",
      "Inventory Control",
      "Human Resources",
      "Customer Relationship Management",
      "Procurement",
      "Business Analytics",
    ],
    technology: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
    logo: "/images/projects/novaerp.jpg",
    accent: "from-iris-500/25 via-iris-300/12 to-transparent",
  },
  {
    slug: "medicore",
    name: "MediCore",
    industry: "Healthcare",
    industryShort: "Healthcare",
    tagline: "Smarter Healthcare Management",
    description:
      "A digital healthcare management platform that simplifies hospital operations through patient records, appointment scheduling, billing, pharmacy, and laboratory management.",
    services: ["Healthcare Software", "Patient Management System", "Dashboard UI", "Mobile Application"],
    features: [
      "Electronic Medical Records",
      "Appointment Booking",
      "Billing",
      "Pharmacy",
      "Laboratory Reports",
    ],
    technology: ["Next.js", "Node.js", "MongoDB", "Firebase"],
    logo: "/images/projects/medicore.jpg",
    accent: "from-teal-400/25 via-cyan-300/12 to-transparent",
  },
  {
    slug: "foodflow",
    name: "FoodFlow",
    industry: "Restaurant Management",
    industryShort: "Restaurants",
    tagline: "Serving Innovation Daily",
    description:
      "A cloud-based restaurant management platform offering online ordering, POS integration, QR menus, table reservations, and kitchen management.",
    services: ["Restaurant POS", "Mobile Ordering", "QR Menu", "Kitchen Dashboard"],
    features: ["Online Orders", "Kitchen Display", "Table Reservation", "Delivery Tracking", "Customer Loyalty"],
    technology: ["React", "Express", "MongoDB", "Stripe API"],
    logo: "/images/projects/foodflow.jpg",
    accent: "from-orange-400/25 via-amber-300/12 to-transparent",
  },
  {
    slug: "staynest",
    name: "StayNest",
    industry: "Hospitality",
    industryShort: "Hospitality",
    tagline: "Hospitality Made Simple",
    description:
      "A modern hotel and property management solution that streamlines reservations, guest services, housekeeping, payments, and room management.",
    services: ["Hotel Booking Platform", "Property Management", "Mobile App"],
    features: ["Room Booking", "Guest Check-In", "Housekeeping", "Payment Management", "Reports"],
    technology: ["React", "Node.js", "MySQL"],
    logo: "/images/projects/staynest.jpg",
    accent: "from-violet-500/25 via-purple-300/12 to-transparent",
  },
  {
    slug: "edusphere",
    name: "EduSphere",
    industry: "Education",
    industryShort: "Education",
    tagline: "Learning Beyond Boundaries",
    description:
      "An online learning platform developed for schools, universities, and training institutes with virtual classrooms, assignments, exams, and performance tracking.",
    services: ["Learning Management System", "Student Portal", "Teacher Dashboard"],
    features: ["Online Classes", "Assignments", "Exams", "Certificates", "Student Progress"],
    technology: ["React", "Laravel", "MySQL"],
    logo: "/images/projects/edusphere.jpg",
    accent: "from-blue-500/25 via-sky-300/12 to-transparent",
  },
  {
    slug: "shopwave",
    name: "ShopWave",
    industry: "E-Commerce",
    industryShort: "E-Commerce",
    tagline: "Powering Modern Online Stores",
    description:
      "A scalable e-commerce platform built for businesses looking to sell products online with secure payments, inventory management, and customer engagement.",
    services: ["E-Commerce Website", "Payment Gateway", "Admin Dashboard"],
    features: ["Product Management", "Shopping Cart", "Order Tracking", "Secure Checkout", "Promotions"],
    technology: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    logo: "/images/projects/shopwave.jpg",
    accent: "from-emerald-400/25 via-green-300/12 to-transparent",
  },
  {
    slug: "fleetsync",
    name: "FleetSync",
    industry: "Logistics",
    industryShort: "Logistics",
    tagline: "Connecting Every Delivery",
    description:
      "A logistics and fleet management platform designed to improve operational efficiency with GPS tracking, route optimization, driver management, and real-time reporting.",
    services: ["Fleet Management", "Logistics Dashboard", "GPS Tracking"],
    features: ["Live Vehicle Tracking", "Route Optimization", "Driver Management", "Fuel Monitoring", "Reports"],
    technology: ["React", "Node.js", "Google Maps API"],
    logo: "/images/projects/fleetsync.jpg",
    accent: "from-indigo-500/25 via-blue-300/12 to-transparent",
  },
  {
    slug: "fintrack",
    name: "FinTrack",
    industry: "Finance",
    industryShort: "Finance",
    tagline: "Smarter Financial Decisions",
    description:
      "A business financial management platform providing budgeting, expense tracking, invoicing, analytics, and cash flow reporting in one secure dashboard.",
    services: ["Financial Dashboard", "Invoice Management", "Business Analytics"],
    features: ["Expense Tracking", "Budget Planning", "Cash Flow", "Reports", "Invoice Management"],
    technology: ["React", ".NET Core", "SQL Server", "Power BI"],
    logo: "/images/projects/fintrack.jpg",
    accent: "from-emerald-500/25 via-teal-300/12 to-transparent",
  },
];
