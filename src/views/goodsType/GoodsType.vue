<template>
    <div>
        <div>
            <el-button type="primary" @click="addView">添 加</el-button>
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
                            prop="supplierId"
                            label="供应商编号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="supplyId"
                            label="供应品编号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="number"
                            label="数量"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            label="更新"
                            width="100">
                        <template slot-scope="scope">
                            <el-button type="info" @click="inGoods(scope.row.id)">进 货</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="删除"
                            width="100">
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
                    title="添加商品"
                    :visible.sync="dialogVisible"
                    width="30%">
                <span>
                     <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-select v-model="goodsType.supplyId"
                                           placeholder="请选择进货源头">
                                    <el-option
                                            v-for="item in supplies"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
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
                    title="进 货"
                    :visible.sync="inDialogVisible"
                    width="30%">
                <span>
                     <el-row>
                         <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-input v-model="goods.name" disabled></el-input>
                            </div>
                        </el-col>
                         <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-input v-model="goods.inPrice" disabled></el-input>
                            </div>
                        </el-col>
                         <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-input v-model="goods.outPrice" placeholder="出售价格"></el-input>
                            </div>
                        </el-col>
                         <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-date-picker
                                        v-model="goods.overTime"
                                        type="datetime"
                                        placeholder="过期时间">
                                </el-date-picker>
                            </div>
                        </el-col>
                    </el-row>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="inDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveGoods">添 加</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import GoodsTypeApi from "@/api/goodsType/GoodsTypeApi";
    import SupplyApi from "@/api/supply/SupplyApi";
    import GoodsApi from "@/api/goods/GoodsApi";

    export default {
        name: "GoodType",
        data() {
            return {
                data: [], // 分页数据
                total: 10, // 总记录数量
                size: 5, // 一页几条
                current: 1,
                dialogVisible: false,
                goodsType: {
                    id: null,
                    name: '',
                    supplierId: null,
                    number: 0,
                    supplyId: null,
                    price: null
                },
                updateDialogVisible: false,
                supplies: [],
                goods: {
                    id: null,
                    name: '',
                    inPrice: null,
                    createTime: null,
                    overTime: null,
                    goodsType: null,
                    outPrice: null,
                },
                inDialogVisible: false
            }
        },
        methods: {
            saveGoods() {
                GoodsApi.add(this.goods).then(resp => {
                    this.inDialogVisible = false;
                    this.page()
                })
            },
            inGoods(id) { // 进货
                GoodsTypeApi.get(id).then(resp => {
                    this.goodsType = resp.data.data;
                    this.goods.inPrice = resp.data.data.price;
                    this.goods.name = resp.data.data.name
                    this.goods.goodsType = id
                    this.goodsType = {
                        id: null,
                        name: '',
                        supplierId: null,
                        number: 0,
                        supplyId: null,
                        price: null
                    }
                    this.inDialogVisible = true
                })
            },
            update() {
                GoodsTypeApi.update(this.supplier).then(resp => {
                    this.page()
                    this.updateDialogVisible = false;
                })
            },
            updateView(id) {
                GoodsTypeApi.get(id).then(resp => {
                    this.goodsType = resp.data.data
                    this.updateDialogVisible = true
                })
            },
            addView() {
                SupplyApi.getAll().then(resp => {
                    this.supplies = resp.data.data
                    this.goodsType = {
                        id: null,
                        name: '',
                        supplierId: null,
                        number: 0,
                        supplyId: null,
                        price: null
                    }
                    this.dialogVisible = true;
                })
            },
            save() {
                GoodsTypeApi.add(this.goodsType).then(resp => {
                    if (resp.data.code != 200) {
                        this.$message.error(resp.data.msg);
                    } else {
                        this.dialogVisible = false;
                        this.page()
                    }
                })
            },
            deleteData(id) {
                GoodsTypeApi.deleteData(id).then(resp => {
                    if (resp.data.code == 200) {
                        this.$message.success("删除成功");
                        this.page()
                    } else {
                        this.$message.error(resp.data.msg);
                    }
                })
            },
            page() {
                GoodsTypeApi.page(this.current, this.size).then(resp => {
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
        },
        created() {
            this.page()
        }
    }
</script>

<style scoped>

</style>