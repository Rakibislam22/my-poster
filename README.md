# 🎨 আমার পোস্টার (Amar Poster) — AI 2.0

> **Next-Generation Bangladeshi Political, Cultural & Festive Poster Generation Platform**  
> Engineered with Next.js 16 (App Router & Turbopack), React 19, TypeScript 5, and Tailwind CSS v4.

---

## 🌟 Overview

**আমার পোস্টার (Amar Poster)** is a specialized web platform engineered for generating high-resolution, culturally authentic Bangladeshi political, social, and cultural posters in seconds.

In Bangladesh, creating posters for election campaigns, victory days, religious celebrations, and memorials traditionally requires complex manual work in Photoshop or Illustrator. **Amar Poster** automates this entire pipeline:

- **Calibrated Cultural Layouts**: Pre-configured canvas coordinates tailored for Bangladeshi political banners (prominent candidate frames, top-tier party leader circles, and party symbol/marka slots).
- **Google Gemini AI Slogan Assistant**: 1-click generation and polishing of authentic, rhyming Bengali slogans suited to the selected occasion.
- **5-Tier Resilient Download Engine**: Instant client-side Blob generation that downloads high-resolution PNGs directly to the user's filesystem without blank tabs or redirect interruptions.
- **Enterprise-Grade Admin Moderation**: Complete Super Admin moderation queue with status tracking, search filters, and template re-seeding engines.
- **Modern Dark Glassmorphism UI**: High-performance interface featuring zero-flicker tab switching, custom dark-themed toast notifications (`react-toastify`), and SweetAlert2 confirmation dialogs.

---

## ✨ Key Features & Architecture

### 1. 🚀 Modern Landing & Exploration (`/`)

- **Hero & Dynamic Occasion Switcher**: Interactive showcase featuring live previews for:
  - **মহান বিজয় দিবস (Victory Day)**: 16th December red-and-green tribute with National Memorial motifs.
  - **নির্বাচনী প্রচারণা ও দোয়া প্রার্থী (Election Campaign)**: Parliament, City Corporation, Upazila & Ward election layouts with party symbol and 3 leadership slots.
  - **পবিত্র ঈদ ও উৎসব শুভেচ্ছা (Eid & Festivals)**: Crescent, minaret, and festive Bengali typography.
  - **শোক প্রস্তাব ও বিনম্র শ্রদ্ধাঞ্জলি (Condolence & Memorial)**: Elegant monochrome tribute aesthetics.
- **3-Step Streamlined Journey**: Visual breakdown from template selection to 1-click download.
- **Frictionless Demo Access**: Instant 1-click guest login directly from the navigation bar or auth modal.

### 2. 🖼️ Template Discovery Hub (`/templates`)

- **Calibrated Aspect Ratio (3:2 / 1200×800)**: Standardized dimensions engineered for both digital social media sharing and high-res print outputs.
- **Occasion Filtering**: Fast filtering by category (`all`, `victory_day`, `campaign`, `eid`, `condolence`).
- **Slot Metadata Preview**: Transparent display of available leader slots, dimensions, and typography settings before entering the studio.
- **Direct Creator Handoff**: Deep links directly to `/create?templateId={id}` with selected template parameters locked.

### 3. 🛠️ AI Poster Creator Studio (`/create`)

- **Multi-Slot Portrait Uploader**:
  - **Primary Candidate Slot**: Centered portrait upload with automatic circular/curved masking and bottom blend.
  - **Party Leadership Slots**: Dynamic uploader supporting 1 to 3 top-tier party leaders matching template coordinates.
- **Bilingual Bengali Typography Studio**:
  - Customizable Candidate Name, Designation, Political Party, and Area/Constituency (`ঢাকা-১০`, etc.).
  - Bengali Headline / Dedicated Event Slogans.
  - Publisher / Campaign Credit (`প্রচারে: সর্বস্তরের দেশপ্রেমিক জনগণ`).
- **AI Slogan Assistant (Google Gemini)**:
  - 1-click **"AI দিয়ে স্লোগান পলিশ করুন"** button calls `/api/posters/polish-text`.
  - Automatically synthesizes rhyming, culturally accurate Bengali political slogans and campaign text based on user inputs.
- **Stepped Generation Pipeline**:
  - Live progress indicators (`ছবি আপলোড হচ্ছে...`, `টাইপোগ্রাফি প্রসেস করা হচ্ছে...`, `হাই-রেজ্যুলেশন PNG প্রস্তুত হচ্ছে...`).
- **Full-Screen Lightbox Modal**: High-res preview with zoom controls to inspect typography and portrait alignment before downloading.

### 4. ⚡ 5-Tier Resilient Download Engine (`src/lib/download.ts`)

