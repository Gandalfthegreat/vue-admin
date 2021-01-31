
 <template>
  <section :class="{editing: isEditing}">
    <div class="view">
      <input class="toggle" type="checkbox" @change="updateChecked($event)" />
      <label @dblclick="editTodo">{{ title }}</label>
      <button class="destroy" @click="removeItem()"></button>
    </div>
    <input class="edit" v-model="editingTitle" @keyup.enter="doneEdit(todo)" />
  </section>
</template>
 
 <script>
export default {
  name: "todo-item",
  data() {
    return {
      editingTitle: "",
      isEditing: false,
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
    updateChecked(event) {
      console.log(event);
      this.$emit("update:completed", event.target.checked);
    },
    editTodo() {
      console.log(this);
      this.editingTitle = this.title;
      this.isEditing = true;
    },
    doneEdit() {
      // 把新标题的更改生效
      if (this.isEditing) {
        this.$emit("update:title", this.editingTitle);
        this.isEditing = false;
      }
    },

    removeItem() {},
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