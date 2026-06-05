# Heavy Fitness - Deployment Guide

## Quick Start (Local Development)

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Git (optional, for version control)

### Installation & Running Locally

```bash
# Navigate to project directory
cd /path/to/heavy-fitness

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser. The app hot-reloads on file changes.

---

## Production Deployment Options

### Option 1: Vercel (Recommended - Free, Easiest)

**Step 1: Prepare GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/heavy-fitness.git
git push -u origin main
```

**Step 2: Deploy to Vercel**
1. Visit https://vercel.com/signup (sign up with GitHub)
2. Click "New Project"
3. Select your "heavy-fitness" repository
4. Click "Import"
5. Click "Deploy"

**That's it!** Your app is live. Vercel auto-deploys on every push.

**Free Tier Benefits:**
- Unlimited deployments
- Custom domains
- Auto SSL certificate
- Serverless functions
- 100GB bandwidth/month
- Perfect for production

---

### Option 2: Cloudflare Pages

**Step 1: Build the project**
```bash
npm run build
```

**Step 2: Deploy**
1. Visit https://pages.cloudflare.com
2. Connect your GitHub account
3. Select "heavy-fitness" repository
4. Build command: `npm run build`
5. Build output directory: `.next`
6. Click "Save and Deploy"

**Instant deployment!**

---

### Option 3: Docker (Any Host)

**Build Docker image:**
```bash
docker build -t heavy-fitness:latest .
```

**Run locally:**
```bash
docker run -p 3000:3000 heavy-fitness:latest
```

**Deploy to cloud:**
- Heroku: `heroku container:push web && heroku container:release web`
- AWS: Use ECR + ECS
- Google Cloud: Use Cloud Run
- Azure: Use Container Instances
- DigitalOcean: Use App Platform

---

### Option 4: Railway.app (Free)

1. Visit https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Select heavy-fitness
6. Click "Deploy"

**Free benefits:**
- $5/month free credit
- Auto-scaling
- Custom domains
- Easy database integration

---

### Option 5: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
npm run build
netlify deploy --prod --dir=.next
```

---

## Environment Variables

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_APP_ENV=production
```

For future integrations:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_GOOGLE_API_KEY=your_key
```

---

## Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build
npm install -g webpack-bundle-analyzer
```

### Caching Strategy
- Vercel handles all caching automatically
- Static assets: Cached for 1 year
- Dynamic content: Revalidated on demand

---

## Monitoring & Logs

### Vercel
- Dashboard: https://vercel.com/dashboard
- Logs available in deployment details
- Real-time analytics included free

### Local Debugging
```bash
# See detailed build logs
npm run build -- --debug

# Run with verbose logging
DEBUG=* npm run dev
```

---

## Database Integration (When Needed)

### Option A: Supabase (PostgreSQL)

```bash
# Install Supabase client
npm install @supabase/supabase-js

# Set up environment variables
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Option B: Firebase (Firestore)

```bash
# Install Firebase
npm install firebase

# Configure in your app
```

### Option C: MongoDB

```bash
# Install MongoDB driver
npm install mongodb
```

---

## Scaling Considerations

| Feature | Current | Scaled |
|---------|---------|--------|
| Users | Unlimited (LocalStorage) | 10,000+ (with DB) |
| Data Storage | Browser only | Cloud database |
| Auth | Demo mode | OAuth/Email |
| API Calls | None | Rate-limited |
| Concurrent Users | 100+ | 10,000+ |

---

## Cost Breakdown

**Current Stack (Zero Cost):**
- Frontend hosting: $0 (Vercel free)
- Database: $0 (Browser storage)
- DNS: $0 (Vercel domains)
- SSL: $0 (Automatic)
- Total: **$0/month**

**With Database (Minimal Cost):**
- Vercel: $0 (free tier)
- Supabase: $0 (free tier) → $25/month (paid)
- Total: **$0-25/month**

**With Advanced Features:**
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Custom domain: $10/year
- Total: **$45-55/month** (handles 100k+ users)

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm ci
npm run build
```

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check types
npx tsc --noEmit
```

---

## CI/CD Pipeline (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## Custom Domain Setup

### Vercel
1. Go to Project Settings
2. Domains → Add custom domain
3. Update DNS records at your registrar
4. Done! (SSL auto-configured)

### Cloudflare
1. Add domain to Cloudflare
2. Update nameservers at registrar
3. Point DNS to Vercel
4. Enable proxy in Cloudflare

---

## Backup & Disaster Recovery

```bash
# Backup local data
git commit -am "backup: $(date)"

# Export browser data
localStorage.getItem('user')
localStorage.getItem('workouts')
```

---

## Next Steps

1. **Deploy** using your preferred option above
2. **Share URL** with friends and family
3. **Gather feedback** on features
4. **Add database** when needed
5. **Implement social features**
6. **Scale to production**

---

## Support

- Vercel: https://vercel.com/support
- Cloudflare: https://support.cloudflare.com
- Next.js: https://nextjs.org/docs
- React: https://react.dev

---

**You're ready to deploy! 🚀**

Pick your deployment method above and get your fitness app live in minutes!
