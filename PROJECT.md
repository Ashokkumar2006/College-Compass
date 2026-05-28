# PROJECT.md — Source of Truth
# CollegeCompass — Indian College Discovery & Recommendation Platform

> Paste this file at the start of every new AI conversation.
> This document contains every architectural, design, and product decision made in Phase A planning.

---

## 1. PROBLEM STATEMENT

- **Pain:** Indian higher education data is fragmented, commercially biased, and unreliable
- **Who:** Class 12 students choosing UG colleges (Engineering + Medical streams)
- **Why it matters:** Poor information leads to real financial and career losses
- **Market gap:** No independent, ad-free, student-first platform exists today
- **Primary exams covered:** JEE Main, JEE Advanced, State CETs, NEET

---

## 2. SOLUTION SCOPE

**What we are building:**
A College Recommendation & Discovery Web Platform for Class 12 students in India.

**IN SCOPE (v1):**
- Authentication (login, register, forgot password)
- College search + filter
- College listing + detail pages
- Course listing + detail pages
- College comparison (2-3 colleges side by side)
- Student reviews
- Admission chance prediction
- AI recommendations (OpenAI — rank + stream input)
- Student dashboard (saved, recommendations, activity)
- Admin panel (colleges, users, reviews, analytics)
- SEO-optimized pages (ISR via Next.js)
- Exams + Scholarships pages

**OUT OF SCOPE (v1):**
- Video counseling
- LMS / course content
- Voice AI / chatbot
- Real-time college ERP integration
- Payment gateway

**Differentiator:**
AI intelligence layer — rank + stream → college suggestions, admission probability, budget optimization, career path guidance.

---

## 3. USER FLOWS

### New User
```
Landing Page
→ Search college/course
→ Apply filters
→ Open college page
→ View fees / placements / reviews
→ Compare colleges
→ Save favorite (prompted to login)
→ Login / Register
→ AI recommendation (enter rank + stream)
→ Goal achieved
```

### Returning User
```
Login
→ Dashboard
→ Saved colleges
→ Recent searches
→ Compare
→ Apply decision
```

### Admin
```
Admin Login
→ Dashboard
→ Add / Edit college
→ Manage reviews (approve/reject)
→ Approve data
→ Analytics
```

---

## 4. PAGES INVENTORY

### Public Pages
| Page | Route |
|---|---|
| Home | / |
| Search | /search |
| College Listing | /colleges |
| College Detail | /colleges/[slug] |
| Course Listing | /courses |
| Course Detail | /courses/[slug] |
| Compare Colleges | /compare |
| Exams | /exams |
| Scholarships | /scholarships |
| Blogs | /blogs |
| About | /about |
| Contact | /contact |
| Login | /login |
| Register | /register |
| Forgot Password | /forgot-password |
| 404 | /not-found |

### Student Dashboard
| Page | Route |
|---|---|
| Profile | /dashboard |
| Saved Colleges | /dashboard/saved |
| Recommendations | /dashboard/recommendations |
| Recent Activity | /dashboard/activity |

### Admin Pages
| Page | Route |
|---|---|
| Dashboard | /admin |
| Manage Colleges | /admin/colleges |
| Manage Users | /admin/users |
| Manage Reviews | /admin/reviews |
| Reports | /admin/reports |

---

## 5. COMPONENT INVENTORY (ATOMIC DESIGN)

### Atoms
- `Button.tsx` — primary, secondary, ghost, danger variants
- `Input.tsx` — text, search, password variants
- `Label.tsx`
- `Badge.tsx` — stream, chance (high/medium/low), status badges
- `Icon.tsx`
- `Card.tsx` — base card wrapper

### Molecules
- `SearchBar.tsx` — search input + submit
- `FilterGroup.tsx` — state, fees, rank, course, stream filters
- `ReviewCard.tsx` — rating + comment + user
- `RatingWidget.tsx` — star rating input/display

### Organisms
- `Navbar.tsx` — logo, search, login/signup, stream toggle
- `Footer.tsx`
- `HeroSection.tsx` — rank + stream input → CTA
- `CollegeList.tsx` — paginated college cards
- `ComparisonTable.tsx` — side by side college data
- `ReviewSection.tsx` — list of approved reviews

---

## 6. DATA MODELS

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(STUDENT)
  createdAt DateTime @default(now())
  reviews   Review[]
  favorites Favorite[]
}

enum Role {
  STUDENT
  ADMIN
}

model College {
  id        String   @id @default(cuid())
  name      String
  location  String
  rank      Int?
  fees      Float?
  placement String?
  rating    Float?   @default(0)
  images    String[]
  slug      String   @unique
  createdAt DateTime @default(now())
  courses   Course[]
  reviews   Review[]
  favorites Favorite[]
}

model Course {
  id          String  @id @default(cuid())
  collegeId   String
  college     College @relation(fields: [collegeId], references: [id])
  courseName  String
  duration    String
  eligibility String
}

