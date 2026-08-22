export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  tags: string[];
  posted: string;
  featured?: boolean;
};

export const jobs: Job[] = [
  { id: "senior-civil-engineer", title: "Senior Civil Engineer", company: "Suriname Construction Group", location: "Paramaribo", type: "Full-time", salary: "SRD 25k - 35k", description: "Lead ambitious infrastructure projects and mentor a growing team of local engineers.", tags: ["Engineering", "Management"], posted: "Posted 1 day ago", featured: true },
  { id: "ui-ux-designer", title: "UI/UX Designer", company: "Creative Digital Su", location: "Paramaribo (Hybrid)", type: "Contract", salary: "SRD 18k - 24k", description: "Shape thoughtful digital products for brands working across Suriname and the region.", tags: ["Figma", "Prototyping"], posted: "Posted 3 days ago" },
  { id: "logistics-manager", title: "Logistics Manager", company: "AgriCorp Suriname", location: "Wanica", type: "Full-time", salary: "SRD 20k - 28k", description: "Coordinate the supply chain that keeps a fast-growing agricultural operation moving.", tags: ["Supply Chain", "Operations"], posted: "Posted 4 days ago" },
  { id: "senior-frontend-developer", title: "Senior Frontend Developer", company: "TechSu Solutions Inc.", location: "Paramaribo", type: "Full-Time", salary: "SRD 25,000 - 35,000 / mo", description: "Build polished, accessible products with a collaborative engineering team.", tags: ["React", "TypeScript"], posted: "Posted 2 days ago" },
  { id: "financial-analyst", title: "Financial Analyst", company: "Suriname National Bank", location: "Paramaribo", type: "Full-Time", salary: "SRD 18,000 - 22,000 / mo", description: "Turn financial data into clear recommendations for teams across the bank.", tags: ["Finance", "Reporting"], posted: "Posted 5 days ago" },
  { id: "logistics-coordinator", title: "Logistics Coordinator", company: "Global Freight Su", location: "Nickerie", type: "Contract", salary: "SRD 12,000 - 15,000 / mo", description: "Keep shipments, partners, and customers moving in step across the country.", tags: ["Logistics", "Coordination"], posted: "Posted 1 week ago" },
  { id: "marketing-specialist", title: "Marketing Specialist", company: "Paramaribo Creative House", location: "Remote", type: "Freelance", salary: "SRD 10k - 16k", description: "Bring locally grounded campaigns to life for a portfolio of ambitious businesses.", tags: ["Marketing", "Content"], posted: "Posted 1 week ago" },
];

export const locations = ["Paramaribo", "Wanica", "Nickerie", "Commewijne", "Remote"];
export const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];