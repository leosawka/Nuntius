# 📰 **Nuntius**

Fullstack application for managing news articles.

## 📦 **Technologies**
### **Frontend:** 
- React
- Vite
- TypeScript
### **Backend:** 
* Node.js
* Express
* TypeScript
* TypeORM
* PostgreSQL
* Docker & Docker Compose

## 📁 **Project Structure**
- `/backend`: REST API with TypeScript and PostgreSQL
- `/frontend`: React application with user interface

## 🚀 **How to Run**
### Prerequisites:
* Docker & Docker Compose installed

### Steps:
1. In the ```backend/``` directory, run:
```npm run docker:dev```
2. The backend will be available at:
```http://localhost:4000```
3. The API exposes the following endpoints:
```
GET    /api/news
GET    /api/news/:id
GET    /api/news/search?term=
POST   /api/news
PUT    /api/news/:id
DELETE /api/news/:id
```
4. Data is seeded with ```init.sql``` on first run.

---

## ⚙️ **Environment Configuration**
In the ```backend/.env``` file:
```
PORT=4000
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nuntius_db
NODE_ENV=development
```

---

## 🧪 **Available Scripts**
From the ```backend/``` directory:
```
npm run docker:dev    # Starts backend + PostgreSQL
npm run docker:down   # Stops containers
npm run docker:logs   # View live container logs
```

---

## 📌 **Project Status**
 - [x] Backend REST API
 - [x] PostgreSQL integration
 - [x] Dockerized development environment
 - [x] Initial seed data with init.sql
 - [] Frontend with React + Vite
 - [] Deployment
