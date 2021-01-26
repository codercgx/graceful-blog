<template>
  <div class="container">
    <div v-if="isLight" class="light"></div>
    <div v-else class="night"></div>
    <!-- <Light @changeBackground="changeBG"></Light> -->
    <Header class="header" :class="{active: isActive}" v-show="isActive"></Header>
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Login">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import Header from "@/components/common/Header/Header";
import Light from "@/components/common/highlight/light";

import { computed, defineComponent, onUpdated, watch, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex";

import { CHANGE_BG } from "@/store/actionTypes";

export default defineComponent({
  components: {
    Light,
    Header,
  },
  setup() {
    const store = useStore();
    const router=useRouter()
    const route=useRoute()
    const isActive=ref(false)
    const isLight = computed(() => {
      return store.state.isLight;
    });

    const changeBG = () => {
      store.commit(CHANGE_BG, !store.state.isLight);
    };

    watch(()=> route.name,(newVal)=>{
      console.log(newVal);
      isActive.value= newVal!=='Home'
    })

    return {
      isLight,
      changeBG,
      isActive
    };
  },
});
</script>

<style lang="scss" scoped>
* {
  list-style: none;
}
body,
html {
  width: 100%;
  height: 100%;
}
.container {
  .light,
  .night {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .night {
    background: linear-gradient(#111, purple);
    background: url("../assets/images/night.gif") center;
  }
  .light {
    background: url("../assets/images/light.jpg") center;
  }
  .router_content {
    animation: animate 2s;
    min-height: 800px;
  }
  .header {
    width: 100%;
    height: 3rem;
    position: absolute;
    top: 0;
    z-index: 999;
    transition: all 0.6s;
  }
  .active,
  .current {
    position: sticky;
    background: #555;
    animation: animate 1s;
  }
  @keyframes animate {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
.adminCssStyle {
  background: #fff !important;
}
</style>
