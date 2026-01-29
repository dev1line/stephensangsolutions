/**
 * Mock blog posts - Terraform, Ansible, Jenkins
 * Hiển thị khi chưa cấu hình N8N_WEBHOOK_URL
 */
export { mockENBlogPost } from "./mockENBlogPosts";
export const mockBlogPosts = [
  {
    id: "terraform-cheatsheet",
    title: "Terraform Cheatsheet: Lệnh và khái niệm quan trọng",
    excerpt:
      "Bảng tổng hợp các lệnh và khái niệm Terraform theo quy trình thực tế: Core Workflow, State, HCL, Debug, Backend và Built-in Functions.",
    publishedAt: "2025-01-15T08:00:00.000Z",
    readTime: 12,
    tags: ["Terraform", "IaC", "DevOps", "Cheatsheet"],
    tools: ["Terraform"],
    skills: ["IaC", "DevOps", "Cloud"],
    image: "/blog/terraform-cheatsheet.svg",
    url: "",
    content: `
      <p>Chào bạn, dưới đây là bảng tổng hợp (Cheatsheet) các lệnh và khái niệm quan trọng nhất của Terraform, được phân loại theo quy trình làm việc thực tế, kèm ví dụ cụ thể để bạn dễ dàng tra cứu và áp dụng.</p>

      <h3 id="core-workflow">1. Vòng đời cơ bản (Core Workflow)</h3>
      <p>Đây là 4 lệnh bạn sẽ sử dụng hàng ngày để triển khai hạ tầng.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Lệnh</th>
              <th>Giải thích</th>
              <th>Ví dụ &amp; Lưu ý</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>terraform init</code></strong></td>
              <td>Khởi tạo thư mục làm việc, tải các provider (plugin) và cấu hình backend.</td>
              <td>Chạy đầu tiên khi clone repo về hoặc khi thêm provider mới.</td>
            </tr>
            <tr>
              <td><strong><code>terraform plan</code></strong></td>
              <td>Tạo ra một bản kế hoạch thực thi. So sánh code hiện tại với thực tế (state file) để xem những gì <em>sẽ</em> thay đổi.</td>
              <td><code>terraform plan -out=tfplan</code> — Lưu kế hoạch ra file để đảm bảo tính nhất quán khi apply.</td>
            </tr>
            <tr>
              <td><strong><code>terraform apply</code></strong></td>
              <td>Áp dụng các thay đổi vào hạ tầng thực tế (cloud).</td>
              <td><code>terraform apply "tfplan"</code> — Chạy file plan đã lưu.<br><code>terraform apply -auto-approve</code> — Bỏ qua bước hỏi xác nhận (dùng trong CI/CD).</td>
            </tr>
            <tr>
              <td><strong><code>terraform destroy</code></strong></td>
              <td>Xóa toàn bộ hạ tầng được quản lý bởi Terraform trong thư mục đó.</td>
              <td><code>terraform destroy -target=aws_instance.web</code> — Chỉ xóa resource cụ thể, dùng cẩn thận.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="state-management">2. Quản lý State (State Management)</h3>
      <p>Terraform State (<code>terraform.tfstate</code>) là "bộ não" lưu trữ ánh xạ giữa code của bạn và hạ tầng thực tế.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Lệnh</th>
              <th>Giải thích</th>
              <th>Ví dụ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>terraform state list</code></strong></td>
              <td>Liệt kê tất cả các resources đang được quản lý trong state file hiện tại.</td>
              <td>Giúp tìm tên resource để import hoặc xóa.</td>
            </tr>
            <tr>
              <td><strong><code>terraform state show</code></strong></td>
              <td>Hiển thị chi tiết thuộc tính của một resource cụ thể trong state.</td>
              <td><code>terraform state show aws_s3_bucket.my_bucket</code></td>
            </tr>
            <tr>
              <td><strong><code>terraform state mv</code></strong></td>
              <td>Đổi tên resource trong state file mà không làm xóa/tạo lại resource trên cloud.</td>
              <td><code>terraform state mv aws_instance.old aws_instance.new</code> — Dùng khi refactor code.</td>
            </tr>
            <tr>
              <td><strong><code>terraform state rm</code></strong></td>
              <td>Ngừng quản lý resource (xóa khỏi state) nhưng <strong>không</strong> xóa resource trên cloud.</td>
              <td><code>terraform state rm aws_instance.legacy</code></td>
            </tr>
            <tr>
              <td><strong><code>terraform refresh</code></strong></td>
              <td>Cập nhật state file khớp với thực tế trên cloud (đã được tích hợp vào <code>plan</code> và <code>apply</code> ở bản mới).</td>
              <td>Dùng khi có ai đó sửa tay trên Console và bạn muốn sync về.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <blockquote class="blog-blockquote">
        <strong>Lưu ý quan trọng:</strong> Không bao giờ sửa file <code>terraform.tfstate</code> bằng tay. Hãy dùng các lệnh trên.
      </blockquote>

      <h3 id="hcl-meta-arguments">3. Cú pháp HCL &amp; Meta-Arguments (Code Logic)</h3>
      <p>Các từ khóa điều khiển cách resource được tạo ra.</p>

      <h4 id="meta-arguments">A. Meta-Arguments (Điều khiển luồng)</h4>
      <ul>
        <li><strong><code>count</code></strong>: Tạo nhiều bản sao của resource dựa trên số lượng.</li>
      </ul>
      <pre><code>resource "aws_instance" "web" {
  count = 3  # Tạo 3 server: web[0], web[1], web[2]
  ami   = "ami-12345678"
  tags = {
    Name = "Server-\${count.index}"
  }
}</code></pre>
      <ul>
        <li><strong><code>for_each</code></strong>: Tạo nhiều resource dựa trên một Map hoặc Set (linh hoạt hơn <code>count</code>).</li>
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
        <li><strong><code>lifecycle</code></strong>: Kiểm soát vòng đời đặc biệt.</li>
      </ul>
      <pre><code>resource "aws_instance" "db" {
  lifecycle {
    create_before_destroy = true  # Tạo mới trước khi xóa cũ (giảm downtime)
    prevent_destroy       = true  # Chặn lệnh destroy (bảo vệ data)
    ignore_changes        = [tags]  # Bỏ qua nếu tags bị thay đổi thủ công
  }
}</code></pre>

      <h4 id="variables-outputs">B. Variables (Biến) &amp; Outputs</h4>
      <p><strong>Input Variable (<code>variables.tf</code>):</strong></p>
      <pre><code>variable "region" {
  type        = string
  default     = "us-east-1"
  description = "Deployment region"
}</code></pre>
      <p><strong>Output (<code>outputs.tf</code>):</strong> Trả về giá trị sau khi chạy xong (ví dụ: IP của server).</p>
      <pre><code>output "server_ip" {
  value = aws_instance.web.public_ip
}</code></pre>

      <h3 id="debug-optimization">4. Gỡ lỗi &amp; Tinh chỉnh (Debugging &amp; Optimization)</h3>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Lệnh</th>
              <th>Chức năng</th>
              <th>Ví dụ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>terraform fmt</code></strong></td>
              <td>Tự động định dạng lại code cho đẹp và chuẩn tắc.</td>
              <td><code>terraform fmt -recursive</code></td>
            </tr>
            <tr>
              <td><strong><code>terraform validate</code></strong></td>
              <td>Kiểm tra cú pháp code xem có lỗi logic hay thiếu biến không (không cần connect cloud).</td>
              <td>Chạy trước khi commit code.</td>
            </tr>
            <tr>
              <td><strong><code>terraform console</code></strong></td>
              <td>Mở môi trường dòng lệnh tương tác để thử nghiệm các hàm và tính toán biến.</td>
              <td>Gõ <code>file("script.sh")</code> để xem nội dung file được load thế nào.</td>
            </tr>
            <tr>
              <td><strong><code>terraform import</code></strong></td>
              <td>Đưa một resource đã tồn tại trên Cloud (tạo bằng tay) vào sự quản lý của Terraform.</td>
              <td><code>terraform import aws_s3_bucket.b my-bucket-name</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="backend-remote-state">5. Backend &amp; Remote State (Hợp tác nhóm)</h3>
      <p>Để làm việc nhóm, bạn không nên lưu state file trên máy cá nhân (<code>local</code>). Hãy lưu trên Cloud (<code>remote</code>).</p>
      <p>Ví dụ cấu hình Backend chuẩn với <strong>AWS S3</strong> (lưu trữ) và <strong>DynamoDB</strong> (khóa state để tránh ghi đè đồng thời):</p>
      <pre><code>terraform {
  backend "s3" {
    bucket         = "my-terraform-state-prod"
    key            = "network/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}</code></pre>

      <h3 id="built-in-functions">6. Các hàm tích hợp thường dùng (Built-in Functions)</h3>
      <p>Terraform không cho phép tự viết hàm, bạn phải dùng hàm có sẵn.</p>
      <ul>
        <li><strong><code>lookup(map, key, default)</code></strong>: Lấy giá trị từ map, nếu không có thì lấy default.</li>
      </ul>
      <pre><code>instance_type = lookup(var.instance_types, var.environment, "t2.micro")</code></pre>
      <ul>
        <li><strong><code>file(path)</code></strong>: Đọc nội dung file text (thường dùng cho UserData hoặc Policy).</li>
      </ul>
      <pre><code>user_data = file("\${path.module}/init-script.sh")</code></pre>
      <ul>
        <li><strong><code>merge(map1, map2)</code></strong>: Gộp 2 map lại với nhau (thường dùng cho Tags).</li>
      </ul>
      <pre><code>tags = merge(var.common_tags, { Name = "Web-Server" })</code></pre>
    `,
  },
  {
    id: "ansible-cheatsheet",
    title: "Ansible Cheatsheet: Lệnh và module cốt lõi",
    excerpt:
      "Bảng tổng hợp Ansible: Inventory, Ad-Hoc, Modules, Playbook, Variables, Galaxy, Roles và cờ debug. Configuration Management &amp; App Deployment.",
    publishedAt: "2025-01-20T09:00:00.000Z",
    readTime: 14,
    tags: ["Ansible", "DevOps", "Configuration Management", "Cheatsheet"],
    tools: ["Ansible"],
    skills: ["DevOps", "Configuration Management", "Automation"],
    image: "/blog/ansible-cheatsheet.svg",
    url: "",
    content: `
      <p>Chào bạn, tiếp nối Terraform, đây là bản <strong>Ansible Cheatsheet</strong> tổng hợp. Nếu Terraform tập trung vào việc "xây nhà" (Infrastructure Provisioning), thì Ansible tập trung vào việc "trang trí nội thất" và "lắp đặt thiết bị" (Configuration Management &amp; App Deployment).</p>
      <p>Dưới đây là các nhóm lệnh và module cốt lõi nhất.</p>

      <h3 id="ansible-inventory">1. Cấu trúc Inventory (Danh sách máy chủ)</h3>
      <p>Inventory là nơi định nghĩa các máy chủ (hosts) mà Ansible sẽ điều khiển. Mặc định là <code>/etc/ansible/hosts</code> hoặc file tùy chọn <code>-i inventory.ini</code>.</p>
      <p><strong>Định dạng INI (Phổ biến):</strong></p>
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

      <h3 id="ansible-adhoc">2. Ansible Ad-Hoc Commands (Lệnh nhanh)</h3>
      <p>Dùng để chạy tác vụ tức thì mà không cần viết Playbook.<br>Cấu trúc: <code>ansible &lt;group&gt; -m &lt;module&gt; -a "&lt;arguments&gt;"</code></p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Mục đích</th>
              <th>Lệnh mẫu</th>
              <th>Giải thích</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Kiểm tra kết nối</strong></td>
              <td><code>ansible all -m ping</code></td>
              <td>Kiểm tra xem Ansible có SSH và chạy python trên target được không.</td>
            </tr>
            <tr>
              <td><strong>Kiểm tra thông tin</strong></td>
              <td><code>ansible dbservers -m setup</code></td>
              <td>Thu thập "Facts" (OS, IP, CPU, RAM...) của server.</td>
            </tr>
            <tr>
              <td><strong>Chạy lệnh Shell</strong></td>
              <td><code>ansible web -m shell -a "uptime"</code></td>
              <td>Chạy lệnh Linux thuần túy trên remote host.</td>
            </tr>
            <tr>
              <td><strong>Copy file</strong></td>
              <td><code>ansible all -m copy -a "src=./file.txt dest=/tmp/"</code></td>
              <td>Copy file từ máy quản lý sang máy đích.</td>
            </tr>
            <tr>
              <td><strong>Cài phần mềm</strong></td>
              <td><code>ansible web -m apt -a "name=git state=present"</code></td>
              <td>Cài đặt git trên Ubuntu/Debian (dùng <code>yum</code> cho CentOS).</td>
            </tr>
            <tr>
              <td><strong>Khởi động lại Service</strong></td>
              <td><code>ansible web -m service -a "name=nginx state=restarted"</code></td>
              <td>Restart dịch vụ Nginx.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="ansible-modules">3. Modules thường dùng (Building Blocks)</h3>
      <p>Ansible có hàng ngàn module, nhưng 90% công việc hàng ngày chỉ xoay quanh khoảng 10 module này.</p>

      <h4 id="ansible-file-copy">A. Quản lý File &amp; Copy</h4>
      <ul>
        <li><strong><code>copy</code></strong>: Copy file tĩnh.</li>
        <li><strong><code>template</code></strong>: Copy file và thay thế biến (Jinja2) — <em>Rất mạnh mẽ để tạo file config động</em>.</li>
        <li><strong><code>file</code></strong>: Tạo thư mục, phân quyền (chmod), tạo symlink.</li>
        <li><strong><code>lineinfile</code></strong>: Thêm/sửa/xóa một dòng cụ thể trong file (ví dụ: thêm dòng vào <code>.env</code>).</li>
      </ul>

      <h4 id="ansible-package-service">B. Quản lý Gói &amp; Dịch vụ</h4>
      <ul>
        <li><strong><code>package</code></strong>: Module chung, tự động nhận diện là <code>apt</code> hay <code>yum</code> tùy OS.</li>
        <li><strong><code>service</code></strong> / <strong><code>systemd</code></strong>: Start, stop, enable (khởi động cùng OS) các dịch vụ.</li>
      </ul>

      <h4 id="ansible-command-shell">C. Thực thi lệnh</h4>
      <ul>
        <li><strong><code>command</code></strong>: Chạy lệnh Linux (an toàn, không dùng được pipe <code>|</code> hay redirect <code>&gt;</code>).</li>
        <li><strong><code>shell</code></strong>: Chạy lệnh Linux qua <code>/bin/sh</code> (dùng được pipe, biến môi trường, nhưng rủi ro bảo mật hơn).</li>
      </ul>

      <h3 id="ansible-playbook">4. Playbook (Kịch bản tự động hóa)</h3>
      <p>Playbook viết bằng <strong>YAML</strong>, mô tả trạng thái mong muốn (Desired State) của hệ thống.</p>
      <p><strong>Ví dụ: Cài đặt và cấu hình Nginx</strong></p>
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

      <h3 id="ansible-vars-loops">5. Variables &amp; Loops &amp; Conditionals (Logic)</h3>
      <p>Để Playbook linh hoạt hơn, ta dùng biến, vòng lặp và điều kiện.</p>

      <h4 id="ansible-variables">A. Variables (Biến)</h4>
      <p>Sử dụng cú pháp <code>{{ variable_name }}</code>.</p>
      <pre><code>vars:
  port: 8080
  app_name: "MyApp"</code></pre>

      <h4 id="ansible-loops">B. Loops (Vòng lặp)</h4>
      <p>Dùng <code>loop</code> (phiên bản mới thay cho <code>with_items</code>).</p>
      <pre><code>- name: Create multiple users
  user:
    name: "{{ item }}"
    state: present
  loop:
    - developer
    - manager
    - tester</code></pre>

      <h4 id="ansible-conditionals">C. Conditionals (Điều kiện <code>when</code>)</h4>
      <p>Chỉ chạy task nếu điều kiện đúng.</p>
      <pre><code>- name: Install Apache only on Debian
  apt:
    name: apache2
    state: present
  when: ansible_os_family == "Debian"</code></pre>

      <h3 id="ansible-galaxy-roles">6. Ansible Galaxy &amp; Roles (Tái sử dụng code)</h3>
      <p>Khi dự án lớn, không nên viết hết vào 1 file Playbook. Hãy chia nhỏ thành <strong>Roles</strong>.</p>
      <ul>
        <li><strong><code>ansible-galaxy init &lt;role_name&gt;</code></strong>: Tạo cấu trúc thư mục chuẩn cho một Role mới.</li>
        <li><strong><code>ansible-galaxy install &lt;author&gt;.&lt;role&gt;</code></strong>: Tải role có sẵn từ cộng đồng (ví dụ: cài Docker, K8s).</li>
      </ul>
      <p><strong>Cấu trúc Role chuẩn:</strong></p>
      <pre><code>roles/
  webserver/
    tasks/main.yml    # Chứa các tasks chính
    handlers/main.yml # Chứa handlers
    templates/        # Chứa file .j2
    files/            # Chứa file tĩnh
    vars/             # Chứa biến</code></pre>

      <h3 id="ansible-debugging">7. Debugging &amp; Flags quan trọng</h3>
      <p>Khi chạy <code>ansible-playbook</code>, các cờ này rất hữu ích:</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Cờ (Flag)</th>
              <th>Tác dụng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>-i &lt;file&gt;</code></strong></td>
              <td>Chỉ định file inventory khác mặc định (VD: <code>-i staging.ini</code>).</td>
            </tr>
            <tr>
              <td><strong><code>--syntax-check</code></strong></td>
              <td>Kiểm tra lỗi cú pháp YAML trước khi chạy.</td>
            </tr>
            <tr>
              <td><strong><code>--check</code></strong></td>
              <td>(Dry Run) Chạy thử, báo cáo những gì <em>sẽ</em> thay đổi nhưng không thực hiện thật.</td>
            </tr>
            <tr>
              <td><strong><code>--diff</code></strong></td>
              <td>Hiển thị sự khác biệt chi tiết (VD: file config thay đổi dòng nào).</td>
            </tr>
            <tr>
              <td><strong><code>-v</code> / <code>-vvv</code></strong></td>
              <td>Verbose mode. Tăng mức độ chi tiết log để debug lỗi kết nối SSH hoặc lỗi module.</td>
            </tr>
            <tr>
              <td><strong><code>--limit &lt;host&gt;</code></strong></td>
              <td>Chỉ chạy playbook trên 1 host hoặc 1 nhóm cụ thể, bỏ qua các host khác trong inventory.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="ansible-protips">Mẹo quan trọng (Pro-tips)</h3>
      <ol>
        <li><strong>Idempotency (Tính lũy đẳng):</strong> Đây là triết lý cốt lõi. Chạy playbook 1 lần hay 100 lần thì kết quả hệ thống vẫn y hệt nhau, không bị lỗi lặp. Hầu hết các module Ansible đều tuân thủ điều này (trừ <code>shell</code> và <code>command</code>, bạn phải tự xử lý).</li>
        <li><strong>Dynamic Inventory:</strong> Khi dùng AWS/Cloud, IP server thay đổi liên tục. Đừng viết file <code>hosts</code> tĩnh. Hãy dùng <strong>AWS Dynamic Inventory plugin</strong> (<code>aws_ec2.yml</code>) để Ansible tự động quét danh sách EC2 theo Tag.</li>
      </ol>
    `,
  },
  {
    id: "jenkins-cheatsheet",
    title: "Jenkins Cheatsheet: Pipeline Declarative &amp; CI/CD",
    excerpt:
      "Bảng tổng hợp Jenkins Pipeline (Declarative): Skeleton, Steps, Artifacts, Credentials, Docker, Triggers, Variables và Admin tips. Orchestrator CI/CD.",
    publishedAt: "2025-01-25T10:00:00.000Z",
    readTime: 14,
    tags: ["Jenkins", "CI/CD", "DevOps", "Cheatsheet"],
    tools: ["Jenkins"],
    skills: ["CI/CD", "DevOps", "Automation"],
    image: "/blog/jenkins-cheatsheet.svg",
    url: "",
    content: `
      <p>Chào bạn, để hoàn thiện bộ công cụ DevOps (Terraform để xây dựng, Ansible để cấu hình), chúng ta cần <strong>Jenkins</strong> đóng vai trò là "Nhạc trưởng" (Orchestrator) để tự động hóa toàn bộ quy trình CI/CD.</p>
      <p>Dưới đây là <strong>Jenkins Cheatsheet</strong> tập trung chủ yếu vào <strong>Jenkins Pipeline (Declarative)</strong> — chuẩn mực hiện đại nhất khi làm việc với Jenkins (thay vì bấm chuột trên giao diện GUI cũ).</p>

      <h3 id="jenkins-skeleton">1. Cấu trúc cơ bản của Pipeline (Skeleton)</h3>
      <p>Mọi quy trình CI/CD hiện đại đều được viết trong file tên là <code>Jenkinsfile</code>.</p>
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

      <h3 id="jenkins-steps">2. Các Steps thông dụng (Lệnh thực thi)</h3>
      <p>Đây là các "động từ" bạn sẽ dùng bên trong block <code>steps { ... }</code>.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Step</th>
              <th>Cú pháp mẫu</th>
              <th>Giải thích</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Shell Script</strong></td>
              <td><code>sh 'mvn clean install'</code></td>
              <td>Chạy lệnh Linux. Đây là lệnh dùng nhiều nhất. Với Windows dùng <code>bat</code>.</td>
            </tr>
            <tr>
              <td><strong>Git Checkout</strong></td>
              <td><code>git branch: 'main', url: 'https://github.com/user/repo.git'</code></td>
              <td>Lấy code từ kho chứa về. (Thường Jenkins tự làm bước này nếu cấu hình SCM).</td>
            </tr>
            <tr>
              <td><strong>Script</strong></td>
              <td><code>script { ... }</code></td>
              <td>Nhúng một đoạn code Groovy phức tạp vào trong Declarative Pipeline (khi logic if/else quá khó).</td>
            </tr>
            <tr>
              <td><strong>Sleep</strong></td>
              <td><code>sleep 10</code></td>
              <td>Tạm dừng pipeline trong X giây.</td>
            </tr>
            <tr>
              <td><strong>Error</strong></td>
              <td><code>error 'Stop here!'</code></td>
              <td>Chủ động làm fail pipeline (ví dụ: khi check quality gate không đạt).</td>
            </tr>
            <tr>
              <td><strong>Stash/Unstash</strong></td>
              <td><code>stash name: 'src', includes: '**/*'</code></td>
              <td>Lưu tạm file để chuyển sang node khác (agent khác) dùng.</td>
            </tr>
            <tr>
              <td><strong>Dir</strong></td>
              <td><code>dir('subdir') { ... }</code></td>
              <td>Chuyển thư mục làm việc (cd) vào thư mục con rồi mới chạy lệnh.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="jenkins-artifacts">3. Quản lý Artifacts &amp; Test Results</h3>
      <p>Sau khi build và test, bạn cần lưu lại kết quả.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Chức năng</th>
              <th>Cú pháp</th>
              <th>Giải thích</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Lưu file Build</strong></td>
              <td><code>archiveArtifacts artifacts: 'target/*.jar', fingerprint: true</code></td>
              <td>Lưu file kết quả (jar, exe, zip) lại trên Jenkins Server để tải về sau này.</td>
            </tr>
            <tr>
              <td><strong>Lưu kết quả Test</strong></td>
              <td><code>junit 'target/surefire-reports/*.xml'</code></td>
              <td>Đọc file report XML và vẽ biểu đồ kết quả test (Pass/Fail) lên giao diện Jenkins.</td>
            </tr>
            <tr>
              <td><strong>HTML Report</strong></td>
              <td><code>publishHTML(...)</code></td>
              <td>(Cần plugin) Hiển thị báo cáo HTML đẹp mắt (ví dụ: coverage report).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="jenkins-credentials">4. Xử lý Bảo mật (Credentials)</h3>
      <p><strong>Tuyệt đối không</strong> hard-code mật khẩu trong <code>Jenkinsfile</code>. Hãy dùng <code>withCredentials</code>.</p>
      <ol>
        <li>Vào Jenkins → Manage Jenkins → Credentials → Thêm user/pass hoặc Secret text.</li>
        <li>Dùng trong pipeline:</li>
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

      <h3 id="jenkins-docker">5. Docker Integration (Rất quan trọng)</h3>
      <p>Thay vì cài Java, Node, Python lên server Jenkins, hãy dùng Docker container làm môi trường build. Sạch sẽ và cô lập.</p>
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

      <h3 id="jenkins-triggers">6. Triggers &amp; Cron (Lên lịch)</h3>
      <p>Cấu hình khi nào Pipeline sẽ tự động chạy.</p>
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

      <h3 id="jenkins-variables">7. Variables (Biến môi trường)</h3>
      <p>Jenkins cung cấp sẵn các biến toàn cục hữu ích:</p>
      <ul>
        <li><code>\${BUILD_NUMBER}</code>: Số thứ tự lần chạy hiện tại (1, 2, 3...).</li>
        <li><code>\${JOB_NAME}</code>: Tên của Job.</li>
        <li><code>\${WORKSPACE}</code>: Đường dẫn tuyệt đối đến thư mục chứa code trên agent.</li>
        <li><code>\${GIT_COMMIT}</code>: Mã Hash của commit hiện tại.</li>
        <li><code>\${BRANCH_NAME}</code>: Tên nhánh (main, develop) — <em>Chỉ có trong Multibranch Pipeline</em>.</li>
      </ul>

      <h3 id="jenkins-admin">8. Admin &amp; Debugging Tips (Dành cho DevOps Engineer)</h3>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>URL/Lệnh</th>
              <th>Tác dụng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>/restart</code></strong></td>
              <td><code>http://jenkins-url/restart</code> → Restart Jenkins ép buộc.</td>
            </tr>
            <tr>
              <td><strong><code>/safeRestart</code></strong></td>
              <td><code>http://jenkins-url/safeRestart</code> → Đợi các job chạy xong rồi mới Restart (Khuyên dùng).</td>
            </tr>
            <tr>
              <td><strong>Script Console</strong></td>
              <td>Manage Jenkins → Script Console. Nơi chạy lệnh Groovy trực tiếp lên hệ thống (ví dụ: xóa hàng loạt job cũ, clear queue).</td>
            </tr>
            <tr>
              <td><strong>Replay</strong></td>
              <td>Nút "Replay" trên giao diện build. Cho phép sửa nhanh Jenkinsfile và chạy lại thử mà không cần commit code lên Git.</td>
            </tr>
            <tr>
              <td><strong>Linting</strong></td>
              <td>Dùng extension "Jenkins Pipeline Linter Connector" trong VS Code để check cú pháp trước khi commit.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="jenkins-big-picture">Mối liên hệ với AWS/Terraform/Ansible (Bức tranh toàn cảnh)</h3>
      <p>Bạn đã có đủ 3 mảnh ghép. Một quy trình CI/CD chuẩn thực tế sẽ trông như sau:</p>
      <ol>
        <li><strong>Terraform:</strong> Tạo máy chủ EC2, VPC, Security Group trên AWS.</li>
        <li><strong>Ansible:</strong> Cài đặt Docker, cài đặt Java, config môi trường lên EC2 đó.</li>
        <li><strong>Jenkins:</strong>
          <ul>
            <li>Lắng nghe Git commit.</li>
            <li>Build Docker Image của ứng dụng.</li>
            <li>Push Image lên Docker Hub / AWS ECR.</li>
            <li>SSH vào EC2 (dùng plugin SSH Agent) để <code>docker pull</code> và <code>docker run</code> phiên bản mới.</li>
          </ul>
        </li>
      </ol>
    `,
  },
  {
    id: "gitops-cheatsheet",
    title: "GitOps Cheatsheet: ArgoCD &amp; Kubernetes",
    excerpt:
      "Bảng tổng hợp ArgoCD: Kiến trúc GitOps, Cài đặt, CLI, Application Manifest, App of Apps, Sync/Health, Helm và Pro-tips.",
    publishedAt: "2025-01-22T08:30:00.000Z",
    readTime: 14,
    tags: ["GitOps", "ArgoCD", "Kubernetes", "Cheatsheet"],
    tools: ["ArgoCD", "Kubernetes"],
    skills: ["GitOps", "CI/CD", "Kubernetes"],
    image: "/blog/gitops-cheatsheet.svg",
    url: "",
    content: `
      <p>Chào bạn, đây là mảnh ghép cuối cùng trong quy trình CI/CD hiện đại: <strong>GitOps</strong>.</p>
      <p>Nếu Jenkins là "người thợ xây" đóng gói code thành Docker Image, thì <strong>ArgoCD</strong> là "người vận chuyển và giám sát", đảm bảo những gì đang chạy trên Kubernetes (K8s) luôn khớp 100% với những gì bạn khai báo trong Git.</p>
      <p>Dưới đây là <strong>ArgoCD Cheatsheet</strong> chi tiết.</p>

      <h3 id="gitops-concept">1. Kiến trúc &amp; Tư duy GitOps (Concept)</h3>
      <p>Trước khi gõ lệnh, cần hiểu sự khác biệt cốt lõi:</p>
      <ul>
        <li><strong>Jenkins (CIOps/Push):</strong> Build xong → Chạy lệnh <code>kubectl apply</code> để đẩy vào cluster. (Cần lưu <code>kubeconfig</code> trong Jenkins → rủi ro bảo mật).</li>
        <li><strong>ArgoCD (GitOps/Pull):</strong> ArgoCD nằm <strong>bên trong</strong> cluster → Theo dõi Git → Thấy thay đổi → Tự động kéo về và đồng bộ. (An toàn hơn, không lộ credential của cluster ra ngoài).</li>
      </ul>

      <h3 id="gitops-setup">2. Cài đặt &amp; Quản trị cơ bản (Setup)</h3>
      <p>Cài đặt ArgoCD vào K8s cluster.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Hành động</th>
              <th>Lệnh</th>
              <th>Giải thích</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Cài đặt (Install)</strong></td>
              <td><code>kubectl create ns argocd</code><br><code>kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml</code></td>
              <td>Tạo namespace riêng và cài đặt các thành phần (Repo Server, API Server, Controller).</td>
            </tr>
            <tr>
              <td><strong>Lấy Pass mặc định</strong></td>
              <td><code>kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d</code></td>
              <td>User mặc định là <code>admin</code>. Password nằm trong secret này.</td>
            </tr>
            <tr>
              <td><strong>Port Forward</strong></td>
              <td><code>kubectl port-forward svc/argocd-server -n argocd 8080:443</code></td>
              <td>Mở giao diện Web UI tại <code>localhost:8080</code> (nếu chưa cấu hình Ingress).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="argocd-cli">3. ArgoCD CLI (Dòng lệnh)</h3>
      <p>Dù ArgoCD có giao diện Web (UI) rất đẹp, nhưng CLI cần thiết cho automation và debugging.</p>
      <p><strong>Đăng nhập:</strong> <code>argocd login localhost:8080</code> (Sau khi port-forward)</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Lệnh</th>
              <th>Chức năng</th>
              <th>Ví dụ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>argocd app list</code></strong></td>
              <td>Liệt kê các ứng dụng đang quản lý.</td>
              <td>Xem nhanh trạng thái Sync/Health.</td>
            </tr>
            <tr>
              <td><strong><code>argocd app get</code></strong></td>
              <td>Xem chi tiết 1 ứng dụng.</td>
              <td><code>argocd app get my-app</code> (Xem cây resource, lỗi chi tiết).</td>
            </tr>
            <tr>
              <td><strong><code>argocd app sync</code></strong></td>
              <td>Ép đồng bộ thủ công (nếu tắt auto-sync).</td>
              <td><code>argocd app sync my-app</code></td>
            </tr>
            <tr>
              <td><strong><code>argocd app history</code></strong></td>
              <td>Xem lịch sử các lần deploy trước.</td>
              <td>Dùng để rollback nếu cần.</td>
            </tr>
            <tr>
              <td><strong><code>argocd cluster add</code></strong></td>
              <td>Thêm cluster ngoài vào để quản lý.</td>
              <td><code>argocd cluster add context-name</code> (Biến ArgoCD thành control plane quản lý nhiều cluster).</td>
            </tr>
            <tr>
              <td><strong><code>argocd repo add</code></strong></td>
              <td>Kết nối Private Git Repo (qua SSH/HTTPS).</td>
              <td><code>argocd repo add git@github.com:user/repo --ssh-private-key-path ~/.ssh/id_rsa</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="application-manifest">4. Application Manifest (Declarative — Quan trọng nhất)</h3>
      <p>Trong GitOps, bạn không nên tạo app bằng giao diện click chuột. Hãy viết file YAML. Đây là file định nghĩa "Làm thế nào để lấy code từ Git và cài vào K8s".</p>
      <p><strong>File <code>application.yaml</code> mẫu chuẩn:</strong></p>
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

      <h3 id="app-of-apps">5. App of Apps Pattern (Mô hình nâng cao)</h3>
      <p>Làm sao để quản lý 100 ứng dụng (microservices) cùng lúc? Bạn không thể <code>kubectl apply</code> 100 file application lẻ tẻ.<br>Giải pháp là tạo một <strong>"App cha"</strong> chỉ có nhiệm vụ trỏ đến folder chứa các <strong>"App con"</strong>.</p>
      <p><strong>Cấu trúc thư mục Git:</strong></p>
      <pre><code>git-repo/
├── apps/               # Folder chứa App con
│   ├── backend.yaml    # Application: Backend
│   ├── frontend.yaml   # Application: Frontend
│   └── database.yaml   # Application: DB
└── bootstrap.yaml      # App cha (App of Apps)</code></pre>
      <p>Khi bạn deploy <code>bootstrap.yaml</code>, ArgoCD sẽ tự động phát hiện và cài đặt cả backend, frontend và database.</p>

      <h3 id="gitops-troubleshooting">6. Các trạng thái cần lưu ý (Troubleshooting)</h3>
      <p>Trên giao diện ArgoCD, bạn sẽ thấy 2 cột quan trọng:</p>

      <h4 id="sync-status">A. Sync Status (Trạng thái đồng bộ)</h4>
      <ul>
        <li><strong>Synced (Xanh):</strong> Git và K8s giống hệt nhau.</li>
        <li><strong>OutOfSync (Vàng):</strong> Có sự khác biệt.</li>
        <li>Click vào nút "Diff" để xem file nào khác.</li>
        <li>Nếu do code mới → Bấm Sync.</li>
        <li>Nếu do ai đó sửa tay trên K8s → Bấm Sync để ghi đè lại (nếu bật selfHeal thì nó tự làm).</li>
      </ul>

      <h4 id="health-status">B. Health Status (Sức khoẻ ứng dụng)</h4>
      <ul>
        <li><strong>Healthy (Xanh):</strong> Pod đang chạy, Service có Endpoint, PVC đã bind.</li>
        <li><strong>Progressing (Xanh dương):</strong> Đang deploy (Pod đang tạo, chưa ready).</li>
        <li><strong>Degraded (Đỏ):</strong> Lỗi (CrashLoopBackOff, ImagePullBackOff, thiếu ConfigMap...).</li>
        <li><strong>Missing (Xám):</strong> Resource có trong Git nhưng chưa được tạo trên K8s.</li>
      </ul>

      <h3 id="gitops-helm">7. Tích hợp Helm &amp; Kustomize</h3>
      <p>ArgoCD hỗ trợ native cả 2 công cụ này.</p>
      <p><strong>Ví dụ ghi đè giá trị Helm (Helm Values) ngay trong ArgoCD:</strong></p>
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

      <h3 id="gitops-protips">Mẹo thực chiến (Pro-Tips)</h3>
      <ol>
        <li><strong>Đừng bao giờ dùng tag <code>latest</code>:</strong> Trong GitOps, nếu bạn dùng image <code>myapp:latest</code>, khi có image mới đẩy lên, ArgoCD sẽ <strong>không</strong> biết là có thay đổi (vì string "latest" trong git không đổi).<br><em>Giải pháp:</em> Luôn dùng tag phiên bản cụ thể (<code>myapp:v1.2</code>) hoặc mã hash (<code>myapp:sha-a1b2c</code>). Khi đó bạn sẽ commit update version vào Git → ArgoCD nhận diện → Deploy.</li>
        <li><strong>Tách biệt Repo:</strong> Nên tách <strong>Source Code Repo</strong> (Code app) và <strong>Config Repo</strong> (K8s YAML).<br>CI (Jenkins) build code → Push Docker Image → Commit update tag mới vào Config Repo.<br>ArgoCD chỉ listen Config Repo. Điều này giúp tránh vòng lặp build vô tận và quản lý access control tốt hơn.</li>
      </ol>
    `,
  },
  {
    id: "docker-cheatsheet",
    title: "Docker Cheatsheet: Image, Container, Compose &amp; Dockerfile",
    excerpt:
      "Bảng tổng hợp Docker: vòng đời Image, quản lý Container, Debug, Volumes &amp; Networks, Housekeeping, Compose và Best Practices Dockerfile.",
    publishedAt: "2025-01-28T09:00:00.000Z",
    readTime: 14,
    tags: ["Docker", "DevOps", "Containers", "Cheatsheet"],
    tools: ["Docker"],
    skills: ["DevOps", "Containers", "CI/CD"],
    image: "/blog/docker-cheatsheet.svg",
    url: "",
    content: `
      <p>Chào bạn, đây là mảnh ghép nền tảng nhất trong chuỗi công cụ DevOps mà chúng ta đã thảo luận. <strong>Docker</strong> là công nghệ giúp đóng gói ứng dụng để nó chạy giống nhau ở mọi nơi (Laptop của bạn = Server Test = Server Production).</p>
      <p>Dưới đây là <strong>Docker Cheatsheet</strong> toàn diện, từ cơ bản đến thực chiến.</p>

      <h3 id="docker-image-lifecycle">1. Vòng đời của Image (Bản thiết kế)</h3>
      <p>Image là khuôn mẫu (Read-only). Bạn cần có Image để tạo ra Container.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Lệnh</th>
              <th>Giải thích</th>
              <th>Ví dụ thực tế</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>docker build</code></strong></td>
              <td>Tạo Image từ file <code>Dockerfile</code>.</td>
              <td><code>docker build -t my-app:v1 .</code> — (<code>-t</code>: đặt tên tag, <code>.</code>: thư mục hiện tại)</td>
            </tr>
            <tr>
              <td><strong><code>docker pull</code></strong></td>
              <td>Tải Image từ Docker Hub về máy.</td>
              <td><code>docker pull nginx:alpine</code> — (Luôn nên dùng bản <code>alpine</code> cho nhẹ)</td>
            </tr>
            <tr>
              <td><strong><code>docker images</code></strong></td>
              <td>Liệt kê các Image đang có trên máy.</td>
              <td>Kiểm tra xem image đã tải về chưa và dung lượng bao nhiêu.</td>
            </tr>
            <tr>
              <td><strong><code>docker rmi</code></strong></td>
              <td>Xóa Image.</td>
              <td><code>docker rmi &lt;image_id&gt;</code> — (Phải xóa container đang dùng image đó trước)</td>
            </tr>
            <tr>
              <td><strong><code>docker tag</code></strong></td>
              <td>Đổi tên/gán tag mới cho Image (thường dùng trước khi push).</td>
              <td><code>docker tag my-app:v1 user/my-app:final</code></td>
            </tr>
            <tr>
              <td><strong><code>docker push</code></strong></td>
              <td>Đẩy Image lên Registry (Docker Hub, AWS ECR).</td>
              <td><code>docker push user/my-app:final</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="docker-container">2. Quản lý Container (Máy vận hành)</h3>
      <p>Container là phiên bản "sống" của Image.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Lệnh</th>
              <th>Giải thích</th>
              <th>Ví dụ &amp; Lưu ý quan trọng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>docker run</code></strong></td>
              <td>Tạo và khởi động một container mới.</td>
              <td><code>docker run -d -p 80:80 --name web nginx</code> — (<code>-d</code>: chạy ngầm, <code>-p</code>: mở cổng host:container)</td>
            </tr>
            <tr>
              <td><strong><code>docker ps</code></strong></td>
              <td>Liệt kê các container <strong>đang chạy</strong>.</td>
              <td><code>docker ps -a</code> — (Thêm <code>-a</code> để xem cả các container đã tắt/lỗi)</td>
            </tr>
            <tr>
              <td><strong><code>docker stop</code></strong></td>
              <td>Dừng container (gửi tín hiệu SIGTERM).</td>
              <td><code>docker stop web</code></td>
            </tr>
            <tr>
              <td><strong><code>docker start</code></strong></td>
              <td>Bật lại container đã dừng (không tạo mới).</td>
              <td><code>docker start web</code></td>
            </tr>
            <tr>
              <td><strong><code>docker rm</code></strong></td>
              <td>Xóa bỏ container (Container phải stop trước).</td>
              <td><code>docker rm web</code> — <code>docker rm -f web</code> (Ép xóa kể cả đang chạy — cẩn thận)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="docker-debug">3. Gỡ lỗi &amp; Tương tác (Debugging)</h3>
      <p>Khi container bị lỗi hoặc cần kiểm tra bên trong.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Lệnh</th>
              <th>Chức năng</th>
              <th>Ví dụ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>docker logs</code></strong></td>
              <td>Xem log output của container (Quan trọng nhất để debug).</td>
              <td><code>docker logs -f web</code> — (<code>-f</code>: follow, xem log chạy theo thời gian thực giống <code>tail -f</code>)</td>
            </tr>
            <tr>
              <td><strong><code>docker exec</code></strong></td>
              <td>Chạy lệnh bên trong container đang chạy (như SSH vào).</td>
              <td><code>docker exec -it web /bin/sh</code> — (Vào chế độ dòng lệnh của container để kiểm tra file)</td>
            </tr>
            <tr>
              <td><strong><code>docker inspect</code></strong></td>
              <td>Xem chi tiết cấu hình JSON (IP, volume, network...).</td>
              <td><code>docker inspect web</code> — (Dùng để tìm IP của container)</td>
            </tr>
            <tr>
              <td><strong><code>docker stats</code></strong></td>
              <td>Xem thời gian thực CPU/RAM mà container đang ngốn.</td>
              <td>Giống như Task Manager/htop.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="docker-volumes-networks">4. Dữ liệu &amp; Mạng (Volumes &amp; Networks)</h3>
      <p>Container là "vô thường" (ephemeral) — tắt là mất dữ liệu. Muốn lưu dữ liệu bền vững, phải dùng Volume.</p>
      <p><strong>Quản lý Volume:</strong></p>
      <ul>
        <li><code>docker volume create my-data</code>: Tạo ổ đĩa ảo.</li>
      </ul>
      <p><strong>Gắn volume khi run:</strong></p>
      <pre><code>docker run -v my-data:/var/lib/mysql mysql
# Ánh xạ volume 'my-data' vào thư mục dữ liệu của MySQL</code></pre>
      <p><strong>Bind Mount (Dùng cho Dev):</strong> Ánh xạ thư mục code trên máy thật vào container.</p>
      <pre><code>docker run -v \$(pwd):/app node-app
# Sửa code trên máy -> container cập nhật ngay</code></pre>
      <p><strong>Quản lý Network:</strong></p>
      <ul>
        <li><code>docker network create my-net</code>: Tạo mạng riêng.</li>
        <li><code>docker run --network my-net ...</code>: Cho các container nhìn thấy nhau bằng tên (DNS resolution).</li>
      </ul>

      <h3 id="docker-housekeeping">5. Dọn dẹp hệ thống (Housekeeping)</h3>
      <p>Docker rất "ngốn" ổ cứng nếu không dọn dẹp.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Lệnh</th>
              <th>Tác dụng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>docker system prune</code></strong></td>
              <td>Xóa tất cả container đã tắt, mạng không dùng, và cache build (Cẩn thận!).</td>
            </tr>
            <tr>
              <td><strong><code>docker image prune</code></strong></td>
              <td>Xóa các "dangling images" (các image <code>&lt;none&gt;</code> sinh ra khi build lại nhiều lần).</td>
            </tr>
            <tr>
              <td><strong><code>docker volume prune</code></strong></td>
              <td>Xóa các volume không ai dùng (Cẩn thận mất dữ liệu database cũ).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="docker-compose">6. Docker Compose (Orchestration cho Dev)</h3>
      <p>Thay vì gõ 10 lệnh <code>docker run</code>, ta định nghĩa toàn bộ hệ thống (Frontend + Backend + DB) trong 1 file <code>docker-compose.yml</code>.</p>
      <p><strong>File mẫu <code>docker-compose.yml</code>:</strong></p>
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
      <p><strong>Các lệnh Compose:</strong></p>
      <ul>
        <li><strong><code>docker-compose up -d</code></strong>: Dựng toàn bộ hệ thống và chạy ngầm.</li>
        <li><strong><code>docker-compose down</code></strong>: Tắt và xóa toàn bộ container &amp; network (nhưng giữ volume).</li>
        <li><strong><code>docker-compose logs -f</code></strong>: Xem log gộp của tất cả service.</li>
        <li><strong><code>docker-compose build</code></strong>: Build lại image nếu có thay đổi trong Dockerfile.</li>
      </ul>

      <h3 id="dockerfile-best-practices">7. Mẹo viết Dockerfile tối ưu (Best Practices)</h3>
      <ol>
        <li><strong>Multi-stage Build (Giảm dung lượng Image):</strong> Dùng một image để build (có đủ compiler, tool) và một image khác để chạy (chỉ chứa file binary).<br>
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
        <li><strong>Sắp xếp Layer:</strong> Để các lệnh ít thay đổi (như cài thư viện) lên trên, các lệnh hay thay đổi (như copy source code) xuống dưới để tận dụng <strong>Docker Cache</strong>.</li>
        <li><strong><code>.dockerignore</code>:</strong> Luôn tạo file này để loại bỏ <code>.git</code>, <code>node_modules</code>, file rác khỏi context khi build (giúp build nhanh hơn).</li>
      </ol>
    `,
  },
  {
    id: "kubernetes-cheatsheet",
    title: "Kubernetes Cheatsheet: kubectl &amp; Resources",
    excerpt:
      "Bảng tổng hợp K8s: Resource (Pod, Service, Deployment...), get/describe, Debug (logs, exec, port-forward), apply/delete, Context &amp; YAML manifest.",
    publishedAt: "2025-01-29T09:00:00.000Z",
    readTime: 14,
    tags: ["Kubernetes", "kubectl", "DevOps", "Cheatsheet"],
    tools: ["Kubernetes"],
    skills: ["DevOps", "Containers", "Kubernetes"],
    image: "/blog/kubernetes-cheatsheet.svg",
    url: "",
    content: `
      <p>Chào bạn, đây là mảnh ghép "khủng" nhất và cũng là đích đến cuối cùng của hạ tầng hiện đại. Sau khi Docker đóng gói xong, <strong>Kubernetes (K8s)</strong> sẽ chịu trách nhiệm vận hành, nhân bản và tự động hóa hàng nghìn container đó.</p>
      <p>Dưới đây là <strong>Kubernetes Cheatsheet</strong> tập trung vào công cụ dòng lệnh <strong><code>kubectl</code></strong> — vũ khí chính của DevOps Engineer.</p>

      <h3 id="k8s-resources">1. Kiến thức cơ bản về Resource (Các đối tượng chính)</h3>
      <p>Trong K8s, mọi thứ đều là Object. Bạn cần nhớ tên viết tắt của chúng để gõ lệnh cho nhanh.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Tên đầy đủ</th>
              <th>Viết tắt</th>
              <th>Vai trò</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Pod</strong></td>
              <td><code>po</code></td>
              <td>Đơn vị nhỏ nhất, chứa 1 hoặc nhiều container (Docker).</td>
            </tr>
            <tr>
              <td><strong>Service</strong></td>
              <td><code>svc</code></td>
              <td>Cung cấp địa chỉ mạng (IP/DNS) ổn định để truy cập vào Pod.</td>
            </tr>
            <tr>
              <td><strong>Deployment</strong></td>
              <td><code>deploy</code></td>
              <td>Quản lý Pod (tạo mới, update version, scale số lượng).</td>
            </tr>
            <tr>
              <td><strong>Namespace</strong></td>
              <td><code>ns</code></td>
              <td>"Vách ngăn" logic để chia cluster thành nhiều môi trường (dev, prod).</td>
            </tr>
            <tr>
              <td><strong>ConfigMap</strong></td>
              <td><code>cm</code></td>
              <td>Lưu file cấu hình, biến môi trường (không mật).</td>
            </tr>
            <tr>
              <td><strong>Secret</strong></td>
              <td><code>secret</code></td>
              <td>Lưu password, certs, token (mã hóa base64).</td>
            </tr>
            <tr>
              <td><strong>Ingress</strong></td>
              <td><code>ing</code></td>
              <td>Bộ điều hướng HTTP/HTTPS từ ngoài internet vào Service bên trong.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="k8s-viewing">2. Quan sát &amp; Kiểm tra (Viewing Resources)</h3>
      <p>Nhóm lệnh dùng nhiều nhất để trả lời câu hỏi: "Hệ thống đang chạy thế nào?"</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Lệnh</th>
              <th>Giải thích</th>
              <th>Ví dụ thực tế</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>kubectl get</code></strong></td>
              <td>Liệt kê danh sách resource.</td>
              <td><code>kubectl get po</code> (Xem pod) — <code>kubectl get po -o wide</code> (Xem thêm IP, Node) — <code>kubectl get all</code> (Xem tất cả)</td>
            </tr>
            <tr>
              <td><strong><code>kubectl describe</code></strong></td>
              <td>Xem chi tiết cấu hình và <strong>sự kiện (events)</strong> của resource.</td>
              <td><code>kubectl describe po my-pod</code> — (Dùng khi Pod bị lỗi Pending/Error để xem lý do tại phần Events cuối cùng)</td>
            </tr>
            <tr>
              <td><strong><code>kubectl get ... -o yaml</code></strong></td>
              <td>Lấy toàn bộ cấu hình hiện tại ra định dạng YAML.</td>
              <td><code>kubectl get svc my-service -o yaml &gt; backup.yaml</code> — (Backup cấu hình hoặc xem config ẩn)</td>
            </tr>
            <tr>
              <td><strong><code>kubectl top</code></strong></td>
              <td>Xem mức tiêu thụ tài nguyên (CPU/RAM).</td>
              <td><code>kubectl top po</code> (Cần cài Metrics Server).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="k8s-debug">3. Gỡ lỗi Pod (Debugging)</h3>
      <p>Khi Pod bị đỏ (CrashLoopBackOff, Error), hãy dùng combo này.</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Lệnh</th>
              <th>Chức năng</th>
              <th>Ví dụ &amp; Lưu ý</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>kubectl logs</code></strong></td>
              <td>Xem log output của container (stdout).</td>
              <td><code>kubectl logs my-pod</code> — <code>kubectl logs -f my-pod</code> (Follow) — <code>kubectl logs my-pod -c my-container</code> (Nếu pod có nhiều container)</td>
            </tr>
            <tr>
              <td><strong><code>kubectl exec</code></strong></td>
              <td>Chui vào bên trong container đang chạy.</td>
              <td><code>kubectl exec -it my-pod -- /bin/sh</code> — (Giống <code>docker exec</code>, dùng để check file, ping mạng từ bên trong)</td>
            </tr>
            <tr>
              <td><strong><code>kubectl port-forward</code></strong></td>
              <td>Mở cổng từ máy local của bạn thẳng tới Pod (Bỏ qua Ingress/Service).</td>
              <td><code>kubectl port-forward pod/my-db 5432:5432</code> — (Dùng để kết nối DB hoặc test web app từ máy cá nhân mà không cần public IP)</td>
            </tr>
            <tr>
              <td><strong><code>kubectl events</code></strong></td>
              <td>(Mới) Xem dòng thời gian các sự kiện của cluster.</td>
              <td><code>kubectl events --types=Warning</code> (Chỉ xem các cảnh báo lỗi)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="k8s-modifying">4. Tác động &amp; Thay đổi (Modifying Resources)</h3>
      <p>Trong môi trường Prod, ta thường dùng GitOps (ArgoCD) để thay đổi, nhưng khi Debug hoặc Dev, ta dùng lệnh:</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Lệnh</th>
              <th>Giải thích</th>
              <th>Ví dụ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>kubectl apply</code></strong></td>
              <td>Tạo hoặc cập nhật resource từ file YAML.</td>
              <td><code>kubectl apply -f deployment.yaml</code> — (Đây là lệnh chuẩn nhất — Declarative)</td>
            </tr>
            <tr>
              <td><strong><code>kubectl delete</code></strong></td>
              <td>Xóa resource.</td>
              <td><code>kubectl delete -f deployment.yaml</code> — <code>kubectl delete po my-pod</code></td>
            </tr>
            <tr>
              <td><strong><code>kubectl edit</code></strong></td>
              <td>Mở trình soạn thảo (vi/nano) để sửa trực tiếp cấu hình trên cluster.</td>
              <td><code>kubectl edit svc my-service</code> — (Lưu ý: Thay đổi có hiệu lực ngay lập tức. Dùng cẩn thận)</td>
            </tr>
            <tr>
              <td><strong><code>kubectl rollout restart</code></strong></td>
              <td>Khởi động lại toàn bộ Pod trong Deployment (Zero downtime).</td>
              <td><code>kubectl rollout restart deploy/web</code> — (Rất hay dùng khi vừa cập nhật ConfigMap và muốn App nhận cấu hình mới)</td>
            </tr>
            <tr>
              <td><strong><code>kubectl scale</code></strong></td>
              <td>Tăng/giảm số lượng Pod thủ công.</td>
              <td><code>kubectl scale --replicas=5 deploy/web</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="k8s-context">5. Quản lý Context &amp; Namespace (Chuyển môi trường)</h3>
      <p>Làm sao để không xóa nhầm Prod khi đang nghĩ mình ở Dev?</p>
      <div class="overflow-x-auto">
        <table class="blog-table">
          <thead>
            <tr>
              <th>Lệnh</th>
              <th>Tác dụng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><code>kubectl config get-contexts</code></strong></td>
              <td>Xem danh sách các cluster (context) đã kết nối.</td>
            </tr>
            <tr>
              <td><strong><code>kubectl config use-context</code></strong></td>
              <td>Chuyển sang cluster khác. Ví dụ: <code>kubectl config use-context prod-cluster</code>.</td>
            </tr>
            <tr>
              <td><strong><code>kubectl config set-context</code></strong></td>
              <td>Đặt namespace mặc định cho phiên làm việc hiện tại (đỡ phải gõ <code>-n namespace</code> mỗi lần).</td>
            </tr>
            <tr>
              <td><strong>Mẹo:</strong> Cài công cụ <strong><code>kubectx</code></strong> và <strong><code>kubens</code></strong></td>
              <td>Chuyển đổi cực nhanh: <code>kubens dev</code> (Vào namespace dev), <code>kubectx prod</code> (Vào cluster prod).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="k8s-yaml">6. Cấu trúc file YAML cơ bản (Manifest)</h3>
      <p>Bạn không cần nhớ thuộc lòng, nhưng cần hiểu cấu trúc "Bộ khung" của nó.</p>
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

      <h3 id="k8s-troubleshooting">7. Troubleshooting Flow (Quy trình sửa lỗi chuẩn)</h3>
      <p>Khi ứng dụng không chạy, hãy làm theo thứ tự này:</p>
      <ol>
        <li><strong>Check Pod:</strong> <code>kubectl get po</code> → Có status là <em>Running</em> không?</li>
        <li><strong>Nếu Pending:</strong> Hết CPU/RAM hoặc không tìm thấy Node phù hợp → <code>kubectl describe po &lt;tên&gt;</code></li>
        <li><strong>Nếu CrashLoopBackOff:</strong> App khởi động rồi chết ngay → <code>kubectl logs &lt;tên&gt;</code> (Code lỗi).</li>
        <li><strong>Check Service:</strong> Pod chạy nhưng không vào được? → <code>kubectl get svc</code> → Check <em>Endpoints</em> (xem Service có trỏ trúng IP của Pod không).</li>
        <li><strong>Check Ingress:</strong> Service ngon nhưng từ ngoài không vào được? → Check Ingress Controller log.</li>
      </ol>
    `,
  },
  // --- 5 bài blog theo 5 dự án ---
  {
    id: "defi-privacy-institution",
    title:
      "Case Study: Xây dựng hạ tầng DeFi bảo mật (Privacy-Preserving) với AWS Nitro Enclaves & Zero-Knowledge Proofs",
    excerpt:
      "Institutional Privacy: Confidential Computing với Nitro Enclaves (TEE), ZK-SNARKs (Circom/SnarkJS), EKS Prover nodes. Batching giảm 95% Gas. GDPR-compliant.",
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
      <p>Đây là một dự án rất tiên tiến (cutting-edge), kết hợp giữa <strong>Cloud Infrastructure (AWS)</strong>, <strong>Cryptography (ZKP)</strong> và <strong>Blockchain</strong>. Dự án đánh trúng "Chén thánh" của DeFi hiện tại: <strong>Institutional Privacy</strong>. Các tổ chức tài chính muốn tham gia DeFi nhưng không thể để lộ chiến lược giao dịch hoặc dữ liệu khách hàng trên public blockchain. Giải pháp sử dụng <strong>Confidential Computing (AWS Nitro Enclaves)</strong> để giải quyết vấn đề này.</p>

      <p><strong>Tác giả:</strong> Privacy Engineer / Cloud Architect · <strong>Thời gian triển khai:</strong> 2025 – Present · <strong>Công nghệ:</strong> AWS Nitro Enclaves, ZK-SNARKs, AWS EKS, Circom, Golang</p>

      <h3 id="dilemma">1. Bối cảnh: Khi Tổ chức tài chính gặp DeFi</h3>
      <p>Khách hàng của chúng tôi là một tổ chức tài chính tại Mỹ. Họ muốn thực hiện các giao dịch thanh toán trên Blockchain (Settlement Layer) để tận dụng tốc độ và tính thanh khoản, nhưng gặp phải 2 rào cản lớn:</p>
      <ol>
        <li><strong>Privacy (Quyền riêng tư):</strong> Không thể để lộ số dư, người gửi, người nhận trên Public Ledger (như Ethereum) vì lộ chiến lược kinh doanh.</li>
        <li><strong>Compliance (Tuân thủ):</strong> Dữ liệu khách hàng (PII) phải tuân thủ GDPR/CCPA, không được đưa lên chuỗi công khai.</li>
      </ol>
      <p>Nhiệm vụ của tôi là thiết kế một môi trường tính toán "Trustless" (Không cần tin cậy vào con người) để ẩn dữ liệu nhạy cảm bằng công nghệ <strong>Zero-Knowledge Proofs (ZKP)</strong> chạy trong môi trường cách ly phần cứng.</p>

      <h3 id="architecture">2. Giải pháp kiến trúc: Trusted Execution Environment (TEE)</h3>
      <p>Chúng tôi chọn mô hình <strong>Confidential Computing</strong>. Thay vì tính toán trực tiếp trên Blockchain (vừa chậm, vừa lộ dữ liệu), chúng tôi thực hiện tính toán Off-chain trong một môi trường phần cứng được bảo vệ nghiêm ngặt.</p>
      <p><strong>Kiến trúc tổng thể:</strong></p>
      <ol>
        <li><strong>Client:</strong> Gửi dữ liệu giao dịch đã mã hóa (Encrypted Inputs) lên Cloud.</li>
        <li><strong>Secure Enclave (AWS Nitro):</strong> Giải mã, tính toán tính hợp lệ, tạo ra bản chứng thực ZK-Proof.</li>
        <li><strong>Blockchain (Smart Contract):</strong> Chỉ nhận ZK-Proof để xác minh (Verify). Nếu Proof đúng → Giao dịch hợp lệ.</li>
      </ol>

      <h3 id="nitro">3. "Hộp đen" trên Cloud: AWS Nitro Enclaves</h3>
      <p>Đây là trái tim của hệ thống bảo mật. Để đảm bảo ngay cả Dev (tôi) hoặc Admin AWS cũng không thể xem trộm dữ liệu khi đang tính toán, tôi sử dụng <strong>AWS Nitro Enclaves</strong>.</p>
      <ul>
        <li><strong>Isolation (Cô lập):</strong> Nitro Enclaves là các máy ảo (VM) bị cô lập hoàn toàn về CPU và Memory. Chúng không có ổ cứng, không có SSH, không có IP Public.</li>
        <li><strong>Attestation (Chứng thực):</strong> Trước khi gửi "Private Key" hoặc dữ liệu vào Enclave, hệ thống sử dụng KMS để xác minh (Attest) rằng code đang chạy trong Enclave chính xác là code đã được audit, chưa bị sửa đổi.</li>
      </ul>
      <p>Tôi đã xây dựng các Docker Image chứa logic <strong>Circom (circuit)</strong>, convert sang file EIF (Enclave Image Format) và deploy lên các EC2 worker node.</p>

      <h3 id="zkp-pipeline">4. Quy trình ZK-Proof: Từ Circom đến Verifier</h3>
      <p>Quy trình xử lý dữ liệu (Data Flow) diễn ra như sau:</p>
      <ol>
        <li><strong>Circuit Design (Circom):</strong> Viết các mạch logic để kiểm tra số dư (Balance Check) và chữ ký (Signature Check) mà không làm lộ số tiền thực tế.</li>
        <li><strong>Witness Generation:</strong> Bên trong Enclave, Input (số tiền, ví) được nạp vào để tạo Witness.</li>
        <li><strong>Proving (zk-SNARKs):</strong> Sử dụng <code>snarkjs</code> (hoặc thư viện Go <code>gnark</code>) để tạo ra Proof π. Quá trình này rất tốn CPU nên cần chạy trên các instance hiệu năng cao (C6i instances).</li>
        <li><strong>Output:</strong> Enclave chỉ trả về Proof π và Public Inputs (Hash của dữ liệu), tuyệt đối không trả về dữ liệu gốc.</li>
      </ol>

      <h3 id="eks">5. Hạ tầng EKS &amp; Hardening</h3>
      <p>Để quản lý hàng trăm Prover Node (Máy tạo Proof), tôi sử dụng <strong>Amazon EKS (Kubernetes)</strong>.</p>
      <ul>
        <li><strong>DaemonSets:</strong> Triển khai Nitro Enclave Helper trên từng Node.</li>
        <li><strong>Security Groups:</strong> Thiết kế mô hình "Defense in Depth". Các Node EKS nằm trong Private Subnet, chỉ cho phép traffic từ Load Balancer nội bộ thông qua gRPC.</li>
        <li><strong>IAM Roles for Service Accounts (IRSA):</strong> Giới hạn quyền truy cập KMS cực kỳ chặt chẽ. Chỉ có Pod nào có đúng Attestation Document mới được quyền Decrypt dữ liệu input.</li>
      </ul>

      <h3 id="batching">6. Tối ưu hóa chi phí: Batching &amp; Off-chain Computation</h3>
      <p>Xác minh (Verify) một ZK-Proof trên Ethereum tốn khoảng 200k–500k Gas (~$20–$50 tùy thời điểm). Với hàng ngàn giao dịch, chi phí là quá lớn.</p>
      <p>Tôi đã nghiên cứu và triển khai cơ chế <strong>Proof Batching (Aggregation)</strong>:</p>
      <ul>
        <li>Thay vì gửi 100 proofs lẻ lên chuỗi.</li>
        <li>Chúng tôi gộp 100 proofs đó lại thành 1 "Super Proof" (Recursive SNARKs).</li>
        <li>Smart Contract chỉ cần verify 1 lần cho 100 giao dịch.</li>
        <li><strong>Kết quả:</strong> Giảm chi phí Gas trên mỗi giao dịch xuống <strong>95%</strong>.</li>
      </ul>

      <h3 id="challenges">7. Thách thức &amp; Bài học</h3>
      <ul>
        <li><strong>Debugging Enclave:</strong> Vì không thể SSH vào Enclave, việc debug code là cực hình. Tôi phải xây dựng cơ chế logging đặc biệt qua vsock (kênh giao tiếp giữa EC2 cha và Enclave con) để đẩy log ra CloudWatch một cách an toàn (sanitize sensitive data).</li>
        <li><strong>Cold Start:</strong> Khởi động Enclave tốn thời gian. Giải pháp là duy trì một pool các "Warm Enclaves" sẵn sàng nhận request xử lý ngay lập tức.</li>
      </ul>

      <h3 id="results">8. Kết quả đạt được</h3>
      <ul>
        <li><strong>Privacy-First:</strong> Hoàn thiện hệ thống giao dịch ẩn danh tuân thủ GDPR cho khách hàng tổ chức.</li>
        <li><strong>Trustless Architecture:</strong> Loại bỏ sự cần thiết phải tin tưởng vào Admin hệ thống nhờ Cryptographic Proofs và Hardware Isolation.</li>
        <li><strong>Scalability:</strong> Xử lý được ngưỡng 500 TPS (Transactions Per Second) nhờ kiến trúc EKS và Nitro Enclaves.</li>
      </ul>

      <h3 id="technical-deep-dive">Technical Deep Dive: Building the "Black Box"</h3>
      <p>Để hiện thực hóa khái niệm "Trustless Computing", tôi sử dụng quy trình <strong>Docker Multi-stage Build</strong> để tối ưu hóa kích thước của Enclave Image (giảm bề mặt tấn công) và công cụ <code>nitro-cli</code> để chuyển đổi nó thành định dạng <strong>.eif</strong> (Enclave Image Format).</p>

      <h4 id="enclave-dockerfile">1. The Enclave Dockerfile</h4>
      <p>Chúng tôi sử dụng Go cho module <code>zk-prover</code> vì hiệu năng cao và khả năng quản lý bộ nhớ tốt. Dockerfile được tối giản hóa tối đa, chỉ giữ lại binary để chạy trong Enclave.</p>
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
      <p>Sau khi có Docker Image, bước tiếp theo là chuyển đổi nó thành file <strong>.eif</strong> được ký (signed) và đo lường (measured). Đây là bước quan trọng để tạo ra các giá trị <strong>PCR (Platform Configuration Registers)</strong> dùng cho quy trình Attestation sau này.</p>
      <pre><code># Lệnh build EIF bằng nitro-cli
nitro-cli build-enclave \\
  --docker-uri zk-prover-image:latest \\
  --output-file zk_prover_v1.eif \\
  --signing-certificate certificate.pem \\
  --private-key private-key.pem

# Output sẽ trả về PCR0, PCR1, PCR2
# PCR0: Hash của image (Code integrity) -&gt; Dùng để verify trong KMS Policy</code></pre>
      <p>Lưu lại giá trị <strong>PCR0</strong> và cập nhật vào AWS KMS Key Policy. Điều này đảm bảo chỉ có đúng Enclave image này mới có quyền gọi <code>kms:Decrypt</code> để giải mã dữ liệu tài chính.</p>

      <h4 id="run-enclave">3. Running the Enclave on EKS Worker Node</h4>
      <p>Enclave không có Network Interface, nên giao tiếp phải đi qua kênh <strong>Vsock (Virtual Socket)</strong>.</p>
      <pre><code>nitro-cli run-enclave \\
  --cpu-count 2 \\
  --memory 4096 \\
  --eif-path zk_prover_v1.eif \\
  --enclave-cid 16</code></pre>

      <h4 id="vsock-bridge">4. The Bridge: Vsock Communication</h4>
      <p>Proxy service trên Parent Instance chuyển tiếp request từ API Gateway vào Enclave qua vsock. Sử dụng <strong>AF_VSOCK</strong> (thay vì AF_INET).</p>
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

      <h3 id="summary">Tóm lại</h3>
      <p>Dự án này là minh chứng cho việc <strong>Cloud Security</strong> (Nitro Enclaves) và <strong>Web3</strong> (Zero-Knowledge Proofs) có thể kết hợp để giải quyết các bài toán hóc búa nhất về quyền riêng tư dữ liệu trong tài chính.</p>
    `,
  },
  {
    id: "nft-marketplace-web3-security",
    title:
      'Case Study: Triển khai DevSecOps "Shift Left" giảm 85% lỗ hổng cho NFT Marketplace & Web3 Gaming Studio',
    excerpt:
      "DevSecOps + Web3 Security: Shift Left với GitLab CI, Secret Detection, Trivy (SCA), Checkov (IaC), Slither & Foundry (Smart Contract). Giảm 85% vuln, zero secret leaks.",
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
      <p>Đây là một dự án kết hợp giữa <strong>DevSecOps truyền thống</strong> (Container, Cloud) với <strong>Web3 Security</strong> (Smart Contracts). Trong mảng Web3, "Move fast and break things" là một tư duy chết người, vì một lỗi nhỏ trong Smart Contract hoặc lộ Private Key đồng nghĩa với việc mất tiền vĩnh viễn không thể lấy lại.</p>

      <p><strong>Tác giả:</strong> DevSecOps Lead · <strong>Thời gian triển khai:</strong> 2025 · <strong>Công nghệ:</strong> GitLab CI, Checkov, Trivy, Slither, Foundry, AWS Inspector</p>

      <h3 id="stakes">1. Bối cảnh: "Web3 không có nút Undo"</h3>
      <p>Khách hàng của chúng tôi là một Studio Game và NFT Marketplace tại Mỹ. Trong thế giới Web3, bảo mật không chỉ là bảo vệ dữ liệu, mà là bảo vệ <strong>tiền</strong>.</p>
      <ul>
        <li>Một Private Key bị lộ trong Git commit = Mất toàn bộ quỹ dự án.</li>
        <li>Một lỗ hổng Reentrancy trong Smart Contract = Hacker rút cạn Liquidity Pool.</li>
        <li>Một S3 Bucket chứa Metadata NFT bị public = NFT trở nên vô giá trị vì ai cũng có thể sửa ảnh.</li>
      </ul>
      <p>Với quy mô 8 thành viên kỹ thuật đẩy code liên tục lên Mainnet, việc audit thủ công là nút thắt cổ chai. Nhiệm vụ của tôi là tích hợp bảo mật tự động vào ngay trong luồng CI/CD của GitLab.</p>

      <h3 id="shift-left">2. Chiến lược: Shift Left Security</h3>
      <p>Trước đây, bảo mật thường nằm ở bước cuối cùng (Pentest trước khi deploy). Tôi đã đảo ngược quy trình này bằng phương pháp <strong>"Shift Left"</strong>:</p>
      <blockquote><p>Phát hiện lỗi ngay khi Developer vừa commit code, hoặc thậm chí là khi đang gõ code (IDE), thay vì đợi đến khi đã deploy lên Staging/Production.</p></blockquote>
      <p>Mục tiêu: <strong>Pipeline sẽ Fail ngay lập tức nếu phát hiện lỗi bảo mật Critical.</strong></p>

      <h3 id="pipeline">3. Kiến trúc GitLab CI Security Pipeline</h3>
      <p>Tôi đã thiết kế một pipeline chia làm nhiều tầng (stages), mỗi tầng là một màng lọc.</p>

      <h3 id="secret-detection">4. Layer 1: Secret Detection – "Không để chìa khóa dưới thảm"</h3>
      <p>Lỗi sơ đẳng nhưng nguy hiểm nhất trong Web3 là Developer vô tình commit <code>AWS_ACCESS_KEY</code> hoặc <code>PRIVATE_KEY</code> của ví deploy contract lên repo.</p>
      <p><strong>Giải pháp:</strong> Tôi sử dụng tính năng <strong>Secret Detection</strong> tích hợp của GitLab (hoặc Gitleaks) để quét từng commit.</p>
      <ul>
        <li><strong>Cơ chế:</strong> Regex matching các pattern của Private Key (ETH, Solana), AWS Keys, API Tokens.</li>
        <li><strong>Hành động:</strong> Nếu phát hiện, CI job <strong>FAILED</strong> ngay lập tức, chặn đường merge code vào nhánh <code>main</code>.</li>
      </ul>

      <h3 id="sca">5. Layer 2: SCA &amp; Container Security (Trivy)</h3>
      <p>NFT Marketplace sử dụng rất nhiều thư viện Node.js (Frontend) và Python (Backend xử lý dữ liệu off-chain). Các thư viện Web3 (như <code>web3.js</code>, <code>ethers.js</code>) thường xuyên cập nhật và dính CVE.</p>
      <p><strong>Giải pháp:</strong> Tích hợp <strong>Trivy</strong> vào pipeline để quét:</p>
      <ol>
        <li><strong>Dependency Scanning:</strong> Kiểm tra <code>package.json</code> xem có thư viện nào dính CVE đã biết không.</li>
        <li><strong>Container Scanning:</strong> Quét Docker Image trước khi đẩy lên AWS ECR để đảm bảo OS (Alpine/Debian) không có lỗ hổng.</li>
      </ol>

      <h3 id="iac">6. Layer 3: Infrastructure as Code Security (Checkov)</h3>
      <p>Hạ tầng AWS (nơi chứa Metadata của NFT và Server Game) được dựng bằng Terraform. Rủi ro: Developer lỡ tay mở public S3 Bucket hoặc Security Group mở port 22 toàn cầu.</p>
      <p><strong>Giải pháp:</strong> Sử dụng <strong>Checkov</strong> để quét code Terraform (Static Analysis).</p>
      <p><strong>Mẫu cấu hình GitLab CI:</strong></p>
      <pre><code>iac-scanning:
  stage: test
  image: bridgecrew/checkov:latest
  script:
    - checkov -d . --framework terraform --check CKV_AWS_20,CKV_AWS_53
  allow_failure: false # Bắt buộc phải pass mới được deploy</code></pre>
      <p>Điều này đảm bảo không một bucket S3 nào được tạo ra mà thiếu mã hóa (Encryption) hoặc bị public.</p>

      <h3 id="smart-contract">7. Layer 4: Smart Contract Security (The Web3 Special)</h3>
      <p>Đây là phần khác biệt nhất so với các dự án web thông thường. Code Solidity (Smart Contract) cần được kiểm tra cực kỳ gắt gao.</p>
      <p>Tôi kết hợp 2 công cụ mạnh mẽ:</p>
      <ol>
        <li><strong>Slither (Static Analysis):</strong> Quét code Solidity để tìm các lỗi logic phổ biến như Reentrancy, Unchecked external calls, Integer overflow.</li>
        <li><strong>Foundry (Fuzzing):</strong> Chạy các bài test Fuzzing (nhập dữ liệu ngẫu nhiên liên tục) để tìm các trường hợp biên (edge cases) mà Unit Test thông thường bỏ sót.</li>
      </ol>
      <p><strong>Quy trình:</strong> Code Solidity → Slither Scan (tìm lỗi logic) → Foundry Test (chạy giả lập) → Chỉ khi PASS hết mới được deploy lên Testnet/Mainnet.</p>

      <h3 id="results">8. Kết quả &amp; Tác động (The Impact)</h3>
      <p>Sau 6 tháng triển khai hệ thống này:</p>
      <ul>
        <li><strong>Giảm 85% số lượng lỗ hổng</strong> trên môi trường Production (do đã bị chặn từ trứng nước).</li>
        <li><strong>Zero Secret Leaks:</strong> Ngăn chặn thành công 3 lần Developer vô tình commit Private Key của ví Admin.</li>
        <li><strong>Compliance:</strong> Hạ tầng AWS tuân thủ các tiêu chuẩn bảo mật cơ bản nhờ Checkov.</li>
        <li><strong>Văn hóa:</strong> Team Dev hình thành thói quen check bảo mật trước khi push code.</li>
      </ul>

      <h3 id="summary">Tóm lại</h3>
      <p>Dự án này chứng minh rằng <strong>DevSecOps</strong> là tấm khiên không thể thiếu cho các dự án Web3. Bằng cách kết hợp các công cụ quét mã nguồn truyền thống (Checkov, Trivy) với các công cụ chuyên dụng cho Blockchain (Slither, Foundry), chúng ta có thể xây dựng một NFT Marketplace vừa tốc độ, vừa an toàn.</p>
    `,
  },
  {
    id: "siem-security-datalake",
    title:
      "Case Study: Xây dựng Security Data Lake tập trung chuẩn SOC 2 & PCI-DSS cho 50+ AWS Accounts",
    excerpt:
      "Security Data Engineering: Centralized Log Archive, S3 Object Lock (WORM), Athena partitioning, QuickSight anomaly detection. Compliance-ready cho SOC 2 & PCI-DSS.",
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
      <p>Đây là một dự án điển hình về <strong>Security Data Engineering</strong>. Trong bối cảnh compliance (SOC 2, PCI-DSS) ngày càng gắt gao, việc chỉ "bật log" là chưa đủ. Các doanh nghiệp cần một nơi lưu trữ tập trung, không thể bị chỉnh sửa (Immutable) và có khả năng truy vấn nhanh để điều tra.</p>

      <p><strong>Tác giả:</strong> Data Security Engineer · <strong>Thời gian triển khai:</strong> 2024 · <strong>Công nghệ:</strong> Amazon S3 (Object Lock), Athena, QuickSight, Kinesis Firehose</p>

      <h3 id="fragmentation">1. Bối cảnh: "Dữ liệu bị phân mảnh là dữ liệu chết"</h3>
      <p>Khách hàng của chúng tôi vận hành hơn 50 tài khoản AWS. Trong một đợt đánh giá bảo mật (Audit), chúng tôi nhận ra một lỗ hổng lớn:</p>
      <ul>
        <li><strong>Logs Silos:</strong> Logs (CloudTrail, VPC Flow Logs) nằm rải rác ở từng account local. Nếu hacker chiếm quyền account đó, họ có thể xóa logs để phi tang dấu vết.</li>
        <li><strong>Audit Nightmare:</strong> Việc thu thập bằng chứng cho chuẩn SOC 2 và PCI-DSS tốn hàng tuần lễ vì phải truy xuất thủ công từng nơi.</li>
        <li><strong>Lack of Visibility:</strong> Không thể nhìn thấy bức tranh tổng thể về các mối đe dọa đi xuyên qua nhiều tài khoản.</li>
      </ul>
      <p>Nhiệm vụ của tôi là xây dựng một <strong>Centralized Security Data Lake</strong> – một "kho lưu trữ sự thật" duy nhất, bất biến và có khả năng phân tích thời gian thực.</p>

      <h3 id="architecture">2. Kiến trúc giải pháp: Hub-and-Spoke Model</h3>
      <p>Tôi thiết kế mô hình tập trung log về một tài khoản chuyên biệt gọi là <strong>Log Archive Account</strong>.</p>
      <ul>
        <li><strong>Ingestion:</strong> Sử dụng <strong>Kinesis Data Firehose</strong> để stream logs từ 50+ tài khoản nguồn.</li>
        <li><strong>Storage:</strong> Amazon S3 là nơi lưu trữ chính (Data Lake).</li>
        <li><strong>Analytics:</strong> Amazon Athena (Serverless SQL) để truy vấn.</li>
        <li><strong>Visualization:</strong> Amazon QuickSight để vẽ biểu đồ Dashboard.</li>
      </ul>

      <h3 id="object-lock">3. The Vault: Đảm bảo tính toàn vẹn với S3 Object Lock</h3>
      <p>Đối với PCI-DSS và SOC 2, yêu cầu quan trọng nhất là: <strong>"Log không được phép bị chỉnh sửa hoặc xóa dưới mọi hình thức trong thời gian lưu trữ quy định (retention period)."</strong></p>
      <p>Để giải quyết vấn đề "Admin cũng có thể xóa log", tôi đã triển khai <strong>S3 Object Lock</strong> ở chế độ <strong>Compliance Mode</strong>.</p>
      <ul>
        <li><strong>WORM Model (Write Once, Read Many):</strong> Một khi log đã ghi vào S3, không ai (kể cả tài khoản Root của AWS) có thể xóa hoặc ghi đè file đó cho đến khi hết hạn Retention (ví dụ: 1 năm).</li>
        <li><strong>Tamper-Proof:</strong> Đây là lớp bảo vệ cuối cùng chống lại Ransomware hoặc hacker muốn xóa dấu vết truy cập.</li>
      </ul>
      <p><strong>Cấu hình Bucket:</strong></p>
      <pre><code>{
    "ObjectLockEnabled": "Enabled",
    "Rule": {
        "DefaultRetention": {
            "Mode": "COMPLIANCE",
            "Days": 365
        }
    }
}</code></pre>

      <h3 id="athena">4. Tối ưu hóa truy vấn: Partitioning &amp; Athena</h3>
      <p>Với lượng dữ liệu khổng lồ từ 50 accounts, việc chạy một câu lệnh SQL đơn giản như <code>SELECT * FROM logs</code> có thể tốn hàng tiếng đồng hồ và chi phí rất cao (Athena tính tiền theo dung lượng quét).</p>
      <p>Tôi đã tối ưu hóa Data Lake như sau:</p>
      <ol>
        <li><strong>Sử dụng Kinesis Firehose</strong> để nén dữ liệu sang định dạng <strong>Parquet</strong> hoặc <strong>ORC</strong> (giảm dung lượng lưu trữ và tăng tốc độ đọc cột).</li>
        <li><strong>Partitioning (Phân vùng):</strong> Cấu trúc thư mục S3 theo dạng: <code>s3://security-logs/cloudtrail/year=2024/month=01/day=15/</code></li>
        <li><strong>Athena Optimization:</strong> Khi query, tôi bắt buộc sử dụng <code>WHERE partition_date = ...</code>. Kết quả là tốc độ truy vấn giảm từ <strong>15 phút xuống còn 30 giây</strong>, và chi phí giảm 90% do chỉ quét đúng phân vùng cần thiết.</li>
      </ol>

      <h3 id="anomaly">5. Advanced Analytics: Phát hiện bất thường (Anomaly Detection)</h3>
      <p>Chỉ lưu log thôi là chưa đủ, phải biến log thành thông tin tình báo (Intelligence). Tôi tập trung phân tích hành vi truy cập vào các dịch vụ "tử huyệt" của hệ thống: <strong>Private Key Management (KMS/Secrets Manager)</strong> và <strong>Indexer APIs</strong>.</p>
      <p>Tôi đã xây dựng các Dashboard trên <strong>Amazon QuickSight</strong> để trực quan hóa:</p>
      <ul>
        <li><strong>Geo-Location Map:</strong> Cảnh báo đỏ nếu có request truy cập API quản lý khóa từ các quốc gia lạ (ngoài US).</li>
        <li><strong>Volume Spike:</strong> Phát hiện việc tải xuống (GetSecretValue) số lượng lớn trong thời gian ngắn – dấu hiệu của việc rò rỉ dữ liệu (Data Exfiltration).</li>
        <li><strong>Error Rate Analysis:</strong> Theo dõi tỷ lệ <code>AccessDenied</code> tăng đột biến, dấu hiệu của việc hacker đang dò quét quyền hạn (Enumeration).</li>
      </ul>

      <h3 id="challenges">6. Thách thức kỹ thuật</h3>
      <p><strong>Vấn đề:</strong> VPC Flow Logs sinh ra lượng dữ liệu cực lớn (hàng Terabytes mỗi tháng), gây tốn kém chi phí S3 và Athena.</p>
      <p><strong>Giải pháp:</strong> Tôi thiết lập <strong>S3 Lifecycle Policies</strong>.</p>
      <ul>
        <li><strong>Hot Data (0–30 ngày):</strong> Lưu ở S3 Standard để truy vấn nhanh cho điều tra sự cố nóng.</li>
        <li><strong>Cold Data (30 ngày – 1 năm):</strong> Tự động chuyển sang S3 Glacier Instant Retrieval để giảm chi phí lưu trữ nhưng vẫn đảm bảo Compliance (vẫn giữ Object Lock).</li>
      </ul>

      <h3 id="results">7. Kết quả đạt được</h3>
      <ul>
        <li><strong>Compliance Ready:</strong> Đạt chứng nhận SOC 2 Type II và PCI-DSS nhờ cơ chế S3 Object Lock.</li>
        <li><strong>Visibility:</strong> Thời gian điều tra (Forensic) giảm từ <strong>3 ngày xuống còn 2 giờ</strong> nhờ khả năng query tập trung qua Athena.</li>
        <li><strong>Proactive Security:</strong> Phát hiện và ngăn chặn sớm 2 trường hợp truy cập API bất thường từ mạng nội bộ trước khi dữ liệu bị tuồn ra ngoài.</li>
      </ul>

      <h3 id="summary">Tóm lại</h3>
      <p>Dự án này chứng minh rằng Security không chỉ là cài Firewall. Security Data Engineering – việc xây dựng hạ tầng dữ liệu bảo mật vững chắc – là nền tảng để doanh nghiệp đạt được sự tin cậy (Trust) và tuân thủ (Compliance) ở quy mô lớn.</p>
    `,
  },
  {
    id: "crypto-exchange-validator-security",
    title:
      "Case Study: Xây dựng hệ thống phản ứng sự cố tự động (SOAR) cho Sàn giao dịch Crypto & Validator Node",
    excerpt:
      "SOAR trong môi trường Crypto/Blockchain: giảm MTTR từ 45 phút xuống dưới 30 giây. GuardDuty → EventBridge → Lambda: Kill Switch, Forensics Pipeline, Validator Protection, ChatOps Slack.",
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
      <p>Dự án này thuộc lĩnh vực <strong>SOAR (Security Orchestration, Automation, and Response)</strong> trong một môi trường rủi ro cực cao là Crypto/Blockchain. Việc xử lý sự cố thủ công (Manual Response) là quá chậm khi hacker có thể rút cạn ví tiền hoặc chiếm quyền Validator Node chỉ trong vài giây.</p>

      <p><strong>Tác giả:</strong> Security Automation Engineer · <strong>Thời gian triển khai:</strong> 2024 · <strong>Công nghệ:</strong> AWS GuardDuty, Lambda, EventBridge, Python (Boto3)</p>

      <h3 id="stakes">1. Bối cảnh: "60 giây là quá muộn" (The Stakes)</h3>
      <p>Khách hàng của chúng tôi là một Sàn giao dịch tiền điện tử (Crypto Exchange) và nhà cung cấp dịch vụ Validator Node tại Mỹ. Trong thế giới Blockchain, security incident không chỉ là rò rỉ dữ liệu, mà là mất tiền trực tiếp hoặc bị phạt (slashing) nếu Validator Node hoạt động sai lệch.</p>
      <p>Quy trình cũ dựa vào con người: Cảnh báo gửi về Email → SOC Engineer đọc → Login AWS → Kiểm tra → Chặn IP. Tổng thời gian (MTTR) trung bình lên tới <strong>30–45 phút</strong>. Đối với một cuộc tấn công Crypto-jacking hoặc Key Compromise, thời gian này là quá dài.</p>
      <p>Nhiệm vụ của tôi: <strong>Đưa MTTR về dưới 60 giây</strong> bằng tự động hóa hoàn toàn.</p>

      <h3 id="architecture">2. Kiến trúc giải pháp: Event-Driven Security</h3>
      <p>Tôi đã thiết kế một hệ thống "Serverless Security Response" hoạt động 24/7 mà không cần sự can thiệp của con người cho các mối đe dọa High-Severity.</p>
      <p><strong>Luồng hoạt động (Workflow):</strong></p>
      <ul>
        <li><strong>Detect:</strong> Amazon GuardDuty phát hiện hành vi bất thường (VD: EC2 đào coin, API call từ IP lạ).</li>
        <li><strong>Route:</strong> EventBridge bắt lấy finding này và kích hoạt Lambda function tương ứng.</li>
        <li><strong>Act:</strong> AWS Lambda (Python/Boto3) thực thi lệnh trừng phạt (Remediation).</li>
        <li><strong>Notify:</strong> Gửi báo cáo chi tiết về Slack channel của đội SOC.</li>
      </ul>

      <h3 id="kill-switch">3. The "Kill Switch": Tự động cô lập (Automated Containment)</h3>
      <p>Đây là trái tim của hệ thống. Khi GuardDuty báo lỗi nghiêm trọng (VD: <code>CryptoCurrency:EC2/BitcoinTool.B</code> hoặc <code>UnauthorizedAccess:IAM/InstanceCredentialExfiltration</code>), Lambda sẽ kích hoạt ngay lập tức.</p>

      <h4 id="network-isolation">A. Network Isolation (Cô lập mạng)</h4>
      <p>Thay vì tắt (Stop) server ngay lập tức (làm mất dữ liệu RAM để điều tra), tôi sử dụng phương pháp <strong>"Isolation Security Group"</strong>.</p>
      <p>Lambda thực hiện các bước qua Boto3:</p>
      <ol>
        <li>Identify EC2 instance ID từ GuardDuty finding.</li>
        <li>Gỡ bỏ tất cả Security Group hiện tại.</li>
        <li>Gán một Security Group đặc biệt tên là <code>FORENSIC-ISOLATION</code>. Group này <strong>Deny All Inbound/Outbound</strong>, chỉ cho phép duy nhất IP của máy Forensic truy cập qua cổng 22 (SSH) để điều tra.</li>
      </ol>

      <h4 id="identity-revocation">B. Identity Revocation (Thu hồi danh tính)</h4>
      <p>Nếu IAM Role gắn với EC2 bị nghi ngờ lộ credential:</p>
      <ol>
        <li>Lambda tự động gắn policy <code>DenyAll</code> vào Role đó.</li>
        <li>Revoke tất cả active sessions để đá kẻ tấn công ra khỏi hệ thống ngay lập tức.</li>
      </ol>

      <h3 id="forensics">4. Automated Forensics: Giữ lại hiện trường (Evidence Preservation)</h3>
      <p>Hacker thường cố gắng xóa log trước khi rời đi. Hệ thống của tôi chạy đua với hacker để lưu bằng chứng.</p>
      <p>Ngay sau khi cô lập mạng, Lambda kích hoạt quy trình Forensics:</p>
      <ul>
        <li><strong>EBS Snapshot:</strong> Tạo bản sao ổ cứng ngay lập tức với tag <code>Forensic-Case-ID</code>.</li>
        <li><strong>Memory Dump (Optional):</strong> Trigger SSM Run Command để dump RAM (nếu instance vẫn còn phản hồi), giúp phân tích các mã độc chạy in-memory (fileless malware).</li>
      </ul>
      <p>Tất cả quá trình này diễn ra song song trong vòng vài giây sau khi phát hiện.</p>

      <h3 id="validator-protection">5. Bảo vệ Validator Node</h3>
      <p>Validator Node (ETH, SOL, etc.) có đặc thù là phải online liên tục để xác thực block. Việc "cô lập nhầm" sẽ dẫn đến việc bị phạt tiền (Slashing).</p>
      <p>Tôi đã thiết kế logic riêng cho nhóm server này:</p>
      <ul>
        <li><strong>IP Sharding &amp; Port Blocking:</strong> Thay vì chặn toàn bộ, Lambda chỉ tự động update Network ACL (NACL) để chặn các IP độc hại cụ thể đang cố gắng DDoS hoặc Brute-force cổng P2P của Validator.</li>
        <li><strong>Smart Threshold:</strong> Chỉ kích hoạt Isolation hoàn toàn khi độ tin cậy (Confidence Score) của GuardDuty &gt; 8/10.</li>
      </ul>

      <h3 id="chatops">6. ChatOps: Báo cáo thông minh qua Slack</h3>
      <p>Máy làm việc, nhưng người cần nắm quyền kiểm soát. Tôi tích hợp <strong>SNS</strong> và <strong>AWS Chatbot/Webhook</strong> để gửi thông báo về Slack.</p>
      <p><strong>Nội dung tin nhắn Slack bao gồm:</strong></p>
      <ul>
        <li>🚨 <strong>SEVERITY:</strong> HIGH</li>
        <li>🖥 <strong>Instance ID:</strong> i-0123456789</li>
        <li>🛡 <strong>Threat Type:</strong> CryptoCurrency Mining</li>
        <li>🤖 <strong>Action Taken:</strong> ISOLATED &amp; SNAPSHOT TAKEN</li>
        <li>🔗 <strong>Link:</strong> Direct link to AWS Console</li>
      </ul>
      <p>Điều này giúp team SOC biết ngay lập tức rằng "Hệ thống đã xử lý xong, giờ vào điều tra thôi" thay vì "Hệ thống đang bị tấn công, phải làm gì đây?".</p>

      <h3 id="challenges">7. Thách thức kỹ thuật &amp; Giải pháp</h3>
      <p><strong>Vấn đề:</strong> False Positives (Báo động giả). Ví dụ: Một dev chạy script nặng bị nhận diện nhầm là đào coin.</p>
      <p><strong>Giải pháp:</strong> Xây dựng <strong>Whitelist (Allowlist)</strong> trong DynamoDB. Lambda sẽ check DynamoDB trước khi thực hiện hành động. Nếu Instance ID hoặc User nằm trong Whitelist, hệ thống chỉ cảnh báo (Alert) chứ không cô lập (Block).</p>

      <h3 id="results">8. Kết quả (Impact)</h3>
      <ul>
        <li><strong>MTTR giảm 98%:</strong> Từ 45 phút xuống còn dưới <strong>30 giây</strong> kể từ khi phát hiện đến khi cô lập hoàn toàn.</li>
        <li><strong>100% Evidence Retention:</strong> Không có vụ việc nào bị mất dấu vết log do hacker xóa, nhờ snapshot tự động.</li>
        <li><strong>Bảo vệ tài sản:</strong> Ngăn chặn thành công 3 vụ nỗ lực cài cắm miner vào hệ thống Build Server.</li>
      </ul>

      <h3 id="summary">Tóm lại</h3>
      <p>Trong mảng Crypto, bảo mật không chỉ là tuân thủ (compliance) mà là sinh tồn. Việc chuyển đổi từ quy trình thủ công sang <strong>Automated Security Response (SOAR)</strong> bằng AWS Lambda và GuardDuty đã tạo ra một "lớp kén" bảo vệ chủ động, giúp khách hàng an tâm vận hành mạng lưới Validator quy mô lớn.</p>
    `,
  },
  {
    id: "enterprise-cloud-guardrails",
    title:
      "Case Study: Xây dựng hệ thống Security Guardrails &amp; Governance cho 100+ AWS Accounts",
    excerpt:
      "Case Study quy mô 100+ accounts: Landing Zone, SCPs (Region, CloudTrail, IMDSv2), AWS Config, Terraform. Thách thức &amp; bài học thực chiến.",
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
      <p><strong>Tác giả:</strong> Cloud Security Engineer · <strong>Thời gian triển khai:</strong> 2023 – 2024</p>

      <h3 id="context">1. Bối cảnh (The Challenge)</h3>
      <p>Khách hàng của chúng tôi là một doanh nghiệp lớn tại Mỹ với hơn 100 tài khoản AWS (AWS Accounts) phục vụ cho nhiều môi trường: Dev, Staging, Production và Sandbox.</p>
      <p>Với tốc độ phát triển nhanh, việc quản lý thủ công từng tài khoản đã tạo ra các lỗ hổng bảo mật nghiêm trọng:</p>
      <ul>
        <li><strong>Shadow IT:</strong> Các tài nguyên được tạo ở các Region lạ (chi phí cao, latency lớn, rủi ro compliance).</li>
        <li><strong>Tampering:</strong> Rủi ro Logs (CloudTrail) bị tắt bởi admin của account con.</li>
        <li><strong>Vulnerability:</strong> Các EC2 instance cũ vẫn dùng IMDSv1, tiềm ẩn nguy cơ bị tấn công SSRF.</li>
      </ul>
      <p>Vai trò của tôi là thiết kế một khung quản trị (Governance Framework) để chuẩn hóa bảo mật cho toàn bộ tổ chức mà không làm chậm tốc độ của đội Dev.</p>

      <h3 id="solution">2. Kiến trúc giải pháp (The Solution)</h3>
      <p>Chúng tôi quyết định sử dụng mô hình <strong>Landing Zone</strong> dựa trên <strong>AWS Control Tower</strong> và <strong>AWS Organizations</strong>.</p>
      <p>Mô hình được chia thành các Organizational Units (OU):</p>
      <ul>
        <li><strong>Security OU:</strong> Chứa Log Archive và Audit account.</li>
        <li><strong>Workload OU:</strong> Chứa các tài khoản Prod/Non-Prod.</li>
        <li><strong>Sandbox OU:</strong> Môi trường thử nghiệm, ít rào cản hơn.</li>
      </ul>

      <h3 id="scps">3. Thiết lập "Hàng rào thép" với Service Control Policies (SCPs)</h3>
      <p>Đây là phần tôi trực tiếp thiết kế. SCPs hoạt động như một "luật ngầm" đè lên tất cả các tài khoản, kể cả tài khoản root của account con cũng không thể vi phạm.</p>

      <h4 id="region-restriction">A. Region Restriction (Giới hạn vùng địa lý)</h4>
      <p>Để đảm bảo Data Sovereignty và tránh lãng phí chi phí, tôi áp dụng chính sách chỉ cho phép triển khai tài nguyên tại <code>us-east-1</code> và <code>us-west-2</code>.</p>
      <p><strong>Snippet SCP:</strong></p>
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

      <h4 id="cloudtrail-guardduty">B. Bảo vệ "Hộp đen" (CloudTrail &amp; GuardDuty)</h4>
      <p>Một kỹ thuật phổ biến của Hacker là tắt Logging trước khi tấn công. Tôi triển khai SCP để chặn hành động <code>StopLogging</code> hoặc <code>DeleteDetector</code> đối với CloudTrail và GuardDuty trên toàn bộ tổ chức.</p>

      <h3 id="imdsv2">4. Mitigating SSRF: Chuyển đổi toàn diện sang IMDSv2</h3>
      <p>Server-Side Request Forgery (SSRF) là một trong những vectors tấn công nguy hiểm nhất trên Cloud. IMDSv1 (Instance Metadata Service v1) quá lỏng lẻo vì không yêu cầu session token.</p>
      <p><strong>Giải pháp của tôi:</strong></p>
      <ol>
        <li><strong>Enforcement:</strong> Sử dụng SCP để chặn việc tạo mới bất kỳ EC2 Instance nào nếu không bật cờ <code>HttpTokens: required</code> (bắt buộc dùng IMDSv2).</li>
        <li><strong>Migration:</strong> Quét toàn bộ 100+ accounts để tìm các instance cũ và lên kế hoạch nâng cấp.</li>
      </ol>
      <p><strong>Snippet SCP ngăn chặn IMDSv1:</strong></p>
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

      <h3 id="config">5. Giám sát liên tục với AWS Config</h3>
      <p>Chặn (Preventive) là chưa đủ, cần phải giám sát (Detective). Tôi đã xây dựng hệ thống <strong>AWS Config</strong> tập trung (Aggregator) đổ về tài khoản Security.</p>
      <ul>
        <li><strong>Managed Rules:</strong> Kích hoạt các rule có sẵn như <code>s3-bucket-public-read-prohibited</code>, <code>encrypted-volumes</code>.</li>
        <li><strong>Custom Rules:</strong> Viết các logic riêng biệt để phù hợp với compliance của khách hàng.</li>
        <li><strong>Auto-Remediation:</strong> Tự động đóng Security Group nếu mở port 22 (SSH) ra thế giới (0.0.0.0/0).</li>
      </ul>

      <h3 id="terraform">6. Infrastructure as Code (Terraform)</h3>
      <p>Để quản lý cấu hình cho 100+ accounts, ClickOps (làm tay trên giao diện) là điều không thể. Tôi sử dụng <strong>Terraform</strong> để:</p>
      <ul>
        <li>Deploy SCPs và gán vào các OU tương ứng.</li>
        <li>Provision tài khoản mới thông qua AWS Control Tower Account Factory for Terraform (AFT).</li>
        <li>Đảm bảo tính nhất quán (Consistency) giữa môi trường Staging và Production.</li>
      </ul>
      <pre><code>resource "aws_organizations_policy" "guardrails" {
  name    = "guardrails-scp"
  content = file("\${path.module}/scp-deny-unapproved-regions.json")
}

resource "aws_organizations_policy_attachment" "guardrails" {
  policy_id = aws_organizations_policy.guardrails.id
  target_id = aws_organizations_organizational_unit.sec.id
}</code></pre>

      <h3 id="challenges">7. Thách thức &amp; Bài học (Real-world Experience)</h3>
      <ul>
        <li><strong>Thử nghiệm SCP:</strong> Một SCP sai có thể làm "tê liệt" toàn bộ Production. Tôi học được cách luôn phải test SCP trên một OU "Sandbox" và sử dụng tài khoản Canary trước khi Apply global.</li>
        <li><strong>Giao tiếp với Dev:</strong> Việc ép buộc dùng IMDSv2 làm hỏng một số script cũ của đội Dev. Giải pháp là phải có giai đoạn "Soft-launch" (chỉ cảnh báo, chưa chặn) và hướng dẫn họ update AWS SDK.</li>
      </ul>

      <h3 id="results">8. Kết quả đạt được</h3>
      <ul>
        <li><strong>100% Coverage:</strong> Tất cả 100+ accounts đều tuân thủ chính sách Region và Logging.</li>
        <li><strong>Zero IMDSv1:</strong> Loại bỏ hoàn toàn vector tấn công SSRF qua metadata trên các instance mới.</li>
        <li><strong>Tự động hóa:</strong> Giảm 80% thời gian setup tài khoản mới nhờ Terraform và AFT.</li>
      </ul>

      <h3 id="summary">Tóm lại</h3>
      <p>Dự án này không chỉ là về việc cấu hình công cụ, mà là về việc xây dựng văn hóa bảo mật (Security Culture) ở quy mô lớn. Sự kết hợp giữa <strong>AWS Organizations (Quản lý)</strong>, <strong>SCPs (Chặn)</strong> và <strong>Terraform (Tự động hóa)</strong> là chìa khóa để vận hành Cloud Enterprise an toàn.</p>
    `,
  },
];
