# Student Management (Next.js CRUD)

ระบบจัดการข้อมูลนักศึกษา (Student CRUD) สร้างด้วย **Next.js + Prisma + SQLite**
รองรับการ **เพิ่ม / แสดง / แก้ไข / ลบ** ข้อมูลนักศึกษา

> อ้างอิงจากเอกสาร: <https://it-nkc.github.io/nextjs-crud/>

## เทคโนโลยีที่ใช้

| เทคโนโลยี | หน้าที่ |
| --- | --- |
| [Next.js](https://nextjs.org/) (App Router, Server Actions) | เฟรมเวิร์กเว็บ |
| [Prisma 7](https://www.prisma.io/) | ORM เชื่อมต่อฐานข้อมูล |
| SQLite (`better-sqlite3`) | ฐานข้อมูลแบบไฟล์ (`dev.db`) |
| Tailwind CSS 4 | จัดรูปแบบหน้าเว็บ |
| TypeScript | ภาษาที่ใช้เขียนโค้ด |

## ฟีเจอร์

- แสดงรายชื่อนักศึกษาทั้งหมดและจำนวนรวม (**Read**)
- เพิ่มนักศึกษาใหม่ผ่านฟอร์ม (**Create**)
- แก้ไขข้อมูลนักศึกษา (**Update**)
- ลบนักศึกษา พร้อมหน้าต่างยืนยันก่อนลบ (**Delete**)
- ตรวจจับรหัสนักศึกษาซ้ำ และแสดงข้อความแจ้งเตือน

## สิ่งที่ต้องติดตั้งก่อน

- [Node.js](https://nodejs.org/) เวอร์ชัน **20.9 ขึ้นไป** (แนะนำ LTS ล่าสุด)
- npm (มาพร้อม Node.js)
- Git

ตรวจสอบเวอร์ชัน โดยเปิด Terminal แล้วพิมพ์

```bash
node -v
npm -v
```

## วิธีติดตั้ง

**1. ดาวน์โหลดโปรเจกต์**

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

> หรือกด **Code → Download ZIP** บน GitHub แล้วแตกไฟล์ จากนั้นเปิด Terminal ในโฟลเดอร์นั้น

**2. ติดตั้ง Dependencies**

```bash
npm install
```

(ขั้นตอนนี้จะรัน `prisma generate` ให้อัตโนมัติ เพื่อสร้าง Prisma Client ไว้ที่ `app/generated/prisma/`)

**3. ตั้งค่า Environment Variables**

คัดลอกไฟล์ `.env.example` เป็น `.env`

```bash
# macOS / Linux / Git Bash
cp .env.example .env

# Windows (Command Prompt)
copy .env.example .env
```

ค่าในไฟล์ `.env`

```env
DATABASE_URL="file:./dev.db"
```

**4. สร้างฐานข้อมูล SQLite**

```bash
npx prisma migrate dev
```

คำสั่งนี้จะสร้างไฟล์ `dev.db` และตาราง `Student` ตามไฟล์ใน `prisma/migrations/`

**5. รันโปรเจกต์**

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ <http://localhost:3000> (ระบบจะพาไปหน้า `/students` โดยอัตโนมัติ)

## วิธีใช้งาน

| หน้า | URL | การใช้งาน |
| --- | --- | --- |
| รายชื่อนักศึกษา | `/students` | ดูรายชื่อทั้งหมด จำนวนรวม และปุ่มจัดการ |
| เพิ่มนักศึกษา | `/students/create` | กรอกฟอร์มแล้วกด **บันทึก** |
| แก้ไขนักศึกษา | `/students/[id]/edit` | แก้ไขข้อมูลแล้วกด **บันทึกการแก้ไข** |

**เพิ่มข้อมูล**
1. ที่หน้า `/students` กดปุ่ม **เพิ่มนักศึกษา**
2. กรอก รหัสนักศึกษา, ชื่อ-นามสกุล, Email (ไม่บังคับ), สาขา, ชั้นปี (1–8)
3. กด **บันทึก** ระบบจะกลับมาที่หน้ารายชื่อ

**แก้ไขข้อมูล**
1. กดปุ่ม **แก้ไข** (สีเหลือง) ในแถวของนักศึกษา
2. แก้ข้อมูลที่ต้องการ แล้วกด **บันทึกการแก้ไข**

**ลบข้อมูล**
1. กดปุ่ม **ลบ** (สีแดง) ในแถวของนักศึกษา
2. กด **ตกลง** ในหน้าต่างยืนยัน

## โครงสร้างโปรเจกต์

```
.
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                 # redirect ไป /students
│   ├── lib/
│   │   └── prisma.ts            # Prisma Client + SQLite adapter
│   ├── generated/prisma/        # สร้างอัตโนมัติจาก prisma generate (ไม่ commit)
│   └── students/
│       ├── actions.ts           # Server Actions: create / update / delete
│       ├── delete-button.tsx    # ปุ่มลบ (Client Component)
│       ├── student-form.tsx     # ฟอร์มที่ใช้ร่วมกันของหน้าเพิ่ม/แก้ไข
│       ├── page.tsx             # รายชื่อนักศึกษา (Read)
│       ├── create/page.tsx      # หน้าเพิ่มนักศึกษา (Create)
│       └── [id]/edit/page.tsx   # หน้าแก้ไขนักศึกษา (Update)
├── prisma/
│   ├── schema.prisma            # โครงสร้างตาราง Student
│   └── migrations/              # SQL migration
├── prisma.config.ts             # ตั้งค่า Prisma CLI
├── .env.example                 # ตัวอย่าง Environment Variables
└── package.json
```

## Database Schema

```prisma
model Student {
  id          Int      @id @default(autoincrement())
  studentCode String   @unique
  name        String
  email       String?
  major       String
  year        Int
  status      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## คำสั่งที่ใช้บ่อย

| คำสั่ง | ความหมาย |
| --- | --- |
| `npm run dev` | รันโหมดพัฒนา (http://localhost:3000) |
| `npm run build` | Build สำหรับ production |
| `npm start` | รัน production server (ต้อง build ก่อน) |
| `npm run lint` | ตรวจสอบโค้ดด้วย ESLint |
| `npx prisma validate` | ตรวจสอบ schema |
| `npx prisma generate` | สร้าง Prisma Client ใหม่ |
| `npx prisma migrate dev` | สร้าง/อัปเดตฐานข้อมูล |
| `npx prisma studio` | เปิดหน้าดู/แก้ข้อมูลในฐานข้อมูลผ่านเบราว์เซอร์ |

## แก้ปัญหาเบื้องต้น

- **`Cannot find module '@/app/generated/prisma/client'`** → รัน `npx prisma generate`
- **`DATABASE_URL` ไม่ถูกตั้งค่า / ไม่พบตาราง `Student`** → ตรวจสอบว่ามีไฟล์ `.env` แล้วรัน `npx prisma migrate dev`
- **ติดตั้ง `better-sqlite3` ไม่ผ่านบน Windows** → ใช้ Node.js เวอร์ชัน LTS ล่าสุด หรือติดตั้ง Visual Studio Build Tools (Desktop development with C++)
- **Port 3000 ถูกใช้งานอยู่** → รัน `npm run dev -- -p 3001`

## License

โปรเจกต์นี้จัดทำเพื่อการศึกษา
