<template>
    <div>
        <div style="height: calc(12vh)"> </div>
        <div style="display: flex">
            <div style="width: calc(55vw)">
                <div style="width: calc(45vw);height: 60vh">
                    <img src='../../static/nalcoImg.png' style="width: 50vh;height: 50vh;margin: 5vh 18vw;" />
                </div>

            </div>
            <div style="width: calc(45vw)">
                <el-form class="elform">
                    <div style="width: calc(30vw);font-size: 25px;color: #409BFF;text-align: center;padding-top:calc(5vh)">欢迎使用工作管理系统</div>
                    <el-form-item style="margin-top:calc(10vh);margin-left:calc(3vw)">
                        <el-input
                                style="margin-left: 10px"
                                placeholder="用户名"
                                v-model="login_name"
                                clearable>
                            <i slot="prefix" style="color: #409BFF" class="el-input__icon el-icon-user"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item style="margin-top:calc(4vh);margin-left:calc(3vw)">
                        <el-input
                                style="margin-left: 10px"
                                placeholder="密码"
                                v-model="login_pass"
                                show-password>
                            <i slot="prefix" style="color: #409BFF" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-button class="btnLogin" type="primary" @click="loginBtn">登陆</el-button>
                </el-form>
            </div>
        </div>
        <div style="height: calc(12vh)"> </div>
    </div>
</template>

<script>
    export default {
        name: "LoginPage",
        data(){
            return{
                bgImg:'../../static/nalcoImg.png',
                login_name:'',
                login_pass:''
            }
        },
        methods:{
            loginBtn(){
                var that=this
                if(that.login_name=='admin' & that.login_pass=='admin'){
                    var ses = window.localStorage;
                    var token=that.login_name+that.login_pass
                    ses.setItem('data',token)
                    this.$router.push({path:'/home'})
                }else {
                    this.$message.error('用户名或密码错误');
                }
            }
        }

    }
</script>

<style scoped>
    .elform{
        margin: 30% auto 10% auto;
    }
    .elform{
        background-color: white;
        width: calc(31vw);
        height: calc(57vh);
        margin-top: 10px;
        margin-left: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border-radius: 10px
    }
    .el-input{
        width: calc(24vw) !important;
        height: calc(4vh) !important;
    }
    .btnLogin{
        margin-left:calc(3.5vw);
        margin-top:calc(8vh);
        width: calc(24vw) !important;
        height: calc(6vh) !important;
        border-radius: 20px;

    }
</style>
