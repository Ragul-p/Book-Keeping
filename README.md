# Bookkeeping Service

This project is a RESTful API service for managing books, users, and libraries. Users can register as authors or borrowers, and books can be written by authors, owned by libraries, and borrowed by borrowers. The service includes JWT-based authentication.

## Tech Stack

- **Backend:** Node.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Hosting:** Render (for backend APIs)

## Features

- **Books Management:**
  - Create, retrieve, update, and delete book records.
  - Each book is associated with an author (user), a library, and a borrower.

- **User Management:**
  - Register users as either authors or borrowers.
  - Login users and receive JWT tokens for authentication.

- **Library Management:**
  - Manage libraries and their book inventories.
  - Retrieve details of libraries and the books they own.

- **Book Borrowing:**
  - Users can borrow books for a charge and return them.

- **Security:**
  - JWT-based authentication for securing APIs.
  - Role-based access control for library inventory management.



## Setup Instructions

### 1. Clone the Repository
   ```bash
   git clone https://github.com/your-username/bookkeeping-service.git
cd bookkeeping-service
```
### 2. Install dependencies:
    
    npm install
    
### 3. Create an `.env` file in the root directory and set your environment variables:
    
    PORT=YOUR_PORT
    PG_DB_URI=YOUR_PG_DB_URI
    ACCESS_TOKEN_KEY=YOUR_ACCESS_TOKEN_KEY
    
### 4. Run the application:
    
    npm run dev
  

    
### Hosting and Deployment
The app is hosted on [Render](https://render.com/), which provides PostgreSQL as the cloud database for storing data.





