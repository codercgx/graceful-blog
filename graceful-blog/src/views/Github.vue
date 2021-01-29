<template>
  <div id="github">
    <div>{{ my_github_userInfo.name }}</div>
    <div><img :src="my_github_userInfo.avatar_url" alt=""></div>
  </div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
} from "vue";
import { githubUserInfo, githubUserRepos, githubReposDetail } from "@/constant";
export default defineComponent({
  setup() {
    const isShowLocading = ref(true);
    const { ctx } = getCurrentInstance();
    let my_github_userInfo = reactive({
      name: "",
      avatar_url: "",
      created_at: "",
      followers: "",
      followers_url: "",
      public_repos: "",
      updated_at: "",
    });
    onMounted(() => {
      // let timer = setTimeout(() => {
      //   window.open("https://github.com/codercgx?tab=repositories", "_blank");
      //   clearTimeout(timer);
      //   isShowLocading.value=false
      //   timer = null;
      // }, 3000);
      _githubUserInfo();
      _githubUserRepos();
      _githubReposDetail();
    });
    const _githubUserInfo = async () => {
      // ctx.$loading({
      //   text: 'Мгдижа',
      // })
      const result = await githubUserInfo("codercgx");
      Object.keys(my_github_userInfo).forEach(key=>{
        my_github_userInfo[key]=result.data[key]
      })

      console.log(result);
    };
    const _githubUserRepos = async () => {
      const result = await githubUserRepos("codercgx");
      console.log(result);
    };
    const _githubReposDetail = async () => {
      const result = await githubReposDetail("codercgx", "graceful-blog");
      console.log(result);
    };
    return {
      isShowLocading,
      my_github_userInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
#github {
  width: 100%;
  span {
    display: block;
    width: 40%;
    height: 10rem;
    line-height: 10rem;
    margin: 10rem auto;
    text-align: center;
  }
}
</style>
