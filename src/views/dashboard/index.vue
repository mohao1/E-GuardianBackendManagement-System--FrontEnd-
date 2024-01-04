<template>
  <div class="dashboard">
    <div class="text">
      欢迎来到e-守护管理系统
    </div>
    <div class="body">
      <div class="body-left">
        <div class="left-itme-1">
          <div class="Icons" :key="index" v-for="(itme, index) in iconList" @click="alte()">
            <img :src="itme.iconImag" alt="" style="width: 80px;">
            <span>{{ itme.title }}</span>
          </div>
        </div>
        <div class="left-itme-2">
          <div style="width: 90%; height: 100%;">
            <send :option="option_oldster_Inters"></send>
          </div>
        </div>
        <div class="left-itme-3">
          <div>
            今日求救信息
          </div>
          <div class="list">
            <el-table :data="tableDataList" style="width: 100%">
              <el-table-column label="编号" type="index" sortable width="50" align="center">
              </el-table-column>
              <el-table-column prop="id" label="信息ID" align="center">
              </el-table-column>
              <el-table-column prop="oldsterId" label="用户ID" align="center">
              </el-table-column>
              <el-table-column prop="sosType" label="求救类型" width="100" align="center">
              </el-table-column>
              <el-table-column prop="setTime" label="求救时间" width="120" align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="body-right">
        <div class="right-itme-1">
          <div style="width: 100%; height: 20%; font-size: 20px; ">
            系统注册用户
          </div>
          <div style="width: 100%; height: 70%; font-size: 48px; line-height: 72px;">
            {{ UserNum }}人
          </div>
          <div style="width: 100%; height: 10%; font-size: 10px; font-weight: 500px;">
            截至时间{{ Time }}
          </div>
        </div>
        <div class="right-itme-2">
          <div style=" margin-bottom: 10px; display: flex; flex-direction: row; justify-content: space-between;">
            <div style="height: 40px; font-size: 16px; line-height: 40px;">
              志愿者的情况
            </div>
            <div style="height: 40px; font-size: 26px; line-height: 40px;">
              {{ CommunityUserList.length }}人
            </div>
          </div>
          <div style="width: 100%;">
            <ides :option="option_user_sex"></ides>
          </div>
        </div>
        <div class="right-itme-3">
          <div style="height: 20px; font-size: 16px; line-height: 20px;">
            长辈签到情况
          </div>
          <div style="width: 100%; height: 150px;">
            <ides2 :option="option_step"></ides2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ides from '@/components/Echarts/ides.vue'
import ides2 from '@/components/Echarts/ides2.vue'
import send from '@/components/Echarts/send.vue'
import { GetCommunityUserList } from '@/api/community'
import { GetOlderOldsterList } from '@/api/oldster'
import { GetYounger } from '@/api/younger'
import { GetSosList, GetSosToDaysList, GetoldsterName } from '@/api/sos'
import { GetTodayHealth } from '@/api/health'

