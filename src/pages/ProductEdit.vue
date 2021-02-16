<template>
  <div>
    <el-card class="box-card" title="新增">
      <div slot="header" class="clearfix">
        <span>编辑</span>
      </div>
      <el-form :model="form" :rules="formRules" ref="form">
        <el-form-item label="日期" :label-width="formLabelWidth" prop="date">
          <el-date-picker v-model="form.date" value-format="yyyy-MM-dd" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" type="tel"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth" prop="date">
          <el-button type="primary" @click="submitForm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { checkPhoneValidator } from "../utils/validator";
import tableData from "./mock";
export default {
  data: function() {
    return {
      formLabelWidth: "120px",
      form: {},
      formRules: {
        date: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字", trigger: "blur" }
        ],
        phone: [
          { required: true, validator: checkPhoneValidator, trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    $route() {
      this.updateFormItem();
    }
  },
  created: function() {
    this.updateFormItem();
  },
  methods: {
    updateFormItem() {
      const id = this.$route.params.id;
      const formItem = tableData.find(x => x.id === id);
      this.form = formItem ? { ...formItem } : {};
    }
  }
};
</script>

<style>
</style>