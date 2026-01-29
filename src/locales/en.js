export const en = {
  // Navigation
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    blog: 'Blog',
    contact: 'Contact',
  },
  
  // Hero Section
  hero: {
    greeting: 'Hello, I am',
    name: 'Stephen Sang',
    title: 'Senior Cloud Security & Infrastructure Engineer | DevSecOps | Blockchain Security',
    description: '4+ years architecting secure, high-availability systems on AWS. Specialized in Zero-Trust implementation, DevSecOps automation, and Blockchain infrastructure hardening. AWS Certified Solutions Architect & Security Specialty.',
    contactMe: 'Contact Me',
    downloadCV: 'Download CV',
  },
  
  // About Section
  about: {
    title: 'About',
    heading: 'About Me',
    paragraph1: 'I am a Senior Cloud Security & Infrastructure Engineer with 4+ years of experience architecting secure, high-availability systems on AWS. I specialize in Zero-Trust implementation, DevSecOps automation, and Blockchain infrastructure hardening.',
    paragraph2: 'My work spans multi-account governance (SCPs, Config), securing digital assets with ZKP and KMS, and orchestrating high-availability AWS EKS clusters. I have led security initiatives for DeFi, NFT marketplaces, and enterprise cloud environments.',
    paragraph3: 'I hold AWS Certified Solutions Architect – Associate and AWS Certified Security - Specialty (2026–2029), and I am passionate about bridging traditional DevOps with Blockchain security through technical mentorship.',
    highlights: {
      iac: {
        title: 'Infrastructure as Code',
        description: 'Terraform, Helm Charts, secure templating across production and staging',
      },
      cloud: {
        title: 'Cloud Security',
        description: 'IAM, KMS, Secrets Manager, GuardDuty, WAF, VPC, Zero-Trust',
      },
      container: {
        title: 'Container & Orchestration',
        description: 'AWS EKS, Docker, Kubernetes, Nitro Enclaves',
      },
      cicd: {
        title: 'DevSecOps & CI/CD',
        description: 'GitLab CI, Jenkins, SAST/DAST, Trivy, Checkov, Terrascan',
      },
    },
  },
  
  // Skills Section
  skills: {
    title: 'Skills',
    categories: {
      cloudSecurity: 'Cloud Security',
      infrastructureOrchestration: 'Infrastructure & Orchestration',
      devsecopsCicd: 'DevSecOps & CI/CD',
      blockchainSecurity: 'Blockchain Security',
      development: 'Development',
      securityResearch: 'Security Research',
    },
  },
  
  // Experience Section
  experience: {
    title: 'Work Experience',
    items: [
      {
        title: 'Senior Cloud Security & Infrastructure Engineer',
        company: 'Skybull Gaming Studio',
        period: 'Jul 2025 - Present',
        description: [
          'Cloud Infrastructure Orchestration: High-availability AWS EKS clusters, Helm, IaC security baselines.',
          'Network Hardening & Isolation: VPC Endpoints, Private Subnets, zero-trust for Hyperledger Fabric and EVM validators.',
          'Secrets Management & Data Protection: AWS KMS, Secrets Manager, IAM Policies, Permission Boundaries.',
          'Monitoring & Auditing: CloudWatch, GuardDuty, Slither, automated vulnerability assessments.',
          'Cross-Chain Infrastructure: Substrate (The Root Network), Avalanche Subnets, Kaia Network.',
          'DevSecOps: CI/CD (GitLab CI/Jenkins), SAST/DAST for Go, NestJS, Lambda, containers.',
        ],
      },
      {
        title: 'Blockchain & Cloud Security Engineer',
        company: 'CMC Global',
        period: 'Jun 2023 - Jun 2025',
        description: [
          'ZKP & Cloud Privacy: Zero-Knowledge Proof protocols, AWS Enclaves, regulatory compliance.',
          'Cloud-Native Security: GuardDuty, WAF for TON-based dApps, private key and relayer security.',
          'Secure SDLC & IaC: Terraform, hardened cloud environments, Unit/Integration/Security audits (TONCLI).',
          'Smart Contract Security: Slither, Echidna, Foundry; EVM dApps, Solidity, Web3.py, EthersJS.',
          'Technical Mentorship: Cloud Security (IAM, Secrets) and ZKP sessions.',
        ],
      },
      {
        title: 'Software Engineer (Smart Contract Security Focus)',
        company: 'Napa Global',
        period: 'Oct 2021 - Dec 2022',
        description: [
          'Security Auditing & Formal Verification: Slither, Echidna, Foundry for re-entrancy and overflows.',
          'Secure Contract Architecture: dApp design and audits on Ethereum-compatible chains.',
          'EVM Ecosystem Security: Production Solidity contracts, 100% test coverage for critical logic.',
          'Blockchain Integration: Secure backend–on-chain interfaces, Web3.py, EthersJS.',
        ],
      },
    ],
  },
  
  // Projects Section
  projects: {
    title: 'Projects',
    code: 'Code',
    demo: 'Demo',
    items: [
      {
        title: 'DeFi & Privacy-focused Institution',
        description: 'Secure cloud environment for ZKP computations (transaction anonymity, data privacy). AWS Nitro Enclaves, zk-SNARKs/STARKs, EKS, KMS, Golang, Solidity, Circom. GDPR-focused.',
        technologies: ['AWS Nitro Enclaves', 'ZK-SNARKs', 'EKS', 'Docker', 'KMS', 'Golang', 'Solidity', 'Circom'],
      },
      {
        title: 'NFT Marketplace & Web3 Gaming Studio',
        description: 'GitLab CI/CD security scanning: secrets detection, SCA for CVEs, Checkov/Terrascan IaC. 85% reduction in production vulnerabilities. Security audits for Web3 libraries and smart contracts.',
        technologies: ['GitLab CI', 'Checkov', 'Trivy', 'Slither', 'Foundry', 'Secrets Detection', 'AWS Inspector'],
      },
      {
        title: 'Multi-Account Centralized Security Logging & Analytics (SIEM)',
        description: 'Security Data Lake aggregating CloudTrail, VPC Flow Logs, DNS from 50+ accounts. S3 Object Lock, Athena, QuickSight dashboards. SOC 2 and PCI-DSS oriented.',
        technologies: ['S3 Object Lock', 'Athena', 'QuickSight', 'Kinesis Firehose', 'CloudTrail', 'VPC Flow Logs'],
      },
      {
        title: 'Cryptocurrency Exchange & Validator Security Automation',
        description: 'Automated incident response: GuardDuty + EventBridge, Lambda to revoke IAM and isolate EC2/validators. EBS Snapshots, SNS/Slack alerts, DDoS and port-blocking for validator nodes.',
        technologies: ['GuardDuty', 'Lambda', 'EventBridge', 'EBS Snapshot', 'SNS', 'Security Groups', 'Python (Boto3)'],
      },
      {
        title: 'Enterprise-wide Cloud Security Guardrails & Governance',
        description: 'Multi-account governance (100+ accounts): SCPs, disable unapproved regions, CloudTrail/GuardDuty enforcement, IMDSv2. Terraform and AWS Config for compliance.',
        technologies: ['AWS Organizations', 'SCPs', 'Terraform', 'AWS Config', 'Control Tower', 'IAM', 'IMDSv2'],
      },
    ],
  },
  
  // Blog Section
  blog: {
    title: 'Blog',
    subtitle: 'Explore articles about DevOps, Cloud, and the latest technologies',
    searchPlaceholder: 'Search by title, excerpt...',
    filterByTool: 'Filter by tool',
    filterBySkill: 'Filter by skill',
    allTools: 'All tools',
    allSkills: 'All skills',
    refresh: 'Refresh',
    loading: 'Loading posts...',
    noPosts: 'No posts yet. Posts will be automatically updated from n8n workflow.',
    noPostsHint: 'Make sure n8n webhook URL is configured in .env file',
    noResults: 'No posts match the current filters.',
    noResultsHint: 'Try changing the search or clearing filters.',
    readMore: 'Read More',
    backToBlog: 'Back to Blog',
    readOriginal: 'Read Original Post',
    minutes: 'min',
    minutesRead: 'min read',
    error: 'Unable to load posts. Please try again later.',
    notFound: 'Post not found',
    tableOfContents: 'Table of Contents',
    copy: 'Copy',
    copied: 'Copied!',
  },
  
  // Contact Section
  contact: {
    title: 'Contact',
    infoTitle: 'Contact Information',
    infoDescription: 'Have a question or want to collaborate? Contact me through the methods below or fill out the form on the side.',
    form: {
      name: 'Your Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      submit: 'Send Message',
      submitting: 'Sending...',
      success: 'Thank you for contacting me! I will respond as soon as possible.',
      error: 'An error occurred. Please try again later or contact directly via email.',
    },
  },
  
  // Footer
  footer: {
    madeWith: 'Made with',
    by: 'by Stephen Sang',
    rights: 'All rights reserved.',
    tagline: 'Senior Cloud Security & Infrastructure Engineer | DevSecOps | Blockchain Security',
  },
}

