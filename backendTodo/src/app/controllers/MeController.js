const { model } = require("mongoose");
const TodoList = require("../models/TodoList");
const e = require("express");
class MeController {
  //   [get] /me/show
  async showInfo(req, res) {
    try {
      const todos = await TodoList.find();
      res.json(todos);
    } catch (err) {
      console.log("error: ", err);
      res.status(500).json({ message: " server error" });
    }
  }
  //   [post] /me/create
  async create(req, res) {
    try {
      const newTodos = new TodoList({
        title: req.body.title,
        completed: req.body.completed || false,
      });
      const saveTodos = await newTodos.save();
      res.json(saveTodos);
    } catch (err) {
      console.log("error: ", err);
      res.status(500).json({ message: "server error" });
    }
  }
  //   [put] /me/update/:id
  async update(req, res) {
    try {
      const updateTodos = await TodoList.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          completed: req.body.completed || false,
        },
        { new: true }
      );
      res.json(updateTodos);
    } catch (err) {
      console.log("error: ", err);
      res.status(500).json({ message: "server error" });
    }
  }
  //[delete] me/delete/:id
  async delete(req, res) {
    try {
      const deleteTodos = await TodoList.findByIdAndDelete(req.params.id, {
        msg: "delete success",
      });
      res.json(deleteTodos);
    } catch (err) {
      console.log("error: ", err.message);
      res.status(500).json({ message: "server error" });
    }
  }
}
module.exports = new MeController();
