# Garments Order & Production Tracker System

The **Garments Order & Production Tracker System** is a full‑stack web
application designed to help small and medium‑sized garment factories
efficiently manage orders, products, production stages, and user roles. The
system supports **Admin, Manager, and Buyer** roles with role‑based dashboards,
real‑time order tracking, and analytics.

---

## Live Website

- **Live URL:** https://garments-tracker-system.web.app/
- **Server API:** https://garments-tracker-system-server.vercel.app/

---

## Key Features

### Authentication & Security

- Email & Password based authentication using **Firebase**
- Google login (Buyer role, default status: Pending)
- JWT token stored securely in **cookies**
- Protected private routes (no redirect on reload)
- Firebase & MongoDB credentials secured via **Environment Variables**

---

### Public Pages

- Modern animated **Home Page** (Framer Motion)
- Hero Section with CTA
- Our Products (6 items from MongoDB)
- How It Works (Step‑by‑Step)
- Customer Feedback Carousel
- Extra custom sections
- Responsive Navbar & Footer

---

### Product System

- All Products Page (Grid Layout)
- Product Details Page (Private Route)
- Product Images & Demo Video
- MOQ & Quantity Validation
- Conditional Order Button (Role & Status Based)

---

### Order & Booking System

- Booking Form with auto‑calculated price
- Quantity validation (MOQ & Stock)
- Cash on Delivery / PayFirst option
- Orders saved to database
- Order visible in user dashboard

---

## Dashboards

### Admin Dashboard

- Analytics Dashboard

  - Products: Today / Week / Month
  - Orders: This Month
  - Users: New & Total
  - Managers: Active Count
  - Charts: Bar / Line / Pie
  - Filters: Today / 7 Days / 30 Days

- Manage Users (Search, Filter, Role Update, Suspend )
- Manage All Products
- Manage All Orders

---

### Manager Dashboard

- Add Product
- Manage Products
- Pending Orders
- Approve / Reject Orders
- Approved Orders with Tracking Updates
- My Profile

---

### 👤 Buyer Dashboard

- My Orders
- Track Order (Timeline View)
- Cancel Pending Orders
- My Profile

---

## Order Tracking System

- Step‑by‑Step Production Timeline:

  - Cutting Completed
  - Sewing Started
  - Finishing
  - QC Checked
  - Packed
  - Shipped
  - Out for Delivery

- Latest step highlighted
- Read‑only for buyers

---

## 🎨 UI / UX Highlights

- Unique, recruiter‑friendly design
- Glassmorphism cards & modern layout
- Consistent typography & spacing
- Dark / Light theme toggle
- Fully responsive (Mobile / Tablet / Desktop)
- Reusable components & modals
- Loading spinners for API calls
- Toast & SweetAlert for all CRUD actions
- Custom 404 Page
- Dynamic Page Titles

---

## 🛠️ Tech Stack

### Frontend

- React 19
- React Router DOM
- Tailwind CSS
- Framer Motion
- TanStack React Query
- React Hook Form
- Recharts
- Swiper.js
- SweetAlert2 & React Toastify

### Backend

- Node.js
- Express.js
- MongoDB
- Firebase token Authentication

### Authentication & Hosting

- Firebase Authentication
- Firebase Hosting

---

---

## Author

**Md Obaidul Islam** Frontend Developer (React)
