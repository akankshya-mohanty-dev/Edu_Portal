# Edu Portal

A full-stack education portal for browsing and purchasing courses, with an **admin client** (React) and a **server** (Node.js, Express and MongoDB). Course payments use Razorpay.

## Repository layout

```
Edu_Portal/
├── admin-client/   # React front end (admin and user screens)
└── server/         # Express REST API
```

## What's inside

- **Courses:** course model, controller and routes on the server; admin and user screens in the client
- **Payments:** Razorpay payment and payment-verification flow, plus a purchased-courses model
- **Users:** user data model and JWT-based authentication middleware
- **Admin client:** dashboard layout, protected routes, auth and cart contexts
- **Client libraries for:** charts (ApexCharts), PDF and Excel export (jsPDF, xlsx), rich-text editing (React Quill), forms (React Hook Form) and toast notifications
- **Server libraries for:** email (Nodemailer), SMS (Twilio) and scheduled jobs (node-cron)

## Tech stack

**Client (`admin-client`)**
- React (Create React App), React Router
- Tailwind CSS, daisyUI and Material UI
- Axios

**Server (`server`)**
- Node.js and Express
- MongoDB with Mongoose
- jsonwebtoken, bcryptjs, cookie-parser, CORS
- Razorpay

## Getting started

### Prerequisites

- Node.js 18 or newer
- A MongoDB database (local or hosted)
- A Razorpay account (test mode is fine for development)

### 1. Clone the repository

```bash
git clone https://github.com/akankshya-mohanty-dev/Edu_Portal.git
cd Edu_Portal
```

### 2. Set up the server

```bash
cd server
npm install
```

Copy `.env.default` to `.env` and fill in the values. **Never commit `.env`.**

| Variable | Purpose |
| --- | --- |
| `PORT` | Port the API listens on |
| `MONGO_URI` | MongoDB connection string |
| `RAZORPAY_KEY_ID` | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret |

```bash
npm run dev     # development, with nodemon
npm start       # production
```

The API is mounted under `/api`.

### 3. Set up the client

```bash
cd admin-client
npm install
```

Copy `.env.default` to `.env` and set:

| Variable | Purpose |
| --- | --- |
| `REACT_APP_API_URL` | Base URL of the server API |
| `REACT_APP_RAZORPAY_KEY_ID` | Razorpay **public** key ID |

> Only the public key ID belongs in the client. Keep the Razorpay key secret on the server.

```bash
npm start       # development server
npm run build   # production build
```

## Author

**Akankshya Mohanty** - MERN Stack Developer
[GitHub](https://github.com/akankshya-mohanty-dev) | [LinkedIn](https://www.linkedin.com/in/akankshya-mohanty-/)
