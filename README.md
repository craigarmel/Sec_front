# SecureBlog - Frontend

Welcome to **SecureBlog**!  
This is a secure blog application built with [Next.js](https://nextjs.org/), featuring modern security practices, authentication, and role-based access control.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn
- Backend API running (see `NEXT_PUBLIC_API_URL` in `.env.example`)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd Sec_front
   ```

2. **Install Dependencies:**

   Using **npm**:
   ```bash
   npm install
   ```

   Using **yarn**:
   ```bash
   yarn install
   ```

3. **Configure Environment Variables:**

   Copy `.env.example` to `.env` and update the values:

   ```bash
   cp .env.example .env
   ```

   Required variables:
   - `NEXT_PUBLIC_API_URL`: Backend API URL (default: `http://localhost:3001/api`)
   - `NODE_ENV`: Environment (development/production)
   - `NEXT_PUBLIC_APP_URL`: Frontend URL (default: `http://localhost:3000`)

4. **Run the Development Server:**

   Using **npm**:
   ```bash
   npm run dev
   ```

   Using **yarn**:
   ```bash
   yarn dev
   ```

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

---

## 🐳 Running with Docker

**Build and run the Docker container:**

```bash
docker compose --build
```

Then visit [http://localhost:3000](http://localhost:3000).

---

## 🔒 Security Features

This application implements comprehensive security measures:

### 1. Authentication & Sessions
- ✅ Strong password requirements (12+ characters, 3+ criteria)
- ✅ Secure password hashing (handled by backend)
- ✅ HttpOnly, Secure, SameSite cookies
- ✅ Session timeout and proper logout

### 2. Authorization & Access Control
- ✅ Role-based access control (USER/ADMIN)
- ✅ Protected routes with server-side verification
- ✅ IDOR protection (Insecure Direct Object Reference)
- ✅ Client and server-side access checks

### 3. Input Validation & XSS Protection
- ✅ Client-side validation with Zod schemas
- ✅ Server-side validation (backend)
- ✅ HTML sanitization for user-generated content
- ✅ XSS protection in comments and articles

### 4. Security Headers
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY`
- ✅ `Content-Security-Policy`
- ✅ `X-XSS-Protection`
- ✅ `Referrer-Policy`

### 5. CSRF Protection
- ✅ CSRF token support in API client
- ✅ SameSite cookie attribute

### 6. Error Handling
- ✅ Production-safe error messages (no stack traces)
- ✅ Global error boundaries
- ✅ Proper error logging

### 7. Data Protection
- ✅ Environment variables for secrets
- ✅ `.gitignore` configured for sensitive files
- ✅ No secrets in code

---

## 📁 Project Structure

```
Sec_front/
├── app/
│   ├── admin/              # Admin dashboard (protected)
│   ├── auth/               # Authentication pages
│   │   ├── login/          # Login page
│   │   └── register/       # Registration page
│   ├── articles/           # Article pages
│   ├── components/         # React components
│   │   ├── layout/         # Layout components
│   │   ├── security/       # Security components
│   │   └── blog/           # Blog components
│   ├── legal/              # Legal pages
│   ├── user/               # User dashboard (protected)
│   ├── error.tsx           # Error boundary
│   ├── global-error.tsx    # Global error handler
│   └── layout.tsx          # Root layout
├── components/
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── api.ts              # API client
│   ├── auth.ts             # Auth utilities
│   ├── utils.ts            # Utility functions (XSS protection)
│   └── validators/         # Zod validation schemas
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── next.config.ts          # Next.js configuration (security headers)
└── package.json            # Dependencies
```

---

## 🛠️ Technologies

- **Framework**: Next.js 16
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Notifications**: Sonner

---

## 📝 Environment Variables

See `.env.example` for all required environment variables.

**Important**: Never commit `.env` files to version control. The `.gitignore` is configured to exclude them.

---

## 🔐 Security Checklist

This project follows a comprehensive security checklist:

- ✅ No secrets in code
- ✅ Environment variables for configuration
- ✅ Strong password requirements
- ✅ Secure session management
- ✅ Role-based access control
- ✅ IDOR protection
- ✅ XSS protection
- ✅ Input validation (client & server)
- ✅ CSRF protection
- ✅ Security headers
- ✅ Production error handling
- ✅ GDPR compliance (consent, privacy policy)

---

## 🧪 Development

### Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

### Running Linter

```bash
npm run lint
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

1. Follow security best practices
2. Run linter before committing
3. Test authentication flows
4. Verify security headers in production

---

Happy secure blogging! 🚀🔒
