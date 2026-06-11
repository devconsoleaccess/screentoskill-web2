export const BRAND = {
  name: "ScreenToSkill",
  primary: "#22C55E",
  primaryHover: "#16a34a",
  appStoreLink:
    "https://drive.google.com/file/d/1vfOt_-MySyfuIOark4P9tWVzm1UaDGD2/view?usp=drive_link",
} as const;

export type NavItem =
  | { kind: "section"; id: string; label: string }
  | { kind: "page"; href: string; label: string };

export const NAV_ITEMS: NavItem[] = [
  { kind: "section", id: "#why-screentoskill", label: "Why ScreenToSkill" },
  { kind: "section", id: "#how-it-works", label: "How It Works" },
  { kind: "page", href: "/case-study", label: "Case Study" },
  { kind: "section", id: "#faqs", label: "FAQ" },
  { kind: "page", href: "/register", label: "Register" },

];

export type FooterColumn = {
  title: string;
  links: { label: string; href: string; emphasized?: boolean }[];
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "Core Methodology", href: "/#how-it-works" },
      { label: "Brain Impact", href: "/#brain-impact" },
      { label: "Parent Analytics", href: "/#parent-portal" },
      { label: "Accessibility Setup", href: "/#mandatory-permissions" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Family Plan", href: "/#download" },
      { label: "Interactive Case Study", href: "/case-study", emphasized: true },
      { label: "Direct Download", href: "/#download" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Why ScreenToSkill", href: "/#why-screentoskill" },
      { label: "Before & After", href: "/#comparison" },
      { label: "Age-Adapted Focus", href: "/#age-adapted" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Science & Vision", href: "/#vision" },
      { label: "Curriculum FAQs", href: "/#faqs" },
      { label: "Get App Free", href: "/#download" },
    ],
  },
];
