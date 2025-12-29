# 🚐 TripMate – Group Travel Management Platform

## 📌 Project Overview

**TripMate** is a full-stack MERN-based travel management web application designed to simplify **group trip planning and coordination**.
It enables users to create trips, invite members, manage shared expenses, communicate in real time, vote on decisions, upload trip photos, check weather, convert currencies, and even get AI-powered travel suggestions.

The application focuses on **real-world collaboration problems** faced during group travel and solves them using a modern, secure, and scalable architecture.

---

## ❓ Problem Statement & Solution

### 🔴 Problem

Planning a group trip is often chaotic due to:

* Poor expense tracking
* Miscommunication between members
* Difficulty in decision-making (where to go, what to do)
* No centralized platform for chats, photos, and updates

### ✅ Solution

**TripMate** provides a single unified platform that offers:

* Secure trip creation and member invitations
* Real-time group chat for instant communication
* Shared expense tracking with automatic calculations
* Polls for group decision-making
* Photo gallery for trip memories
* Weather and currency information
* AI assistant for itinerary and travel suggestions

---

## 🛠 Tech Stack

| Component      | Technology                                |
| -------------- | ----------------------------------------- |
| Frontend       | React (Vite), Tailwind CSS                |
| Backend        | Node.js, Express.js                       |
| Database       | MongoDB (Mongoose)                        |
| Authentication | JWT, bcrypt                               |
| Real-Time      | Socket.IO                                 |
| File Uploads   | Multer, Cloudinary                        |
| Email          | Nodemailer (OTP & invitations)            |
| APIs           | OpenWeather API, OpenAI API               |
| Deployment     | Vercel (Frontend), Node Hosting (Backend) |

---

## ⚙️ Functionality Breakdown

### 1️⃣ Authentication & Security

* User Signup & Login with JWT authentication
* Password hashing using bcrypt
* OTP-based Forgot & Reset Password system
* Protected routes with middleware validation

---

### 2️⃣ Trip Management

* Create trips with destination and date range
* Generate unique invite codes
* Join trips using invite codes
* Leave or delete trips securely

---

### 3️⃣ Expense Management

* Add shared expenses within a trip
* Equal split calculation among members
* Member-only expense access
* Expense summary and settlement logic
* Downloadable PDF expense reports

---

### 4️⃣ Real-Time Group Chat

* Secure Socket.IO-based chat
* JWT-authenticated socket connection
* Trip-based chat rooms
* Supports text and image attachments

---

### 5️⃣ Polls & Voting System

* Create polls within trips
* Vote once per poll (duplicate vote prevention)
* Used for decisions like destinations or activities

---

### 6️⃣ Gallery & Media Uploads

* Upload trip photos
* View photos sorted by time
* Cloudinary integration for scalable storage

---

### 7️⃣ Weather & Currency Tools

* Fetch real-time weather using OpenWeather API
* Search by city or location coordinates
* Currency converter for international trips

---

### 8️⃣ AI Travel Assistant

* AI-powered suggestions for:

  * Trip planning
  * Budget guidance
* Backend-secured OpenAI API integration

---

### 9️⃣ User Profile & Settings

* Update profile details
* Change password securely
* View user statistics (trips joined/created)

---

## 📥 Installation & Setup Guide

### 🛠 Prerequisites

* Node.js (v18+)
* MongoDB (local or Atlas)
* Git
* Modern web browser

---

### 📌 Steps to Run Locally

#### 1️⃣ Clone Repositories

```bash
git clone https://github.com/your-username/trip-mate-frontend
git clone https://github.com/your-username/trip-mate-backend
```

---

#### 2️⃣ Frontend Setup

```bash
cd trip-mate-frontend
npm install
npm run dev
```

---

#### 3️⃣ Backend Setup

```bash
cd trip-mate-backend
npm install
npm start
```

---

#### 4️⃣ Environment Variables (`.env`)

```env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
OPENWEATHER_KEY=your_weather_api_key
OPENAI_API_KEY=your_openai_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

---

## 🔗 Useful Links

* Frontend Repo: `https://github.com/khusboo06/trip-mate-frontend`
* Backend Repo: `https://github.com/khusboo06/trip-mate-backend`

---

## 🚀 Future Improvements

* Push notifications
* Role-based permissions
* Microservices architecture
* Analytics dashboard

---


