<template>
  <div>
    <el-upload
      class="upload-album"
      :action="upload_demo_url"
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

      <!-- <img
        v-if="!!id"
        :src="articleData.cover_src"
        alt=""
        style="width: 120px; height: 120px; margin-left: 50px;"
      /> -->
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
</template>

<script>
import { upload_demo_pic_url } from "@/constant";
import { defineComponent, nextTick, onMounted, ref } from "vue";
import { uploadApi } from "@/utils/http/request";
export default defineComponent({
  setup() {
    const upload_demo_url = "/api/" + upload_demo_pic_url;

    const upload_headers = {
      "Content-Type": "multipart/form-data",
    };

    const formData = ref("");

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
    const submitUpload = () => {
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

      uploadApi.uploadAlbum(params, config).then(
        (res) => {
          console.log(res);
        },
        (err) => {}
      );
    };
    return {
      upload_demo_url,
      upload_headers,
      handlePreview,
      handleRemove,
      handleSuccess,
      handleChange,
      fileList,
      uploadAlbum,
      submitUpload,
      uploadRef,
    };
  },
});
</script>

<style lang="scss" scoped></style>
