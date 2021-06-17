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
    let injuredNum=30; //饼图：7天内受伤人数
    let missingNum=30; //饼图：7天内失踪人数
    let deathNum=30; //饼图：7天内死亡人数
    let injuredNumArray=[13,30,60,42,56,22,44]; //折线图：7天中每日新增受伤人数
    let missingNumArray=[13,30,60,42,56,22,44]; //折线图：7天中每日新增失踪人数
    let deathNumArray=[13,30,60,42,56,22,44]; //折线图：7天中每日新增死亡人数
    let dateArray=['2021-06-11', '2021-06-12', '2021-06-13', '2021-06-14', '2021-06-15', '2021-06-16', '2021-06-17']; //折线图：近7天日期
    return {
      injuredNum, //饼图：7天内受伤人数
      missingNum, //饼图：7天内失踪人数
      deathNum, //饼图：7天内死亡人数
      injuredNumArray,
      missingNumArray,
      deathNumArray,
      dateArray
    };
  },
  methods:{
    getDate(strDate){
      var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
          function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
      return date;
    },
    getContent(param) {
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
        this.injuredNum = parseInt(JSON.parse(string1[0]));
        this.missingNum = parseInt(JSON.parse(string1[1]));
        this.deathNum = parseInt(JSON.parse(string1[2]));
        console.log(this.injuredNum,this.missingNum,this.deathNum);

        //以下为initPieChart()：
        var myDate=new Date();
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
        console.log(this.injuredNum,this.missingNum,this.deathNum);
        for(let i=0; i<7; i++){
          this.injuredNumArray[i] = parseInt(JSON.parse(string1[i+3]));
          this.missingNumArray[i] = parseInt(JSON.parse(string1[i+10]));
          this.deathNumArray[i] = parseInt(JSON.parse(string1[i+17]));
          //this.dateArray[i] = myDate.parse(JSON.parse(string1[i+24]));
          //console.log(this.dateArray[i]);
        }
        // this.dateArray[0]=this.getDate(JSON.parse(string1[24]));
        // console.log(this.dateArray[0]);

        console.log(string1);
        //以下为initLineChart()：
        let chartDom2 = document.getElementById('line');
        let myChart2 =echarts.init(chartDom2)
        myChart2.setOption({
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
        console.log(string1);
      }).catch(error => {
        alert(error)
        console.log(error)
      })
    },
  },
  mounted() {
    this.getContent();
  }
}
</script>

<style scoped>

</style>