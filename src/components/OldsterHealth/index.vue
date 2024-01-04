<template>
  <div>
    <div style="width:100%; height:280px; margin-top: 30px;">
      <test :option="option"></test>
    </div>
    <div style="width:100%; height:280px; margin-top: 30px;">
      <test :option="TodayHealth"></test>
    </div>
  </div>
</template>

<script>
import test from '@/components/Echarts/test.vue'

export default {
  name: "OldsterHealth",
  components: {
    test
  },
  data() {
    return {

    }
  },
  computed: {
    // HealthList() {
    //   let list = this.$store.getters.OldsterHealthList
    //   if (list.length === 0) {
    //     return []
    //   }
    //   return list
    // },
    TheryDaySeriesData() {
      let step = []
      let bloodLow = []
      let bloodPressure = []
      let bloodSugar = []
      let sign = []
      let list = this.$store.getters.OldsterHealthList
      list.forEach(itme => {
        step.push(itme.step)
        bloodLow.push(itme.bloodLow)
        bloodPressure.push(itme.bloodPressure)
        bloodSugar.push(itme.bloodSugar)
        sign.push(itme.sign)
      });
      console.log(step);
      return {
        step,
        bloodLow,
        bloodPressure,
        bloodSugar,
        sign
      }
    },
    option() {
      let step = []
      let bloodLow = []
      let bloodPressure = []
      let bloodSugar = []
      let sign = []
      let list = this.$store.getters.OldsterHealthList
      list.forEach(itme => {
        step.push(itme.step)
        bloodLow.push(itme.bloodLow)
        bloodPressure.push(itme.bloodPressure)
        bloodSugar.push(itme.bloodSugar)
        sign.push(itme.sign == 1 ? 4000 : -4000)
      });
      return {
        title: {
          text: '健康数据',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['步数', '血压低压', '血压高压', '血糖', '签到']
        },
        animationDuration: 1000,
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
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
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
        },
        yAxis: {
          // type: 'value'
        },
        series: [
          {
            name: '步数',
            type: 'line',
            // stack: 'Total',
            data: step
          },
          {
            name: '血压低压',
            type: 'line',
            // stack: 'Total',
            data: bloodLow
          },
          {
            name: '血压高压',
            type: 'line',
            // stack: 'Total',
            data: bloodPressure
          },
          {
            name: '血糖',
            type: 'line',
            // stack: 'Total',
            data: bloodSugar
          },
          {
            name: '签到',
            type: 'line',
            // stack: 'Total',
            data: sign
          }
        ]
      }
    },

    TodayHealth() {
      let obj = this.$store.getters.TodayHealth
      // console.log('object :>> ', obj);

      return {
        title: {
          text: '当天健康数据',
        },
        xAxis: {
          type: 'category',
          data: ['步数', '血压低压', '血压高压', '血糖', '签到']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [obj.step, obj.bloodLow, obj.bloodPressure, obj.bloodSugar, obj.sign==1? 50: 0],
            type: 'bar'
          }
        ]
      }
    }
  },
  methods: {
  }
}
</script>

<style></style>