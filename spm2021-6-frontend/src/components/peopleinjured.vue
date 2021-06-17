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
          prop="pid"
          label=""
          sortable
          width="30">
      </el-table-column>
      <el-table-column
          prop="code"
          label="编码"
          sortable
          width="30">
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
          width="100">
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
      "tableData": [],
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
        "data": JSON.stringify({param:null}) //传给后端的参数
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
        bid: row.bid,
        type: '基本震情数据'
      }
      alert(row.bid)
      this.$axios({
        method: 'post',
        url: '/spm/data/addData', // 需要修改
        contentType: 'application/json; charset=UTF-8', // 解决415错误
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        dataType: 'json',
        data: JSON.stringify(submit)
      }).then(res => {
        if (res.data === 'ok') {
          this.$message.success("删除成功");
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
