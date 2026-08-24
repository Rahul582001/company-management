# Company Management Application

A full-stack company management application built with **React, TypeScript, NestJS, TypeORM, and PostgreSQL**.

The application allows users to create, view, search, sort, paginate, and delete companies through a responsive web interface backed by a REST API.

---

## Live Demo

### Frontend

https://company-management-dzlerw91g-rahul582001s-projects.vercel.app/

### Backend API

https://company-management-backend-9vs3.onrender.com

---

## Tech Stack

### Frontend

* React
* TypeScript
* Axios
* CSS
* Vite

### Backend

* NestJS
* TypeScript
* TypeORM
* PostgreSQL
* class-validator

---

## Features

### Required Features

* Create a company
* List companies
* Search companies by name
* Delete a company
* Responsive user interface
* Loading states
* Error handling
* PostgreSQL data persistence

### Additional Features

* Client-side form validation
* Server-side DTO validation
* Pagination
* Sorting
* Production deployment

---

## Company Fields

Each company contains:

| Field           | Description                |
| --------------- | -------------------------- |
| `id`            | Unique company identifier  |
| `companyName`   | Name of the company        |
| `website`       | Company website            |
| `industry`      | Company industry           |
| `employeeCount` | Number of employees        |
| `createdAt`     | Company creation timestamp |

---

## Architecture

```text
React + TypeScript
        |
        | Axios / REST API
        ↓
NestJS + TypeScript
        |
        | TypeORM
        ↓
PostgreSQL
```

### Backend Architecture

The backend follows NestJS modular architecture:

```text
Controller
    ↓
Service
    ↓
TypeORM Repository
    ↓
PostgreSQL
```

* **Controller** handles HTTP requests and responses.
* **Service** contains company-related business logic.
* **DTO** validates incoming request data.
* **Entity** represents the PostgreSQL company table.
* **TypeORM Repository** handles database operations.

---

## Project Structure

```text
company-management/
│
├── company-backend/
│   ├── src/
│   │   ├── companies/
│   │   │   ├── dto/
│   │   │   │   └── create-company.dto.ts
│   │   │   │
│   │   │   ├── entities/
│   │   │   │   └── company.entity.ts
│   │   │   │
│   │   │   ├── companies.controller.ts
│   │   │   ├── companies.service.ts
│   │   │   └── companies.module.ts
│   │   │
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── company-frontend/
│   ├── src/
│   │   ├── company/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   │
│   ├── .env.example
│   └── package.json
│
├── README.md
└── AI_USAGE.md
```

---

# Backend Setup

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* PostgreSQL
* Git

---

## 1. Navigate to Backend

```bash
cd company-backend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create PostgreSQL Database

Open PostgreSQL and create the database:

```sql
CREATE DATABASE company_management;
```

---

## 4. Configure Environment Variables

Create a `.env` file inside `company-backend`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=company_management
```

Replace `your_password` with your PostgreSQL password.

> Do not commit the `.env` file to GitHub.

An `.env.example` file is included to show the required variables.

---

## 5. Start Backend

```bash
npm run start:dev
```

The backend will run on:

```text
http://localhost:3000
```

---

# Frontend Setup

## 1. Navigate to Frontend

From the project root:

```bash
cd company-frontend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variable

Create a `.env` file inside `company-frontend`:

```env
VITE_API_URL=http://localhost:3000
```

The frontend uses this value to communicate with the NestJS backend.

---

## 4. Start Frontend

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

# API Endpoints

## Create Company

```http
POST /companies
```

### Request

```json
{
  "companyName": "Google",
  "website": "https://google.com",
  "industry": "Technology",
  "employeeCount": 180000
}
```

---

## List Companies

```http
GET /companies
```

The endpoint supports pagination and sorting.

### Pagination

```http
GET /companies?page=1&limit=5
```

### Sorting

```http
GET /companies?page=1&limit=5&sortBy=companyName&order=ASC
```

Supported sorting fields:

```text
companyName
website
industry
employeeCount
createdAt
```

Supported sorting orders:

```text
ASC
DESC
```

### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "companyName": "Google",
      "website": "https://google.com",
      "industry": "Technology",
      "employeeCount": 180000,
      "createdAt": "2026-08-24T10:00:00.000Z"
    }
  ],
  "total": 10,
  "page": 1,
  "limit": 5,
  "totalPages": 2,
  "sortBy": "createdAt",
  "order": "DESC"
}
```

