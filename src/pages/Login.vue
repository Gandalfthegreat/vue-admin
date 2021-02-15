<template></template>

<script>
import { setGlobalData } from "../utils/globalData";
export default {
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (vaild) {
          setGlobalData("username", this.form.username);
          this.$router.push({ name: "Home" });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>