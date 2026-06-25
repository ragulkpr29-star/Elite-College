# MongoDB Atlas Setup Guide

## Current Configuration
- **MongoDB Atlas User:** ragulkpr29
- **Password:** Ragul123
- **Cluster:** Cluster0
- **Connection String:** `mongodb+srv://Ragulkpr29:Ragul123@cluster0.dwdn2fl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

## Steps to Fix Authentication Error

### 1. Verify MongoDB Atlas Credentials
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Log in with your account
3. Navigate to **Database Access** (under Security)
4. Verify that user `Ragulkpr29` exists
5. Check if you can edit the password or reset it

### 2. Check Network Access
1. Go to **Network Access** (under Security)
2. Make sure your IP address is whitelisted
3. Or add `0.0.0.0/0` (allow all IPs) for development

### 3. Verify Connection String
1. Go to **Clusters** → **Connect**
2. Click **Drivers** (not MongoDB Compass)
3. Select **Node.js** and version **6.7 or later**
4. Copy the connection string provided
5. Replace the password placeholder with your actual password

### 4. Test Connection

#### Option A: Update .env with Correct String
The `.env` file is located at: `Backend/.env`

Current content:
```
PORT=5000
MONGO_URL=mongodb+srv://Ragulkpr29:Ragul123@cluster0.dwdn2fl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

#### Option B: Create New Database User
If you want a fresh setup:
1. Go to **Database Access**
2. Click **Add New Database User**
3. Username: `eliteadmin`
4. Password: `EliteCollege@2024`
5. Assign **Read and write to any database** role
6. Update `.env` with new credentials

## Backend Files Structure

```
Backend/
├── .env                    # Environment variables (MongoDB connection string)
├── server.js              # Express server with MongoDB connection
├── package.json           # Dependencies
├── models/
│   ├── User.js           # User schema
│   └── Contact.js        # Contact schema
└── routes/
    ├── auth.js           # Authentication routes
    └── contact.js        # Contact routes
```

## API Endpoints

### Authentication

#### POST /api/auth/signup
**Request:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "program": "B.Tech"
}
```

**Response (201):**
```json
{
  "message": "Account created successfully!",
  "user": {
    "id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "program": "B.Tech"
  }
}
```

#### POST /api/auth/login
**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful!",
  "user": {
    "id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "program": "B.Tech"
  }
}
```

## MongoDB Collections

### Users Collection
```
Database: elitecollege (auto-created)
Collection: users

Document Structure:
{
  "_id": ObjectId,
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password_by_bcrypt",
  "phone": "9876543210",
  "program": "B.Tech",
  "createdAt": ISODate("2024-06-25T10:30:00.000Z")
}
```

## Frontend - React Integration

### AuthContext (Already Implemented)
- Stores user data in localStorage
- Provides `useAuth()` hook
- Handles login/logout

### Login Page
- Calls `/api/auth/login`
- Saves user to AuthContext and localStorage
- Redirects to Home after successful login

### Signup Page
- Calls `/api/auth/signup`
- Automatically logs in user
- Redirects to Profile page

### Profile Dropdown
- Shows user avatar, name, email, department, phone
- Includes logout button
- Persists on page refresh via localStorage

## Testing the Setup

### 1. Start Backend
```powershell
cd Backend
npm install  # if needed
node server.js
```

Expected output:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

### 2. Start Frontend
```powershell
npm run dev
```

Expected output:
```
VITE v5.4.21  ready in 123 ms
➜  Local:   http://localhost:5173/
```

### 3. Test Signup
1. Go to http://localhost:5173
2. Click "Sign Up"
3. Fill in the form
4. Submit
5. Check MongoDB Atlas → Collections → users (new user should appear)

### 4. Test Login
1. Go to http://localhost:5173
2. Click "Login"
3. Enter registered email and password
4. After login, profile dropdown should appear
5. Refresh page - user should still be logged in (localStorage)

## Common Issues

### "Authentication failed"
- Verify username/password in MongoDB Atlas
- Check if IP is whitelisted in Network Access
- Ensure no typos in connection string

### "Connection timeout"
- Check internet connection
- Verify Network Access allows your IP
- Check MongoDB Atlas status page

### "User not saving"
- Verify `/api/auth/signup` is called correctly
- Check browser console for errors
- Check backend server logs

## Debugging

### Check if server is running
```powershell
curl http://localhost:5000/api/health
# Should return: {"status":"ok","timestamp":"2024-06-25T..."}
```

### Check if MongoDB is connected
Look at server output when starting - should show:
```
✅ Connected to MongoDB
```

### View all users in MongoDB
1. Go to MongoDB Atlas
2. Clusters → Browse Collections
3. Navigate to: elitecollege → users
4. See all registered users
