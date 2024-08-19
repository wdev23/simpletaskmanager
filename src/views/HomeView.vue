<template>
 

  <div class="block">
    <div
      class="task_aside bg-[url(@/assets/img/tasks_aside.jpg)] bg-cover bg-center p-4 h-64 flex items-center justify-center flex-col gap-2">
      <h4 class="text-white font-extrabold text-2xl">Diego Hernandez</h4>
      <h3 class="text-white font-bold text-xl">Tasks App</h3>
    </div>
  </div>
  <TaskHome />
  <div class="h-20 bg-cl_purple flex justify-center items-center">
    <h2 class="text-white text-2xl font-extrabold">TASK MANAGER</h2>
  </div>
</template>

<script setup>
import TaskHome from '@/components/task_manager/TaskHome.vue';


</script>

<style scoped></style>