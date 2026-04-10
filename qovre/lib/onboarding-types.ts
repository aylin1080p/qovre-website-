// Shared types between OnboardingForm and API route

export type Category = 'web' | 'saas' | 'ai'
export type SlaLevel = 'essential' | 'growth' | 'partner'
export type HostingType = 'qovre' | 'own'
export type TrafficLevel = 'low' | 'medium' | 'high' | 'enterprise'
export type SecurityLevel = 'standard' | 'advanced' | 'enterprise'
export type ScalabilityLevel = 'fixed' | 'moderate' | 'high'
export type ComplexityLevel = 'mvp' | 'standard' | 'enterprise'
export type WebType = 'website' | 'webshop' | 'leadgen'
export type WebIntegration = 'crm' | 'calendar' | 'payment' | 'analytics'
export type PageCount = 'small' | 'medium' | 'large'
export type AiFunction = 'analysis' | 'bot' | 'automation'
export type AutomationType = 'chatbot' | 'data_pipeline' | 'document_ai' | 'workflow'
export type DataSource = 'crm' | 'email' | 'database' | 'api' | 'files'

export interface FormState {
  locale: string
  // Step 1
  category: Category | null
  // Step 2 — Web
  webTypes: WebType[]
  cmsNeeded: boolean | null
  integrations: WebIntegration[]
  pageCount: PageCount | null
  // Step 2 — SaaS
  userRoles: string[]
  complexity: ComplexityLevel | null
  aiFunctions: AiFunction[]
  dataMigration: boolean | null
  // Step 2 — AI
  automationTypes: AutomationType[]
  dataSources: DataSource[]
  hasExistingAi: boolean | null
  // Step 3 — Infrastructure
  trafficLevel: TrafficLevel | null
  securityLevel: SecurityLevel | null
  scalability: ScalabilityLevel | null
  hosting: HostingType | null
  slaLevel: SlaLevel | null
  // Step 4 — Contact
  name: string
  email: string
  company: string
  competitorUrl: string
  fileName: string
  fileBase64: string | null
}

export const INITIAL_FORM: FormState = {
  locale: 'nl',
  category: null,
  webTypes: [], cmsNeeded: null, integrations: [], pageCount: null,
  userRoles: [], complexity: null, aiFunctions: [], dataMigration: null,
  automationTypes: [], dataSources: [], hasExistingAi: null,
  trafficLevel: null, securityLevel: null, scalability: null,
  hosting: null, slaLevel: null,
  name: '', email: '', company: '', competitorUrl: '', fileName: '', fileBase64: null,
}

// Admin dashboard submission type (from Supabase)
export interface Submission {
  id: string
  created_at: string
  category: Category
  status: 'new' | 'reviewed' | 'proposal_sent' | 'won' | 'lost'
  sla_level: SlaLevel | null
  hosting: HostingType | null
  traffic_level: TrafficLevel | null
  security_level: SecurityLevel | null
  scalability: ScalabilityLevel | null
  name: string
  email: string
  company: string | null
  file_name: string | null
  payload: FormState
}
