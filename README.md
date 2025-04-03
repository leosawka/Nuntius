# 📰 **Nuntius**

Fullstack application for managing news articles.

---

## 📦 **Technologies**
### **Frontend:**
- React
- Vite
- TypeScript
- Material UI (MUI)
### **Backend:**
- Node.js
- Express
- TypeScript
- TypeORM
- PostgreSQL
- Docker & Docker Compose

---

## 📁 **Project Structure**
- `/backend`: REST API with TypeScript and PostgreSQL
- `/frontend`: React application with a responsive user interface

---

## 🚀 **How to Run**
### Prerequisites:
- Docker & Docker Compose installed

### Steps:
1. In the `backend/` directory, run:
```bash
npm run docker:dev
```
2. The backend will be available at:
```http://localhost:4000```
3. The frontend will be available at:
```http://localhost:4173```
4. The API exposes the following endpoints:
```
GET    /api/news
GET    /api/news/:id
GET    /api/news/search?term=
POST   /api/news
PUT    /api/news/:id
DELETE /api/news/:id
```
5. Data is seeded with `init.sql` on first run.

---

## ⚙️ **Environment Configuration**
In the `backend/.env` file:
```
PORT=4000
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nuntius_db
NODE_ENV=development
```

In the `frontend/.env` file:
```
VITE_API_URL=http://localhost:4000/api
```

---

## 🧪 **Available Scripts**
From the `backend/` directory:
```
npm run docker:dev    # Starts backend + frontend + PostgreSQL
docker-compose down  # Stops and removes containers
npm run docker:logs   # View live container logs
```

From the `frontend/` directory:
```
npm run dev          # Local dev server
npm run build        # Build static assets
npm run preview      # Preview production build
```

---

## ✨ **Features Implemented**
- News listing with responsive layout
- Dynamic detail view for individual articles
- Breadcrumb navigation in detail view
- Create News form with:
  - Field validation
  - URL format checking
  - Future date prevention
  - Loading indicator during submission
  - Snackbar confirmation on success
  - Cancel button with unsaved changes confirmation
  - Exit warning when there are unsaved changes
- Edit News form with:
  - Reused validation logic
  - Snackbar confirmation on update
- Delete News button with confirmation prompt
- Global banner/header with logo and Create New button
- Banner hidden in Create News view

---

## 📌 **Project Status**
- [x] Backend REST API
- [x] PostgreSQL integration
- [x] Dockerized development environment
- [x] Initial seed data with init.sql
- [x] Frontend with React + Vite
- [x] Create News flow
- [x] Navigation guard for unsaved changes
- [x] Edit/Delete functionality
- [x] Deployment