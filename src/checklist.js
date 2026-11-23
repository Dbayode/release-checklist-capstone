export function countCompleted(tasks, completed) {
  return tasks.filter((task) => completed[task]).length
}
