<template>
  <div id="app">
    <div class="todoapp">
      <header class="header">
        <h1>TodoList</h1>
        <!-- 点击回车，新建一个todo项-->
        <input class="new-todo" @keydown.enter="addTodo" v-model="newTodo" v-autofocus />
        <a href="#clear-completed">CLick</a>
      </header>
      <section class="main">
        <ul class="todo-list">
          <li
            class="todo"
            :class="{completed: todo.completed}"
            v-for="todo in computedTodo"
            :key="todo.id"
          >
            <todo-item
              :title="todo.title"
              @update:title="todo.title = $event"
              :completed="todo.completed"
              @update:completed="todo.completed = $event"
              @delete="removeItem(todo)"
            ></todo-item>
            <!-- 1.checkbox选中做完的项 2.双击编辑 3.删除-->
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length">
        <span class="todo-count">{{remaining }} {{remaining | pluralize}}</span>
        <ul class="filters">
          <li>
            <router-link :to="{query: {state: 'active'}}" active-class="selected" exact>Active</router-link>
          </li>
          <li>
            <router-link :to="{query: {state: 'completed'}}" active-class="selected" exact>Completed</router-link>
          </li>
          <li>
            <router-link :to="{query: {state: ''}}" active-class="selected" exact>All</router-link>
          </li>
        </ul>
        <button class="clear-completed">clear</button>
      </footer>
    </div>
  </div>
</template>

<script>
let id = 1;
import TodoItem from "../components/TodoItem.vue";
export default {
  components: {
    "todo-item": TodoItem,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
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
    size() {
      return this.todos.length;
    },
    computedTodo() {
      const state = this.$route.query.state;
      return this.todos
        .filter((x) => {
          if (state === "active") {
            return !x.completed;
          } else if (state === "completed") {
            return x.completed;
          } else return true;
        })
        .filter((item) => {
          return item.title.indexOf(this.newTodo) !== -1;
        });
    },
  },
  filters: {
    pluralize(num) {
      return num > 1 ? "items" : "item";
    },
    total(length) {
      return length > 3 ? "total" : "";
    },
  },
  methods: {
    greaterThan3() {
      return this.todos.length > 3;
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
  watch: {
    todos(newTodos) {
      localStorage.setItem("todos", JSON.stringify(newTodos));
    },
  },
};
</script>

<style>
@import "https://unpkg.com/todomvc-app-css@2.1.0/index.css";
</style>


