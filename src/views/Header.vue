<template>
    <!-- 头部展示栏位 存放用户个人的一些操作信息 -->
    <div class="header-container">
        <div class="sys-log">
            超市管理系统
        </div>

        <!-- 更改个人信息栏位 -->
        <div>
            <el-dialog
                    title="更改信息"
                    :visible.sync="personInfoVisible"
                    width="40%">
                <span>
                    <el-form ref="form" :model="updateAdmin">
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="姓名">
                                        <el-input v-model="updateAdmin.name" placeholder="请输入你的姓名"></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="用户名">
                                        <el-input v-model="updateAdmin.username" placeholder="请输入用户名"></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="手机号码">
                                        <el-input v-model="updateAdmin.phone" placeholder="请输入手机号码"></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="头像">
                                        <el-image style="width: 100px; height: 100px"
                                                  :src="updateAdmin.img"></el-image>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="更新头像">
                                        <el-upload
                                                class="upload-demo"
                                                action="http://192.168.195.130:80/log/api/img/upload"
                                                multiple
                                                :on-success="imgUploadSuccess">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2Mb</div>
                                    </el-upload>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="personInfoVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateInfo">确 定</el-button>
                </span>
            </el-dialog>
        </div>

        <!-- 更改密码栏位 -->
        <div>
            <el-dialog title="密码更改"
                       :visible.sync="passwordVisible"
                       width="30%">
                <span>
                    <!-- 密码更改方式 -->
                    <div class="password-style" v-if="!isPhone">
                        <el-form :model="updatePasswordByPassParams" status-icon
                                 ref="updatePasswordByPassParams" label-width="100px"
                                 class="demo-ruleForm">
                            <el-form-item label="原旧密码">
                                <el-input style="width: 85%" type="password"
                                          v-model="updatePasswordByPassParams.password"
                                          autocomplete="off">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="新的密码">
                                <el-input style="width: 85%" type="password"
                                          v-model="updatePasswordByPassParams.newPassword"
                                          autocomplete="off">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="确认密码">
                                <el-input style="width: 85%" type="password" v-model="checkPassword" autocomplete="off">
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" @click="updatePassByPass" plain>提交</el-button>
                                <el-button @click="userPhone" plain>使用手机</el-button>
                                <el-button @click="passwordVisible = false" plain>取 消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!-- 手机验证码更改方式 -->
                    <div class="phone-style" v-if="isPhone">
                        <el-form :model="updatePasswordByPhoneParams" status-icon
                                 ref="updatePasswordByPassParams" label-width="100px"
                                 class="demo-ruleForm">
                            <el-form-item label="手机号码">
                                <el-input type="text" v-model="updatePasswordByPhoneParams.phone"
                                          autocomplete="off" disabled style="width: 85%">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="新密码">
                                <el-input type="password" v-model="updatePasswordByPhoneParams.password"
                                          autocomplete="off" style="width: 85%">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="验证码">
                                <el-input style="width: 50%" type="text" v-model="updatePasswordByPhoneParams.code"
                                          autocomplete="off">
                                </el-input>
                                <el-button style="width: 35%" type="primary" @click="getCode" plain>获取验证码</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" @click="updatePassByPhone" plain>提交</el-button>
                                <el-button @click="usePass" plain>原始方式</el-button>
                                <el-button @click="passwordVisible = false" plain>取 消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>

    // import adminApi from '@/api/admin/Admin'
    // import codeApi from '@/api/api/Code'

    export default {
        name: "Header",
        data() {
            return {
                personInfoVisible: false,
                passwordVisible: false,
                isPhone: false,  // 是否使用手机验证码更新
                checkPassword: '',  // 用于检查密码操作
                personAdmin: {  // 用于保持个人信息
                    id: '',
                    name: '',
                    roleId: '',
                    username: '',
                    img: '',
                    phone: ''
                },
                updateAdmin: {  // 更新用户个人信息
                    id: '',
                    name: '',
                    username: '',
                    img: '',
                    phone: ''
                },
                updatePasswordByPassParams: {  // 使用密码更新密码
                    username: '',
                    password: '',
                    newPassword: ''
                },
                updatePasswordByPhoneParams: {  // 更新密码使用手机验证方式
                    phone: '',
                    password: '',
                    code: ''
                }
            }
        },
        created() {
            this.getPersonInfo()
        },
        methods: {
            getCode() {  // 获取验证码
                // codeApi.createCode(this.updatePasswordByPhoneParams.phone).then(resp => {
                //     if (200 === resp.data.code) {
                //         this.$message.success(resp.data.msg)
                //         return
                //     }
                //     this.$message.error(resp.data.msg)
                // })
            },
            userPhone() {  // 使用手机方式
                this.isPhone = true
            },
            usePass() {    // 使用密码方式
                this.isPhone = false
            },
            updatePassByPhone() {  // 更新密码方式采用手机验证码方式
                if (!this.updatePasswordByPhoneParams.password) {
                    this.$message.error('请输入密码')
                    return
                }
                if (!this.updatePasswordByPhoneParams.code) {
                    this.$message.error('请输入验证码')
                    return
                }
                // adminApi.updatePassByPhone(this.updatePasswordByPhoneParams).then(resp => {
                //     if (200 === resp.data.code) {
                //         this.clear()  // 密码修改成功 退出登录
                //         this.$message.success(resp.data.msg)
                //         return
                //     }
                //     this.$message.error(resp.data.msg)
                // })
            },
            updatePassByPass() {  // 更新密码方式采用密码方式
                if (!this.updatePasswordByPassParams.password) {
                    this.$message.error('请输入原密码')
                    return
                }
                if (!this.updatePasswordByPassParams.newPassword) {
                    this.$message.error('请输入新密码')
                    return
                }
                if (!this.checkPassword) {
                    this.$message.error('请确认新密码')
                    return
                }
                if (this.updatePasswordByPassParams.newPassword !== this.checkPassword) {
                    this.$message.error('新密码两次输入不一致')
                }
                // adminApi.updatePassByPass(this.updatePasswordByPassParams).then(resp => {
                //     if (resp.data.code === 200) {
                //         this.clear()  // 密码修改成功 退出登录
                //         this.$message.success(resp.data.msg)
                //         return
                //     }
                //     this.$message.error(resp.data.msg)
                // })
            },
            updateInfo() {  // 更新个人信息
                // adminApi.updateInfo(this.updateAdmin).then(resp => {
                //     if (resp.data.code === 200) {
                //         this.$message.success(resp.data.msg)
                //         this.personAdmin.img = this.updateAdmin.img
                //         this.personAdmin.name = this.updateAdmin.name
                //         this.personAdmin.phone = this.updateAdmin.phone
                //         this.personAdmin.username = this.updateAdmin.username
                //         return
                //     }
                //     this.$message.error(resp.data.msg)
                // })
                // this.personInfoVisible = false
            },
            imgUploadSuccess(img) {  // 上传头像成功，更新头像地址
                this.updateAdmin.img = img
            },
            getPersonInfo() {  // 获取用户的个人信息
                // adminApi.getPersonInfo().then(resp => {
                //     window.sessionStorage.setItem('user', JSON.stringify(resp.data.data))
                //     this.personAdmin = resp.data.data
                // })
            },
            handleCommand(command) {  // 处理命令操作
                if ('upInfo' === command) {
                    this.updateAdminInfo()
                    return
                }
                if ('upPass' === command) {
                    this.updatePassword()
                    return
                }
                if ('logout' === command) {
                    this.logout()
                }
            },
            updateAdminInfo() {  // 更新用户信息
                this.updateAdmin.id = this.personAdmin.id
                this.updateAdmin.img = this.personAdmin.img
                this.updateAdmin.name = this.personAdmin.name
                this.updateAdmin.phone = this.personAdmin.phone
                this.updateAdmin.username = this.personAdmin.username
                this.personInfoVisible = true
            },
            updatePassword() {  // 更新密码
                this.updatePasswordByPhoneParams.phone = this.personAdmin.phone
                this.updatePasswordByPassParams.username = this.personAdmin.username
                this.passwordVisible = true
            },
            logout() {  // 退出登录
                this.clear()
                this.$message.success('退出登录')
            },
            clear() {  // 清除数据操作
                // adminApi.logout()
                window.sessionStorage.clear()  // 清空 token 信息
                this.$router.replace('/')
            }
        }
    }
</script>

<style scoped>
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

    .sys-avatar {
        float: right;
        padding: 15px 30px 0 0;
    }

    .sys-avatar:hover {
        cursor: pointer;
    }
</style>