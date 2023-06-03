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
                            label="提供者"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="createBy"
                            label="会员编号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="value"
                            label="需求"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="创建时间"
                            width="200">
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
                    title="添加需求"
                    :visible.sync="dialogVisible"
                    width="30%">
                <span>

                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-input v-model="need.value" placeholder="请输入需求">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-select v-model="need.createBy" placeholder="请选择会员">
                                    <el-option
                                            v-for="item in vips"
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
    </div>
</template>

<script>
    import NeedApi from "@/api/need/NeedApi";
    import VipApi from "@/api/vip/VipApi";

    export default {
        name: "Need",
        data() {
            return {
                data: [], // 分页数据
                total: 10, // 总记录数量
                size: 5, // 一页几条
                current: 1,
                dialogVisible: false,
                need: {
                    id: null,
                    name: '',
                    createBy: null,
                    createTime: null,
                    value: null
                },
                vips: []
            }
        },
        methods: {
            addView() {
                this.need = {
                    id: null,
                    name: '',
                    createBy: null,
                    createTime: null
                }
                this.getAllVips()
                this.dialogVisible = true;
            },
            save() {
                NeedApi.add(this.need).then(resp => {
                    this.dialogVisible = false;
                    this.page()
                })
            },
            deleteData(id) {
                NeedApi.deleteData(id).then(resp => {
                    if (resp.data.code == 200) {
                        this.$message.success("删除成功");
                        this.page()
                    } else {
                        this.$message.error(resp.data.msg);
                    }
                })
            },
            page() {
                NeedApi.page(this.current, this.size).then(resp => {
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
            getAllVips() {
                VipApi.getAll().then(resp => {
                    this.vips = resp.data.data;
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