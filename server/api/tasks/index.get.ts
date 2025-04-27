import { getTasks } from '~/server/utils/tasks'

export default defineEventHandler(async () => {
    return await getTasks()
})
