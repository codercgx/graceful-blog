<template>
  <div class="container">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <My-Header></My-Header>
      <el-container class="content_wrap">
        <My-SideBar></My-SideBar>
        <el-main>
         <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import Header from "@/components/Header/Header.vue";
import SideBar from "@/components/SideBar/SideBar.vue";

export default defineComponent({
  name: "Index",
  components: {
    "My-Header": Header,
    "My-SideBar": SideBar,
  },
  setup() {
    const test_data = new Array(5).fill({}).map((item) => ({
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    }));
    const tableData = ref(test_data);

    return {
      tableData,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  display: block;
}
.content_wrap {
  display: flex;
}
</style>
