# Deployment Guide — CollegeCompass

## Deploy to Vercel (Recommended)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/college-compass.git
git push -u origin main
```

### Step 2 — Connect to Vercel
1. Go to vercel.com and sign up with GitHub
2. Click "New Project"
3. Import your college-compass repository
4. Click Deploy

### Step 3 — Add Environment Variables
In Vercel dashboard → Settings → Environment Variables, add:
- DATABASE_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL (set to your vercel domain)
- OPENAI_API_KEY
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- RESEND_API_KEY

### Step 4 — Run Database Migration
After deployment, run:
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

## After Deployment
- Test all pages on production URL
- Set NEXTAUTH_URL to your production domain
- Enable Neon database connection pooling