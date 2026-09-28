# Product Management System

A modern full-stack Product Management System built with React, TypeScript, Node.js, Express.js, Axios, and MySQL.

The application provides complete CRUD functionality for managing products through a modern and responsive user interface.

## Features

- Add new products
- Display products in a table
- Update existing products
- Delete products
- Product availability status
- MySQL database integration
- REST API integration
- Responsive UI
- Modern product management dashboard
- Axios API communication

## Tech Stack

### Frontend

- React.js
- TypeScript
- Axios
- CSS

### Backend

- Node.js
- Express.js
- REST API

### Database

- MySQL

## CRUD Operations

| Operation | Method | Endpoint |
|---|---|---|
| Create | POST | `/products` |
| Read | GET | `/products` |
| Update | PUT | `/products/:id` |
| Delete | DELETE | `/products/:id` |

## Project Structure

```text
product-management-system/
│
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── form.css
│   │   └── main.tsx
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
