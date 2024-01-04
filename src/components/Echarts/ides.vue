<template>
    <div>
        <div ref="chartEl" style="height:180px; width: 100%"></div>
    </div>
  </template>
  <script>
  import * as echarts from 'echarts';
  export default {
    name: 'ides',
    props: {
      option: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        chart: null,
      }
    },
    watch: {
      option: {
        handler(newValue, oldValue) {
          this.chart.setOption(newValue)
        },
        deep: true
      }
    },
    mounted() {
      this.chart = echarts.init(this.$refs.chartEl)
      this.chart.setOption(this.option)
    },
    methods: {

    }
  }
  </script>