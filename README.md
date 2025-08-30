## Book Tracker

### Uruchomienie – Docker

Wymagane: Docker + Docker Compose.

```bash
docker compose up --build
```

Frontend: http://localhost:5173  
Backend: http://localhost:4000 (np. /api/books)

### Uruchomienie lokalne (bez Dockera)

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```