model Review {
  id        String        @id @default(cuid())
  userId    String
  user      User          @relation(fields: [userId], references: [id])
  collegeId String
  college   College       @relation(fields: [collegeId], references: [id])
  rating    Int
  comment   String
  status    ReviewStatus  @default(PENDING)
  createdAt DateTime      @default(now())
}

enum ReviewStatus {
  PENDING
  APPROVED
  REJECTED
}

model Favorite {
  id        String  @id @default(cuid())
  userId    String
  user      User    @relation(fields: [userId], references: [id])
  collegeId String
  college   College @relation(fields: [collegeId], references: [id])
}

model Exam {
  id             String   @id @default(cuid())
  name           String
  conductingBody String
  eligibility    String
  syllabus       String?
  importantDates Json?
  stream         String
  createdAt      DateTime @default(now())
}

model Scholarship {
  id          String    @id @default(cuid())
  name        String
  eligibility String
  amount      Float?
  deadline    DateTime?
  provider    String
  stream      String
  createdAt   DateTime  @default(now())
}

model Blog {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String
  authorId    String
  publishedAt DateTime @default(now())
}
```

### Relationships
- One College → Many Courses
- One College → Many Reviews
- One User → Many Favorites
- One User → Many Reviews
- Exam → standalone (filtered by stream)
- Scholarship → standalone (filtered by stream)
- Blog → authored by User (via authorId)

---

## 7. TECH STACK

| Layer | Choice |
|---|---|
| Frontend | Next.js 14 (App Router) + React + TypeScript |
| Styling | TailwindCSS |
| Backend | Next.js API Routes |
| ORM | Prisma |
| Database | PostgreSQL (Neon) |
| Auth | NextAuth.js (JWT strategy) |
| AI | OpenAI API |
| Images | Cloudinary |
| Email | Resend |
| State Management | React Context only |
| Deployment | Vercel (app) + Neon (database) |

---

## 8. SYSTEM ARCHITECTURE

```
User (Browser)
└── Next.js App (React + TypeScript + TailwindCSS)
    ├── Public Pages → SSG/ISR (SEO optimized)
    ├── Dynamic Pages → SSR (Search, Compare)
    └── Client Pages → CSR (Dashboard, Admin)
          ↕ REST API
