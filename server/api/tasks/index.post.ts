import { getTasks, saveTasks } from '@/server/utils/tasks'
import type { Task } from '@/types/task'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const tasks = await getTasks()

    const task: Task = {
        id: Date.now(),
        title: body.title,
        description: body.description,
        createdAt: new Date(),
        completed: false,
    }

    tasks.push(task)

    await saveTasks(tasks)

    return task
})
