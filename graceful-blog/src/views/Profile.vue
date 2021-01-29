<template>
  <div class="user_info_wrap">
    <el-card>
      <h3>个人信息:</h3>
      <div class="info_wrap">
        <span>用户名:</span
        ><span class="user_name">{{ userInfo.username }}</span>
        <div class="user_avatar">
          <span>头像: </span>
          <img :src="userInfo.avatar" alt="" />
        </div>
        <div class="email">
          <span>邮箱: </span>
          <span class="email_content">{{ userInfo.email }}</span>
        </div>
        <div class="register_time">
          <span>注册时间: </span>
          <span class="rg_time_conent">{{ userInfo.registerTime }}</span>
        </div>
        <div class="user_desc">
          <span>个人简介: </span>
          <div class="desc_content">{{ userInfo.info }}</div>
        </div>
      </div>
      <div>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-edit"
          @click="editUserInfo"
          >编辑</el-button
        >
      </div>
    </el-card>

    <div class="edit_dialog_wrap">
      <el-dialog
        title="编辑信息"
        v-model="editUserDialogVisible"
        width="40%"
        center
      >
        <div class="inner_box">
          <div class="edit_username flex_jc_ai">
            <span>用户名: </span>
            <input
              type="text"
              placeholder="请输入用户名"
              v-model="editUserData.username"
            />
          </div>
          <div class="edit_avatar flex_jc_ai">
            <span>头像: </span>
            <el-upload
              class="upload_album"
              :action="upload_album_url"
              :on-preview="handlePreview"
              :on-change="handleChange"
              :file-list="fileList"
              list-type="picture"
              :limit="12"
              multiple
              :auto-upload="false"
              :http-request="uploadAlbum"
              :ref="uploadRef"
            >
              <el-button size="mini" type="primary">
                <i class="el-icon-upload el-icon--right"></i
                >点击选择图片</el-button
              >
              <template #tip>
                <div class="el-upload__tip">
                  只能上传 jpg/png 文件，且不超过 500kb
                </div>
              </template>
            </el-upload>
          </div>
          <div class="edit_email flex_jc_ai">
            <span>邮箱: </span>
            <input
              type="text"
              placeholder="请输入邮箱"
              v-model="editUserData.email"
            />
          </div>
          <div class="edit_info flex_jc_ai">
            <span>个人简介: </span>
            <textarea
              placeholder="请输入简介"
              v-model="editUserData.info"
            ></textarea>
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleCancel" size="small">取 消</el-button>
            <el-button type="primary" @click="handleSave" size="small"
              >确 定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
} from "vue";
import { userApi } from "@/utils/http/request";
import { upload_avatar_url } from "@/constant";
export default defineComponent({
  setup() {
    const local_user_inof = JSON.parse(localStorage.getItem("user_info"));
    let userInfo = reactive(local_user_inof);

    const getUserInfo = async () => {
      const id = userInfo._id;
      const tempUserInfo = await userApi.getUserInfo(id);
      console.log(tempUserInfo);
      userInfo = tempUserInfo.user;
    };

    let editUserData = reactive({
      username: "",
      avatar: "",
      email: "",
      info: "",
    });

    const editUserDialogVisible = ref(false);
    let editUserInfo = async () => {
      const id = local_user_inof._id;
      const result = await userApi.getUserInfo(id);
      console.log(result);
      editUserData.username = result.user.username;
      editUserData.avatar = result.user.avatar;
      editUserData.email = result.user.email;
      editUserData.info = result.user.info;
      editUserDialogVisible.value = true;
    };
    onMounted(() => {
      nextTick(() => {});
      getUserInfo();
    });
    const { ctx } = getCurrentInstance();
    const handleCancel = () => {
      editUserDialogVisible.value = false;
      editUserData = {};
    };
    const handleSave = async () => {
      await submitUpload();
      console.log(editUserData);
      const result = await userApi.editUserInfo(userInfo._id, editUserData);
      console.log(result);
      localStorage.setItem("user_info", JSON.stringify(result.user));
      ctx.$message({
        message: "修改成功",
        type: "success",
      });
      editUserInfo = {};
      fileList.value = [];
      editUserDialogVisible.value = false;
      getUserInfo();

      editUserData = {};
    };
    const upload_ref = ref(null);
    const uploadRef = (dom) => {
      upload_ref.value = dom;
    };

    const upload_album_url = "/api" + upload_avatar_url;
    const handlePreview = (e) => {
      console.log("preview", e);
    };
    const handleChange = (e) => {
      console.log("change", e);
    };
    let fileList = ref([]);
    const formData = ref("");
    const uploadAlbum = (file) => {
      console.log(file);
      formData.value.append("file", file.file);
      console.log(formData.value);
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

      const result = await userApi.uploadAvatar(params, config);
      console.log(result);
      editUserData.avatar = result.file.url;
    };
    return {
      userInfo,
      editUserDialogVisible,
      editUserInfo,
      handleCancel,
      handleSave,
      editUserData,
      uploadRef,
      upload_album_url,
      handlePreview,
      handleChange,
      fileList,
      uploadAlbum,
    };
  },
});
</script>
<style lang="scss" scoped>
.user_info_wrap {
  padding: 10px 150px;
  :deep().el-card {
    min-height: 500px;
  }
  .info_wrap {
    .user_name {
      margin-left: 20px;
    }
    .user_avatar {
      display: flex;
      align-items: center;
      letter-spacing: 5px;
      margin-top: 20px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        margin-left: 20px;
      }
    }
    .email {
      margin-top: 20px;
      letter-spacing: 5px;
      .email_content {
        margin-left: 20px;
        letter-spacing: 1px;
      }
    }
    .register_time {
      margin-top: 20px;
      letter-spacing: 5px;
      .rg_content {
        margin-left: 20px;
        letter-spacing: 0px;
      }
    }
    .user_desc {
      margin-top: 20px;
      letter-spacing: 5px;
      display: flex;
      .desc_content {
        margin-left: 20px;
        letter-spacing: 1px;
        height: 200px;
      }
    }
  }

  .edit_dialog_wrap {
    .inner_box {
      .flex_jc_ai {
        display: flex;
        // justify-content: space-between;
        // align-items: center;
        margin: 10px;
        > span {
          letter-spacing: 2px;
        }
        > input {
          border: none;
          text-decoration: none;
          outline: none;
          padding: 5px 10px;
          margin-left: 20px;
        }
        > textarea {
          border: 1px dashed #999;
          text-decoration: none;
          outline: none;
          padding: 5px 10px;
          margin-left: 20px;
          min-width: 400px;
          min-height: 100px;
        }
      }
      .upload_album {
        margin-left: 30px;
      }
    }
  }
}
</style>