---

## Search Companies

```http
GET /companies/search?search=google
```

The search performs a case-insensitive partial match against the company name.

For example:

```text
search=goo
```

can match:

```text
Google
Google Cloud
Google India
```

---

## Delete Company

```http
DELETE /companies/:id
```

Example:

```http
DELETE /companies/1
```

---

# Validation

The application performs validation on both the frontend and backend.

## Frontend Validation

The React application validates:

* Company name is required.
* Website is required.
* Website must be a valid URL.
* Industry is required.
* Employee count must be greater than zero.

Validation errors are displayed directly in the form before sending the request to the backend.

## Backend Validation

The NestJS backend uses `class-validator` DTO validation.

The backend validates incoming company data before it is stored in PostgreSQL.

This provides an additional validation layer even if requests are made outside the frontend application.

---

# Pagination

The company list supports pagination.

Example:

```http
GET /companies?page=1&limit=5
```

The response includes:

* Current page
* Number of records per page
* Total number of companies
* Total number of pages

The frontend provides:

```text
Previous
Page X of Y
Next
```

buttons for navigation.

---

# Sorting

Companies can be sorted by:

* Company name
* Website
* Industry
* Employee count
* Created date

Both ascending and descending order are supported.

Example:

```http
GET /companies?page=1&limit=5&sortBy=employeeCount&order=DESC
```

---

# Error Handling

The application includes basic error handling for:

* Failed API requests
* Failed company creation
* Failed company retrieval
* Failed company deletion
* Failed company search
* Invalid form data
* Empty company lists

Loading states are also displayed during asynchronous operations.

---

# Deployment

## Frontend

The React frontend is deployed using Vercel.

**Live URL:**

https://company-management-dzlerw91g-rahul582001s-projects.vercel.app/

## Backend

The NestJS backend is deployed using Render.

**Live URL:**

https://company-management-backend-9vs3.onrender.com

## Database

The application uses PostgreSQL for persistent company data.

The deployed backend is configured with the required PostgreSQL environment variables.

---

# Environment Variables

## Backend

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=company_management
```

## Frontend

For local development:

```env
VITE_API_URL=http://localhost:3000
```

For production:

```env
VITE_API_URL=https://company-management-backend-9vs3.onrender.com
```

Environment files containing credentials are excluded from version control.

---

# Assumptions

* PostgreSQL is available locally or through a configured PostgreSQL provider.
* Company website values should be valid URLs.
* Employee count must be greater than zero.
* Company names can be searched using partial matching.
* Search is case-insensitive.
* The application does not require authentication for this assignment.
* The application is designed as a small company management system rather than a multi-user platform.

---

# Known Limitations

* Authentication and authorization are not implemented.
* Automated unit and integration tests are not currently included.
* Docker setup is not currently included.
* GitHub Actions CI/CD workflow is not currently included.
* Editing/updating an existing company is not implemented.
* The application does not include advanced filtering by industry or employee count.

---

# Future Improvements

Possible future improvements include:

* Add update/edit company functionality.
* Add authentication and authorization.
* Add automated unit and integration tests.
* Add Docker support.
* Add GitHub Actions CI/CD.
* Add advanced filtering.
* Add API documentation using Swagger.
* Improve frontend accessibility.
* Add automated end-to-end testing.

---

# AI Usage

AI-assisted development was used during the implementation of this project.

Details about:

* AI tools used
* Where AI was used
* Why AI was used
* Example prompts
* Generated code that was kept
* Code that was modified
* Code that was rejected

are documented separately in:

```text
AI_USAGE.md
```

The generated code was reviewed, modified where necessary, and manually tested during development.

---

# Git

The project is maintained using Git and hosted on GitHub.

The repository contains separate frontend and backend applications within the same project.

---

# License

This project was created as part of a **Junior Full-Stack Developer Technical Assignment**.
