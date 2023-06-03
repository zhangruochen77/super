<template>
    <div class="login-body">
        <div class="header-container">
            <div class="sys-log">
                超市管理系统
            </div>
        </div>
        <div class="login-class">
            <div class="login-by-password">
                <div v-if="loginMethod === 'password'">
                    <div>
                        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px"
                                 class="demo-ruleForm">
                            <el-form-item label="用户名" prop="username">
                                <el-input type="text" v-model="loginForm.username" max="50px"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="loginForm.password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" @click="loginByPass('loginForm')">登录</el-button>
<!--                                <el-button type="info" @click="switchToPhone" style="width: 112px">手机号登录</el-button>-->
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div v-if="loginMethod === 'phone'">
                    <div>
                        <el-form :model="phoneForm" status-icon :rules="phoneRules" ref="phoneForm" label-width="100px"
                                 class="demo-ruleForm">
                            <el-form-item label="手机号" prop="phone" class="">
                                <el-input type="text" v-model="phoneForm.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" prop="code">
                                <el-input type="text" v-model="phoneForm.code"
                                          style="width: 120px; margin-right: 10px"></el-input>
                                <el-button type="success" @click="requestCode" style="width: 70px"
                                           :disabled="codeBtnDisable">{{codeBtn}}
                                </el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" @click="loginByPhone('phoneForm')">登录</el-button>
                                <el-button type="info" @click="switchToPass" style="width: 112px">密码登录</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    // import codeApi from '@/api/api/Code'
    import loginApi from '@/api/Login'

    export default {
        name: "Login",
        data() {
            let validatePass = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空'));
                }
            }

            let validateName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空！'))
                }
            }

            let validatePhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号码不能为空'))
                }

                // todo 手机号码验证
            }

            let validateCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空！'))
                }
            }

            return {
                loginForm: {
                    id: null,
                    username: 'root',
                    password: '031500'
                },
                phoneForm: {
                    phone: '',  // 手机号
                    code: ''  // 验证码
                },
                phoneRules: {
                    phone: [
                        {validator: validatePhone, trigger: 'blur'}
                    ],
                    code: [
                        {validator: validateCode, trigger: 'blur'}
                    ]
                },
                rules: {
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    username: [
                        {validator: validateName, trigger: 'blur'}
                    ]
                },
                loginMethod: 'password',
                codeBtn: '获取',
                codeBtnDisable: false
            }
        },
        created() {

        },
        methods: {
            loginByPass() {  // 使用密码方式进行登录
                if (!this.loginForm.username) {
                    this.$message.error('用户名不能为空！')
                    return
                }
                if (!this.loginForm.password) {
                    this.$message.error('密码不能为空！')
                    return
                }
                // 调用密码登录接口 登录成功后将 token 放入 sessionStorage 当中存储 跳转主页
                loginApi.loginByPass(this.loginForm).then(resp => {
                    if (resp.data.code == 200) {
                        window.sessionStorage.setItem('token', resp.data.data)
                        this.$message.success('登录成功！')
                        this.$router.replace('/home')
                    } else {
                        this.$message.error(resp.data.msg)
                    }
                })
            },
            loginByPhone() {  // 使用手机方式进行登录
                if (!this.phoneForm.phone) {
                    this.$message.error('手机号码为空！')
                    return
                }
                if (this.phoneForm.code) {
                    this.$message.error('验证码为空！')
                    return
                }
                // 调用手机登录接口 登录成功后将 token 放入 sessionStorage 当中存储 跳转主页
                loginApi.loginByPhone(this.phoneForm).then(resp => {
                    if (resp.data.code == 200) {
                        window.sessionStorage.setItem('token', resp.data.data)
                        this.$message.success('登录成功！')
                        this.$router.replace('/home')
                    } else {
                        this.$message.error(resp.data.msg)
                    }
                })
            },
            requestCode() {  // 请求验证码
                if (!this.phoneForm.phone) {
                    this.$message.error('请输入手机号码')
                    return
                }
                if (false) {   // 手机号码验证
                    return
                }

                // codeApi.createCode(this.phoneForm.phone).then(resp => {
                //     if (resp.data.code == 200) {
                //         this.$message.success(resp.data.msg)  // 成功获取验证码
                //     } else {
                //         this.$message.warning(resp.data.msg)  // 获取验证码失败
                //     }
                // })
                this.codeBtn = 60
                this.codeBtnDisable = true
                let internalTimer = setInterval(() => {
                    if (0 !== this.codeBtn) {
                        this.codeBtn--
                    } else {
                        this.codeBtn = '获取'
                        this.codeBtnDisable = false
                        clearInterval(internalTimer)
                    }
                }, 1000)

            }
            ,
            switchToPhone() {  // 切换手机登录方式
                this.loginMethod = 'phone'
            }
            ,
            switchToPass() {  // 切换账号密码登录方式
                this.loginMethod = 'password'
            },
        }
    }
</script>

<style scoped>

    .login-body {
        background-color: #f3f6f1;
        height: 975px;
    }

    .header-container {
        height: 80px;
        background-color: #7cb6aa;
    }

    .sys-log {
        font-family: 华文楷体;
        font-size: 50px;
        float: left;
        color: #303133;
    }

    .login-class {
        padding-top: 200px;
    }

    .login-by-password {
        height: 300px;
        width: 400px;
        padding-top: 50px;
        margin: auto;
        background-color: #e1f3d8;
        border-radius: 30px;
    }

    .login-by-password > div {
        height: 300px;
        width: 300px;
    }
</style>