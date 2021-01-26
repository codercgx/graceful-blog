<template>
  <div class="side_bar">
    <el-aside width="200px" style="background-color: rgb(179, 192, 209)">
      <el-menu :default-openeds="['2']" router>
        <el-submenu index="1">
          <template #title><i class="el-icon-monitor"></i>工作台</template>
          <el-menu-item index="/home">待办事项</el-menu-item>
          <el-menu-item index="/home">工作总结</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template #title><i class="el-icon-message"></i>文章管理</template>
          <el-menu-item :index="'/article/add'">新增文章</el-menu-item>
          <el-menu-item :index="'/article/list'">文章列表</el-menu-item>
        </el-submenu>
         <el-submenu index="3">
          <template #title><i class="el-icon-upload"></i>云管理</template>
          <el-menu-item :index="'/upload/album'">云相册上传</el-menu-item>
          <el-menu-item :index="'/upload/demo'">Demo上传</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-aside {
  color: #333;
}
</style>
