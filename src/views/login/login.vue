<template>
  <div id="login">
    <el-form :model="form" ref="form" label-position="left" label-width="0px" class="login-container">
        <h3 class="title">星辉国内SDK管理后台</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="form.username" auto-complete="off" placeholder="账号">
            </el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
        <el-form-item style="width:100%">
            <el-button type="primary" style="width:100%" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
/*eslint-disable*/
import Muntils from '@/utils/Muntils.js'
import {loginByUsername} from '@/api/login.js'
export default {
    name: 'login',
    data () {
      return {
        logining:false,
        form: {
            username: '',
            password: ''
        },
        checked: true
      }
    },
    methods: {
        handleSubmit(ev) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if( !this.form.username || !this.form.password ){
                            this.$message({message: '用户名或密码不能为空',type: 'error'})
                            return false
                        }
                        if( this.form.username.length<5 || this.form.username.length>12 || this.form.password.length<6 || this.form.password.length>18 ){
                            this.$message({message: '用户名或密码格式不正确',type: 'error'})
                            return false
                        }
                        if( this.form.username.length<5 || this.form.username.length>12 || this.form.password.length<6 || this.form.password.length>18 ){
                            this.$message({message: '用户名或密码格式不正确',type: 'error'})
                            return false
                        }
                        if( /[^\w]/.test(this.form.username) ){
                            this.$message({message: '请输入正确的用户名',type: 'error'})
                            return false
                        }
                        if( /[^\x21-\x7e]/.test(this.form.password) ){
                            this.$message({message: '请输入正确密码',type: 'error'})
                            return false
                        }
                        this.logining = true
                        var loginParams = { uname: this.form.username, pwd: Muntils.md5(Muntils.md5(this.form.password)) }
                        loginByUsername(loginParams).then((res) => {
                            if (res.state !== 1) {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                })
                                this.logining = false
                            } else {
                                this.logining = false
                                console.log(res)
                                this.$store.dispatch('setUserInfo', res.data)
                                this.$router.push({
                                    name: 'index'
                                })
                               
                            }
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
         }
    }
}
</script>
<style lang='scss' scoped>
 .login-container {
            /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
            -webkit-border-radius: 5px;
            border-radius: 5px;
            -moz-border-radius: 5px;
            background-clip: padding-box;
            margin: 180px auto;
            width: 350px;
            padding: 35px 35px 15px 35px;
            background: #fff;
            border: 1px solid #eaeaea;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            -webkit-transform: translateX(-50%);
            -moz-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
        }
        
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
</style>