# 🎨 Amar Poster (আমার পোস্টার) - Frontend

> **Modern Bangladeshi Political & Cultural Poster Generator UI**  
> Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

---

## 🌟 Overview

**Amar Poster** is a specialized web platform engineered for generating high-resolution, culturally calibrated Bangladeshi political, social, and cultural posters in seconds. Users can select occasion-based templates (Election Campaign, Victory Day, Eid Mubarak, Condolences), upload candidate and party leader portraits with automated slot masking, customize bilingual Bengali typography, and trigger instant high-resolution PNG generation and direct download.

The frontend is styled in a modern dark-glassmorphism aesthetic, featuring real-time feedback with `react-toastify`, elegant confirmation modals via `sweetalert2`, and a robust **Super Admin Panel** for content moderation and template management.

---

## ✨ Key Features

### 1. 🚀 Modern Landing & Exploration

- **Hero & Value Proposition**: Clean Bengali & English presentation highlighting calibrated poster design and AI capabilities.
- **Dynamic Occasion Carousel**: Interactive showcases for Election Campaigns, National Days (Victory Day, Independence Day), Eid Festivals, and Memorial Tributes.
- **Quick 1-Click Demo Access**: Immediate guest login to test all generation workflows without manual registration.

### 2. 🖼️ Template Gallery (`/templates`)

- **Calibrated Aspect Ratio (3:2)**: Templates engineered specifically for 1200x800 canvas printing and social media broadcasting.
- **Occasion Categorization**: Instant filtering by campaign, victory day, condolences, and festive celebrations.
- **Pre-selection Protection**: Direct routing to creator studio with selected template locked to prevent accidental template resets.

### 3. 🛠️ Poster Creator Studio (`/create`)

- **Multi-slot Portrait Uploader**:
  - **Candidate Portrait**: Primary portrait slot with automatic circular or curved frame masking.
  - **Leader Photo Slots**: Dynamic slots (1 to 3 leader photos) matching the template's designated coordinates.
- **Bilingual Bengali Typography Customizer**:
  - Candidate Name, Designation, Political Party, and Constituency/Area.
  - Event Headings & Dedicated Slogans.
- **AI Slogan Assistant (Google Gemini)**: 1-click generation of authentic, powerful Bengali political and festival slogans customized to the occasion.
- **Live Preview & Direct Download**: Generates full-resolution PNG and downloads directly to the user's filesystem with appropriate timestamped filenames.

### 4. 📂 My Posters Dashboard (`/my-posters`)

- **Personal Gallery**: View all generated posters with timestamps and occasion tags.
- **Moderation Status Indicators**: Real-time badges (`অপেক্ষমান / Pending`, `অনুমোদিত / Approved`, `বাতিলকৃত / Rejected`, `ফ্ল্যাগড / Flagged`).
- **High-Res Lightbox Modal**: Full-screen preview with instant download and delete actions.
- **SweetAlert2 Confirmation**: Protective confirmation modals before deleting saved posters.

### 5. 🛡️ Super Admin Control Center (`/admin`)

- **Role-based Security**: Automated verification for admin accounts with 1-click admin testing login.
- **Analytics Overview**: Real-time counts for total posters, pending moderation queue, approved, rejected, flagged, active templates, and registered users.
- **Content Moderation Queue**:
  - Filter by moderation status (`All`, `Pending`, `Approved`, `Rejected`, `Flagged`).
  - Search by candidate name, party affiliation, or slogan.
  - Quick decision controls: Approve, Reject (with reason notes), Flag, and Hard Delete.
  - High-res card inspector modal.
- **Zero-Flicker Architecture**: Multi-tab layout persistent in DOM with skeleton pulse loaders and stable scrollbar gutters (`scrollbar-gutter: stable; overflow-y: scroll;`).
- **Calibrated Template Management**: Inspect layout parameters and execute 1-click template database re-seeding via backend seed engine.

### 6. 🔐 Authentication & Feedback System

- **JWT Stateless Auth**: Seamless token storage and user state management.
- **AuthModal**: Supports both regular email/password login and quick registration.
- **SweetAlert2 & React-Toastify**: Themed notification toasts and dialogs for login, generation progress, moderation, and logout.

---

## 🛠️ Tech Stack

| Technology          | Purpose                                             |
| ------------------- | --------------------------------------------------- |
| **Next.js 16.3.6**  | React framework with App Router & Turbopack         |
| **React 19.2.8**    | Modern concurrent UI component library              |
| **TypeScript 5**    | Strict type safety and schema alignment             |
| **Tailwind CSS v4** | Utility-first responsive styling and CSS animations |
| **Lucide React**    | Lightweight modern icon set                         |
| **React-Toastify**  | Customizable toast notification alerts              |
| **SweetAlert2**     | Accessible modal dialogs and alert popups           |

---

## 📁 Project Structure

```text
my-poster/
├── public/                     # Static assets (fonts, icons, placeholders)
├── src/
│   ├── app/
│   │   ├── admin/              # Super Admin Moderation & Template Center
│   │   │   └── page.tsx
│   │   ├── create/             # Poster Creator Studio
│   │   │   └── page.tsx
│   │   ├── my-posters/         # User's Saved Posters Dashboard
│   │   │   └── page.tsx
│   │   ├── templates/          # Template Showcase & Selection
│   │   │   └── page.tsx
│   │   ├── globals.css         # Tailwind v4 theme, custom scrollbar & glass styles
│   │   ├── layout.tsx          # Root layout with Navbar, Footer & ToastContainer
│   │   └── page.tsx            # Modern Landing Page
│   ├── components/
│   │   ├── AuthModal.tsx       # Login & Register Modal Dialog
│   │   ├── Footer.tsx          # Global Responsive Footer
│   │   └── Navbar.tsx          # Dynamic Navigation & User Controls
│   ├── context/
│   │   └── AuthContext.tsx     # Global Authentication State & Session Provider
│   └── lib/
│       └── api.ts              # Centralized Axios/Fetch API client & Endpoints
├── .env.local                  # Environment Configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and npm scripts
└── tsconfig.json               # TypeScript configuration
```

---

## ⚙️ Prerequisites & Setup

### 1. Requirements

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **Package Manager**: `npm` (v10+), `yarn`, or `pnpm`
- **Backend API**: Running instance of `my-poster-backend` (Default: `http://localhost:5000/api`)

### 2. Environment Configuration

Create a `.env.local` file in the root of `my-poster`:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Installation

Navigate into the frontend directory and install dependencies:

```bash
cd my-poster
npm install
```

### 4. Running the Development Server

Start the Next.js Turbopack development server:

```bash
npm run dev
```

Open your browser and visit: **[http://localhost:3000](http://localhost:3000)**

---

## 📜 Available Scripts

| Command         | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| `npm run dev`   | Starts the Next.js development server on `http://localhost:3000` |
| `npm run build` | Compiles optimized production build with type checking           |
| `npm run start` | Starts the production server after building                      |
| `npm run lint`  | Runs ESLint checks across all TypeScript and JSX files           |

---

## 🔗 Connected Services

- **Backend API**: Communicates with `my-poster-backend` for canvas rendering, template schemas, and MongoDB operations.
- **Google Gemini**: Managed through backend proxy endpoints for generating Bengali slogans.
- **Cloudinary**: Receives optimized high-resolution image delivery URLs.

---

## 📄 License

This project is licensed under the ISC License.
