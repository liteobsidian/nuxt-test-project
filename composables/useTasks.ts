export type Task = {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    completed: boolean;
}

export const useTasks = () => {
    const tasks: Ref<Task[]> = useState('tasks', () => [])

    const addTask = (task: { title: string; description: string }) => {
        tasks.value.push({
            id: Date.now(), // простая генерация id
            ...task,
            createdAt: new Date(),
            completed: false,
        })
    }

    const toggleTask = (id: number) => {
        const task = tasks.value.find((t) => t.id === id)
        if (task) {
            task.completed = !task.completed
        }
    }

    const deleteTask = (id: number) => {
        tasks.value = tasks.value.filter((t) => t.id !== id)
    }

    return {
        tasks,
        addTask,
        toggleTask,
        deleteTask,
    }
}
