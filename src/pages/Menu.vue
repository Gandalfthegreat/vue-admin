<template>
  <div>
    <el-menu
      :default-openeds="['0','1']"
      :collapse="isMenuCollapse"
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd40b"
    >
      <template v-for="menu in menus">
        <el-submenu
          v-if="menu.subMenus && menu.subMenus.length"
          :index="menu.index"
          :key="menu.index"
        >
          <template slot="title">
            <i class="menu.icon"></i>
            <span slot="title">{{menu.text}}</span>
          </template>
          <el-menu-item-group>
            <router-link
              tag="div"
              v-for="subMenu in menu.subMenus"
              :key="subMenu.index"
              :to="{name: subMenu.routerName}"
            ></router-link>
            <el-menu-item :index="subMenu.index">{{subMenu.text}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <router-link
          v-else
          :index="menu.index"
          :key="menu.index"
          tag="div"
          :to="{name: menu.routerName}"
        >
          <el-menu-item>
            <i class="menu.icon"></i>
            <span slot="title">{{menu.text}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-menu>
    <el-table
      stripe
      :data="tableData"
      style="border: 1px solid #ebebeb;border-radius: 3px;margin-top: 10px;"
    >
      <!-- prop 传绑定 tableData 的数据 id，表头名称 id，同时设了下宽度 -->
      <el-table-column prop="id" label="id" width="100"></el-table-column>
      <!-- prop 传绑定 tableData 的数据 date，表头名称日期 -->
      <el-table-column prop="date" label="日期" width="200"></el-table-column>
      <!-- prop 传绑定 tableData 的数据 name，表头名称姓名 -->
      <el-table-column prop="name" label="姓名" width="200"></el-table-column>
      <!-- prop 传绑定 tableData 的数据 phone，表头名称电话 -->
      <el-table-column prop="phone" label="电话" width="200"></el-table-column>
      <!-- prop 传绑定 tableData 的数据 address，表头名称地址 -->
      <el-table-column prop="address" label="地址"></el-table-column>
      <!-- 该列固定在右侧，表头名称操作 -->
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <!-- 添加了个删除按钮，绑定了前面定义的删除事件 deleteTableItem，传入参数 id -->
          <el-button @click="deleteTableItem(scope.row.id)" type="danger" size="small">删除</el-button>
          <!-- 分别添加了上移和下移按钮，绑定了前面定义的移动事件 moveTableItem，传入参数 id 和移动方向 -->
          <el-button @click="moveTableItem(scope.row.id, 'up')" size="small">上移</el-button>
          <el-button @click="moveTableItem(scope.row.id, 'down')" size="small">下移</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="dialogFormVisible= true; form ={}">新增</el-button>

    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker v-model="form.date" value-format="yyyy-MM-dd" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" type="tel"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;
        addTableItem(form)"></el-button>
      </div>
    </el-dialog>
  </div>
  <!-- data 里绑定表格数据，同时这里调整了下样式 -->
</template>

<script>
const menus = [
  {
    text: "服务管理",
    icon: "el-icon-setting",
    subMenus: [{ text: "服务信息", routerName: "Service" }]
  },
  {
    text: "产品管理",
    icon: "el-icon-menu",
    subMenus: [
      { text: "产品信息", routerName: "ProductList" },
      { text: "新增", routerName: "ProductAdd" }
    ]
  },
  {
    text: "日志信息",
    icon: "el-icon-message",
    routerName: ""
  }
].map((x, i) => {
  return {
    ...x,
    subMenus: (x.subMenus || []).map((y, j) => {
      return { ...y, index: `${i}-${j}` };
    }),
    index: `${i}`
  };
});
export default {
  data() {
    return {
      menus: menus,
      tableData: tableData,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      activeIndex: ""
    };
  },
  methods: {
    updateTableItem(id = 0) {
      if (id !== 0) {
        this.router.push({ name: "ProductEdit", params: { id } });
      } else {
        this.router.push({ name: "ProductAdd" });
      }
    },
    addTableItem(item = {}) {
      this.tableData.push({ ...item, id: this.tableData.length + 1 });
    },
    deleteTableItem(id) {
      const index = this.tableData.findIndex(x => x.id === id);
      this.tableData.splice(index, 1);
    },
    moveTableItem(id, direction) {
      const dataLength = this.tableData.length;
      const index = this.tableData.findIndex(x => x.id === id);
      switch (direction) {
        case "up":
          if (index > 0) {
            const item = this.tableData.splice(index, 1)[0];
            console.log("item: ", item);
            this.tableData.splice(index - 1, 0, item);
          }
          break;
        case "down":
          if (index < dataLength - 1) {
            const item = this.tableData.splice(index, 1)[0];
            this.tableData.splice(index + 1, 0, item);
          }
          breal;
      }
    }
  },
  watch: {
    $route(to) {
      let activeIndex;
      this.menus.forEach(x => {
        if (x.routerName === to.name) {
          activeIndex === x.index;
        } else {
          const subMenuItem = x.subMenus.find(y.routerName === to.name);
          if (subMenuItem) {
            activeIndex = subMenuItem.index;
          }
        }
      });
      if (activeIndex) {
        this.activeIndex = activeIndex;
      }
    }
  }
};
</script>

<style>
</style>