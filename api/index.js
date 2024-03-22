import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios"; // Add axios for making HTTP requests
import cookieParser from "cookie-parser";
import Comment from "./models/comment.model.js";
import CommentRouter from "./routes/comment.route.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database connected..!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/comments", CommentRouter);

// Define a route to fetch data from JSON server and insert into MongoDB
app.get("/comments", async (req, res) => {
  try {
    // Fetch data from JSON server
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then(async (response) => {
        const data = response.data;
        console.log(data);
        console.log("data");
        // Insert data into MongoDB
        await Comment.insertMany(data);
        res.send("Data fetched and inserted successfully");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
      });
  } catch (error) {
    console.error("Error fetching or inserting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
