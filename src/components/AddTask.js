import React, { useState } from 'react'

export default function AddTask({ onAdd }) {
    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)

    const submit = (e) => {
        e.preventDefault()

        if (!text) {
            alert('Please add a task')
            return
        }

        onAdd({ text, date, reminder })

        setText('')
        setDate('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={submit}>

            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task'
                    value={text}
                    onChange={(e) => setText(e.target.value)}></input>
            </div>

            <div className='form-control'>
                <label>Date & Time</label>
                <input type='text' placeholder='Add Date & Time'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}></input>
            </div>

            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox'
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)}></input>
            </div>

            <input className='btn btn-block' type='submit' value='Save Task'></input>

        </form>
    )
}
