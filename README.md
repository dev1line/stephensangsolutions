# DevOps Portfolio Website

Website portfolio cá nhân cho DevOps Engineer được xây dựng bằng React.js với tích hợp n8n để tự động upload blog posts.

## Tính năng

- ✨ UI/UX hiện đại và responsive
- 📱 Tối ưu cho mobile và desktop
- 🎨 Animations mượt mà với Framer Motion
- 📝 Tích hợp n8n để tự động cập nhật blog posts
- 📧 Form liên hệ tích hợp với n8n
- 🚀 Performance tối ưu với Vite

## Công nghệ sử dụng

- **React 18** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Icons** - Icon library
- **n8n** - Workflow automation

## Cài đặt

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình n8n Webhook

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Cập nhật `VITE_N8N_WEBHOOK_URL` với URL webhook từ n8n workflow của bạn.

### 3. Chạy development server

```bash
npm run dev
```

Website sẽ chạy tại `http://localhost:3000`

### 4. Build cho production

```bash
npm run build
```

Files sẽ được build vào thư mục `dist/`

## Cấu hình n8n Workflow

### Workflow 1: Lấy Blog Posts

Tạo workflow trong n8n với các nodes:

1. **Webhook Node** (GET)

   - Path: `/webhook/portfolio`
   - Method: GET
   - Query Parameters: `action` (với giá trị `getPosts`)

2. **HTTP Request Node** (hoặc Database/API node)

   - Lấy danh sách bài viết từ nguồn của bạn (RSS, API, Database, etc.)

3. **Code Node** (Transform data)

   ```javascript
   return {
     posts: items.map((item) => ({
       id: item.id,
       title: item.title,
       content: item.content,
       excerpt: item.excerpt || item.content.substring(0, 150),
       image: item.image,
       url: item.url,
       publishedAt: item.publishedAt,
       readTime: item.readTime,
       tags: item.tags || [],
     })),
   };
   ```

4. **Respond to Webhook Node**
   - Return JSON response với format:
   ```json
   {
     "posts": [...]
   }
   ```

### Workflow 2: Tự động Upload Blog Post

Tạo workflow để tự động lấy và upload blog posts:

1. **Schedule Trigger** (hoặc Manual Trigger)

   - Chạy định kỳ (ví dụ: mỗi ngày)

2. **HTTP Request Node**

   - Lấy bài viết mới từ nguồn (RSS feed, API, etc.)

3. **Filter Node**

   - Lọc bài viết mới chưa được upload

4. **Code Node** (Transform)

   - Format dữ liệu bài viết

5. **HTTP Request Node** (hoặc Database Node)

   - Lưu bài viết vào database/storage

6. **Webhook Node** (POST)
   - Gửi thông báo đến website (optional)

### Workflow 3: Xử lý Contact Form

1. **Webhook Node** (POST)

   - Path: `/webhook/portfolio`
   - Method: POST
   - Query Parameters: `action` (với giá trị `contact`)

2. **Code Node** (Validate & Transform)

   ```javascript
   const formData = $input.first();
   return {
     name: formData.json.name,
     email: formData.json.email,
     subject: formData.json.subject,
     message: formData.json.message,
     timestamp: formData.json.timestamp,
   };
   ```

3. **Email Node** (hoặc Database/CRM Node)

   - Gửi email thông báo hoặc lưu vào database

4. **Respond to Webhook Node**
   - Return success response

## Cấu trúc thư mục

```
src/
├── components/          # React components
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Experience.jsx
│   ├── Projects.jsx
│   ├── Blog.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── services/            # API services
│   └── n8nService.js
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Tùy chỉnh

### Cập nhật thông tin cá nhân

Chỉnh sửa các component trong `src/components/`:

- `Hero.jsx` - Thông tin chính và social links
- `About.jsx` - Mô tả về bản thân
- `Skills.jsx` - Kỹ năng và công nghệ
- `Experience.jsx` - Kinh nghiệm làm việc
- `Projects.jsx` - Dự án đã làm
- `Contact.jsx` - Thông tin liên hệ

### Logo khi share link (OG image)

Để link preview hiển thị logo khi share (Discord, Slack, Facebook, v.v.), cần file **PNG** (nhiều nền tảng không hiển thị SVG):

1. Mở `public/og-image.svg` trong trình duyệt hoặc tool chỉnh ảnh.
2. Export / xuất ra PNG kích thước **1200×630** px.
3. Lưu thành `public/og-image.png`.

Hoặc dùng [CloudConvert SVG to PNG](https://cloudconvert.com/svg-to-png) (chọn width 1200, height 630), tải về và đặt tên `og-image.png` vào `public/`.

### Thay đổi màu sắc

Chỉnh sửa `tailwind.config.js` để thay đổi theme colors.

### Thêm sections mới

1. Tạo component mới trong `src/components/`
2. Import và thêm vào `App.jsx`
3. Thêm navigation link trong `Header.jsx`

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload thư mục dist/ lên Netlify
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## License

MIT

## Tác giả

Stephen Sang - DevOps Engineer
