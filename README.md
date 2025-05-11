# MERN Stack Social Media App with Real-Time Chat 💬

A full-stack social media web application built using the **MERN stack** — featuring secure user authentication, real-time messaging, profile management, posts, likes, and more. This project uses **MongoDB**, **Express.js**, **React.js**, **Node.js**, **Socket.IO**, and **JWT** for a complete modern web experience.

---

## 🚀 Tech Stack

- **Frontend:** React.js, Axios, Context API  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose)  
- **Real-Time Chat:** Socket.IO  
- **Authentication:** JWT (JSON Web Tokens)  
- **Security:** Bcrypt, Helmet, CORS  
- **Others:** Multer (file upload), Dotenv  

---

## ✨ Features

- ✅ User Registration & Login  
- ✅ JWT Authentication & Protected Routes  
- ✅ Profile Page with User Info & Avatar  
- ✅ Create, Like & Comment on Posts  
- ✅ Follow / Unfollow Users  
- ✅ Real-Time One-to-One Chat  
- ✅ Image Uploads (Multer)  
- ✅ Responsive UI (mobile-friendly)  
- ✅ Basic Notifications  

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/harshitjain3121/Social-Media.git
cd Social-Media
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://achiever:mIJKyKrH181bf0VO@socialmedia.xhc9uj9.mongodb.net/social-media-tut?retryWrites=true&w=majority&appName=SocialMedia
JWT_SECRET=QWERTYUIOP1234567890
```

Start the server:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

Make sure your frontend points to the correct backend API URL (use environment variables or Axios base URL config).

---

## 📁 Folder Structure

```
mern-social-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js
└── README.md
```

---

## 🧪 To-Do / Improvements

* [x] Real-time private messaging
* [ ] Group chat support
* [ ] Post editing and deletion
* [ ] Push notifications
* [ ] Dark mode toggle
* [ ] Deployment guide

---

## 🛠️ Built With

* [React](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Socket.IO](https://socket.io/)
* [JWT](https://jwt.io/)

---

## 📜 License

This project is licensed under the MIT License.

---

## 👤 Author

* GitHub: harshitjain3121(https://github.com/harshitjain3121)
* Email: harshitjain3121@gmail.com

---

> Made with ❤️ using MERN Stack + Socket.IO

```

This `README.md` covers everything from installation to features, folder structure, and more. You can replace the placeholders like `your-username` and `you@example.com` with your actual details. Let me know if you need any further modifications!
```
