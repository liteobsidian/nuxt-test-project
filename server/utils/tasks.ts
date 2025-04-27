// Утилита для хранения данных в файле, чтобы не заморачиваться с БД
import { promises as fs } from 'fs'
import { join } from 'path'
import type { Task } from '@/types/task'

const filePath = join(process.cwd(), '.data', 'tasks.json')

export async function getTasks(): Promise<Task[]> {
    try {
        const data = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(data) as Task[]
    } catch (e) {
        return [] // если файла нет — возвращаем пустой массив
    }
}

export async function saveTasks(tasks: Task[]) {
    await fs.mkdir(join(process.cwd(), 'data'), { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2))
}
