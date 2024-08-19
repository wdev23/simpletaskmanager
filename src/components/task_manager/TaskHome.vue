<template>
    <div>
        <!-- Task Home Header -->
        <!-- <div class="task_home_container h-16 bg-cl_greyDark flex justify-center items-center">
            <nav class="text-white text-lg font-semibold flex justify-between w-full container px-8">
                <RouterLink :to="{ name: 'home' }" class="nav_a">Tasks</RouterLink>
                <ul class="inline-flex gap-3">
                    <li>
                        <RouterLink :to="{ name: 'home' }" class="nav_a">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'home' }" class="nav_a">Pending</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'home' }" class="nav_a">Completed</RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'home' }" class="nav_a">Contact</RouterLink>
                    </li>
                </ul>
            </nav>
        </div> -->
        <!-- Closing Task Home Header -->

        <!-- Task Home Main Section -->
        <section class="task_main min-h-screen bg-cl_greyLight p-8 md:pt-0">
            <div
                class="container h-screen border-b-8 border-cl_greyDark grid grid-cols-1 gap-8 py-8 mb-28 md:mb-0 content-center">
                <!-- container Task Home Main Section-->
                <div class="task_content overflow-scroll">
                    <form @submit.prevent="addTask" class="flex flex-col gap-3">
                        <!-- Adding tasks form -->
                        <input type="text" name="add_new_task" placeholder="Add new task..." ref="newTaskInput"
                            v-model="newTask">
                        <select v-model="newPriority">
                            <option disabled value="" selected>Select priority</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                        <button type="submit">Add Task</button>
                    </form>

                    <!-- Task filtering -->
                    <input type="text" name="filter_tasks" placeholder="Filter Tasks..."
                    v-model="filterText">

                    <!-- If there no tasks -->
                    <div class="flex justify-end" v-if="tasks.length == 0">
                        <p>No tasks found. Try changing the filter or add some tasks!</p>
                    </div>

                    <div class="flex flex-col justify-end gap-4 items-center" v-else>
                        <h3 class="text-xl font-bold">Your Tasks</h3>
                        <!-- This a list of tasks -->
                        <div v-for="task in filterTasks" :key="task.id"
                            class="w-full flex justify-between items-center font-bold text-base" :class="{
                                'text-green-900': task.done,
                                'text-red-900': !task.done,
                                'border-l-4 border-red-900 rounded-lg': (task.priority || '').toLowerCase() === 'high',
                                'border-l-4 border-yellow-500 rounded-lg': (task.priority || '').toLowerCase() === 'medium',
                                'border-l-4 border-green-900 rounded-lg': (task.priority || '').toLowerCase() === 'low'
                            }">
                            <div class="w-full bg-white rounded-lg px-2">
                                <!-- Is task done? -->
                                <input type="checkbox" name="task_done" v-model="task.done">
                                <!-- Task description -->
                                <span class="px-1 py-4 inline-block items-center"
                                    :class="task.done ? 'line-through' : 'line-clamp-none'">{{ task.description
                                    }}</span>
                            </div>
                            <!-- Removing a task -->
                            <button class="remove-button absolute right-8" v-if="tasks.length > 0"
                            @click.prevent="deleteTask(task.id)">X</button>
                        </div>
                    </div>
                </div><!-- Closing task_content -->


            </div><!-- Closing container Task Home Main Section-->
        </section><!-- Closing Task Home Main Section -->
    </div>
</template>

<script setup>
// watchEffect import from vue
import { ref, onMounted, watch, computed  } from 'vue';

//   Variables
const tasks = ref(
    JSON.parse(
        localStorage.getItem('tasks') ?? '[]'
    )
)
const newTaskInput = ref(null);
const newTask = ref('')
const newPriority = ref('')
const filterText = ref('')

//   States
onMounted(() => {
    if (newTaskInput.value) {
        newTaskInput.value.focus();
    }
});

//   Functions
const addTask = () => {
    if (newTask.value != '' && newPriority.value != '') {
        tasks.value.unshift({
            id: tasks.value.length + 1,
            description: newTask.value,
            priority: newPriority.value,
            done: false
        })
        newTask.value = ''
        // newPriority.value = ''
    }

    else alert('Add new task, and priority')
}

//

const deleteTask = (taskId) => {
    tasks.value = tasks.value.filter(task => task.id !== taskId)
}

//

const filterTasks = computed(() => tasks.value.filter(
    task => task.description.toLowerCase().includes(filterText.value.toLowerCase())
))

    // Services
    // watch(newTask, (newValue, oldValue) => {
    //     console.log(`New value is ${newValue}, old was ${oldValue}`)    
    // }, { immediate:true  }) 

    // watchEffect(() => {
    //     console.log(`New task input value is ${newTask.value}`)
    // })

    // watch(tasks, () => {
    //     console.log('Task has changed')
    // }, { deep: true })

    watch(tasks, () => {
        localStorage.setItem(
            'tasks', 
            JSON.stringify(tasks.value)
        )
    }, { deep: true })
</script>

<style scoped>
.task_content {
    @apply border-2 border-cl_purpleShadow rounded-lg p-6 flex flex-col gap-5 relative;
}

.task_main button[type="submit"] {
    @apply py-2 px-4 bg-cl_purple text-white font-semibold text-balance rounded-lg hover:bg-cl_purpleShadow transition-all duration-300 my-4 active:scale-90;
}

.task_main .remove-button {
    @apply py-1 px-3 bg-cl_purple text-white font-semibold text-balance rounded-lg hover:bg-cl_purpleShadow transition-all duration-300 active:scale-90;
}

.task_main input[type="text"] {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm shadow-cl_purpleShadow focus:outline-none focus:ring-cl_purpleShadow focus:bg-cl_purpleShadow placeholder-gray-500 focus:text-white;
}

.task_main select {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm shadow-cl_purpleShadow focus:outline-none focus:ring-cl_purpleShadow focus:bg-cl_purpleShadow text-sm focus:text-white font-semibold;
}

nav .nav_a {
    @apply transition-all duration-300 hover:text-cl_purple transform hover:scale-110;
}
</style>