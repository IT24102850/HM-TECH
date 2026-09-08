export type PortfolioProject = {
  name: string;
  industry: string;
  tagline: string;
  description: string;
  services: string[];
  features: string[];
  technology: string[];
  image: string;
  accent: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    name: "NovaERP",
    industry: "Enterprise Resource Planning (ERP)",
    tagline: "Manage Everything. Grow Smarter.",
    description: "An intelligent enterprise resource planning platform for integrated finance, HR, inventory, procurement, CRM, and analytics.",
    services: ["UI/UX Design", "Web Application Development", "ERP System", "Dashboard Development"],
    features: ["Financial Management", "Inventory Control", "Human Resources", "Customer Relationship Management", "Procurement", "Business Analytics"],
    technology: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
    image: "/images/novaerp.jpg",
    accent: "from-violet-950 via-violet-700 to-fuchsia-500",
  },
  {
    name: "MediCore",
    industry: "Healthcare",
    tagline: "Smarter Healthcare Management",
    description: "A digital healthcare management platform simplifying patient records, appointments, billing, pharmacy, and laboratory operations.",
    services: ["Healthcare Software", "Patient Management System", "Dashboard UI", "Mobile Application"],
    features: ["Electronic Medical Records", "Appointment Booking", "Billing", "Pharmacy", "Laboratory Reports"],
    technology: ["Next.js", "Node.js", "MongoDB", "Firebase"],
    image: "/images/medicore.jpg",
    accent: "from-sky-950 via-cyan-700 to-teal-400",
  },
  {
    name: "FoodFlow",
    industry: "Restaurant Management",
    tagline: "Serving Innovation Daily",
    description: "A cloud-based restaurant management platform for online ordering, POS integration, QR menus, reservations, and kitchen operations.",
    services: ["Restaurant POS", "Mobile Ordering", "QR Menu", "Kitchen Dashboard"],
    features: ["Online Orders", "Kitchen Display", "Table Reservation", "Delivery Tracking", "Customer Loyalty"],
    technology: ["React", "Express", "MongoDB", "Stripe API"],
    image: "/images/foodflow.jpg",
    accent: "from-orange-950 via-orange-700 to-amber-400",
  },
  {
    name: "StayNest",
    industry: "Hospitality",
    tagline: "Hospitality Made Simple",
    description: "A modern hotel and property management solution for reservations, guest services, housekeeping, payments, and room management.",
    services: ["Hotel Booking Platform", "Property Management", "Mobile App"],
    features: ["Room Booking", "Guest Check-In", "Housekeeping", "Payment Management", "Reports"],
    technology: ["React", "Node.js", "MySQL"],
    image: "/images/staynest.jpg",
    accent: "from-emerald-950 via-emerald-700 to-lime-400",
  },
  {
    name: "EduSphere",
    industry: "Education",
    tagline: "Learning Beyond Boundaries",
    description: "An online learning platform for schools, universities, and training institutes with virtual classrooms, assignments, exams, and progress tracking.",
    services: ["Learning Management System", "Student Portal", "Teacher Dashboard"],
    features: ["Online Classes", "Assignments", "Exams", "Certificates", "Student Progress"],
    technology: ["React", "Laravel", "MySQL"],
    image: "/images/edusphere.jpg",
    accent: "from-blue-950 via-blue-700 to-sky-400",
  },
  {
    name: "ShopWave",
    industry: "E-Commerce",
    tagline: "Powering Modern Online Stores",
    description: "A scalable e-commerce platform for secure payments, inventory management, product discovery, and customer engagement.",
    services: ["E-Commerce Website", "Payment Gateway", "Admin Dashboard"],
    features: ["Product Management", "Shopping Cart", "Order Tracking", "Secure Checkout", "Promotions"],
    technology: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    image: "/images/shopwave.jpg",
    accent: "from-pink-950 via-rose-700 to-orange-400",
  },
  {
    name: "FleetSync",
    industry: "Logistics",
    tagline: "Connecting Every Delivery",
    description: "A logistics and fleet management platform improving operational efficiency with GPS tracking, route optimization, and real-time reporting.",
    services: ["Fleet Management", "Logistics Dashboard", "GPS Tracking"],
    features: ["Live Vehicle Tracking", "Route Optimization", "Driver Management", "Fuel Monitoring", "Reports"],
    technology: ["React", "Node.js", "Google Maps API"],
    image: "/images/fleetsync.jpg",
    accent: "from-indigo-950 via-indigo-700 to-blue-400",
  },
  {
    name: "FinTrack",
    industry: "Finance",
    tagline: "Smarter Financial Decisions",
    description: "A secure business financial management platform for budgeting, expenses, invoicing, analytics, and cash flow reporting.",
    services: ["Financial Dashboard", "Invoice Management", "Business Analytics"],
    features: ["Expense Tracking", "Budget Planning", "Cash Flow", "Reports", "Invoice Management"],
    technology: ["React", ".NET Core", "SQL Server", "Power BI"],
    image: "/images/fintrack.jpg",
    accent: "from-slate-950 via-teal-800 to-emerald-400",
  },
];