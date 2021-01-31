<template>
  <div id="app">
    <div class="todoapp">
      <header class="header">
        <h1>TodoList</h1>
        <!-- 点击回车，新建一个todo项-->
        <input class="new-todo" @keydown.enter="addTodo" v-model="newTodo" v-autofocus />
      </header>
      <section class="main">
        <ul class="todo-list">
          <li
            class="todo"
            :class="{completed: todo.completed}"
            v-for="todo in todos"
            :key="todo.id"
          >
            <todo-item
              :title="todo.title"
              @update:title="todo.title = $event"
              :completed="todo.completed"
              @update:completed="todo.completed = $event"
            ></todo-item>
            <!-- 1.checkbox选中做完的项 2.双击编辑 3.删除-->
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length">
        <span class="todo-count">{{remaining }} {{remaining | pluralize}}</span>
        <button class="clear-completed">clear</button>
      </footer>
    </div>
  </div>
</template>

<script>
let id = 1;
import TodoItem from "./components/TodoItem.vue";
export default {
  components: {
    "todo-item": TodoItem,
  },
  data() {
    return {
      todos: [],
      newTodo: "",
      editedTodo: {},
    };
  },
  directives: {
    autofocus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  computed: {
    remaining() {
      return this.todos.filter((x) => !x.completed).length;
    },
  },
  filters: {
    pluralize(num) {
      console.log(this);
      return num > 1 ? "items" : "item";
    },
  },
  methods: {
    editTodo(todo) {
      this.editedTodo = { ...todo };
    },
    doneEdit(todo) {
      //在todos中找到todo这项，替换；其他的项保持不动
      this.todos = this.todos.map((x) => {
        return x.id === todo.id ? { ...todo } : { ...x };
      });
      this.editedTodo = {};
    },
    addTodo() {
      if (!this.newTodo) {
        console.log(new Error("不能输入空的item"));
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


