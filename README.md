# Next.js Blog App

Welcome to the **Next.js Blog App**!  
This project is a simple blog application built with [Next.js](https://nextjs.org/), featuring modern styling and easy setup. You can run it locally with Yarn or npm, or deploy it using Docker.

---

## 🚀 Getting Started (Manual)
## Getting Started

### Manual Setup (Yarn or NPM)

1. **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    ```


### 1. Install Dependencies

Using **Yarn**:
```bash
yarn install
```

## 📚 Table of Contents

1. [Getting Started (Manual)](#-getting-started-manual)
    - [Manual Setup (Yarn or NPM)](#manual-setup-yarn-or-npm)
    - [Install Dependencies](#1-install-dependencies)
    - [Run the Development Server](#2-run-the-development-server)
2. [Running with Docker](#-running-with-docker)
3. [Project Structure](#-project-structure)
4. [License](#-license)


### 2. Run the Development Server

Using **Yarn**:
```bash
yarn dev
```

Using **npm**:
```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see your app in action!

---

## 🐳 Running with Docker

**Build the Docker image:**
   ```bash
   docker compose --build
   ```

Then visit [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

- `app/` – Next.js app routes and pages
- `app/auth/login/` – Example authorized route (login page)
- `app/globals.css` – Styling, includes Tailwind CSS configuration
- `postcss.config.mjs` – PostCSS configuration for Tailwind CSS
- `Dockerfile` – Containerization for deployment

---

## 📝 License

This project is licensed under the MIT License.

Happy blogging! 🚀

