<template>
  <div id="menu_list">
    <router-link
      :to="item.path"
      v-for="(item, index) in menuData"
      :key="index"
      >{{ item.title }}</router-link
    >
    <router-link v-if="!userLocalInfo.isLogin" to="/login">登录</router-link>
    <router-link v-else to="/profile"> <img :src="userLocalInfo.user_info.avatar" alt=""> </router-link>
  </div>
</template>
<script>
import { computed, defineComponent, onMounted } from "vue";
import { menuList } from "@/data/MenuList";
export default defineComponent({
  setup() {
    const menuData = computed(() => {
        return menuList.filter(item=> {
          return (item.path!='/login') && (item.path!='/article/:id')
        });
      
    });
    const userLocalInfo = computed(() => {
      let auth_token= localStorage.getItem("auth_token");
      let user_info=JSON.parse(localStorage.getItem('user_info'))
      return {
        isLogin: auth_token&&auth_token.length>0,
        user_info: user_info
      }
    });
    return {
      menuData,
      userLocalInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
#menu_list {
  display: flex;
  height: 3rem;
  justify-content: center;
  align-items: center;
  a {
    color: #f2f2f2;
    margin: 0 1rem;
    padding: 0.3rem;
    font-size: 13px;
    transition: all 0.5s;
    text-decoration: none;
  }
  a:hover {
    background: #222;
    border-radius: 5px;
    color: lightgreen;
  }
}
img {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 0.5rem;
}
</style>