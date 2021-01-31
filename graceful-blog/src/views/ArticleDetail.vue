<template>
  <div class="article_detail">
    <div class="wrap">
      <div class="go_back" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <el-card v-if="articleData.title">
        <h3>{{ articleData.title }}</h3>
        <h5>{{ articleData.introduction }}</h5>
        <div class="article_desc">
          <span>发布时间: </span> <span>{{ articleData.create_time }}</span>
          <i class="el-icon-view"></i><span>{{ articleData.visited }}</span>
          <i class="el-icon-star-off"></i
          ><span>{{ articleData.upvote_users.length }}</span>
        </div>
        <div class="article_label">
          <span>标签: </span
          ><el-tag
            v-for="(item, index) in articleData.label"
            :key="index"
            :type="labelTypes[Math.ceil(Math.random() * labelTypes.length)]"
            >{{ item.name }}</el-tag
          >
        </div>

        <div class="article_card">
          <el-card>
            <div class="article_content">
              <p v-html="articleData.content"></p>
            </div>
          </el-card>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { articleApi } from "@/utils/http/request";
export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { ctx } = getCurrentInstance();
    const labelTypes = ref(["", "success", "info", "warning", "danger"]);
    let articleData = reactive({});
    onMounted(() => {
      getArticleDetail();
    });
    const getArticleDetail = async () => {
      const id = route.params.id;
      await articleApi.visitsArticle(id);
      const result = await articleApi.getArticleDetail(id);
      ctx.$message({
        message: result.message,
        type: "success",
      });
      let article = result.article;
      Object.keys(article).forEach((key) => (articleData[key] = article[key]));
    };
    const defindComputed = computed(() => {
      let label_value = labelTypes.value;
      return label_value[Math.ceil(Math.random() * label_value.length)];
    });
    const goBack = () => {
      router.push("/article");
    };
    return {
      articleData,
      labelTypes,
      defindComputed,
      goBack,
    };
  },
});
</script>

<style lang="scss" scoped>
.article_detail {
  .wrap {
    .go_back {
      position: absolute;
      top: 100px;
      left: 185px;
      background-color: #eee;
      > i {
        font-size: 30px;
        color: orange;
        &:hover {
          cursor: pointer;
        }
      }
    }
    :deep() .el-card {
      padding: 0 150px;
    }
    h3 {
      text-align: center;
    }
    h5 {
      text-align: center;
    }

    .article_desc {
      text-align: center;
      margin-bottom: 10px;
      color: #999;
      > span {
        margin-right: 10px;
      }
      i {
        margin-right: 5px;
      }
    }
    .article_label {
      text-align: center;
      > span {
        margin-right: 5px;
      }
      .el-tag {
        margin-right: 10px;
      }
    }
    .article_card {
      margin-top: 20px;
    }
  }
}
</style>
