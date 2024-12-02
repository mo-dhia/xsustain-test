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
The frontend of the application is built with React and Vite. It handles user registration, login, profile management, and interacting with the recipe-related API.

- `src/`: Contains React components and state management logic.
- `public/`: Static assets like images and icons.

### Backend:
The backend is built with Express and handles the API routes for user authentication and recipe management.

- `routes/`: Contains Express route definitions for user and recipe APIs.
- `controllers/`: Contains the business logic for user and recipe routes.
- `middlewares/`: Contains authentication and input validation middleware.

## Installation

### Frontend Setup:
1. Navigate to the `web` directory.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the development server:
    ```bash
    npm run dev
    ```

### Backend Setup:
1. Navigate to the `server` directory.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root of the `server` folder and add the following environment variables:
    ```bash
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-secret-key
    ```
4. Run the development server:
    ```bash
    npm run start
    ```
5. The backend will be accessible at `http://localhost:5000`.

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

- `npm run wev`: Starts the frontend development server (Vite).
- `npm run server`: Starts the backend development server.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.


**Author**: Med D. Bouthouri
