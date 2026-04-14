# 🚀 Learnistry – Skill-Based Collaboration Platform

## 📌 Overview

Learnistry is a full-stack web application that connects users based on their skills and learning interests. It enables users to collaborate, chat, and engage in real-time video calls for peer-to-peer learning.

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Query

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Atlas)

### Other Services

* Stream API (for chat & video calls)
* JWT Authentication


## ✨ Features

* 🔐 User Authentication (Signup/Login with JWT)
* 👤 User Onboarding & Profile Setup
* 🤝 Friend Request System
* 💬 Real-time Chat
* 📹 Video Calling (Stream API integration)
* 📊 Feedback & Telemetry System (QoE tracking)
* 🧠 Expert Verification (Resume & Certificate Analysis)


## 📂 Project Structure

```
/backend
  /controllers
  /models
  /routes
  /middleware
  /lib

/frontend
  /components
  /pages
  /hooks
  /lib
```

---

## ⚙️ Environment Variables

Create a `.env` file in the backend:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
NODE_ENV=development
```

---

## 🚀 Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/learnistry.git
cd learnistry
```

---

### 2. Install dependencies

#### Backend

```
cd backend
npm install
```

#### Frontend

```
cd frontend
npm install
```

---

### 3. Run the application

#### Backend

```
npm run dev
```

#### Frontend

```
npm run dev
```


## 🧪 API Endpoints (Sample)

| Method | Endpoint                      | Description         |
| ------ | ----------------------------- | ------------------- |
| POST   | /api/auth/signup              | Register user       |
| POST   | /api/auth/login               | Login user          |
| GET    | /api/auth/me                  | Get current user    |
| POST   | /api/users/friend-request/:id | Send friend request |

---

## 📸 Screenshots

<img width="1920" height="1080" alt="Screenshot (202)" src="https://github.com/user-attachments/assets/c53d5e6e-75dd-41bc-8504-c84312f5aacd" />

<img width="1920" height="1080" alt="Screenshot (206)" src="https://github.com/user-attachments/assets/327e1f8b-be28-468d-86f0-e58d5e9dd558" />

<img width="1920" height="1080" alt="Screenshot (260)" src="https://github.com/user-attachments/assets/682ff100-4daa-497f-8964-f0758e4ecb5e" />


## 🧠 Key Learnings

* Implemented secure authentication using JWT
* Integrated third-party APIs for real-time communication
* Designed scalable backend architecture
* Managed state efficiently using React Query

## ⚠️ Limitations

* Uses free-tier services (may cause slight delays)
* Basic UI/UX (can be improved further)


## 📌 Future Improvements

* Improve UI/UX design
* Add notifications system
* Enhance recommendation algorithm
* Optimize performance

## ⭐ Show your support

If you like this project, give it a ⭐ on GitHub!
