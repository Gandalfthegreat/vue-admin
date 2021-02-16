<template>
  <div>
    <el-button v-if="!showDeleteCheckbox" @click="showDeleteCheckbox = true;" type="danger">删除</el-button>
    <el-button v-if="!showDeleteCheckbox" type="primary" @click="updateTableItem()">新增</el-button>
    <el-button
      v-if="showDeleteCheckbox"
      @click="deleteTableItem(chosenItem); showDeleteCheckbox = fase; chosenItem =[];"
      type="danger"
    >确认删除</el-button>
    <el-button v-if="showDeleteCheckbox" @click="showDeleteCheckbox = false;">取消</el-button>
    <el-table
      :data="tableData"
      style="border: 1px solid #ebebeb;border-radius: 3px;margin-top: 10px;"
      stripe
    >
      <el-table-column prop="id" label="id" :width="labelWidth">
        <template slot-scope="scope">
          <el-checkbox
            v-if="showDeleteCheckbox"
            :checked="chosenItem.indexOf(scope.row.id) > -1"
            @change="toggleChosenItem(scope.row.id)"
            style="margin-right: 5px;"
          ></el-checkbox>
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" :width="labelWidth"></el-table-column>
      <el-table-column prop="address" :width="labelWidth"></el-table-column>
      <el-table-column prop="date" :width="labelWidth"></el-table-column>
      <el-table-column prop="phone" :width="labelWidth"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="updateTableItem(scope.row.id)">编辑</el-button>
          <el-button type="warning" @click="deleteTableItem([scope.row.id])">删除</el-button>
          <el-button type="text" @click="moveItem(scope.row.id, 'up')">上移</el-button>
          <el-button type="text" @click="moveItem(scope.row.id, 'down')">下移</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { tableData } from "./mock.js";
export default {
  data() {
    return {
      tableData: tableData,
      labelWidth: "200",
      showDeleteCheckbox: false,
      dialogFormVisible: false,
      chosenItem: []
    };
  },
  methods: {
    deleteTableItem(idArray) {
      this.tableData = this.tableData.filter(x => idArray.indexOf(x.id) === -1);
    },
    updateTableItem(id) {
      this.$router.push({ name: "ProductEdit", params: { id } });
    },
    toggleChosenItem(id) {
      const index = this.chosenItem.findIndex(x => x.id === id);
      if (this.chosenItem.includes(index)) {
        this.chosenItem.splice(index, 1);
      } else {
        this.chosenItem.push(id);
      }
    },
    moveItem(id, direction) {
      const len = this.tableData.length;
      const index = this.tableData.findIndex(x => x.id === id);
      switch (direction) {
        case "up":
          if (index > 0) {
            const item = this.tableData.splice(index, 1)[0];
            this.tableData.splice(index - 1, 0, item);
          }
          break;
        case "down":
          if (index < len - 1) {
            const item = this.tableData.splice(index, 1)[0];
            this.tableData.splice(index + 1, 0, item);
          }
          break;
      }
    }
  }
};
</script>

<style>
</style>