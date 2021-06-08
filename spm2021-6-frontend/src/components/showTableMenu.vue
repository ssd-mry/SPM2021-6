<template>
  <div id="showTableVue">
    <el-row class="tac">
      <el-col :span="3">
        <h4>数据管理</h4>
        <el-menu
            default-active="this.$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#fff"
            text-color="#303133"
            active-text-color="#409eff"
            router>
          <el-menu-item index="/showTableMenu/basicshock">
            <i class="el-icon-document"></i>
            <span slot="title">基本震情</span>
          </el-menu-item>
          <el-menu-item index="/showTableMenu/housedestory">
            <i class="el-icon-document"></i>
            <span slot="title">房屋损毁</span>
          </el-menu-item>
          <el-menu-item index="/showTableMenu/lifeline">
            <i class="el-icon-document"></i>
            <span slot="title">生命线</span>
          </el-menu-item>
          <el-menu-item index="/showTableMenu/peopleinjured">
            <i class="el-icon-document"></i>
            <span slot="title">人员伤亡</span>
          </el-menu-item>
          <el-menu-item index="/showTableMenu/prediction">
            <i class="el-icon-document"></i>
            <span slot="title">灾情预测</span>
          </el-menu-item>
          <el-menu-item index="/showTableMenu/secondarydisaster">
            <i class="el-icon-document"></i>
            <span slot="title">二次灾情</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <!-- 路由匹配到的组件将显示在这里 -->
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "showTableMenu",
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<style scoped>

</style>