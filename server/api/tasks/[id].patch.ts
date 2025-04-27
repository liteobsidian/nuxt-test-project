import { getTasks, saveTasks } from '@/server/utils/tasks'
import type { Task } from '@/types/task'
import { mergeRight, pickBy } from 'ramda'

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))
    const body = await readBody<Partial<Task>>(event)

    const tasks = await getTasks()

    const task = tasks.find(t => t.id === id)
    if (!task) {
        throw createError({ statusCode: 404, statusMessage: 'Task not found' })
    }

    // Очищаем body от undefined-свойств
    const validBody = pickBy((v) => v !== undefined, body) || {}

    // Обновляем task
    Object.assign(task, mergeRight(task, validBody))

    await saveTasks(tasks)

    return task
})
