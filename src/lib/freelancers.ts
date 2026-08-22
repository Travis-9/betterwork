export type Freelancer = {
  id: string;
  name: string;
  title: string;
  avatar: string;
  location: string;
  remote: boolean;
  availability: string;
  hourlyRate: number;
  rating: number;
  completedProjects: number;
  experienceLevel: string;
  description: string;
  skills: string[];
  categories: string[];
  featured?: boolean;
  lastActive: number;
};

export const freelancers: Freelancer[] = [
  { id: "jason-s", name: "Jason S.", title: "Senior Full-Stack Developer", avatar: "/images/hero-collaboration.png", location: "Paramaribo", remote: true, availability: "Available now", hourlyRate: 350, rating: 4.9, completedProjects: 42, experienceLevel: "Expert", description: "Full-stack developer specializing in modern web applications, APIs and scalable digital products. Experienced in helping Surinamese businesses turn ideas into reliable digital solutions.", skills: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"], categories: ["Web Development", "Engineering"], featured: true, lastActive: 1 },
  { id: "samantha-r", name: "Samantha R.", title: "Creative UI/UX Designer", avatar: "/images/paramaribo-river.png", location: "Paramaribo", remote: true, availability: "Available for new projects", hourlyRate: 275, rating: 4.8, completedProjects: 28, experienceLevel: "Experienced", description: "UI/UX designer focused on intuitive digital experiences, mobile interfaces and modern web applications.", skills: ["Figma", "UI Design", "UX Research", "Prototyping"], categories: ["UI/UX Design"], lastActive: 3 },
  { id: "michael-d", name: "Michael D.", title: "Freelance Logistics Consultant", avatar: "/images/hero-collaboration.png", location: "Wanica", remote: false, availability: "Available this week", hourlyRate: 300, rating: 4.7, completedProjects: 19, experienceLevel: "Experienced", description: "Experienced logistics professional helping businesses improve supply chains, inventory processes and operational efficiency.", skills: ["Supply Chain", "Logistics", "Operations", "Inventory Management"], categories: ["Logistics", "Business & Consulting"], lastActive: 5 },
  { id: "naomi-p", name: "Naomi P.", title: "Digital Marketing Specialist", avatar: "/images/paramaribo-river.png", location: "Paramaribo", remote: true, availability: "Available now", hourlyRate: 225, rating: 4.9, completedProjects: 35, experienceLevel: "Experienced", description: "Digital marketer helping local brands grow through thoughtful content, measurable campaigns and strong social presence.", skills: ["Social Media", "SEO", "Content Strategy", "Meta Ads"], categories: ["Digital Marketing"], lastActive: 2 },
  { id: "dylan-k", name: "Dylan K.", title: "Graphic & Brand Designer", avatar: "/images/hero-collaboration.png", location: "Commewijne", remote: true, availability: "Available for projects", hourlyRate: 200, rating: 4.8, completedProjects: 31, experienceLevel: "Intermediate", description: "Graphic designer creating clear, memorable identities and campaign visuals for growing businesses.", skills: ["Branding", "Adobe Illustrator", "Photoshop", "Social Media Design"], categories: ["Graphic Design"], lastActive: 7 },
  { id: "alex-m", name: "Alex M.", title: "Senior Frontend Developer", avatar: "/images/paramaribo-river.png", location: "Paramaribo", remote: true, availability: "Available now", hourlyRate: 300, rating: 4.9, completedProjects: 36, experienceLevel: "Expert", description: "Frontend developer specializing in responsive web applications and modern JavaScript frameworks.", skills: ["React", "Next.js", "TypeScript"], categories: ["Web Development"], lastActive: 2 },
  { id: "ravi-s", name: "Ravi S.", title: "Financial Consultant", avatar: "/images/hero-collaboration.png", location: "Paramaribo", remote: true, availability: "Available for projects", hourlyRate: 275, rating: 4.8, completedProjects: 24, experienceLevel: "Experienced", description: "Independent financial consultant helping businesses with financial analysis, reporting and business planning.", skills: ["Financial Analysis", "Excel", "Business Planning"], categories: ["Finance", "Business & Consulting"], lastActive: 5 },
  { id: "kevin-b", name: "Kevin B.", title: "Logistics Coordinator", avatar: "/images/paramaribo-river.png", location: "Nickerie", remote: false, availability: "Available for contract projects", hourlyRate: 225, rating: 4.7, completedProjects: 17, experienceLevel: "Intermediate", description: "Freelance logistics specialist supporting businesses with transportation, inventory and supply chain operations.", skills: ["Logistics", "Supply Chain", "Operations"], categories: ["Logistics"], lastActive: 7 },
  { id: "elias-f", name: "Elias F.", title: "Content Writer & Translator", avatar: "/images/hero-collaboration.png", location: "Remote", remote: true, availability: "Available this week", hourlyRate: 175, rating: 4.6, completedProjects: 22, experienceLevel: "Experienced", description: "Clear, versatile copy and translation for websites, campaigns and business communications.", skills: ["Copywriting", "Translation", "Editing"], categories: ["Writing & Translation"], lastActive: 4 },
];

export const freelancerLocations = ["Paramaribo", "Wanica", "Nickerie", "Commewijne", "Saramacca", "Remote"];
export const freelancerAvailability = ["Available now", "Available this week", "Part-time projects", "Full-time projects", "Flexible"];
export const freelancerExperience = ["Entry level", "Intermediate", "Experienced", "Expert"];
export const freelancerCategories = ["Web Development", "Mobile Development", "UI/UX Design", "Graphic Design", "Digital Marketing", "Writing & Translation", "Business & Consulting", "Finance", "Engineering", "Photography & Video", "Administration", "Logistics", "Other"];