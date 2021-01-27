<template>
  <div id="login">
    <el-card>
      <el-form
        v-if="operationType == 'login'"
        :model="loginFormData"
        label-width="100px"
        ref="loginRuleForm"
        :rules="rules"
      >
        <el-form-item label="用户" prop="username">
          <el-input
            v-model="loginFormData.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginFormData.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-form
        :model="registerFormData"
        label-width="100px"
        ref="registerRuleForm"
        :rules="rules"
        v-if="operationType == 'register'"
      >
        <el-form-item label="用户" prop="username">
          <el-input
            v-model="registerFormData.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerFormData.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" class="email_box" prop="email">
          <el-input
            class="email_input"
            v-model="registerFormData.email"
            placeholder="请输入邮箱"
          >
            <template #append><span>@qq.com</span></template>
          </el-input>
          <el-button
            class="send_message"
            size="mini"
            type="warning"
            :disabled="textValue !== '发送'"
            @click="sendEmailCode"
            >{{ textValue }}</el-button
          >
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input
            v-model="registerFormData.captcha"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <el-form-item> </el-form-item>
      </el-form>

      <div class="btn_wrap">
        <el-button
          type="primary"
          size="mini"
          @click="login"
          v-if="operationType == 'login'"
          >登录</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="register"
          v-if="operationType == 'register'"
          >注册</el-button
        >
        <el-button
          type="warning"
          size="mini"
          @click="operationType = 'register'"
          v-if="operationType == 'login'"
          >我是新人</el-button
        >
        <el-button
          type="warning"
          size="mini"
          @click="operationType = 'login'"
          v-if="operationType == 'register'"
          >直接登录</el-button
        >
      </div>
    </el-card>
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
  watch,
} from "vue";
import {useRouter} from 'vue-router'
import { userApi } from "@/utils/http/request";
export default defineComponent({
  name: "Login",
  setup() {
    const loginFormData = reactive({
      username: "",
      password: "",
    });

    const registerFormData = reactive({
      username: "",
      password: "",
      email: "",
      captcha: "",
    });

    const { ctx } = getCurrentInstance();

    const operationType = ref("login");

    const ruleForm = ref(null);

    const router=useRouter()

    const rules = reactive({
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" },
      ],
      email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" },
      ],
      captcha: [
        { required: true, message: "请输入验证码", trigger: "blur" },
        { min: 6, message: "长度为6个字符", trigger: "blur" },
      ],
    });

    const login = () => {
      operationType.value = "login";
      if (!loginFormData.username.trim() || !loginFormData.password.trim()) {
        ctx.$message({
          message: "用户名或密码不能为空",
          type: 'warning'
        });
        return
      }

      let params = {
        username: loginFormData.username,
        password: loginFormData.password,
      };
      userApi.userLogin(params).then(
        (res) => {
          console.log(res);
          localStorage.setItem('auth_token',res.token)
          localStorage.setItem('user_info',JSON.stringify(res.doc))
          ctx.$message({
            type: "success",
            message: "登录成功",
          });
          console.log(res);
           router.push('/demo')
        },
        (err) => {}
      );
    };

    const register = () => {
      operationType.value = "register";
      console.log("执行注册", registerFormData);
      operationType.value = "register";
      if (
        !registerFormData.username.trim() ||
        !registerFormData.password.trim() ||
        !registerFormData.email.trim() ||
        !registerFormData.captcha.trim()
      ) {
        ctx.$message({
          message:"请完善相关注册信息",
          type: "warning"
        });
        return
      }

      let params = {
        username: registerFormData.username,
        password: registerFormData.password,
        email: registerFormData.email + "@qq.com",
        captcha: registerFormData.captcha,
      };
      userApi.userRegister(params).then(
        (res) => {
          console.log(res);
          localStorage.setItem('auth_token',res.token)
          ctx.$message({
            type: "success",
            message: "注册成功",
          });
          console.log(res);
          router.push('/demo')
        },
        (err) => {}
      );
    };

    let textValue = ref("发送");

    onMounted(() => {
      localStorage.setItem("text_value", textValue.value);
    });

    const sendEmailCode = () => {
      let params = {
        username: registerFormData.username,
        email: registerFormData.email + "@qq.com",
      };
      textValue.value = 60;
      let timer = setInterval(() => {
        textValue.value--;
        if (textValue.value <= 0) {
          clearInterval(timer);
          timer=null
          textValue.value = "发送";
          return;
        }
      }, 1000);
      userApi.sendEmailCode(params).then(
        (res) => {
          console.log(res);
           ctx.$message({
            message: `${res.message}`,
            type: 'success'
          })
          clearInterval(timer);
          timer=null
          textValue.value="发送"
        },
        (err) => {
          console.log(err);
          ctx.$message({
            message: `${err.msg}`,
            type: 'warning'
          })
          clearInterval(timer);
          timer=null
          textValue.value="发送"
        }
      );
    };

    watch(
      () => {
        return textValue.value;
      },
      (val) => {
        localStorage.setItem("text_value", val);
      }
    );

    return {
      loginFormData,
      registerFormData,
      operationType,
      login,
      register,
      rules,
      textValue,
      sendEmailCode,
    };
  },
});
</script>

<style lang="scss" scoped>
#login {
  position: absolute;
  width: 30rem;
  height: 20rem;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -20%);
  // background-color: #fff;
  // opacity: 0.8;
  // box-shadow: 0 2rem 5rem 5rem rgba(255, 255, 255, 0.95);
  // padding: 1rem;

  .el-form {
    padding-top: 1rem;
    .el-form-item {
      margin-bottom: 1.5rem;
      :deep() label.el-form-item__label {
        width: 5rem !important;
        letter-spacing: 0.2rem;
      }
      :deep() .el-form-item__content {
        margin-left: 3rem !important;
      }
      .el-input {
        width: 20rem;
      }
      .email_input {
        :deep().el-input__inner {
          //  width: 12rem;
          margin-right: 0 !important;
        }
        :deep().el-input-group__append {
          padding: 0 0.8rem;
        }
      }
    }
    .email_box {
      margin-bottom: 2rem;
      position: relative;
      padding: 0 0.3rem;
      .send_message {
        position: absolute;
        width: 2.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        bottom: -1.8rem;
        right: 3rem;
        color: orange;
        background-color: #fff;
        border: 0.08rem solid #fff;
        cursor: pointer;
        &.el-button {
          padding: 0;
        }
        &:hover {
          background-color: #eee;
          transform: scale(0.9);
        }
      }
    }
  }
  .el-card {
    :deep().el-card__body {
      padding: 0;
    }
  }
  .btn_wrap {
    margin: 1rem 0 0.5rem 5rem;
  }
}
</style>
