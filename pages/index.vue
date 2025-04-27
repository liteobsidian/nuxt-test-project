<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Список задач</h1>

    <div v-if="status === 'pending'">Загрузка...</div>

    <ul v-else class="space-y-4">
      <li v-for="task in tasks" :key="task.id" class="flex items-center justify-between bg-white rounded-lg shadow p-4">
        <div class="flex items-center gap-4">
          <UCheckbox v-model="task.completed" @change="toggleCompleted(task)" />
          <div>
            <div class="font-semibold" :class="{ 'line-through text-gray-400': task.completed }">{{ task.title }}</div>
            <div class="text-gray-500 text-sm">{{ task.description }}</div>
          </div>
        </div>
        <UButton color="error" variant="soft" @click="removeTask(task.id)">Удалить</UButton>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTasks } from '@/composables/useTasks'

const { tasks, status, updateTask, deleteTask } = useTasks()

async function toggleCompleted(task: any) {
  await updateTask(task.id, { completed: task.completed })
}

async function removeTask(id: number) {
  if (confirm('Точно удалить задачу?')) {
    await deleteTask(id)
  }
}
</script>
