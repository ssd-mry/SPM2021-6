  <template>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
      height="500"
      max-height="500"
      :default-sort = "{prop: 'date', order: 'descending'}">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="location"
        label="震源位置"
        width="180">
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
        width="180">
      </el-table-column>
      <el-table-column
         prop="epi_lat"
         label="纬度"
         width="180">
      </el-table-column>
      <el-table-column
         prop="mag"
         label="mag"
         width="180">
      </el-table-column>
      <el-table-column
         prop="grade"
         label="灾情等级"
         sortable
         width="180">
      </el-table-column>
      <el-table-column
         prop="picture"
         label="图片"
         width="180">
      </el-table-column>
      <el-table-column
         prop="ReportingUnit"
         label="上报单位">
      </el-table-column>
      <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          tableData: [{
            location: '',
            date: '2016-05-02',

          }, {

          }, {

          }, {

          }]
        }
      }
    }
  </script>