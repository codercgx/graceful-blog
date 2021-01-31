<template>
  <div id="Article">
    <div class="article_wrap">
      <el-card v-for="(item, index) in articleList">
        <div class="card_item">
          <div class="article_cover"><img :src="item.cover_src" alt="" /></div>
          <div class="article_info">
            <div class="article_title" @click="previewArticle(item._id)">{{ item.title }}</div>
            <div class="article_introduction">{{ item.introduction }}</div>
            <div class="article_desc">
              <i class="el-icon-view"></i>
              <span>{{ item.visited }}</span>
              <i :class="String(item.upvote_users).includes(user_id) ? 'el-icon-star-on' : 'el-icon-star-off' " @click="upvoteArticle(item._id)"></i>
              <span>{{ item.upvote_users.length }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from "vue";
import { articleApi } from "@/utils/http/request";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    let articleList = ref([]);
    const { ctx } = getCurrentInstance();
    const router=useRouter()
    onMounted(() => {
      ctx.$message({
        message: "数据加载完成",
        type: "success",
      });
      getArticleList();
    });
    const user_id = JSON.parse(localStorage.getItem("user_info"))._id;
    const getArticleList = async () => {
      let result = await articleApi.getArticleList();
      console.log(result);

      articleList.value = result.articles;
    };
    const upvoteArticle = async (id) => {
      let params = {
        id,
        user_id,
      };
      const result = await articleApi.upvoteArticle(params);
      getArticleList();
      console.log(result);
    };
    const visitsArticle = async (id) => {
      const result = await articleApi.visitsArticle(id);
      getArticleList();
      console.log(result);
    };
    const previewArticle=(id)=>{
      router.push(`/article/${id}`)
    }
    return {
      articleList,
      upvoteArticle,
      visitsArticle,
      user_id,
      previewArticle
    };
  },
});
</script>

<style lang="scss" scoped>
#Article {
  padding: 0 150px;
  .article_wrap {
    :deep() .el-card {
      margin: 20px 0;
      &:hover {
        // cursor: pointer;
        transform: scale(0.95);
      }
    }
    .card_item {
      display: flex;
      .article_cover {
        img {
          width: 160px;
          height: 160px;
          border-radius: 10px;
        }
      }
      .article_info {
        margin-left: 80px;
        .article_title {
          margin-bottom: 20px;
          &:hover{
            cursor: pointer;
          }
        }
        .article_introduction {
          margin-bottom: 20px;
        }
        .article_desc {
          color: #999;
          i {
            cursor: pointer;
          }
          .el-icon-star-on{
            color: orange;
            font-size: 16px;
          }
          span {
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>
