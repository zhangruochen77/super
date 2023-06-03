<template>
    <div>
        <div>
            <el-button type="primary" @click="addView">添加</el-button>
        </div>
        <div>
            <template>
                <el-table
                        :data="data"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="编号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="名称"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="money"
                            label="余额"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机号码"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            label="更新"
                            width="200">
                        <template slot-scope="scope">
                            <el-button type="info" @click="updateView(scope.row.id)">更新</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="充值"
                            width="200">
                        <template slot-scope="scope">
                            <el-button type="info" @click="addMoney(scope.row.id)">充值</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="删除"
                            width="200">
                        <template slot-scope="scope">
                            <el-button type="danger" @click="deleteData(scope.row.id)">注销</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="current"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>


        <div>
            <el-dialog
                    title="添加会员"
                    :visible.sync="dialogVisible"
                    width="30%">
                <span>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-input v-model="vip.name" placeholder="请输入会员名称">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-input v-model="vip.money" placeholder="请输入会员充值">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-input v-model="vip.phone" placeholder="请输入会员手机号码">
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save">添 加</el-button>
                </span>
            </el-dialog>
        </div>

        <div>
            <el-dialog
                    title="更新会员"
                    :visible.sync="updateDialogVisible"
                    width="30%">
                <span>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-input v-model="vip.name" placeholder="请输入会员名称">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-input v-model="vip.phone" placeholder="请输入会员手机号码">
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="updateDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="update">更 新</el-button>
                </span>
            </el-dialog>
        </div>

        <div>
            <el-dialog
                    title="充值"
                    :visible.sync="moneyVisible"
                    width="30%">
                <span>
                    <div class="grid-content bg-purple">
                        <el-input v-model="money" placeholder="输入充值数量">
                        </el-input>
                    </div>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="moneyVisible = false">取 消</el-button>
                    <el-button type="primary" @click="toAddMoney">充 值</el-button>
                </span>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import VipApi from "@/api/vip/VipApi";

    export default {
        name: "Vip",
        data() {
            return {
                data: [], // 分页数据
                total: 10, // 总记录数量
                size: 5, // 一页几条
                current: 1,
                dialogVisible: false,
                vip: {
                    id: null,
                    name: '',
                    money: null,
                    phone: null
                },
                updateDialogVisible: false,
                money: null,
                vipId: null,
                moneyVisible: false
            }
        },
        methods: {
            toAddMoney() {
                VipApi.addMoney(this.vipId, this.money).then(resp => {
                    if (resp.data.code == 200) {
                        this.$message.success(resp.data.msg)
                        this.moneyVisible = false
                        this.page()
                    } else {
                        this.$message.error(resp.data.msg)
                    }
                })
            },
            addMoney(id) {
                this.vipId = id
                this.money = null
                this.moneyVisible = true
            },
            update() {
                VipApi.update(this.vip).then(resp => {
                    if (resp.data.code == 500) {
                        this.$message.error(resp.data.msg)
                    } else {
                        this.page();
                        this.updateDialogVisible = false;
                    }
                })
            },
            updateView(id) {
                VipApi.get(id).then(resp => {
                    if (resp.data.code == 500) {
                        this.$message.error(resp.data.msg)
                    } else {
                        this.vip = resp.data.data
                        this.updateDialogVisible = true;
                        this.page()
                    }
                })
            },
            addView() {
                this.dialogVisible = true;
                this.vip = {
                    id: null,
                    name: '',
                    money: null,
                    phone: null
                }
            },
            save() {
                VipApi.add(this.vip).then(resp => {
                    if (resp.data.code == 500) {
                        this.$message.error(resp.data.msg)
                    } else {
                        this.dialogVisible = false;
                        this.page()
                    }
                })
            },
            deleteData(id) {
                VipApi.deleteData(id).then(resp => {
                    if (resp.data.code == 200) {
                        this.$message.success("删除成功");
                        this.page()
                    } else {
                        this.$message.error(resp.data.msg);
                    }
                })
            },
            page() {
                VipApi.page(this.current, this.size).then(resp => {
                    this.data = resp.data.data.records;
                    this.total = resp.data.data.total;
                })
            },

            handleSizeChange(size) {
                this.size = size;
                this.page();
            },
            handleCurrentChange(current = 1) {
                this.current = current;
                this.page();
            }
        },
        created() {
            this.page()
        }
    }
</script>

<style scoped>

</style>