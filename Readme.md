# 🚧 FixMyArea

FixMyArea is a **crowdsourced civic issue reporting platform** that empowers community members to report local problems like potholes, sanitation issues, broken lights, and more. It automatically uses AI to classify and forward reports to the relevant local authorities.

---

## 📸 What It Does

- 📍 Users upload a photo of an issue and location
- 🤖 Gemini Vision describes and categorizes the issue using AI
- 🌐 Reverse geocoding identifies the zone/area
- 🧑‍💼 Admins are auto-assigned based on category and zone
- 🗃️ Issues are stored in MongoDB, images in AWS s3
- 👨‍💼 Admins can view and update issue status

---

## 🚀 Tech Stack

| Layer      | Tech Used                         |
|-----------|-----------------------------------|
| Frontend  | React (TypeScript), Tailwind CSS   |
| Backend   | Node.js, Express, TypeScript       |
| Database  | MongoDB + Mongoose                 |
| Auth      | JWT                                |
| Storage   | AWS S3      |
| AI        | Gemini 1.5 Vision API (Google AI)  |
| Location  | OpenCage Geocoder (Reverse Geocode)|

---

## 💡 Features

### 👤 User
- Signup / Login
- Report an issue with photo and location
- View auto-filled AI description & category
- See issue status updates

### 🧠 AI Integration
- Uses Gemini Vision to:
  - Describe the issue
  - Classify into: `road`, `water`, `sanitation`, `garbage`, `electricity`

### 🧑‍💼 Admin
- Login with secure credentials
- View assigned issues by category/zone
- Change issue status to: `In Progress` / `Resolved`

---

## 📁 Folder Structure
```
FixMyArea/
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── utils/
|   └── .env
|   
├── frontend/
│   ├── components/
│   ├── pages/
│   └── utils/
├── firebase/ or storage/
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file in the Backend:

```
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=your_google_redirect_uri

# JWT Authentication
JWT_SECRET=your_jwt_secret

# Database
MONGO_URL=your_mongodb_connection_string

# AI Service
GEMINI_API_KEY=your_gemini_api_key

# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_s3_bucket_name 
```

---

## ⚙️ Installation

### Backend Setup

bash
```
cd backend
npm install
npm run dev
```

### Frontend Setup
bash
```
cd frontend
npm install
npm run dev
```

---

## 🧪 Sample Test Flow

1. User logs in and uploads a picture + location  
2. AI analyzes image → gives description + category  
3. System reverse geocodes lat/lng → gets zone  
4. Admin auto-assigned based on category + zone  
5. Admin views assigned issues on dashboard  
6. Admin updates status (\`In Progress\`, \`Resolved\`)  
7. User can track their issue’s status  

---

## 🛠️ Future Improvements

- 📨 Email notifications to admins
- 📊 Analytics dashboard
- 📌 Map-based issue visualization
- 🧵 User-admin comment threads
- 📱 Progressive Web App (PWA) support

---

## 🙋 Contributors

- **Dhanraj Jadhav** – Full-stack development, AI integration, project lead  
- Open for collaboration — PRs and suggestions welcome!

---

## 🏙️ Target Location (MVP)

For the GDG Lead Application, this project is scoped to **Sangli city**, with zone-based admin setup and department routing.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 💬 Contact

For questions, collaborations, or suggestions:  
📧 dj004786@gmail.com  
🌐 [github.com/dhanraj-12](https://github.com/dhanraj-12)