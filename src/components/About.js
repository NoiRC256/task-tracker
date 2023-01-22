import Button from './Button'
import { useNavigate } from 'react-router-dom'

export default function About() {
  const nagivate = useNavigate()
  return (
    <div>
      <p>Based on <a href="https://www.youtube.com/@TraversyMedia" target="_blank">TraversyMedia</a>'s TaskTracker</p>
      <h4>v 1.0</h4>
      <Button text="Go Back" onClick={() => { nagivate(-1) }} />
    </div>
  )
}
