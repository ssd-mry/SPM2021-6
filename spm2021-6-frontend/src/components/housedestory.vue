<template>
    <div id="housedestory">
        <el-table
                :data="tableData"
                :row-key="getRowKey"
                stripe
                border
                highlight-current-row
                @row-click="clickRow" ref="housedestoryTable"
                style="width: 100%"
                height="500"
                max-height="500"
                :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column
                    type="selection"
                    :reserve-selection="true"
                    width="40">
            </el-table-column>
            <!--        <el-table-column-->
            <!--          type="index"-->
            <!--          width="30">-->
            <!--        </el-table-column>-->
<!--            <el-table-column
                    prop="hid"
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
                    label="房屋位置"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="日期与时间"
                    sortable
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="basicallyIntactSquare"
                    label="基本受灾范围"
                    sortable
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="note"
                    label="严重程度"
                    width="50">
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
            <el-button @click="button1()">按钮1</el-button>
            <el-button @click="button2()">按钮2</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        "name": "housedestory",
        "data"() {
            return {
                "tableData": [
                    // {
                    //   location: 'Sichuan',
                    //   date: '2016-05-02',
                    //   basicallyIntactSquare:'这个字段是什么？',
                    //   note:'',
                    //   no:'1231243514355',
                    //   earthquakeId:'5',
                    //   ReportingUnit:'上报单位1'
                    // },
                    // {
                    //   location: 'Shanghai',
                    //   date: '2014-05-02',
                    //   basicallyIntactSquare:'这个字段是什么？',
                    //   note:'',
                    //   no:'1231243514354',
                    //   earthquakeId:'8',
                    //   ReportingUnit:'上报单位2'
                    // },
                    // {
                    //   location: 'Beijing',
                    //   date: '2016-06-02',
                    //   basicallyIntactSquare:'这个字段是什么？',
                    //   note:'这是注解',
                    //   no:'1231243514352',
                    //   earthquakeId:'1',
                    //   ReportingUnit:'上报单位6'
                    // },
                    // {
                    //   location: 'Sichuan',
                    //   date: '2016-05-02',
                    //   basicallyIntactSquare:'这个字段是什么？',
                    //   note:'',
                    //   no:'1231243514355',
                    //   earthquakeId:'5',
                    //   ReportingUnit:'上报单位1'
                    // },
                    // {
                    //   location: 'Sichuan',
                    //   date: '2016-05-02',
                    //   basicallyIntactSquare:'这个字段是什么？',
                    //   note:'',
                    //   no:'1231243514355',
                    //   earthquakeId:'5',
                    //   ReportingUnit:'上报单位1'
                    // },
                ],
                currentRow: null
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
                this.$refs.housedestoryTable.toggleRowSelection(row)
            },
            // button1() {
            //
            // },
            // button2() {
            //
            // },
            getRowKey(row) {
                return row.id
            },
            getContent(param) { //传给后端的参数
                var that = this;
                this.tableData = [];
                this.$axios({
                    "method": 'post',
                    "url": '/spm/data/dataSendHouseDestory', //访问后端的url
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
                    that.total = parseInt(that.tableData.pop())
                    console.log(that.tableData)
                }).catch(error => {
                    alert(error)
                    console.log(error)
                })
            },
            handleDelete(index, row) {
                var submit = {
                    sid: row.sid,
                    type: '基本震情数据'
                }
                this.$axios({
                    method: 'post',
                    url: '/spm/data/deleteHouseDestory', // 需要修改
                    contentType: 'application/json; charset=UTF-8', // 解决415错误
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    dataType: 'json',
                    data: JSON.stringify(submit)
                }).then(res => {
                    if (res.data === 'ok') {
                        this.$message.success("删除成功");
                        this.tableData.splice(index, 1)
                    } else {
                        this.$message.success("删除失败");
                    }
                }).catch(error => {
                    alert(error)
                    console.log(error)
                })
            }
        },
        mounted() {
            this.getContent()
        }
    }
</script>
