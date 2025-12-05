# REST API - Express + TypeScript + Prisma

REST API lengkap dengan implementasi Clean Code Architecture, menggunakan Express.js, TypeScript, Prisma ORM, PostgreSQL, dan Express Validator.

## 🚀 Fitur

- ✅ Authentication (Register & Login) dengan JWT
- ✅ User Management (CRUD Operations)
- ✅ Clean Code Architecture (Repository, Service, Controller Pattern)
- ✅ Validasi input menggunakan Express Validator
- ✅ Password hashing dengan bcrypt
- ✅ Authorization middleware
- ✅ Pagination
- ✅ Error handling
- ✅ TypeScript untuk type safety

## 📁 Struktur Folder

```
src/
├── controllers/       # Request handlers
├── services/          # Business logic
├── repositories/      # Database operations
├── routes/            # API routes
├── middlewares/       # Express middlewares
├── validators/        # Express Validator schemas
├── utils/             # Helper utilities
├── types/             # TypeScript interfaces
├── app.ts             # Express app setup
└── index.ts           # Entry point
```


## 📚 API Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Admin",
  "username": "admin",
  "phoneNumber": "08123456789",
  "password": "12345678"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "12345678"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "a125925e-a770-4c1b-96aa-9bfaebb63988",
      "name": "Admin",
      "username": "admin",
      "phoneNumber": "08123456789",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### User Management

**Note:** Semua endpoint User memerlukan Authorization header:
```
Authorization: Bearer <your_token>
```

#### Get All Users (with Pagination)
```http
GET /api/user?page=1&limit=10
Authorization: Bearer <your_token>
```

#### Get User By ID
```http
GET /api/user/:id
Authorization: Bearer <your_token>
```

#### Create User
```http
POST /api/user
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "phoneNumber": "08123456789",
  "password": "12345678"
}
```

#### Update User
```http
PATCH /api/user/:id
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "phoneNumber": "08123456789",
  "password": "12345678"
}
```

#### Delete User
```http
DELETE /api/user/:id
Authorization: Bearer <your_token>
```

## 🔐 Fitur Keamanan

1. **Password Hashing**: Menggunakan bcrypt dengan salt rounds 10
2. **JWT Authentication**: Token expire dalam 7 hari
3. **Input Validation**: Validasi semua input menggunakan Express Validator
4. **Authorization Middleware**: Proteksi endpoint yang memerlukan authentication
5. **Error Handling**: Centralized error handling

## 🏗️ Clean Code Architecture

### Repository Pattern
Menghandle semua operasi database dan query Prisma.

### Service Pattern
Berisi business logic, validasi, dan orchestration.

### Controller Pattern
Menghandle HTTP request/response dan memanggil services.

### Dependency Injection
Semua dependencies di-inject melalui constructor untuk better testability.

## 📝 Validation Rules (Express Validator)

- **Name**: Required, max 100 characters
- **Username**: Required, min 3 characters, max 50 characters, unique, alphanumeric + underscore
- **Phone Number**: Required
- **Password**: Required, min 8 characters

## 🧪 Testing dengan Postman/Thunder Client

1. Register user baru di `/api/auth/register`
2. Login untuk mendapatkan token di `/api/auth/login`
3. Copy token dari response
4. Gunakan token di header `Authorization: Bearer <token>` untuk semua endpoint `/api/user/*`

## 📦 Available Scripts

```bash
npm run dev              # Run development server
npm run build            # Build untuk production
npm run start            # Run production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
```

## 🔧 Tech Stack

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation

## 📄 License

MIT

---

**Dibuat dengan ❤️ menggunakan Clean Code Architecture**
