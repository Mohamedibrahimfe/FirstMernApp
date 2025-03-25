import { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";

const API_URL = import.meta.env.VITE_BASE_URI;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await axios.post(API_URL, { title: newTodo });
    setNewTodo("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t._id === id);
    await axios.put(`${API_URL}/${id}`, { completed: !todo.completed });
    fetchTodos();
  };

  const editTodo = async (id, newTitle) => {
    await axios.put(`${API_URL}/${id}`, { title: newTitle });
    fetchTodos();
  };

  return (
    <div className="max-w-md mx-auto mt-10 shadow-2xl rounded-md p-2">
      <h1 className="text-2xl font-bold text-black dark:text-gray-200  text-center mb-4">MERN Todo App</h1>
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-full p-2 rounded bg-gray-500 text-white outline-none"
          placeholder="Add a new task..."
        />
        <button type="submit" className="bg-slate-700 hover:bg-slate-800 dark:bg-blue-500 hover:dark:bg-blue-700 text-white px-3 py-2 rounded">
          Add
        </button>
      </form>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onDelete={deleteTodo} onToggle={toggleTodo} onEdit={editTodo} />
      ))}
    </div>
  );
};

export default TodoList;
