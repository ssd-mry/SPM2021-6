<template>
    <div id="peopleinjured">
        <el-table
                :data="tableData"
                :row-key="getRowKey"
                stripe
                border
                highlight-current-row
                @row-click="clickRow" ref="peopleinjuredTable"
                style="width: 100%"
                height="500"
                max-height="500"
                :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column
                    type="selection"
                    :reserve-selection="true"
                    width="40">
            </el-table-column>
<!--            <el-table-column
                    prop="pid"
                    label=""
                    sortable
                    width="30">
            </el-table-column>-->
            <el-table-column
                    prop="code"
                    label="编码"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="location"
                    label="人员伤亡位置"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="日期与时间"
                    sortable
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="number"
                    label="伤亡人数"
                    sortable
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="earthquakeId"
                    label="地震编码"
                    sortable
                    width="230">
            </el-table-column>
            <el-table-column
                    prop="reportingUnit"
                    label="上报单位"
                    width="200">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="success"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="dialogFormVisible = true">添加数据</el-button>
        </div>

        <el-dialog title="添加数据" @close="resetForm()"
                   :close-on-click-modal="false" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" label-width="formLabelWidth" :rules="rules">
                <el-form-item label="位置" :label-width="formLabelWidth" prop="selectedOptions">
                    <el-cascader
                            size="large"
                            :options="form.options"
                            style="width: 100%;"
                            v-model="form.selectedOptions"
                            @change="handleChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="乡(街道)" :label-width="formLabelWidth" prop="town">
                    <el-input v-model="form.town" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="村(居委会)" :label-width="formLabelWidth" prop="village">
                    <el-input v-model="form.village" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="日期时间" :label-width="formLabelWidth" prop="date">
                    <el-date-picker
                            v-model="form.date"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            style="width: 100%;"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="数据类型" :label-width="formLabelWidth" prop="category">
                    <el-select v-model="form.category" placeholder="请选择上报数据类型" style="width: 100%">
                        <el-option label="人员受伤" value="人员受伤"></el-option>
                        <el-option label="人员死亡" value="人员死亡"></el-option>
                        <el-option label="人员失踪" value="人员失踪"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="伤亡人数" :label-width="formLabelWidth" prop="number">
                    <el-input v-model.number="form.number" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上报单位" :label-width="formLabelWidth" prop="reportingUnit">
                    <el-input v-model="form.reportingUnit" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add('form')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {regionData, CodeToText} from 'element-china-area-data'

    export default {
        "name": "peopleinjured",
        "data"() {
            return {
                "tableData": [],
                currentRow: null,
                dialogFormVisible: false,
                form: {
                    options: regionData,
                    selectedOptions: [],
                    province: '',
                    city: '',
                    country: '',
                    town: '',
                    village: '',
                    type: '人员伤亡及失踪数据',
                    date: '',
                    reportingUnit: '',
                    number: '',
                    category: '',
                },
                rules: {
                    selectedOptions: [
                        {required: true, message: "请选择位置", trigger: "change"},
                    ],
                    town: [
                        {required: true, message: "请输入乡（街道）", trigger: "change"},
                    ],
                    village: [
                        {required: true, message: "请输入村（居委会）", trigger: "change"},
                    ],
                    date: [
                        {required: true, message: "请选择日期时间", trigger: "change"},
                    ],
                    reportingUnit: [
                        {required: true, message: "请输入上报单位", trigger: "change"},
                    ],
                    category: [
                        {required: true, message: "请选择数据类型", trigger: "change"},
                    ],
                    number:[
                        {required: true, message: "请输入伤亡人数", trigger: "change"},
                        {type: 'number', message: '伤亡人数必须为数字值'}
                    ]
                },
                formLabelWidth: '120px',
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },

            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },

            clickRow(row) {
                this.$refs.peopleinjuredTable.toggleRowSelection(row)
            },

            handleChange(value) {
                //console.log(value)
                //console.log(this.form.selectedOptions)
            },

            resetForm() {
                this.$refs['form'].resetFields();
            },

            getRowKey(row) {
                return row.id
            },

            getContent(param) { //传给后端的参数
                var that = this;
                this.tableData = [];
                this.$axios({
                    "method": 'post',
                    "url": '/spm/data/dataSendPeopleInjured', //访问后端的url
                    "contentType": 'application/json; charset=UTF-8', // 解决415错误
                    "headers": {'Content-Type': 'application/json;charset=UTF-8'},
                    "dataType": 'json',
                    "data": JSON.stringify({param: null}) //传给后端的参数
                }).then(res => { //后端返回数据
                    var string1 = res.data //储存数据
                    var dataNum = string1.length //储存数据条数
                    for (var i = 0; i < dataNum; i++) {
                        var objectToInsert = JSON.parse(string1[i]);
                        that.tableData.push(objectToInsert);
                    }
                }).catch(error => {
                    alert(error)
                    console.log(error)
                })
            },

            handleDelete(index, row) {
                var submit = {
                    pid: row.pid,
                }
                this.$axios({
                    method: 'post',
                    url: '/spm/data/deletePeopleInjured', // 需要修改
                    contentType: 'application/json; charset=UTF-8', // 解决415错误
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    dataType: 'json',
                    data: JSON.stringify(submit)
                }).then(res => {
                    if (res.data === 'ok') {
                        this.$message.success("删除成功");
                        this.tableData.splice(index,1)
                    } else {
                        this.$message.success("删除失败");
                    }
                }).catch(error => {
                    alert(error)
                    console.log(error)
                })
            },

            add(formName) {
                var that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let submit = {
                            dataType: that.form.type,
                            province: CodeToText[that.form.selectedOptions[0]],
                            city: CodeToText[that.form.selectedOptions[1]],
                            country: CodeToText[that.form.selectedOptions[2]],
                            town: that.form.town,
                            village: that.form.village,
                            date: that.form.date,
                            number: that.form.number,
                            reportingUnit: that.form.reportingUnit,
                            category: that.form.category
                        }
                        this.$axios({
                            method: 'post',
                            url: '/spm/data/addData',
                            contentType: 'application/json; charset=UTF-8', // 解决415错误
                            headers: {'Content-Type': 'application/json;charset=UTF-8'},
                            dataType: 'json',
                            data: JSON.stringify(submit)
                        }).then(res => { // 注意：后端需要返回userID
                            this.$refs['form'].resetFields();
                            if (res.data === 'ok') {
                                this.$message.success("添加成功");
                                /*let submit = {
                                    dataType: that.form.type,
                                    province: CodeToText[that.form.selectedOptions[0]],
                                    city: CodeToText[that.form.selectedOptions[1]],
                                    country: CodeToText[that.form.selectedOptions[2]],
                                    town: that.form.town,
                                    village: that.form.village,
                                    date: that.form.date,
                                    number: that.form.number,
                                    reportingUnit: that.form.reportingUnit,
                                    category: that.form.category
                                }
                                this.tableData.push()*/
                            } else {
                                this.$message.success("添加失败");
                            }
                        }).catch(error => {
                            alert(error)
                            console.log(error)
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                });
            },
        },
        mounted() {
            this.getContent()
        }
    }
</script>
