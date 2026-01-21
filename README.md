This project is a complete application developed using the MERN stack (MongoDB, Express, React, Node.js).

The frontend is built using React (Vite) with Tailwind CSS for styling. The user interface displays vehicles on an interactive map using React-Leaflet and OpenStreetMap, allowing real-time visualization of vehicle locations and routes.

The backend is developed using Node.js and Express, which handles admin authentication, vehicle management, tracking logic, and REST APIs. Secure authentication is implemented using JWT, and a default admin account is created using a seeding script for smooth demonstration.

MongoDB is used as the database to store admin credentials, vehicle details, and tracking-related data. The database is connected securely using environment variables.

Vehicle routes are generated using OSRM (Open Source Routing Machine) to ensure road-following paths instead of straight-line movement. The Haversine formula is used to calculate the distance between geographic coordinates, and ETA (Estimated Time of Arrival) is calculated based on remaining distance and realistic speed values.

Real-time updates are managed using Socket.IO, enabling live vehicle movement updates on the map. The project is designed with proper separation of frontend and backend, making it scalable and maintainable.

Environment variables are managed using .env files, which are safely ignored from version control using .gitignore. The application is structured to be cloud-ready, with frontend deployment on Vercel, backend deployment on Render, and database hosting on MongoDB Atlas.

This work represents my end-to-end hands-on implementation of a real-world MERN application, covering frontend development, backend APIs, database design, real-time tracking, mapping, and deployment practices.
