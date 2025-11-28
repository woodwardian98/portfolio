# Project Manifest

This document provides an overview of my project structure, the purpose of each major file and directory, and the security measures that I have implemented.

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
*   **Purpose:** This is the frontend of my application. It's a static site generator that is fast, secure, and SEO-friendly.
*   **Key Files:**
    *   `src/pages/index.astro`: The main page of my application. It contains the contact form I created.
    *   `astro.config.mjs`: The configuration file for my Astro project.
    *   `package.json`: Manages the dependencies for my frontend project.

## Backend (`backend/`)

*   **Framework:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
*   **Purpose:** This is the backend of my application. It handles API requests, business logic, and data storage.
*   **Key Files:**
    *   `server.js`: The main file for my backend. It sets up the Express server, middleware, and API endpoints.
    *   `package.json`: Manages the dependencies for my backend project.
    *   `.env`: Stores my environment variables, such as API keys and database credentials. **This file should not be committed to Git.**
    *   `.gitignore`: Specifies which files and directories should be ignored by Git. I have configured it to ignore `node_modules` and `.env`.

## Security Measures

I have implemented the following security measures in the backend, following a systematic approach that aligns with NIST and ISO guidelines:

1.  **Environment Variables:**
    *   **Purpose:** To protect sensitive information like API keys and database credentials.
    *   **Implementation:** The project uses the `dotenv` package to load environment variables from a `.env` file, which is ignored by Git.

2.  **Input Validation and Sanitization:**
    *   **Purpose:** To prevent common vulnerabilities like Cross-Site Scripting (XSS) and SQL Injection.
    *   **Implementation:** The project uses the `express-validator` package to validate and sanitize all user input on the `/submit` endpoint.

3.  **Rate Limiting:**
    *   **Purpose:** To protect my API from brute-force and denial-of-service (DoS) attacks.
    *   **Implementation:** The project uses the `express-rate-limit` package to limit the number of requests a user can make to the `/submit` endpoint.

4.  **Secure Headers:**
    *   **Purpose:** To protect my application from common attacks like clickjacking, XSS, and MIME type sniffing.
    *   **Implementation:** The project uses the `helmet` package to set various secure HTTP headers on all responses from the server.

## My Next Steps

I will continue to build upon this foundation, adding more features and security measures. My next logical steps include:

*   **Authentication and Authorization:** To control who can access my API and what they can do.
*   **Logging and Monitoring:** To track events and identify potential security incidents.
*   **Secure Database Integration:** To store and retrieve data securely.