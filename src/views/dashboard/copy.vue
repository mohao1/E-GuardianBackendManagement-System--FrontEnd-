<template>
  <div class="dashboard">
    <div class="heald">
      <div class="itme">
        <div class="healdTop">
          <svg-icon icon-class="peoples" class="IconL" />
        </div>
        <div class="healdBttom">
          <div style="font-size: 20px;">
            长辈人数
          </div>
          <div>
            {{this.list[0]}}
          </div>
        </div>
      </div>
      <div class="itme">
        <div class="healdTop">
          <svg-icon icon-class="message" class="IconL" />
        </div>
        <div class="healdBttom">
          <div style="font-size: 20px;">
            求救信息
          </div>
          <div>
            {{this.list[1]}}
          </div>
        </div>
      </div>
      <div class="itme">
        <div class="healdTop">
        </div>
        <div class="healdBttom">
          <div style="font-size: 20px;">
            社区数量
          </div>
          <div>
            {{this.list[2]}}
          </div>
        </div>
      </div>
      <div class="itme">
        <div class="healdTop">
        </div>
        <div class="healdBttom">
          <div style="font-size: 20px;">
            家庭数量
          </div>
          <div>
            {{this.list[3]}}
          </div>
        </div>
      </div>
    </div>
    <div style=" height:400px; margin-top: 10px;">
      <ides :option="option"></ides>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ides from '@/components/Echarts/ides.vue'
import { GetCommunityList } from '@/api/community'
import { GetHomeList } from '@/api/home'
import { GetOlderOldsterList } from '@/api/oldster'
import { GetSosList } from '@/api/sos'

export default {
  name: 'Dashboard',
  components: {
    ides
  },
  data() {
    return {
      list:[0,0,0,0]
    }
  },
  methods: {
    GetNum() {
      GetCommunityList().then(
        res => {
          let lists = this.list.splice(2, 1, res.data.length)
        }
      ).catch(error => {
        console.log('error :>> ', error);
      })
      GetHomeList().then(
        res => {
          this.list.splice(3, 1, res.data.length)
        }
      ).catch(error => {
        console.log('error :>> ', error);
      })
      GetOlderOldsterList().then(
        res => {
          this.list.splice(0, 1, res.data.length)
        }
      ).catch(error => {
        console.log('error :>> ', error);
      })
      GetSosList().then(
        res => {
          this.list.splice(1, 1, res.data.length)
        }
      ).catch(error => {
        console.log('error :>> ', error);
      })
    }
  },
  mounted() {
    this.GetNum()
  },
  computed:{
    option(){
      return {
        title: {
          text: '统计图表',
        },
        xAxis: {
          type: 'category',
          data: ['长辈人数', '求救信息', '社区数量', '家庭数量']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.list,
            type: 'bar'
          }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dashboard {
  // height: 500px;
  margin: 8px;
  // background-color: aquamarine;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;

  .heald {
    width: 100%;
    height: 300px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    .itme {
      width: 48%;
      height: 140px;
      background-color: rgb(240, 237, 237);
      border-radius: 14px;
      display: flex;
      padding: 20px;
      justify-content: space-around;
      align-items: center;

      .healdTop {
        width: 24%;
        height: 100px;
        background-color: rgb(31, 193, 233);
        display: flex;
        border-radius: 18px;
        align-items: center;
        justify-content: center;

        .IconL {
          color: rgb(255, 255, 255);
          width: 80%;
          height: 80%;
        }
      }

      .healdBttom {
        width: 72%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
      }
    }

    // .itme-right {
    //   width: 48%;
    //   height: 140px;
    //   background-color: rgb(255, 255, 255);
    //   border-radius: 18px;
    //   display: flex;

    //   .healdTop {
    //     width: 100px;
    //     height: 100px;
    //     background-color: brown;
    //   }
    // }
  }
}
</style>
