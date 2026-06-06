# 🚀 Career Mentor AI

AI-powered career guidance for students. Built with **FastAPI** (Python backend) + **Next.js 14** (TypeScript frontend).

---

## Features
- 🔐 JWT Authentication (register / login)
- 📄 Resume PDF upload + ATS & resume scoring
- 🎯 Career matching with skill similarity
- 📊 Skill gap analysis
- 🗺️ Personalised weekly roadmap
- 📚 Course, project & certification recommendations
- 🤖 AI Mentor chat (Gemini-powered, with smart fallback)

---

## Quick Start

### 1. Clone / Extract the project
```bash
cd career-mentor
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env — at minimum set a strong SECRET_KEY
# Optionally add GEMINI_API_KEY for AI-powered mentor responses
```

### 4. Run Backend
```bash
# From the project root:
uvicorn backend.main:app --reload --port 8000
```
API docs: http://localhost:8000/docs

### 5. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
App: http://localhost:3000

---

## Project Structure
```
career-mentor/
├── backend/
│   ├── main.py               # FastAPI app entry
│   ├── requirements.txt
│   ├── api/                  # Route handlers
│   │   ├── auth/
│   │   ├── career/
│   │   ├── resume/
│   │   ├── recommendation/
│   │   ├── mentor/
│   │   └── profile/
│   ├── services/             # Business logic
│   ├── rag/                  # Retriever + LLM
│   ├── core/                 # JWT, auth guards
│   ├── config/               # Settings (.env)
│   └── data/                 # Skills database
├── database/
│   ├── database.py
│   ├── models/               # SQLAlchemy models
│   └── jobs.csv
├── datasets/
│   ├── courses.csv
│   ├── projects.csv
│   └── certifications.csv
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js pages
│   │   ├── components/       # Reusable UI
│   │   ├── services/         # API calls
│   │   └── lib/              # Axios instance
│   └── package.json
├── .env.example
├── .gitignore
└── Dockerfile
```

---

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `SECRET_KEY` | ✅ | `change-this` | JWT signing key |
| `DATABASE_URL` | ❌ | `sqlite:///./careermentor.db` | DB connection |
| `GEMINI_API_KEY` | ❌ | empty | Enables AI mentor |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | ❌ | `1440` | Token TTL |

---

## Adding Gemini AI Mentor
1. Get a free API key at https://aistudio.google.com
2. Add to `.env`: `GEMINI_API_KEY=your-key`
3. Restart backend

Without the key, the mentor uses a built-in keyword knowledge base.
