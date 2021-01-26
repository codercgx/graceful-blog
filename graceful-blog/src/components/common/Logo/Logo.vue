<template>
  <div id="logocontent">
    <div class="logo_name">
      <i class="meun iconfont icon-caidan"></i>
      <img v-show="route_name !== 'Home'" src="@/assets/images/logo.jpg" alt />
      <p v-show="route_name !== 'Home'">CODERCGX</p>
      <i @click="router.push('/article')" class="search iconfont icon-search"></i>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent, onMounted, watch ,ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
    setup(){
        const router=useRouter()
        const route=useRoute()
        const route_name=ref('')
        watch(()=> route.name,(newVal)=>{
          route_name.value=newVal
        })

        return {
           route_name,
           router
        }
    }
})
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "../../../assets/font/Oh-Chewy-2.ttf";
  src: url("../../../assets/font/Oh-Chewy-2.ttf");
}
#logocontent {
  box-sizing: border-box;
  .logo_name {
    display: flex;
    justify-content: center;
    align-items: center;
    // padding-top: 0.8rem;
    position: relative;
    user-select: none;
    p {
      margin: 0;
      font-size: 1.2rem;
      // margin-bottom: 2.2rem;
      // font-weight: bold;
      color: lightgreen;
      animation: triggerColor 7s infinite alternate;
      font-family: "../../../assets/font/Oh-Chewy-2.ttf";
    }
    img {
      width: 3.5rem;
      height: 3rem;
      vertical-align: middle;
      // margin-top: -2.2rem;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      opacity: .9;
    }
  }
  @media screen and(max-width:992px) {
    .meun,
    .search {
      display: block !important;
    }
  }
  .meun,
  .search {
    position: absolute;
    font-size: 1.5rem;
    cursor: pointer;
    color: white;
    display: none;
    top: 0.4rem;
  }
  .meun {
    left: 2rem;
  }
  .search {
    right: 2rem;
  }
  .meun:hover,
  .search:hover {
    color: rgb(100, 177, 240);
  }
}
</style>