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
    title: 'DevOps Engineer | Cloud Architect | Automation Specialist',
    description: 'Specialized in CI/CD, Cloud Infrastructure, Containerization and Infrastructure as Code. Passionate about automation and optimizing software development processes.',
    contactMe: 'Contact Me',
    downloadCV: 'Download CV',
  },
  
  // About Section
  about: {
    title: 'About',
    heading: 'About Me',
    paragraph1: 'I am a DevOps Engineer with years of experience in building and managing cloud infrastructure, automating software development processes, and optimizing system performance.',
    paragraph2: 'With deep knowledge of cloud technologies, containerization, and CI/CD, I have helped many organizations transition to modern DevOps models, reducing deployment time and increasing system stability.',
    paragraph3: 'I am always seeking new technologies and best practices to improve workflows and contribute to the DevOps community.',
    highlights: {
      iac: {
        title: 'Infrastructure as Code',
        description: 'Specialized in Terraform, Ansible and other IaC tools',
      },
      cloud: {
        title: 'Cloud Platforms',
        description: 'Experience with AWS, Azure, GCP and cloud services',
      },
      container: {
        title: 'Containerization',
        description: 'Docker, Kubernetes, and container orchestration',
      },
      cicd: {
        title: 'CI/CD Pipelines',
        description: 'Jenkins, GitLab CI, GitHub Actions, and automation',
      },
    },
  },
  
  // Skills Section
  skills: {
    title: 'Skills',
    categories: {
      cloudPlatforms: 'Cloud Platforms',
      containerOrchestration: 'Container & Orchestration',
      cicdTools: 'CI/CD Tools',
      infrastructureAsCode: 'Infrastructure as Code',
      monitoringObservability: 'Monitoring & Observability',
      otherTools: 'Other Tools',
    },
  },
  
  // Experience Section
  experience: {
    title: 'Work Experience',
    items: [
      {
        title: 'Senior DevOps Engineer',
        company: 'Company Name',
        period: '2022 - Present',
        description: [
          'Design and implement CI/CD pipelines for microservices architecture',
          'Manage Kubernetes clusters on AWS and Azure',
          'Automate infrastructure with Terraform and Ansible',
          'Set up monitoring and alerting with Prometheus and Grafana',
          'Optimize cloud costs and system performance',
        ],
      },
      {
        title: 'DevOps Engineer',
        company: 'Previous Company',
        period: '2020 - 2022',
        description: [
          'Build and maintain Docker containers and Kubernetes deployments',
          'Set up GitLab CI/CD pipelines',
          'Manage AWS infrastructure (EC2, S3, RDS, VPC)',
          'Automate deployment processes',
          'Support development teams with DevOps best practices',
        ],
      },
      {
        title: 'System Administrator',
        company: 'Previous Company',
        period: '2018 - 2020',
        description: [
          'Manage Linux servers and network infrastructure',
          'Set up and configure monitoring systems',
          'Automate tasks with shell scripts and Python',
          'Support troubleshooting and system maintenance',
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
        title: 'Kubernetes Multi-Cluster Management',
        description: 'System for managing and automating multiple Kubernetes clusters with Terraform and ArgoCD',
        technologies: ['Kubernetes', 'Terraform', 'ArgoCD', 'AWS'],
      },
      {
        title: 'CI/CD Pipeline Automation',
        description: 'Complete automation pipeline with Jenkins, Docker, and Kubernetes for microservices',
        technologies: ['Jenkins', 'Docker', 'Kubernetes', 'GitLab CI'],
      },
      {
        title: 'Infrastructure Monitoring Dashboard',
        description: 'Infrastructure monitoring dashboard with Prometheus, Grafana and custom metrics',
        technologies: ['Prometheus', 'Grafana', 'Python', 'Docker'],
      },
      {
        title: 'Cloud Cost Optimization Tool',
        description: 'Tool for analyzing and optimizing cloud costs with AWS Cost Explorer API',
        technologies: ['Python', 'AWS', 'Terraform', 'React'],
      },
      {
        title: 'GitOps Workflow with ArgoCD',
        description: 'Deploy GitOps workflow with ArgoCD for continuous deployment',
        technologies: ['ArgoCD', 'Kubernetes', 'Git', 'Helm'],
      },
      {
        title: 'Container Security Scanner',
        description: 'Tool for scanning container images for security and automatically patching vulnerabilities',
        technologies: ['Docker', 'Python', 'Trivy', 'Kubernetes'],
      },
    ],
  },
  
  // Blog Section
  blog: {
    title: 'Blog',
    subtitle: 'Explore articles about DevOps, Cloud, and the latest technologies',
    refresh: 'Refresh',
    loading: 'Loading posts...',
    noPosts: 'No posts yet. Posts will be automatically updated from n8n workflow.',
    noPostsHint: 'Make sure n8n webhook URL is configured in .env file',
    readMore: 'Read More',
    backToBlog: 'Back to Blog',
    readOriginal: 'Read Original Post',
    minutes: 'min',
    minutesRead: 'min read',
    error: 'Unable to load posts. Please try again later.',
    notFound: 'Post not found',
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
    tagline: 'DevOps Engineer | Cloud Architect | Automation Specialist',
  },
}

