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
        :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column
          type="selection"
          :reserve-selection="true"
          width="40">
      </el-table-column>
      <!--        <el-table-column-->
      <!--          type="index"-->
      <!--          width="30">-->
      <!--        </el-table-column>-->
      <el-table-column
          prop="no"
          label="编码"
          width="200">
      </el-table-column>
      <el-table-column
          prop="location"
          label="人员伤亡位置"
          width="130">
      </el-table-column>
      <el-table-column
          prop="date"
          label="日期与时间"
          sortable
          width="100">
      </el-table-column>
      <el-table-column
          prop="number"
          label="伤亡人数"
          width="100">
      </el-table-column>
      <el-table-column
          prop="earthquakeId"
          label="地震编码"
          width="100">
      </el-table-column>
      <el-table-column
          prop="ReportingUnit"
          label="上报单位"
          width="200">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
  "name": "peopleinjured",
  "data"() {
    return {
      "tableData": [
        {
          location: 'Beijing',
          date: '2016-06-02',
          number:'19',
          no:'1231243514352',
          earthquakeId:'1',
          ReportingUnit:'上报单位6'
        },
        {
          location: 'Beijing',
          date: '2016-06-02',
          number:'19',
          no:'1231243514352',
          earthquakeId:'1',
          ReportingUnit:'上报单位6'
        },
        {
          location: 'Beijing',
          date: '2016-06-02',
          number:'19',
          no:'1231243514352',
          earthquakeId:'1',
          ReportingUnit:'上报单位6'
        },
        {
          location: 'Beijing',
          date: '2016-06-02',
          number:'19',
          no:'1231243514352',
          earthquakeId:'1',
          ReportingUnit:'上报单位6'
        },
        {
          location: 'Beijing',
          date: '2016-06-02',
          number:'19',
          no:'1231243514352',
          earthquakeId:'1',
          ReportingUnit:'上报单位6'
        },
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
    clickRow(row){
      this.$refs.peopleinjuredTable.toggleRowSelection(row)
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
    // "getContent"(limit, page, email) { //传给后端的参数，要改！！！
    //   var that = this;
    //   this.tableData = [];
    //   this.$axios({
    //     "method": 'post',
    //     "url": '/dataShare/download/findDownload', //访问后端的url，要改！！！
    //     "contentType": 'application/json; charset=UTF-8', // 解决415错误
    //     "headers": {'Content-Type': 'application/json;charset=UTF-8'},
    //     "dataType": 'json',
    //     "data": JSON.stringify({"page": page, "limit": limit, "email": email}) //传给后端的参数，要改！！！
    //   }).then(res => { //后端返回数据
    //     var string1 = res.data //储存数据
    //     var dataNum = string1.length //储存数据条数
    //     for (var i = 0; i < dataNum; i++) {
    //       var objectToInsert = JSON.parse(string1[i]);
    //       that.tableData.push(objectToInsert);
    //     }
    //     that.total = parseInt(that.tableData.pop())
    //     console.log(that.tableData)
    //   }).catch(error => {
    //     alert(error)
    //     console.log(error)
    //   })
    // }
  }
}
</script>