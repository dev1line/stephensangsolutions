export const vi = {
  // Navigation
  nav: {
    home: 'Trang chủ',
    about: 'Giới thiệu',
    skills: 'Kỹ năng',
    experience: 'Kinh nghiệm',
    projects: 'Dự án',
    blog: 'Blog',
    contact: 'Liên hệ',
  },
  
  // Hero Section
  hero: {
    greeting: 'Xin chào, Tôi là',
    name: 'Stephen Sang',
    title: 'Senior Cloud Security & Infrastructure Engineer | DevSecOps | Blockchain Security',
    description: 'Hơn 4 năm thiết kế hệ thống bảo mật, high-availability trên AWS. Chuyên Zero-Trust, DevSecOps, và củng cố hạ tầng Blockchain. AWS Certified Solutions Architect & Security Specialty.',
    contactMe: 'Liên hệ với tôi',
    downloadCV: 'Tải CV',
  },
  
  // About Section
  about: {
    title: 'Giới thiệu',
    heading: 'Về tôi',
    paragraph1: 'Tôi là Senior Cloud Security & Infrastructure Engineer với hơn 4 năm kinh nghiệm thiết kế hệ thống bảo mật, high-availability trên AWS. Chuyên Zero-Trust, DevSecOps và củng cố hạ tầng Blockchain.',
    paragraph2: 'Công việc của tôi bao gồm quản trị multi-account (SCPs, Config), bảo mật tài sản số với ZKP và KMS, vận hành cluster AWS EKS. Tôi đã dẫn dắt các sáng kiến bảo mật cho DeFi, NFT marketplace và môi trường cloud doanh nghiệp.',
    paragraph3: 'Tôi có chứng chỉ AWS Certified Solutions Architect – Associate và AWS Certified Security - Specialty (2026–2029), và đam mê kết nối DevOps truyền thống với bảo mật Blockchain qua mentoring kỹ thuật.',
    highlights: {
      iac: {
        title: 'Infrastructure as Code',
        description: 'Terraform, Helm Charts, secure templating cho production và staging',
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
    title: 'Kỹ năng',
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
    title: 'Kinh nghiệm làm việc',
    items: [
      {
        title: 'Senior Cloud Security & Infrastructure Engineer',
        company: 'Skybull Gaming Studio',
        period: 'Tháng 7/2025 - Hiện tại',
        description: [
          'Cloud Infrastructure Orchestration: Cluster AWS EKS high-availability, Helm, IaC security baselines.',
          'Network Hardening & Isolation: VPC Endpoints, Private Subnets, zero-trust cho Hyperledger Fabric và EVM validators.',
          'Secrets Management & Data Protection: AWS KMS, Secrets Manager, IAM Policies, Permission Boundaries.',
          'Monitoring & Auditing: CloudWatch, GuardDuty, Slither, đánh giá lỗ hổng tự động.',
          'Cross-Chain Infrastructure: Substrate (The Root Network), Avalanche Subnets, Kaia Network.',
          'DevSecOps: CI/CD (GitLab CI/Jenkins), SAST/DAST cho Go, NestJS, Lambda, containers.',
        ],
      },
      {
        title: 'Blockchain & Cloud Security Engineer',
        company: 'CMC Global',
        period: 'Tháng 6/2023 - Tháng 6/2025',
        description: [
          'ZKP & Cloud Privacy: Zero-Knowledge Proof, AWS Enclaves, tuân thủ quy định.',
          'Cloud-Native Security: GuardDuty, WAF cho dApps TON, bảo mật private key và relayer.',
          'Secure SDLC & IaC: Terraform, môi trường cloud cứng hóa, Unit/Integration/Security audits (TONCLI).',
          'Smart Contract Security: Slither, Echidna, Foundry; dApps EVM, Solidity, Web3.py, EthersJS.',
          'Technical Mentorship: Cloud Security (IAM, Secrets) và ZKP.',
        ],
      },
      {
        title: 'Software Engineer (Smart Contract Security Focus)',
        company: 'Napa Global',
        period: 'Tháng 10/2021 - Tháng 12/2022',
        description: [
          'Security Auditing & Formal Verification: Slither, Echidna, Foundry cho re-entrancy và overflows.',
          'Secure Contract Architecture: Thiết kế và audit dApp trên các chain tương thích Ethereum.',
          'EVM Ecosystem Security: Smart contract Solidity production, 100% test coverage cho logic quan trọng.',
          'Blockchain Integration: Giao diện backend–on-chain bảo mật, Web3.py, EthersJS.',
        ],
      },
    ],
  },
  
  // Projects Section
  projects: {
    title: 'Dự án',
    code: 'Code',
    demo: 'Demo',
    items: [
      {
        title: 'DeFi & Tổ chức tập trung Privacy',
        description: 'Môi trường cloud bảo mật cho tính toán ZKP (ẩn danh giao dịch, bảo mật dữ liệu). AWS Nitro Enclaves, zk-SNARKs/STARKs, EKS, KMS, Golang, Solidity, Circom. Hướng GDPR.',
        technologies: ['AWS Nitro Enclaves', 'ZK-SNARKs', 'EKS', 'Docker', 'KMS', 'Golang', 'Solidity', 'Circom'],
      },
      {
        title: 'NFT Marketplace & Web3 Gaming Studio',
        description: 'Security scanning trong GitLab CI/CD: phát hiện secrets, SCA cho CVEs, Checkov/Terrascan IaC. Giảm 85% lỗ hổng production. Audit bảo mật thư viện Web3 và smart contract.',
        technologies: ['GitLab CI', 'Checkov', 'Trivy', 'Slither', 'Foundry', 'Secrets Detection', 'AWS Inspector'],
      },
      {
        title: 'Multi-Account Centralized Security Logging & Analytics (SIEM)',
        description: 'Security Data Lake tổng hợp CloudTrail, VPC Flow Logs, DNS từ 50+ accounts. S3 Object Lock, Athena, QuickSight. Hướng SOC 2 và PCI-DSS.',
        technologies: ['S3 Object Lock', 'Athena', 'QuickSight', 'Kinesis Firehose', 'CloudTrail', 'VPC Flow Logs'],
      },
      {
        title: 'Cryptocurrency Exchange & Validator Security Automation',
        description: 'Tự động phản hồi sự cố: GuardDuty + EventBridge, Lambda thu hồi IAM và cô lập EC2/validators. EBS Snapshots, SNS/Slack, DDoS và chặn port cho validator nodes.',
        technologies: ['GuardDuty', 'Lambda', 'EventBridge', 'EBS Snapshot', 'SNS', 'Security Groups', 'Python (Boto3)'],
      },
      {
        title: 'Enterprise-wide Cloud Security Guardrails & Governance',
        description: 'Quản trị multi-account (100+ accounts): SCPs, vô hiệu region không phê duyệt, CloudTrail/GuardDuty, IMDSv2. Terraform và AWS Config cho compliance.',
        technologies: ['AWS Organizations', 'SCPs', 'Terraform', 'AWS Config', 'Control Tower', 'IAM', 'IMDSv2'],
      },
    ],
  },
  
  // Blog Section
  blog: {
    title: 'Blog',
    subtitle: 'Khám phá những bài viết về DevOps, Cloud, và các công nghệ mới nhất',
    searchPlaceholder: 'Tìm theo tiêu đề, mô tả...',
    filterByTool: 'Lọc theo công cụ',
    filterBySkill: 'Lọc theo kỹ năng',
    allTools: 'Tất cả công cụ',
    allSkills: 'Tất cả kỹ năng',
    refresh: 'Làm mới',
    loading: 'Đang tải bài viết...',
    noPosts: 'Chưa có bài viết nào. Bài viết sẽ được tự động cập nhật từ n8n workflow.',
    noPostsHint: 'Đảm bảo n8n webhook URL đã được cấu hình trong file .env',
    noResults: 'Không có bài viết nào khớp với bộ lọc.',
    noResultsHint: 'Thử đổi từ khóa tìm kiếm hoặc bỏ bộ lọc.',
    readMore: 'Đọc thêm',
    backToBlog: 'Quay lại Blog',
    readOriginal: 'Đọc bài viết gốc',
    minutes: 'phút',
    minutesRead: 'phút đọc',
    error: 'Không thể tải bài viết. Vui lòng thử lại sau.',
    notFound: 'Không tìm thấy bài viết',
    tableOfContents: 'Phụ lục',
    copy: 'Sao chép',
    copied: 'Đã copy!',
  },
  
  // Contact Section
  contact: {
    title: 'Liên hệ',
    infoTitle: 'Thông tin liên hệ',
    infoDescription: 'Bạn có câu hỏi hoặc muốn hợp tác? Hãy liên hệ với tôi qua các phương thức dưới đây hoặc điền form bên cạnh.',
    form: {
      name: 'Tên của bạn',
      email: 'Email',
      subject: 'Chủ đề',
      message: 'Tin nhắn',
      submit: 'Gửi tin nhắn',
      submitting: 'Đang gửi...',
      success: 'Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.',
      error: 'Có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua email.',
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

