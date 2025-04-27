<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Создать задачу</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="flex flex-col gap-2" style="max-width: 600px;">
        <UInput v-model="title" placeholder="Название задачи" required />
        <UTextarea v-model="description" placeholder="Описание задачи" />

        <UButton type="submit" color="primary">Создать</UButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const { createTask } = useTasks()

const title = ref('')
const description = ref('')

const handleSubmit = async () => {
  try {
    await createTask(title.value, description.value)
    navigateTo('/')
  } catch (e) {
    console.error(e)
  }
}
</script>
