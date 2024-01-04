<template>
  <div>
    <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">

    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="用户名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span>{{ props.row.sex ===1 ?"男":"女"}}</span>
          </el-form-item>
          <el-form-item label="年龄">
            <span>{{ props.row.age }}</span>
          </el-form-item>
          <el-form-item label="用户ID">
            <span>{{ props.row.userId }}</span>
          </el-form-item>
          <el-form-item label="家庭ID">
            <span>{{ props.row.homeId }}</span>
          </el-form-item>
          <el-form-item label="社区ID">
            <span>{{ props.row.communityId }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="编号"
      type="index"
      width="200" sortable>
    </el-table-column>

      <el-table-column
        prop="name"
        label="用户名称"
        sortable
        width="200">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄" sortable>
      </el-table-column>
    <el-table-column label="查看健康信息">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="ShowDrawer(scope.$index, scope.row)">健康信息</el-button>
        </template>
    </el-table-column>
    <el-table-column width="200px">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
    </el-table-column>
  </el-table>

  <el-drawer
  title="我是标题"
  :visible.sync="drawer"
  :with-header="false"
  size="60%">
  <div class="drawerBody">
    <OldsterHealth></OldsterHealth>
  </div>
</el-drawer>

  </div>
</template>

<script>
import OldsterHealth from '@/components/OldsterHealth'
import { GetOlderOldsterList } from '@/api/oldster'
export default {
  name: 'oldsterList',
  components: {
    OldsterHealth
  },
  data() {
    return {
      tableData: [
      ],
      search: '',
      drawer: false,
    }
  },
  methods: {
    ShowDrawer(index, row){
      this.$store.dispatch('health/getOldsterHealth',row.userId).then(
        res=>{
          this.$store.dispatch("health/getTodayHealth",row.userId).then(
            res=>{
              this.drawer=!this.drawer
            }
          )
        },
      ).catch(
        error=>{
          console.log('error :>> ', error);
        }
      )
    },

    GetOldsterList(){
      GetOlderOldsterList().then(
        res=>{
          let {data}=res
          this.tableData=data
        }
      ).catch(error=>{
        console.log('error :>> ', error);
      })
    }
  },
  mounted() {
    this.GetOldsterList()
  },
}
</script>

<style scoped>
.drawerBody{
  /* background-color: cadetblue; */
}

.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
