# 🎓 Personal LMS  
> **Transform long programming videos into structured, trackable learning experiences**

A modern Learning Management System designed for developers who want to convert lengthy programming tutorials into organized, bite-sized lessons with progress tracking and personal notes.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Tech Stack](https://img.shields.io/badge/stack-Next.js%2014+-black)](https://nextjs.org/)
[![Deployment](https://img.shields.io/badge/deploy-Docker%20%7C%20Terraform-green)](#-production-deployment)

---

## 🎯 **The Problem**

Programming tutorials are often published as **massive, unstructured videos** (think 4-hour YouTube marathons). These are:
- ❌ Hard to consume in one sitting
- ❌ Impossible to track progress
- ❌ Difficult to reference specific concepts
- ❌ No way to add personal notes

---

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

### 🔐 Authentication & Security
- Supabase Auth (email/password)
- Middleware-protected routes
- Signed video URLs

### 📤 Video Management
- Cloudflare R2 file uploads
- Modular storage provider system
- Secure video streaming

### 🎯 Course Organization
- Intuitive course + lesson builder
- Progress tracking
- Note-taking system

### 🌙 Interface & UX
- Built with `shadcn/ui` + Tailwind CSS
- Clean developer-first design
- Responsive & accessible

---

## 🛠️ **Tech Stack**

| Layer           | Technologies                                                   |
|-----------------|----------------------------------------------------------------|
| **Frontend**    | Next.js 14+ (App Router), React, TypeScript                    |
| **Styling**     | Tailwind CSS, shadcn/ui                                        |
| **Backend**     | Supabase (Auth + Postgres), Prisma ORM                         |
| **Storage**     | Cloudflare R2 (modular provider logic)                         |
| **Infra**       | Docker, Nginx, AWS EC2, Terraform (EC2, IAM, networking)       |
| **CI/CD**       | GitHub Actions (planned)                                       |

---

## 📁 **Project Structure**

```bash
personal-lms/
├── deploy-infra/         # Terraform infra: EC2, IAM, networking
│   ├── modules/
│   │   ├── compute/      # EC2 instance & startup script
│   │   ├── iam/          # IAM roles and policies
│   │   └── networking/   # VPC, subnets, security groups
│   └── terraform.tfvars  # Sensitive variables (excluded from Git)
├── terraform/            # R2 Bucket provisioning (separate module)
├── prisma/               # Prisma DB schema and migrations
├── public/               # Static assets
├── scripts/              # Deployment helper scripts
├── src/
│   ├── app/              # Next.js App Router routes (auth, courses, lessons)
│   ├── components/       # UI components (auth, media, ui, etc.)
│   ├── lib/              # Supabase, R2, auth, and DB logic
│   ├── hooks/            # Custom React hooks
│   └── generated/        # Prisma client output
├── Dockerfile            # Production Docker image
├── docker-compose.yml    # Local development environment
└── README.md             # This file 📘
```

---

## 🚀 **Quick Start**

### 📦 Prerequisites
- Node.js 18+
- Docker (for local or production builds)
- Supabase project (for auth + DB)
- Cloudflare R2 bucket

---

### 1. **Clone & Install**
```bash
git clone https://github.com/edwardbudaza/personal-lms.git
cd personal-lms
npm install
```

---

### 2. **Environment Setup**

Create a `.env.local` file in the root:

```env
# Database
DATABASE_URL=your_supabase_db_url

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudflare R2
R2_ENDPOINT=https://<your-account-id>.r2.cloudflarestorage.com
R2_BUCKET_NAME=course-videos
R2_TOKEN=your_r2_token
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_PUBLIC_DOMAIN=videos.yourdomain.com
```

---

### 3. **Database Setup**

```bash
npx prisma db push
npx prisma studio  # Optional: visual browser
```

---

### 4. **Local Development**

```bash
npm run dev
```

Open `http://localhost:3000` to view the LMS!

---

## 🌐 **Production Deployment**

### 💻 EC2 + Docker Setup (Terraform-managed)

1. **Provision with Terraform**

```bash
cd deploy-infra
terraform init
terraform plan
terraform apply
```

This provisions:
* EC2 instance with Docker + Nginx
* IAM roles and policies
* VPC, subnet, security group
* Auto-start app via `user-data.sh`

2. **Deploy with Docker**

```bash
./scripts/deploy.sh
```

---

## 📖 **How to Use**

### 🪄 Prepare Your Videos
* Use FFmpeg, VLC, or a video editor to cut long videos
* Name your files clearly (e.g., `01-intro.mp4`, `02-setup.mp4`)

### 📚 Create a Course
* Log into the LMS
* Click **Create Course**
* Fill out title and description

### 🎬 Upload Lessons
* Go into your course
* Click **Add Lesson**
* Upload a video and fill out lesson info

### 📝 Learn & Track
* Watch lessons
* Take notes
* Progress auto-saves ✅

---

## 🔮 Roadmap

### ✅ Phase 1: Core
* [x] Supabase Auth
* [x] R2 Upload & Video Player
* [x] Course + Lesson Builder
* [x] Notes + Progress Tracking

### 🚧 Phase 2: Enhancements
* [ ] AI lesson summaries
* [ ] Video timestamp detection
* [ ] Interactive quizzes

### 📋 Phase 3: Collaboration
* [ ] Multi-user support
* [ ] Course sharing
* [ ] Discussions

---

## 🤝 Contributing

Contributions welcome!

1. Fork the repo
2. Create your branch: `git checkout -b feature/feature-name`
3. Commit changes: `git commit -m "✨ New feature"`
4. Push: `git push origin feature/feature-name`
5. Open a Pull Request 🚀

---

## 📄 License

Licensed under the [MIT License](LICENSE)

---

<div align="center">

**"Not all learning happens in classrooms — sometimes, it starts with a YouTube link and an idea."**

⭐ Star this repo if it helps you learn better!

</div>