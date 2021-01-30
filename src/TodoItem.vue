<template>
  <section :class="{editing:isEditing}">
    <div class="view">
      <input class="toggle" type="checkbox" @change="updateComplete($event.target.checked)" />
      <label @dblclick="editTodo">{{ title }}</label>
      <button class="destroy" @click="removeItem"></button>
    </div>
    <input class="edit" type="text" v-model="editingTitle" @keyup.enter="doneEdit()" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      isEditing: true,
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
    updateComplete(completed) {
      this.$emit("update: completed", completed);
    },
    editTodo() {
      this.isEditing = "";
      this.editingTitle = this.title;
    },
    doneEdit() {
      if (this.isEditing) {
        this.$emit("update:title", this.editingTitle);
        this.isEditing = false;
      }
    },
    removeItem() {
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