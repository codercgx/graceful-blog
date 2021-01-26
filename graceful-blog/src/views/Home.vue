<template>
  <div class="home">
    <div class="bg"></div>
    <div class="home_nav">
      <div class="navgation">
        <i v-for="(item, index) in navgation" :key="index" :class="item.icon" @click="navgationTo(item.path)">{{
          item.name
        }}</i>
      </div>
      <div class="contact_method">
        <i class="iconfont icon-weixin"> :vip_codercgx</i>
        <i class="iconfont icon-qq"> : 897137683</i>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const navgation = ref([
      { name: " Login", icon: "iconfont icon-touxiang", path: "/login" },
      {
        name: " Article-List",
        icon: "iconfont icon-wenzhang",
        path: "/article",
      },
      { name: " Demo", icon: "iconfont icon-anli", path: "/demo" },
      {
        name: " LeaveMessage",
        icon: "iconfont icon-liuyan2",
        path: "/messageboard",
      },
      { name: " Photos", icon: "iconfont icon-xiangce", path: "/photos" },
      { name: " Github", icon: "iconfont icon-GitHub", path: "/github" },
    ]);
    const router=useRouter()
    const navgationTo=(path)=>{
      router.push(path)
    }
    return {
      navgation,
      navgationTo
    };
  },
});
</script>

<style lang="scss" scoped>
@import url('../assets/css/trigger.css');
.home {
  width: 100%;
  height: 100vh;
  position: relative;
  .home_nav {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .navgation,
    .contact_method {
      letter-spacing: 0.1rem;
      margin: 1rem 1rem;
      i {
        cursor: pointer;
        margin: 0.3rem;
        font-size: 0.9rem;
        transition: all 0.6s;
        color: #fff;
        margin-right: 0.5rem;
        &:hover {
          color: rgb(66, 245, 135);
          opacity: 0.8;
        }
      }
    }
  }
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("../assets/images/maskeBG.jpg") no-repeat center;
    background-size: cover;
    // z-index: -99;
  }
  .bg::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(3px);
    opacity: 0.7;
  }
  @keyframes opcity {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
  @media screen and (max-width: 987px) {
    .bg {
      animation: opcity 0.5s linear;
      background: rgb(34, 34, 34);
    }
  }
}
</style>
