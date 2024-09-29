# Bookkeeping Service

This project is a RESTful API service for managing books, users, and libraries. Users can register as authors or borrowers, and books can be written by authors, owned by libraries, and borrowed by borrowers. The service includes JWT-based authentication.

## Technologies Used
- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for Node.js.
- **Sequelize ORM**: For database interaction with PostgreSQL.
- **PostgreSQL**: Database system.
- **JWT**: For secure authentication and authorization.

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


## API Endpoints

### Books

- `GET /api/books` – Retrieve a list of all books
  - **Response**:
    ```json
    {
    "message": "success",
    "data": [
        {
            "id": 1,
            "bookName": "storyBook 1",
            "imageUrl": "http://imageurl.com/image.jpeg"
        },
        {
            "id": 2,
            "bookName": "storyBook 2",
            "imageUrl": "http://imageurl.com/image.jpeg"
        },
        {
            "id": 3,
            "bookName": "storyBook 3",
            "imageUrl": "http://imageurl.com/image.jpeg"
        }
    ]
    }

    ```

- `GET /api/books/:id` – Retrieve details of a specific book by its ID, including the Library, Author, and Borrower
  - **Response**:
    ```json
    {
    "message": "success",
    "data": {
        "bookData": {
            "id": 3,
            "bookName": "storyBook 3",
            "imageUrl": "http://imageurl.com/image.jpeg"
        },
        "createdBy": null,
        "borrowedBy": {
            "id": 1,
            "name": "ragul",
            "email": "ragul@gmail.com",
            "userType": "AUTHOR",
            "userRole": "ADMIN"
        },
        "librarayDetails": {
            "id": 2,
            "name": "libraries 22"
        }
    }
    }
    ```

- `POST /api/books` – Create a new book entry (Role: Author)
  - **Request**:
    ```json
    {
    "bookName":"storyBook 1",
    "imageUrl": "http://imageurl.com/image.jpeg",
    "createdBy": 1
    }
    ```
  - **Response**:
    ```json
    {
    "message": "success",
    "description": "successfully book Created"
    }
    ```

- `PUT /api/books/:id` – Update details of a specific book by its ID (Role: Author)
  - **Request**:
    ```json
    {
    "bookName":"storyBook 22",
    "imageUrl": "http://imageurl.com/image.jpeg"
    }
    ```
  - **Response**:
    ```json
    {
    "message": "success",
    "data": [
        1
    ]
    }
    ```

- `DELETE /api/books/:id` – Delete a book by its ID (Role: Author)
  - **Response**:
    ```json
    {
    "message": "success",
    "data": 1
    } 
    ```

### Users

- `POST /api/users/register` – Register a new user (author/borrower)
  - **Request**:
    ```json
    {
    "name": "ragul",
    "email": "ragul@gmail.com",
    "password": "12345",
    "userType": "AUTHOR",
    "userRole": "ADMIN"
    }
    ```
  - **Response**:
    ```json
    {
    "message": "success",
    "description": "successfully newUser Created"
    }
    ```

- `POST /api/users/login` – Authenticate user and generate JWT token
  - **Request**:
    ```json
    {
    "email": "ragul@gmail.com",
    "password": "12345"
    }
    ```
  - **Response**:
    ```json
    {
    "message": "success",
    "description": "successfully login",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNzU5NjI2MH0.Ydem_vaKNceIrONOcNmJ-LJja7VnZ7tHfHhru-6fL4M"
    }
    ```

### Borrowing

- `POST /api/borrow` – Borrow a book (Role: Borrower)
  - **Request**:
    ```json
    {
       "bookId":2
    }
    ```
  - **Response**:
    ```json
    {
     "message": "success",
     "description": "successfully book borrowed"
    }
    ```

- `PUT /api/return/:id` – Return a borrowed book by its ID (Role: Borrower)
  - **Response**:
    ```json
    {
     "message": "success",
     "description": "successfully return book "
    }
    ```

### Libraries

