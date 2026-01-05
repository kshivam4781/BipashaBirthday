# Bipasha's Birthday Website 💖

A beautiful, responsive birthday website with dynamic date/time features and a secret space.

## 🚀 Hosting Options

### Option 1: Netlify (Recommended for API Keys) ⭐
**Best if you need API keys or environment variables**

1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com/)
3. Connect your GitHub repository
4. Add environment variables in Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add your API keys (e.g., `WEATHER_API_KEY`, `IMAGE_API_KEY`)
5. Deploy automatically on every push

**Pros:**
- ✅ Free hosting
- ✅ Environment variables support
- ✅ Serverless functions (for API calls)
- ✅ Automatic deployments from GitHub
- ✅ Custom domain support

### Option 2: Vercel (Alternative)
Similar to Netlify, also supports environment variables and serverless functions.

### Option 3: GitHub Pages (Simple, No API Keys)
**Use this if you DON'T need API keys**

1. Push code to GitHub
2. Go to repository Settings → Pages
3. Select branch and folder (usually `main` and `/root`)
4. Your site will be live at `username.github.io/repository-name`

**Limitations:**
- ❌ No environment variables
- ❌ No server-side code
- ❌ API keys would be exposed in JavaScript

## 📁 Project Structure

```
Bipasha/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── netlify.toml        # Netlify configuration (if using Netlify)
├── netlify/
│   └── functions/      # Serverless functions (if needed)
└── README.md           # This file
```

## 🔑 Using API Keys (If Needed - Optional!)

**⚠️ IMPORTANT: You DON'T need any APIs for your website to work!**

Your website is fully functional without any external APIs. Everything works with built-in browser features.

### What are APIs?
APIs let your website get data from other services (like weather, images, quotes). See `API_EXPLANATION.md` for details.

### If You Want to Add APIs Later:

**With Netlify/Vercel:**
1. Store API keys in environment variables (dashboard)
2. Use serverless functions to make API calls
3. Frontend calls your serverless function (not the API directly)

**Example APIs you could add:**
- Weather API (show current weather)
- Image API (fetch random photos)
- Quote API (display daily quotes)

**But again - you don't need any of these!** Your website is complete as-is.

## 🎨 Features

- ✅ Fully responsive design
- ✅ Dynamic date/time greetings
- ✅ Secret space (multiple access methods)
- ✅ Time-based theme changes
- ✅ Birthday countdown
- ✅ No sticky elements
- ✅ Smooth animations

## 🔧 Customization

### Set Birthday Date
Edit `script.js` line 3-5:
```javascript
BIRTHDAY_DATE.setMonth(11); // December (0-indexed)
BIRTHDAY_DATE.setDate(25);  // Day of month
```

### Change Secret Code
Edit `script.js` line 178:
```javascript
const secretCode = 'BIPASHA'; // Change to your secret code
```

## 📝 Notes

- All features work without a backend
- API keys are only needed if you want to add external services (weather, images, etc.)
- The website is fully functional as a static site

