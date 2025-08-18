# 💪 SweatSet

SweatSet is a **fitness tracking web app** that allows users to monitor their push-ups, calories burned, and personal fitness progress. It features **real-time push-up counting using ML5.js**, secure authentication, and profile management.

---

## 🔗 API Endpoints

### **Authentication**
- `POST /auth/login` → Login as user
- `GET /auth/logout` → Logout user

### **User Registration**
- `POST /register/signup` → Create new user
- `POST /register/additional-info` → Add personal info

### **User Profile**
- `POST /extract/profile` → Fetch user profile & push-up records
- `POST /extract/addinfo` → Fetch additional info
- `POST /extract/addinfo/upsert` → Add or update info

### **Push-ups**
- `POST /pushUp/data` → Add new push-up record
- `POST /pushUp/target` → Set daily push-up target
- `POST /pushUp/target/get` → Get user’s push-up target
- `POST /extract/pushup` → Get today’s push-up stats

### **Password Management**
- `POST /password/forgot-password` → Send password reset email
- `POST /password/reset-password/:token` → Reset password using token
