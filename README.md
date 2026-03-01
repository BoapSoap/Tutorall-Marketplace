# TutorAll — Full-Stack Tutoring Marketplace

## Overview

TutorAll is a full-stack tutoring marketplace designed to connect students with verified tutors through a scalable, production-style web architecture. The platform supports user authentication, profile management, tutor discovery, booking workflows, and role-based access control.

This project was built in a collaborative team environment. While not the officially designated team lead, I served as the primary GitHub maintainer and functioned as a technical co-lead, contributing heavily to architectural decisions and backend integration.

---

## My Role & Contributions

- Acted as primary GitHub maintainer, managing branching strategy, pull requests, and merge reviews  
- Helped define backend architecture and API structure  
- Implemented core backend services and database integration  
- Coordinated development across frontend and backend teams to maintain consistent API contracts  
- Assisted in debugging cross-service integration and deployment configuration  
- Contributed to milestone planning and technical decision-making  

In practice, I led significant portions of implementation and repository organization, ensuring system stability and development velocity.

---

## Tech Stack

### Frontend
- React (TypeScript)
- Component-based UI architecture
- Role-based routing and protected views

### Backend
- Django REST API
- MySQL database
- ORM-based relational modeling
- Authentication and authorization logic

### Infrastructure
- Docker Compose for local containerized development
- Environment-based configuration
- Git-based collaborative workflow

*(Adjust stack details if needed to match your exact implementation.)*

---

## Core Features

- User registration and authentication
- Tutor profile creation and management
- Student-tutor search and filtering
- Booking request workflow
- Role-based dashboards
- Persistent relational database storage
- API-driven frontend/backend separation

---

## Architecture

The application follows a client-server architecture:

- React frontend communicates with a RESTful backend API
- Backend handles business logic and database transactions
- MySQL manages persistent relational data
- Docker ensures reproducible development environments

This separation allowed parallel frontend/backend development and improved maintainability.

---

## Technical Highlights

- Designed normalized relational database schema
- Implemented RESTful endpoints with structured status handling
- Managed cross-origin and session authentication challenges
- Structured modular backend services for scalability
- Maintained clean Git branching strategy for multi-developer collaboration
- Integrated containerized environment for consistent team workflows

---

## Key Engineering Challenges

- Coordinating multi-developer merges while preserving API contracts
- Designing scalable tutor-student relational mappings
- Managing authentication across frontend and backend layers
- Preventing state inconsistencies between UI and persistent storage

---

## Lessons Learned

- The importance of structured Git workflows in collaborative engineering
- Designing APIs before frontend integration to reduce rework
- Balancing feature delivery with architectural integrity
- Leading technical direction without formal authority

---

## Future Improvements

- Real-time messaging between tutors and students
- Payment processing integration
- Search optimization and ranking algorithms
- Cloud deployment (AWS / GCP)
- CI/CD pipeline integration

---

## How to Run Locally

```bash
git clone https://github.com/yourusername/tutorall.git
cd tutorall
docker compose up
