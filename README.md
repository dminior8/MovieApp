# MovieApp

**MovieApp** is a web application designed to help users browse movies, manage their favorite films, and discover new content. Users can view a list of all available movies, mark movies as favorites, and view detailed information about each movie. The app also allows users to manage their favorite movies and explore a seamless interface for interacting with movie data.

The backend is powered by an API (assumed to be built with Node.js and Express), while the frontend is built using React. The app uses React-Bootstrap for styling, and the icons are powered by react-icons.

## Table of Contents

1. [Key Features](#key-features)
2. [Getting Started](#getting-started)
3. [Prerequisites](#prerequisites)
4. [Setup Instructions](#setup-instructions)
5. [Technologies Used](#technologies-used)
6. [License](#license)

## Key Features

1. **Browse Movies**:
   - View a list of all available movies with basic details (title, description, image).
   - Users can view detailed information about each movie by clicking on it.

2. **Favorites Management**:
   - Users can add movies to their favorites.
   - Favorite movies are shown in a dedicated "Favorites" section, and they are indicated with a gold star.

3. **Responsive Design**:
   - The app is designed to be fully responsive and user-friendly across all devices.

4. **Error Handling**:
   - If there is an error while fetching data, users will see an error message.

5. **Loading States**:
   - During data fetching, the app shows a loading indicator to inform users of the current process.

## Getting Started

Follow the instructions below to set up and run **MovieApp** on your local machine.

### Prerequisites

- **Frontend**:
  - Node.js (LTS version) and npm

- **Backend**:
  - An API that provides movie and user favorite data (for example, Node.js with Express).

## Setup Instructions

### Setup Backend (Node.js + Express + MongoDB)

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/dminior8/MovieApp.git
   cd MovieApp

2. Install Dependencies:
Navigate to your project directory and install the required Node.js dependencies:
     ```bash
     npm install
     ```
     
3. Configure Environment Variables:
Create a .env file in the root of the project to store sensitive information like MongoDB credentials and JWT secrets
     ```.env
     MONGO_USER=your-mongo-username
     MONGO_PASSWORD=your-mongo-password
     MONGO_CLUSTER=your-cluster-name
     MONGO_DATABASE=your-database-name
     JWT_SECRET=your-jwt-secret
     ```

5. Run the Backend Server:
   ```bash
   npm start
   ```

6. Backend API base URL: `http://localhost:3001`
   
7. Verify Connection to MongoDB:
   After starting the backend, check the console for the following message:


### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../movie-app-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Access the frontend at: `http://localhost:3000`

### Logging in

You can log in using the following credentials for different users:

#### User 1:
- **Email:** `admin@exmaple.com`
- **Password:** `Admin123!`

#### User 2:
- **Email:** `anowak@gmail.com`
- **Password:** `Admin123!`

---

## API Endpoints

Here's a summary of the available API endpoints:

| Method | Endpoint                          | Description                                            | Response                                  |
|--------|-----------------------------------|--------------------------------------------------------|-------------------------------------------|
| POST   | `/api/users/register`             | Registers a new user.                                  | Success message (User registered).        |
| POST   | `/api/users/login`                | Logs in a user and returns a JWT token.                | JWT Token.                                |
| POST   | `/api/users/logout`               | Logs out the user by invalidating their token.         | Success message (Logged out).             |
| GET    | `/api/users/:user_id/favorites`   | Gets all favorite movies of a user.                    | List of movies (Favorites).               |
| POST   | `/api/users/:user_id/favorites/:movie_id` | Adds a movie to a user's favorites.                   | Success message (Movie added to favorites). |
| DELETE | `/api/users/:user_id/favorites/:movie_id` | Removes a movie from a user's favorites.               | Success message (Movie removed from favorites). |

## Movie Management

| Method | Endpoint                          | Description                                            | Response                                  |
|--------|-----------------------------------|--------------------------------------------------------|-------------------------------------------|
| GET    | `/api/movies/`                    | Retrieves a list of all movies.                        | List of movies.                           |
| GET    | `/api/movies/:id`                 | Retrieves details of a specific movie.                 | Movie details.                            |
| GET    | `/api/movies/filter`              | Retrieves movies based on search filters.              | List of filtered movies.                  |
| POST   | `/api/movies/`                    | Adds a new movie (Admin only).                         | Success message (Movie added).            |
| PUT    | `/api/movies/:id`                 | Edits a specific movie (Admin only).                   | Success message (Movie updated).          |
| DELETE | `/api/movies/:id`                 | Deletes a specific movie (Admin only).                 | Success message (Movie deleted).          |

## Actor Management

| Method | Endpoint                          | Description                                            | Response                                  |
|--------|-----------------------------------|--------------------------------------------------------|-------------------------------------------|
| GET    | `/api/actors/`                    | Retrieves a list of all actors.                        | List of actors.                           |

## Director Management

| Method | Endpoint                          | Description                                            | Response                                  |
|--------|-----------------------------------|--------------------------------------------------------|-------------------------------------------|
| GET    | `/api/directors/`                 | Retrieves a list of all directors.                     | List of directors.                        |

## Genre Management

| Method | Endpoint                          | Description                                            | Response                                  |
|--------|-----------------------------------|--------------------------------------------------------|-------------------------------------------|
| GET    | `/api/genres/`                    | Retrieves a list of all genres.                        | List of genres.                           |

## Country Management

| Method | Endpoint                          | Description                                            | Response                                  |
|--------|-----------------------------------|--------------------------------------------------------|-------------------------------------------|
| GET    | `/api/countries/`                 | Retrieves a list of all countries.                     


## Technologies Used

### Backend
Node.js with Express (assumed)
MongoDB

### Frontend
- React
- React-Bootstrap
- React Icons (for movie favorite stars)
- Axios (for API requests)

## License

This project is licensed under the [MIT License](https://github.com/dminior8/argonout/blob/main/LICENSE).


## Author and Creation Date

- **Authors**: Daniel Minior, Jakub Matoga, Krzysztof Popiela
- **Creation Date**: 24 October 2024
