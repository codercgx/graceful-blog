<template>
  <div>
    <el-card>
      <div>
        <span>请填写相册标签:</span>
        <el-input v-model="current_lable" placeholder="请填写喜欢的标签">
          <template #append>
            <el-button icon="el-icon-edit" @click="addLabel"></el-button>
          </template>
        </el-input>
        <el-tag
          v-for="(item, index) in albumData.label"
          :key="index"
          :type="label_type[Math.ceil(Math.random() * 5)]"
          closable
          @close="handleClose(item)"
          style="margin: 5px 10px;"
        >
          {{ item.name }}</el-tag
        >
      </div>
      <div>
        <span>说点什么么吧:</span>
        <el-input
          type="textarea"
          v-model="albumData.content"
          placeholder="写的什么吧，见证美好的事物"
        ></el-input>
      </div>
      <div>
        <el-upload
          class="upload-album"
          :action="upload_album_url"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-change="handleChange"
          :file-list="fileList"
          list-type="picture"
          :limit="12"
          multiple
          :auto-upload="false"
          :http-request="uploadAlbum"
          :ref="uploadRef"
        >
          <el-button size="small" type="primary">
            <i class="el-icon-upload el-icon--right"></i>点击选择图片</el-button
          >
          <template #tip>
            <div class="el-upload__tip">
              只能上传 jpg/png 文件，且不超过 500kb
              <el-button
                type="success"
                plain
                size="small"
                @click="submitUpload"
                icon="el-icon-upload"
                >上传</el-button
              >
            </div>
          </template>
        </el-upload>
      </div>
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-edit"
        @click="createAlbum"
      >
        发表
      </el-button>
    </el-card>
  </div>
</template>

<script>
import { upload_album_pic_url } from "@/constant";
import { defineComponent, getCurrentInstance, nextTick, onMounted, reactive, ref } from "vue";
import { uploadApi, albumApi } from "@/utils/http/request";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const albumData = reactive({
      label: [],
      content: "",
      files: [],
    });

    const upload_album_url = "/api" + upload_album_pic_url;

    const { ctx }= getCurrentInstance()

    const router=useRouter()

    const upload_headers = {
      "Content-Type": "multipart/form-data",
    };

    const formData = ref("");

    const current_lable = ref("");

    const label_type = ["", "success", "info", "warning", "danger"];

    const addLabel = () => {
      albumData.label.push({
        name: current_lable.value,
      });
      current_lable.value = "";
    };

    const handleClose = (tag) => {
      console.log(tag);
      albumData.label = albumData.label.filter(
        (item) => item.name !== tag.name
      );
    };

    const handlePreview = () => {};
    const handleRemove = () => {};
    const handleSuccess = (file) => {
      console.log(file);
      console.log(fileList.value);
    };
    const handleChange = () => {};
    const fileList = ref([]);
    const upload_ref = ref(null);
    const uploadRef = (dom) => {
      upload_ref.value = dom;
    };

    onMounted(() => {
      nextTick(() => {
        console.log(upload_ref.value);
      });
    });

    const uploadAlbum = (file) => {
      console.log(file);
      formData.value.append("file", file.file);
    };
    const submitUpload = async () => {
      console.log(formData.value);
      formData.value = new FormData();
      console.log(formData.value);
      upload_ref.value.submit();
      formData.value.append("isMultipleUpload", "true");
      let params = formData.value;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const result = await uploadApi.uploadAlbum(params, config);
      albumData.files = result.files.map(item=>({file_url: item.url}));
    };
    const createAlbum = async () => {
      await submitUpload();
      let params = {
        label: albumData.label,
        content: albumData.content,
        files: albumData.files,
      };
      const result = await albumApi.albumAdd(params);
      console.log(result);
       ctx.$message({
        message: '发布成功',
        type: 'success'
      })
      router.push('/article/list')
    };
    return {
      albumData,
      upload_album_url,
      upload_headers,
      handlePreview,
      handleRemove,
      handleSuccess,
      handleChange,
      fileList,
      uploadAlbum,
      submitUpload,
      uploadRef,
      current_lable,
      label_type,
      addLabel,
      handleClose,
      createAlbum,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-input {
  margin: 20px 0;
}
.el-textarea {
  margin: 20px 0;
}
</style>