Next.js API Routes (/app/api/*)
    ├── Auth Middleware (JWT verification)
    └── Business Logic
          ↕ Prisma ORM
PostgreSQL on Neon
          ↕
External Services:
├── OpenAI API     → AI recommendations
├── Cloudinary     → College image storage
└── Resend         → Transactional email
```

### Auth Flow
- JWT Access Token — 15 min expiry
- Refresh Token — 7 days, stored in httpOnly cookie
- Protected routes via middleware
- Roles: STUDENT | ADMIN

---

## 9. API ROUTES

| Route | Methods | Purpose |
|---|---|---|
| /api/auth | POST | Login, register, refresh, logout |
| /api/users | GET, PUT, DELETE | Profile management |
| /api/colleges | GET, POST | List, search, filter, create |
| /api/colleges/[slug] | GET, PUT, DELETE | College detail, edit, delete |
| /api/courses | GET, POST | List, create |
| /api/courses/[slug] | GET, PUT, DELETE | Course detail |
| /api/reviews | GET, POST | Fetch, submit |
| /api/reviews/[id] | PUT, DELETE | Approve, reject, delete |
| /api/favorites | GET, POST, DELETE | Save, list, remove |
| /api/recommendation | POST | OpenAI rank+stream → suggestions |
| /api/search | GET | Dedicated search + filter endpoint |
| /api/exams | GET, POST | List, create |
| /api/scholarships | GET, POST | List, create |
| /api/admin | GET | Analytics, overview |
| /api/admin/colleges | GET, POST, PUT, DELETE | Admin college management |
| /api/admin/users | GET, PUT, DELETE | User management |
| /api/admin/reviews | GET, PUT | Review moderation |
| /api/admin/reports | GET | Analytics reports |

---

## 10. FOLDER STRUCTURE

```
/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── search/page.tsx
│   │   ├── colleges/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── courses/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── compare/page.tsx
│   │   ├── exams/page.tsx
│   │   ├── scholarships/page.tsx
│   │   ├── blogs/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── saved/page.tsx
│   │   ├── recommendations/page.tsx
│   │   └── activity/page.tsx
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── colleges/page.tsx
│   │   ├── users/page.tsx
│   │   ├── reviews/page.tsx
│   │   └── reports/page.tsx
│   └── api/
│       ├── auth/route.ts
│       ├── users/route.ts
│       ├── colleges/
│       │   ├── route.ts
│       │   └── [slug]/route.ts
│       ├── courses/route.ts
│       ├── reviews/route.ts
│       ├── favorites/route.ts
│       ├── recommendation/route.ts
│       ├── search/route.ts
│       ├── exams/route.ts
│       ├── scholarships/route.ts
│       └── admin/route.ts
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Label.tsx
│   │   └── Icon.tsx
│   ├── molecules/
│   │   ├── SearchBar.tsx
│   │   ├── FilterGroup.tsx
│   │   ├── ReviewCard.tsx
│   │   └── RatingWidget.tsx
│   └── organisms/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── HeroSection.tsx
│       ├── CollegeList.tsx
│       ├── ComparisonTable.tsx
│       └── ReviewSection.tsx
├── context/
│   ├── AuthContext.tsx
│   ├── CompareContext.tsx
│   └── FavoritesContext.tsx
├── lib/
│   ├── prisma.ts
│   ├── openai.ts
│   ├── cloudinary.ts
│   └── resend.ts
├── prisma/
│   └── schema.prisma
├── types/
│   └── index.ts
├── hooks/
│   └── useAuth.ts
├── middleware.ts          ← protects /dashboard and /admin routes
└── public/
```

---

## 11. DESIGN TOKENS

```css
/* COLORS */
--primary: #4F46E5;           /* Indigo — CTAs, links */
--primary-hover: #4338CA;     /* Darker indigo on hover */
--secondary: #06B6D4;         /* Cyan — accents, badges */
--success: #10B981;           /* Green — high chance, approved */
--warning: #F59E0B;           /* Amber — medium chance, pending */
--danger: #EF4444;            /* Red — low chance, rejected */
--background: #F8FAFC;        /* Soft white-blue page bg */
--surface: #FFFFFF;           /* Card surfaces */
--border: #E2E8F0;            /* Subtle borders */
--text-primary: #0F172A;      /* Near black — headings */
--text-secondary: #64748B;    /* Slate — body, captions */
--text-muted: #94A3B8;        /* Light slate — placeholders */

/* TYPOGRAPHY */
--font-sans: 'Inter';
--font-display: 'Plus Jakarta Sans';

/* SPACING */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;

/* BORDER RADIUS */
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-full: 9999px;

/* SHADOWS */
--shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
--shadow-md: 0 4px 16px rgba(0,0,0,0.08);
--shadow-lg: 0 8px 32px rgba(0,0,0,0.10);

/* ADMISSION CHANCE */
--chance-high: #10B981;
--chance-medium: #F59E0B;
--chance-low: #EF4444;
```

---

## 12. ACCEPTANCE CRITERIA (DEFINITION OF DONE)

### Auth
- User can register with email + password
- User can log in and receive JWT
- Protected routes reject unauthenticated requests
- Refresh token silently renews session
- Forgot password sends reset email via Resend

### College Search & Filter
- Search by name, state, stream
- Filters: fees, rank, course, placements
- Results paginate (20 per page)
- Empty state shows helpful message

### College Detail Page
- Shows name, location, ranking, fees, placements, courses, reviews, images
- SEO meta tags present
- Mobile responsive

### Compare Colleges
- Select 2-3 colleges
- Side by side comparison table
- Fees, ranking, placements, courses compared

### AI Recommendation
- Student enters rank + stream
- OpenAI returns ranked college suggestions
- Each suggestion shows match reason
- Works without login

### Reviews
- Logged-in student submits review + rating
- Pending until admin approves
- Cannot review same college twice
- Rating aggregates on college page

### Favorites
- Save/remove colleges
- Persists across sessions
- Unauthenticated user prompted to login

### Admission Prediction
- Inputs: rank + exam + preferred state
- Returns probability % + High/Medium/Low badge
- Based on historical cutoff data
- Works without login

### Student Dashboard
- Shows saved colleges, recent searches, AI recommendations
- Profile completion status
- Loads within 2 seconds

### Admin — College Management
- Add, edit, delete colleges
- Upload images via Cloudinary
- Changes reflect immediately

### Admin — Review Management
- View pending reviews
- Approve or reject
- Rejected reviews notify user via email

### Admin — User Management
- View all users
- Deactivate accounts
- View user activity

### Admin — Analytics
- Total colleges, users, reviews
- Top searched colleges
- Traffic by stream
- Refreshes daily

### SEO Pages
- Unique meta title + description per college
- OG tags for social sharing
- ISR generation
- Sitemap auto-generated
- Page loads under 3 seconds

### Exams & Scholarships
- Syllabus, dates, eligibility
- Admin manageable
- Filterable by stream

---

## 13. WORKING RULES FOR AI (READ EVERY SESSION)

### Planning Rules
- Guide one step at a time
- No assumptions — ask when unclear
- Keep decisions documented

### Code Rules
- Before writing any component, all existing relevant files must be provided as context
- NEW component → fit exactly into existing stack and conventions
- UPDATE → always return the entire updated file, never partial
- Never bundle multiple components into one prompt
- Follow sequence: layout → data → logic → style → polish

### Prompt Structure (use every time)
```
Context: "Here is my current [component/file]: [paste code]"
Task: "Add [specific thing]"
Constraint: "Using Next.js + TypeScript + TailwindCSS, must work with [existing logic]"
Expected: "Done when [acceptance criteria from Step 8]"
```

---

*Phase A complete. Phase B begins — one component at a time.*
