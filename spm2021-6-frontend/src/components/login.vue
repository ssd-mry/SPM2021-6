<template>
    <div id="app1">
        <div id="background"></div>
        <div class="elet">
            <el-container>
                <el-aside width="900px" class="banner">
                    <div class="banner2"><img src="../assets/banner.png"></div>
                </el-aside>
                <el-container class="login">
                    <el-header class="header">
                        <el-menu
                                default-active="0"
                                class="el-menu-demo"
                                mode="horizontal"
                                router>
                            <el-menu-item index="0" @click="goTo('/')"> 普通用户登录</el-menu-item>
                            <!--<el-menu-item index="1" @click="goTo('/login_Administrator')">系统管理员登录</el-menu-item>-->
                        </el-menu>
                    </el-header>
                    <el-main class="view">
                        <router-view id="login_view"></router-view>
                        <!--            <router-view></router-view>-->
                    </el-main>
                </el-container>
            </el-container>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'login_user',
        methods: {
            goTo(path) {
                this.$router.push(path);
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                    console.log(this.formData);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
</script>

<style scoped>
    .elet {
        margin-left: 150px;
        margin-top: 200px;
    }

    .view {
        width: 300px;
        opacity: 0.8;
        background-color: #000000;
    }

    #background {
        background: url("../assets/index_background.jpg") no-repeat;
        background-size: 100% 100%;
        height: 100%;
        position: fixed;
        width: 100%;
        /*margin-left:-10px;*/
        margin-top: -200px;
        margin-left: -8px;
        z-index: -10000;
    }

    .header {
        margin-top: -20px;
        margin-left: -10px;
        width: 65%;
    }

    .banner {
        /*margin-top: -0px;*/
        margin-left: -20px;
    }

    .login {
        width: 60%;
        height: 320px;
    }

    .banner2 {
        margin-top: -4px;
    }
</style>
