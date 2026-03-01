# TutorAll — Full-Stack Tutoring Marketplace

## Overview

TutorAll is a full-stack tutoring marketplace designed to connect students with verified tutors through a scalable web architecture. The platform supports authentication, tutor discovery, booking workflows, and role-based dashboards.

This project was built in a collaborative team environment. While not the officially designated team lead, I served as the primary GitHub maintainer and functioned as a technical co-lead, contributing heavily to backend architecture and deployment decisions.

---

## My Role & Contributions

- Served as primary GitHub maintainer, managing branching strategy and pull request reviews  
- Helped define backend architecture and REST API design  
- Implemented core backend services and database integration  
- Coordinated frontend/backend integration to maintain stable API contracts  
- Assisted in debugging deployment and cross-service integration issues  
- Contributed to infrastructure setup and cloud deployment  

---

## Tech Stack

### Frontend
- React (TypeScript)
- Component-based UI architecture
- Role-based routing and protected views

### Backend
- Django REST Framework
- MySQL relational database
- ORM-based schema design
- Authentication and authorization logic

### Infrastructure & Deployment
- Docker Compose for local containerized development
- AWS EC2 instance for cloud hosting
- Environment-based configuration
- Git-based collaborative workflow

---

## Cloud Deployment (AWS)

The application was deployed on an AWS EC2 instance to simulate a production-like environment.

Key responsibilities included:

- Configuring EC2 instance and security groups
- Managing server environment setup
- Handling environment variables and production settings
- Running backend services on remote host
- Ensuring database connectivity and persistent storage

Deploying to EC2 provided hands-on experience with cloud infrastructure, remote server management, and application hosting outside of a local development environment.

---

## Core Features

- User registration and authentication
- Tutor profile creation and management
- Student-tutor search and filtering
- Booking workflow
- Role-based dashboards
- Persistent relational database storage
- API-driven frontend/backend separation

---

## Architecture

The system follows a client-server architecture:

- React frontend communicates with RESTful backend API
- Backend processes business logic and database transactions
- MySQL manages relational data persistence
- Docker ensures consistent development environments
- AWS EC2 hosts the deployed application

This separation enabled parallel development and improved scalability and maintainability.

---

## Technical Highlights

- Designed normalized relational database schema
- Implemented RESTful endpoints with structured error handling
- Managed cross-origin authentication flows
- Containerized development environment using Docker
- Deployed full-stack application to AWS EC2
- Maintained structured Git branching workflow for team collaboration

---

## Key Engineering Challenges

- Coordinating multi-developer merges while preserving API stability
- Designing scalable tutor-student relational mappings
- Managing authentication across distributed layers
- Configuring and securing AWS EC2 environment for deployment

---

## Lessons Learned

- Importance of clean API contracts in team development
- Infrastructure considerations when moving from local to cloud deployment
- Managing production environment variables securely
- Leading technical direction without formal authority

---

## Future Improvements

- Real-time messaging between tutors and students
- Payment integration
- Load balancing and auto-scaling configuration
- CI/CD pipeline for automated deployment

---

## How to Run Locally

```bash
git clone https://github.com/yourusername/tutorall.git
cd tutorall
docker compose up
