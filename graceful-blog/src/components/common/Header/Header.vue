<template>
  <div id="header">
    <el-row type="flex" align="middle">
      <el-col :span="6">
        <Logo></Logo>
      </el-col>
      <el-col :span="18">
        <Menu></Menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Logo from "@/components/common/Logo/Logo";
import Menu from "@/components/common/Menu/Menu";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    Logo,
    Menu,
  },

  setup() {},
});
</script>

<style lang="scss" scoped>
  #header{
    margin: 0;
  }
  .el-row{
    height: 3rem;
    .el-col{
      height: 3rem;
    }
  }
</style>