- `GET /api/libraries` – Retrieve a list of all libraries
  - **Response**:
    ```json
    {
        "message": "success",
    "data": [
        {
            "id": 3,
            "bookName": "storyBook 3",
            "imageUrl": "http://imageurl.com/image.jpeg",
            "createdBy": 3,
            "createdAt": "2024-09-29T07:46:44.464Z",
            "updatedAt": "2024-09-29T07:46:44.464Z",
            "borrowedBy": null,
            "libraryId": null
        },
        {
            "id": 2,
            "bookName": "storyBook 22",
            "imageUrl": "http://imageurl.com/image.jpeg",
            "createdBy": 2,
            "createdAt": "2024-09-29T07:46:37.498Z",
            "updatedAt": "2024-09-29T07:53:29.346Z",
            "borrowedBy": null,
            "libraryId": 2
        }
    ]
    }
    ```

- `GET /api/libraries/:id` – Retrieve details of a specific library, including books and borrower details
  - **Response**:
    ```json
    {
      "message": "success",
     "data": {
        "id": 2,
        "name": "libraries 2",
        "createdAt": "2024-09-29T07:52:30.890Z",
        "updatedAt": "2024-09-29T07:52:30.890Z",
        "Books": [
            {
                "id": 2,
                "bookName": "storyBook 22",
                "imageUrl": "http://imageurl.com/image.jpeg",
                "createdBy": 2,
                "createdAt": "2024-09-29T07:46:37.498Z",
                "updatedAt": "2024-09-29T07:53:29.346Z",
                "borrowedBy": null,
                "libraryId": 2,
                "borrowerDetails": null
            }
        ]
     }
    }
    ```

- `POST /api/libraries` – Create a new library
  - **Request**:
    ```json
    {
       "name":"libraries 1"
    }
    ```
  - **Response**:
    ```json
    {
    "message": "success",
     "description": "successfully  Library created"
    }
    ```

- `PUT /api/libraries/:id` – Update library details
  - **Request**:
    ```json
    {
       "name":"libraries 22"
    }
    ```
  - **Response**:
    ```json
    {
     "message": "success",
     "data": [
        1
     ]

    }
    ```

- `DELETE /api/libraries/:id` – Delete a library
  - **Response**:
    ```json
    {
         "message": "success",
     "data": 1
    }
    ```

### Library Inventory

- `GET /api/libraries/:id/inventory` – Retrieve a list of available books in a specific library
  - **Response**:
    ```json
    {
      "message": "success",
     "data": [
        {
            "id": 2,
            "bookName": "storyBook 22",
            "imageUrl": "http://imageurl.com/image.jpeg",
            "createdBy": 2,
            "createdAt": "2024-09-29T07:46:37.498Z",
            "updatedAt": "2024-09-29T07:53:29.346Z",
            "borrowedBy": null,
            "libraryId": 2
        }
     ]
    }
    ```

- `POST /api/libraries/:id/inventory` – Add a book to a library's inventory (Role: Librarian)
  - **Request**:
    ```json
    {
       "bookId": 2
    }
    ```
  - **Response**:
    ```json
    {
     "message": "success",
     "description": "successfully add book to Librarie"
    }
    ```

- `DELETE /api/libraries/:id/inventory/:bookId` – Remove a book from the inventory by its ID (Role: Librarian)
  - **Response**:
    ```json
    {
       "message": "success",
     "data": [
        1
     ]
    }
    ```
    


## Postman Collection

To test the API, you can use the Postman collection provided in this repository. Follow the instructions below to download and import it into your Postman client.

### Download Postman Collection
- [Postman Collection](#) _(https://github.com/Ragul-p/Book-Keeping/blob/main/Book%20Keeping.postman_collection.json)_

### How to Import in Postman
1. Download the Postman collection from the link above.
2. Open Postman and click on `Import` in the top left.
3. Choose the file you downloaded.
4. You will see all the API endpoints categorized for easy access.

### Checking the API
Once the Postman collection is imported:
1. Ensure that the backend server is running (or access the [hosted API URL](https://book-keeping-7gie.onrender.com/)).
2. Use the provided endpoints to check the API functionalities such as user registration, login, borrowing books, returning books, etc.


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





