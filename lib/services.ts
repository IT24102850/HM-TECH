import {
  Code,
  Globe,
  Smartphone,
  BrainCircuit,
  Cloud,
  Network,
  TrendingUp,
  Camera,
  PenTool,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  copy: string;
};

export const services: Service[] = [
  {
    icon: Code,
    title: "Software Development",
    copy: "Custom software solutions built with modern technologies and best practices.",
  },
  {
    icon: Globe,
    title: "Web Development",
    copy: "High-performance websites and web applications that deliver exceptional user experiences.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    copy: "Native and cross-platform mobile apps for iOS and Android that users love.",
  },
  {
    icon: BrainCircuit,
    title: "AI & Automation",
    copy: "Intelligent automation and AI solutions to streamline processes and boost productivity.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    copy: "Scalable cloud infrastructure and solutions to accelerate business growth.",
  },
  {
    icon: Network,
    title: "ERP Solutions",
    copy: "Custom ERP systems to manage and integrate business operations seamlessly.",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    copy: "Data-driven marketing strategies to grow your brand and reach the right audiences.",
  },
  {
    icon: Camera,
    title: "Cinematography",
    copy: "Professional video production and visual storytelling to bring your brand's narrative to life.",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    copy: "Beautiful, intuitive designs that enhance user experience and drive engagement.",
  },
  {
    icon: Lightbulb,
    title: "IT Consultancy",
    copy: "Expert guidance and consulting to help you make the right technology decisions.",
  },
];
