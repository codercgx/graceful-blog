<template>
  <div>
    <el-card>
      <div>
        <div>
          <span>请填写Demo标题:</span>
          <el-input v-model="demoData.title" placeholder=""></el-input>
        </div>
        <div>
          <span>请填写标签:</span>
          <el-input v-model="current_lable" placeholder="请填写喜欢的标签">
            <template #append>
              <el-button icon="el-icon-edit" @click="addLabel"></el-button>
            </template>
          </el-input>
        </div>
        <el-tag
          v-for="(item, index) in demoData.label"
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
          v-model="demoData.description"
          placeholder="写的什么吧，见证美好的事物"
        ></el-input>
      </div>

      <div>
        <span>代码演示文件 (支持视频,图片...):</span>
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

      <div>
        <My-Editor
          @onClick="onClick"
          @input="onInput"
          ref="editor"
          :value="demoData.codeContent"
          :disabled="false"
        ></My-Editor>
      </div>
      <el-button type="primary" size="medium" icon="el-icon-edit" @click="createDemo">
          发表
      </el-button>
    </el-card>
  </div>
</template>

<script>
import { upload_album_pic_url } from "@/constant";
import { defineComponent, getCurrentInstance, nextTick, onMounted, reactive, ref } from "vue";
import { uploadApi ,demoApi} from "@/utils/http/request";
import Editor from "@/components/Tinymce/Tinymce";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    "My-Editor": Editor,
  },
  setup() {
    const upload_album_url = "/api" + upload_album_pic_url;

    const upload_headers = {
      "Content-Type": "multipart/form-data",
    };

    const demoData = reactive({
      title: "",
      label: [],
      description: "",
      files: [],
      codeContent: "",
    });

    const formData = ref("");

    const current_lable = ref("");

    const label_type = ["", "success", "info", "warning", "danger"];

    const { ctx }=getCurrentInstance()
    const router=useRouter()

    const addLabel = () => {
      demoData.label.push({
        name: current_lable.value,
      });
      current_lable.value = "";
    };

    const handleClose = (tag) => {
      console.log(tag);
      demoData.label = demoData.label.filter((item) => item.name !== tag.name);
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
     const result= await uploadApi.uploadAlbum(params, config)
     demoData.files=result.files.map(item=> ({ file_url: item.url }))
    };
    const onClick = (e, tinymce) => {
      console.log(e, tinymce);
    };
    const onInput = (val) => {
      demoData.codeContent = val;
    };
    const createDemo= async ()=>{
      await submitUpload()
      let params={
        title: demoData.title,
        label: demoData.label,
        description: demoData.description,
        codeContent: demoData.codeContent,
        files: demoData.files
      }
      const result =await demoApi.demoAdd(params)
      console.log(result);  
      ctx.$message({
        message: '发布成功',
        type: 'success'
      })
      router.push('/article/list')

    }
    return {
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
      onClick,
      onInput,
      demoData,
      createDemo
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
.upload-album {
  margin: 20px 0;
}
.tinymce-editor{
    margin: 20px 0;
}

</style>
