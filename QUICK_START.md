# Heavy Fitness - Quick Start Guide

## 🚀 Get Running in 2 Minutes

### Step 1: Install Dependencies
```bash
npm install
```
**Takes ~1-2 minutes** ☕

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Visit: **http://localhost:3000**

**That's it! You're running the app locally!** 🎉

---

## 📖 First Time Usage

### Create Your Profile
1. The app auto-creates a demo profile
2. Update measurements in **BMI Analysis** page
3. Save your profile

### Log Your First Meal
1. Go to **Calorie Tracker**
2. Click **"Add Food"**
3. Search for "Chicken Breast"
4. Adjust quantity (100g default)
5. Click **"Add"** → See calories update

### Log Your First Workout
1. Go to **Workout Tracker**
2. Click **"New Workout"**
3. Enter name: "First Workout"
4. Click exercise tiles to add (e.g., Pushups)
5. Set 3 sets × 10 reps
6. Click **"Save Workout"** → See calorie burn

### Track Your Weight
1. Go to **Weight Tracking**
2. Enter today's weight
3. Add optional notes
4. Click **"Add Log"** → See weight chart

### View Your Health Analysis
1. Go to **BMI Analysis**
2. See your BMI category (green = good!)
3. Get personalized recommendations
4. Update measurements anytime

---

## 🎯 Key Features

| Feature | Location | Quick Start |
|---------|----------|-------------|
| **Daily Stats** | Dashboard | Open app - see today's summary |
| **Food Logging** | Calorie Tracker | Click "Add Food" → search → add |
| **Workout Logging** | Workout Tracker | Click "New Workout" → select exercises |
| **Weight Progress** | Weight Tracking | Enter weight → see trend |
| **Health Tips** | BMI Analysis | Update measurements → get recommendations |
| **Trainers Guides** | Trainer | Pick difficulty → select exercise |
| **Meal Plans** | Diet Plans | Click "New Plan" → set calorie goal |

---

## 💡 Tips

- **All data stored locally** - no login needed
- **Auto-calculate calories** - just log sets/reps
- **Quantity matters** - adjust from default 100g
- **Charts update live** - see progress instantly
- **No wifi needed** - everything works offline (after first load)

---

## 🔧 Common Commands

```bash
# Start development (with auto-reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Check for errors
npx tsc --noEmit

# Clean and reinstall
rm -rf node_modules && npm install
```

---

## 📱 Mobile Usage

The app works great on mobile! Just:
1. Open on your phone's browser
2. Install as PWA (optional)
3. Use same way as desktop

---

## ❓ FAQ

**Q: How do I delete data?**
A: Open browser DevTools (F12) → Application → LocalStorage → clear

**Q: Can I backup my data?**
A: Copy from browser console: `JSON.stringify(localStorage)`

**Q: How do I change my stats?**
A: Go to BMI Analysis → update measurements → save

**Q: Where's my data saved?**
A: Browser's LocalStorage (computer/phone only)

**Q: Can I share with friends?**
A: Not yet - future feature! For now, each person needs their own browser

---

## 🚀 Next: Deploy to Internet

When ready to share online:

```bash
# Quick deploy to Vercel (easiest)
npm run build
# Then follow steps in DEPLOYMENT.md
```

---

## 📚 Learn More

- **Architecture**: See `app/` folder structure
- **Components**: See `components/` folder
- **Styling**: Edit `tailwind.config.js`
- **Full Guide**: Read `README.md`
- **Deployment**: Read `DEPLOYMENT.md`

---

## 🎓 Learning Claude Code

This project teaches:
- ✅ React Hooks (useState, useEffect)
- ✅ TypeScript components
- ✅ Tailwind CSS styling
- ✅ Data visualization (Recharts)
- ✅ State management
- ✅ Form handling
- ✅ Browser storage
- ✅ Responsive design

---

**Ready? Type `npm run dev` and see your fitness app come alive!** 💪

Questions? Check README.md or DEPLOYMENT.md
