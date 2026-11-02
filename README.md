# 🔧 FixMyRoom — Hostel Maintenance & Complaint Tracker

A complete, beginner-friendly full-stack CRUD web application built for university evaluation.

- **Backend:** Node.js & Express.js
- **Database:** MongoDB Atlas with Mongoose ODM
- **Frontend:** Pure HTML5 & CSS3 (Zero external UI frameworks, minimal native `fetch` calls)
- **Architecture:** MVC (Model-View-Controller) Pattern

---

## 📁 Project Architecture (MVC)

```text
hostel-complaint-crud-api/
├── models/
│   └── complaint.model.js       # Mongoose Schema & Data Model definition
├── controllers/
│   └── complaint.controller.js  # Controller functions for all 5 CRUD operations
├── routes/
│   └── complaint.route.js       # Express Router mapping HTTP verbs to controllers
├── public/
│   ├── index.html               # Pure HTML responsive dashboard (Form + Stats + Table)
│   └── style.css                # Modern, pure CSS styling (No Bootstrap / Tailwind)
├── .env                         # Environment variables (PORT, MONGO_URI) [Ignored by git]
├── .env.example                 # Sample environment variables template
├── .gitignore                   # Excludes node_modules and .env from git tracking
├── index.js                     # Express app setup, middleware, MongoDB Atlas connection
├── package.json                 # Dependencies & run scripts
└── README.md                    # Step-by-step evaluation cheat-sheet
```

---

## 📋 Data Model Specification (`models/complaint.model.js`)

Each complaint record stores:
| Field | Type | Required | Default / Enum | Description |
| :--- | :--- | :--- | :--- | :--- |
| `studentName` | String | Yes | — | Full name of student |
| `roomNumber` | String | Yes | — | e.g. "B-204" |
| `category` | String | Yes | `Wi-Fi`, `Electrical`, `Plumbing`, `Furniture` | Specific maintenance category |
| `description` | String | Yes | — | Description of issue |
| `status` | String | No | Default: `Pending` (`Pending` / `Resolved`) | Resolution lifecycle status |
| `createdAt` / `updatedAt` | Date | Auto | Managed by `{ timestamps: true }` | Timestamps |

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
Run in your project root terminal:
```bash
npm install
```

### 2. Configure Environment Variables (`.env`)
Create or edit `.env` in the project root:
```env
PORT=3000
MONGO_URI=mongodb+srv://nischaykhatri25cse_db_user:2gkzX6BxQCvmqRQl@cluster0.alletwp.mongodb.net/fixmyroom_db?retryWrites=true&w=majority
```

### 3. Run the Application
For production start:
```bash
npm start
```
For auto-reloading development mode (using nodemon):
```bash
npm run dev
```

### 4. Open the Web Dashboard
Open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🔑 MongoDB Atlas Setup Cheat-Sheet

If you ever need to generate a new Atlas connection string from scratch:

