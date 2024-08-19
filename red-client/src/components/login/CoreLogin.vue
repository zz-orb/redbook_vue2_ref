<template>

  <div class="login">
    <div class="asidePic" id="asidePic"></div>
    <div class="fuc">
      <!-- <div class="pic">
        <div class="Img"></div>
        <span>运动商城</span>
      </div> -->


      <div class="inp">

        <div style="width: 100%; text-align: center; color: azure;">
          <h1>登录小红书</h1>
        </div>

        <div>
          <div>
            <el-input placeholder="请输入账号" prefix-icon="el-icon-user-solid" v-model="username">
            </el-input>
          </div>

          <div style="margin-top:10px">
            <el-input placeholder="请输入密码" prefix-icon="el-icon-edit" show-password v-model="password"></el-input>
          </div>

          <div style="margin-top:10px">
            <el-input placeholder="请输入电话" prefix-icon="el-icon-phone-outline" v-model="phone">
            </el-input>
          </div>

          <div style="margin-top:10px">
            <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="code">
            </el-input>
          </div>

          <div style="margin-top:10px">
            <el-switch v-model="remember" active-color="#ff4949" inactive-color="#13ce66" active-text="Active admin">
            </el-switch>
          </div>

          <div style="margin-top:10px;display:flex;justify-content:center;">
            <el-button type="danger" plain @click="getCode">验证码</el-button>
            <el-button type="primary" plain @click="LoginCheck">登录</el-button>
            <el-button type="success" plain @click="gotoRegister">注册</el-button>
            <!-- <el-button type="warning" plain>Reset</el-button> -->
          </div>

        </div>
      </div>

    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      username: 'xm',
      password: '123456',
      remember: true,
      phone: "10086111111",
      code: "点击验证码获取"
    }
  },
  methods: {
    // 获取短信验证码
    getCode () {
      if (this.phone == null || this.phone == "") {
        return this.$message.error('请先输入手机号')
      } else {
        this.$http({
        url: '/user/smsLogin',
        data: {
          //键值对
          phone: this.phone,
        },
        method: 'post'
      }).then(res => {
        if (res.status !== 200) {
          return this.$message.error('获取短信验证码失败，请联系管理员')
        } else {
          this.$message.error('获取短信验证码成功')
          this.code = res.data.data + ""
          // console.log(res);
        }
      }).catch(res => {
        console.log(res);
      })
      }
    },
    // 跳转注册组件
    gotoRegister() {
      this.$router.push("/login/coreRegister");
    },
    // 登录校验，成功跳转
    LoginCheck() {
      this.$http({
        url: '/user/userLogin',
        // params: {
        //   //键值对
        //   username: this.username,
        //   password: this.password,
        //   phone: this.phone,
        //   code: this.code
        // },
        data: {
          //键值对
          username: this.username,
          password: this.password,
          phone: this.phone,
          code: this.code
        },
        method: 'post'
      }).then(res => {
        // res.status == 200
        // res.data.data 才是数据
        // 登录成功判断，以及保存token
        // window.sessionStorage.getItem('user_id')获取数据
        // window.sessionStorage.setItem('user_id', res.data.data.user.id)加入数据

        if (res.status !== 200) {
          return this.$message.error('登录失败')
        } else {
          this.$message.success('登录成功')

          // 完了Vuex使用，偷偷存用户名和id
          window.sessionStorage.setItem('token', res.data.data.token)
          window.sessionStorage.setItem('id', res.data.data.user.id)
          window.sessionStorage.setItem('username', res.data.data.user.username)
          window.sessionStorage.setItem('headphoto', res.data.data.user.headphoto)
          window.sessionStorage.setItem('userType', res.data.data.user.userType)
          this.$router.push("/red");
        }
        // console.log('------------登录界面数据----------');
        // console.log(res);
      }).catch(res => {
        console.log(res);
      })

      // 无后台时测试
      // this.$router.push("/red");
    }
  }
}
</script>
<style>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 600px;
  height: 430px;
  background-color: rgba(255, 159, 127, 0.3);
  box-shadow: 0px 0px 8px rgba(0, 247, 255, 0.5);
  border-radius: 15px;
  overflow: hidden;
}


.login #asidePic {
  width: 220px;
  height: 100%;

  position: absolute;
  left: 0;
  top: 0;

  /* background-color: blueviolet; */
  background-image: url("../../assets/mypic/asideLogin.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.fuc {
  width: 380px;
  height: 100%;

  position: absolute;
  right: 0;
  top: 0;

  /* background-color: brown; */
}

.fuc .pic {
  height: 70px;
  width: 100%;
  line-height: 70px;
  position: absolute;
  top: 25px;
  left: 50%;

  transform: translateX(-50%);
}

.pic span {
  /* display: inline-block; */
  padding-top: 10px;
  padding-left: 10px;
  line-height: 70px;
  text-shadow: 0px 0px 8px rgba(231, 104, 20, 0.565);
  font-size: 40px;
  color: #303133;
}

.pic .Img {
  width: 70px;
  height: 70px;
  border-radius: 50%;

  background-image: url("../../assets/mypic/mainUserPic.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  position: absolute;
  left: 13%;
}

.inp {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  width: 330px;
}
</style>