// Constants for LinksHubb statuses
export const LinksHubb_STATUSES = {
  SUBMITTED: 'Submitted',
  INTERVIEWED: 'Interviewed',
  HIRED: 'Hired',
  REJECTED: 'Rejected'
} as const;

export type LinksHubbStatus = typeof LinksHubb_STATUSES[keyof typeof LinksHubb_STATUSES];

// Success metrics descriptions
export const METRICS_DESCRIPTIONS = {
  interviewRate: 'Percentage of LinksHubbs that led to interviews',
  hireRate: 'Percentage of interviews that resulted in hiring',
  successRate: 'Overall percentage of LinksHubbs that resulted in hiring'
};
