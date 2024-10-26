# Backend Setup Instructions

- In this project first we have complete our backend setup in which first we authenticate the user, then create the user , message, coversation model, then we create auth, user, message routes, and for handling these routes we created auth, user, message controller, after controller we created services and middleware for authentication and authorization.

- After backend we completed the setup of the frontend we created pages login, signup and home, then we created component like sidebar, messages and after setting both pages and components we started routing by installing react-router-dom package in our project.  

## Things we have used in this project

1.  **Main Backend Technologies**

- Bun
- Node.js
- Express
- MongoDB
- Mongoose

2.  **Other Backend Packages**

- bcryptjs => for password hashing
- dotenv => for managing environment variables
- jsonwebtoken => for creating and verifying JWT tokens
- nodemon => for development server
- cookie-parser => for parsing cookies
- socket.io => for real-time communication

## Backend Setup Instructions

This document provides a step-by-step guide to setting up the backend for the Chat Application using Bun as the package manager. Follow these instructions to initialize the project, set up routes, and manage controllers.

## Prerequisites

- Bun installed on your machine
- MongoDB set up and running or we can also use MongoDB Atlas using cluster and connect to MongoDB using driver.

## Project Initialization

1. **Initialize the Project**

   First create a folder any name and open this folder in the vs code, initially there is no folder inside the vs code open folder, then create two folders first is backend and second one is frontend.

   Open your terminal, remember not to go inside any folder like backend and frontend just creat a new terminal and run the following command to initialize a new Bun project:

   ```bash
   bun init -y
   ```

   After this in our root directory there will be some files generated we have to delete some, like tsconfig.js, and convert index.ts to index.js file.

   Then go to the package.json file, here we have to make some changes like in module instead of index.ts we have to write index.js and in the type we have to write commonjs if we are using common JavaScript.
   Then we have to write some command to run project with speicif command write this by creating scripts object :

   "scripts": {
   "start": "node backend/index.js",
   "dev": "nodemon backend/index.js"
   },

2. **Install Required Packages**

   In the same terminal not inside the frontend and not inside the backend just in the root terminal install the necessary packages for the backend by writing this in the terminal:

   ```bash
   bun add express mongoose dotenv socket.io jsonwebtoken cookie-parser bcryptjs
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the backend directory to store environment variables, and in the .gitignore file you have to mention .env file for protection:

   Here you have to pass you'r MongoDB Driver url, and you to generate your own JWT_SECRET.

   ```
   MONGO_DB_URL=mongodb+srv://kv5228920:287aQJJ3LdxY0N44@cluster0.zdoto.mongodb.net/chat-app-db?retryWrites=true&w=majority&appName=Cluster0
   PORT=5000
   JWT_SECRET=3LyaAsBuU5conUweS1PHdgQu5cyIV3D5wHZYzlR0eMM=
   NODE_ENV=development
   ```

## Setting Up the Server

1. **Create the Server File**

   Create a file named `index.js` in the backend directory and set up the basic Express server:

   **File: c:\Users\Asus\OneDrive\Desktop\Chat Applications Projects\Chat App in 4 Hours\backend\index.js**

   In index.js file we are first importing the necessary packages then creating a basic server using express.

   In this we are first creating a middleware app.use("/api/auth", authRoute);

   This authRoute will send us to routes folder and inside the auth.js (authentication) router for signup, login and logout, and this auth.js route will send us to controller folder inside the auth.js controller, where we are defining signup, login and logout handleMethods.

   Then after this we are creating app.use('/api/messages', messageRoute), this will send us to routes folder inside the message.js where this will send us to controller folder inside the message.js where we creating our message model.

## Creating Models

1. **User Model**

   Create a `models` directory and add a `user.js` file to define the User model:
   Inside a `models` directory we add a `message.js` file to define the message model:
   Inside a `models` directory we add a `conversation.js` file to define the conversation model:

## Setting Up Routes

1. **Create Routes**

   Create a `routes` directory and we a `auth.js` file to define authentication-related routes:
   Inside a `routes` directory and add a `user.js` file to define user-related routes:
   Inside a `routes` directory and we a `message.js` file to define message-related routes:

   **File: c:\Users\Asus\OneDrive\Desktop\Chat Applications Projects\Chat App in 4 Hours\backend\routes\userRoutes.js**

   Creating router folder and inside it we are creating a file which is handle different routes.

2. **Integrate Routes with Server**

   Update `index.js` to use the routes:

   **File: c:\Users\Asus\OneDrive\Desktop\Chat Applications Projects\Chat App in 4 Hours\backend\server.js**

   ````javascript
   // ... previous code
   ```// Routes

   const authRoute = require("./routes/auth");
   const messageRoute = require("./routes/message");
   const userRoute = require("./routes/user");

   app.use("/api/auth", authRoute);
   app.use("/api/messages", messageRoute);
   app.use("/api/users", userRoute);

   // ... rest of the code

   ````

3. **Other folders inside the Backend Folder**

   ## DB Folder

   - To segregate or applying model-view-controller (MVC) approach we have to segregate the code, in the separate folder, so for connecting to the database we have create separate folder db inside we create a file `connectToMongoDb.js` file inside we are establishing MongoDB connection and we have to export this function and import this function in index.js file.

   ## Middleware Folder

   - Inside the middleware folder we have to create a file which is handle different middleware, like we have to create a middleware for authentication, so we have to create a file named `protectRoute.js` inside this file we are creating a middleware for authentication, and we have to export this middleware and import in our `index.js` file

   ## Services Folder

   - Inside the services folder we have to create a file which is handle different services, like in our project we are creating `generateToken.js` file inside this file we are creating a function for generating token, using JWT, after generating token we are sending this token to the client side using cookie, and we have to export this function in our controllers inside the auth.js file.

# FRONTEND SETUP

1. **Main Frontend Technologies**

- HTML
- CSS
- JavaScript
- React
- Tailwind CSS
- daisyUI => for UI components (installing steps: bun add -D daisyui@latest) or we can directly write daisyui then we have to add it in tailwind.config.js in the plugins array like this: plugins: [require("daisyui")], and even if showing erro that require is not define the quick fix by using no-undef for entire file.

2. **Project Initialization**

## Project Setup

- Open a terminal, navigate to the frontend directory, and run the following command to initialize a new React project:

- `bun create vite@latest .` => this will create a new react project in the current directory meaning in the frontend directory.

- After this setup write in terminal `bun install` => this will install all the dependencies.
- After this write in terminal `bun dev` => this will start the development server, if the project is open with couter app meaning our react app created successfully.

## Tailwind CSS Setup

- Then We have to install tailwind css in our frontend project, so write in terminal
  `bun add -D tailwindcss postcss autoprefixer` => this will install tailwind css in our project

- Then write in terminal `bunx tailwindcss init -p` => this will create a tailwind.config.js file in our project

- Then open tailwind.config.js file and add the following code inside the content array:

  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ]

- After this go to src folder and go to index.css file and remove all the existing code and write the following code only:

@tailwind base;
@tailwind components;
@tailwind utilities;

- This is the complete setup to install tailwind css in our react project.

## daisyUI Setup

- Now we have to install daisyUI in our project, so write in terminal `bun add -D daisyui` => this will install daisyUI in our project.

- then go to tailwind.config.js file and add the following code inside the plugins array:

plugins: [require("daisyui")],

- This is the complete setup to install daisyUI in our react project.

## Folder Structure

- Inside the src folder we have to create now 2 folder first one is components and second one is pages.

- Inside the pages I have created 3 folder is home, login, and signup, till now.

