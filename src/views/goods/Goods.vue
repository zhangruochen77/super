<template>
    <div>
        <div>
            <el-row>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-input v-model="goodsId" placeholder="输入商品编号"></el-input>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" @click="showGoodsById()">查 找</el-button>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-badge :value="overCount">
                            <el-button type="info" @click="overGoods">过 期</el-button>
                        </el-badge>
                    </div>
                </el-col>
            </el-row>
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
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="inPrice"
                            label="进货价格"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="outPrice"
                            label="出售价格"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="进货时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="goodsType"
                            label="所属类型编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="overTime"
                            label="过期时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="出 售"
                            width="100">
                        <template slot-scope="scope">
                            <el-button type="info" @click="showGoods(scope.row.id)">出售</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="销 毁"
                            width="100">
                        <template slot-scope="scope">
                            <el-button type="danger" @click="deleteData(scope.row.id)">销毁</el-button>
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
                    title="商品信息"
                    :visible.sync="showGoodsVisible"
                    width="50%">
                <span>
                    <el-descriptions>
                        <el-descriptions-item label="编号">{{goods.id}}</el-descriptions-item>
                        <el-descriptions-item label="名称">{{goods.name}}</el-descriptions-item>
                        <el-descriptions-item label="进货价格">{{goods.inPrice}}</el-descriptions-item>
                        <el-descriptions-item label="出售价格">{{goods.outPrice}}</el-descriptions-item>
                        <el-descriptions-item label="进货时间">{{goods.createTime}}</el-descriptions-item>
                        <el-descriptions-item label="所属类型编号">{{goods.goodsType}}</el-descriptions-item>
                        <el-descriptions-item label="过期时间">{{goods.overTime}}</el-descriptions-item>
                    </el-descriptions>
                    <el-input v-model="vipPhone" placeholder="会员手机编号"></el-input>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showGoodsVisible = false">关 闭</el-button>
                    <el-button type="primary" @click="soldByVip">会员出售</el-button>
                    <el-button type="primary" @click="sold">出 售</el-button>
            </span>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                    title="过期商品"
                    :visible.sync="overGoodsVisible"
                    width="70%">
                <span>
                    <el-table
                            :data="overData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="id"
                                label="编号"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="inPrice"
                                label="进货价格"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="outPrice"
                                label="出售价格"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="createTime"
                                label="进货时间"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="goodsType"
                                label="所属类型编号"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="overTime"
                                label="过期时间"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                label="销 毁"
                                width="100">
                            <template slot-scope="scope">
                                <el-button type="danger" @click="overDeleteData(scope.row.id)">销毁</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteClose()">关 闭</el-button>
                    <el-button type="primary" @click="deleteAllOver()">一键销毁</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>

    import GoodsApi from "@/api/goods/GoodsApi";
    import SupplyApi from "@/api/supply/SupplyApi";

    export default {
        name: "Goods",
        data() {
            return {
                data: [], // 分页数据
                total: 10, // 总记录数量
                size: 5, // 一页几条
                current: 1,
                dialogVisible: false,
                goods: {
                    id: null,
                    name: '',
                    inPrice: null,
                    createTime: null,
                    goodsType: null,
                    overTime: null,
                    outPrice: null,
                },
                updateDialogVisible: false,
                supplies: [],
                overCount: 0,
                goodsId: null,
                showGoodsVisible: false,
                vipPhone: null,
                overData: [],
                overGoodsVisible: false
            }
        },
        methods: {
            deleteClose() {
                this.page()
                this.overCountFun()
                this.overGoodsVisible = false
            },
            deleteAllOver() {
                GoodsApi.deleteAllOver().then(resp => {
                    this.$message.success(resp.data.msg);
                    this.overGoods()
                })
            },
            overGoods() {
                GoodsApi.pageOver(1, 5).then(resp => {
                    this.overData = resp.data.data.records;
                    this.overGoodsVisible = true
                })
            },
            showGoodsById() {
                this.showGoods(this.goodsId);
            },
            showGoods(goodsId) {
                if (goodsId === null) {
                    this.$message.info("请输入商品编号")
                } else {
                    this.getGoodsById(goodsId)
                }
            },
            sold() {
                GoodsApi.sold(this.goods.id).then(resp => {
                    if (resp.data.code == 500) {
                        this.$message.error(resp.data.msg);
                    } else {
                        this.showGoodsVisible = false
                        this.$message.success("出售成功")
                        this.goods = {
                            id: null,
                            name: '',
                            inPrice: null,
                            createTime: null,
                            goodsType: null,
                            overTime: null,
                            outPrice: null,
                        }
                        this.goodsId = null
                        this.page()
                    }
                })
            },
            soldByVip() {
                if (!this.vipPhone) {
                    this.$message.error("请输入会员手机号码");
                } else {
                    GoodsApi.soldByVip(this.goods.id, this.vipPhone).then(resp => {
                        if (resp.data.code == 500) {
                            this.$message.error(resp.data.msg);
                        } else {
                            this.$message.success(resp.data.msg)
                            this.showGoodsVisible = false
                            this.goods = {
                                id: null,
                                name: '',
                                inPrice: null,
                                createTime: null,
                                goodsType: null,
                                overTime: null,
                                outPrice: null,
                            }
                            this.goodsId = null
                            this.page()
                        }
                    })
                }
            },
            getGoodsById(id) {
                GoodsApi.get(id).then(resp => {
                    this.goods = resp.data.data;
                    console.log(this.goods)
                    if (this.goods) {
                        this.showGoodsVisible = true
                    } else {
                        this.$message.error("不存在商品信息")
                    }
                })
            },
            update() {
                GoodsApi.update(this.supplier).then(resp => {
                    this.page()
                    this.updateDialogVisible = false;
                })
            },
            updateView(id) {
                GoodsApi.get(id).then(resp => {
                    this.goods = resp.data.data
                    this.updateDialogVisible = true
                })
            },
            addView() {
                SupplyApi.getAll().then(resp => {
                    this.supplies = resp.data.data
                    this.goods = {
                        id: null,
                        name: '',
                        inPrice: null,
                        createTime: null,
                        goodsType: null,
                        overTime: null,
                        outPrice: null,
                    }
                    this.dialogVisible = true;
                })
            },
            save() {
                GoodsApi.add(this.goods).then(resp => {
                    this.dialogVisible = false;
                    this.page()
                })
            },
            overDeleteData(id) {
                this.deleteData(id)
                this.overGoods();
            },
            deleteData(id) {
                GoodsApi.deleteData(id).then(resp => {
                    if (resp.data.code == 200) {
                        this.$message.success("删除成功");
                        this.page()
                    } else {
                        this.$message.error(resp.data.msg);
                    }
                })
            },
            page() {
                GoodsApi.page(this.current, this.size).then(resp => {
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
            overCountFun() {
                GoodsApi.overCount().then(resp => {
                    this.overCount = resp.data.data;
                })
            }
        },
        created() {
            this.page();
            this.overCountFun();
        }
    }
</script>

<style scoped>

</style>