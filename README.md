# Focus Scans and Diagnostics Portal

A responsive shared login UI for doctors and customers, built with React, Tailwind CSS, Vite, Node.js, and Express.

## Requirements
- Node.js 20+ recommended
- npm

## Install
From this folder, run:

```bash
npm install
npm --prefix client install
npm --prefix server install
```

## Run in development
```bash
npm run dev
```
Open the Vite URL shown in the terminal (usually http://localhost:5173).

## Demo behavior
Choose Doctor or Customer, enter an email-shaped value and a password of at least 6 characters, then sign in. The client sends the selected role and credentials to the Express API. The demo API accepts any syntactically valid email and password of 6+ characters; it does not verify real accounts.

## Important
This is a UI/demo starter, not production authentication. Before real use, add a database, account verification, secure password hashing, session or token management, rate limiting, CSRF protections where applicable, password reset flow, and HTTPS. Do not use real patient information in this demo.
