# 🎓 Personal LMS
> **Transform long programming videos into structured, trackable learning experiences**

A modern Learning Management System designed for developers who want to convert lengthy programming tutorials into organized, bite-sized lessons with progress tracking and personal notes.

[![Deploy Status](https://img.shields.io/badge/deploy-amplify-orange)](https://aws.amazon.com/amplify/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Tech Stack](https://img.shields.io/badge/stack-Next.js%2014+-black)](https://nextjs.org/)

---

## 🎯 **The Problem**

Programming tutorials are often published as **massive, unstructured videos** (think 4-hour YouTube marathons). These are:
- ❌ Hard to consume in one sitting
- ❌ Impossible to track progress
- ❌ Difficult to reference specific concepts
- ❌ No way to add personal notes

## 💡 **The Solution**

This LMS bridges the gap by letting you:
- ✅ **Upload pre-cut video segments** to secure cloud storage
- ✅ **Organize segments into structured courses and lessons**
- ✅ **Track your learning progress**
- ✅ **Add personal notes per lesson**
- ✅ **Stream videos securely** from anywhere

> **Note:** This app doesn't cut videos automatically (yet). You'll need to manually segment videos using tools like FFmpeg, VLC, or your preferred video editor, then upload the segments through the LMS interface.

---

## ✨ **Features**

### 🔐 **Authentication & Security**
- Secure user authentication via Supabase
- Protected video content with signed URLs
- Personal workspace isolation

### 📤 **Video Management**
- Direct upload to Cloudflare R2 storage
- Automatic video optimization
- Secure streaming with CDN delivery

### 🎯 **Course Organization**
- Intuitive course and lesson builder
- Drag-and-drop lesson ordering (Future feature)
- Progress tracking per course

### 📝 **Learning Tools**
- Per-lesson note taking
- Progress indicators
- Completion tracking

### 🎨 **Modern Interface**
- Clean, responsive design
- Dark mode support
- Built with Tailwind CSS + shadcn/ui

---

## 🛠️ **Tech Stack**

<table>
<tr>
<td><strong>Frontend</strong></td>
<td>Next.js 14 (App Router), React, TypeScript</td>
</tr>
<tr>
<td><strong>Styling</strong></td>
<td>Tailwind CSS, shadcn/ui components</td>
</tr>
<tr>
<td><strong>Backend</strong></td>
<td>Supabase (Auth + PostgreSQL), Prisma ORM</td>
</tr>
<tr>
<td><strong>Storage</strong></td>
<td>Cloudflare R2 (video files)</td>
</tr>
<tr>
<td><strong>Infrastructure</strong></td>
<td>Terraform, AWS Amplify (CI/CD)</td>
</tr>
</table>

---

## 📁 **Project Structure**

```
personal-lms/
├── 📁 src/
│   ├── 📁 app/              # Next.js App Router pages
│   ├── 📁 components/       # Reusable UI components
│   │   ├── 📁 auth/         # Authentication components
│   │   ├── 📁 courses/      # Course management UI
│   │   ├── 📁 media/        # Video player & upload
│   │   └── 📁 ui/           # shadcn/ui components
│   ├── 📁 lib/              # Core utilities
│   │   ├── 📁 supabase/     # Database connection
│   │   ├── 📁 storage/      # R2 storage logic
│   │   └── 📁 utils/        # Helper functions
│   ├── 📁 hooks/            # Custom React hooks
│   └── 📁 generated/        # Prisma client
├── 📁 prisma/               # Database schema & migrations
├── 📁 terraform/            # Infrastructure as code
├── 📁 deploy-infra/         # Amplify deployment config
└── 📁 public/               # Static assets
```

---

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### 1. **Clone & Install**
```bash
git clone https://github.com/edwardbudaza/personal-lms.git
cd personal-lms
npm install
```

### 2. **Environment Setup**
Create a `.env.local` file:
```env
# Database
DATABASE_URL=your_supabase_db_url

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudflare R2
R2_ENDPOINT=your_r2_endpoint
R2_BUCKET_NAME=course-videos
R2_TOKEN=your_r2_token
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_PUBLIC_DOMAIN=videos.yourdomain.com
```

### 3. **Database Setup**
```bash
npx prisma db push
npx prisma studio  # Optional: view your database
```

### 4. **Start Development**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your LMS in action! 🎉

---

## 🌐 **Production Deployment**

### **Automated Deployment with Terraform**

The entire infrastructure is provisioned and managed via Terraform:

```bash
# Navigate to deployment config
cd deploy-infra

# Initialize Terraform
terraform init

# Plan deployment
terraform plan

# Deploy everything
terraform apply
```

**What gets deployed:**
- 🔧 AWS Amplify application
- 🔐 IAM roles and permissions
- 🔗 GitHub repository connection
- 🌍 Environment variables injection
- 🚀 Automatic CI/CD pipeline

### **Continuous Deployment**
Every push to `main` triggers automatic deployment:
```bash
git push origin main
```

### **Infrastructure Cleanup**
```bash
terraform destroy
```

---

## 📖 **How to Use**

### **1. Prepare Your Videos**
- Use tools like FFmpeg, VLC, or video editors to split long videos
- Export segments as MP4 files
- Name them descriptively (e.g., `01-introduction.mp4`, `02-setup.mp4`)

### **2. Create a Course**
- Log into your LMS
- Click "Create Course"
- Add course title, description

### **3. Upload Lessons**
- Navigate to your course
- Click "Add Lesson"
- Upload your video segment
- Add lesson title and description

### **4. Learn & Track**
- Play lessons in order
- Add personal notes
- Track your progress automatically

---

## 🔮 **Roadmap**

### **Phase 1: Core Features** ✅
- [x] User authentication
- [x] Video upload & storage
- [x] Course organization
- [x] Progress tracking
- [x] Note taking

### **Phase 2: Enhanced Experience** 🚧
- [ ] Auto-timestamp detection for long videos
- [ ] AI-generated lesson summaries
- [ ] Interactive quizzes
- [ ] Search functionality

### **Phase 3: Collaboration** 📋
- [ ] Multi-user support
- [ ] Course sharing
- [ ] Instructor dashboard
- [ ] Discussion forums

---

## 🤝 **Contributing**

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- Built with ❤️ by [Edward Budaza](https://github.com/edwardbudaza)
- Inspired by the need for better programming education tools
- Special thanks to the open-source community

---

<div align="center">

**"Not all learning happens in classrooms — sometimes, it starts with a YouTube link and an idea."**

⭐ **Star this repo if it helps you learn better!**

</div>