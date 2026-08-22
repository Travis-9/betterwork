export type Experience = {
  title: string;
  company: string;
  type: string;
  dates: string;
  duration: string;
  description: string;
  current?: boolean;
};

export type PortfolioProject = {
  title: string;
  type: string;
  image: string;
  alt: string;
};

export const profile = {
  name: "Amba Pinas",
  title: "Senior Product Designer",
  location: "Paramaribo, Suriname",
  bio: "Passionate product designer with over 8 years of experience creating user-centric digital solutions for both local and international clients. Specialized in design systems, UX research, and bridging business goals and user needs.",
  skills: ["UI/UX Design", "Prototyping", "User Research", "Figma", "Design Systems"],
  strength: { level: "Intermediate", completion: 70, note: "Add a portfolio project to reach All-Star status." },
  experiences: [
    { title: "Senior Product Designer", company: "TechSur Solutions", type: "Full-time", dates: "Jan 2021 - Present", duration: "3 yrs 9 mos", description: "Leading the design team in developing scalable digital products for local enterprises. Implemented a unified design system that reduced development time by 30%.", current: true },
    { title: "UX/UI Designer", company: "Creative Agency Paramaribo", type: "Contract", dates: "Mar 2018 - Dec 2020", duration: "2 yrs 10 mos", description: "Designed responsive e-commerce websites and mobile applications for retail clients across Suriname." },
  ] satisfies Experience[],
  projects: [
    { title: "Local Banking App Redesign", type: "Mobile UI • 2023", image: "/images/hero-collaboration.png", alt: "Designers collaborating on a digital product" },
    { title: "HR Management Dashboard", type: "Web App • 2022", image: "/images/paramaribo-river.png", alt: "Paramaribo river and city skyline" },
  ] satisfies PortfolioProject[],
};