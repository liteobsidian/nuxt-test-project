<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-blue-600 text-white p-4">
      <nav class="container mx-auto flex gap-4">
        <NuxtLink to="/" class="hover:underline">Задачи</NuxtLink>
        <NuxtLink to="/create" class="hover:underline">Создать</NuxtLink>
      </nav>
    </header>

    <main class="container mx-auto flex-1 p-4">
      <NuxtPage />
    </main>
  </div>
</template>
