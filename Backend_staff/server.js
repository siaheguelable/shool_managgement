const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./DB/connection");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const staffAdminRoutes= require("./routes/staffAdminRoutes");
const corsOptions = {
  origin: "http://localhost:3001", // Adjust this to your frontend URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};


const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", staffAdminRoutes);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Management API",
      version: "1.0.0",
      description: "API documentation for your school system",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // where your routes will be
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Configure PORT
const PORT = process.env.PORT || 3000;

// Start server after connecting to database
const startServer = async () => {
  try {
    await connectDB();
    // Drop the old non-sparse index on githubId
    const db = mongoose.connection.db;
    try {
      await db.collection('staff_admins').dropIndex('githubId_1');
      console.log('Dropped old githubId index');
    } catch (error) {
      console.log('Index not found or already dropped:', error.message);
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
      console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
