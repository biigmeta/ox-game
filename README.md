# OX Game Project

โปรเจกต์เกม OX (Tic-Tac-Toe) ที่ประกอบด้วยส่วนของ Backend (API) และ Frontend (Web App) โดยใช้งานร่วมกับฐานข้อมูล PostgreSQL

## 📋 ความต้องการของระบบ (Prerequisites)

ก่อนเริ่มใช้งาน ควรตรวจสอบว่าเครื่องของคุณได้ติดตั้งโปรแกรมเหล่านี้แล้ว:

1.  **Node.js** (แนะนำเวอร์ชัน LTSล่าสุด) - [ดาวน์โหลด](https://nodejs.org/)
2.  **Docker Desktop** (สำหรับรัน Database และ Containerized App) - [ดาวน์โหลด](https://www.docker.com/products/docker-desktop/)
3.  **Git** - สำหรับ Clone project

---

## 🚀 ขั้นตอนการติดตั้งและเริ่มใช้งาน (Getting Started)

### 1. Clone Project

```bash
git clone <repository-url>
cd ox-game
```

### 2. ตั้งค่า Environment Variables

โปรเจกต์มีการแยกไฟล์ Environment Variable เป็น 3 ส่วน คือ Root (สำหรับ Docker), API, และ Web App ให้ทำการคัดลอกไฟล์ตัวอย่าง `.env.example` ไปเป็น `.env` ในแต่ละส่วน

#### 2.1 Root Config (สำหรับ Database ใน Docker)
```bash
# ที่ root folder ของ project
cp .env.example .env
```

#### 2.2 API Config
```bash
cd api
cp .env.example .env
# แก้ไขค่าใน .env ให้ถูกต้องถ้าจำเป็น (เช่น DATABASE_URL)
cd ..
```

#### 2.3 Web App Config
```bash
cd web-app
cp .env.example .env
# **สำคัญ:** ให้แก้ไขค่า `GOOGLE_CLIENT_ID` และ `GOOGLE_CLIENT_SECRET` ในไฟล์ .env นี้ ตามค่าที่ได้รับทาง Email
cd ..
```

---

## 🐳 วิธีรันด้วย Docker Compose (แนะนำ)

วิธีนี้จะรันทั้ง Database, API, และ Web App พร้อมกันใน Container เดียว

1.  **Start Services:**
    เปิด Terminal ที่ root folder และรันคำสั่ง:

    ```bash
    docker-compose up -d
    ```
    *(คำสั่งนี้จะทำการ build image และ start services ทั้งหมดใน background)*

2.  **ตรวจสอบสถานะ:**
    ```bash
    docker-compose ps
    ```

3.  **เข้าใช้งาน:**
    -   **Web App (Frontend):** [http://localhost:3001](http://localhost:3001)
    -   **API (Backend):** [http://localhost:3000](http://localhost:3000)
    -   **Database (PostgreSQL):** Port `5454`

4.  **หยุดการทำงาน:**
    ```bash
    docker-compose down
    ```

---

## 🛠️ วิธีรันแบบ Local Development (Manual Setup)

หากต้องการรันแต่ละ service แยกกันเพื่อพัฒนา (Development Mode):

### 1. รัน Database

ใช้ Docker เพื่อรันเฉพาะ Database:
```bash
docker-compose up -d db
```

### 2. รัน API (Backend)

เปิด Terminal ใหม่ แล้วทำตามขั้นตอน:

```bash
cd api
npm install

# Setup Database Schema (Prisma)
npx prisma generate
npx prisma db push  # หรือ npx prisma migrate dev

# Seed Database (ถ้ามี)
npm run seed

# Start Server
npm run dev
```
*API จะรันที่ [http://localhost:3000](http://localhost:3000)*

### 3. รัน Web App (Frontend)

เปิด Terminal อีกหน้าต่าง แล้วทำตามขั้นตอน:

```bash
cd web-app
npm install

# Start Next.js App
npm run dev
```
*Web App จะรันที่ [http://localhost:3000](http://localhost:3000) (Default Next.js port) หรือตาม config ใน package.json*

> **หมายเหตุ:** หากรันแบบ Local Web App อาจจะรันที่ Port 3000 ชนกับ API Default ให้ตรวจสอบ `package.json` ของ `web-app` หรือเปลี่ยน Port ผ่าน command `npm run dev -- -p 3001`

---

## � การเข้าใช้งาน Dashboard (สำหรับ Admin)

หากต้องการดูหน้า Dashboard แสดงคะแนนของผู้เล่น สามารถเข้าใช้งานได้ดังนี้:

1.  เข้าสู่ระบบ (Log In) ด้วยบัญชี Admin:
    -   **Email:** `admin@example.com`
    -   **Password:** `admin123`
2.  เมื่อเข้าสู่ระบบสำเร็จ จะปรากฏเมนู **Dashboard** บน Navigation Bar

---

## �📂 โครงสร้างโปรเจกต์

-   `api/`: Backend Service (Node.js, Express, Prisma)
-   `web-app/`: Frontend Application (Next.js, React, Tailwind)
-   `docker-compose.yml`: Configuration สำหรับรันด้วย Docker

## 📝 Troubleshooting

-   **Port Conflict:** หากรันไม่ผ่าน ให้เช็คว่า Port 3000, 3001, หรือ 5454 ถูกใช้งานอยู่หรือไม่
-   **Database Connection Refused:** ตรวจสอบว่า Container Database รันอยู่หรือไม่ และค่า Connection String ใน `.env` ของ `api` ตรงกับ Port ที่ map ออกมา (Default 5454 หรือ 5432 ใน network ภายใน)
