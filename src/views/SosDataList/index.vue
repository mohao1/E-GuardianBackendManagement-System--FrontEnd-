<template>
  <div>
    <el-table :data="tableData.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="求救信息ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="求救人员ID">
              <span>{{ props.row.oldsterId }}</span>
            </el-form-item>
            <el-form-item label="求救时间">
              <span>{{ props.row.setTime }}</span>
            </el-form-item>
            <el-form-item label="求救类型">
              <span>{{ props.row.sosType==0? "电话求救" : "短信求救" }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="编号" type="index" width="140px" sortable>
      </el-table-column>
      <el-table-column label="求救信息ID" prop="id" sortable>
      </el-table-column>
      <el-table-column label="求救时间" prop="setTime" sortable>
      </el-table-column>
      <el-table-column width="200px">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GetSosList } from '@/api/sos'
export default {
  name: "SosDataList",
  data() {
    return {
      tableData: [
      ],
      search: '',
    }
  },
  methods: {
    GetList(){
        GetSosList().then(
          res=>{
            this.tableData=res.data
          }
        ).catch(
          error=>{
            console.log('error :>> ', error);
          }
        )
    }
  },
  mounted(){
    this.GetList()
  }
}
</script>

<style>
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