export default {
  name: 'Dashboard',
  components: {
    ides,
    ides2,
    send
  },
  data() {
    return {
      iconList: [
        {
          iconImag: require("../../assets/msg.png"),
          title: "发送系统信息"
        },
        {
          iconImag: require("../../assets/du.png"),
          title: "待审批"
        },
        {
          iconImag: require("../../assets/body.png"),
          title: "反馈信息"
        },
        {
          iconImag: require("../../assets/setk.png"),
          title: "系统设置"
        },
        {
          iconImag: require("../../assets/dinger.png"),
          title: "防诈宣传"
        },
        {
          iconImag: require("../../assets/phone.png"),
          title: "紧急呼叫"
        },
      ],
      tableData: [],
      UserNum: 0,
      oldsterList: [],
      CommunityUserList: [],
      stepNumber: 0,
      unStepNumber: 0,

    }
  },
  methods: {
    alte() {
      alert('没有权限')
    },
    InGetSosList() {
      if (this.tableData.length === 0) {
        GetSosToDaysList(this.Time).then(
          res => {
            this.tableData = res.data.splice(0, 10)
          }
        ).catch(
          error => {
            console.log('error :>> ', error);
          }
        )
      }
    },
    getStep() {
      for (let i = 0; i < this.oldsterList.length; i++) {
        let id = this.oldsterList[i].userId
        GetTodayHealth(id).then(
          res => {
            if (res.data.sign === 0) {
              this.unStepNumber++
            } else if (res.data.sign === 1) {
              this.stepNumber++
            }
          }
        ).catch(error => {
          console.log('error :>> ', error);
        })
      }
    },
    GetUserNum() {
      try {
        GetOlderOldsterList().then(
          res => {
            this.oldsterList = res.data
            this.UserNum = this.UserNum + res.data.length
            this.getStep()
          }
        )
        GetCommunityUserList().then(
          res => {
            this.CommunityUserList = res.data
            this.UserNum = this.UserNum + res.data.length
          }
        )
        GetYounger().then(
          res => {
            this.UserNum = this.UserNum + res.data.length
          }
        )
      } catch (error) {
        console.log('error :>> ', error);
      }
    },
  },
  mounted() {
    this.InGetSosList()
    this.GetUserNum()
    this.getStep()
  },
  computed: {
    option_user_sex() {
      let man = 0;
      let glire = 0;
      if (this.CommunityUserList.length > 0) {
        for (let i = 0; i < this.CommunityUserList.length; i++) {
          if (this.CommunityUserList[i].sex === 1) {
            man++
          } else if (this.CommunityUserList[i].sex === 0) {
            glire++
          }
        }
      }
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '志愿者的情况',
            type: 'pie',
            radius: '50%',
            data: [
              { value: man, name: '男' },
              { value: glire, name: '女' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    },
    option_step() {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          left: 'center'
        },
        series: [
          {
            name: '长辈签到',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              // label: {
              //   show: true,
              //   fontSize: 40,
              //   fontWeight: 'bold'
              // }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.stepNumber, name: '已签到' },
              { value: this.unStepNumber, name: '未签到' }
            ]
          }
        ]
      };
    },
    option_oldster_Inters() {
      //'40-50', '50-60', '60-70', '70-80', '80-90', '90-100'
      let manList = [0, 0, 0, 0, 0, 0]
      let gliorList = [0, 0, 0, 0, 0, 0]
      for (let i = 0; i < this.oldsterList.length; i++) {
        let oldster = this.oldsterList[i]
        if (oldster.sex === 1) {
          switch (parseInt(oldster.age / 10)) {
            case 4:
              manList.splice(0, 1, manList[0] + 1)
              break;
            case 5:
              manList.splice(1, 1, manList[1] + 1)
              break;
            case 6:
              manList.splice(2, 1, manList[2] + 1)
              break;
            case 7:
              manList.splice(3, 1, manList[3] + 1)
              break;
            case 8:
              manList.splice(4, 1, manList[4] + 1)
              break;
            case 9:
              manList.splice(5, 1, manList[5] + 1)
              break;
            default:
              break;
          }
        } else if (oldster.sex === 0) {
          switch (parseInt(oldster.age / 10)) {
            case 4:
              gliorList.splice(0, 1, gliorList[0] + 1)
              break;
            case 5:
              gliorList.splice(1, 1, gliorList[1] + 1)
              break;
            case 6:
              gliorList.splice(2, 1, gliorList[2] + 1)
              break;
            case 7:
              gliorList.splice(3, 1, gliorList[3] + 1)
              break;
            case 8:
              gliorList.splice(4, 1, gliorList[4] + 1)
              break;
            case 9:
              gliorList.splice(5, 1, gliorList[5] + 1)
              break;
            default:
              break;
          }
        }
      }
      return {
        title: [
          {
            text: '长辈年龄分析',
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            // dataView: { show: true, readOnly: false },

          }
        },
        legend: {
          data: ['男-人数', '女-人数', '总的人数']
        },
        xAxis: [
          {
            type: 'category',
            data: ['40-50', '50-60', '60-70', '70-80', '80-90', '90-100'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '人数',
            min: 0,
            axisLabel: {
              formatter: '{value} 人'
            }
          },
          {
            type: 'value',
            name: '总的人数',
            min: 0,
            axisLabel: {
              formatter: '{value} 人'
            }
          }
        ],
        series: [
          {
            name: '男-人数',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' 人';
              }
            },
            data: manList
          },
          {
            name: '女-人数',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' 人';
              }
            },
            data: gliorList
          },
          {
            name: '总的人数',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' 人';
              }
            },
            data: [gliorList[0] + manList[0], gliorList[1] + manList[1], gliorList[2] + manList[2], gliorList[3] + manList[3], gliorList[4] + manList[4], gliorList[5] + manList[5]]
          }
        ]
      }
    },
    Time() {
      let date = new Date();
      let dateStr = ''
      dateStr = dateStr + date.getFullYear() + "-";
      dateStr = dateStr + (date.getMonth() + 1) + "-"
      dateStr = dateStr + date.getDate()
      return dateStr
    },
    tableDataList() {
      let list = []
      for (let i = 0; i < this.tableData.length; i++) {
        GetoldsterName(this.tableData[i].oldsterId).then(
          res => {
            let data = this.tableData[i]
            data.sosType = data.sosType === 0 ? '短信求救' : '电话求救'
            if(res.data.oldster){
              data.oldsterId=res.data.oldster.name
            }
            list.push(data)
          }
        )
      }
      return list
    }
  }
}
</script>

<style lang="less" scoped>
.dashboard {
  background-color: rgb(246, 247, 249);
  padding: 20px;
  // margin: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .text {
    margin-bottom: 10px;
    margin-left: 10px;
  }

  .body {
    display: flex;
    flex-direction: row;

    .body-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 24%;
      padding-left: 10px;

      .right-itme-1 {
        background-color: rgb(255, 255, 255);
        padding: 20px;
        // border-style: solid;
        // border-color: black;
        border-radius: 14px;
        // border-width: 1px;
        height: 140px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .right-itme-2 {
        background-color: rgb(255, 255, 255);
        padding: 20px;
        // border-style: solid;
        // border-color: black;
        border-radius: 14px;
        // border-width: 1px;
        height: 260px;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
      }

      .right-itme-3 {
        background-color: rgb(255, 255, 255);
        padding: 20px;
        // border-style: solid;
        // border-color: black;
        border-radius: 14px;
        // border-width: 1px;
        height: 300px;
        width: 100%;
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: space-around;
      }
    }

    .body-left {
      width: 76%;
      padding-right: 10px;

      .left-itme-1 {
        background-color: rgb(255, 255, 255);
        // border-style: solid;
        // border-color: black;
        border-radius: 14px;
        // border-width: 1px;
        height: 140px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;

        .Icons {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          width: 16%;
          height: 100%;
        }
      }

      .left-itme-2 {
        background-color: rgb(255, 255, 255);
        padding: 20px;
        // border-style: solid;
        // border-color: black;
        border-radius: 14px;
        // border-width: 1px;
        height: 260px;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .left-itme-3 {
        background-color: rgb(255, 255, 255);
        padding: 20px;
        // border-style: solid;
        // border-color: black;
        border-radius: 14px;
        // border-width: 1px;
        // height: 200px;
        width: 100%;

        .list {
          width: 100%;
          display: flex;

          .el-table .warning-row {
            background: oldlace;
          }

          .el-table .success-row {
            background: #f0f9eb;
          }
        }
      }
    }
  }
}
</style>
