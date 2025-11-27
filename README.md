# 🚀 Linkshubb

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-blue)](https://linkshubb.vercel.app)

Linkshubb is a modern link-management platform where users can create, organize, and share personalized link profiles — similar to Linktree but cleaner, faster, and fully customizable.

**Live Demo:** [https://linkshubb.vercel.app](https://linkshubb.vercel.app)

---

## 📌 Features

- 🔐 **Authentication** (NextAuth + Google/GitHub OAuth)
- 🧩 **Create / Edit / Delete** links
- 🎨 **Customizable public profile** (`/username`)
- 📈 Optional analytics tracking (click counts)
- ⚡ **Next.js App Router** + Server Actions
- 📁 **MongoDB + Prisma** for data persistence
- 📱 Fully responsive UI (Tailwind CSS)
- 🚀 Ready for production deployment on Vercel

---

## 🏗️ Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS
- **Backend:** Next.js API Routes / Prisma ORM
- **Database:** MongoDB (Atlas)
- **Authentication:** NextAuth.js
- **Hosting / Deployment:** Vercel

---

## 📂 Project Structure

```bash
linkshubb/
│
├── app/
│   ├── api/
│   │   ├── auth/          → NextAuth routes
│   │   └── links/         → CRUD API handlers
│   ├── dashboard/         → Authenticated user UI
│   └── [username]/        → Public profile pages
│
├── components/            → Reusable UI components
├── lib/
│   ├── auth.ts            → NextAuth config
│   └── db.ts              → Prisma client
│
├── prisma/
│   └── schema.prisma      → Prisma models
│
└── public/                → Assets / screenshots
```

---

## ⚙️ Installation & Setup

### **1. Clone the repository**
```bash
git clone [https://github.com/yourname/linkshubb.git](https://github.com/yourname/linkshubb.git)
cd linkshubb
```

### **2. Install dependencies**
```bash
npm install
```

### **3. Environment Variables**
Create a `.env` file in the root directory:

```env
DATABASE_URL="your-mongodb-atlas-url"

NEXTAUTH_SECRET="your-secret-key"

AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

NEXT_PUBLIC_APP_URL=

POLAR_ACCESS_TOKEN=
POLAR_PRODUCT_ID=
POLAR_SUCCESS_URL=http://localhost:3000/settings

# S3 Configuration for next-s3-upload
S3_UPLOAD_KEY=
S3_UPLOAD_SECRET=
S3_UPLOAD_BUCKET=
S3_UPLOAD_REGION=

```

### **4. Prisma Setup**
```bash
npx prisma generate
npx prisma db push
```

### **5. Run Locally**
```bash
npm run dev
```
App will run at: `http://localhost:3000`

---

## 🔌 API Endpoints

### Authentication (NextAuth)
- `GET /api/auth/session`
- `POST /api/auth/signin`
- `POST /api/auth/signout`

### Links
- `GET    /api/links`            → Fetch all links for authenticated user
- `POST   /api/links`            → Create a new link
- `PUT    /api/links/:id`        → Update a link by ID
- `DELETE /api/links/:id`        → Delete a link by ID

### Public Profile
- `GET /api/public/:username`     → Fetch links for a public user profile

---

## 🖼️ Screenshots

**Dashboard:**
![Dashboard Screenshot](public/screenshots/dashboard-placeholder.png)

**Public Profile Page:**
![Profile Screenshot](public/screenshots/profile-placeholder.png)

**Mobile View:**
![Mobile Screenshot](public/screenshots/mobile-placeholder.png)

*(Add more screenshots in `/public/screenshots` as needed)*

---

## 🌐 Deployment

The project is deployed on Vercel:

- **Frontend + API:** [https://linkshubb.vercel.app](https://linkshubb.vercel.app)
- **Example Public Profile:** [https://linkshubb.vercel.app/aashir](https://linkshubb.vercel.app/aashir)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 💡 Notes

- Make sure MongoDB Atlas is configured and accessible.
- For OAuth, configure GitHub and Google apps and copy client IDs and secrets.
- Screenshots are stored in `/public/screenshots`; update them with your own visuals.
- The project uses Next.js 14 App Router, so all API routes are under `/app/api`.