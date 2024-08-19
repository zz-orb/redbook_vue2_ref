<template>

    <div class="login">
        <div class="asidePic"></div>
        <div class="fuc">


            <!-- <div class="pic">
                <span>用户注册</span>
            </div> -->


            <div class="inp">

                <div>

                    <div style="text-align: center; color:#F2F6FC;">
                        <div style="height:86px;width: 86px; line-height: 86px; position: absolute; left: 0;">
                            <span>头像上传</span>
                        </div>
                        <el-upload class="avatar-uploader" action="" :http-request="upload" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="headphoto" :src="headphoto" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>

                    <div style="margin-top:10px">
                        <el-input placeholder="设置您的账号" prefix-icon="el-icon-user-solid" v-model="username">
                        </el-input>
                    </div>

                    <div style="margin-top:10px">
                        <el-input placeholder="请输入密码" prefix-icon="el-icon-edit" show-password
                            v-model="password"></el-input>
                    </div>

                    <div style="margin-top:10px">
                        <el-radio v-model="gender" label="1" border>男  <i class="el-icon-male"></i></el-radio>
                        <el-radio v-model="gender" label="0" border>女 <i class="el-icon-female"></i></el-radio>
                    </div>
                    
                    <div style="margin-top:10px">
                      <el-input placeholder="请输入电话" prefix-icon="el-icon-phone-outline"  v-model="phone"></el-input>
                    </div>

                    <div style="margin-top:10px">
                      <el-input placeholder="请输入年龄" prefix-icon="el-icon-time"  v-model="age"></el-input>
                    </div>

                    <div style="margin-top:10px;display:flex;justify-content:center;">
                        <el-button type="primary" plain @click="CreateUser">注册</el-button>
                        <el-button type="success" plain @click="gotoLogin">前往登录页</el-button>
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
            headphoto: '',
            username: '',
            password: '',
            gender: 1,
            age: 18,
            introduction: '这个人很懒，什么也没有留下',
            phone: 19813430639
        }
    },
    methods: {
        // 注册用户
        CreateUser() {
            this.$http({
                url: '/user/register',
                data: {
                    //键值对
                    headphoto: this.headphoto,
                    username: this.username,
                    password: this.password,
                    gender: this.gender,
                    age: this.age,
                    introduction: this.introduction,
                    phone: this.phone
                },
                method: 'post'
            }).then(res => {
                // 登录成功判断，以及保存token
                if (res.status == 200 && res.data.data == "注册成功") {
                    this.$message.success('注册用户成功，请登录')
                    this.$router.push("/login");
                } else {
                    return this.$message.error('注册失败，请重试')
                }
                // console.log(res)
            }).catch(res => {
                console.log(res);
            })
        },

        // 上传头像
        upload(param) {
            const formdate = new FormData()
            formdate.append('headphoto', param.file)
            const url = '/user/headphoto'
            const headers = {
                'Content-Type': 'multipart/form-data'
            }
            // axios.post的构造函数有顺序，不可乱
            this.$http.post(
                url,
                formdate,
                headers
            ).then(res => {
                // console.log(data)
                this.$message.success("图片上传成功")
                this.headphoto = res.data.data
            }).catch(response => {
                console.log(response)
            })
        },
        gotoLogin() {
            this.$router.push("/login/coreLogin");
        },
        handleAvatarSuccess(res, file) {
            this.headphoto = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
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


.login .asidePic {
    width: 220px;
    height: 100%;

    position: absolute;
    left: 0;
    top: 0;

    /* background-color: blueviolet; */
    background-image: url("../../assets/mypic/asideRegister.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}

.fuc {
    width: 380px;
    height: 100%;

    position: absolute;
    right: 0;
    top: 0;

}

.pic {
    display: block;
    height: 40px;
    width: 100%;
    line-height: 40px;
    text-align: center;
}

.pic span {
    text-align: center;
    line-height: 40px;
    text-shadow: 0px 0px 8px rgba(231, 104, 20, 0.565);
    font-size: 30px;
    color: #303133;
}

.inp {
    position: absolute;
    bottom: 36px;
    left: 50%;
    transform: translateX(-50%);

    width: 330px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
}

.avatar {
    width: 80px;
    height: 80px;
    display: block;
}
</style>