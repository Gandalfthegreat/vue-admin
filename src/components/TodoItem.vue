
 <template>
  <section :class="{editing: isEditing}">
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
.todo-list li .editing .view {
  display: none;
}
.todo-list li .editing .edit {
  display: block;
  width: 506px;
  padding: 12px 16px;
  margin: 0 0 0 43px;
}
</style>