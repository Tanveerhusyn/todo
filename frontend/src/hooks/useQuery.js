import { useState, useEffect } from 'react';
import { BACKEND_URL_DEVELOPMENT,BACKEND_URL_PRODUCTION } from '../assets/constants';
function useQuery() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [event, setEvent] = useState("");
  const [isAddingLoading, setAddingLoading] = useState(false);
  const [isDeletionLoading, setDeletionLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = BACKEND_URL_DEVELOPMENT;
  //process.env.NODE_ENV=="production"?BACKEND_URL_DEVELOPMENT:BACKEND_URL_PRODUCTION;
 console.log(process.env.NODE_ENV)
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
      setEvent("")
      setAddingLoading(true)
      const response = await fetch(`${baseURL}/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      const newTodo = await response.json();
      console.log(newTodo)
      setAddingLoading(false)
      setEvent(newTodo.message)
      setTodos([...todos, newTodo.task]);
    } catch (error) {
      setError(error);
    }
  }

  async function updateTodo(todoId, updatedTodo) {
    try {
      setEvent("")
      setAddingLoading(true)
      const response = await fetch(`${baseURL}/api/todos/${todoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      const updated = await response.json();
      setAddingLoading(false)
      setEvent(updated.message)
      setTodos(todos.map(todo => (todo._id === todoId ? updated.task : todo)));
    } catch (error) {
      setError(error);
    }
  }

  async function deleteTodo(todoId) {
    try {
      setEvent("")
      setDeletionLoading(true)
      const response =   await fetch(`${baseURL}/api/todos/${todoId}`, {
        method: 'DELETE',
      });

      const deletedData = await response.json();
      setTodos(todos.filter(todo => todo._id !== todoId));
      setEvent(deletedData.message)
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
    event,
    createTodo,
    updateTodo,
    deleteTodo,
  };
}

export default useQuery;
