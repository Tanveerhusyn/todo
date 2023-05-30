import { useState, useEffect } from 'react';

function useQuery() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = 'http://localhost:5000';

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(`${baseURL}/api/todos`);
        const data = await response.json();
        setTodos(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  async function createTodo(todo) {
    try {
      const response = await fetch(`${baseURL}/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      setError(error);
    }
  }

  async function updateTodo(todoId, updatedTodo) {
    try {
      const response = await fetch(`${baseURL}/api/todos/${todoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      const updatedData = await response.json();
      setTodos(todos.map(todo => (todo._id === todoId ? updatedData : todo)));
    } catch (error) {
      setError(error);
    }
  }

  async function deleteTodo(todoId) {
    try {
      await fetch(`${baseURL}/api/todos/${todoId}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(todo => todo._id !== todoId));
    } catch (error) {
      setError(error);
    }
  }

  return {
    todos,
    isLoading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
  };
}

export default useQuery;
