# SubTax 💸

> *Track the hidden tax on your life.*

SubTax is a full-stack subscription tracking app that helps you see exactly where your money disappears every month—built with a Netflix-inspired dark UI, real authentication, and a MySQL backend.

![SubTax](https://img.shields.io/badge/version-2.0-E50914?style=flat-square) ![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react) ![Node](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js) ![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql)

---

## Features

- **Real Auth** — Register, login, OTP verification, forgot password flow
- **Per-user data** — Every subscription is tied to your account via JWT
- **Multi-currency** — INR, USD, EUR, GBP with live conversion
- **Smart breakdown** — Monthly burn, yearly projection, daily cost
- **Category grouping** — Entertainment, productivity, cloud, fitness, and more
- **Charts** — Donut chart breakdown by category
- **Netflix-inspired UI** — Dark theme, `#E50914` red, DM Serif Display typography

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, vanilla CSS |
| Backend | Node.js, Express |
| Database | MySQL 8 |
| Auth | bcrypt, JWT |
| Deployment | Vercel (frontend) |

---

## Project Structure

```
SubTax/
├── Frontend/               # React + Vite app
│   └── src/
│       ├── SubTax.jsx      # Main app — all screens
│       └── Auth.jsx        # Login, Signup, OTP, Forgot Password
├── server/                 # Express API
│   ├── index.js            # All routes + middleware
│   └── db.js               # MySQL connection pool
└── schema.sql              # Database schema
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL 8+

### 1. Clone the repo

```bash
git clone https://github.com/Sameekshavermaa/SubTax.git
cd SubTax
```

### 2. Set up the database

```bash
mysql -u root -p < schema.sql
```

### 3. Configure the backend

```bash
cd server
cp .env.example .env
```

Edit `.env`:

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=subtax_db
JWT_SECRET=your_secret_key
```

Install dependencies and start:

```bash
npm install
node index.js
```

### 4. Start the frontend

```bash
cd Frontend
npm install
npm run dev
```

Open `http://localhost:5173`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login, returns JWT |

### Subscriptions *(JWT required)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/subscriptions` | Get all user's subscriptions |
| POST | `/api/subscriptions` | Add a subscription |
| PUT | `/api/subscriptions/:id` | Update a subscription |
| DELETE | `/api/subscriptions/:id` | Delete a subscription |

---

## Screenshots

| Login | Home | Charts |
|-------|------|--------|
| Split-panel auth with branding | KPI dashboard with category cards | Donut chart breakdown |

---

## Roadmap

- [ ] Deploy backend to Railway
- [ ] Real OTP via email (Nodemailer)
- [ ] Budget alerts
- [ ] Subscription renewal reminders
- [ ] Export to CSV

---

## Author

**Sameeksha Verma** — 3rd year CS undergrad, UX/UI enthusiast  
[GitHub](https://github.com/Sameekshavermaa)

---

<div align="center">
  <sub>Built with obsessive attention to detail and too many subscriptions.</sub>
</div>
