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
                            prop="phone"
                            label="联系方式"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="grade"
                            label="等级"
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
                    title="添加供应商"
                    :visible.sync="updateDialogVisible"
                    width="30%">
                <span>

                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-input v-model="supplier.name" placeholder="请输入供应商名称">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-input v-model="supplier.phone" placeholder="请输入联系方式">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-select v-model="supplier.grade" placeholder="请选择等级">
                                    <el-option
                                            v-for="item in options"
                                            :key="item"
                                            :label="item"
                                            :value="item">
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

        <div>
            <el-dialog
                    title="添加供应商"
                    :visible.sync="dialogVisible"
                    width="30%">
                <span>

                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-input v-model="supplier.name" placeholder="请输入供应商名称">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-input v-model="supplier.phone" placeholder="请输入联系方式">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-select v-model="supplier.grade" placeholder="请选择等级">
                                    <el-option
                                            v-for="item in options"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="save">更 新</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import SupplierApi from "@/api/supplier/SupplierApi";

    export default {
        name: "Supplier",
        data() {
            return {
                data: [], // 分页数据
                total: 10, // 总记录数量
                size: 5, // 一页几条
                current: 1,
                dialogVisible: false,
                supplier: {
                    id: null,
                    name: '',
                    grade: 1,
                    phone: ''
                },
                options: [1, 2, 3, 4, 5], // 等级
                updateDialogVisible: false,
            }
        },
        methods: {
            update() {
                SupplierApi.update(this.supplier).then(resp => {
                    this.page()
                    this.updateDialogVisible = false;
                })
            },
            updateView(id) {
                SupplierApi.get(id).then(resp => {
                    this.supplier = resp.data.data
                    this.updateDialogVisible = true
                })
            },
            addView() {
                this.supplier = {
                    id: null,
                    name: '',
                    grade: 1,
                    phone: ''
                }
                this.dialogVisible = true;
            },
            save() {
                SupplierApi.add(this.supplier).then(resp => {
                    this.dialogVisible = false;
                    this.page()
                })
            },
            deleteData(id) {
                SupplierApi.deleteData(id).then(resp => {
                    if (resp.data.code == 200) {
                        this.$message.success("删除成功");
                        this.page()
                    } else {
                        this.$message.error(resp.data.msg);
                    }
                })
            },
            page() {
                SupplierApi.page(this.current, this.size).then(resp => {
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