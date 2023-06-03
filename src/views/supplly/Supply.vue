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
                            prop="price"
                            label="价格"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="supplierId"
                            label="供应商编号"
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
                    title="添加供应商商品"
                    :visible.sync="dialogVisible"
                    width="30%">
                <span>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-input v-model="supply.name" placeholder="请输入商品名称">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-input v-model="supply.price" placeholder="请输入价格">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-select v-model="supply.supplierId" placeholder="请选择供应商">
                                    <el-option
                                            v-for="item in suppliers"
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
                    title="添加供应商商品"
                    :visible.sync="updateDialogVisible"
                    width="30%">
                <span>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-input v-model="supply.name" placeholder="请输入商品名称">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-input v-model="supply.price" placeholder="请输入价格">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-select v-model="supply.supplierId" placeholder="请选择供应商">
                                    <el-option
                                            v-for="item in suppliers"
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
                    <el-button @click="updateDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="update">更 新</el-button>
                </span>
            </el-dialog>
        </div>

    </div>

</template>

<script>
    import SupplyApi from "@/api/supply/SupplyApi";
    import SupplierApi from "@/api/supplier/SupplierApi";

    export default {
        name: "Supply",
        data() {
            return {
                data: [], // 分页数据
                total: 10, // 总记录数量
                size: 5, // 一页几条
                current: 1,
                dialogVisible: false,
                supply: {
                    id: null,
                    name: '',
                    price: null,
                    supplierId: null
                },
                suppliers: [],
                updateDialogVisible: false,
            }
        },
        methods: {
            update() {
                SupplyApi.update(this.supply).then(resp => {
                    this.page();
                    this.updateDialogVisible = false;
                })
            },
            updateView(id) {
                this.getAllSupplier();
                SupplyApi.get(id).then(resp => {
                    this.supply = resp.data.data
                    this.updateDialogVisible = true;
                })
            },
            addView() {
                this.supply = {
                    id: null,
                    name: '',
                    price: null,
                    supplierId: null
                }
                this.getAllSupplier();
                this.dialogVisible = true;
            },
            save() {
                SupplyApi.add(this.supply).then(resp => {
                    this.dialogVisible = false;
                    this.page()
                })
            },
            deleteData(id) {
                SupplyApi.deleteData(id).then(resp => {
                    if (resp.data.code == 200) {
                        this.$message.success("删除成功");
                        this.page()
                    } else {
                        this.$message.error(resp.data.msg);
                    }
                })
            },
            page() {
                SupplyApi.page(this.current, this.size).then(resp => {
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
                SupplierApi.getAll().then(resp => {
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