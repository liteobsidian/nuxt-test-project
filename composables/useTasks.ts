import type { Task } from '@/types/task'

export const useTasks = () => {
    const { data: tasks = [], status, refresh } = useAsyncData<Task[]>('tasks', () => $fetch('/api/tasks'))

    const addTask = async (task: Pick<Task, 'title' | 'description'>) => {
        await $fetch('/api/tasks', {
            method: 'POST',
            body: task
        })
        await refresh()
    }

    const updateTask = async (id: number, data: Partial<Task>) => {
        await $fetch(`/api/tasks/${id}`, {
            method: 'PATCH',
            body: data
        })
        await refresh()
    }

    const deleteTask = async (id: number) => {
        await $fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        })
        await refresh()
    }

    return {
        tasks,
        status,
        addTask,
        updateTask,
        deleteTask
    }
}
