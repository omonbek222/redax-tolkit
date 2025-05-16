import React, { useState } from 'react';
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from './features/api/todosApi';
import './App.css'; 

const App = () => {
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const { data: todos = [], isLoading } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const handleAdd = () => {
    if (input.trim()) {
      addTodo({ title: input, completed: false });
      setInput('');
    }
  };

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.title);
  };

  const handleUpdate = () => {
    if (editText.trim()) {
      updateTodo({ id: editId, title: editText });
      setEditId(null);
      setEditText('');
    }
  };

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  return (
    <div className="container">
      <h1>📝 ToDo List (RTK Query)</h1>

      <div className="todo-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Yangi vazifa..."
        />
        <button onClick={handleAdd}>Qo‘shish</button>
      </div>

      {isLoading ? (
        <p>Yuklanmoqda...</p>
      ) : (
        <ul className="todo-list">
          {todos.slice(0, 10).map((todo) => (
            <li key={todo.id} className="todo-item">
              {editId === todo.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span>{todo.title}</span>
              )}

              <div className="todo-actions">
                {editId === todo.id ? (
                  <button onClick={handleUpdate}>💾</button>
                ) : (
                  <button onClick={() => handleEdit(todo)}>✏</button>
                )}
                <button onClick={() => handleDelete(todo.id)}>🗑</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
