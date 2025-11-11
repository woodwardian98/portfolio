// Site configuration
export const SITE_TITLE = "Visible Venus Security";
export const SITE_DESCRIPTION = "Cybersecurity Analysis & Research";
export const SITE_AUTHOR = "Ian Woodward";

// Navigation configuration
export interface NavItem {
  name: string;
  href: string;
  description?: string;
  icon?: string;
  external?: boolean;
  children?: NavItem[];
}

export const MAIN_NAV: NavItem[] = [
  {
    name: "Home",
    href: "/",
    description: "Back to homepage",
  },
  {
    name: "Research",
    href: "/research",
    description: "Security research and analysis",
    children: [
      { name: "Blog Posts", href: "/blog" },
      { name: "White Papers", href: "/research/papers" },
      { name: "Case Studies", href: "/research/cases" },
    ],
  },
  {
    name: "Intelligence",
    href: "/intelligence",
    description: "Threat intelligence and CVE analysis",
    children: [
      { name: "CVE Database", href: "/cve" },
      { name: "Threat Actors", href: "/intelligence/actors" },
      { name: "IOCs", href: "/intelligence/iocs" },
    ],
  },
  {
    name: "Tools",
    href: "/tools",
    description: "Security tools and utilities",
    children: [
      { name: "Vulnerability Scanner", href: "/tools/scanner" },
      { name: "Hash Analyzer", href: "/tools/hash" },
      { name: "Network Tools", href: "/tools/network" },
    ],
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    description: "Security metrics and monitoring",
  },
  {
    name: "About",
    href: "/about",
    description: "About me and my work",
  },
];

export const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourprofile",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: "github",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/yourhandle",
    icon: "twitter",
  },
];

// Breadcrumb configuration
export const BREADCRUMB_MAP: Record<string, string> = {
  "/": "Home",
  "/blog": "Research Blog",
  "/research": "Research",
  "/intelligence": "Threat Intelligence",
  "/cve": "CVE Database",
  "/tools": "Security Tools",
  "/dashboard": "Dashboard",
  "/about": "About",
  "/contact": "Contact",
};
