import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from "./components/About";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Button from "./components/Button";
import TaskDetails from './components/TaskDetails';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasks()
      setTasks(tasks)
    }

    loadTasks()
  }, [])

  // Add task.
  const addTask = async (task) => {
    // Request add task at server.
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(task)
    })
    const data = await res.json()

    setTasks([...tasks, data])
  }

  // Delete task.
  const deleteTask = async (id) => {
    // Request delete at server.
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    // Delete at client.
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Request to save an updated version of a task at server.
  const updateTask = async (id, task) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(task)
    })
    return res
  }

  // Toggle reminder for a task.
  const toggleTaskReminder = async (id) => {
    const task = await fetchTask(id)
    const editedTask = { ...task, reminder: !task.reminder }
    const res = await updateTask(id, editedTask)
    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ?
      { ...task, reminder: data.reminder }
      : task))
  }

  const toggleAddTaskForm = () => {
    setShowAddTask(!showAddTask)
  }

  return (
    <Router>
      <div className="container">
        <Header title='Task Tracker' />
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Button
                  text={showAddTask ? 'Close' : 'Add'}
                  color={showAddTask ? 'red' : 'green'}
                  onClick={toggleAddTaskForm}
                />
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ?
                  <TaskList
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggleReminder={toggleTaskReminder}
                  />
                  : 'No Tasks to Show'
                }
              </>
            }
          />
          <Route
            path='/about'
            element={<About />}
          />
          <Route
            path='/task/:id'
            element={<TaskDetails />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  // Fetch a task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

export default App;
