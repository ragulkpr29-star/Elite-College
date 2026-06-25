# Code Reference - All Key Implementation Files

## Backend Code

### 1. Backend/.env
```
PORT=5000

# MongoDB Atlas Connection String
# IMPORTANT: Replace USERNAME and PASSWORD with actual credentials from MongoDB Atlas
MONGO_URL=mongodb+srv://Ragulkpr29:Ragul123@cluster0.dwdn2fl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### 2. Backend/models/User.js
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [3, 'Full name must be at least 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  phone: {
    type: String,
    default: '',
  },
  program: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
```

### 3. Backend/routes/auth.js
```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password, phone, program } = req.body;

    // Validation
    if (!fullName || fullName.trim().length < 3) {
      return res.status(400).json({ message: 'Full name must be at least 3 characters.' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone || '',
      program: program || '',
    });

    res.status(201).json({
      message: 'Account created successfully!',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        program: user.program,
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    res.json({
      message: 'Login successful!',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        program: user.program,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
```

### 4. Backend/server.js
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err.message);
    process.exit(1);
  });
```

---

## Frontend Code

### 5. src/context/AuthContext.jsx
```javascript
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "eliteCollegeAuth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse auth storage", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = (userData) => {
    const normalizedUser = {
      id: userData.id || userData._id,
      fullName: userData.fullName || "Student",
      email: userData.email || "",
      phone: userData.phone || "",
      program: userData.program || "",
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedUser));
    setUser(normalizedUser);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
```

### 6. src/pages/Signup.jsx (Key Part)
```javascript
async function handleSubmit(e) {
  e.preventDefault();
  // ... validation ...

  setLoading(true);
  setAlert(null);

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        phone: form.phone,
        program: form.program,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      setAlert({ msg: data.message || "Signup failed.", type: "error" });
    } else {
      login(data.user);  // Save to AuthContext
      setAlert({ msg: data.message || "Account created successfully!", type: "success" });
      setTimeout(() => setPage("profile"), 1200);
    }
  } catch (err) {
    setAlert({ msg: "Network error. Please try again.", type: "error" });
  } finally {
    setLoading(false);
  }
}
```

### 7. src/pages/Login.jsx (Key Part)
```javascript
async function handleSubmit(e) {
  e.preventDefault();
  // ... validation ...

  setLoading(true);
  setAlert(null);

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, password: form.password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setAlert({ msg: data.message || "Login failed.", type: "error" });
    } else {
      login(data.user);  // Save to AuthContext
      setAlert({ msg: data.message || "Login successful! Redirecting…", type: "success" });
      setTimeout(() => setPage("home"), 1200);
    }
  } catch (err) {
    setAlert({ msg: "Network error. Please try again.", type: "error" });
  } finally {
    setLoading(false);
  }
}
```

### 8. src/components/ProfileDropdown.jsx
```javascript
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProfileDropdown({ setPage }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="profile-dropdown" ref={menuRef}>
      <button
        type="button"
        className="profile-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="profile-avatar">{user.fullName?.charAt(0).toUpperCase() || "S"}</span>
        <span className="profile-text">Profile</span>
      </button>

      <div className={`profile-menu ${open ? "visible" : ""}`}>
        <div className="profile-card">
          <div className="profile-card-avatar">{user.fullName?.charAt(0).toUpperCase() || "S"}</div>
          <div>
            <p className="profile-name">{user.fullName}</p>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        <div className="profile-info-grid">
          <div className="profile-info-item">
            <span>Department</span>
            <strong>{user.program || "N/A"}</strong>
          </div>
          <div className="profile-info-item">
            <span>Phone</span>
            <strong>{user.phone || "N/A"}</strong>
          </div>
        </div>

        <button type="button" className="btn btn-logout" onClick={logout}>
          Logout
        </button>
        <button
          type="button"
          className="btn btn-secondary profile-view-btn"
          onClick={() => {
            setPage("profile");
            setOpen(false);
          }}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
```

### 9. src/main.jsx
```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
```

### 10. src/App.jsx (Key Part)
```javascript
import { useEffect, useState } from "react";
// ... imports ...

export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo(0, 0);  // Auto-scroll to top on page change
  }, [page]);

  const pages = {
    home:      <Home      setPage={setPage} />,
    about:     <About     setPage={setPage} />,
    // ... other pages ...
    login:     <Login     setPage={setPage} />,
    signup:    <Signup    setPage={setPage} />,
    profile:   <Profile   setPage={setPage} />,
  };

  return (
    <div>
      <Navbar page={page} setPage={setPage} />
      <main>{pages[page] ?? pages["home"]}</main>
      <Footer setPage={setPage} />
    </div>
  );
}
```

---

## Dependencies

### Backend/package.json
```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "mongoose": "^9.7.2"
  }
}
```

### Frontend package.json
```json
{
  "name": "elite-college",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.2"
  }
}
```

---

## Database Structure

### MongoDB Collection: elitecollege.users

```javascript
// Example Document
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$nOUIs5kJ7naTuTFkBy1H2OPST9/PgBkqquzi.Ss7KIUgO2t0jKMm2",
  "phone": "9876543210",
  "program": "B.Tech",
  "createdAt": ISODate("2024-06-25T10:30:45.000Z")
}
```

---

## API Testing Examples

### Test with cURL

#### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210",
    "program": "B.Tech"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Test with JavaScript (Fetch API)

```javascript
// Signup
const signupResponse = await fetch('http://localhost:5000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullName: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '9876543210',
    program: 'B.Tech'
  })
});
const signupData = await signupResponse.json();
console.log(signupData);

// Login
const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
});
const loginData = await loginResponse.json();
console.log(loginData);
```

---

## Key Features Implemented

✅ **User Registration**
- Validates all fields
- Checks email uniqueness
- Hashes password with bcryptjs
- Saves to MongoDB

✅ **User Login**
- Email and password validation
- Secure password comparison
- Returns user data

✅ **Session Management**
- localStorage persistence
- AuthContext state management
- Auto-login on page refresh
- Logout functionality

✅ **UI Components**
- Profile dropdown with user info
- Protected profile page
- Auth state-based navbar rendering
- Responsive design

✅ **Security**
- Password hashing (bcryptjs)
- No plain passwords in responses
- Email uniqueness validation
- Backend validation for all inputs
