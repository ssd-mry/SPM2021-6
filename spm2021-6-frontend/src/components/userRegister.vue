<template>
    <div class="register-wrapper">
        <div id="register">
            <p class="title">用户注册</p>
            <el-form
                    :model="ruleForm2"
                    status-icon
                    :rules="rules2"
                    ref="ruleForm2"
                    label-width="auto"
                    label-position="left"
                    class="demo-ruleForm"
                    size="mini"
            >
                <el-form-item label="姓名" prop="name">
                    <el-input prefix-icon="el-icon-s-custom" v-model="ruleForm2.name" auto-complete="off"
                              placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item prop="gender" label="性别" required>
                    <el-radio-group v-model="ruleForm2.gender">
                        <el-radio label="男" value="male"></el-radio>
                        <el-radio label="女" value="female"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input prefix-icon="el-icon-message" v-model="ruleForm2.email" auto-complete="off"
                              placeholder="请输入邮箱号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input prefix-icon="el-icon-lock" type="password" v-model="ruleForm2.pass" auto-complete="off"
                              placeholder="输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input prefix-icon="el-icon-lock" type="password" v-model="ruleForm2.checkPass"
                              auto-complete="off" placeholder="确认密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%;">用户注册</el-button>
                    <p class="login" @click="gotoLogin">已有账号？立即登录</p>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userRegister",
        data() {
            // <!--验证邮箱号是否合法-->
            let checkEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱号'))
                } else if (!this.checkE(value)) {
                    callback(new Error('邮箱号不合法'))
                } else {
                    callback()
                }
            }
            // <!--验证密码-->
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass')
                    }
                    callback()
                }
            }
            // <!--二次验证密码-->
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            }
            return {
                ruleForm2: {
                    name: '',
                    gender: '男',
                    email: '',
                    pass: '',
                    checkPass: ''
                },
                rules2: {
                    name: [{required: true, message: '请输入真实姓名', trigger: 'change'}],
                    email: [{required: true, validator: checkEmail, trigger: 'change'}],
                    pass: [{required: true, validator: validatePass, trigger: 'change'}],
                    checkPass: [{required: true, validator: validatePass2, trigger: 'change'}]
                },
                flag: true
            }
        },
        methods: {
            // <!--提交注册-->
            submitForm(formName) {
                var self = this
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        var submit = {
                            'name': this.ruleForm2.name,
                            'gender': this.ruleForm2.gender,
                            'email': this.ruleForm2.email,
                            'password': this.ruleForm2.pass
                        }
                        this.$axios({
                            method: 'post',
                            url: '/spm/user/insertUser',
                            contentType: 'application/json; charset=UTF-8', // 解决415错误
                            headers: {'Content-Type': 'application/json;charset=UTF-8'},
                            dataType: 'json',
                            data: JSON.stringify(submit)
                        }).then(res => { // 注意：后端需要返回userID
                            if (res.data === 1) {
                                alert('注册成功')
                                this.$router.push('/')
                            }
                        }).catch(error => {
                            alert(error)
                            console.log(error)
                        })
                    } else {
                        return false
                    }
                })
            },
            // <!--进入登录页-->
            gotoLogin() {
                this.$router.push({
                    path: '/'
                })
            },
            // 验证邮箱
            checkE(str) {
                let re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if (re.test(str)) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
</script>

<style scoped>
    .loading-wrapper {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: #aedff8;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nav {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        height: 60px;
        padding: 5px 0;
        background: rgba(0, 39, 102, 0.6);
    }

    .nav-img {
        width: 300px;
        height: 50px;
        margin-left: 90px;
    }

    .nav-img img {
        height: 50px;
    }

    .nav-item {
        width: auto;
        margin-right: 90px;
        position: relative;
    }

    .nav-item a {
        display: inline-block;
        font-size: 18px;
        cursor: pointer;
        height: 70px;
        line-height: 70px;
        padding: 0;
        color: #ffffff;
        text-decoration: none;
    }

    .register-wrapper {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: url("../assets/index_background.jpg");
        background-size: 100% 100%;
        /*        background: url('../assets/img/waterSoil/login_bkg.jpeg');*/
    }

    #register {
        display: flex;
        flex-direction: column;
        margin: 60px auto;
        margin-top: 40px;
        background: #fff;
        /*background: rgba(255, 255, 255, 0.6);*/
        padding: 10px 40px;
        position: relative;
        z-index: 9;
        width: 480px;
        height: 500px;
        border-radius: 0;
        align-items: center;
    }

    .register-wrapper .el-input {
        width: 250px;
    }

    .register-wrapper .el-form-item {
        margin-bottom: 20px;
    }

    .title {
        font-size: 20px;
        line-height: 40px;
        height: 40px;
        text-align: center;
        padding: 0;
        width: 100%;
        margin: 10px;
        margin-bottom: 0px;
        color: #333333;
        border-bottom: solid 2px rgba(244, 244, 244, 1);
    }

    .el-form {
        width: 265px;
        margin: 35px auto 0;
    }

    .el-form-item {
        text-align: center;
    }

    .el-button {
        background: #1ab2ff;
        border-color: #1ab2ff;
        border-radius: 0;
    }

    .login {
        margin: 20px 0 0 0;
        font-size: 14px;
        line-height: 22px;
        color: #1ab2ff;
        cursor: pointer;
        text-align: left;
        text-indent: 8px;
        width: 160px;
    }

    .code >>> .el-form-item__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .code button {
        margin-left: 20px;
        width: 140px;
        text-align: center;
    }

    .el-button--primary:focus {
        background: #409EFF;
        border-color: #409EFF;
        color: #fff;
    }

    .footer-script {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #1a1a1a;
        color: #ffffff;
        font-size: 12px;
        text-align: center;
        font-weight: lighter;
    }

    .footer-script p {
        margin: 0;
        padding: 0;
        height: 40px;
        line-height: 40px;
    }
</style>
