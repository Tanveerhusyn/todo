import { useState, useEffect } from 'react';
import { BACKEND_URL_DEVELOPMENT,BACKEND_URL_PRODUCTION } from '../assets/constants';
function useQuery() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isAddingLoading, setAddingLoading] = useState(false);
  const [isDeletionLoading, setDeletionLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = process.env.NODE_ENV=="production"?BACKEND_URL_PRODUCTION:BACKEND_URL_DEVELOPMENT;

  console.log(baseURL)

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
      setAddingLoading(true)
      const response = await fetch(`${baseURL}/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      const newTodo = await response.json();
      setAddingLoading(false)
      setTodos([...todos, newTodo]);
    } catch (error) {
      setError(error);
    }
  }

  async function updateTodo(todoId, updatedTodo) {
    try {
      setAddingLoading(true)
      const response = await fetch(`${baseURL}/api/todos/${todoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      const updatedData = await response.json();
      setAddingLoading(false)
      setTodos(todos.map(todo => (todo._id === todoId ? updatedData : todo)));
    } catch (error) {
      setError(error);
    }
  }

  async function deleteTodo(todoId) {
    try {
      setDeletionLoading(true)
      await fetch(`${baseURL}/api/todos/${todoId}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(todo => todo._id !== todoId));
      setDeletionLoading(false)
    } catch (error) {
      setError(error);
    }
  }

  return {
    todos,
    isLoading,
    isAddingLoading,
    isDeletionLoading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
  };
}

export default useQuery;