To eliminate browser pop-up blockers, blank tabs (`about:blank`), and cross-origin download issues, our unified download manager applies a 5-tier fallback strategy:

1. **Tier 1 — Native Blob Fetch**: Fetches image bytes as a binary `Blob`, creates a same-origin `blob:` URL, and triggers an programmatic HTML5 `<a>` click. The browser strictly respects the `download` attribute without opening new tabs.
2. **Tier 2 — Server Attachment Route**: Falls back to the backend `/posters/:id/download` route with HTTP `Content-Disposition: attachment`.
3. **Tier 3 — Cloudinary URL Transformation**: Rewrites Cloudinary URLs dynamically to inject `fl_attachment:poster-[name]`.
4. **Tier 4 — HTML5 Canvas Rasterization**: Loads the image onto an offscreen canvas and triggers native data-URL export (`image/png`).
5. **Tier 5 — Clean Anchor Fallback**: Direct link download fallback.

### 5. 📂 My Posters Dashboard (`/my-posters`)

- **Personal Poster Gallery**: Chronological grid of all user-generated posters with timestamp and occasion tags.
- **Real-Time Moderation Status Badges**:
  - `অপেক্ষমান (Pending)` — Slate/Amber pulse indicator.
  - `অনুমোদিত (Approved)` — Emerald badge with check icon.
  - `বাতিলকৃত (Rejected)` — Rose badge with rejection notes.
  - `ফ্ল্যাগড (Flagged)` — Orange warning badge with moderation reasons.
- **SweetAlert2 Protection**: Secure confirmation modal before deleting posters from cloud storage.
- **1-Click Redownload & Lightbox**: Instant re-downloading with custom timestamped filenames (`poster-[candidate_name].png`).

### 6. 🛡️ Super Admin Control Center (`/admin`)

- **Role-Based Security & 1-Click Testing**: Admin route guard with instant 1-click admin login button for testing environments.
- **Real-Time Analytics KPI Cards**: Live counters for Total Posters, Pending Moderation Queue, Approved, Rejected, Flagged, Total/Active Templates, and Registered Users.
- **Content Moderation Queue**:
  - Real-time search query filtering across Candidate Name, Party, and Slogans.
  - Tabbed status filters (`All`, `Pending`, `Approved`, `Rejected`, `Flagged`).
  - Fast-action moderation buttons: **Approve**, **Reject** (with custom reason prompt), **Flag**, and **Hard Delete**.
  - High-resolution poster inspection modal.
- **Calibrated Template Manager**:
  - Inspect canvas width/height, leader coordinates, and typography slot configurations.
  - Active/Inactive status toggle.
  - **1-Click Database Re-Seed**: Triggers `/admin/templates/reseed` to initialize all standard Bangladeshi templates.
- **Zero-Flicker Architecture**: Multi-tab interface mounted persistently in the DOM with skeleton pulse loaders and stable scroll gutters (`scrollbar-gutter: stable; overflow-y: scroll;`).

### 7. 🔔 Unified Feedback & Notification System

- **Centralized Toast System (`src/lib/notify.ts`)**: Built on `react-toastify` with dark-glassmorphism theme:
  - `notify.success()` — Emerald themed alert.
  - `notify.error()` — Rose themed alert.
  - `notify.info()` — Cyan themed alert.
  - `notify.warning()` — Amber themed alert.
- **Themed Alert Dialogs (`src/lib/alert.ts`)**: Built on `SweetAlert2` (`darkSwal`):
  - Accessible, keyboard-navigable confirmation modals for **Logout** and **Permanent Poster Deletion**.

### 8. 🔐 Authentication & Session Provider (`src/context/AuthContext.tsx`)

- **Stateless JWT Management**: Automatic token storage in `localStorage` (`poster_token`) with Bearer header injection across all API requests.
- **AuthModal**: Tabbed interface for regular email/password login and new user registration.
- **Quick Onboarding Buttons**: Built-in 1-click **Demo User Login** and **Demo Admin Login** for effortless stakeholder evaluation.

---

## 🛠️ Tech Stack

| Layer             | Technology         | Version     | Description                                        |
| :---------------- | :----------------- | :---------- | :------------------------------------------------- |
| **Framework**     | **Next.js**        | `16.3.6`    | App Router, Server Components & Turbopack          |
| **Library**       | **React**          | `19.2.8`    | Modern concurrent UI architecture                  |
| **Language**      | **TypeScript**     | `5.x`       | Strict type safety and end-to-end schema alignment |
| **Styling**       | **Tailwind CSS**   | `v4.x`      | Next-gen CSS engine with custom `@theme` variables |
| **Typography**    | **Google Fonts**   | —           | `Hind Siliguri` (Bengali) & `Inter` (UI Sans)      |
| **Icons**         | **Lucide React**   | `^1.48.0`   | Modern, clean vector iconography                   |
| **Notifications** | **React-Toastify** | `^11.1.0`   | Dark-glassmorphism feedback toasts                 |
| **Dialogs**       | **SweetAlert2**    | `^11.26.25` | Themed modal confirmations                         |
| **AI Engine**     | **Google Gemini**  | —           | Bengali slogan generation & text polishing         |

