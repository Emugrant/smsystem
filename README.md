# Description
The following project is a fullstack web application that performs CRUD operations on our database using a REST API. The purpose of this application is to manage students in a school's database, allowing users to add, edit, update, and delete a student's information seamlessly.

## Technologies Used
This application uses the MERN stack.

- **MongoDB**: A NoSQL database that stores data in a flexible, JSON-like format. Its purpose is to persistently store application data.
- **Express.js**: Backend server-side framework used to build RESTful APIs that interact with the frontend React application. Express simplifies the process of handling HTTP requests, defining API routes, and integrating middleware for tasks like authentication.
- **React**: A JavaScript library for building user interfaces that communicate with the backend (built with Node.js and Express.js) via HTTP requests to fetch and update data from MongoDB. React's component-based architecture facilitates building reusable UI components and managing application state efficiently.
- **Node.js**: A JavaScript runtime environment that executes JavaScript code outside the browser. In the MERN stack, Node.js serves as the runtime environment for the backend server (with Express.js). It allows developers to use JavaScript on both the client and server sides, enabling a unified development experience and code sharing between frontend and backend logic.

## Project Structure
```
project-root/
│
├── backend/
│   ├── models/
│   │   └── studentModel.js
│   ├── mongoose_server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentList.js
│   │   │   ├── AddEditStudent.js
│   │   │   └── DeleteStudent.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
└── README.md
```

## API Endpoints
- `POST /student/create`: Create a new student.
- `GET /student/all`: Retrieve all students.
- `GET /student/:id`: Retrieve a student by ID.
- `PUT /student/update/:id`: Update a student by ID.
- `DELETE /student/delete/:id`: Delete a student by ID.

## Frontend Routes
- `/`: Displays the list of students.
- `/add`: Form to add a new student.
- `/edit/:id`: Form to edit an existing student.
- `/delete/:id`: Deletes a student and redirects to the list.

## Running the Application
### Backend
1. Navigate to the [`backend`]("/smsystem/backend") folder:
   ```sh
   cd backend/
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   nodemon mongoose_server.js
   ```

### Frontend
1. Navigate to the [`frontend`]("/smsystem/frontend") folder:
   ```sh
   cd frontend/
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm start
   ```
