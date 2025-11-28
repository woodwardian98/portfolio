# Connecting to Your Neon Database

This guide will help you connect your Node.js application to your Neon-hosted PostgreSQL database.

## 1. Finalized SQL Script

I have created a finalized, idempotent SQL script at `backend/schema.sql`.

**Action:**
1.  Navigate to your Neon project dashboard.
2.  Go to the **SQL Editor**.
3.  Copy the entire content of `backend/schema.sql` and paste it into the editor.
4.  Run the script. This will set up all your tables, types, and relationships correctly. Because the script includes `DROP` statements, you can safely re-run it if you need to reset your database schema.

## 2. Setting Up Environment Variables

Your application's database connection is configured in `backend/config/database.js`. This file is set up to read your database credentials from environment variables. This is a security best practice that avoids hard-coding sensitive information.

**Action:**
1.  In your Neon project dashboard, find the **Connection Details** section.
2.  You will find a connection string that looks like this:
    ```
    postgres://<user>:<password>@<host>/<dbname>
    ```
3.  For this project to connect, you must set this value as an environment variable named `DATABASE_URL`. How you set this depends on your operating system and deployment environment.

    **For Local Development (in your terminal):**
    Create a file named `.env` in the `backend` directory and add the following line, replacing the placeholder with your actual connection string:
    ```
    DATABASE_URL="postgres://<user>:<password>@<host>/<dbname>"
    ```
    *Note: Remember to add `.env` to your `.gitignore` file to avoid committing it.*

    **For Production/Deployment (on services like Vercel, Netlify, etc.):**
    Use your hosting provider's dashboard to set the `DATABASE_URL` environment variable in the project settings.

## 3. Verifying the Connection

I have added debug logs to `backend/config/database.js` to help you verify that the application is reading the environment variables correctly.

**Action:**
1.  After setting your `DATABASE_URL` environment variable, start your backend server.
2.  When the server starts, you will see output in your console like this:

    ```
    --- DATABASE DEBUG ---
    DATABASE_URL from env: postgres://<user>:<password>@<host>/<dbname>
    PGHOST from env: undefined
    PGUSER from env: undefined
    Final Connection URL: postgres://<user>:<password>@<host>/<dbname>
    --- END DATABASE DEBUG ---
    ```
3.  If `Final Connection URL` shows your correct Neon DB URL, the connection is configured properly.
4.  Shortly after, you should see Sequelize's logs, followed by:
    ```
    Database & tables synced!
    ```
    This message confirms that your application has successfully connected to the database and synchronized its models with your schema.

If you see `Final Connection URL: undefined` or `Error syncing database:`, double-check that your `DATABASE_URL` environment variable is set correctly and is accessible to the application.