---

## 📁 Project Structure

```text
my-poster/
├── public/                     # Static assets (favicons, template graphics)
├── src/
│   ├── app/
│   │   ├── admin/              # Super Admin Moderation & Template Center
│   │   │   └── page.tsx        # KPI Analytics, Moderation Queue, Template Reseeder
│   │   ├── create/             # Poster Creator Studio
│   │   │   └── page.tsx        # Multi-slot uploader, Bengali typography, AI Assistant
│   │   ├── my-posters/         # User Dashboard
│   │   │   └── page.tsx        # Saved gallery, moderation badges, direct download
│   │   ├── templates/          # Template Showcase
│   │   │   └── page.tsx        # Occasion filtering, coordinate slot preview
│   │   ├── globals.css         # Tailwind v4 theme, custom scrollbar & glass styles
│   │   ├── layout.tsx          # Root layout with Google Fonts, Navbar, Footer & Toasts
│   │   └── page.tsx            # Modern Landing Page with interactive occasion switcher
│   ├── components/
│   │   ├── AuthModal.tsx       # Tabbed Login & Registration dialog
│   │   ├── Footer.tsx          # Responsive footer with social & platform links
│   │   └── Navbar.tsx          # Glassmorphism navigation, dynamic links, demo buttons
│   ├── context/
│   │   └── AuthContext.tsx     # Global JWT auth state & demo login actions
│   └── lib/
│       ├── alert.ts            # SweetAlert2 dark-theme mixin (logout, delete confirm)
│       ├── api.ts              # Centralized API client with all typed endpoints
│       ├── download.ts         # 5-Tier resilient direct image download engine
│       └── notify.ts           # Centralized React-Toastify notifications
├── .env.local                  # Environment configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and npm scripts
└── tsconfig.json               # TypeScript strict configuration
```

---

## ⚙️ Getting Started & Installation

### 1. Prerequisites

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **Package Manager**: `npm` (v10+), `yarn`, or `pnpm`
- **Backend Service**: Running instance of `my-poster-backend` (Default: `http://localhost:5000/api`)

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Installation

Install project dependencies:

```bash
cd my-poster
npm install
```

### 4. Running Development Server

Start the Turbopack development server:

```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## Available Scripts

| Command         | Purpose                                                           |
| :-------------- | :---------------------------------------------------------------- |
| `npm run dev`   | Runs the Next.js development server with Turbopack on port `3000` |
| `npm run build` | Compiles an optimized, type-checked production build              |
| `npm run start` | Starts the production server                                      |
| `npm run lint`  | Executes ESLint checks across all TypeScript and React components |

---

## 🔌 Connected Backend API Reference

The frontend communicates with `my-poster-backend` via `src/lib/api.ts`. Key endpoints include:

### Authentication

- `POST /api/auth/register` — Create a new user account.
- `POST /api/auth/login` — Sign in with email or phone + password.
- `GET /api/auth/me` — Retrieve current authenticated session.

### Templates

- `GET /api/templates?occasionType={type}` — List active templates filtered by occasion.
- `GET /api/templates/:id` — Retrieve template metadata and layout slots.

### Poster Generation & AI

- `POST /api/upload/single` — Upload candidate portrait to Cloudinary.
- `POST /api/upload/multiple` — Upload leadership portraits to Cloudinary.
- `POST /api/posters/polish-text` — Generate/polish Bengali slogans via Google Gemini.
- `POST /api/posters` — Render and save high-resolution canvas poster.
- `GET /api/posters/my-posters` — Fetch all posters belonging to authenticated user.
- `GET /api/posters/:id` — Get detailed status of a specific poster.
- `POST /api/posters/:id/regenerate` — Re-render existing poster with modified fields.
- `DELETE /api/posters/:id` — Permanently delete a saved poster.

### Super Admin

- `GET /api/admin/overview` — Fetch platform KPIs (posters, users, moderation counts).
- `GET /api/admin/moderation/queue` — Paginated moderation queue with status & search filters.
- `PATCH /api/admin/moderation/:id` — Update moderation status (`approved`, `rejected`, `flagged`).
- `DELETE /api/admin/moderation/:id` — Hard delete a poster as admin.
- `POST /api/admin/templates/reseed` — 1-click re-seed of calibrated templates.
- `PATCH /api/admin/templates/:id/toggle` — Toggle template active/inactive status.

---

## 📄 License

This project is licensed under the **ISC License**.
