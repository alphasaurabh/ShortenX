# 🚀 ShortenX

**ShortenX** is a modern, full-stack URL shortener and QR code generator built with **Next.js 14**, **Tailwind CSS**, and **MongoDB**. It features real-time link analytics, force-dynamic redirects, and instant QR code generation via a responsive tab-based UI.

![Next.js](https://img.shields.io/badge/Next.js-14.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-5.8-47A248?style=for-the-badge&logo=mongodb)

## ✨ Key Features

* **🔗 Smart URL Shortening:** Converts long URLs into unique 6-character codes with automatic collision handling and retry logic.
* **📱 QR Code Generation:** Integrated tab-based UI to generate and download QR codes instantly (powered by QRServer API).
* **📊 Click Tracking:** Records total clicks and creation timestamps for every link in MongoDB.
* **⚡ Dynamic Redirects:** Utilizes Next.js force-dynamic rendering for accurate, real-time server-side lookups and redirections.
* **🎨 Modern UI:** Fully responsive design with a mobile-friendly navbar, sleek hero section, and loading states.
* **🛡️ Robust Validation:** Includes URL format validation, error handling, and duplicate checks.

---

## 🏗️ Tech Stack

### Frontend
* **Framework:** Next.js 14.1.0 (App Router)
* **Styling:** Tailwind CSS 3.4.7 + Autoprefixer
* **State Management:** React Hooks (`useState`)
* **Components:** Server & Client Components

### Backend
* **Runtime:** Node.js
* **API:** Next.js API Routes (`/api/generate`)
* **Database:** MongoDB 5.8.0 (via MongoDB Driver)

### Tools
* **Linting:** ESLint 8.49.0
* **Formatting:** Prettier 3.0.0
* **Deployment:** Vercel 

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* Node.js installed
* A MongoDB instance (Local or Atlas connection string)

### Installation

1.  **Clone the repository**
    ``bash
    git clone [https://github.com/yourusername/ShortenX.git](https://github.com/yourusername/ShortenX.git)
    cd ShortenX
    ```

2.  **Install dependencies**
    ``bash
    npm install
    ```

3.  **Configure Environment Variables**
    Rename the example file to `.env.local`:
    `bash
    mv .env.local.example .env.local
    `
    Update the contents of `.env.local` with your credentials:
    ``env
    # MongoDB Connection String (Local or Atlas)
    MONGODB_URI=mongodb://localhost:27017/shortenx

    # Base URL (default for local dev)
    BASE_URL=http://localhost:3000
    ```

4.  **Run the development server**
    ``bash
    npm run dev
    ```

Visit `http://localhost:3000` to see the app in action.

---

## 🔌 API Reference

### 1. Generate Short URL
**Endpoint:** `POST /api/generate`

**Request Body:**
``json
{
  "url": "[https://example.com/very/long/url](https://example.com/very/long/url)"
}
Response:

JSON

{
  "success": true,
  "error": false,
  "message": "URL Generated Successfully",
  "shortUrl": "http://localhost:3000/abc123",
  "id": "ObjectId..."
}
2. Redirect
Endpoint: GET /[short]

Behavior: Accepts the 6-character short code → Look up in MongoDB → Increment Click Count → Redirect to original URL.

Method: Server-side lookup with Meta Refresh + JS fallback.

📂 Project Structure

ShortenX/
├── app/
│   ├── [short]/
│   │   └── page.js      # Dynamic redirect logic (/:short)
│   ├── api/generate/
│   │   └── route.js     # POST endpoint for URL generation
│   ├── layout.js        # Root layout with Navbar
│   └── page.js          # Homepage (Hero + Features)
├── components/
│   ├── Hero.js          # Main form, Tabs (Short/QR), & Logic
│   ├── Navbar.js        # Responsive navigation header
│   └── ShortenCard.js   # Result display component
├── lib/
│   └── mongodb.js       # MongoDB connection singleton
├── public/              # Static assets
└── ...config files


## 📊 Database Schema

Field,Type,Description
_id,ObjectId,Unique identifier
url,String,Original long URL
shorturl,String,Unique 6-character code
clicks,Number,Count of redirects
createdAt,Date,ISO Timestamp
