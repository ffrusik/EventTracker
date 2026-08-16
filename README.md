# Event Notification App

A full-stack event monitoring platform built with **React, Node.js, Express, and PostgreSQL**. It aggregates RSS feeds, detects new relevant content, and automatically matches it against user-defined events to deliver timely updates.

## Features

* User registration and login
* JWT-based authentication
* Protected routes
* Secure password hashing with bcrypt
* Input validation with Zod
* Create and manage events
* RSS feed aggregation
* Automatic detection of new content
* Matching new content against user-defined events
* PostgreSQL data persistence

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
npm run worker
```

## Authentication

Users receive a JWT after logging in. The token is used to access protected routes and expires after a configured amount of time.

## Project Status

This project is currently under development.
