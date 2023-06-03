<template>
    <div class="home-body">
        <!-- 头部界面 -->
        <Header></Header>

        <div class="home-container">
            <div style="float: left">
                <el-aside width="230px" class="aside-class">
                    <el-menu @select="handleSelect" background-color="#f3f6f1"
                             active-text-color="#96bc29">
                        <el-menu-item index="/supplier">供应商管理</el-menu-item>
                        <el-menu-item index="/supply">供应品管理</el-menu-item>
                        <el-menu-item index="/goodsType">类型管理</el-menu-item>
                        <el-menu-item index="/goods">商品管理</el-menu-item>
                        <el-menu-item index="/vip">会员管理</el-menu-item>
                        <el-menu-item index="/need">需求管理</el-menu-item>
                        <el-menu-item index="/consume">订单管理</el-menu-item>
                        <el-menu-item index="/statistics">统计管理</el-menu-item>
                    </el-menu>
                </el-aside>
            </div>
            <div class="main-controller">
                <div v-if="currentPath === '/home'" class="home-info">
                    hello 管理员 选择操作开始编辑吧！
                </div>
                <div v-else>
                    <router-view/>
                </div>
            </div>
        </div>

        <!-- 尾部界面 -->
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "@/views/Header"
    import Footer from "@/views/Footer"

    export default {
        name: "Home",
        components: {Footer, Header},
        data() {
            return {
                currentPath: '/home',
                isRoot: false
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
            },
            handleSelect(path) {
                this.currentPath = path
                this.$router.replace(path)
            }
        }
    }
</script>

<style scoped>

    .home-info {

    }

    .main-controller {
        height: 780px;
        float: left;
        padding: 20px 0 0 20px;
    }

    .home-body {
        background-color: #f3f6f1;
    }

    .home-container {
        height: 900px;
    }

    .aside-class {
        height: 900px;
    }

</style>