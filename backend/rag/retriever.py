"""
RAG Retriever - provides context for mentor questions.
Currently uses a keyword-based lookup against static career knowledge.
Replace with FAISS + embeddings for production.
"""

CAREER_KNOWLEDGE = {
    "python": "Python is essential for data science, ML, backend dev, and automation. Learn via official docs, Automate the Boring Stuff, and real projects.",
    "machine learning": "ML involves supervised, unsupervised, and reinforcement learning. Start with scikit-learn, then PyTorch or TensorFlow. Study Andrew Ng's course on Coursera.",
    "deep learning": "Deep learning uses neural networks with multiple layers. Key concepts: backprop, CNNs, RNNs, Transformers. Use PyTorch for research, TensorFlow for production.",
    "docker": "Docker packages apps into containers. Learn: Dockerfile, images, containers, volumes, docker-compose. Great for DevOps and MLOps.",
    "aws": "Amazon Web Services is the leading cloud platform. Core services: EC2, S3, Lambda, RDS. Start with AWS Cloud Practitioner certification.",
    "react": "React is a JavaScript library for building UIs. Learn hooks (useState, useEffect), component patterns, and state management (Redux/Zustand).",
    "sql": "SQL is essential for data querying. Learn SELECT, JOIN, GROUP BY, subqueries, indexes, and window functions. Practice on LeetCode or Mode Analytics.",
    "fastapi": "FastAPI is a modern Python web framework. It's fast, has automatic docs (Swagger), and uses Pydantic for validation. Great for REST APIs and microservices.",
    "career": "To advance your career: build a portfolio of real projects, contribute to open source, network on LinkedIn, and prepare for system design + DSA interviews.",
    "resume": "A strong resume: 1 page, clear sections (summary, experience, projects, education, skills), quantify achievements, use ATS-friendly keywords.",
    "interview": "Tech interviews: study data structures, algorithms (LeetCode), system design (Grokking the System Design Interview), and behavioral questions (STAR method).",
    "default": "I'm here to help with your career guidance. Ask me about specific skills, how to learn technologies, interview prep, resume tips, or career paths.",
}


def retrieve_context(question: str) -> str:
    question_lower = question.lower()
    for keyword, context in CAREER_KNOWLEDGE.items():
        if keyword in question_lower:
            return context
    return CAREER_KNOWLEDGE["default"]
