# 🤖 Chatbot AI App

A modern **Next.js + TypeScript** chatbot application integrating **GraphQL** and **StepZen**, designed for scalability, clean architecture, and AI-driven conversations.

---

## 🚀 Overview

This project serves as a foundation for building an AI-powered chatbot interface using **Next.js (App Router)** and **TypeScript**.  
It also demonstrates integration with **StepZen GraphQL** APIs and a modular folder structure that promotes scalability.

---

## 🧠 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Next.js 14+** | React framework for SSR and routing |
| **TypeScript** | Strong typing for better maintainability |
| **GraphQL** | API query language for fetching structured data |
| **StepZen** | Cloud GraphQL layer to connect data sources |
| **Tailwind CSS** | Utility-first CSS framework |
| **PostgreSQL (PLpgSQL)** | Backend database (used in seed.sql) |
| **Vercel** | Deployment platform |

---

## 📁 Folder Structure

chatbot-ai-app/
│
├── graphql/ # GraphQL queries and schema definitions
├── public/ # Static assets
├── src/ # Application source code
│ ├── app/ # Next.js app router pages
│ ├── components/ # Reusable React components
│ ├── lib/ # Utility and helper functions
│ └── styles/ # Global styles
│
├── stepzen/ # StepZen GraphQL endpoint configuration
├── types/ # TypeScript types and interfaces
│
├── seed.sql # Database seed script
├── next.config.ts # Next.js configuration
├── package.json # Dependencies and scripts
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation

---

## ⚙️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/iamgassi/chatbot-ai-app.git
cd chatbot-ai-app
npm install
🧑‍💻 Running Locally
Start the development server:

bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Then open your browser at:
👉 http://localhost:3000

🌐 Deployment
This project is fully optimized for Vercel.
To deploy:

Push your code to a GitHub repository.

Go to Vercel.

Import your repo → Configure project → Deploy.

Your app will be live in seconds 🚀

🔮 Possible Improvements
Here are some next steps to extend this project:

🔐 Add JWT or OAuth authentication (Google, GitHub, etc.)

💬 Implement chat persistence and history

⚙️ Replace StepZen with a custom Node.js + Express GraphQL server

🧩 Integrate Redux Toolkit or React Query for state management

🌈 Improve UI with advanced Tailwind components or shadcn/ui

☁️ Use MongoDB Atlas or Supabase for real data storage

🧱 Example Use Case
This project can serve as a:

Portfolio project to showcase full-stack skills

Starting point for an AI chat interface

Base for GraphQL or Next.js learning project

Template for integrating third-party AI APIs (like OpenAI, Gemini, etc.)

📜 License
This project is open source under the MIT License.

💡 Author
Gaurav Gassi
Full Stack MERN Developer
GitHub Profile : https://github.com/iamgassi
(Open to roles in Gurugram, Noida, or Remote)
