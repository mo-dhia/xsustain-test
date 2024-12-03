# **NEW TASTE** Recipe Management Application

## Technologies Used

### Frontend:
- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: A library for routing and navigation in React apps.
- **Zustand**: A simple state management library for React.

### Backend:
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB (via Mongoose)**: A NoSQL database used to store user and recipe data.
- **JWT (JSON Web Tokens)**: Used for secure user authentication and authorization.
- **Bcryptjs**: A library to hash passwords securely.
- **Express Validator**: Middleware for input validation.
- **Cors**: Middleware to enable cross-origin requests.
- **dotenv**: For loading environment variables.

### Development Tools:
- **Vite**: A fast and modern build tool for React.
- **Nodemon**: A tool that helps automatically restart the server on file changes during development.

## Project Structure

### Frontend:
**NEW TASTE** is a recipe management application built with React and Vite. It handles user registration, login, profile management, and recipe interactions.

- `src/routes`: Pages React components
- `src/components`: Reusable React components
- `src/components/utils`: Utility components and helper functions
- `src/components/assets`: Contains images

### Backend:
The backend is built with Express and handles the API routes for user authentication and recipe management.

- `routes/`: Contains Express route definitions for user and recipe APIs.
- `controllers/`: Contains the business logic for user and recipe routes.
- `middlewares/`: Contains authentication and input validation middleware.

## Prerequisites
- Node.js (version 18.x or higher)
- npm (version 9.x or higher)
- MongoDB database

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/mo-dhia/xsustain-test
cd xsustain-test
```

### 2. Install Dependencies
To install dependencies for both frontend and backend, run:
```bash
npm run install:all
```

### 3. Configure Environment Variables
Create a `.env` file in the root of the `server` folder and add the following environment variables:
```bash
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

### 4. Seed Database with Mock Recipes Data
Before running the fill script, ensure you have a valid user ID in `./server/mockData/data`. This ID should correspond to an existing user in your MongoDB database to serve as the author for mock recipes.

To populate the database with initial mock data, run:
```bash
npm run fill
```

### 5. Start Development Servers

#### Frontend Server
```bash
npm run web
```
The frontend will be accessible at `http://localhost:5173`

#### Backend Server
```bash
npm run server
```
The backend will be accessible at `http://localhost:5000`

## API Endpoints

### User Routes:
- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Log in an existing user.
- `GET /api/users/profile`: Get the authenticated user's profile.
- `PUT /api/users/profile`: Update the authenticated user's profile.

### Recipe Routes:
- `GET /api/recipe`: Get all recipes.
- `GET /api/recipe/:id`: Get a recipe by ID.
- `POST /api/recipe`: Create a new recipe (requires authentication).
- `PUT /api/recipe/:id`: Update a recipe by ID (requires authentication).
- `DELETE /api/recipe/:id`: Delete a recipe by ID (requires authentication).
- `POST /api/recipe/:id/rate`: Rate a recipe (requires authentication).

## Development Scripts

- `npm run web`: Starts the frontend development server (Vite)
- `npm run server`: Starts the backend development server
- `npm run install:all`: Installs dependencies for frontend and backend
- `npm run fill`: Seeds the database with mock data

## Troubleshooting
- Ensure MongoDB is running and the connection string is correct
- Verify Node.js and npm versions
- Check that all environment variables are properly set
- Confirm that both frontend (port 5173) and backend (port 5000) servers are running
- Verify that the user ID in mock data matches an existing user in the database

## Contributing
Please read our contribution guidelines before making changes to the project.

## License
This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

**Author**: Med D. Bouthouri