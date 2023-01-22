import { useEffect, useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import Button from "./Button";


export default function TaskDetails() {
    const [task, setTask] = useState([])
    const [loading, setLoading] = useState(true)
    const params = useParams();
    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        const fetchTask = async () => {
            const res = await fetch(`http://localhost:5000/tasks/${params.id}`)
            if (res.status === 404) {
                navigate('/')
            }
            const data = await res.json()

            setTask(data)
            setLoading(false)
        }

        fetchTask()
    })


    return (
        <div>
            <p>{pathname}</p>
            {loading ?
                <h3>Loading...</h3>
                :
                <>
                    <h3>{task.text}</h3>
                    <p>{task.date}</p>
                </>
            }
            <Button text='Go Back' onClick={() => { navigate(-1) }} />
        </div>
    )
}
