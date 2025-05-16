import React, { useState } from 'react';
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
} from './features/api/todosApi';

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const { data: todos, isLoading } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleAdd = async () => {
    if (newTodo.trim()) {
      await addTodo({ title: newTodo, completed: false });
      setNewTodo('');
    }
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 ToDo List</h1>

      <div style={styles.inputContainer}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Yangi vazifa kiriting..."
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.addButton}>Qo‘shish</button>
      </div>

      {isLoading ? (
        <p style={styles.loading}>Yuklanmoqda...</p>
      ) : (
        <ul style={styles.todoList}>
          {todos?.map((todo) => (
            <li key={todo.id} style={styles.todoItem}>
              <span>{todo.title}</span>
              <button
                onClick={() => handleDelete(todo.id)}
                style={styles.deleteButton}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '12px',
    background: '#fdfdfd',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px',
  },
  addButton: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    color: '#666',
  },
  todoList: {
    listStyle: 'none',
    padding: 0,
  },
  todoItem: {
    backgroundColor: '#f4f4f4',
    marginBottom: '10px',
    padding: '10px 15px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default App;
