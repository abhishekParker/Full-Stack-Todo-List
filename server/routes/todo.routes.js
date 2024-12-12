const express = require("express");
const jwt = require("jsonwebtoken");
const Todo = require("../models/todo.model");

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
router.post("/", authenticate, async (req, res) => {
  const { val } = req.body;
  try {
    const todo = new Todo({
      val,
      user: req.userId,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: "Error creating todo", error });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId });
    res.json(todos);
  } catch (error) {
    res.status(400).json({ message: "Error fetching todos", error });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { val, isDone } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.userId },
      { val, isDone },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: "Error editing todo", error });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.userId });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting todo", error });
  }
});

module.exports = router;
