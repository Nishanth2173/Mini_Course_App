# 🎓 Knowledge Nexus – Mini Course App

Knowledge Nexus is a full-stack mini course platform where users can explore courses, sign up, log in, purchase courses, and manage their enrolled courses through a personalized dashboard.

---

## 🌐 Live Demo

🚀 **Hosted Application:**  
https://mini-course-app-gamma.vercel.app

To login the app use these dummy logins
### 1. test@gmail.com
password: Test@123

### 2. onepiece@gmail.com
password: Merry@123

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Deployment
- Frontend: Vercel  
- Backend: Render

---

## ✨ Features

- User authentication (Signup & Login)
- Browse available courses
- Course purchase & enrollment
- My Courses dashboard
- Protected routes using JWT
- Responsive and clean UI

---

## 📸 Screenshots

### 🔐 Signup Page
<img width="1919" height="919" alt="Screenshot 2026-01-09 193006" src="https://github.com/user-attachments/assets/437b565b-9a12-4b8a-ac8d-1dbff4f1d4f4" />


### 🔑 Login Page
<img width="1919" height="919" alt="Screenshot 2026-01-09 192952" src="https://github.com/user-attachments/assets/1669fcac-33f1-435b-9658-a5bd4a66cb48" />

### 📚 Available Courses
<img width="1919" height="970" alt="Screenshot 2026-01-09 193031" src="https://github.com/user-attachments/assets/e4492bc4-98b1-4ed6-84d7-d88c5f8993d2" />

### 🎯 My Courses
<img width="1919" height="924" alt="Screenshot 2026-01-09 193046" src="https://github.com/user-attachments/assets/bebf2542-2e56-4cba-b6f1-1df5dc04fc26" />

---

## ⚙️ Local Development Setup

### 1️⃣ Clone the Repository

git clone https://github.com/Nishanth2173/Mini_Course_App.git
cd Mini_Course_App

### 2️⃣ Backend Setup
cd backend
npm install

### Create a .env file inside backend:

PORT=5000
JWT_SECRET=your_jwt_secret
I used postgreSQL for the database.
here is the schema that I had used
### users(id,name,email,password,timestamp)
### courses(id,name,description,price,image)
### subscriptions(id,user id, course id, price, subscribe AT)



### Start backend server:

npm start

cd .. => To back to the main folder
### 3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

### 🚀 Deployment
Frontend (Vercel)

Build command: npm run build

Output directory: dist

Backend (Render)

Start command: npm start

Add environment variables in Render dashboard


### Details:

you can sign in and login with dummy data, it will show the courses available. 
For the free course it will subscribe automatically.
But for the paid course, Until you enter the promo code the price will be become half and after subscribing it will direct you to the My courses page to see the courses that you had subscribed.

### Author: Nuthi Nishanth.