1. **Log in to MongoDB Atlas:** Go to [https://cloud.mongodb.com](https://cloud.mongodb.com).
2. **Network Access (Whitelist IP):**
   - In the left sidebar, click **Security** > **Network Access**.
   - Click **+ Add IP Address**.
   - Select **Allow Access From Anywhere** (`0.0.0.0/0`) and click **Confirm** *(ensures your university Wi-Fi or mobile hotspot can connect)*.
3. **Database Access (Create User):**
   - Click **Security** > **Database Access**.
   - Click **+ Add New Database User**.
   - Choose **Password** authentication, enter a username and password (e.g., `db_user` and a strong password).
   - Set user privileges to **Read and write to any database**. Click **Add User**.
4. **Get Connection String:**
   - Go to **Database** (or Clusters) in the left sidebar.
   - Click the **Connect** button on your cluster.
   - Choose **Drivers** (Node.js).
   - Copy the connection URI string. It will look like:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - In `.env`, paste this string and append the database name `/fixmyroom_db` before the query parameters:
     ```env
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/fixmyroom_db?retryWrites=true&w=majority
     ```

---

## 📮 Postman Desktop Testing Guide (All 5 CRUD Endpoints)

Base URL: `http://localhost:3000/api/complaints`

### 1. CREATE (`POST /api/complaints`)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/complaints`
- **Headers:**
  - `Content-Type`: `application/json`
- **Body:** Select **raw** > **JSON**, paste:
```json
{
  "studentName": "Rahul Sharma",
  "roomNumber": "B-204",
  "category": "Electrical",
  "description": "Ceiling fan regulator not working and sparking"
}
```
- **Expected Status:** `201 Created`
- **Expected Response:** JSON object containing `_id`, `studentName`, `roomNumber`, `category`, `description`, `status: "Pending"`, `createdAt`, and `updatedAt`.
- *(Copy the returned `_id` to use in tests 3, 4, and 5)*

---

### 2. READ ALL (`GET /api/complaints`)
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/complaints`
- **Headers:** None needed
- **Body:** None
- **Expected Status:** `200 OK`
- **Expected Response:** JSON Array `[...]` of all complaints sorted newest first (`createdAt: -1`).

---

### 3. READ ONE (`GET /api/complaints/:id`)
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/complaints/REPLACE_WITH_ID`  
  *(Example: `http://localhost:3000/api/complaints/6ae861e4158b4bdca731ad79`)*
- **Headers:** None needed
- **Expected Status:** `200 OK`
- **Expected Response:** Single complaint JSON object matching the requested `_id`.

---

### 4. UPDATE (`PUT /api/complaints/:id`)
- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/complaints/REPLACE_WITH_ID`
- **Headers:**
  - `Content-Type`: `application/json`
- **Body:** Select **raw** > **JSON**, paste:
```json
{
  "status": "Resolved"
}
```
- **Expected Status:** `200 OK`
- **Expected Response:** Updated JSON object showing `"status": "Resolved"`.

---

### 5. DELETE (`DELETE /api/complaints/:id`)
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/complaints/REPLACE_WITH_ID`
- **Headers:** None needed
- **Expected Status:** `200 OK`
- **Expected Response:**
```json
{
  "success": true,
  "message": "Complaint deleted successfully",
  "deletedId": "REPLACE_WITH_ID"
}
```

---

## 🐙 Git & GitHub Push Commands

To publish this project to your GitHub account:

### Step 1: Initialize and Commit Locally
```bash
git init
git branch -M main
git add .
git commit -m "Initial commit: FixMyRoom Hostel Complaint Tracker CRUD Application"
```

### Step 2: Create a Public Repository on GitHub
1. Log in to [https://github.com](https://github.com).
2. Click **+** (top-right) > **New repository**.
3. Repository name: `hostel-complaint-crud-api` (or `FixMyRoom`).
4. Set to **Public**.
5. Do **NOT** check "Initialize this repository with a README" (we already have one).
6. Click **Create repository**.

### Step 3: Link Remote & Push
Copy the commands shown by GitHub (replace `<YOUR_GITHUB_USERNAME>` with your actual username):
```bash
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/hostel-complaint-crud-api.git
git push -u origin main
```

> **Note:** `.gitignore` already protects your `.env` file and `node_modules`, keeping your Atlas credentials safe from public commits.

---

## 🎓 University Viva / Evaluation FAQ

**Q1: What is MVC architecture and how is it used here?**  
- **Model (`models/complaint.model.js`):** Defines the structure, fields, and validation rules of the data in MongoDB.
- **View (`public/index.html` + `style.css`):** The user interface presented in the browser.
- **Controller (`controllers/complaint.controller.js`):** Contains the business logic that handles requests, queries Mongoose, and returns responses.
- **Routes (`routes/complaint.route.js`):** Acts as the dispatcher connecting HTTP request methods & paths to controller functions.

**Q2: What do `{ new: true, runValidators: true }` in `findByIdAndUpdate` do?**  
- `new: true`: Returns the modified document rather than the original pre-update document.
- `runValidators: true`: By default, Mongoose update operations skip schema validation (e.g. enum restrictions). Setting this to `true` ensures that any update adheres to the schema constraints.

**Q3: How does the frontend communicate with the backend?**  
- Using native browser `fetch()` API calls to asynchronous REST endpoints (`GET`, `POST`, `PUT`, `DELETE`) with JSON payloads. The static files are served directly by Express via `app.use(express.static('public'))`.

**Q4: Why do we use `dotenv`?**  
- To keep sensitive configuration values like database credentials and port numbers out of source code, allowing easy environment switching and secure Git repositories.
