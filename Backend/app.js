import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.options(
  cors({
    origin: "http://localhost:5173",
    headers: ["Content-Type"],
    credentials: true,
  })
);
dotenv.config();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

// To-Do Schema
const todoSchema = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  const newTodo = new Todo({
    title,
  });
  await newTodo.save();
  res.json(newTodo);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { completed },
    { new: true }
  );
  res.json(updatedTodo);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: "Todo deleted" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
