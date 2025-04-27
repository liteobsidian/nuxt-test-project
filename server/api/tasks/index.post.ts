let tasks: any[] = []

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const task = {
        id: Date.now(),
        title: body.title,
        description: body.description,
        createdAt: new Date(),
        completed: false,
    }
    tasks.push(task)
    return task
})
