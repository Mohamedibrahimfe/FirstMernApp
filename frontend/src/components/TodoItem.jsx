import { useState } from "react";

const TodoItem = ({ todo, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEdit = () => {
    onEdit(todo._id, editedTitle);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-500 dark:bg-gray-800 text-black dark:text-white rounded-lg mb-2">
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="dark:bg-gray-700 text-black p-1 rounded outline-none"
          autoFocus
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === "Enter" && handleEdit()}
        />
      ) : (
        <span
          className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
          onClick={() => onToggle(todo._id)}
        >
          {todo.title}
        </span>
      )}
      <div className="flex gap-2">
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="text-yellow-400">✏️</button>
        )}
        <button onClick={() => onDelete(todo._id)} className="text-red-500">🗑️</button>
      </div>
    </div>
  );
};

export default TodoItem;
