-- This script is idempotent and can be safely run multiple times.
-- It will drop existing tables and types before recreating them.

-- Drop tables in reverse order of creation due to foreign key constraints.
DROP TABLE IF EXISTS "Customers";
DROP TABLE IF EXISTS "Posts";
DROP TABLE IF EXISTS "Users";

-- Drop custom enum types
DROP TYPE IF EXISTS "customer_status";
DROP TYPE IF EXISTS "user_role";

-- --- Begin SQL Statements --- 
-- Create custom enum types first, as they are used by tables
CREATE TYPE "user_role" AS ENUM ('user', 'admin');
CREATE TYPE "customer_status" AS ENUM ('lead', 'active', 'archived');

-- Create the Users table
-- Sequelize automatically adds 'id' (SERIAL PRIMARY KEY), 'createdAt', and 'updatedAt' fields.
CREATE TABLE "Users" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "role" user_role DEFAULT 'user',
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create the Posts table
-- This table includes a foreign key 'UserId' referencing the 'Users' table,
-- implementing the User.hasMany(Post) and Post.belongsTo(User) relationship.
CREATE TABLE "Posts" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL UNIQUE,
    "content" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "isPublished" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "UserId" INTEGER REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Create the Customers table
-- This table includes a unique foreign key 'UserId' referencing the 'Users' table,
-- implementing the User.hasOne(Customer) and Customer.belongsTo(User) relationship.
CREATE TABLE "Customers" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "company" VARCHAR(255),
    "status" customer_status DEFAULT 'lead',
    "notes" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "UserId" INTEGER UNIQUE REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- --- End SQL Statements ---

-- Optional: Insert a sample admin user for testing purposes
-- Note: The password should be hashed in a real application.
-- This is just a placeholder. The backend will handle hashing.
-- INSERT INTO "Users" (email, password, role, "createdAt", "updatedAt")
-- VALUES ('admin@example.com', 'hashed_password_placeholder', 'admin', NOW(), NOW());
