import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const API_URL = 'http://localhost:3000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get(API_URL).then((res) => setTasks(res.data));
  }, []);

  const createTask = async () => {
    if (!title.trim()) return;
    const res = await axios.post(API_URL, { title });
    setTasks([...tasks, res.data]);
    setTitle('');
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const toggleDone = async (task) => {
    const updated = { ...task, done: !task.done };
    const res = await axios.put(`${API_URL}/${task._id}`, updated);
    setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
  };

  return (
    <div className='container'>
      <h1>📝 Todo List</h1>

      <div className='input-row'>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='New task'
        />
        <button onClick={createTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              className={task.done ? 'done' : ''}
              onClick={() => toggleDone(task)}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
