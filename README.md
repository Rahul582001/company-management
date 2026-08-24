# Company Management Application

A simple full-stack application for managing companies. The application allows users to create, view, search, and delete companies through a React frontend and NestJS REST API backed by PostgreSQL.

## Tech Stack

### Frontend

- React
- TypeScript
- Axios
- CSS

### Backend

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- class-validator

## Features

### Required Features

- Create a company
- List all companies
- Search companies by name
- Delete a company
- Responsive user interface
- Loading states
- Error handling
- PostgreSQL data persistence

### Additional Features

- Client-side form validation
- Server-side DTO validation

## Company Fields

Each company contains:

- `id`
- `companyName`
- `website`
- `industry`
- `employeeCount`
- `createdAt`

## Project Structure

```text
company-management/
├── company-backend/
│   ├── src/
│   │   ├── companies/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── companies.controller.ts
│   │   │   ├── companies.service.ts
│   │   │   └── companies.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
│
├──company-frontend/
│   ├── src/
│   │   ├── company/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── App.css
│   └── package.json
│
├── README.md
└── AI_USAGE.md
```

## Backend Setup

Navigate to the backend:

```bash
cd company-backend
```

Install dependencies:

```bash
npm install
```

Create a PostgreSQL database:

```sql
CREATE DATABASE company_management;
```

Configure the PostgreSQL connection in the backend configuration.

Start the backend:

```bash
npm run start:dev
```

The backend runs on:

```text
http://localhost:3000
```

## Frontend Setup

Navigate to the frontend:

```bash
cd company-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## API Endpoints

### Create Company

```text
POST /companies
```

Example request:

```json
{
  "companyName": "Google",
  "website": "https://google.com",
  "industry": "Technology",
  "employeeCount": 180000
}
```

### List Companies

```text
GET /companies
```

### Search Companies

```text
GET /companies/search?search=google
```

The search is performed using the company name.

### Delete Company

```text
DELETE /companies/:id
```

## Environment Variables

For a local PostgreSQL setup, configure the following database values according to your environment:

```text
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=company_management
```

The frontend API URL is currently configured to use:

```text
http://localhost:3000/companies
```

For deployment, this should be changed to the deployed backend URL.

## Assumptions

- PostgreSQL is available locally or through a configured database provider.
- Company website values are expected to be valid URLs.
- Employee count must be greater than zero.
- Company names are searchable using partial name matching.
- The application currently uses a simple company management model without authentication or user accounts.

## Known Limitations

- Authentication and authorization are not implemented.
- Pagination is not currently implemented.
- Sorting is not currently implemented.
- Automated unit tests are not currently included.
- Docker setup is not currently included.
- The application does not currently support editing an existing company.

## Future Improvements

- Add pagination for large company lists.
- Add sorting by company name, industry, employee count, or creation date.
- Add update/edit company functionality.
- Add authentication and authorization.
- Add automated unit and integration tests.
- Add Docker support.
- Add CI/CD using GitHub Actions.
- Deploy the application to a production environment.

## Validation

The application performs validation on both the frontend and backend.

Frontend validation provides immediate feedback for:

- Missing company name
- Missing or invalid website
- Missing industry
- Invalid employee count

Backend DTO validation provides an additional validation layer before data is stored in PostgreSQL.

## License

This project was created as part of a Junior Full-Stack Developer technical assignment.
