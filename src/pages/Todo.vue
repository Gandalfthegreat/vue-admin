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
            v-for="todo in computedTodos"
            :key="todo.id"
          >
            <!-- 1.checkbox选中做完的项 2.双击编辑 3.删除-->
            <todo-item
              :title.sync="todo.title"
              :completed.sync="todo.completed"
              @delete="removeItem(todo)"
            ></todo-item>
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length">
        <span
          class="todo-count"
        >{{ remaining }} {{ remaining | pluralize }} / {{ todos.length }} {{ remaining | total }}</span>
        <ul class="filters">
          <li>
            <router-link :to="{query: {state: ''}}" active-class="selected" exact>All</router-link>
          </li>
          <li>
            <router-link :to="{query: {state: 'active'}}" active-class="selected" exact>Active</router-link>
          </li>
          <li>
            <router-link :to="{query: {state: 'completed'}}" active-class="selected" exact>Completed</router-link>
          </li>
        </ul>
        <button class="clear-completed" @click="removeCompleted">clear</button>
      </footer>
    </div>
  </div>
</template>

<script>
let id = 1;
import TodoItem from "../components/TodoItem";

export default {
  data() {
    return {
      todos: [],
      newTodo: "",
      editedTodo: {}
    };
  },
  components: {
    "todo-item": TodoItem
  },
  computed: {
    remaining() {
      return this.todos.filter(x => !x.completed).length;
    },
    computedTodos() {
      const state = this.$route.query.state;

      return this.todos
        .filter(x => {
          if (state === "active") {
            return !x.completed;
          } else if (state === "completed") {
            return x.completed;
          } else {
            return true;
          }
        })
        .filter(item => {
          return item.title.indexOf(this.newTodo) !== -1;
        });
    }
  },
  filters: {
    pluralize(num) {
      return num > 1 ? "items" : "item";
    },
    total(num) {
      return num > 3 ? "total" : "";
    }
  },
  methods: {
    addTodo() {
      if (!this.newTodo) {
        return;
      }
      this.todos.unshift({
        id: id++,
        title: this.newTodo,
        completed: false
      });
      this.newTodo = "";
    },
    removeItem(todo) {
      const toRemoveIndex = this.todos.findIndex(item => item.id === todo.id);
      this.todos.splice(toRemoveIndex, 1);
    },
    removeCompleted() {
      this.todos = this.todos.filter(x => !x.completed);
    }
  }
};
</script>

<style scoped>
</style>
