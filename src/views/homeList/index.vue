<template>
  <div>
    <el-table :data="tableData.filter(data => !search || data.homeName.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <el-table-column label="编号" type="index" sortable width="100">
      </el-table-column>
      <el-table-column prop="homeId" label="家庭ID">
      </el-table-column>
      <el-table-column prop="homeName" label="家庭名称" width="120">
      </el-table-column>
      <el-table-column prop="userNum" label="家庭人数" width="120">
      </el-table-column>
      <el-table-column prop="admin" label="管理人员ID">
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
  </div>
</template>

<script>
import { GetHomeList } from '@/api/home'
export default {
  name: "homeList",
  data() {
    return {
      tableData: [
      ],
      search: ''
    }
  },
  methods: {
    GetHomeList(){
      GetHomeList().then(
        res=>{
          this.tableData=res.data
        }
      ).catch(error=>{
        console.log('error :>> ', error);
      })
    }
  },
  mounted() {
    this.GetHomeList()
  },
}
</script>

<style></style>