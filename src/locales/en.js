export const en = {
  // Navigation
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    certifications: 'Certifications',
    projects: 'Projects',
    blog: 'Blog',
    contact: 'Contact',
  },
  
  // Hero Section
  hero: {
    greeting: 'Hello, I am',
    name: 'Stephen Sang',
    title: 'Senior Fullstack Blockchain Engineer | Cloud Security Candidate | Solution Architect Track',
    description: '5+ years building fullstack Web3 applications (ReactJS, NestJS, Solidity) and secure AWS cloud systems. AWS Certified Solutions Architect & Security Specialty, with a career focus on Cloud Security and Solution Architecture.',
    contactMe: 'Contact Me',
    downloadCV: 'Download CV',
  },
  
  // About Section
  about: {
    title: 'About',
    heading: 'About Me',
    paragraph1: 'I am a Senior Fullstack Blockchain Engineer with 5+ years of experience delivering Web3 applications and secure cloud systems. I specialize in ReactJS/NestJS fullstack development, smart contract engineering, and AWS cloud security practices.',
    paragraph2: 'My work spans DeFi, NFT marketplaces, gaming platforms, and enterprise SaaS — from React Module Federation and NestJS microservices to AWS KMS, IAM, and smart contract audits with Slither and Foundry. I design systems with security-by-design and scalability in mind.',
    paragraph3: 'I hold AWS Certified Solutions Architect – Associate and AWS Certified Security - Specialty (2026–2029). I am actively pursuing Cloud Security roles and building toward Solution Architect on AWS through hands-on architecture, IaC, and technical mentorship.',
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
      development: 'Fullstack Development',
      securityResearch: 'Security Research',
    },
  },
  
  // Experience Section
  experience: {
    title: 'Work Experience',
    items: [
      {
        title: 'Senior Fullstack Engineer / Tech Lead',
        company: 'FPT Software',
        period: 'Mar 2026 - Present',
        description: [
          'Design and maintain ReactJS/Next.js frontends with atomic design, state persistence, and secure client-side patterns.',
          'Define NestJS architectural standards (DI, Pipes, Filters) for maintainable, testable, and security-aware server-side applications.',
          'Lead fullstack troubleshooting — from React re-render bottlenecks to NestJS memory leaks and database query optimization.',
          'Evaluate and migrate libraries (Express → NestJS, legacy CSS → Tailwind) to improve DX, performance, and security posture.',
          'Act as Tech Lead: define coding conventions, best practices, and mentor teammates on fullstack and security standards.',
          'Monitor daily reports, investigate incidents, and deliver customer-facing summaries with root-cause analysis.',
        ],
      },
      {
        title: 'Fullstack Blockchain Engineer / Tech Lead',
        company: 'Skybull Gaming Studio',
        period: 'Jun 2025 - Dec 2025',
        description: [
          'Secured validator keys with AWS KMS and VPC Endpoints for network isolation, applying AWS Security best practices.',
          'Cloud Infrastructure: AWS Lambda, EC2, ALB, SQS, S3 with Docker; EKS clusters, Helm, and IaC security baselines.',
          'Architected a ReactJS dashboard with Module Federation for strict multi-tenant data isolation across banking clients.',
          'Designed front-end architecture, state management, and NestJS/Go backend services for cross-chain gaming platforms.',
          'Tracked and debugged on-chain transactions with Fift, Toncli, Hardhat, and Tenderly across Substrate, Avalanche, and Kaia.',
          'Tech Lead for Animal Go: smart contract design (Substrate/ink!), marketplace UI, automated testing, and client technical syncs.',
          'DevSecOps: CI/CD (GitLab CI/Jenkins), SAST/DAST for Go, NestJS, Lambda, and container workloads.',
        ],
      },
      {
        title: 'Fullstack Blockchain Engineer',
        company: 'CMC Global',
        period: 'Feb 2023 - May 2025',
        description: [
          'Smart Contract Security: Slither, Echidna, Foundry audits; vulnerability assessments on EVM dApps and Solidity contracts.',
          'ZKP & Cloud Privacy: Zero-Knowledge Proof protocols, AWS Enclaves, and regulatory compliance for privacy-focused DeFi.',
          'Optimized ReactJS performance via code-splitting and memoization, reducing FCP for international users.',
          'Integrated Web3 (Ethers.js, Web3.js, Web3.py) with ReactJS frontends; tracked transactions with Tenderly.',
          'Designed smart contract system architectures, mentored new engineers, and resolved critical technical blockers.',
        ],
      },
      {
        title: 'Fullstack Blockchain / Web Developer',
        company: 'Napa Global',
        period: 'Jun 2019 - Dec 2022',
        description: [
          'Developed responsive ReactJS web applications (Ant Design, Material UI, SCSS) per client requirements.',
          'Designed and deployed smart contract systems in Solidity with Hardhat/Truffle; integrated via Ethers.js and Web3.py.',
          'Security Auditing: Slither and Foundry for re-entrancy, overflow, and logic flaw detection before production.',
          'Deployed and maintained applications on AWS; fixed bugs and ensured secure backend–on-chain interfaces.',
        ],
      },
    ],
  },

  // Certifications Section
  certifications: {
    title: 'Certifications',
    solutionsArchitectAssociate: 'AWS Certified Solutions Architect',
    securitySpecialty: 'AWS Certified Security',
    issuer: 'Amazon Web Services (AWS)',
    validityLabel: 'Valid',
    validity: '2026 – 2029',
    viewOnCredly: 'View on Credly',
  },
  
  // Projects Section
  projects: {
    title: 'Projects',
    readCaseStudy: 'Read Case Study',
    prevSlide: 'Previous projects',
    nextSlide: 'Next projects',
    items: [
      {
        title: 'Game AI Marketplace',
        blogId: 'game-ai-marketplace',
        description: 'Decentralized AI-driven gaming marketplace with Unity WebGL streaming, multi-chain crypto payments, and AI content moderation. Applied IAM fine-grained policies and AWS WAF to protect IP and block common web exploits.',
        technologies: ['ReactJS', 'NestJS', 'TypeScript', 'AWS Lambda', 'S3', 'CloudFront', 'IAM', 'WAF', 'Rekognition', 'Solidity'],
      },
      {
        title: 'Bank Fraud Detection & Check Verification',
        blogId: 'bank-fraud-detection',
        description: 'High-security, multi-tenant SaaS for international banking partners. Real-time fraud alerts, check verification workflows, and strict data isolation with secure frontend patterns (XSS prevention, JWT handling).',
        technologies: ['ReactJS', 'Redux Toolkit', 'Material-UI', 'Zustand', 'TailwindCSS', 'Azure', 'Kafka', 'SQL Server'],
      },
      {
        title: 'DeFi & Privacy-focused Institution',
        blogId: 'defi-privacy-institution',
        description: 'Secure cloud environment for ZKP computations (transaction anonymity, data privacy). AWS Nitro Enclaves, zk-SNARKs/STARKs, EKS, KMS, Golang, Solidity, Circom. GDPR-focused.',
        technologies: ['AWS Nitro Enclaves', 'ZK-SNARKs', 'EKS', 'Docker', 'KMS', 'Golang', 'Solidity', 'Circom'],
      },
      {
        title: 'NFT Marketplace & Web3 Gaming Studio',
        blogId: 'nft-marketplace-web3-security',
        description: 'GitLab CI/CD security scanning: secrets detection, SCA for CVEs, Checkov/Terrascan IaC. 85% reduction in production vulnerabilities. Security audits for Web3 libraries and smart contracts.',
        technologies: ['GitLab CI', 'Checkov', 'Trivy', 'Slither', 'Foundry', 'Secrets Detection', 'AWS Inspector'],
      },
      {
        title: 'Multi-Account Centralized Security Logging & Analytics (SIEM)',
        blogId: 'siem-security-datalake',
        description: 'Security Data Lake aggregating CloudTrail, VPC Flow Logs, DNS from 50+ accounts. S3 Object Lock, Athena, QuickSight dashboards. SOC 2 and PCI-DSS oriented.',
        technologies: ['S3 Object Lock', 'Athena', 'QuickSight', 'Kinesis Firehose', 'CloudTrail', 'VPC Flow Logs'],
      },
      {
        title: 'Cryptocurrency Exchange & Validator Security Automation',
        blogId: 'crypto-exchange-validator-security',
        description: 'Automated incident response: GuardDuty + EventBridge, Lambda to revoke IAM and isolate EC2/validators. EBS Snapshots, SNS/Slack alerts, DDoS and port-blocking for validator nodes.',
        technologies: ['GuardDuty', 'Lambda', 'EventBridge', 'EBS Snapshot', 'SNS', 'Security Groups', 'Python (Boto3)'],
      },
      {
        title: 'Enterprise-wide Cloud Security Guardrails & Governance',
        blogId: 'enterprise-cloud-guardrails',
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
    filterByType: 'Type',
    allTypes: 'All',
    cheatsheet: 'Cheatsheet',
    project: 'Project',
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
    relatedPosts: 'Related posts',
    readOriginal: 'Read Original Post',
    minutes: 'min',
    minutesRead: 'min read',
    error: 'Unable to load posts. Please try again later.',
    notFound: 'Post not found',
    tableOfContents: 'Table of Contents',
    copy: 'Copy',
    copied: 'Copied!',
    prevPage: 'Previous',
    nextPage: 'Next',
    pageOf: 'Page',
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
    tagline: 'Senior Fullstack Blockchain Engineer | Cloud Security Candidate | Solution Architect Track',
  },
}

