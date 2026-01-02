BKCFIELD – Construction Data API
I built this RESTful API for Building Knowledge Canada (Cambridge, ON) to help them move away from manual paperwork. The goal was to create a central, secure system where field technicians could submit site data directly from their mobile devices.

The Problem
The client needed a way to collect field data that was more reliable than paper forms. They required a system that could handle data entry in real-time while ensuring that only authorized staff could access or change sensitive project information.

My Solution
I developed a backend using Node.js and Express.js following the MVC (Model-View-Controller) pattern. This structure makes the code easier to maintain and scale as the company adds more form types.

Core Features:
Secure Authentication: I used JWT (JSON Web Tokens) and custom middleware to ensure every request is coming from an authorized user.

Flexible Data Storage: Used MongoDB to handle the varying data structures of different construction field forms.

Automated Logic: Built-in validation to ensure data is clean and accurate before it ever hits the database.

Standardized Communication: Developed consistent RESTful endpoints so the frontend could easily pull and push data.

Tech Stack
Runtime: Node.js

Framework: Express.js

Database: MongoDB (Mongoose)

Security: JWT (JSON Web Tokens) & Bcrypt for password hashing

Deployment: Heroku

How it works
The app uses a modular structure:

/api/routes: Defines the endpoints for users and forms.

/api/models: Defines how construction data is structured in MongoDB.

/middleware: Handles the security checks and permissions.
