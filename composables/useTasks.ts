import type { Task } from '~/types/task'

export const useTasks = () => {
    const { data: tasks, refresh, error, status } = useFetch<Task[]>('/api/tasks', {
        method: 'GET',
        server: true, // чтобы сработало на сервере при первом заходе на страницу
        onRequestError({ error }) {
            console.error('Ошибка запроса задач', error)
        },
        onResponseError({ error }) {
            console.error('Ошибка получения задач', error)
        }
    })

    const createTask = async (title: string, description: string) => {
        const { data, error } = await useFetch<Task>('/api/tasks', {
            method: 'POST',
            body: { title, description },
            watch: false,
        })

        if (error.value) {
            throw new Error('Ошибка при создании задачи')
        }

        await refresh()
    }

    const updateTask = async (id: number, payload: Partial<Task>) => {
        const { data, error } = await useFetch<Task>(`/api/tasks/${id}`, {
            method: 'PATCH',
            watch: false,
            body: payload
        })

        if (error.value) {
            throw new Error('Ошибка при переключении задачи')
        }

        await refresh()
    }

    const deleteTask = async (id: number) => {
        const { data, error } = await useFetch<Task>(`/api/tasks/${id}`, {
            method: 'DELETE',
            watch: false,
        })

        if (error.value) {
            throw new Error('Ошибка при удалении задачи')
        }

        await refresh()
    }

    return {
        tasks,
        refresh,
        error,
        status,
        createTask,
        updateTask,
        deleteTask
    }
}
