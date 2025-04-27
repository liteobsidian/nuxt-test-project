import { getTasks, saveTasks } from '@/server/utils/tasks'

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))

    let tasks = await getTasks()

    const task = tasks.find(t => t.id === id)
    if (!task) {
        throw createError({ statusCode: 404, statusMessage: 'Task not found' })
    }

    tasks = tasks.filter(t => t.id !== id)

    await saveTasks(tasks)

    return { success: true }
})
