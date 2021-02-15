<template>
  <el-table :data="tableData">
    <el-table-column prop="id" label="id"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="address"></el-table-column>
    <el-table-column prop="date"></el-table-column>
    <el-table-column prop="phone"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="success">编辑</el-button>
        <el-button type="error" @click="removeItem(scope.row.id)">删除</el-button>
        <el-button type="text" @click="moveItem(scope.row.id, 'up')">上移</el-button>
        <el-button type="text" @click="moveItem(scope.row.id, 'down')">下移</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { tableData } from "./mock.js";
export default {
  data() {
    return {
      tableData: tableData,
    };
  },
  methods: {
    removeItem(id) {
      this.tableData.splice(id, 1);
    },
    moveItem(id, direction) {
      const len = this.tableData.length;
      switch (direction) {
        case "up":
          if (id > 0) {
            const item = this.tableData.splice(id, 1)[0];
            this.tableData.splice(id - 1, 0, item);
          }
          break;
        case "down":
          if (id < len - 1) {
            const item = this.tableData.splice(id, 1)[0];
            this.tableData.splice(id + 1, 0, item);
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style>
</style>