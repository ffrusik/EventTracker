# Event Notification App

A full-stack event subscription app built with **React, Node.js, Express, and PostgreSQL**.

## Features

* User registration and login
* JWT authentication
* Protected routes
* Password hashing with bcrypt
* Input validation with Zod
* Create events
* PostgreSQL database

## Tech Stack

* React
* TanStack Query
* Node.js / Express
* PostgreSQL
* JWT
* bcrypt
* Zod
* Tailwind CSS

## Getting Started

Install dependencies:

```bash
npm i
```

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

Start the development server:

```bash
cd client
npm run dev
cd server
npm run dev
```

## Authentication

Users receive a JWT after logging in. The token is used to access protected routes and expires after a configured amount of time.

## Project Status

This project is currently under development.
