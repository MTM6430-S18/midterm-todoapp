<template>
  <div v-if="isEditing" class="task-list-item is-editing" @keyup.esc="cancel">
    <form @submit.prevent="save">
      <label>
        <h3>Title</h3>
        <input v-focus v-model.trim="editTask.title" type="text" />
      </label>
      <label>
        <h3>Due at</h3>
        <input v-model="editTask.dueAt" type="date" />
      </label>
      <label>
        <h3>Description</h3>
        <input v-model.trim="editTask.description" type="text" />
      </label>
      <label>
        <h3>Category</h3>
        <input v-model.trim="editTask.category" type="text" />
      </label>
        <label class="priorities">
          <h3>Priority</h3>
        <input v-model.trim="editTask.priority" type="radio" name="priority" value="!"><span>! Low</span>
        <input v-model.trim="editTask.priority" type="radio" name="priority" value="!!"><span>!! Medium</span>
        <input v-model.trim="editTask.priority" type="radio" name="priority" value="!!!"><span>!!! High</span>
        </label>
      <span class="action-buttons">
        <button class="button isOutline" type="button" @click="cancel">cancel</button>
        <button class="button" type="submit">save</button>
      </span>
    </form>
  </div>
  <div v-else class="task-list-item" >
    <label class="container">
      <input type="radio" name="radio" @click="$emit('toggleDone', task)" />
      <span class="checkmark"></span>
    </label>
    <span @click="edit"><h3>{{ task.title }}</h3></span>
    <span @click="edit">{{ task.description }}</span>
    <span @click="edit"><h4>{{ task.category }}</h4></span>
    <span @click="edit"><b>{{ task.priority }}</b></span>
    <span @click="edit">{{ task.dueAt }}</span>
    <button class="button-delete" type="button" @click="$emit('deleteTask', task)">
      <img class="delete" src="@/assets/garbage.png" alt="delete">
    </button>
  </div>
</template>

<script>

export default {
  name: 'task-list-item',
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  props: ['task'],
  data: () => ({
    isEditing: false,
    editTask: {}
  }),
  methods: {
    cancel () {
      this.isEditing = false
    },
    edit () {
      this.editTask = Object.assign({}, this.task)
      this.isEditing = true
    },
    save () {
      this.$emit('updateTask', this.editTask)
      this.isEditing = false
    }
  }
}
</script>

<style lang="scss">
.task-list-item {
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr 1fr auto auto;
  grid-gap: 1rem;
  align-items: center;
  margin: 0.5rem 0;
  padding: 0.5rem;
  transition: all 0.4s;
}

.button-delete{
  box-shadow: none;
  background: transparent;
  border: none;
}

.delete{
  width: 20px;
}

.is-editing {
  margin: 1rem 0;
  background: hsl(0, 0%, 99%);
  border-radius: 0.25rem;
  box-shadow: 0px 1px 5px 0px hsl(0, 0%, 84%);
  padding-top: 1rem;
  padding-bottom: 1rem;

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  input {
    background: hsl(0, 0%, 97%);
    border: 1px solid hsl(0, 0%, 93%);
    font-size: 1.1rem;
    padding: 0.4em;
    border-radius: 0.25rem;
  }
/*Radio Buttons*/

 .priorities{
  display: inline-block;
  position: relative;
  height: auto;
  width: 500px;
  padding: 20px;
}

  .action-buttons {
    display: inherit;
    padding: 1.3rem;
    margin-top: 5px;
    height: 50px;
  }

  .button {
    background: hsl(155, 87%, 35%);
    border: 1px solid hsl(155, 87%, 35%);
    border-radius: 0.25rem;
    margin-left: 10px;
    padding: 0.5rem 0.5rem;
    color: hsl(0, 0%, 99%);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
    font-size: 1.1rem;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.25);
    outline: none;
    width: 100px;
    cursor: pointer;

    &:active {
      box-shadow: none;
      background: hsl(165, 90%, 33%);
      border: 1px solid hsl(155, 91%, 38%);
    }

    &.isOutline {
      background: transparent;
      color: hsl(167, 84%, 37%);
      box-shadow: none;
    }
  }
}

.edit-enter,
.edit-leave-to {
  opacity: 0;
  transform: translateY(2em);
}
.edit-leave-active {
  position: absolute;
}

/* The container */
.container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default radio button */
.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
    background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
    background-color: #31d69f;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
    display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
top: 9px;
left: 9px;
width: 8px;
height: 8px;
border-radius: 50%;
background: white;
}
</style>
