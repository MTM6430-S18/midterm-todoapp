<template>
  <div id="app">
    <the-header v-once />
    <new-task-form @addTask="addTask" />

    <div id="nav" class="tabs">
      <router-link to="/active">Active Tasks</router-link>
      <router-link to="/completed">Completed Tasks</router-link>
      <select name="category-filter" id="category-filter" v-model="selectedCategory">
              <option value="Todos">Todos</option>
              <option value="Work">Work</option>
              <option value="School">School</option>
              <option v-for="option in categoryOptions"
              :value="option.id"
              :key="option.id">{{option.name}}</option>
      </select>
    </div>
    <section class="task-list">
    <transition-group name="tab" :duration="{ enter: 600, leave: 300 }" appear>
      <router-view
        :tasks="overdueTasks"
        :class="{ 'overdue': !!overdueTasks.length }"
        name="overdue"
        key="overdue"
        @updateTask="updateTask"
        @toggleDone="toggleDone"
        @deleteTask="deleteTask"
      />
      <router-view
        :tasks="upcomingTasks"
        name="upcoming"
        key="upcoming"
        @updateTask="updateTask"
        @toggleDone="toggleDone"
        @deleteTask="deleteTask"
      />
      <router-view
        :tasks="completedTasks"
        :class="{ 'completed': !!completedTasks.length }"
        name="completed"
        key="completed"
        @updateTask="updateTask"
        @toggleDone="toggleDone"
        @deleteTask="deleteTask"
      />
      </transition-group>
    </section>
  </div>
</template>
<!-- eslint-disable -->
<script>
import NewTaskForm from '@/components/NewTaskForm'
import TaskList from '@/components/TaskList'
import TheHeader from '@/components/TheHeader'

import {db} from '@/firebaseService'
const taskRef = db.collection('tasks')

export default {
  name: 'app',
  components: { NewTaskForm, TaskList, TheHeader },
  data: () => ({
    newTask: {},
    tasks: []
  }),
  firestore: {
    tasks: taskRef
  },
  computed: {
    activeTasks () {
      return this.tasks.filter(task => !task.isComplete)
    },
    completedTasks () {
      return this.tasks.filter(task => task.isComplete)
    },
    overdueTasks () {
      return this.activeTasks.filter(
        task => new Date(task.dueAt) < Date.now() && !task.isComplete
      )
    },
    upcomingTasks () {
      return this.activeTasks.filter(task => new Date(task.dueAt) >= Date.now())
    },
     filteredTasks () {
      const combined = [
        ...this.filteredPriorityTasks,
        ...this.filteredCategoryTasks
        ]
      const merged = [...new Set(combined)]
      return merged.filter(task => 
      this.filteredPriorityTasks.includes(task) &&
      this.filteredCategoryTasks.includes(task)
      )
    }
  },
  watch: {
    tasks: {
      handler: function () { this.syncTasks() },
      deep: true
    }
  },
  created () {
    this.tasks = JSON.parse(localStorage.getItem('taskList')) || []
  },
  methods: {
    addTask (task) {
      this.tasks.push(task)
      taskRef.add(task)
    },
    deleteTask (task) {
      const index = this.tasks.findIndex(t => t.id === task.id)
      this.tasks.splice(index, 1)
      taskRef.doc(task.id).delete()
    },
    syncTasks () {
      localStorage.setItem('taskList', JSON.stringify(this.tasks))
    },
    toggleDone (task) {
      task.isComplete = !task.isComplete
    },
    updateTask (task) {
      let target = this.tasks.find(t => t.id === task.id) // eslint-disable-line no-unused-vars
      target = Object.assign(target, task)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 1rem;
}

.task-list {
  margin: 1rem 0;
  &.completed {
    border-top: 1px solid hsl(153, 47%, 49%);
    background: hsl(153, 30%, 98.5%);
    color: hsl(153, 16%, 40%);
  }

.overdue{
    border-bottom: 1px solid hsl(348, 94%, 31%);
    background: hsl(348, 50%, 98.5%);
    color: hsl(348, 91%, 40%);
    margin-bottom: 10px;
  }
}

.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  a {
    border-bottom: 1px solid hsl(0, 0%, 88%);
    color: #2c3e50;
    flex: 1;
    font-weight: bold;
    letter-spacing: 0.5px;
    padding: 0.5rem 1rem;
    text-decoration: none;
    text-transform: uppercase;
    transition: all 0.6s ease-in-out;

    &.router-link-exact-active {
      border-bottom-color: #42b983;
      color: #42b983;
    }
  }
}

// Tab transition styles
.tab-enter {
  opacity: 0;
  transform: translateY(-200%);
}
.tab-leave-to {
  opacity: 0;
  transform: translateY(200%);
}
.tab-enter-active {
  transition: all 0.4s ease;
}
.tab-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

#category-filter{
  position: relative;
  display: inline-block;
  border: 1px solid;
  border-color: rgb(63, 172, 118);
  width: 300px;
  height: 28px;
  padding: 16px;
  font-size: 16px;
  cursor: pointer;
}

</style>
