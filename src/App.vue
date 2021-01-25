<template>
  <div id="app">
    <div class="todoapp">
      <header class="header">
        <h1>TodoList</h1>
        <!-- 点击回车，新建一个todo项-->
        <input class="new-todo" @keydown.enter="addTodo" v-model="newTodo" />
      </header>
      <section class="main">
        <ul class="todo-list">
          <li
            class="todo"
            :class="{completed: todo.completed,editing: todo.id === editedTodo.id}"
            v-for="todo in todos"
            :key="todo.id"
          >
            <!-- 1.checkbox选中做完的项 2.双击编辑 3.删除-->
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeItem(todo)"></button>
            </div>
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length">
        <span class="todo-count"></span>
        <button class="clear-completed">clear</button>
      </footer>
    </div>
  </div>
</template>

<script>
let id = 1;
export default {
  data() {
    return {
      todos: [],
      newTodo: "",
      editedTodo: "",
    };
  },
  methods: {
    addTodo() {
      if (!this.newTodo) {
        return;
      }
      this.todos.unshift({
        id: id++,
        title: this.newTodo,
        completed: false,
      });
      this.newTodo = "";
    },
    removeItem(todo) {
      // 找到待删除项index
      const toRemoveIndex = this.todos.findIndex((item) => item.id === todo.id);
      this.todos.splice(toRemoveIndex, 1);
    },
  },
};
</script>

<style>
@import "https://unpkg.com/todomvc-app-css@2.1.0/index.css";
</style>
