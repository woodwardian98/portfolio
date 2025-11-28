# Project Manifest

This document provides an overview of the project structure, the purpose of each major file and directory, and the security measures that have been implemented.

## Project Structure

```
visible-venus/
├── astro-nano/       # Frontend Astro.js project
│   ├── src/
│   │   ├── components/ # Reusable Astro components
│   │   ├── layouts/    # Page layouts
│   │   ├── pages/      # Application pages
│   │   └── ...
│   ├── astro.config.mjs  # Astro configuration
│   └── package.json      # Frontend dependencies
├── backend/          # Backend Node.js project
│   ├── node_modules/   # Backend dependencies
│   ├── .env            # Environment variables (ignored by Git)
│   ├── .gitignore      # Git ignore file for the backend
│   ├── package.json    # Backend dependencies
│   ├── server.js       # Express server logic
│   └── ...
├── .gitignore        # Git ignore file for the root project
├── package.json      # Root project dependencies
└── PROJECT_MANIFEST.md # This file
```

## Frontend (`astro-nano/`)

*   **Framework:** [Astro.js](https://astro.build/)
*   **Purpose:** This is the frontend of your application. It's a static site generator that is fast, secure, and SEO-friendly.
*   **Key Files:**
    *   `src/pages/index.astro`: The main page of your application. It contains the contact form we created.
    *   `astro.config.mjs`: The configuration file for your Astro project.
    *   `package.json`: Manages the dependencies for your frontend project.

## Backend (`backend/`)

*   **Framework:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
*   **Purpose:** This is the backend of your application. It handles API requests, business logic, and data storage.
*   **Key Files:**
    *   `server.js`: The main file for your backend. It sets up the Express server, middleware, and API endpoints.
    *   `package.json`: Manages the dependencies for your backend project.
    *   `.env`: Stores your environment variables, such as API keys and database credentials. **This file should not be committed to Git.**
    *   `.gitignore`: Specifies which files and directories should be ignored by Git. We've configured it to ignore `node_modules` and `.env`.

## Security Measures

We have implemented the following security measures in the backend, following a systematic approach that aligns with NIST and ISO guidelines:

1.  **Environment Variables:**
    *   **Purpose:** To protect sensitive information like API keys and database credentials.
    *   **Implementation:** We use the `dotenv` package to load environment variables from a `.env` file, which is ignored by Git.

2.  **Input Validation and Sanitization:**
    *   **Purpose:** To prevent common vulnerabilities like Cross-Site Scripting (XSS) and SQL Injection.
    *   **Implementation:** We use the `express-validator` package to validate and sanitize all user input on the `/submit` endpoint.

3.  **Rate Limiting:**
    *   **Purpose:** To protect your API from brute-force and denial-of-service (DoS) attacks.
    *   **Implementation:** We use the `express-rate-limit` package to limit the number of requests a user can make to the `/submit` endpoint.

4.  **Secure Headers:**
    *   **Purpose:** To protect your application from common attacks like clickjacking, XSS, and MIME type sniffing.
    *   **Implementation:** We use the `helmet` package to set various secure HTTP headers on all responses from your server.

## Next Steps

We will continue to build upon this foundation, adding more features and security measures. The next logical steps include:

*   **Authentication and Authorization:** To control who can access your API and what they can do.
*   **Logging and Monitoring:** To track events and identify potential security incidents.
*   **Secure Database Integration:** To store and retrieve data securely.
