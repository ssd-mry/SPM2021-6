<template>
  <div id="basicshock">
    <el-table
        :data="tableData"
        :row-key="getRowKey"
        stripe
        border
        highlight-current-row
        @row-click="clickRow" ref="basicshockTable"
        style="width: 100%"
        height="500"
        max-height="800"
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
      <el-table-column
          prop="no"
          label="编码"
          width="200">
      </el-table-column>
      <el-table-column
          prop="location"
          label="震源位置"
          width="130">
      </el-table-column>
      <el-table-column
          prop="date"
          label="日期与时间"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="epi_lon"
          label="经度"
          width="100">
      </el-table-column>
      <el-table-column
          prop="epi_lat"
          label="纬度"
          width="100">
      </el-table-column>
      <el-table-column
          prop="mag"
          label="震级"
          sortable
          width="90">
      </el-table-column>
      <el-table-column
          prop="picture"
          label="图片"
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
              @click="getModify(scope.row)">编辑
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
      <el-button @click="handleOpen">添加数据</el-button>
    </div>
    <el-dialog title="添加数据" @close="resetForm()"
               :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" label-width="formLabelWidth" :rules="rules">
        <el-form-item label="位置" :label-width="formLabelWidth" prop="selectedOptions">
          <el-cascader
              size="large"
              :options="form.options"
              style="width: 270px;margin-left: -360px;"
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
              style="width: 270px;margin-left: -360px;"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form :inline="true" style="margin-left: -95px;" :rules="rules" :model="form"
                 ref="form2" class="demo-form-inline" :label-width="formLabelWidth">
          <el-form-item label="经度" prop="longitude">
            <el-input v-model="form.longitude" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="纬度" prop="latitude">
            <el-input v-model="form.latitude" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true" style="margin-left: -95px;" :rules="rules" :model="form"
                 ref="form3" class="demo-form-inline" :label-width="formLabelWidth">
          <el-form-item :inline="true" label="震源深度" prop="depth">
            <el-input v-model="form.depth" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :inline="true" label="震级" prop="magnitude">
            <el-input v-model="form.magnitude" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
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
import {regionData, CodeToText, TextToCode} from 'element-china-area-data'

export default {
  "name": "basicshock",
  "data"() {
    return {
      dialogFormVisible: false,
      form: {
        isAdd: true,
        id: '',
        options: regionData,
        selectedOptions: [],
        province: '',
        city: '',
        country: '',
        town: '',
        village: '',
        type: '基本震情数据',
        date: '',
        longitude: '',
        latitude: '',
        depth: '',
        magnitude: '',
        reportingUnit: '',
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
        longitude: [
          {required: true, message: "请输入经度", trigger: "change"},
        ],
        latitude: [
          {required: true, message: "请输入纬度", trigger: "change"},
        ],
        depth: [
          {required: true, message: "请输入震源位置", trigger: "change"},
        ],
        magnitude: [
          {required: true, message: "请输入震级", trigger: "change"},
        ],
        reportingUnit: [
          {required: true, message: "请输入上报单位", trigger: "change"},
        ],
      },
      formLabelWidth: '120px',
      "tableData": [],
      currentRow: null
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    handleOpen(key, keyPath) {
      this.dialogFormVisible = true;
      this.isAdd = true;
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickRow(row) {
      this.$refs.basicshockTable.toggleRowSelection(row)
    },
    getRowKey(row) {
      return row.id
    },
    getContent() { //传给后端的参数，要改！！！
      var that = this;
      this.tableData = [];
      this.$axios({
        method: 'post',
        url: '/spm/data/dataSendBasicShock', //访问后端的url，要改！！！
        contentType: 'application/json; charset=UTF-8', // 解决415错误
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        dataType: 'json',
        data: JSON.stringify({}) //传给后端的参数，要改！！！
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
    add(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            let submit = {
              dataType: that.form.type,
              province: CodeToText[that.form.selectedOptions[0]],
              city: CodeToText[that.form.selectedOptions[1]],
              country: CodeToText[that.form.selectedOptions[2]],
              town: that.form.town,
              village: that.form.village,
              date: that.form.date,
              longitude: that.form.longitude,
              latitude: that.form.latitude,
              depth: that.form.depth,
              magnitude: that.form.magnitude,
              reportingUnit: that.form.reportingUnit
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
              this.$refs['form2'].resetFields();
              this.$refs['form3'].resetFields();
              if (res.data === 'ok') {
                this.$message.success("添加成功");
              } else {
                this.$message.success("添加失败");
              }
            }).catch(error => {
              alert(error)
              console.log(error)
            })
          } else {
            let submit = {
              type: that.form.type,
              id: that.id,
              province: CodeToText[that.form.selectedOptions[0]],
              city: CodeToText[that.form.selectedOptions[1]],
              country: CodeToText[that.form.selectedOptions[2]],
              town: that.form.town,
              village: that.form.village,
              date: that.form.date,
              longitude: that.form.longitude,
              latitude: that.form.latitude,
              depth: that.form.depth,
              magnitude: that.form.magnitude,
              reportingUnit: that.form.reportingUnit
            }
            this.$axios({
              method: 'post',
              url: '/spm/data/updateData',
              contentType: 'application/json; charset=UTF-8', // 解决415错误
              headers: {'Content-Type': 'application/json;charset=UTF-8'},
              dataType: 'json',
              data: JSON.stringify(submit)
            }).then(res => { // 注意：后端需要返回userID
              this.$refs['form'].resetFields();
              this.$refs['form2'].resetFields();
              this.$refs['form3'].resetFields();
              if (res.data === 1) {
                this.$message.success("修改成功");
              } else {
                this.$message.success("修改失败");
              }
            }).catch(error => {
              alert(error)
              console.log(error)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    getModify(row) {
      var that = this;
      this.id = row.bid;
      this.dialogFormVisible = true
      this.isAdd = false
      let submit = {
        type: this.form.type,
        id: row.bid
      }
      this.$axios({
        method: 'post',
        url: '/spm/data/sendDataById',
        contentType: 'application/json; charset=UTF-8', // 解决415错误
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        dataType: 'json',
        data: JSON.stringify(submit)
      }).then(res => { // 注意：后端需要返回userID
        that.form.selectedOptions.push((TextToCode[res.data.province]).code)
        that.form.selectedOptions.push((TextToCode[res.data.province][res.data.city]).code)
        that.form.selectedOptions.push((TextToCode[res.data.province][res.data.city][res.data.country]).code)
        console.log(that.form.selectedOptions)
        that.form.town = res.data.town
        that.form.village = res.data.village
        that.form.date = res.data.date
        that.form.longitude = res.data.longitude
        that.form.latitude = res.data.latitude
        that.form.depth = res.data.depth
        that.form.magnitude = res.data.magnitude
        that.form.reportingUnit = res.data.reportingunit
      }).catch(error => {
        alert(error)
        console.log(error)
      })
    },
    resetForm() {
      this.$refs['form'].resetFields();
      this.$refs['form2'].resetFields();
      this.$refs['form3'].resetFields();
    }
  },
  mounted() {
    this.getContent()
  }
}
</script>
