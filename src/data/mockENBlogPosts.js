/**
 * Mock blog posts - English version
 * Translated from mockBlogPosts, code blocks kept as-is. Image paths match EN topic (same asset).
 */
export const mockENBlogPost = [
  {
    id: "terraform-cheatsheet",
    title: "Terraform Cheatsheet: Important Commands and Concepts",
    excerpt:
      "Cheatsheet of Terraform commands and concepts by workflow: Core Workflow, State, HCL, Debug, Backend and Built-in Functions.",
    publishedAt: "2025-01-15T08:00:00.000Z",
    readTime: 12,
    tags: ["Terraform", "IaC", "DevOps", "Cheatsheet"],
    tools: ["Terraform"],
    skills: ["IaC", "DevOps", "Cloud"],
    image: "/blog/terraform-cheatsheet.svg",
    url: "",
    content: `
      <p>Hi, below is a cheatsheet of the most important Terraform commands and concepts, grouped by real-world workflow, with concrete examples for quick reference.</p>

      <h3 id="core-workflow">1. Core Workflow</h3>
      <p>These are the 4 commands you will use daily to deploy infrastructure.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Description</th>
              <th>Example &amp; Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>terraform init</code></strong></td>
              <td>Initialize working directory, download providers (plugins) and configure backend.</td>
              <td>Run first when cloning repo or when adding a new provider.</td>
            </tr>
            <tr>
              <td><strong><code>terraform plan</code></strong></td>
              <td>Generate an execution plan. Compare current code with actual state to see what <em>will</em> change.</td>
              <td><code>terraform plan -out=tfplan</code> — Save plan to file for consistent apply.</td>
            </tr>
            <tr>
              <td><strong><code>terraform apply</code></strong></td>
              <td>Apply changes to real infrastructure (cloud).</td>
              <td><code>terraform apply "tfplan"</code> — Run saved plan.<br><code>terraform apply -auto-approve</code> — Skip confirmation (use in CI/CD).</td>
            </tr>
            <tr>
              <td><strong><code>terraform destroy</code></strong></td>
              <td>Destroy all infrastructure managed by Terraform in that directory.</td>
              <td><code>terraform destroy -target=aws_instance.web</code> — Destroy specific resource only; use with care.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="state-management">2. State Management</h3>
      <p>Terraform State (<code>terraform.tfstate</code>) is the "brain" storing the mapping between your code and real infrastructure.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Description</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>terraform state list</code></strong></td>
              <td>List all resources currently managed in the state file.</td>
              <td>Helps find resource names for import or remove.</td>
            </tr>
            <tr>
              <td><strong><code>terraform state show</code></strong></td>
              <td>Show attributes of a specific resource in state.</td>
              <td><code>terraform state show aws_s3_bucket.my_bucket</code></td>
            </tr>
            <tr>
              <td><strong><code>terraform state mv</code></strong></td>
              <td>Rename resource in state without destroying/recreating on cloud.</td>
              <td><code>terraform state mv aws_instance.old aws_instance.new</code> — Use when refactoring.</td>
            </tr>
            <tr>
              <td><strong><code>terraform state rm</code></strong></td>
              <td>Stop managing resource (remove from state) but do <strong>not</strong> destroy it on cloud.</td>
              <td><code>terraform state rm aws_instance.legacy</code></td>
            </tr>
            <tr>
              <td><strong><code>terraform refresh</code></strong></td>
              <td>Update state to match cloud (now integrated into <code>plan</code> and <code>apply</code> in newer versions).</td>
              <td>Use when someone changed resources in Console and you want to sync.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <blockquote class="blog-blockquote">
        <strong>Important:</strong> Never edit <code>terraform.tfstate</code> by hand. Use the commands above.
      </blockquote>

      <h3 id="hcl-meta-arguments">3. HCL Syntax &amp; Meta-Arguments (Code Logic)</h3>
      <p>Keywords that control how resources are created.</p>

      <h4 id="meta-arguments">A. Meta-Arguments (Flow control)</h4>
      <ul>
        <li><strong><code>count</code></strong>: Create multiple copies of a resource by count.</li>
      </ul>
      <pre><code>resource "aws_instance" "web" {
  count = 3  # Tạo 3 server: web[0], web[1], web[2]
  ami   = "ami-12345678"
  tags = {
    Name = "Server-\${count.index}"
  }
}</code></pre>
      <ul>
        <li><strong><code>for_each</code></strong>: Create multiple resources from a Map or Set (more flexible than <code>count</code>).</li>
      </ul>
      <pre><code>variable "users" {
  type    = set(string)
  default = ["alice", "bob"]
}

resource "aws_iam_user" "devs" {
  for_each = var.users
  name     = each.key
}</code></pre>
      <ul>
        <li><strong><code>lifecycle</code></strong>: Control special lifecycle behavior.</li>
      </ul>
      <pre><code>resource "aws_instance" "db" {
  lifecycle {
    create_before_destroy = true  # Tạo mới trước khi xóa cũ (giảm downtime)
    prevent_destroy       = true  # Chặn lệnh destroy (bảo vệ data)
    ignore_changes        = [tags]  # Bỏ qua nếu tags bị thay đổi thủ công
  }
}</code></pre>

      <h4 id="variables-outputs">B. Variables &amp; Outputs</h4>
      <p><strong>Input Variable (<code>variables.tf</code>):</strong></p>
      <pre><code>variable "region" {
  type        = string
  default     = "us-east-1"
  description = "Deployment region"
}</code></pre>
      <p><strong>Output (<code>outputs.tf</code>):</strong> Return a value after apply (e.g. server IP).</p>
      <pre><code>output "server_ip" {
  value = aws_instance.web.public_ip
}</code></pre>

      <h3 id="debug-optimization">4. Debugging &amp; Optimization</h3>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Purpose</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>terraform fmt</code></strong></td>
              <td>Format code for style and consistency.</td>
              <td><code>terraform fmt -recursive</code></td>
            </tr>
            <tr>
              <td><strong><code>terraform validate</code></strong></td>
              <td>Check syntax and logic (no cloud connection needed).</td>
              <td>Run before committing.</td>
            </tr>
            <tr>
              <td><strong><code>terraform console</code></strong></td>
              <td>Interactive shell to try functions and expressions.</td>
              <td>Type <code>file("script.sh")</code> to see how a file is loaded.</td>
            </tr>
            <tr>
              <td><strong><code>terraform import</code></strong></td>
              <td>Import an existing cloud resource into Terraform management.</td>
              <td><code>terraform import aws_s3_bucket.b my-bucket-name</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="backend-remote-state">5. Backend &amp; Remote State (Team collaboration)</h3>
      <p>For team use, do not keep state only on your machine (<code>local</code>). Use a remote backend (<code>remote</code>).</p>
      <p>Example backend with <strong>AWS S3</strong> (storage) and <strong>DynamoDB</strong> (state locking):</p>
      <pre><code>terraform {
  backend "s3" {
    bucket         = "my-terraform-state-prod"
    key            = "network/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}</code></pre>

      <h3 id="built-in-functions">6. Common Built-in Functions</h3>
      <p>Terraform does not allow custom functions; you use built-ins only.</p>
      <ul>
        <li><strong><code>lookup(map, key, default)</code></strong>: Get value from map, or default if missing.</li>
      </ul>
      <pre><code>instance_type = lookup(var.instance_types, var.environment, "t2.micro")</code></pre>
      <ul>
        <li><strong><code>file(path)</code></strong>: Read file contents (e.g. UserData or Policy).</li>
      </ul>
      <pre><code>user_data = file("\${path.module}/init-script.sh")</code></pre>
      <ul>
        <li><strong><code>merge(map1, map2)</code></strong>: Merge two maps (often used for tags).</li>
      </ul>
      <pre><code>tags = merge(var.common_tags, { Name = "Web-Server" })</code></pre>
    `,
  },
  {
    id: "ansible-cheatsheet",
    title: "Ansible Cheatsheet: Core Commands and Modules",
    excerpt:
      "Ansible cheatsheet: Inventory, Ad-Hoc, Modules, Playbook, Variables, Galaxy, Roles and debug flags. Configuration Management &amp; App Deployment.",
    publishedAt: "2025-01-20T09:00:00.000Z",
    readTime: 14,
    tags: ["Ansible", "DevOps", "Configuration Management", "Cheatsheet"],
    tools: ["Ansible"],
    skills: ["DevOps", "Configuration Management", "Automation"],
    image: "/blog/ansible-cheatsheet.svg",
    url: "",
    content: `
      <p>Hi, following Terraform, here is an <strong>Ansible Cheatsheet</strong>. If Terraform focuses on "building the house" (Infrastructure Provisioning), Ansible focuses on "furnishing" and "installing equipment" (Configuration Management &amp; App Deployment).</p>
      <p>Below are the core command and module groups.</p>

      <h3 id="ansible-inventory">1. Inventory Structure (Host list)</h3>
      <p>Inventory defines the hosts Ansible will manage. Default is <code>/etc/ansible/hosts</code> or <code>-i inventory.ini</code>.</p>
      <p><strong>INI format (common):</strong></p>
      <pre><code>[webservers]
192.168.1.10
192.168.1.11 ansible_user=ubuntu # User SSH riêng cho máy này

[dbservers]
db1.example.com

[production:children] # Group lồng Group
webservers
dbservers

[all:vars] # Biến chung cho tất cả
ansible_ssh_private_key_file=~/.ssh/id_rsa</code></pre>

      <h3 id="ansible-adhoc">2. Ansible Ad-Hoc Commands</h3>
      <p>Run one-off tasks without writing a Playbook.<br>Syntax: <code>ansible &lt;group&gt; -m &lt;module&gt; -a "&lt;arguments&gt;"</code></p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Purpose</th>
              <th>Example</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Test connectivity</strong></td>
              <td><code>ansible all -m ping</code></td>
              <td>Check SSH and Python on targets.</td>
            </tr>
            <tr>
              <td><strong>Gather facts</strong></td>
              <td><code>ansible dbservers -m setup</code></td>
              <td>Collect Facts (OS, IP, CPU, RAM...).</td>
            </tr>
            <tr>
              <td><strong>Run shell command</strong></td>
              <td><code>ansible web -m shell -a "uptime"</code></td>
              <td>Run raw Linux command on remote host.</td>
            </tr>
            <tr>
              <td><strong>Copy file</strong></td>
              <td><code>ansible all -m copy -a "src=./file.txt dest=/tmp/"</code></td>
              <td>Copy file from control node to target.</td>
            </tr>
            <tr>
              <td><strong>Install package</strong></td>
              <td><code>ansible web -m apt -a "name=git state=present"</code></td>
              <td>Install git on Ubuntu/Debian (use <code>yum</code> on CentOS).</td>
            </tr>
            <tr>
              <td><strong>Restart service</strong></td>
              <td><code>ansible web -m service -a "name=nginx state=restarted"</code></td>
              <td>Restart Nginx service.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="ansible-modules">3. Common Modules (Building Blocks)</h3>
      <p>Ansible has thousands of modules; daily work mostly uses these.</p>

      <h4 id="ansible-file-copy">A. File &amp; Copy</h4>
      <ul>
        <li><strong><code>copy</code></strong>: Copy static file.</li>
        <li><strong><code>template</code></strong>: Copy file with variable substitution (Jinja2) — <em>Powerful for dynamic config</em>.</li>
        <li><strong><code>file</code></strong>: Create dir, set permissions (chmod), symlink.</li>
        <li><strong><code>lineinfile</code></strong>: Add/edit/remove a specific line (e.g. in <code>.env</code>).</li>
      </ul>

      <h4 id="ansible-package-service">B. Package &amp; Service</h4>
      <ul>
        <li><strong><code>package</code></strong>: Generic; auto-detects <code>apt</code> or <code>yum</code> by OS.</li>
        <li><strong><code>service</code></strong> / <strong><code>systemd</code></strong>: Start, stop, enable services.</li>
      </ul>

      <h4 id="ansible-command-shell">C. Command execution</h4>
      <ul>
        <li><strong><code>command</code></strong>: Run command (safe; no pipe <code>|</code> or redirect <code>&gt;</code>).</li>
        <li><strong><code>shell</code></strong>: Run via <code>/bin/sh</code> (allows pipe, env vars; higher security risk).</li>
      </ul>

      <h3 id="ansible-playbook">4. Playbook (Automation script)</h3>
      <p>Playbooks are <strong>YAML</strong> and describe desired state.</p>
      <p><strong>Example: Install and configure Nginx</strong></p>
      <pre><code>---
- name: Setup Web Server
  hosts: webservers
  become: true # Chạy với quyền root (sudo)

  tasks:
    - name: Install Nginx
      package:
        name: nginx
        state: present

    - name: Create index.html from template
      template:
        src: index.html.j2
        dest: /var/www/html/index.html
        mode: '0644'
      notify: Restart Nginx # Gọi Handler nếu file này thay đổi

    - name: Ensure Nginx is running
      service:
        name: nginx
        state: started
        enabled: true

  handlers: # Chỉ chạy khi được notify
    - name: Restart Nginx
      service:
        name: nginx
        state: restarted</code></pre>

      <h3 id="ansible-vars-loops">5. Variables &amp; Loops &amp; Conditionals</h3>
      <p>Use variables, loops and conditionals to make playbooks flexible.</p>

      <h4 id="ansible-variables">A. Variables</h4>
      <p>Syntax <code>{{ variable_name }}</code>.</p>
      <pre><code>vars:
  port: 8080
  app_name: "MyApp"</code></pre>

      <h4 id="ansible-loops">B. Loops</h4>
      <p>Use <code>loop</code> (replaces <code>with_items</code>).</p>
      <pre><code>- name: Create multiple users
  user:
    name: "{{ item }}"
    state: present
  loop:
    - developer
    - manager
    - tester</code></pre>

      <h4 id="ansible-conditionals">C. Conditionals (<code>when</code>)</h4>
      <p>Run task only if condition is true.</p>
      <pre><code>- name: Install Apache only on Debian
  apt:
    name: apache2
    state: present
  when: ansible_os_family == "Debian"</code></pre>

      <h3 id="ansible-galaxy-roles">6. Ansible Galaxy &amp; Roles</h3>
      <p>For large projects, split playbooks into <strong>Roles</strong>.</p>
      <ul>
        <li><strong><code>ansible-galaxy init &lt;role_name&gt;</code></strong>: Create standard role directory layout.</li>
        <li><strong><code>ansible-galaxy install &lt;author&gt;.&lt;role&gt;</code></strong>: Install community roles (e.g. Docker, K8s).</li>
      </ul>
      <p><strong>Standard role layout:</strong></p>
      <pre><code>roles/
  webserver/
    tasks/main.yml    # Chứa các tasks chính
    handlers/main.yml # Chứa handlers
    templates/        # Chứa file .j2
    files/            # Chứa file tĩnh
    vars/             # Chứa biến</code></pre>

      <h3 id="ansible-debugging">7. Debugging &amp; Important flags</h3>
      <p>Useful flags when running <code>ansible-playbook</code>:</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Flag</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>-i &lt;file&gt;</code></strong></td>
              <td>Use a different inventory file (e.g. <code>-i staging.ini</code>).</td>
            </tr>
            <tr>
              <td><strong><code>--syntax-check</code></strong></td>
              <td>Check YAML syntax before running.</td>
            </tr>
            <tr>
              <td><strong><code>--check</code></strong></td>
              <td>(Dry Run) Show what <em>would</em> change without applying.</td>
            </tr>
            <tr>
              <td><strong><code>--diff</code></strong></td>
              <td>Show detailed diff (e.g. config file changes).</td>
            </tr>
            <tr>
              <td><strong><code>-v</code> / <code>-vvv</code></strong></td>
              <td>Verbose; more log detail for SSH/module debugging.</td>
            </tr>
            <tr>
              <td><strong><code>--limit &lt;host&gt;</code></strong></td>
              <td>Run only on specified host or group.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="ansible-protips">Pro-tips</h3>
      <ol>
        <li><strong>Idempotency:</strong> Core principle. Running the playbook 1 or 100 times should leave the system in the same state. Most modules respect this (except <code>shell</code>/<code>command</code> — handle yourself).</li>
        <li><strong>Dynamic Inventory:</strong> With AWS/Cloud, server IPs change. Use <strong>AWS Dynamic Inventory</strong> (<code>aws_ec2.yml</code>) so Ansible discovers EC2 by tags.</li>
      </ol>
    `,
  },
  {
    id: "jenkins-cheatsheet",
    title: "Jenkins Cheatsheet: Declarative Pipeline &amp; CI/CD",
    excerpt:
      "Jenkins Pipeline (Declarative) cheatsheet: Skeleton, Steps, Artifacts, Credentials, Docker, Triggers, Variables and Admin tips. CI/CD Orchestrator.",
    publishedAt: "2025-01-25T10:00:00.000Z",
    readTime: 14,
    tags: ["Jenkins", "CI/CD", "DevOps", "Cheatsheet"],
    tools: ["Jenkins"],
    skills: ["CI/CD", "DevOps", "Automation"],
    image: "/blog/jenkins-cheatsheet.svg",
    url: "",
    content: `
      <p>Hi, to complete the DevOps stack (Terraform for infra, Ansible for config), we need <strong>Jenkins</strong> as the Orchestrator to automate the full CI/CD pipeline.</p>
      <p>Below is a <strong>Jenkins Cheatsheet</strong> focused on <strong>Declarative Pipeline</strong> — the modern standard (instead of the old GUI).</p>

      <h3 id="jenkins-skeleton">1. Pipeline Skeleton</h3>
      <p>Modern CI/CD is written in a file named <code>Jenkinsfile</code>.</p>
      <pre><code>pipeline {
    agent any  // 1. Chạy trên bất kỳ máy (node/slave) nào rảnh
    
    options {
        timeout(time: 1, unit: 'HOURS') // Giới hạn thời gian chạy
        timestamps()                    // Hiển thị thời gian trong log
    }

    environment { 
        APP_VERSION = "1.0.\${BUILD_NUMBER}" // Biến môi trường toàn cục
    }

    stages {
        stage('Build') { 
            steps {
                echo "Building version \${APP_VERSION}..."
                // Lệnh build ở đây
            }
        }
        stage('Test') { 
            steps {
                echo "Running tests..."
            }
        }
    }
    
    post { // Chạy sau khi các stages kết thúc
        always { echo "Luôn chạy dù thành công hay thất bại (Clean up)" }
        success { echo "Chỉ chạy khi thành công (Gửi noti xanh)" }
        failure { echo "Chỉ chạy khi thất bại (Gửi mail báo lỗi)" }
    }
}</code></pre>

      <h3 id="jenkins-steps">2. Common Steps</h3>
      <p>These are the "verbs" you use inside <code>steps { ... }</code>.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Step</th>
              <th>Syntax</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Shell Script</strong></td>
              <td><code>sh 'mvn clean install'</code></td>
              <td>Run Linux command. Most used. Use <code>bat</code> on Windows.</td>
            </tr>
            <tr>
              <td><strong>Git Checkout</strong></td>
              <td><code>git branch: 'main', url: 'https://github.com/user/repo.git'</code></td>
              <td>Clone repo (often done by SCM config).</td>
            </tr>
            <tr>
              <td><strong>Script</strong></td>
              <td><code>script { ... }</code></td>
              <td>Embed Groovy for complex logic in Declarative.</td>
            </tr>
            <tr>
              <td><strong>Sleep</strong></td>
              <td><code>sleep 10</code></td>
              <td>Pause pipeline for X seconds.</td>
            </tr>
            <tr>
              <td><strong>Error</strong></td>
              <td><code>error 'Stop here!'</code></td>
              <td>Fail pipeline on purpose (e.g. quality gate).</td>
            </tr>
            <tr>
              <td><strong>Stash/Unstash</strong></td>
              <td><code>stash name: 'src', includes: '**/*'</code></td>
              <td>Save files to use on another agent.</td>
            </tr>
            <tr>
              <td><strong>Dir</strong></td>
              <td><code>dir('subdir') { ... }</code></td>
              <td>Change working directory then run steps.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="jenkins-artifacts">3. Artifacts &amp; Test Results</h3>
      <p>After build and test, you need to store results.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Purpose</th>
              <th>Syntax</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Archive build</strong></td>
              <td><code>archiveArtifacts artifacts: 'target/*.jar', fingerprint: true</code></td>
              <td>Store jar/exe/zip on Jenkins for download.</td>
            </tr>
            <tr>
              <td><strong>Test report</strong></td>
              <td><code>junit 'target/surefire-reports/*.xml'</code></td>
              <td>Parse XML and show Pass/Fail charts.</td>
            </tr>
            <tr>
              <td><strong>HTML Report</strong></td>
              <td><code>publishHTML(...)</code></td>
              <td>(Plugin) Show HTML report (e.g. coverage).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="jenkins-credentials">4. Credentials (Security)</h3>
      <p><strong>Never</strong> hard-code passwords in <code>Jenkinsfile</code>. Use <code>withCredentials</code>.</p>
      <ol>
        <li>Jenkins → Manage Jenkins → Credentials → Add user/pass or Secret text.</li>
        <li>Use in pipeline:</li>
      </ol>
      <pre><code>stage('Deploy') {
    steps {
        // 'docker-hub-creds' là ID bạn đặt trong giao diện Jenkins
        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', 
                                          usernameVariable: 'DOCKER_USER', 
                                          passwordVariable: 'DOCKER_PASS')]) {
            sh "docker login -u \${DOCKER_USER} -p \${DOCKER_PASS}"
        }
    }
}</code></pre>

      <h3 id="jenkins-docker">5. Docker Integration (Important)</h3>
      <p>Use Docker containers as build environments instead of installing Java/Node/Python on Jenkins. Clean and isolated.</p>
      <pre><code>pipeline {
    agent none // Không dùng agent mặc định ở level cao nhất
    stages {
        stage('Build Frontend') {
            agent {
                docker { image 'node:16-alpine' } // Tự pull image và chạy lệnh trong container này
            }
            steps {
                sh 'npm install && npm run build'
            }
        }
        stage('Build Backend') {
            agent {
                docker { image 'maven:3.8-jdk-11' }
            }
            steps {
                sh 'mvn package'
            }
        }
    }
}</code></pre>

      <h3 id="jenkins-triggers">6. Triggers &amp; Cron</h3>
      <p>Configure when the pipeline runs automatically.</p>
      <pre><code>pipeline {
    triggers {
        // Chạy định kỳ vào 8h sáng mỗi ngày
        // H (Hash) giúp cân bằng tải, tránh tất cả job chạy đúng phút 00
        cron('H 8 * * *') 
        
        // Quét SCM (Git) mỗi 15 phút, nếu có commit mới thì chạy
        pollSCM('H/15 * * * *') 
        
        // Chạy khi job khác (Upstream) thành công
        upstream(upstreamProjects: 'job-A, job-B', threshold: hudson.model.Result.SUCCESS)
    }
    // ...
}</code></pre>

      <h3 id="jenkins-variables">7. Environment Variables</h3>
      <p>Jenkins provides useful global variables:</p>
      <ul>
        <li><code>\${BUILD_NUMBER}</code>: Current build number (1, 2, 3...).</li>
        <li><code>\${JOB_NAME}</code>: Job name.</li>
        <li><code>\${WORKSPACE}</code>: Absolute path to workspace on agent.</li>
        <li><code>\${GIT_COMMIT}</code>: Current commit hash.</li>
        <li><code>\${BRANCH_NAME}</code>: Branch name (main, develop) — <em>Multibranch Pipeline only</em>.</li>
      </ul>

      <h3 id="jenkins-admin">8. Admin &amp; Debugging Tips</h3>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>URL/Command</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>/restart</code></strong></td>
              <td><code>http://jenkins-url/restart</code> → Force restart.</td>
            </tr>
            <tr>
              <td><strong><code>/safeRestart</code></strong></td>
              <td><code>http://jenkins-url/safeRestart</code> → Wait for jobs to finish then restart (recommended).</td>
            </tr>
            <tr>
              <td><strong>Script Console</strong></td>
              <td>Manage Jenkins → Script Console. Run Groovy on the system (e.g. bulk delete jobs, clear queue).</td>
            </tr>
            <tr>
              <td><strong>Replay</strong></td>
              <td>"Replay" on build UI. Edit Jenkinsfile and re-run without committing.</td>
            </tr>
            <tr>
              <td><strong>Linting</strong></td>
              <td>Use "Jenkins Pipeline Linter Connector" in VS Code to check syntax before commit.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="jenkins-big-picture">Big Picture: AWS / Terraform / Ansible</h3>
      <p>You now have all three pieces. A typical CI/CD flow:</p>
      <ol>
        <li><strong>Terraform:</strong> Create EC2, VPC, Security Groups on AWS.</li>
        <li><strong>Ansible:</strong> Install Docker, Java, config on those EC2s.</li>
        <li><strong>Jenkins:</strong>
          <ul>
            <li>Listen for Git commits.</li>
            <li>Build app Docker image.</li>
            <li>Push to Docker Hub / AWS ECR.</li>
            <li>SSH to EC2 (SSH Agent plugin) to <code>docker pull</code> and <code>docker run</code> new version.</li>
          </ul>
        </li>
      </ol>
    `,
  },
  {
    id: "gitops-cheatsheet",
    title: "GitOps Cheatsheet: ArgoCD &amp; Kubernetes",
    excerpt:
      "ArgoCD cheatsheet: GitOps architecture, Setup, CLI, Application Manifest, App of Apps, Sync/Health, Helm and Pro-tips.",
    publishedAt: "2025-01-22T08:30:00.000Z",
    readTime: 14,
    tags: ["GitOps", "ArgoCD", "Kubernetes", "Cheatsheet"],
    tools: ["ArgoCD", "Kubernetes"],
    skills: ["GitOps", "CI/CD", "Kubernetes"],
    image: "/blog/gitops-cheatsheet.svg",
    url: "",
    content: `
      <p>Hi, this is the final piece of modern CI/CD: <strong>GitOps</strong>.</p>
      <p>If Jenkins is the "builder" that packages code into Docker images, <strong>ArgoCD</strong> is the "delivery and monitor" that keeps what runs on Kubernetes (K8s) in sync with what you declare in Git.</p>
      <p>Below is a detailed <strong>ArgoCD Cheatsheet</strong>.</p>

      <h3 id="gitops-concept">1. GitOps Concept</h3>
      <p>Before running commands, understand the difference:</p>
      <ul>
        <li><strong>Jenkins (CIOps/Push):</strong> After build → run <code>kubectl apply</code> to push to cluster. (Requires <code>kubeconfig</code> in Jenkins → security risk).</li>
        <li><strong>ArgoCD (GitOps/Pull):</strong> ArgoCD runs <strong>inside</strong> the cluster → watches Git → sees changes → pulls and syncs automatically. (Safer; cluster credentials stay inside).</li>
      </ul>

      <h3 id="gitops-setup">2. Setup &amp; Admin</h3>
      <p>Install ArgoCD into the K8s cluster.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Command</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Install</strong></td>
              <td><code>kubectl create ns argocd</code><br><code>kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml</code></td>
              <td>Create namespace and install components (Repo Server, API Server, Controller).</td>
            </tr>
            <tr>
              <td><strong>Get default password</strong></td>
              <td><code>kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d</code></td>
              <td>Default user is <code>admin</code>. Password is in this secret.</td>
            </tr>
            <tr>
              <td><strong>Port Forward</strong></td>
              <td><code>kubectl port-forward svc/argocd-server -n argocd 8080:443</code></td>
              <td>Access Web UI at <code>localhost:8080</code> (if no Ingress).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="argocd-cli">3. ArgoCD CLI</h3>
      <p>CLI is needed for automation and debugging.</p>
      <p><strong>Login:</strong> <code>argocd login localhost:8080</code> (after port-forward)</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Purpose</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>argocd app list</code></strong></td>
              <td>List managed applications.</td>
              <td>Quick view of Sync/Health.</td>
            </tr>
            <tr>
              <td><strong><code>argocd app get</code></strong></td>
              <td>Details of one app.</td>
              <td><code>argocd app get my-app</code> (resource tree, errors).</td>
            </tr>
            <tr>
              <td><strong><code>argocd app sync</code></strong></td>
              <td>Force manual sync (if auto-sync off).</td>
              <td><code>argocd app sync my-app</code></td>
            </tr>
            <tr>
              <td><strong><code>argocd app history</code></strong></td>
              <td>Deploy history.</td>
              <td>Use for rollback.</td>
            </tr>
            <tr>
              <td><strong><code>argocd cluster add</code></strong></td>
              <td>Add external cluster.</td>
              <td><code>argocd cluster add context-name</code> (multi-cluster control plane).</td>
            </tr>
            <tr>
              <td><strong><code>argocd repo add</code></strong></td>
              <td>Connect private Git repo (SSH/HTTPS).</td>
              <td><code>argocd repo add git@github.com:user/repo --ssh-private-key-path ~/.ssh/id_rsa</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="application-manifest">4. Application Manifest (Declarative — Most important)</h3>
      <p>In GitOps, define apps with YAML, not the UI. This file defines "how to get manifests from Git and apply to K8s".</p>
      <p><strong>Standard <code>application.yaml</code>:</strong></p>
      <pre><code>apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-web-app
  namespace: argocd
spec:
  project: default
  
  # 1. Nguồn (Source): Lấy cái gì?
  source:
    repoURL: https://github.com/my-user/k8s-manifests.git
    targetRevision: HEAD  # Nhánh (main) hoặc Tag (v1.0)
    path: overlays/production # Thư mục chứa file YAML/Kustomize/Helm
  
  # 2. Đích (Destination): Cài vào đâu?
  destination:
    server: https://kubernetes.default.svc # Cluster hiện tại
    namespace: production # Namespace đích
  
  # 3. Chính sách đồng bộ (Sync Policy) - Cực quan trọng
  syncPolicy:
    automated: 
      prune: true    # Tự xoá resource trên K8s nếu file YAML trong Git bị xoá
      selfHeal: true # Tự sửa lại nếu có ai đó sửa tay trên K8s (Chống trôi lệch cấu hình)
    syncOptions:
      - CreateNamespace=true # Tự tạo namespace nếu chưa có</code></pre>

      <h3 id="app-of-apps">5. App of Apps Pattern</h3>
      <p>To manage 100 apps (microservices), use a <strong>parent App</strong> that points to a folder of <strong>child Apps</strong>.</p>
      <p><strong>Git repo layout:</strong></p>
      <pre><code>git-repo/
├── apps/               # Folder chứa App con
│   ├── backend.yaml    # Application: Backend
│   ├── frontend.yaml   # Application: Frontend
│   └── database.yaml   # Application: DB
└── bootstrap.yaml      # App cha (App of Apps)</code></pre>
      <p>Deploying <code>bootstrap.yaml</code> makes ArgoCD discover and deploy backend, frontend and database.</p>

      <h3 id="gitops-troubleshooting">6. Troubleshooting (Sync &amp; Health)</h3>
      <p>In the ArgoCD UI you see two important columns:</p>

      <h4 id="sync-status">A. Sync Status</h4>
      <ul>
        <li><strong>Synced (Green):</strong> Git and K8s match.</li>
        <li><strong>OutOfSync (Yellow):</strong> There are differences.</li>
        <li>Click "Diff" to see what changed.</li>
        <li>If due to new code → Sync.</li>
        <li>If someone edited K8s manually → Sync to overwrite (or selfHeal does it).</li>
      </ul>

      <h4 id="health-status">B. Health Status</h4>
      <ul>
        <li><strong>Healthy (Green):</strong> Pods running, Service has Endpoints, PVC bound.</li>
        <li><strong>Progressing (Blue):</strong> Deploying (Pods starting).</li>
        <li><strong>Degraded (Red):</strong> Error (CrashLoopBackOff, ImagePullBackOff, missing ConfigMap...).</li>
        <li><strong>Missing (Grey):</strong> Resource in Git but not created on K8s.</li>
      </ul>

      <h3 id="gitops-helm">7. Helm &amp; Kustomize</h3>
      <p>ArgoCD supports both natively.</p>
      <p><strong>Example overriding Helm values in ArgoCD:</strong></p>
      <pre><code>source:
  repoURL: https://prometheus-community.github.io/helm-charts
  chart: prometheus
  targetRevision: 15.0.1
  helm:
    parameters: # Tương đương --set trong helm install
      - name: server.service.type
        value: LoadBalancer
    valueFiles: # Tương đương -f values.yaml
      - values-production.yaml</code></pre>

      <h3 id="gitops-protips">Pro-Tips</h3>
      <ol>
        <li><strong>Never use tag <code>latest</code>:</strong> With <code>myapp:latest</code>, ArgoCD won't see new image pushes (string "latest" in Git doesn't change).<br><em>Fix:</em> Use version tags (<code>myapp:v1.2</code>) or hash (<code>myapp:sha-a1b2c</code>). Commit version update in Git → ArgoCD sees change → Deploy.</li>
        <li><strong>Separate repos:</strong> Split <strong>Source Code Repo</strong> (app code) and <strong>Config Repo</strong> (K8s YAML).<br>CI (Jenkins) builds → pushes image → commits new tag to Config Repo.<br>ArgoCD only watches Config Repo. Avoids infinite build loops and better access control.</li>
      </ol>
    `,
  },
  {
    id: "docker-cheatsheet",
    title: "Docker Cheatsheet: Image, Container, Compose &amp; Dockerfile",
    excerpt:
      "Docker cheatsheet: Image lifecycle, Container management, Debug, Volumes &amp; Networks, Housekeeping, Compose and Dockerfile best practices.",
    publishedAt: "2025-01-28T09:00:00.000Z",
    readTime: 14,
    tags: ["Docker", "DevOps", "Containers", "Cheatsheet"],
    tools: ["Docker"],
    skills: ["DevOps", "Containers", "CI/CD"],
    image: "/blog/docker-cheatsheet.svg",
    url: "",
    content: `
      <p>Hi, this is the foundational piece of the DevOps stack we've discussed. <strong>Docker</strong> packages apps so they run the same everywhere (your laptop = test server = production).</p>
      <p>Below is a full <strong>Docker Cheatsheet</strong>, from basics to practice.</p>

      <h3 id="docker-image-lifecycle">1. Image Lifecycle (Blueprint)</h3>
      <p>Images are read-only templates. You need an image to create containers.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Description</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>docker build</code></strong></td>
              <td>Build image from <code>Dockerfile</code>.</td>
              <td><code>docker build -t my-app:v1 .</code> — (<code>-t</code>: tag, <code>.</code>: current dir)</td>
            </tr>
            <tr>
              <td><strong><code>docker pull</code></strong></td>
              <td>Pull image from Docker Hub.</td>
              <td><code>docker pull nginx:alpine</code> — (Prefer <code>alpine</code> for smaller size)</td>
            </tr>
            <tr>
              <td><strong><code>docker images</code></strong></td>
              <td>List images on the host.</td>
              <td>Check if image is present and size.</td>
            </tr>
            <tr>
              <td><strong><code>docker rmi</code></strong></td>
              <td>Remove image.</td>
              <td><code>docker rmi &lt;image_id&gt;</code> — (Remove containers using it first)</td>
            </tr>
            <tr>
              <td><strong><code>docker tag</code></strong></td>
              <td>Tag image (often before push).</td>
              <td><code>docker tag my-app:v1 user/my-app:final</code></td>
            </tr>
            <tr>
              <td><strong><code>docker push</code></strong></td>
              <td>Push image to registry (Docker Hub, AWS ECR).</td>
              <td><code>docker push user/my-app:final</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="docker-container">2. Container Management (Running instances)</h3>
      <p>Containers are live instances of an image.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Description</th>
              <th>Example &amp; Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>docker run</code></strong></td>
              <td>Create and start a new container.</td>
              <td><code>docker run -d -p 80:80 --name web nginx</code> — (<code>-d</code>: detached, <code>-p</code>: host:container port)</td>
            </tr>
            <tr>
              <td><strong><code>docker ps</code></strong></td>
              <td>List <strong>running</strong> containers.</td>
              <td><code>docker ps -a</code> — (<code>-a</code>: include stopped/failed)</td>
            </tr>
            <tr>
              <td><strong><code>docker stop</code></strong></td>
              <td>Stop container (SIGTERM).</td>
              <td><code>docker stop web</code></td>
            </tr>
            <tr>
              <td><strong><code>docker start</code></strong></td>
              <td>Start stopped container (no new container).</td>
              <td><code>docker start web</code></td>
            </tr>
            <tr>
              <td><strong><code>docker rm</code></strong></td>
              <td>Remove container (must stop first).</td>
              <td><code>docker rm web</code> — <code>docker rm -f web</code> (force remove even if running — use with care)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="docker-debug">3. Debugging &amp; Interaction</h3>
      <p>When a container fails or you need to inspect it.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Purpose</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>docker logs</code></strong></td>
              <td>View container stdout (main debug tool).</td>
              <td><code>docker logs -f web</code> — (<code>-f</code>: follow, like <code>tail -f</code>)</td>
            </tr>
            <tr>
              <td><strong><code>docker exec</code></strong></td>
              <td>Run command inside running container (like SSH).</td>
              <td><code>docker exec -it web /bin/sh</code> — (Interactive shell to inspect files)</td>
            </tr>
            <tr>
              <td><strong><code>docker inspect</code></strong></td>
              <td>Inspect JSON config (IP, volume, network...).</td>
              <td><code>docker inspect web</code> — (Find container IP)</td>
            </tr>
            <tr>
              <td><strong><code>docker stats</code></strong></td>
              <td>Real-time CPU/RAM usage.</td>
              <td>Like Task Manager/htop.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="docker-volumes-networks">4. Volumes &amp; Networks</h3>
      <p>Containers are ephemeral — stop and data is lost. Use volumes for persistent data.</p>
      <p><strong>Volume management:</strong></p>
      <ul>
        <li><code>docker volume create my-data</code>: Create a volume.</li>
      </ul>
      <p><strong>Mount volume at run:</strong></p>
      <pre><code>docker run -v my-data:/var/lib/mysql mysql
# Ánh xạ volume 'my-data' vào thư mục dữ liệu của MySQL</code></pre>
      <p><strong>Bind Mount (for Dev):</strong> Map host code dir into container.</p>
      <pre><code>docker run -v \$(pwd):/app node-app
# Sửa code trên máy -> container cập nhật ngay</code></pre>
      <p><strong>Network:</strong></p>
      <ul>
        <li><code>docker network create my-net</code>: Create network.</li>
        <li><code>docker run --network my-net ...</code>: Containers see each other by name (DNS).</li>
      </ul>

      <h3 id="docker-housekeeping">5. Housekeeping</h3>
      <p>Docker can fill disk if not cleaned.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>docker system prune</code></strong></td>
              <td>Remove stopped containers, unused networks, build cache (Careful!).</td>
            </tr>
            <tr>
              <td><strong><code>docker image prune</code></strong></td>
              <td>Remove dangling images (<code>&lt;none&gt;</code> from repeated builds).</td>
            </tr>
            <tr>
              <td><strong><code>docker volume prune</code></strong></td>
              <td>Remove unused volumes (Careful: old DB data!).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="docker-compose">6. Docker Compose (Dev orchestration)</h3>
      <p>Instead of many <code>docker run</code> commands, define the whole stack (Frontend + Backend + DB) in <code>docker-compose.yml</code>.</p>
      <p><strong>Sample <code>docker-compose.yml</code>:</strong></p>
      <pre><code>version: '3.8'
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html # Bind mount
  
  db:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data # Named volume

volumes:
  db-data: # Khai báo volume</code></pre>
      <p><strong>Compose commands:</strong></p>
      <ul>
        <li><strong><code>docker-compose up -d</code></strong>: Start whole stack in background.</li>
        <li><strong><code>docker-compose down</code></strong>: Stop and remove containers &amp; network (keeps volumes).</li>
        <li><strong><code>docker-compose logs -f</code></strong>: Follow logs of all services.</li>
        <li><strong><code>docker-compose build</code></strong>: Rebuild images if Dockerfile changed.</li>
      </ul>

      <h3 id="dockerfile-best-practices">7. Dockerfile Best Practices</h3>
      <ol>
        <li><strong>Multi-stage Build (Smaller image):</strong> One image to build (compiler, tools) and one to run (binary only).<br>
          <pre><code># Stage 1: Build
FROM maven:3.8-jdk-11 AS builder
WORKDIR /app
COPY . .
RUN mvn package

# Stage 2: Run (Chỉ lấy file JAR từ stage 1)
FROM openjdk:11-jre-slim
COPY --from=builder /app/target/app.jar /app.jar
CMD ["java", "-jar", "/app.jar"]</code></pre>
        </li>
        <li><strong>Layer order:</strong> Put rarely changing steps (e.g. install deps) first, often changing (e.g. COPY source) last to use <strong>Docker cache</strong>.</li>
        <li><strong><code>.dockerignore</code>:</strong> Exclude <code>.git</code>, <code>node_modules</code>, etc. from build context (faster builds).</li>
      </ol>
    `,
  },
  {
    id: "kubernetes-cheatsheet",
    title: "Kubernetes Cheatsheet: kubectl &amp; Resources",
    excerpt:
      "K8s cheatsheet: Resources (Pod, Service, Deployment...), get/describe, Debug (logs, exec, port-forward), apply/delete, Context &amp; YAML manifest.",
    publishedAt: "2025-01-29T09:00:00.000Z",
    readTime: 14,
    tags: ["Kubernetes", "kubectl", "DevOps", "Cheatsheet"],
    tools: ["Kubernetes"],
    skills: ["DevOps", "Containers", "Kubernetes"],
    image: "/blog/kubernetes-cheatsheet.svg",
    url: "",
    content: `
      <p>Hi, this is the largest piece and the end goal of modern infrastructure. After Docker packages apps, <strong>Kubernetes (K8s)</strong> runs, scales and automates thousands of containers.</p>
      <p>Below is a <strong>Kubernetes Cheatsheet</strong> focused on <strong><code>kubectl</code></strong> — the main tool for DevOps engineers.</p>

      <h3 id="k8s-resources">1. Resources (Main objects)</h3>
      <p>In K8s everything is an object. Know the short names for fast typing.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Full name</th>
              <th>Short</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Pod</strong></td>
              <td><code>po</code></td>
              <td>Smallest unit; runs one or more containers.</td>
            </tr>
            <tr>
              <td><strong>Service</strong></td>
              <td><code>svc</code></td>
              <td>Stable network (IP/DNS) to reach Pods.</td>
            </tr>
            <tr>
              <td><strong>Deployment</strong></td>
              <td><code>deploy</code></td>
              <td>Manages Pods (create, update, scale).</td>
            </tr>
            <tr>
              <td><strong>Namespace</strong></td>
              <td><code>ns</code></td>
              <td>Logical partition (dev, prod).</td>
            </tr>
            <tr>
              <td><strong>ConfigMap</strong></td>
              <td><code>cm</code></td>
              <td>Config and env vars (non-secret).</td>
            </tr>
            <tr>
              <td><strong>Secret</strong></td>
              <td><code>secret</code></td>
              <td>Passwords, certs, tokens (base64).</td>
            </tr>
            <tr>
              <td><strong>Ingress</strong></td>
              <td><code>ing</code></td>
              <td>HTTP/HTTPS routing from internet to Services.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="k8s-viewing">2. Viewing Resources</h3>
      <p>Commands to answer "How is the system running?"</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Description</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>kubectl get</code></strong></td>
              <td>List resources.</td>
              <td><code>kubectl get po</code> — <code>kubectl get po -o wide</code> — <code>kubectl get all</code></td>
            </tr>
            <tr>
              <td><strong><code>kubectl describe</code></strong></td>
              <td>Details and <strong>events</strong> of a resource.</td>
              <td><code>kubectl describe po my-pod</code> — (When Pod is Pending/Error, check Events at bottom)</td>
            </tr>
            <tr>
              <td><strong><code>kubectl get ... -o yaml</code></strong></td>
              <td>Export current config as YAML.</td>
              <td><code>kubectl get svc my-service -o yaml &gt; backup.yaml</code></td>
            </tr>
            <tr>
              <td><strong><code>kubectl top</code></strong></td>
              <td>Resource usage (CPU/RAM).</td>
              <td><code>kubectl top po</code> (needs Metrics Server).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="k8s-debug">3. Debugging Pods</h3>
      <p>When Pod is red (CrashLoopBackOff, Error), use this combo.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Purpose</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>kubectl logs</code></strong></td>
              <td>Container stdout.</td>
              <td><code>kubectl logs my-pod</code> — <code>kubectl logs -f my-pod</code> — <code>kubectl logs my-pod -c my-container</code></td>
            </tr>
            <tr>
              <td><strong><code>kubectl exec</code></strong></td>
              <td>Shell into running container.</td>
              <td><code>kubectl exec -it my-pod -- /bin/sh</code> — (Like <code>docker exec</code>)</td>
            </tr>
            <tr>
              <td><strong><code>kubectl port-forward</code></strong></td>
              <td>Forward local port to Pod (bypass Ingress/Service).</td>
              <td><code>kubectl port-forward pod/my-db 5432:5432</code> — (Connect to DB or test app locally)</td>
            </tr>
            <tr>
              <td><strong><code>kubectl events</code></strong></td>
              <td>(New) Timeline of cluster events.</td>
              <td><code>kubectl events --types=Warning</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="k8s-modifying">4. Modifying Resources</h3>
      <p>In prod we often use GitOps (ArgoCD); for debug/dev use:</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Description</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>kubectl apply</code></strong></td>
              <td>Create or update from YAML.</td>
              <td><code>kubectl apply -f deployment.yaml</code> — (Declarative standard)</td>
            </tr>
            <tr>
              <td><strong><code>kubectl delete</code></strong></td>
              <td>Delete resource.</td>
              <td><code>kubectl delete -f deployment.yaml</code> — <code>kubectl delete po my-pod</code></td>
            </tr>
            <tr>
              <td><strong><code>kubectl edit</code></strong></td>
              <td>Edit resource in place (vi/nano).</td>
              <td><code>kubectl edit svc my-service</code> — (Changes apply immediately; use with care)</td>
            </tr>
            <tr>
              <td><strong><code>kubectl rollout restart</code></strong></td>
              <td>Restart all Pods in Deployment (zero downtime).</td>
              <td><code>kubectl rollout restart deploy/web</code> — (Common after ConfigMap update)</td>
            </tr>
            <tr>
              <td><strong><code>kubectl scale</code></strong></td>
              <td>Change replica count.</td>
              <td><code>kubectl scale --replicas=5 deploy/web</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="k8s-context">5. Context &amp; Namespace (Switching env)</h3>
      <p>How to avoid deleting prod when you think you're in dev?</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Command</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>kubectl config get-contexts</code></strong></td>
              <td>List contexts (clusters).</td>
            </tr>
            <tr>
              <td><strong><code>kubectl config use-context</code></strong></td>
              <td>Switch cluster, e.g. <code>kubectl config use-context prod-cluster</code>.</td>
            </tr>
            <tr>
              <td><strong><code>kubectl config set-context</code></strong></td>
              <td>Set default namespace (avoid typing <code>-n namespace</code> every time).</td>
            </tr>
            <tr>
              <td><strong>Tip:</strong> Use <strong><code>kubectx</code></strong> and <strong><code>kubens</code></strong></td>
              <td>Quick switch: <code>kubens dev</code>, <code>kubectx prod</code>.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="k8s-yaml">6. YAML Manifest Structure</h3>
      <p>You don't need to memorize; understand the skeleton.</p>
      <pre><code>apiVersion: apps/v1        # Phiên bản API của K8s
kind: Deployment           # Loại resource (Pod, Service, Ingress...)
metadata:
  name: nginx-app          # Tên định danh
  namespace: dev
  labels:                  # Tem nhãn (để Service tìm thấy)
    app: nginx
spec:                      # Specification (Mô tả trạng thái mong muốn)
  replicas: 3              # Số lượng bản sao
  selector:
    matchLabels:
      app: nginx
  template:                # Khuôn mẫu để đẻ ra Pod
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80</code></pre>

      <h3 id="k8s-troubleshooting">7. Troubleshooting Flow</h3>
      <p>When the app doesn't work, follow this order:</p>
      <ol>
        <li><strong>Check Pod:</strong> <code>kubectl get po</code> → Is status <em>Running</em>?</li>
        <li><strong>If Pending:</strong> No CPU/RAM or no matching Node → <code>kubectl describe po &lt;name&gt;</code></li>
        <li><strong>If CrashLoopBackOff:</strong> App starts then dies → <code>kubectl logs &lt;name&gt;</code> (code bug).</li>
        <li><strong>Check Service:</strong> Pod runs but unreachable? → <code>kubectl get svc</code> → Check <em>Endpoints</em>.</li>
        <li><strong>Check Ingress:</strong> Service ok but no external access? → Check Ingress Controller logs.</li>
      </ol>
    `,
  },
  {
    id: "defi-privacy-institution",
    title:
      "Case Study: Building Privacy-Preserving DeFi Infrastructure with AWS Nitro Enclaves & Zero-Knowledge Proofs",
    excerpt:
      "Institutional Privacy: Confidential Computing with Nitro Enclaves (TEE), ZK-SNARKs (Circom/SnarkJS), EKS Prover nodes. Batching reduces Gas by 95%. GDPR-compliant.",
    publishedAt: "2025-02-01T09:00:00.000Z",
    readTime: 22,
    tags: [
      "DeFi",
      "ZKP",
      "AWS Nitro Enclaves",
      "EKS",
      "KMS",
      "Circom",
      "Golang",
      "GDPR",
      "Confidential Computing",
    ],
    tools: [
      "AWS Nitro Enclaves",
      "EKS",
      "Docker",
      "Golang",
      "Circom",
      "SnarkJS",
    ],
    skills: [
      "Privacy Engineering",
      "ZKP",
      "Cloud Security",
      "Confidential Computing",
    ],
    image: "/blog/defi-privacy-institution.svg",
    url: "",
    content: `
      <p>This is a cutting-edge project combining <strong>Cloud (AWS)</strong>, <strong>Cryptography (ZKP)</strong> and <strong>Blockchain</strong>. It targets the "holy grail" of DeFi: <strong>Institutional Privacy</strong>. Financial institutions want to use DeFi but cannot expose trading strategy or customer data on a public chain. The solution uses <strong>Confidential Computing (AWS Nitro Enclaves)</strong>.</p>

      <p><strong>Author:</strong> Privacy Engineer / Cloud Architect · <strong>Timeline:</strong> 2025 – Present · <strong>Tech:</strong> AWS Nitro Enclaves, ZK-SNARKs, EKS, Circom, Golang</p>

      <h3 id="dilemma">1. Context: When Institutions Meet DeFi</h3>
      <p>Our client is a US financial institution. They want to settle payments on-chain for speed and liquidity but face two barriers:</p>
      <ol>
        <li><strong>Privacy:</strong> Cannot expose balances, sender, receiver on a public ledger (e.g. Ethereum) — business strategy would be exposed.</li>
        <li><strong>Compliance:</strong> Customer data (PII) must comply with GDPR/CCPA; it cannot go on a public chain.</li>
      </ol>
      <p>My task was to design a "Trustless" computing environment that hides sensitive data using <strong>Zero-Knowledge Proofs (ZKP)</strong> inside hardware-isolated environments.</p>

      <h3 id="architecture">2. Architecture: Trusted Execution Environment (TEE)</h3>
      <p>We chose <strong>Confidential Computing</strong>. Instead of computing on-chain (slow and public), we compute off-chain in a hardware-protected environment.</p>
      <p><strong>Overall architecture:</strong></p>
      <ol>
        <li><strong>Client:</strong> Sends encrypted transaction data to the cloud.</li>
        <li><strong>Secure Enclave (AWS Nitro):</strong> Decrypts, validates, generates ZK-Proof.</li>
        <li><strong>Blockchain (Smart Contract):</strong> Receives only ZK-Proof for verification. If valid → transaction accepted.</li>
      </ol>

      <h3 id="nitro">3. The "Black Box" on Cloud: AWS Nitro Enclaves</h3>
      <p>This is the heart of the security design. So that even the dev or AWS admin cannot see data during computation, we use <strong>AWS Nitro Enclaves</strong>.</p>
      <ul>
        <li><strong>Isolation:</strong> Nitro Enclaves are VMs isolated in CPU and memory. No disk, no SSH, no public IP.</li>
        <li><strong>Attestation:</strong> Before sending private keys or data into the Enclave, KMS verifies (attests) that the code running is the audited, unmodified code.</li>
      </ul>
      <p>I built Docker images with <strong>Circom (circuit)</strong> logic, converted to EIF (Enclave Image Format) and deployed on EC2 worker nodes.</p>

      <h3 id="zkp-pipeline">4. ZK-Proof Pipeline: From Circom to Verifier</h3>
      <p>Data flow:</p>
      <ol>
        <li><strong>Circuit Design (Circom):</strong> Logic to check balance and signature without revealing amounts.</li>
        <li><strong>Witness Generation:</strong> Inside the Enclave, inputs (amount, wallet) are loaded to produce a witness.</li>
        <li><strong>Proving (zk-SNARKs):</strong> Use <code>snarkjs</code> (or Go <code>gnark</code>) to produce proof π. CPU-intensive; run on C6i instances.</li>
        <li><strong>Output:</strong> Enclave returns only proof π and public inputs (hash); never raw data.</li>
      </ol>

      <h3 id="eks">5. EKS Infrastructure &amp; Hardening</h3>
      <p>To manage hundreds of Prover nodes, we use <strong>Amazon EKS (Kubernetes)</strong>.</p>
      <ul>
        <li><strong>DaemonSets:</strong> Deploy Nitro Enclave helper on each node.</li>
        <li><strong>Security Groups:</strong> Defense in depth. EKS nodes in private subnets; traffic only from internal Load Balancer via gRPC.</li>
        <li><strong>IRSA:</strong> Tight KMS access; only Pods with valid Attestation Document can decrypt input.</li>
      </ul>

      <h3 id="batching">6. Cost Optimization: Batching &amp; Off-chain Computation</h3>
      <p>Verifying one ZK-Proof on Ethereum costs ~200k–500k Gas (~$20–$50). For thousands of txs, cost is prohibitive.</p>
      <p>I implemented <strong>Proof Batching (Aggregation)</strong>:</p>
      <ul>
        <li>Instead of submitting 100 proofs individually.</li>
        <li>We aggregate 100 proofs into one "Super Proof" (Recursive SNARKs).</li>
        <li>Smart contract verifies once for 100 transactions.</li>
        <li><strong>Result:</strong> Gas per transaction reduced by <strong>95%</strong>.</li>
      </ul>

      <h3 id="challenges">7. Challenges &amp; Lessons</h3>
      <ul>
        <li><strong>Debugging Enclave:</strong> No SSH into Enclave; debugging is hard. I built logging over vsock (EC2 ↔ Enclave) to CloudWatch with sanitization.</li>
        <li><strong>Cold Start:</strong> Enclave startup is slow. We keep a pool of "Warm Enclaves" ready.</li>
      </ul>

      <h3 id="results">8. Results</h3>
      <ul>
        <li><strong>Privacy-First:</strong> GDPR-compliant anonymous settlement for institutional clients.</li>
        <li><strong>Trustless Architecture:</strong> No need to trust system admins; cryptographic proofs and hardware isolation.</li>
        <li><strong>Scalability:</strong> ~500 TPS with EKS and Nitro Enclaves.</li>
      </ul>

      <h3 id="technical-deep-dive">Technical Deep Dive: Building the "Black Box"</h3>
      <p>To realize "Trustless Computing", I use <strong>Docker Multi-stage Build</strong> to shrink the Enclave image and <code>nitro-cli</code> to produce <strong>.eif</strong> (Enclave Image Format).</p>

      <h4 id="enclave-dockerfile">1. The Enclave Dockerfile</h4>
      <p>We use Go for the <code>zk-prover</code> module for performance and memory control. The Dockerfile is minimal; only the binary runs in the Enclave.</p>
      <pre><code># Stage 1: Build the ZK-Prover Binary
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o zk-prover .

# Stage 2: Create the Minimal Enclave Environment
FROM alpine:latest
RUN apk add --no-cache iproute2
WORKDIR /root/
COPY --from=builder /app/zk-prover .
COPY --from=builder /app/circuit_final.zkey .
CMD ["./zk-prover"]</code></pre>

      <h4 id="build-eif">2. Building the EIF (Enclave Image File)</h4>
      <p>After the Docker image, convert it to signed, measured <strong>.eif</strong>. This produces <strong>PCR (Platform Configuration Registers)</strong> used for Attestation.</p>
      <pre><code># Lệnh build EIF bằng nitro-cli
nitro-cli build-enclave \\
  --docker-uri zk-prover-image:latest \\
  --output-file zk_prover_v1.eif \\
  --signing-certificate certificate.pem \\
  --private-key private-key.pem

# Output sẽ trả về PCR0, PCR1, PCR2
# PCR0: Hash của image (Code integrity) -&gt; Dùng để verify trong KMS Policy</code></pre>
      <p>Save <strong>PCR0</strong> and add it to the AWS KMS Key Policy so only this Enclave image can call <code>kms:Decrypt</code>.</p>

      <h4 id="run-enclave">3. Running the Enclave on EKS Worker Node</h4>
      <p>Enclaves have no network interface; communication goes over <strong>Vsock (Virtual Socket)</strong>.</p>
      <pre><code>nitro-cli run-enclave \\
  --cpu-count 2 \\
  --memory 4096 \\
  --eif-path zk_prover_v1.eif \\
  --enclave-cid 16</code></pre>

      <h4 id="vsock-bridge">4. The Bridge: Vsock Communication</h4>
      <p>Proxy on the parent instance forwards requests from API Gateway into the Enclave via vsock. Uses <strong>AF_VSOCK</strong> (not AF_INET).</p>
      <pre><code># Parent Instance: Gửi encrypted data vào Enclave qua Vsock
import socket
vsock_addr = (16, 5000)  # CID 16 là ID của Enclave

def send_to_enclave(encrypted_payload):
    s = socket.socket(socket.AF_VSOCK, socket.SOCK_STREAM)
    s.connect(vsock_addr)
    s.sendall(encrypted_payload)
    zk_proof = s.recv(4096)
    s.close()
    return zk_proof</code></pre>

      <h3 id="summary">Summary</h3>
      <p>This project shows how <strong>Cloud Security</strong> (Nitro Enclaves) and <strong>Web3</strong> (Zero-Knowledge Proofs) combine to solve hard privacy problems in finance.</p>
    `,
  },
  {
    id: "nft-marketplace-web3-security",
    title:
      'Case Study: DevSecOps "Shift Left" Reducing Vulnerabilities by 85% for NFT Marketplace & Web3 Gaming Studio',
    excerpt:
      "DevSecOps + Web3 Security: Shift Left with GitLab CI, Secret Detection, Trivy (SCA), Checkov (IaC), Slither & Foundry (Smart Contract). 85% vuln reduction, zero secret leaks.",
    publishedAt: "2025-02-05T10:00:00.000Z",
    readTime: 18,
    tags: [
      "DevSecOps",
      "NFT",
      "Web3",
      "GitLab CI",
      "Checkov",
      "Trivy",
      "Slither",
      "Foundry",
      "Shift Left",
    ],
    tools: [
      "GitLab CI",
      "Checkov",
      "Trivy",
      "Slither",
      "Foundry",
      "AWS Inspector",
    ],
    skills: [
      "DevSecOps",
      "CI/CD",
      "Security Scanning",
      "Smart Contract",
      "IaC",
    ],
    image: "/blog/nft-marketplace-web3.svg",
    url: "",
    content: `
      <p>This project combines <strong>traditional DevSecOps</strong> (containers, cloud) with <strong>Web3 Security</strong> (smart contracts). In Web3, "move fast and break things" is dangerous: one bug in a contract or a leaked private key can mean permanent loss of funds.</p>

      <p><strong>Author:</strong> DevSecOps Lead · <strong>Timeline:</strong> 2025 · <strong>Tech:</strong> GitLab CI, Checkov, Trivy, Slither, Foundry, AWS Inspector</p>

      <h3 id="stakes">1. Context: "Web3 Has No Undo"</h3>
      <p>Our client is a US game studio and NFT marketplace. In Web3, security is about protecting <strong>money</strong>.</p>
      <ul>
        <li>One private key committed to Git = loss of project funds.</li>
        <li>One Reentrancy bug in a contract = drained liquidity pool.</li>
        <li>One public S3 bucket for NFT metadata = NFTs worthless (anyone can change images).</li>
      </ul>
      <p>With 8 engineers pushing code to mainnet, manual audit was the bottleneck. My job was to integrate security into the GitLab CI pipeline.</p>

      <h3 id="shift-left">2. Strategy: Shift Left Security</h3>
      <p>Security used to be at the end (pentest before deploy). I reversed this with <strong>"Shift Left"</strong>:</p>
      <blockquote><p>Detect issues as soon as the developer commits, or even while typing (IDE), instead of waiting for staging/production.</p></blockquote>
      <p>Goal: <strong>Pipeline fails immediately on Critical security findings.</strong></p>

      <h3 id="pipeline">3. GitLab CI Security Pipeline</h3>
      <p>I designed a pipeline with multiple stages, each acting as a filter.</p>

      <h3 id="secret-detection">4. Layer 1: Secret Detection – "Don't Leave Keys Under the Mat"</h3>
      <p>The most basic and dangerous mistake in Web3 is committing <code>AWS_ACCESS_KEY</code> or deploy wallet <code>PRIVATE_KEY</code> to the repo.</p>
      <p><strong>Solution:</strong> GitLab built-in <strong>Secret Detection</strong> (or Gitleaks) on every commit.</p>
      <ul>
        <li><strong>Mechanism:</strong> Regex for private keys (ETH, Solana), AWS keys, API tokens.</li>
        <li><strong>Action:</strong> If found, CI job <strong>FAILS</strong> and blocks merge to <code>main</code>.</li>
      </ul>

      <h3 id="sca">5. Layer 2: SCA &amp; Container Security (Trivy)</h3>
      <p>The NFT marketplace uses many Node.js (frontend) and Python (off-chain backend) libraries. Web3 libs (<code>web3.js</code>, <code>ethers.js</code>) often have CVEs.</p>
      <p><strong>Solution:</strong> Integrate <strong>Trivy</strong> to scan:</p>
      <ol>
        <li><strong>Dependency Scanning:</strong> Check <code>package.json</code> for known CVEs.</li>
        <li><strong>Container Scanning:</strong> Scan Docker images before push to AWS ECR (OS vulns).</li>
      </ol>

      <h3 id="iac">6. Layer 3: IaC Security (Checkov)</h3>
      <p>AWS infra (NFT metadata, game servers) is built with Terraform. Risk: accidental public S3 or Security Group with port 22 open to the world.</p>
      <p><strong>Solution:</strong> <strong>Checkov</strong> for Terraform static analysis.</p>
      <p><strong>Sample GitLab CI config:</strong></p>
      <pre><code>iac-scanning:
  stage: test
  image: bridgecrew/checkov:latest
  script:
    - checkov -d . --framework terraform --check CKV_AWS_20,CKV_AWS_53
  allow_failure: false # Bắt buộc phải pass mới được deploy</code></pre>
      <p>This ensures no S3 bucket is created without encryption or as public.</p>

      <h3 id="smart-contract">7. Layer 4: Smart Contract Security (The Web3 Special)</h3>
      <p>This is what sets Web3 apart. Solidity (smart contracts) needs strict checks.</p>
      <p>I combined two tools:</p>
      <ol>
        <li><strong>Slither (Static Analysis):</strong> Scans Solidity for Reentrancy, unchecked external calls, integer overflow.</li>
        <li><strong>Foundry (Fuzzing):</strong> Fuzz tests (random inputs) to find edge cases unit tests miss.</li>
      </ol>
      <p><strong>Flow:</strong> Solidity → Slither (logic) → Foundry (fuzz) → Deploy to Testnet/Mainnet only if all pass.</p>

      <h3 id="results">8. Results &amp; Impact</h3>
      <p>After 6 months:</p>
      <ul>
        <li><strong>85% fewer vulnerabilities</strong> in production (caught early).</li>
        <li><strong>Zero Secret Leaks:</strong> Blocked 3 attempts of developers committing admin wallet private keys.</li>
        <li><strong>Compliance:</strong> AWS infra meets baseline security checks via Checkov.</li>
        <li><strong>Culture:</strong> Dev team checks security before pushing.</li>
      </ul>

      <h3 id="summary">Summary</h3>
      <p>This project shows that <strong>DevSecOps</strong> is essential for Web3. Combining traditional scanners (Checkov, Trivy) with blockchain tools (Slither, Foundry) builds an NFT marketplace that is both fast and secure.</p>
    `,
  },
  {
    id: "siem-security-datalake",
    title:
      "Case Study: Building a Centralized Security Data Lake Compliant with SOC 2 & PCI-DSS for 50+ AWS Accounts",
    excerpt:
      "Security Data Engineering: Centralized Log Archive, S3 Object Lock (WORM), Athena partitioning, QuickSight anomaly detection. Compliance-ready for SOC 2 & PCI-DSS.",
    publishedAt: "2025-02-08T08:00:00.000Z",
    readTime: 18,
    tags: [
      "Security Data Lake",
      "SOC 2",
      "PCI-DSS",
      "S3 Object Lock",
      "Athena",
      "QuickSight",
      "Kinesis Firehose",
      "CloudTrail",
    ],
    tools: [
      "S3 Object Lock",
      "Athena",
      "QuickSight",
      "Kinesis Firehose",
      "CloudTrail",
    ],
    skills: [
      "Security Data Engineering",
      "Compliance",
      "SOC 2",
      "PCI-DSS",
      "Analytics",
    ],
    image: "/blog/siem-security-datalake.svg",
    url: "",
    content: `
      <p>This is a typical <strong>Security Data Engineering</strong> project. With stricter compliance (SOC 2, PCI-DSS), "turning on logs" is not enough. Organizations need a centralized, immutable, queryable store for investigation.</p>

      <p><strong>Author:</strong> Data Security Engineer · <strong>Timeline:</strong> 2024 · <strong>Tech:</strong> Amazon S3 (Object Lock), Athena, QuickSight, Kinesis Firehose</p>

      <h3 id="fragmentation">1. Context: "Fragmented Data Is Dead Data"</h3>
      <p>Our client runs 50+ AWS accounts. During a security audit we found a major gap:</p>
      <ul>
        <li><strong>Log Silos:</strong> Logs (CloudTrail, VPC Flow Logs) lived in each account. If an account is compromised, logs could be deleted.</li>
        <li><strong>Audit Nightmare:</strong> Gathering evidence for SOC 2 and PCI-DSS took weeks of manual pull from each place.</li>
        <li><strong>Lack of Visibility:</strong> No single view of threats across accounts.</li>
      </ul>
      <p>My task was to build a <strong>Centralized Security Data Lake</strong> — one immutable "source of truth" with real-time analytics.</p>

      <h3 id="architecture">2. Solution: Hub-and-Spoke</h3>
      <p>I designed a model that centralizes logs in a dedicated <strong>Log Archive Account</strong>.</p>
      <ul>
        <li><strong>Ingestion:</strong> <strong>Kinesis Data Firehose</strong> streams logs from 50+ source accounts.</li>
        <li><strong>Storage:</strong> Amazon S3 as the data lake.</li>
        <li><strong>Analytics:</strong> Amazon Athena (serverless SQL).</li>
        <li><strong>Visualization:</strong> Amazon QuickSight for dashboards.</li>
      </ul>

      <h3 id="object-lock">3. The Vault: S3 Object Lock for Integrity</h3>
      <p>For PCI-DSS and SOC 2, a key requirement is: <strong>"Logs must not be modified or deleted during the retention period."</strong></p>
      <p>To address "admins can delete logs", I implemented <strong>S3 Object Lock</strong> in <strong>Compliance Mode</strong>.</p>
      <ul>
        <li><strong>WORM (Write Once, Read Many):</strong> Once written, no one (including AWS root) can delete or overwrite until retention expires (e.g. 1 year).</li>
        <li><strong>Tamper-Proof:</strong> Last line of defense against ransomware or attackers wiping traces.</li>
      </ul>
      <p><strong>Bucket config:</strong></p>
      <pre><code>{
    "ObjectLockEnabled": "Enabled",
    "Rule": {
        "DefaultRetention": {
            "Mode": "COMPLIANCE",
            "Days": 365
        }
    }
}</code></pre>

      <h3 id="athena">4. Query Optimization: Partitioning &amp; Athena</h3>
      <p>With huge data from 50 accounts, a simple <code>SELECT * FROM logs</code> can take hours and cost a lot (Athena charges by data scanned).</p>
      <p>I optimized the data lake:</p>
      <ol>
        <li>Use <strong>Kinesis Firehose</strong> to compress to <strong>Parquet</strong> or <strong>ORC</strong> (smaller storage, faster column reads).</li>
        <li><strong>Partitioning:</strong> S3 layout like <code>s3://security-logs/cloudtrail/year=2024/month=01/day=15/</code></li>
        <li><strong>Athena:</strong> Queries must use <code>WHERE partition_date = ...</code>. Query time dropped from <strong>15 minutes to ~30 seconds</strong> and cost ~90% (only needed partitions scanned).</li>
      </ol>

      <h3 id="anomaly">5. Advanced Analytics: Anomaly Detection</h3>
      <p>Storing logs is not enough; turn them into intelligence. I focused on access to "critical" services: <strong>KMS/Secrets Manager</strong> and <strong>Indexer APIs</strong>.</p>
      <p>I built dashboards in <strong>Amazon QuickSight</strong>:</p>
      <ul>
        <li><strong>Geo Map:</strong> Alert if key-management API is called from unexpected countries (outside US).</li>
        <li><strong>Volume Spike:</strong> Detect large GetSecretValue in a short time — possible data exfiltration.</li>
        <li><strong>Error Rate:</strong> Track <code>AccessDenied</code> spikes — possible permission enumeration.</li>
      </ul>

      <h3 id="challenges">6. Technical Challenges</h3>
      <p><strong>Issue:</strong> VPC Flow Logs generate huge data (terabytes/month), increasing S3 and Athena cost.</p>
      <p><strong>Solution:</strong> <strong>S3 Lifecycle Policies</strong>.</p>
      <ul>
        <li><strong>Hot (0–30 days):</strong> S3 Standard for fast incident investigation.</li>
        <li><strong>Cold (30 days – 1 year):</strong> Move to S3 Glacier Instant Retrieval (lower cost, Object Lock preserved).</li>
      </ul>

      <h3 id="results">7. Results</h3>
      <ul>
        <li><strong>Compliance Ready:</strong> SOC 2 Type II and PCI-DSS with S3 Object Lock.</li>
        <li><strong>Visibility:</strong> Forensic time reduced from <strong>3 days to ~2 hours</strong> with centralized Athena queries.</li>
        <li><strong>Proactive:</strong> Detected and stopped 2 abnormal API access attempts from internal network before data exfiltration.</li>
      </ul>

      <h3 id="summary">Summary</h3>
      <p>Security is not just firewalls. Security Data Engineering — building a solid, queryable security data foundation — is the base for trust and compliance at scale.</p>
    `,
  },
  {
    id: "crypto-exchange-validator-security",
    title:
      "Case Study: Building Automated Incident Response (SOAR) for Crypto Exchange & Validator Node",
    excerpt:
      "SOAR in Crypto/Blockchain: MTTR reduced from 45 minutes to under 30 seconds. GuardDuty → EventBridge → Lambda: Kill Switch, Forensics Pipeline, Validator Protection, Slack ChatOps.",
    publishedAt: "2025-02-10T09:30:00.000Z",
    readTime: 18,
    tags: [
      "SOAR",
      "GuardDuty",
      "Lambda",
      "EventBridge",
      "EBS Snapshot",
      "SNS",
      "Boto3",
      "Validator",
      "Crypto",
    ],
    tools: [
      "GuardDuty",
      "Lambda",
      "EventBridge",
      "EBS Snapshot",
      "SNS",
      "DynamoDB",
    ],
    skills: [
      "SOAR",
      "Incident Response",
      "Automation",
      "Python",
      "Security Groups",
      "Forensics",
    ],
    image: "/blog/crypto-exchange-validator-security.svg",
    url: "",
    content: `
      <p>This project is <strong>SOAR (Security Orchestration, Automation, and Response)</strong> in a high-risk environment: Crypto/Blockchain. Manual response is too slow when an attacker can drain wallets or take over a Validator node in seconds.</p>

      <p><strong>Author:</strong> Security Automation Engineer · <strong>Timeline:</strong> 2024 · <strong>Tech:</strong> AWS GuardDuty, Lambda, EventBridge, Python (Boto3)</p>

      <h3 id="stakes">1. Context: "60 Seconds Is Too Late"</h3>
      <p>Our client is a US crypto exchange and Validator node provider. In blockchain, incidents mean direct financial loss or slashing if a Validator misbehaves.</p>
      <p>The old process: Alert by email → SOC reads → Login to AWS → Check → Block IP. Average MTTR <strong>30–45 minutes</strong>. For crypto-jacking or key compromise, that is too long.</p>
      <p>My task: <strong>Reduce MTTR to under 60 seconds</strong> with full automation.</p>

      <h3 id="architecture">2. Solution: Event-Driven Security</h3>
      <p>I designed a "Serverless Security Response" that runs 24/7 without human intervention for high-severity threats.</p>
      <p><strong>Workflow:</strong></p>
      <ul>
        <li><strong>Detect:</strong> Amazon GuardDuty finds anomalies (e.g. EC2 mining, API from strange IP).</li>
        <li><strong>Route:</strong> EventBridge captures the finding and triggers the right Lambda.</li>
        <li><strong>Act:</strong> AWS Lambda (Python/Boto3) runs remediation.</li>
        <li><strong>Notify:</strong> Send detailed report to SOC Slack channel.</li>
      </ul>

      <h3 id="kill-switch">3. The "Kill Switch": Automated Containment</h3>
      <p>When GuardDuty reports a severe finding (e.g. <code>CryptoCurrency:EC2/BitcoinTool.B</code> or <code>UnauthorizedAccess:IAM/InstanceCredentialExfiltration</code>), Lambda runs immediately.</p>

      <h4 id="network-isolation">A. Network Isolation</h4>
      <p>Instead of stopping the instance (losing RAM for forensics), I use <strong>"Isolation Security Group"</strong>.</p>
      <p>Lambda (via Boto3):</p>
      <ol>
        <li>Get EC2 instance ID from GuardDuty finding.</li>
        <li>Remove all current Security Groups.</li>
        <li>Attach <code>FORENSIC-ISOLATION</code> — Deny All Inbound/Outbound except Forensic machine on port 22 (SSH).</li>
      </ol>

      <h4 id="identity-revocation">B. Identity Revocation</h4>
      <p>If the EC2 IAM Role is suspected of credential leak:</p>
      <ol>
        <li>Lambda attaches <code>DenyAll</code> policy to that Role.</li>
        <li>Revoke all active sessions to kick the attacker out.</li>
      </ol>

      <h3 id="forensics">4. Automated Forensics: Evidence Preservation</h3>
      <p>Attackers often try to wipe logs. The system races to preserve evidence.</p>
      <p>Right after network isolation, Lambda triggers forensics:</p>
      <ul>
        <li><strong>EBS Snapshot:</strong> Immediate disk snapshot with tag <code>Forensic-Case-ID</code>.</li>
        <li><strong>Memory Dump (Optional):</strong> SSM Run Command to dump RAM (if instance still responsive) for fileless malware analysis.</li>
      </ul>
      <p>All of this happens within seconds of detection.</p>

      <h3 id="validator-protection">5. Validator Node Protection</h3>
      <p>Validator nodes (ETH, SOL, etc.) must stay online to validate blocks. Wrong isolation leads to slashing.</p>
      <p>I added special logic for these servers:</p>
      <ul>
        <li><strong>IP Sharding &amp; Port Blocking:</strong> Instead of full block, Lambda updates NACL to block only the malicious IPs (DDoS/brute-force on P2P port).</li>
        <li><strong>Smart Threshold:</strong> Full isolation only when GuardDuty confidence &gt; 8/10.</li>
      </ul>

      <h3 id="chatops">6. ChatOps: Smart Reporting to Slack</h3>
      <p>Machines act; humans need control. I integrated <strong>SNS</strong> and <strong>AWS Chatbot/Webhook</strong> to Slack.</p>
      <p><strong>Slack message includes:</strong></p>
      <ul>
        <li>🚨 <strong>SEVERITY:</strong> HIGH</li>
        <li>🖥 <strong>Instance ID:</strong> i-0123456789</li>
        <li>🛡 <strong>Threat Type:</strong> CryptoCurrency Mining</li>
        <li>🤖 <strong>Action Taken:</strong> ISOLATED &amp; SNAPSHOT TAKEN</li>
        <li>🔗 <strong>Link:</strong> Direct link to AWS Console</li>
      </ul>
      <p>So SOC knows: "System has already responded; now we investigate" instead of "System under attack, what do we do?".</p>

      <h3 id="challenges">7. Challenges &amp; Solutions</h3>
      <p><strong>Issue:</strong> False Positives (e.g. heavy script mistaken for mining).</p>
      <p><strong>Solution:</strong> <strong>Whitelist (Allowlist)</strong> in DynamoDB. Lambda checks before acting. If Instance ID or User is in the list, only alert — do not isolate.</p>

      <h3 id="results">8. Results (Impact)</h3>
      <ul>
        <li><strong>MTTR down 98%:</strong> From 45 minutes to under <strong>30 seconds</strong> from detection to full isolation.</li>
        <li><strong>100% Evidence Retention:</strong> No case lost to log deletion thanks to automatic snapshots.</li>
        <li><strong>Asset Protection:</strong> Stopped 3 attempts to install miners on Build Server.</li>
      </ul>

      <h3 id="summary">Summary</h3>
      <p>In crypto, security is survival, not just compliance. Moving from manual process to <strong>Automated Security Response (SOAR)</strong> with AWS Lambda and GuardDuty created a proactive "cocoon" so the client can run a large Validator network with confidence.</p>
    `,
  },
  {
    id: "enterprise-cloud-guardrails",
    title:
      "Case Study: Building Security Guardrails &amp; Governance for 100+ AWS Accounts",
    excerpt:
      "Case study at 100+ accounts scale: Landing Zone, SCPs (Region, CloudTrail, IMDSv2), AWS Config, Terraform. Real-world challenges &amp; lessons.",
    publishedAt: "2025-02-12T10:00:00.000Z",
    readTime: 18,
    tags: [
      "AWS Organizations",
      "SCPs",
      "Terraform",
      "AWS Config",
      "Control Tower",
      "IMDSv2",
      "Case Study",
    ],
    tools: ["Terraform", "AWS Config", "AWS Organizations", "Control Tower"],
    skills: ["Governance", "Compliance", "IaC", "Cloud Security"],
    image: "/blog/enterprise-cloud-guardrails.svg",
    url: "",
    content: `
      <p><strong>Author:</strong> Cloud Security Engineer · <strong>Timeline:</strong> 2023 – 2024</p>

      <h3 id="context">1. Context (The Challenge)</h3>
      <p>Our client is a large US company with 100+ AWS accounts for Dev, Staging, Production and Sandbox.</p>
      <p>With fast growth, manual per-account management created serious security gaps:</p>
      <ul>
        <li><strong>Shadow IT:</strong> Resources in unexpected regions (higher cost, latency, compliance risk).</li>
        <li><strong>Tampering:</strong> Risk of CloudTrail being disabled by child-account admins.</li>
        <li><strong>Vulnerability:</strong> Old EC2 instances still on IMDSv1, exposed to SSRF.</li>
      </ul>
      <p>My role was to design a Governance Framework that standardizes security across the organization without slowing Dev.</p>

      <h3 id="solution">2. Solution Architecture</h3>
      <p>We used a <strong>Landing Zone</strong> based on <strong>AWS Control Tower</strong> and <strong>AWS Organizations</strong>.</p>
      <p>Structure by Organizational Units (OU):</p>
      <ul>
        <li><strong>Security OU:</strong> Log Archive and Audit accounts.</li>
        <li><strong>Workload OU:</strong> Prod/Non-Prod accounts.</li>
        <li><strong>Sandbox OU:</strong> Experimentation with fewer restrictions.</li>
      </ul>

      <h3 id="scps">3. "Steel Fence": Service Control Policies (SCPs)</h3>
      <p>I designed the SCPs. They act as "hidden law" over all accounts; even root of a child account cannot override.</p>

      <h4 id="region-restriction">A. Region Restriction</h4>
      <p>For data sovereignty and cost control, I allowed resources only in <code>us-east-1</code> and <code>us-west-2</code>.</p>
      <p><strong>SCP snippet:</strong></p>
      <pre><code>{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyAllOutsideAllowedRegions",
      "Effect": "Deny",
      "NotAction": [
        "iam:*",
        "route53:*",
        "cloudfront:*"
      ],
      "Resource": "*",
      "Condition": {
        "StringNotEquals": {
          "aws:RequestedRegion": [
            "us-east-1",
            "us-west-2"
          ]
        }
      }
    }
  ]
}</code></pre>

      <h4 id="cloudtrail-guardduty">B. Protecting the "Black Box" (CloudTrail &amp; GuardDuty)</h4>
      <p>A common attacker move is to turn off logging before an attack. I added SCPs to block <code>StopLogging</code> and <code>DeleteDetector</code> for CloudTrail and GuardDuty org-wide.</p>

      <h3 id="imdsv2">4. Mitigating SSRF: Enforcing IMDSv2</h3>
      <p>Server-Side Request Forgery (SSRF) is a major cloud vector. IMDSv1 is weak (no session token).</p>
      <p><strong>My approach:</strong></p>
      <ol>
        <li><strong>Enforcement:</strong> SCP to deny creating any EC2 instance without <code>HttpTokens: required</code> (IMDSv2 only).</li>
        <li><strong>Migration:</strong> Scan 100+ accounts for old instances and plan upgrades.</li>
      </ol>
      <p><strong>SCP snippet blocking IMDSv1:</strong></p>
      <pre><code>{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RequireIMDSv2",
      "Effect": "Deny",
      "Action": "ec2:RunInstances",
      "Resource": "arn:aws:ec2:*:*:instance/*",
      "Condition": {
        "StringNotEquals": {
          "ec2:MetadataHttpTokens": "required"
        }
      }
    }
  ]
}</code></pre>

      <h3 id="config">5. Continuous Monitoring with AWS Config</h3>
      <p>Prevention is not enough; we need detection. I built a central <strong>AWS Config</strong> Aggregator into the Security account.</p>
      <ul>
        <li><strong>Managed Rules:</strong> Enable rules like <code>s3-bucket-public-read-prohibited</code>, <code>encrypted-volumes</code>.</li>
        <li><strong>Custom Rules:</strong> Logic tailored to client compliance.</li>
        <li><strong>Auto-Remediation:</strong> Close Security Group if port 22 (SSH) is open to 0.0.0.0/0.</li>
      </ul>

      <h3 id="terraform">6. Infrastructure as Code (Terraform)</h3>
      <p>Managing 100+ accounts with ClickOps is impossible. I used <strong>Terraform</strong> to:</p>
      <ul>
        <li>Deploy SCPs and attach them to OUs.</li>
        <li>Provision new accounts via AWS Control Tower Account Factory for Terraform (AFT).</li>
        <li>Keep Staging and Production consistent.</li>
      </ul>
      <pre><code>resource "aws_organizations_policy" "guardrails" {
  name    = "guardrails-scp"
  content = file("\${path.module}/scp-deny-unapproved-regions.json")
}

resource "aws_organizations_policy_attachment" "guardrails" {
  policy_id = aws_organizations_policy.guardrails.id
  target_id = aws_organizations_organizational_unit.sec.id
}</code></pre>

      <h3 id="challenges">7. Challenges &amp; Lessons (Real-world)</h3>
      <ul>
        <li><strong>Testing SCPs:</strong> One bad SCP can paralyze production. I learned to always test on a Sandbox OU and use a Canary account before applying globally.</li>
        <li><strong>Working with Dev:</strong> Forcing IMDSv2 broke some old scripts. Solution: "Soft-launch" (warn first, then block) and help teams update AWS SDK.</li>
      </ul>

      <h3 id="results">8. Results</h3>
      <ul>
        <li><strong>100% Coverage:</strong> All 100+ accounts comply with Region and Logging policy.</li>
        <li><strong>Zero IMDSv1:</strong> SSRF via metadata removed for new instances.</li>
        <li><strong>Automation:</strong> 80% less time to set up new accounts with Terraform and AFT.</li>
      </ul>

      <h3 id="summary">Summary</h3>
      <p>This project is not just tooling; it is building <strong>Security Culture</strong> at scale. Combining <strong>AWS Organizations (governance)</strong>, <strong>SCPs (prevention)</strong> and <strong>Terraform (automation)</strong> is the key to running enterprise cloud safely.</p>
    `,
  },
];
