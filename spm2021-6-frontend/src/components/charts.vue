<template>
  <body>
    <div id="line" style="width: 650px;height:500px;"></div>
    <div id="pie" style="width: 600px;height:600px;"></div>
  </body>
</template>


<script>
import * as echarts from "echarts";

export default {
  name: "charts",
  data() {
    let injuredNum; //饼图：7天内受伤人数
    let missingNum; //饼图：7天内失踪人数
    let deathNum; //饼图：7天内死亡人数
    let injuredNumArray; //折线图：7天中每日新增受伤人数
    let missingNumArray; //折线图：7天中每日新增失踪人数
    let deathNumArray; //折线图：7天中每日新增死亡人数
    let dateArray; //折线图：近7天日期
    return {
    };
  },
  methods:{
    // getdate() {
    //   var date = new Date();
    //   var seperator1 = "-";
    //   var year = date.getFullYear();
    //   var month = date.getMonth() + 1;
    //   var strDate = date.getDate();
    //
    //   if (month >= 1 && month <= 9) {
    //     month = "0" + month;
    //   }
    //   if (strDate >= 0 && strDate <= 9) {
    //     strDate = "0" + strDate;
    //   }
    //   var currentdate = year + " 年 " + month + " 月 " + strDate + " 日 ";
    //   return currentdate;
    // },
    getContent(param) { //传给后端的参数
      // this.injuredNum=90;
      // this.missingNum=70;
      // this.deathNum=10;
      // this.injuredNumArray=[13,30,60,42,56,22,44];
      // this.missingNumArray=[20,10,22,35,51,37,64];
      // this.deathNumArray=[10,20,30,40,50,60,70];
      // this.dateArray=['2021-06-05', '2021-06-06', '2021-06-07', '2021-06-08', '2021-06-09', '2021-06-10', '2021-06-11'];

      var that = this;
      this.$axios({
        method: 'post',
        url: '/spm/data/viewChart', //访问后端的url
        contentType: 'application/json; charset=UTF-8', // 解决415错误
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        dataType: 'json',
        data: JSON.stringify({param:null}) //传给后端的参数
      }).then(res => { //后端返回数据
        var string1 = res.data //储存数据
        //变量赋值
        this.injuredNum = JSON.parse(string1[0]);
        this.missingNum = JSON.parse(string1[1]);
        this.deathNum = JSON.parse(string1[2]);
        for(var i=0;i<7;i++){
          this.injuredNumArray[i] = JSON.parse(string1[i+3]);
          this.missingNumArray[i] = JSON.parse(string1[i+10]);
          this.deathNumArray[i] = JSON.parse(string1[i+17]);
          this.dateArray[i] = JSON.parse(string1[i+24]);
        }
        console.log(string1);
      }).catch(error => {
        alert(error)
        console.log(error)
      })

    },
    initPieChart(){
      let chartDom = document.getElementById('pie');
      let myChart =echarts.init(chartDom)
      myChart.setOption({
        title: {
          text: '七天内伤亡失踪人数比例图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a}<br/>{b}: {c}  ({d}%)"
        },
        legend: {
          top: '10%',
          left: 'center'
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '20%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '人员类型',
            type: 'pie',
            radius: ['20%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'right'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
              }
            },
            labelLine: {
              show: true
            },
            data: [
              {value: this.injuredNum, name: '受伤人数'},
              {value: this.missingNum, name: '失踪人数'},
              {value: this.deathNum, name: '死亡人数'},
            ]
          }
        ]
      })
    },
    initLineChart(){
      let chartDom = document.getElementById('line');
      let myChart =echarts.init(chartDom)
      myChart.setOption({
        title: {
          text: '七天内伤亡失踪人数变化折线图',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '10%',
          left: 'center',
          data: ['死亡人数', '受伤人数', '失踪人数']
        },
        grid: {
          left: '5%',
          right: '5%',
          top: '20%',
          bottom: '20%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.dateArray
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '死亡人数',
            type: 'line',
            // data: [12, 13, 10, 13, 9, 23, 21]
            data: this.deathNumArray
          },
          {
            name: '受伤人数',
            type: 'line',
            data: this.injuredNumArray
          },
          {
            name: '失踪人数',
            type: 'line',
            data: this.missingNumArray
          }
        ]
      })
    },
  },
  mounted() {
    this.getContent();
    this.initPieChart();
    this.initLineChart();
  }
}
</script>

<style scoped>

</style>