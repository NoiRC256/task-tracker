import { FaBell, FaClock, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Task({ task, onDelete, onToggleReminder }) {
    return (
        <div
            className={`task ${task.reminder ? 'reminder' : ''}`}>
            <h3>
                {task.text}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(task.id)}
                />
            </h3>
            <p>
                <FaBell
                    style={{ color: task.reminder ? 'green' : 'black' }}
                    onClick={() => onToggleReminder(task.id)}
                />
                <span> </span>
                {task.date}</p>
            <p>
                <Link to={`/task/${task.id}`}>Details</Link>
            </p>
        </div>
    )
}
