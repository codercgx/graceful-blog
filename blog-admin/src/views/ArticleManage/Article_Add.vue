<template>
  <div class="artilce_add">
    <h2><i class="el-icon-edit-outline"></i> 文章内容编辑与发表</h2>
    <el-form :model="articleData">
      <el-form-item label="文章标题">
        <el-input
          v-model="articleData.title"
          placeholder="请输入文章标题"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
          class="upload-cover"
          :action="article_pic_url"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <img
            v-if="!!id"
            :src="articleData.cover_src"
            alt=""
            style="width: 120px; height: 120px; margin-left: 50px;"
          />
          <template #tip>
            <div class="el-upload__tip">
              只能上传 jpg/png 文件，且不超过 500kb
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章简介">
        <el-input
          v-model="articleData.introduction"
          placeholder="请输入文章简介"
          type="textarea"
        ></el-input>
      </el-form-item>
      <p>文章内容</p>
      <el-form-item>
        <el-card style="width: 100%;">
          <My-Editor
            @onClick="onClick"
            @input="onInput"
            ref="editor"
            :value="articleData.content"
            :disabled="false"
          ></My-Editor>
        </el-card>
      </el-form-item>
      <el-form-item label="分组标签">
        <el-input
          v-model="current_lable"
          placeholder="请输入喜欢的分组标签"
          style="width: 60%;"
        >
          <template #append>
            <el-button icon="el-icon-edit" @click="addLabel"></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-tag
          v-for="(item, index) in articleData.label"
          :key="index"
          :type="label_type[Math.ceil(Math.random() * 5)]"
          closable
          @close="handleClose(item)"
          style="margin: 5px 10px;"
        >
          {{ item.name }}</el-tag
        >
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="!id"
          type="primary"
          icon="el-icon-position"
          @click="publishArticle"
          >发布</el-button
        >
        <el-button
          v-if="id && id.length > 0"
          type="primary"
          icon="el-icon-edit"
          @click="publishArticle"
          >编辑</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import Tinymce from "@/components/Tinymce/Tinymce.vue";
import { upload_article_pic_url } from "@/constant";
import { articleApi } from "@/utils/http/request";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Article_Add",
  props: {
    id: {
      type: String,
    },
  },
  components: {
    "My-Editor": Tinymce,
  },
  setup(props) {
    const articleData = reactive({
      title: "",
      introduction: "",
      content: "",
      cover_src: "",
      label: [],
    });
    const article_pic_url = "/api/" + upload_article_pic_url;
    const label_type = ["", "success", "info", "warning", "danger"];
    const upload_headers = {
      "Content-Type": "multipart/form-data",
    };
    const current_lable = ref("");
    const fileList = ref([]);

    const router = useRouter();

    const { ctx } = getCurrentInstance();

    const onClick = (e, tinymce) => {
      console.log(e, tinymce);
    };
    const onInput = (val) => {
      // console.log(val);
      articleData.content = val;
    };
    const handleRemove = (file, fileList) => {
      console.log(file, fileList);
    };
    const handlePreview = (file) => {
      console.log(file);
    };
    const handleSuccess = (file) => {
      console.log(file);
      fileList.value.push({
        name: file.data.file.originalname,
        url: file.data.file.url,
      });
      articleData.cover_src = file.data.file.url;
    };
    const addLabel = () => {
      articleData.label=articleData.label.map(item=>({ name: item.name }))
      articleData.label.push({
        name: current_lable.value,
      });
      current_lable.value = "";
    };
    const handleClose = (tag) => {
      console.log(tag);
      articleData.label = articleData.label.filter(
        (item) => item.name !== tag.name
      );
    };
    const publishArticle = () => {
      console.log(articleData);
      let params = articleData;
      if (!props.id) {
        articleApi.articleAdd(params).then(
          (res) => {
            console.log(res);
            ctx.$message({
              message: "发表文章成功",
              type: "success",
            });
            router.push("/article/list");
          },
          (err) => {}
        );
      } else if (props.id && props.id.length > 0) {
        articleApi.articleEdit(props.id, params).then(
          (res) => {
            console.log(res);
            ctx.$message({
              type: 'success',
              message: res.message
            })
            router.push('/article/list')
          },
          (err) => {
            console.log(err);
          }
        );
      }
    };

    const articleDetail = async () => {
      const result = await articleApi.articleDetail(props.id);
      console.log(result);
      articleData.title = result.article.title;
      articleData.introduction = result.article.introduction;
      articleData.content = result.article.content;
      articleData.cover_src = result.article.cover_src;
      articleData.label = result.article.label;
      ctx.$message({
        type: "success",
        message: result.message,
      });
    };

    onMounted(() => {
      props.id && articleDetail();
    });
    return {
      articleData,
      article_pic_url,
      upload_headers,
      current_lable,
      label_type,
      fileList,
      onClick,
      onInput,
      handleRemove,
      handlePreview,
      handleSuccess,
      addLabel,
      handleClose,
      publishArticle,
    };
  },
});
</script>

<style lang="scss" scoped>
.article_bg_pic {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
}
</style>
