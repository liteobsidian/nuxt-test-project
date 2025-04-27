let tasks = [
    { id: 1, title: 'Первая задача', completed: false },
    { id: 2, title: 'Вторая задача', completed: true }
];

export default defineEventHandler((event) => {
    const id = Number(event.context.params?.id);
    tasks = tasks.filter(task => task.id !== id);
    return { success: true };
});