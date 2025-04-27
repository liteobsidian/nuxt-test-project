<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Мои задачи</h2>

    <div v-if="tasks.length === 0" class="text-gray-500">
      Задач пока нет.
    </div>

    <ul>
      <li v-for="task in tasks" :key="task.id" class="flex items-center gap-2 mb-2">
        <input type="checkbox" :checked="task.completed" @change="toggleTask(task.id)" />
        <span :class="{ 'line-through text-gray-400': task.completed }">{{ task.title }}</span>
        <button @click="deleteTask(task.id)" class="text-red-500 text-xs ml-2">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { tasks, toggleTask, deleteTask } = useTasks()
</script>