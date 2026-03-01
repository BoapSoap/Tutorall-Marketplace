# Folder: backend

## Purpose
The backend folder contains the backend code

---

## Contents
- `media/` — Placeholder images
- `static/` — Unchanging files
- `tutorall/` — Helps with running the app
Backend handling the classes:
- `adverts/`
- `catagories/`
- `contributors/`
- `courses/`
- `files/`
- `professors/`
- `users/`
- `user_messages/`

---

## How to Run
1) Open Docker
2) Go to this project in terminal, go to application folder
3) docker compose -f compose.dev-backend.yml down --remove-orphans
4) docker compose -f compose.dev-backend.yml up --build