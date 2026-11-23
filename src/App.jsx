import { useState } from 'react'
import { countCompleted } from './checklist.js'

const tasks = [
  'Run unit tests',
  'Verify the staging deployment',
  'Approve the production release',
]

export default function App() {
  const [completed, setCompleted] = useState({ ready: false })

  const completedCount = countCompleted(tasks, completed)

  function toggleTask(task) {
    setCompleted((previous) => ({
      ...previous,
      [task]: !previous[task],
    }))
  }

  return (
    <main>
      <h1>Release Checklist</h1>
      <p aria-live="polite">
        {completedCount} of {tasks.length} tasks completed
      </p>

      <ul>
        {tasks.map((task) => (
          <li key={task}>
            <label>
              <input
                type="checkbox"
                checked={Boolean(completed[task])}
                onChange={() => toggleTask(task)}
              />
              {task}
            </label>
          </li>
        ))}
      </ul>
    </main>
  )
}
