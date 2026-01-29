/**
 * Mock blog posts - Terraform, Ansible, Jenkins
 * Hiển thị khi chưa cấu hình N8N_WEBHOOK_URL
 */
export const mockBlogPosts = [
  {
    id: 'terraform-basics',
    title: 'Terraform cơ bản: Hướng dẫn cài đặt và viết cấu hình đầu tiên',
    excerpt: 'Tìm hiểu cách cài đặt Terraform và tạo file cấu hình HCL đầu tiên để quản lý hạ tầng dưới dạng mã (IaC).',
    publishedAt: '2025-01-15T08:00:00.000Z',
    readTime: 8,
    tags: ['Terraform', 'IaC', 'DevOps', 'Cloud'],
    tools: ['Terraform'],
    skills: ['IaC', 'DevOps', 'Cloud'],
    image: '/blog/terraform-basics.svg',
    url: '',
    content: `
      <h2>Giới thiệu Terraform</h2>
      <p>Terraform là công cụ Infrastructure as Code (IaC) của HashiCorp, cho phép bạn định nghĩa và quản lý hạ tầng cloud bằng file cấu hình (HCL - HashiCorp Configuration Language).</p>
      
      <h2>Cài đặt Terraform</h2>
      <p><strong>Trên macOS (Homebrew):</strong></p>
      <pre><code>brew tap hashicorp/tap
brew install hashicorp/tap/terraform</code></pre>
      <p><strong>Kiểm tra cài đặt:</strong></p>
      <pre><code>terraform version</code></pre>
      
      <h2>File cấu hình đầu tiên</h2>
      <p>Tạo file <code>main.tf</code> với nội dung:</p>
      <pre><code>terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-1"
}

resource "aws_s3_bucket" "example" {
  bucket = "my-unique-bucket-name-12345"
}

output "bucket_name" {
  value = aws_s3_bucket.example.id
}</code></pre>
      
      <h2>Khởi tạo và áp dụng</h2>
      <p><code>terraform init</code> — tải provider và khởi tạo backend.</p>
      <p><code>terraform plan</code> — xem thay đổi sẽ được áp dụng.</p>
      <p><code>terraform apply</code> — áp dụng cấu hình (nhập <code>yes</code> khi được hỏi).</p>
      
      <p>Bạn đã có bước đầu với Terraform. Bài tiếp theo sẽ đi sâu vào modules và state.</p>
    `,
  },
  {
    id: 'terraform-modules-state',
    title: 'Terraform: Modules và quản lý State',
    excerpt: 'Cách tổ chức code bằng modules và quản lý Terraform state an toàn (local, remote, locking).',
    publishedAt: '2025-01-20T09:00:00.000Z',
    readTime: 10,
    tags: ['Terraform', 'Modules', 'State', 'Best Practices'],
    tools: ['Terraform'],
    skills: ['Modules', 'State', 'Best Practices'],
    image: '/blog/terraform-modules.svg',
    url: '',
    content: `
      <h2>Modules trong Terraform</h2>
      <p>Module là tập hợp các file <code>.tf</code> trong một thư mục, dùng để tái sử dụng và chia nhỏ cấu hình.</p>
      <pre><code>module "vpc" {
  source = "./modules/vpc"
  env    = "prod"
  cidr   = "10.0.0.0/16"
}

output "vpc_id" {
  value = module.vpc.vpc_id
}</code></pre>
      
      <h2>Terraform State</h2>
      <p>State lưu ánh xạ giữa cấu hình và tài nguyên thực tế. Mặc định lưu trong file <code>terraform.tfstate</code> (local).</p>
      <p><strong>Remote state (S3 + DynamoDB):</strong></p>
      <pre><code>terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "ap-southeast-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}</code></pre>
      <p>DynamoDB dùng để khóa state (state locking), tránh ghi đồng thời khi chạy <code>apply</code> từ nhiều nơi.</p>
      
      <h2>Best practices</h2>
      <ul>
        <li>Không commit <code>terraform.tfstate</code> lên Git khi dùng local state.</li>
        <li>Dùng remote backend (S3, GCS, Azure) cho môi trường team.</li>
        <li>Bật encryption và versioning cho bucket chứa state.</li>
      </ul>
    `,
  },
  {
    id: 'terraform-aws-practice',
    title: 'Terraform thực hành: Dựng VPC và EC2 trên AWS',
    excerpt: 'Hướng dẫn từng bước tạo VPC, subnet, security group và EC2 instance bằng Terraform trên AWS.',
    publishedAt: '2025-01-25T10:00:00.000Z',
    readTime: 12,
    tags: ['Terraform', 'AWS', 'VPC', 'EC2'],
    tools: ['Terraform'],
    skills: ['AWS', 'VPC', 'EC2'],
    image: '/blog/terraform-aws.svg',
    url: '',
    content: `
      <h2>Mục tiêu</h2>
      <p>Tạo một VPC với public subnet, security group cho phép SSH/HTTP, và một EC2 instance chạy Amazon Linux.</p>
      
      <h2>VPC và Subnet</h2>
      <pre><code>resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = { Name = "terraform-vpc" }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-southeast-1a"
  map_public_ip_on_launch = true
  tags = { Name = "public-subnet" }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}</code></pre>
      
      <h2>Security Group và EC2</h2>
      <pre><code>resource "aws_security_group" "web" {
  name        = "terraform-web-sg"
  description = "Allow SSH and HTTP"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

resource "aws_instance" "web" {
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.web.id]
  key_name               = "your-key-name"
  tags = { Name = "terraform-web" }
}</code></pre>
      <p>Thay <code>your-key-name</code> bằng tên key pair SSH của bạn trong AWS. Chạy <code>terraform init</code>, <code>terraform plan</code>, rồi <code>terraform apply</code> để tạo tài nguyên.</p>
    `,
  },
  {
    id: 'ansible-getting-started',
    title: 'Ansible: Hướng dẫn bắt đầu và viết Playbook đầu tiên',
    excerpt: 'Cài đặt Ansible, cấu hình inventory và viết playbook đơn giản để tự động hóa cấu hình server.',
    publishedAt: '2025-01-22T08:30:00.000Z',
    readTime: 9,
    tags: ['Ansible', 'Automation', 'DevOps', 'Configuration Management'],
    tools: ['Ansible'],
    skills: ['Automation', 'DevOps', 'Configuration Management'],
    image: '/blog/ansible-playbook.svg',
    url: '',
    content: `
      <h2>Ansible là gì?</h2>
      <p>Ansible là công cụ automation dùng để cấu hình máy chủ, triển khai ứng dụng và quản lý hạ tầng. Hoạt động qua SSH, không cần cài agent trên target.</p>
      
      <h2>Cài đặt</h2>
      <p><strong>macOS:</strong> <code>brew install ansible</code></p>
      <p><strong>Ubuntu/Debian:</strong> <code>sudo apt update && sudo apt install ansible -y</code></p>
      <p>Kiểm tra: <code>ansible --version</code></p>
      
      <h2>Inventory</h2>
      <p>Tạo file <code>inventory.ini</code> liệt kê server cần quản lý:</p>
      <pre><code>[web]
192.168.1.10
192.168.1.11

[web:vars]
ansible_user=ubuntu
ansible_ssh_private_key_file=~/.ssh/id_rsa</code></pre>
      
      <h2>Playbook đầu tiên</h2>
      <p>Tạo <code>playbook.yml</code>:</p>
      <pre><code>---
- name: Setup web servers
  hosts: web
  become: true
  tasks:
    - name: Update apt cache
      apt:
        update_cache: yes
        cache_valid_time: 3600

    - name: Install Nginx
      apt:
        name: nginx
        state: present

    - name: Start and enable Nginx
      service:
        name: nginx
        state: started
        enabled: yes</code></pre>
      
      <h2>Chạy Playbook</h2>
      <p>Kiểm tra kết nối: <code>ansible web -i inventory.ini -m ping</code></p>
      <p>Chạy playbook: <code>ansible-playbook -i inventory.ini playbook.yml</code></p>
      <p>Sau khi chạy xong, truy cập <code>http://&lt;IP-server&gt;</code> để thấy trang mặc định của Nginx.</p>
    `,
  },
  {
    id: 'jenkins-cicd-basics',
    title: 'Jenkins: Thiết lập pipeline CI/CD cơ bản',
    excerpt: 'Cài đặt Jenkins, tạo job pipeline và chạy build/test/deploy tự động với Jenkinsfile.',
    publishedAt: '2025-01-28T09:00:00.000Z',
    readTime: 11,
    tags: ['Jenkins', 'CI/CD', 'Pipeline', 'DevOps'],
    tools: ['Jenkins'],
    skills: ['CI/CD', 'Pipeline', 'DevOps'],
    image: '/blog/jenkins-pipeline.svg',
    url: '',
    content: `
      <h2>Jenkins là gì?</h2>
      <p>Jenkins là server automation mã nguồn mở dùng để xây dựng pipeline CI/CD: build, test, deploy ứng dụng một cách tự động và có thể lặp lại.</p>
      
      <h2>Cài đặt Jenkins (Docker)</h2>
      <pre><code>docker run -d -p 8080:8080 -p 50000:50000 \\
  --name jenkins -v jenkins_home:/var/jenkins_home \\
  jenkins/jenkins:lts</code></pre>
      <p>Mở trình duyệt: <code>http://localhost:8080</code>. Lấy mật khẩu ban đầu: <code>docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword</code>.</p>
      
      <h2>Tạo Pipeline Job</h2>
      <ol>
        <li>New Item → nhập tên → chọn <strong>Pipeline</strong> → OK.</li>
        <li>Trong <strong>Pipeline</strong>, chọn <strong>Pipeline script from SCM</strong> (Git) và khai báo repo, hoặc <strong>Pipeline script</strong> để viết script ngay.</li>
      </ol>
      
      <h2>Jenkinsfile mẫu</h2>
      <pre><code>pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build') {
      steps {
        sh 'npm ci'
        sh 'npm run build'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Deploy') {
      when { branch 'main' }
      steps {
        echo 'Deploy to production'
        // sh './deploy.sh'
      }
    }
  }
  post {
    always {
      cleanWs()
    }
    failure {
      echo 'Pipeline failed!'
    }
  }
}</code></pre>
      
      <h2>Một số plugin hữu ích</h2>
      <ul>
        <li><strong>Pipeline</strong> — định nghĩa pipeline bằng code.</li>
        <li><strong>Docker Pipeline</strong> — build và chạy Docker trong pipeline.</li>
        <li><strong>Credentials</strong> — lưu secret an toàn.</li>
      </ul>
      <p>Qua bài này bạn đã biết cách chạy Jenkins và tạo pipeline cơ bản. Có thể mở rộng với Docker, Kubernetes hoặc tích hợp Slack/email thông báo.</p>
    `,
  },
]
