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
    title: 'DevOps Engineer | Cloud Architect | Automation Specialist',
    description: 'Chuyên về CI/CD, Cloud Infrastructure, Containerization và Infrastructure as Code. Đam mê tự động hóa và tối ưu hóa quy trình phát triển phần mềm.',
    contactMe: 'Liên hệ với tôi',
    downloadCV: 'Tải CV',
  },
  
  // About Section
  about: {
    title: 'Giới thiệu',
    heading: 'Về tôi',
    paragraph1: 'Tôi là một DevOps Engineer với nhiều năm kinh nghiệm trong việc xây dựng và quản lý hạ tầng cloud, tự động hóa quy trình phát triển phần mềm, và tối ưu hóa hiệu suất hệ thống.',
    paragraph2: 'Với kiến thức sâu về các công nghệ cloud, containerization, và CI/CD, tôi đã giúp nhiều tổ chức chuyển đổi sang mô hình DevOps hiện đại, giảm thời gian triển khai và tăng tính ổn định của hệ thống.',
    paragraph3: 'Tôi luôn tìm kiếm những công nghệ mới và best practices để cải thiện quy trình làm việc và đóng góp vào cộng đồng DevOps.',
    highlights: {
      iac: {
        title: 'Infrastructure as Code',
        description: 'Chuyên về Terraform, Ansible và các công cụ IaC khác',
      },
      cloud: {
        title: 'Cloud Platforms',
        description: 'Kinh nghiệm với AWS, Azure, GCP và các dịch vụ cloud',
      },
      container: {
        title: 'Containerization',
        description: 'Docker, Kubernetes, và container orchestration',
      },
      cicd: {
        title: 'CI/CD Pipelines',
        description: 'Jenkins, GitLab CI, GitHub Actions, và automation',
      },
    },
  },
  
  // Skills Section
  skills: {
    title: 'Kỹ năng',
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
    title: 'Kinh nghiệm làm việc',
    items: [
      {
        title: 'Senior DevOps Engineer',
        company: 'Company Name',
        period: '2022 - Hiện tại',
        description: [
          'Thiết kế và triển khai CI/CD pipelines cho microservices architecture',
          'Quản lý Kubernetes clusters trên AWS và Azure',
          'Tự động hóa infrastructure với Terraform và Ansible',
          'Thiết lập monitoring và alerting với Prometheus và Grafana',
          'Tối ưu hóa chi phí cloud và hiệu suất hệ thống',
        ],
      },
      {
        title: 'DevOps Engineer',
        company: 'Previous Company',
        period: '2020 - 2022',
        description: [
          'Xây dựng và duy trì Docker containers và Kubernetes deployments',
          'Thiết lập GitLab CI/CD pipelines',
          'Quản lý AWS infrastructure (EC2, S3, RDS, VPC)',
          'Tự động hóa deployment processes',
          'Hỗ trợ development teams với DevOps best practices',
        ],
      },
      {
        title: 'System Administrator',
        company: 'Previous Company',
        period: '2018 - 2020',
        description: [
          'Quản lý Linux servers và network infrastructure',
          'Thiết lập và cấu hình monitoring systems',
          'Tự động hóa tasks với shell scripts và Python',
          'Hỗ trợ troubleshooting và system maintenance',
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
        title: 'Kubernetes Multi-Cluster Management',
        description: 'Hệ thống quản lý và tự động hóa nhiều Kubernetes clusters với Terraform và ArgoCD',
        technologies: ['Kubernetes', 'Terraform', 'ArgoCD', 'AWS'],
      },
      {
        title: 'CI/CD Pipeline Automation',
        description: 'Pipeline tự động hóa hoàn chỉnh với Jenkins, Docker, và Kubernetes cho microservices',
        technologies: ['Jenkins', 'Docker', 'Kubernetes', 'GitLab CI'],
      },
      {
        title: 'Infrastructure Monitoring Dashboard',
        description: 'Dashboard giám sát infrastructure với Prometheus, Grafana và custom metrics',
        technologies: ['Prometheus', 'Grafana', 'Python', 'Docker'],
      },
      {
        title: 'Cloud Cost Optimization Tool',
        description: 'Công cụ phân tích và tối ưu hóa chi phí cloud với AWS Cost Explorer API',
        technologies: ['Python', 'AWS', 'Terraform', 'React'],
      },
      {
        title: 'GitOps Workflow with ArgoCD',
        description: 'Triển khai GitOps workflow với ArgoCD cho continuous deployment',
        technologies: ['ArgoCD', 'Kubernetes', 'Git', 'Helm'],
      },
      {
        title: 'Container Security Scanner',
        description: 'Tool quét bảo mật container images và tự động patch vulnerabilities',
        technologies: ['Docker', 'Python', 'Trivy', 'Kubernetes'],
      },
    ],
  },
  
  // Blog Section
  blog: {
    title: 'Blog',
    subtitle: 'Khám phá những bài viết về DevOps, Cloud, và các công nghệ mới nhất',
    refresh: 'Làm mới',
    loading: 'Đang tải bài viết...',
    noPosts: 'Chưa có bài viết nào. Bài viết sẽ được tự động cập nhật từ n8n workflow.',
    noPostsHint: 'Đảm bảo n8n webhook URL đã được cấu hình trong file .env',
    readMore: 'Đọc thêm',
    backToBlog: 'Quay lại Blog',
    readOriginal: 'Đọc bài viết gốc',
    minutes: 'phút',
    minutesRead: 'phút đọc',
    error: 'Không thể tải bài viết. Vui lòng thử lại sau.',
    notFound: 'Không tìm thấy bài viết',
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
    tagline: 'DevOps Engineer | Cloud Architect | Automation Specialist',
  },
}

