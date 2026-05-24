export const vi = {
  // Navigation
  nav: {
    home: 'Trang chủ',
    about: 'Giới thiệu',
    skills: 'Kỹ năng',
    experience: 'Kinh nghiệm',
    certifications: 'Chứng chỉ',
    projects: 'Dự án',
    blog: 'Blog',
    contact: 'Liên hệ',
  },
  
  // Hero Section
  hero: {
    greeting: 'Xin chào, Tôi là',
    name: 'Stephen Sang',
    title: 'Senior Fullstack Blockchain Engineer | Ứng viên Cloud Security | Định hướng Solution Architect',
    description: 'Hơn 5 năm phát triển ứng dụng Web3 fullstack (ReactJS, NestJS, Solidity) và hệ thống cloud bảo mật trên AWS. AWS Certified Solutions Architect & Security Specialty, định hướng Cloud Security và Solution Architect.',
    contactMe: 'Liên hệ với tôi',
    downloadCV: 'Tải CV',
  },
  
  // About Section
  about: {
    title: 'Giới thiệu',
    heading: 'Về tôi',
    paragraph1: 'Tôi là Senior Fullstack Blockchain Engineer với hơn 5 năm kinh nghiệm phát triển ứng dụng Web3 và hệ thống cloud bảo mật. Chuyên fullstack ReactJS/NestJS, smart contract và thực hành cloud security trên AWS.',
    paragraph2: 'Công việc của tôi bao gồm DeFi, NFT marketplace, gaming platform và enterprise SaaS — từ React Module Federation, NestJS microservices đến AWS KMS, IAM và audit smart contract với Slither, Foundry. Tôi thiết kế hệ thống theo nguyên tắc security-by-design và khả năng mở rộng.',
    paragraph3: 'Tôi có chứng chỉ AWS Certified Solutions Architect – Associate và AWS Certified Security - Specialty (2026–2029). Đang hướng tới vai trò Cloud Security và Solution Architect trên AWS qua kiến trúc thực chiến, IaC và mentoring kỹ thuật.',
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
      development: 'Fullstack Development',
      securityResearch: 'Security Research',
    },
  },
  
  // Experience Section
  experience: {
    title: 'Kinh nghiệm làm việc',
    items: [
      {
        title: 'Senior Fullstack Engineer / Tech Lead',
        company: 'FPT Software',
        period: 'Tháng 3/2026 - Hiện tại',
        description: [
          'Thiết kế và duy trì frontend ReactJS/Next.js với atomic design, state persistence và các pattern bảo mật phía client.',
          'Định nghĩa chuẩn kiến trúc NestJS (DI, Pipes, Filters) cho ứng dụng server-side dễ bảo trì, testable và security-aware.',
          'Lead troubleshooting fullstack — từ bottleneck re-render React đến memory leak NestJS và tối ưu database query.',
          'Đánh giá và migrate thư viện (Express → NestJS, CSS legacy → Tailwind) để cải thiện DX, performance và security posture.',
          'Tech Lead: định nghĩa coding convention, best practices và mentor teammate về fullstack cùng chuẩn bảo mật.',
          'Theo dõi báo cáo hàng ngày, điều tra sự cố và gửi tóm tắt cho khách hàng kèm phân tích root-cause.',
        ],
      },
      {
        title: 'Fullstack Blockchain Engineer / Tech Lead',
        company: 'Skybull Gaming Studio',
        period: 'Tháng 6/2025 - Tháng 12/2025',
        description: [
          'Bảo mật validator keys bằng AWS KMS và VPC Endpoints để cô lập mạng, áp dụng AWS Security best practices.',
          'Cloud Infrastructure: AWS Lambda, EC2, ALB, SQS, S3 với Docker; cluster EKS, Helm và IaC security baselines.',
          'Kiến trúc dashboard ReactJS với Module Federation, đảm bảo cô lập dữ liệu multi-tenant cho các banking client.',
          'Thiết kế kiến trúc frontend, state management và backend NestJS/Go cho nền tảng gaming cross-chain.',
          'Theo dõi và debug giao dịch on-chain với Fift, Toncli, Hardhat, Tenderly trên Substrate, Avalanche và Kaia.',
          'Tech Lead dự án Animal Go: thiết kế smart contract (Substrate/ink!), marketplace UI, automated testing và sync kỹ thuật với client.',
          'DevSecOps: CI/CD (GitLab CI/Jenkins), SAST/DAST cho Go, NestJS, Lambda và container workloads.',
        ],
      },
      {
        title: 'Fullstack Blockchain Engineer',
        company: 'CMC Global',
        period: 'Tháng 2/2023 - Tháng 5/2025',
        description: [
          'Smart Contract Security: Audit Slither, Echidna, Foundry; đánh giá lỗ hổng trên dApps EVM và contract Solidity.',
          'ZKP & Cloud Privacy: Zero-Knowledge Proof, AWS Enclaves và tuân thủ quy định cho DeFi tập trung privacy.',
          'Tối ưu performance ReactJS qua code-splitting và memoization, giảm FCP cho người dùng quốc tế.',
          'Tích hợp Web3 (Ethers.js, Web3.js, Web3.py) với frontend ReactJS; theo dõi giao dịch bằng Tenderly.',
          'Thiết kế kiến trúc smart contract, mentor engineer mới và giải quyết các blocker kỹ thuật quan trọng.',
        ],
      },
      {
        title: 'Fullstack Blockchain / Web Developer',
        company: 'Napa Global',
        period: 'Tháng 6/2019 - Tháng 12/2022',
        description: [
          'Phát triển web application ReactJS responsive (Ant Design, Material UI, SCSS) theo yêu cầu khách hàng.',
          'Thiết kế và triển khai smart contract Solidity với Hardhat/Truffle; tích hợp qua Ethers.js và Web3.py.',
          'Security Auditing: Slither và Foundry phát hiện re-entrancy, overflow và logic flaw trước khi production.',
          'Deploy và bảo trì ứng dụng trên AWS; sửa bug và đảm bảo giao diện backend–on-chain bảo mật.',
        ],
      },
    ],
  },

  // Certifications Section
  certifications: {
    title: 'Chứng chỉ',
    solutionsArchitectAssociate: 'AWS Certified Solutions Architect',
    securitySpecialty: 'AWS Certified Security',
    issuer: 'Amazon Web Services (AWS)',
    validityLabel: 'Thời hạn',
    validity: '2026 – 2029',
    viewOnCredly: 'Xem trên Credly',
  },
  
  // Projects Section
  projects: {
    title: 'Dự án',
    readCaseStudy: 'Đọc case study',
    prevSlide: 'Dự án trước',
    nextSlide: 'Dự án tiếp theo',
    items: [
      {
        title: 'Game AI Marketplace',
        blogId: 'game-ai-marketplace',
        description: 'Marketplace gaming phi tập trung tích hợp AI, Unity WebGL streaming, thanh toán multi-chain và kiểm duyệt nội dung AI. Áp dụng IAM fine-grained policies và AWS WAF bảo vệ IP và chặn các web exploit phổ biến.',
        technologies: ['ReactJS', 'NestJS', 'TypeScript', 'AWS Lambda', 'S3', 'CloudFront', 'IAM', 'WAF', 'Rekognition', 'Solidity'],
      },
      {
        title: 'Bank Fraud Detection & Check Verification',
        blogId: 'bank-fraud-detection',
        description: 'SaaS multi-tenant bảo mật cao cho đối tác ngân hàng quốc tế. Cảnh báo gian lận real-time, quy trình xác minh séc và cô lập dữ liệu nghiêm ngặt với frontend security (XSS prevention, JWT handling).',
        technologies: ['ReactJS', 'Redux Toolkit', 'Material-UI', 'Zustand', 'TailwindCSS', 'Azure', 'Kafka', 'SQL Server'],
      },
      {
        title: 'DeFi & Tổ chức tập trung Privacy',
        blogId: 'defi-privacy-institution',
        description: 'Môi trường cloud bảo mật cho tính toán ZKP (ẩn danh giao dịch, bảo mật dữ liệu). AWS Nitro Enclaves, zk-SNARKs/STARKs, EKS, KMS, Golang, Solidity, Circom. Hướng GDPR.',
        technologies: ['AWS Nitro Enclaves', 'ZK-SNARKs', 'EKS', 'Docker', 'KMS', 'Golang', 'Solidity', 'Circom'],
      },
      {
        title: 'NFT Marketplace & Web3 Gaming Studio',
        blogId: 'nft-marketplace-web3-security',
        description: 'Security scanning trong GitLab CI/CD: phát hiện secrets, SCA cho CVEs, Checkov/Terrascan IaC. Giảm 85% lỗ hổng production. Audit bảo mật thư viện Web3 và smart contract.',
        technologies: ['GitLab CI', 'Checkov', 'Trivy', 'Slither', 'Foundry', 'Secrets Detection', 'AWS Inspector'],
      },
      {
        title: 'Multi-Account Centralized Security Logging & Analytics (SIEM)',
        blogId: 'siem-security-datalake',
        description: 'Security Data Lake tổng hợp CloudTrail, VPC Flow Logs, DNS từ 50+ accounts. S3 Object Lock, Athena, QuickSight. Hướng SOC 2 và PCI-DSS.',
        technologies: ['S3 Object Lock', 'Athena', 'QuickSight', 'Kinesis Firehose', 'CloudTrail', 'VPC Flow Logs'],
      },
      {
        title: 'Cryptocurrency Exchange & Validator Security Automation',
        blogId: 'crypto-exchange-validator-security',
        description: 'Tự động phản hồi sự cố: GuardDuty + EventBridge, Lambda thu hồi IAM và cô lập EC2/validators. EBS Snapshots, SNS/Slack, DDoS và chặn port cho validator nodes.',
        technologies: ['GuardDuty', 'Lambda', 'EventBridge', 'EBS Snapshot', 'SNS', 'Security Groups', 'Python (Boto3)'],
      },
      {
        title: 'Enterprise-wide Cloud Security Guardrails & Governance',
        blogId: 'enterprise-cloud-guardrails',
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
    filterByType: 'Loại',
    allTypes: 'Tất cả',
    cheatsheet: 'Cheatsheet',
    project: 'Project',
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
    relatedPosts: 'Bài viết liên quan',
    readOriginal: 'Đọc bài viết gốc',
    minutes: 'phút',
    minutesRead: 'phút đọc',
    error: 'Không thể tải bài viết. Vui lòng thử lại sau.',
    notFound: 'Không tìm thấy bài viết',
    tableOfContents: 'Phụ lục',
    copy: 'Sao chép',
    copied: 'Đã copy!',
    prevPage: 'Trang trước',
    nextPage: 'Trang sau',
    pageOf: 'Trang',
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
    tagline: 'Senior Fullstack Blockchain Engineer | Ứng viên Cloud Security | Định hướng Solution Architect',
  },
}

