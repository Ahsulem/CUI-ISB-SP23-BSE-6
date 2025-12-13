

<h1 align="center">🎓 COMSATS Learning Management System</h1>

<p align="center">
  <strong>A Modern Full-Stack LMS for Software Engineering Department</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Course-Software%20Engineering-blue?style=flat-square" alt="Course"/>
  <img src="https://img.shields.io/badge/Semester-SP23--BSE--6-green?style=flat-square" alt="Semester"/>
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status"/>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [User Credentials](#-user-credentials)
- [Screenshots](#-screenshots)
- [Team Members](#-team-members)
- [License](#-license)

---

## 🌟 Overview

The **COMSATS Learning Management System (LMS)** is a comprehensive web-based platform designed to streamline academic activities within the Software Engineering Department at COMSATS University Islamabad. This system facilitates seamless interaction between administrators, department heads, teachers, and students.

### Key Highlights

- 🎨 **Modern UI/UX** - Clean, professional dark theme with responsive design
- 🔐 **Role-Based Access** - Four distinct user roles with specific permissions
- 📊 **Analytics Dashboard** - Visual charts and statistics for all users
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Real-time Updates** - Instant feedback on all operations

---

## ✨ Features

### 👨‍💼 Admin Panel
| Feature | Description |
|---------|-------------|
| Dashboard | System-wide statistics and user activity overview |
| Teacher Management | Add, edit, delete, and view all teachers |
| Student Management | Complete student CRUD operations |
| Class Management | Create and manage course classes |
| User Analytics | Visual charts showing user distribution |

### 🎓 Head of Department (HOD)
| Feature | Description |
|---------|-------------|
| Department Overview | Complete department statistics |
| Class Monitoring | View all classes and their progress |
| Results Analysis | Comprehensive grade analytics with charts |
| Performance Trends | Track student performance over time |
| Export Reports | Download results as CSV files |

### 👨‍🏫 Teacher Portal
| Feature | Description |
|---------|-------------|
| My Classes | View and manage assigned classes |
| Quiz Management | Create, edit, and manage quizzes |
| Assignment Management | Create and track assignments |
| Learning Materials | Upload and organize course materials |
| Grade Management | Enter and manage student marks |
| Student Progress | Track individual student performance |

### 👨‍🎓 Student Portal
| Feature | Description |
|---------|-------------|
| My Dashboard | Personal progress overview |
| Enrolled Classes | View all enrolled courses |
| Quizzes | Attempt available quizzes |
| Assignments | View and submit assignments |
| Results | Check grades and performance |
| Learning Materials | Access course materials |

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18.2 | UI Library |
| Vite 5.0 | Build Tool |
| Tailwind CSS 3.3 | Styling |
| React Router 6 | Navigation |
| Recharts | Data Visualization |
| React Hot Toast | Notifications |
| React Icons | Icon Library |
| Axios | HTTP Client |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js 18+ | Runtime Environment |
| Express 4.18 | Web Framework |
| MongoDB 6.0 | Database |
| Mongoose 8.0 | ODM |
| JWT | Authentication |
| Bcrypt | Password Hashing |
| CORS | Cross-Origin Support |
| Dotenv | Environment Variables |

---

## 📁 Project Structure

```
CUI-ISB-SP23-BSE-6/
├── 📂 backend/
│   ├── 📂 config/
│   │   └── db.js                 # MongoDB connection
│   ├── 📂 controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── adminController.js    # Admin operations
│   │   ├── teacherController.js  # Teacher operations
│   │   ├── studentController.js  # Student operations
│   │   └── headController.js     # HOD operations
│   ├── 📂 middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── 📂 models/
│   │   ├── User.js               # User schema
│   │   ├── Class.js              # Class schema
│   │   ├── Quiz.js               # Quiz schema
│   │   ├── Assignment.js         # Assignment schema
│   │   ├── Material.js           # Material schema
│   │   └── Marks.js              # Marks schema
│   ├── 📂 routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── adminRoutes.js        # Admin endpoints
│   │   ├── teacherRoutes.js      # Teacher endpoints
│   │   ├── studentRoutes.js      # Student endpoints
│   │   └── headRoutes.js         # HOD endpoints
│   ├── 📂 scripts/
│   │   └── seedDatabase.js       # Database seeder
│   ├── server.js                 # Entry point
│   ├── package.json
│   └── .env.example
│
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── Layout.jsx        # Main layout with sidebar
│   │   │   ├── StatCard.jsx      # Statistics card component
│   │   │   ├── DataTable.jsx     # Reusable data table
│   │   │   └── Modal.jsx         # Modal component
│   │   ├── 📂 context/
│   │   │   └── AuthContext.jsx   # Authentication context
│   │   ├── 📂 pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── 📂 admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Teachers.jsx
│   │   │   │   ├── Students.jsx
│   │   │   │   └── Classes.jsx
│   │   │   ├── 📂 teacher/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Classes.jsx
│   │   │   │   ├── Quizzes.jsx
│   │   │   │   ├── Assignments.jsx
│   │   │   │   ├── Materials.jsx
│   │   │   │   └── Marks.jsx
│   │   │   ├── 📂 student/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Classes.jsx
│   │   │   │   ├── Quizzes.jsx
│   │   │   │   ├── Assignments.jsx
│   │   │   │   └── Results.jsx
│   │   │   └── 📂 head/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Classes.jsx
│   │   │       └── Results.jsx
│   │   ├── 📂 services/
│   │   │   └── api.js            # Axios instance
│   │   ├── App.jsx               # Main App component
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── .gitignore
└── README.md
```

---

## 🚀 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/chumarhassan/CUI-ISB-SP23-BSE-6.git
cd CUI-ISB-SP23-BSE-6
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/lms_database

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Environment
NODE_ENV=development
```

### Frontend Configuration

The frontend is pre-configured to connect to `http://localhost:5000/api`. If you change the backend port, update `frontend/src/services/api.js`.

---

## ▶️ Running the Application

### Option 1: Run Separately

**Terminal 1 - Start MongoDB:**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

**Terminal 2 - Start Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5000`

**Terminal 3 - Start Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:3000`

### Option 2: Seed the Database

To populate the database with sample data (43 students, 5 teachers, etc.):

```bash
cd backend
node scripts/seedDatabase.js
```

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | User logout |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Get dashboard stats |
| GET | `/api/admin/teachers` | Get all teachers |
| POST | `/api/admin/teachers` | Add new teacher |
| PUT | `/api/admin/teachers/:id` | Update teacher |
| DELETE | `/api/admin/teachers/:id` | Delete teacher |
| GET | `/api/admin/students` | Get all students |
| POST | `/api/admin/students` | Add new student |
| PUT | `/api/admin/students/:id` | Update student |
| DELETE | `/api/admin/students/:id` | Delete student |
| GET | `/api/admin/classes` | Get all classes |
| POST | `/api/admin/classes` | Create class |
| PUT | `/api/admin/classes/:id` | Update class |
| DELETE | `/api/admin/classes/:id` | Delete class |
| POST | `/api/admin/classes/:id/assign` | Assign teacher to class |

### Teacher Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/teacher/dashboard` | Get teacher dashboard |
| GET | `/api/teacher/classes` | Get assigned classes |
| GET | `/api/teacher/quizzes` | Get all quizzes |
| POST | `/api/teacher/quizzes` | Create quiz |
| PUT | `/api/teacher/quizzes/:id` | Update quiz |
| DELETE | `/api/teacher/quizzes/:id` | Delete quiz |
| GET | `/api/teacher/assignments` | Get all assignments |
| POST | `/api/teacher/assignments` | Create assignment |
| GET | `/api/teacher/materials` | Get all materials |
| POST | `/api/teacher/materials` | Upload material |
| GET | `/api/teacher/marks` | Get marks |
| POST | `/api/teacher/marks` | Add marks |

### Student Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/student/dashboard` | Get student dashboard |
| GET | `/api/student/classes` | Get enrolled classes |
| GET | `/api/student/quizzes` | Get available quizzes |
| GET | `/api/student/assignments` | Get assignments |
| GET | `/api/student/results` | Get results |
| GET | `/api/student/materials` | Get materials |

### HOD Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/head/dashboard` | Get HOD dashboard |
| GET | `/api/head/classes` | Get all classes |
| GET | `/api/head/results` | Get all results |
| GET | `/api/head/materials` | Get all materials |

---

## 🔑 User Credentials

After running the database seeder, use these credentials to log in:

### 👨‍💼 Administrator
| Email | Password |
|-------|----------|
| admin@lms.com | admin123 |

### 🎓 Head of Department
| Email | Password |
|-------|----------|
| head@lms.com | head1234 |

### 👨‍🏫 Teachers
| Name | Email | Password |
|------|-------|----------|
| Rashid Mukhtar | rashid.mukhtar@lms.com | teacher123 |
| Dr. Farhan Ahmed | farhan.ahmed@lms.com | teacher123 |
| Prof. Ayesha Khan | ayesha.khan@lms.com | teacher123 |
| Dr. Bilal Hussain | bilal.hussain@lms.com | teacher123 |
| Prof. Sana Malik | sana.malik@lms.com | teacher123 |

### 👨‍🎓 Students (43 Total)
**All students use password:** `student123`

| # | Name | Email |
|---|------|-------|
| 1 | Ahmed Ali | ahmed.ali@lms.com |
| 2 | Ahmed Mujtaba | ahmed.mujtaba@lms.com |
| 3 | Ahmed Suleman | ahmed.suleman@lms.com |
| 4 | Umar Hassan | umar.hassan@lms.com |
| 5 | Tumazir Fatima | tumazir.fatima@lms.com |
| 6 | Ahsan Shahid | ahsan.shahid@lms.com |
| 7 | Aman Malik | aman.malik@lms.com |
| 8 | Dawood Iqbal | dawood.iqbal@lms.com |
| 9 | Fahad Khan | fahad.khan@lms.com |
| 10 | Haroon Khalid | haroon.khalid@lms.com |
| 11 | Haseeb Amjad | haseeb.amjad@lms.com |
| 12 | Haseeb Zahid | haseeb.zahid@lms.com |
| 13 | M. Huzaifa | m.huzaifa@lms.com |
| 14 | Ihtisham Islam | ihtisham.islam@lms.com |
| 15 | Kaleem Hassan | kaleem.hassan@lms.com |
| 16 | Mahad Kamran | mahad.kamran@lms.com |
| 17 | Mudassar Akram | mudassar.akram@lms.com |
| 18 | M. Anees | m.anees@lms.com |
| 19 | Mujtaba Ghulam | mujtaba.ghulam@lms.com |
| 20 | Saim Kashmiri | saim.kashmiri@lms.com |
| 21 | Salar Khan | salar.khan@lms.com |
| 22 | Umer Malik | umer.malik@lms.com |
| 23 | Uzair Ahmed | uzair.ahmed@lms.com |
| 24 | Laiba Zahoor | laiba.zahoor@lms.com |
| 25 | Laiba Attique | laiba.attique@lms.com |
| 26 | Laiba Razzaq | laiba.razzaq@lms.com |
| 27 | Areej Iman | areej.iman@lms.com |
| 28 | Awais Naseem | awais.naseem@lms.com |
| 29 | Ayesha Faryad | ayesha.faryad@lms.com |
| 30 | Eman Fatima | eman.fatima@lms.com |
| 31 | Fizza Ch | fizza.ch@lms.com |
| 32 | Hammad Anwar | hammad.anwar@lms.com |
| 33 | Irsa Noor | irsa.noor@lms.com |
| 34 | Meesam Abbas | meesam.abbas@lms.com |
| 35 | Mustafa Zafar | mustafa.zafar@lms.com |
| 36 | Shahid Nabi | shahid.nabi@lms.com |
| 37 | Talha Riaz | talha.riaz@lms.com |
| 38 | Touseef Anjum | touseef.anjum@lms.com |
| 39 | Usama Khalid | usama.khalid@lms.com |
| 40 | Waqas Nawaz | waqas.nawaz@lms.com |
| 41 | Zain Tariq | zain.tariq@lms.com |
| 42 | Zoya Batool | zoya.batool@lms.com |
| 43 | Zohaib Aslam | zohaib.aslam@lms.com |

---



## 👥 Team Members

This project was developed by **SP23-BSE-6** students at COMSATS University Islamabad:

| Roll No | Contribution |
|---------|--------------|
| SP23-BSE-021 | Delete Class Module |
| SP23-BSE-024 | View Quiz Module |
| SP23-BSE-054 | Head Results Module |
| SP23-BSE-059 | Head Graph Module |

**Course Instructor:** Rashid Mukhtar

---

## 📄 License

This project is developed for educational purposes as part of the Software Engineering course at COMSATS University Islamabad.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For any queries or issues, please contact:

- **Semester:** Spring 2023 - BSE 6th Semester

---

<p align="center">
  Made with ❤️ by SP23-BSE-6 Students
</p>
