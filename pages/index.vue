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

    <USwitch class="mt-4" v-model="isShowHeavyTaskList" label="Отрисовать список"></USwitch>

    <div v-if="isShowHeavyTaskList">
      <h2 class="text-xl font-semibold mb-2">Большой компонент</h2>

      <LazyClientOnly>
        <Suspense>
          <template #default>
            <HeavyTaskListInit />
          </template>
          <template #fallback>
            <div class="text-gray-500">Загрузка тяжелого компонента...</div>
          </template>
        </Suspense>
      </LazyClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTasks } from '@/composables/useTasks'
import type {Task} from "~/types/task";
const HeavyTaskListInit = defineAsyncComponent(() => import('~/components/HeavyTaskList.vue'))
const isShowHeavyTaskList = ref(false)

const { tasks, status, updateTask, deleteTask } = useTasks()

const toggleCompleted = async (task: Task) => {
  try {
    await updateTask(task.id, { completed: task.completed })
  } catch (e) {
    console.error(e)
  }
}

const removeTask = async (id: number) => {
  if (!confirm('Точно удалить задачу?')) return
  try {
    await deleteTask(id)
  } catch (e) {
    console.error(e)
  }
}
</script>
