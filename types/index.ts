import { User } from "@prisma/client";
import { string } from "zod";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null
}

export interface GeneratedContent {
  script: string;
  hookIdeas: string[];
  shots: {
    id: number;
    description: string;
    duration: string;
    camera: string;
  }[];
  metrics: {
    name: string;
    value: number;
    description: string;
    icon: string;
  }[];
  audienceMatch: number;
}

export interface LinksHubb {
  id?: string;
  projectName: string;
  clientName: string;
  startDate: string;
  endDate: string;
  summary: string;
  objectives: string[];
  scopeInclusions: string[];
  scopeExclusions: string[];
  methodology: string[];
  timeline: TimelineItem[];
  budget: Budget;
  risks: Risk[];
  team: TeamMember[];
  outcomes: string[];
  callToAction: string;
  companyName?: string;
  preparedBy?: string;
  contactInfo?: ContactInfo;
  theme?: string;
  images?: {
    summary?: string;
    objectives?: string; 
    deliverables?: string;
    timeline?: string;
    risks?: string;
    outcomes?: string;
  };
  status?: 'Submitted' | 'Interviewed' | 'Hired' | 'Rejected';
  statusDate?: Date | string;
  statusNotes?: string;
}

export interface TimelineItem {
  phase: string;
  duration: string;
  description: string;
}

export interface Budget {
  currency: string;
  amount: number;
  breakdown?: BudgetItem[];
}

export interface BudgetItem {
  description: string;
  amount: number;
}

export interface Risk {
  description: string;
  mitigation: string;
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface ContactInfo {
  contact: string;
  email: string;
  website: string;
}
