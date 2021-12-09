<template>
  <div class="login-bogy">
    <img src="../assets/background.png" class="img-bg">
    <div class="login-content-wrap">
      <el-card class="box-card">
        <el-form ref="form" :model="form" label-width="50px">
          <el-form-item label="账号">
            <el-input v-model="form.userName" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :offset="17" :span="4">
            <el-button type="text" class="my-button" >忘记密码</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-button type="primary" size="mini" style="width: 100px;">登录</el-button>
          </el-col>
          <el-col :span="12" >
            <el-button size="mini" style="width: 100px" @click="$router.push('/signUp')">注册</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>

  </div>
</template>

<script>
export default {
  name: "signUp",
  data() {
    return {
      form: {
        userName: '',
        password: '',
      }
    }
  }
}
</script>

<style scoped>
.login-bogy {
  width: 100%;
  height: 100%;
}

.box-card {
  position: fixed;
  padding-top:80px ;
  top: 120px;
  right: 70px;
  height: 400px;
  width: 320px;
}

.img-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.login-content-wrap {
  position: absolute;
  width: 460px;
  height: 100%;
  min-height: 580px;
  background: rgba(255,255,255,.4);
  top: 0;
  right: 0;
}
.my-button{
  font-size: 10px;
  color: rgb(180, 182, 189);
}
.my-button:hover{
  color: #2776df;
}
</style>