import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState({
    id: null,
    title: "",
    completed: false,
  });

  // Lấy danh sách công việc khi load ứng dụng

  useEffect(() => {
    axios
      .get("http://localhost:8000/me/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the todos:", error);
      });
  }, []);

  // Thêm công việc mới
  const handleAddTodo = () => {
    axios
      .post("http://localhost:8000/me/todos", {
        title: newTodo,
        completed: false,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo(""); // Clear input field
      })
      .catch((error) => {
        console.error("There was an error adding the todo:", error);
      });
  };

  // Sửa công việc
  const handleEditTodo = () => {
    axios
      .put(`http://localhost:8000/me/todos/${editTodo.id}`, {
        title: editTodo.title,
        completed: editTodo.completed,
      })
      .then((response) => {
        const updatedTodos = todos.map((todo) =>
          todo._id === editTodo.id ? response.data : todo
        );
        setTodos(updatedTodos);
        setEditTodo({ id: null, title: "", completed: false }); // Reset edit form
      })
      .catch((error) => {
        console.error("There was an error editing the todo:", error);
      });
  };

  // Xóa công việc
  const handleDeleteTodo = (id) => {
    axios
      .delete(`http://localhost:8000/me/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => {});
  };

  return (
    <div>
      <h1>Todo List</h1>

      {/* Thêm công việc */}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTodo}>Add</button>

      {/* Hiển thị danh sách công việc */}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title} - {todo.completed ? "Completed" : "Pending"}
            <button
              onClick={() =>
                setEditTodo({
                  id: todo._id,
                  title: todo.title,
                  completed: todo.completed,
                })
              }
            >
              Edit
            </button>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Form sửa công việc */}
      {editTodo.id && (
        <div>
          <h2>Edit Todo</h2>
          <input
            type="text"
            value={editTodo.title}
            onChange={(e) =>
              setEditTodo({ ...editTodo, title: e.target.value })
            }
          />
          <button onClick={handleEditTodo}>Save</button>
        </div>
      )}
    </div>
  );
}

export default TodoApp;
