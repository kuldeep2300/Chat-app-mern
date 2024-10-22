# Backend Setup Instructions

This document provides a step-by-step guide to setting up the backend for the Chat Application using Bun as the package manager. Follow these instructions to initialize the project, set up routes, and manage controllers.

## Prerequisites

- Bun installed on your machine
- MongoDB set up and running

## Project Initialization

1. **Initialize the Project**

   Open your terminal and navigate to the backend directory. Run the following command to initialize a new Bun project:

   ```bash
   bun init
   ```

2. **Install Required Packages**

   Install the necessary packages for the backend:

   ```bash
   bun add express mongoose dotenv
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the backend directory to store environment variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

## Setting Up the Server

1. **Create the Server File**

   Create a file named `index.js` in the backend directory and set up the basic Express server:

   **File: c:\Users\Asus\OneDrive\Desktop\Chat Applications Projects\Chat App in 4 Hours\backend\index.js**
   ```javascript
   const express = require('express');
   const mongoose = require('mongoose');
   const dotenv = require('dotenv');

   dotenv.config();

   const app = express();
   const PORT = process.env.PORT || 5000;

   mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }).then(() => {
     console.log('Connected to MongoDB');
   }).catch((error) => {
     console.error('Error connecting to MongoDB:', error.message);
   });

   app.use(express.json());

   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });
   ```

## Creating Models

1. **User Model**

   Create a `models` directory and add a `user.js` file to define the User model:

   **File: c:\Users\Asus\OneDrive\Desktop\Chat Applications Projects\Chat App in 4 Hours\backend\models\user.js**
   ```javascript
   const mongoose = require('mongoose');

   const userSchema = new mongoose.Schema({
     username: { type: String, required: true, unique: true },
     password: { type: String, required: true },
   });

   const User = mongoose.model('User', userSchema);

   module.exports = User;
   ```

## Setting Up Routes

1. **Create Routes**

   Create a `routes` directory and add a `userRoutes.js` file to define user-related routes:

   **File: c:\Users\Asus\OneDrive\Desktop\Chat Applications Projects\Chat App in 4 Hours\backend\routes\userRoutes.js**
   ```javascript
   const express = require('express');
   const { handleGetUsersForSidebar } = require('../controllers/user');

   const router = express.Router();

   router.get('/users', handleGetUsersForSidebar);

   module.exports = router;
   ```

2. **Integrate Routes with Server**

   Update `server.js` to use the routes:

   **File: c:\Users\Asus\OneDrive\Desktop\Chat Applications Projects\Chat App in 4 Hours\backend\server.js**
   ```javascript
   // ... previous code

   const userRoutes = require('./routes/userRoutes');

   app.use('/api', userRoutes);

   // ... rest of the code
   ```

## Controllers

1. **User Controller**

   The user controller is already set up in `controllers/user.js`:

   **File: c:\Users\Asus\OneDrive\Desktop\Chat Applications Projects\Chat App in 4 Hours\backend\controllers\user.js**
   ```javascript
   const User = require("../models/user");

   const handleGetUsersForSidebar = async (req, res) => {
     try {
       const loggedInUserId = req.user._id;
       const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
       return res.status(200).json(filteredUsers);
     } catch (error) {
       console.log("Error in handleGetUsersForSidebar controller: ", error.message);
       res.status(500).json({ error: "Internal Server Error" });
     }
   };

   module.exports = {
     handleGetUsersForSidebar,
   };
   ```

## Running the Application

1. **Start the Server**

   Use the following command to start the server:

   ```bash
   bun run index.js
   ```

2. **Testing the API**

   Use tools like Postman or curl to test the API endpoints.

This guide covers the backend setup for the Chat Application using Bun. Ensure that your MongoDB instance is running and accessible with the provided connection string.