<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus"
import type { LoginRequestData } from "./apis/type"
import { useUserStore } from "@/pinia/stores/user"
import { CacheKey } from "@@/constants/cache-key"
import { Key, Loading, Lock, Picture, User } from "@element-plus/icons-vue"
import Cookies from "js-cookie"
import { getCaptchaApi, loginApi } from "./apis"

const router = useRouter()

const userStore = useUserStore()

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)

/** 登录按钮 Loading */
const loading = ref(false)

/** 验证码图片 URL */
const codeUrl = ref("")

/** 记住我选项 */
const rememberMe = ref(false)

/** 记住密码的过期天数 */
const REMEMBER_EXPIRES = 30

/** 登录表单数据 */
const loginFormData = reactive<LoginRequestData>({
  username: "",
  password: "",
  code: ""
})

/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" }
  ]
}

/** 从本地存储读取记住的账号密码 */
function loadCredentials() {
  const saved = localStorage.getItem(CacheKey.LOGIN_REMEMBER)
  const rememberMeStatus = Cookies.get(CacheKey.LOGIN_REMEMBER_STATUS)
  rememberMe.value = rememberMeStatus === "true"

  if (saved && rememberMe.value) {
    const { username, password } = JSON.parse(saved)
    loginFormData.username = username
    loginFormData.password = password
  }
}

/** 保存账号密码到本地存储 */
function saveCredentials() {
  if (rememberMe.value) {
    localStorage.setItem(CacheKey.LOGIN_REMEMBER, JSON.stringify({
      username: loginFormData.username,
      password: loginFormData.password
    }))
    Cookies.set(CacheKey.LOGIN_REMEMBER_STATUS, "true", { expires: REMEMBER_EXPIRES })
  } else {
    localStorage.removeItem(CacheKey.LOGIN_REMEMBER)
    Cookies.remove(CacheKey.LOGIN_REMEMBER_STATUS)
  }
}

/** 登录 */
function handleLogin() {
  loginFormRef.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("表单校验不通过")
      return
    }
    loading.value = true
    loginApi(loginFormData).then(({ data }) => {
      saveCredentials()
      userStore.setToken(data.token)
      router.push("/")
    }).catch(() => {
      createCode()
      loginFormData.password = ""
    }).finally(() => {
      loading.value = false
    })
  })
}

/** 创建验证码 */
function createCode() {
  // 清空已输入的验证码
  loginFormData.code = ""
  // 清空验证图片
  codeUrl.value = ""
  // 获取验证码图片
  getCaptchaApi().then((res) => {
    codeUrl.value = res.data
  })
}

// 初始化验证码
createCode()
// 加载记住的账号密码
loadCredentials()
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="title">
        <img src="@@/assets/images/layouts/logo-text-2.png">
      </div>
      <div class="content">
        <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginFormData.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginFormData.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model.trim="loginFormData.code"
              placeholder="验证码"
              type="text"
              tabindex="3"
              :prefix-icon="Key"
              maxlength="7"
              size="large"
            >
              <template #append>
                <el-image :src="codeUrl" draggable="false" @click="createCode">
                  <template #placeholder>
                    <el-icon>
                      <Picture />
                    </el-icon>
                  </template>
                  <template #error>
                    <el-icon>
                      <Loading />
                    </el-icon>
                  </template>
                </el-image>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="rememberMe">
              记住我
            </el-checkbox>
          </el-form-item>
          <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin">
            登 录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .login-card {
    width: 480px;
    max-width: 90%;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: var(--el-bg-color);
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 100%;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
