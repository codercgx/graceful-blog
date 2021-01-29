<template>
  <div id="github">
    <div class="github_wrap">
      <el-card @click="previewUser(my_github_userInfo.name)">
        <div>Github基本信息</div>
        <div>
          <span>github用户名: </span><span>{{ my_github_userInfo.name }}</span>
        </div>
        <div><img :src="my_github_userInfo.avatar_url" alt="" /></div>
        <div>
          <span>注册时间:</span>
          <span>{{ my_github_userInfo.created_at }}</span>
        </div>
        <div>
          <span>跟随者: </span><span>{{ my_github_userInfo.followers }}</span>
        </div>
        <div>
          <span>仓库总量: </span
          ><span>{{ my_github_userInfo.public_repos }}</span>
        </div>
        <div>
          <span>最新更新: </span
          ><span>{{ my_github_userInfo.updated_at }}</span>
        </div>
      </el-card>

      <el-card
        v-for="(item, index) in reposList"
        :key="index"
        @click="previewDetail(item)"
      >
        <div class="repos_item">
          <div class="repos_name">
            <span>仓库名称: </span> <span> {{ item.name }}</span>
          </div>
          <div class="repos_description">
            <span>仓库描述: </span> <span>{{ item.description }}</span>
          </div>
          <div class="repos_language">
            <span>语言: </span> <span>{{ item.language }}</span>
          </div>
          <div class="repos_pushed_at">
            <span>发布时间: </span> <span>{{ item.created_at }}</span>
          </div>
          <div class="repos_updated_at">
            <span>最近更新: </span> <span>{{ item.updated_at }}</span>
          </div>
        </div>
      </el-card>
    </div>
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
    const reposList = ref([]);
    const previewDetail = (item) => {
      window.open(item.svn_url, "_blank");
    };
    const previewUser=(username)=>{
        window.open(`https://github.com/${username}?tab=repositories`, "_blank");
        isShowLocading.value=false
   
    }
    onMounted(() => {
     
      _githubUserInfo();
      _githubUserRepos();
      _githubReposDetail();
    });
    const _githubUserInfo = async () => {
      // ctx.$loading({
      //   text: '������',
      // })
      const result = await githubUserInfo("codercgx");
      Object.keys(my_github_userInfo).forEach((key) => {
        my_github_userInfo[key] = result.data[key];
      });

      console.log(result);
    };
    const _githubUserRepos = async () => {
      const result = await githubUserRepos("codercgx");
      console.log(result);
      reposList.value = result.data;
    };
    const _githubReposDetail = async () => {
      const result = await githubReposDetail("codercgx", "graceful-blog");
      console.log(result);
    };
    return {
      isShowLocading,
      my_github_userInfo,
      reposList,
      previewDetail,
      previewUser
    };
  },
});
</script>

<style lang="scss" scoped>
#github {
  .github_wrap {
    padding: 0 150px;
    :deep().el-card {
      margin: 10px 0;
      border-radius: 10px;
      &:hover {
        cursor: pointer;
        transform: scale(0.95);
      }
    }
    .repos_item {
      span {
        margin: 0 10px 0 0;
      }
    }
  }
}
</style>
