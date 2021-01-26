
 <template>
  <section>
    <div class="view">
      <input class="toggle" type="checkbox" @change="updateChecked($event.target.checked)" />
      <label @dblclick="editTodo(todo)">{{ title }}</label>
      <button class="destroy" @click="removeItem(todo)"></button>
    </div>
    <input class="edit" v-model="editingTitle" @keyup.enter="doneEdit(todo)" />
  </section>
</template>
 
 <script>
export default {
  name: "todo-item",
  data() {
    return {
      isEditing: false,
      editingTitle: "",
    };
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateChecked(completed) {
      this.$emit("update:completed", completed);
    },
    editTodo() {
      this.editingTitle = this.title;
      this.isEditing = true;
    },
    doneEdit() {
      if (this.isEditing) {
        this.$emit("update:title", this.editingTitle);
        this.isEditing = false;
      }
    },
    removeTodo() {
      this.$emit("delete");
    },
  },
};
</script>
    
 <style>
@import "https://unpkg.com/todomvc-app-css@2.1.0/index.css";
</style>