<template>
    <div>
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
                            prop="vipId"
                            label="会员编号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="goodsId"
                            label="商品编号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="money"
                            label="出售价格"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="出售时间"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            label="详情"
                            width="200">
                        <template slot-scope="scope">
                            <el-button type="success" @click="showDetails(scope.row.id)">详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="删除"
                            width="200">
                        <template slot-scope="scope">
                            <el-button type="danger" @click="deleteData(scope.row.id)">删除</el-button>
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
                    title="订单详情"
                    :visible.sync="dialogVisible"
                    width="60%">
                        <span>
                            <el-descriptions>
                                <el-descriptions-item label="编号">{{consume.id}}</el-descriptions-item>
                                <el-descriptions-item label="会员编号">{{consume.vipId}}</el-descriptions-item>
                                <el-descriptions-item label="商品编号">{{consume.goodsId}}</el-descriptions-item>
                                <el-descriptions-item label="出售价格">{{consume.money}}</el-descriptions-item>
                                <el-descriptions-item label="销售时间">{{consume.createTime}}</el-descriptions-item>
                                <el-descriptions-item label="所属类型编号">{{consume.goodsType}}</el-descriptions-item>
                                <el-descriptions-item label="商品名称">{{consume.goodsName}}</el-descriptions-item>
                                <el-descriptions-item label="入库价格">{{consume.inMoney}}</el-descriptions-item>
                                <el-descriptions-item label="会员名称">{{consume.vipName}}</el-descriptions-item>
                            </el-descriptions>
                        </span>
                <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="closeInfo">关 闭</el-button>
                        </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>

    import ConsumeApi from "@/api/consume/ConsumeApi";

    export default {
        name: "Consume",
        data() {
            return {
                data: [], // 分页数据
                total: 10, // 总记录数量
                size: 5, // 一页几条
                current: 1,
                dialogVisible: false,
                consume: {
                    id: null,
                },
                updateDialogVisible: false,
            }
        },
        methods: {
            showDetails(id) {
                ConsumeApi.get(id).then(resp => {
                    this.consume = resp.data.data;
                    this.dialogVisible = true
                })
            },
            closeInfo() {
                this.dialogVisible = false
            },
            deleteData(id) {
                ConsumeApi.deleteData(id).then(resp => {
                    if (resp.data.code == 200) {
                        this.$message.success("删除成功");
                        this.page()
                    } else {
                        this.$message.error(resp.data.msg);
                    }
                })
            },
            page() {
                ConsumeApi.page(this.current, this.size).then(resp => {
                    console.log(resp.data.data)
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
            },
            getAllSupplier() {
                ConsumeApi.getAll().then(resp => {
                    this.suppliers = resp.data.data;
                })
            }
        },
        created() {
            this.page()
        }
    }
</script>

<style scoped>

</style>