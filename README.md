**🚀 Smart Bookmark App**

A modern, real-time bookmark manager built with Next.js, Supabase, and Tailwind CSS.

This application allows users to securely store, manage, and sync bookmarks across multiple tabs instantly using Google OAuth authentication.

**🌐 Live Demo**

**🔗 Production URL:**
https://smart-bookmark-pi-puce.vercel.app

**📦 GitHub Repository:**
https://github.com/Naveen100299/smart-bookmark

**✨ Features**

* 🔐 Google OAuth Authentication (No email/password)

* ➕ Add bookmarks (Title + URL)

* 🔄 Real-time updates across multiple tabs

* 🔒 Row-Level Security (Users only see their own bookmarks)

* 🗑 Delete bookmarks

* ✏️ Edit bookmarks

* 🔍 Sort bookmarks (Newest / Oldest)

* 🌐 Favicon auto-preview for links

* 🔔 Toast notifications (Success/Error feedback)

* 📱 Fully responsive design

* 🎨 Premium startup-style UI

* 🚀 Deployed on Vercel

**🛠 Tech Stack**

**Frontend:** Next.js (App Router)

**Backend:** Supabase (Auth, Database, Realtime)

**Database:** PostgreSQL (via Supabase)

**Authentication:** Google OAuth 2.0

**Styling:** Tailwind CSS

**Deployment:** Vercel

**🧱 Architecture Overview**

* Supabase handles:

    * Authentication

    * Database

    * Real-time subscriptions

* Next.js App Router handles:

    * Client-side routing

    * Protected dashboard page

* Realtime updates use Supabase postgres_changes

* Row-Level Security ensures data isolation per user

**🔐 Security**

* Row Level Security (RLS) enabled

* Policies:

    * Users can only SELECT their own bookmarks

    * Users can INSERT their own bookmarks

    * Users can UPDATE their own bookmarks

    * Users can DELETE their own bookmarks

* Secure Google OAuth flow

**⚙️ Local Setup**
**1️⃣ Clone the repository**
git clone https://github.com/Naveen100299/smart-bookmark.git
cd smart-bookmark

**2️⃣ Install dependencies**
npm install

**3️⃣ Create .env.local**
NEXT_PUBLIC_SUPABASE_URL=https:https://pacoqyudajumlkkcfhad.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_h9GGSYEwD10jpbXni4gL0Q_0R5A5rEu
**4️⃣ Run development server**
npm run dev


Open:

http://localhost:3000

**🚀 Deployment (Vercel)**

1. Push code to GitHub

2. Import repository in Vercel

3. Add environment variables:

    * NEXT_PUBLIC_SUPABASE_URL

    * NEXT_PUBLIC_SUPABASE_ANON_KEY

4. Deploy

**🧩 Problems Faced & Solutions**
**🔴 1. Realtime WebSocket Errors**

**Problem:**
WebSocket connection failing (CHANNEL_ERROR, TIMED_OUT)

**Solution:**

* Enabled Realtime in Supabase Database Publications

* Verified correct Supabase URL and API key

* Ensured proper cleanup of channels in useEffect

**🔴 2. Google OAuth 401: deleted_client**

**Problem:**
OAuth client was deleted in Google Cloud.

**Solution:**

* Created new OAuth 2.0 Client ID

* Updated Client ID & Secret in Supabase

* Configured correct Redirect URLs:

    * Supabase callback

    * Localhost

    * Production domain

**🔴 3. OAuth 500 Unexpected Failure**

**Problem:**
Supabase callback returned 500 error.

**Solution:**

* Verified Google Cloud Authorized Redirect URLs

* Matched Supabase callback exactly:

    https://project-id.supabase.co/auth/v1/callback


* Ensured Site URL and Redirect URLs configured correctly

**🔴 4. Session Redirect Loop**

**Problem:**
After login, app redirected back to login page.

**Solution:**

* Used supabase.auth.getSession() inside useEffect

* Redirected only if session exists

* Fixed client-side routing logic

**🔴 5. Invalid URL Runtime Error**

**Problem:**
new URL(bookmark.url) crashed when URL missing protocol.

**Solution:**

* Added validation

* Automatically prepended https:// when needed

* Wrapped URL parsing in try/catch

**📈 Improvements Beyond Requirements**

The base task required:

* Google Login

* Add bookmark

* Private bookmarks

* Real-time updates

* Delete bookmark

* Vercel deployment

Additional improvements implemented:

* Edit bookmark functionality

* Sorting options

* Favicon preview

* Toast notifications

* Premium UI design

* Responsive layout

* Clean UX with empty state UI

**🎯 What I Learned**
* Deep understanding of Supabase Auth & RLS

* OAuth configuration in Google Cloud

* Real-time subscriptions in PostgreSQL

* Secure frontend authentication handling

* Production deployment & environment variable management

**📄 License**

This project is built for technical evaluation purposes.
