#  FinWise — AI-Powered Personal Finance Coach

> **Live Demo:** https://finwise-amber.vercel.app

FinWise is a full-stack AI web app that helps users track, analyze, and optimize their personal finances.

Built with **Next.js 16 (App Router)**, **MongoDB**, and **Google Gemini API**, FinWise offers interactive expense tracking, smart AI insights, and one-click PDF reporting in a modern, responsive Tailwind UI.

-

Features
- **Secure Authentication
- Email/password and Google OAuth (NextAuth.js)
- **Expense Management
- Add, edit, delete expenses by category
- Zod-validated API routes for safe input
- **Data Visualization
- Real-time bar and pie charts with Chart.js
- **AI Insights (Gemini)
- Monthly analysis of spending patterns
- Caching of AI responses by user/month for instant re-runs
- **PDF Export
- Save AI reports with `html2canvas` + `jsPDF`
- **Responsive Tailwind UI
- Dark/light mode friendly
Clean design built for mobile and desktop

- ⚡ **Deployed on Vercel**

- Serverless routes, global edge caching

---
Tech Stack
| Category   | Technologies |
|------------|--------------|
| Frontend   | Next.js 16 (App Router), React 18, Tailwind CSS |
| Backend    | NextAuth v5, Mongoose, Zod |
| Database   | MongoDB Atlas |
|AI Engine   | Google Gemini API |
| Graphs     | Chart.js + react-chartjs-2 |
| PDF Export | html2canvas, jsPDF |
| Deployment | Vercel |

---
Setup of Local Development Environment
1 Clone the Repository
git clone https://github.com/yourusername/finwise.git


cd finwise
npm install
2 Create Environment Variables
Create a .env.local file in the root:
MONGODB_URI=your-mongodb-uri
NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=any-strong-random-string

GEMINI_API_KEY=your-gemini-api-key

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
3 Run Locally

npm run dev

Open http://localhost:3000

4 Build for Production

npm run build

npm start

☁️ Deployment (Vercel)
Push code to GitHub

Go to https://vercel.com → New Project → Import from GitHub

Framework preset: Next.js
Add environment variables (same as .env.local)

Deploy 

Your application will be available at:
https://finwise-amber.vercel.app
Google OAuth Configuration

In Google Cloud Console → OAuth Client ID:

Authorized JavaScript origins
https://finwise-amber.vercel.app
http://localhost:3000

Authorized redirect URIs
https://finwise-amber.vercel.app/api/auth/callback/google
http://localhost:3000/api/auth/callback/google

System Architecture

┌───────────────────────────┐
│       User Interface      │
│ Next.js + Tailwind + JS   │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│       API Routes          │
│  (Next.js App Router)     │
│  /api/expenses            │
│  /api/ai-analysis         │
└─────────────┬─────────────┘
              │
              │
              ▼
┌───────────────────────────┐

│      MongoDB Atlas        │

│ User, Expense, Analysis   │

└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│     Google Gemini API     │
│ (AI Insights Generation)  │
└───────────────────────────┘



Improvements that can be done in future 
Budget goals & savings tracker 
Weekly AI digest email via cron jobs 
Multi-currency support 
Voice-command interface (integration with Gemini Pro Voice) 

Author 
Santanu Singh 
GitHub:https://github.com/Santanu-11
