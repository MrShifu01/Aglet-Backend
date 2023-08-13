# Aglet Full Stack Project

This project showcases movie information through a backend API and a frontend client. It leverages the MERN stack for a seamless integration between the front and back ends.

## Getting Started

To get this project up and running on your local machine, follow these steps.

### Prerequisites

- Node.js
- npm

### Installation

1. **Clone the repository:**

```bash
git clone <https://github.com/MrShifu01/Aglet-Backend>
```

2. **Navigate to the root directory of the project and install the required packages:**

```bash
npm install
```

3. **Navigate to the client directory and install the required packages for the frontend:**

```bash
cd client && npm install
```

### Adding Data

To fetch and populate your application with data, navigate to the root directory and run:

```bash
npm run data:fetch
```

### Running the Application

You have two options to run the application:

1. **Run both the frontend and backend concurrently:**

In the root directory:

```bash
npm run dev
```

2. **Run the frontend and backend separately:**

In the root directory for the backend:

```bash
npm start
```

In the client directory for the frontend:

```bash
npm start
```

## Rationale and Approach

The MERN stack was chosen because it provides a full-stack JavaScript solution with a harmonious integration between frontend and backend. React was used for the frontend because of its performance benefits, component-based architecture, and extensive community support. Express, with Node.js, offers a lightweight and flexible backend framework, while MongoDB provides a flexible NoSQL database.

The project structure separates client and server concerns, making it modular and scalable. Redux Toolkit and React Query are incorporated to manage state and data fetching effectively. Additional packages like `bcrypt` for password hashing and `jsonwebtoken` for authentication ensure security. The layout and structure aim to provide users with an intuitive and visually appealing experience.

## Built With

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)

## Authors

- Christian Stander
