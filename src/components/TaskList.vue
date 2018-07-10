<template>
<div>
  <button @click="sortAscending = !sortAscending" class="sort">Sort</button>
  <transition-group name="list" tag="section" class="task-list">
    <task-list-item
        v-for="task in sortedTasks"
        :key="task.id"
        :task="task"
        @updateTask="updateTask"
        @toggleDone="toggleDone"
        @deleteTask="deleteTask" />
  </transition-group>
  </div>
</template>
<!-- eslint-disable -->
<script>
import TaskListItem from '@/components/TaskListItem'

export default {
  components: { TaskListItem },
  props: ['tasks'],
  data () {
    return {
      sortAscending: true,
      priorityOptions: [
        {id: 1, order: 1, name: 'low'},
        {id: 2, order: 2, name: 'medium'},
        {id: 3, order: 3, name: 'high'}
      ],
      categoryOptions: [
        {id: 1, order: 1, name: 'todos'},
        {id: 2, order: 2, name: 'work'},
        {id: 3, order: 3, name: 'school'}
      ]
    }
  },
  computed: {
    sortedTasks () {
      return [...this.tasks].sort((a, b) => {
        const dateOne = new Date(a.dueAt)
        const dateTwo = new Date(b.dueAt)
        return this.sortAscending ? (dateOne - dateTwo) : (dateTwo - dateOne)
      })
    }
  },
  methods: {
    toggleDone (task) {
      this.$emit('toggleDone', task)
    },
    deleteTask (task) {
      this.$emit('deleteTask', task)
    },
    updateTask (task) {
      this.$emit('updateTask', task)
    }
  }
}
</script>

<style>
.list-move {
  transition: all 400ms ease-in-out 50ms;
}
.list-enter {
  opacity: 0;
  transform: translateY(-2em);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-2em);
}
.list-leave-active {
  position: absolute;
}

.sort{
  background: hsl(155, 87%, 35%);
    border: 1px solid hsl(155, 87%, 35%);
    border-radius: 0.25rem;
    padding: 0.5rem 0.5rem;
    color: hsl(0, 0%, 99%);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
    font-size: 0.8rem;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.25);
    outline: none;
    cursor: pointer;
}

</style>
