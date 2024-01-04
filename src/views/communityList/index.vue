<template>
    <div>
        <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="社区名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="长辈人数">
                            <span>{{ props.row.oldsterNum}}</span>
                        </el-form-item>
                        <el-form-item label="人员人数">
                            <span>{{ props.row.userNum }}</span>
                        </el-form-item>
                        <el-form-item label="社区ID">
                            <span>{{ props.row.communityId }}</span>
                        </el-form-item>
                        <el-form-item label="管理人员ID">
                            <span>{{ props.row.admin }}</span>
                        </el-form-item>
                        <el-form-item label="社区地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="编号" type="index"  width="400px" sortable>
            </el-table-column>
            <el-table-column label="社区名称" prop="name" sortable>
            </el-table-column>
            <el-table-column label="管理人员ID" prop="admin" sortable>
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
import { GetCommunityList } from '@/api/community'
export default {
  name: "communityList",
  data() {
    return {
      tableData: [
      ],
      search:'',
    }
  },
  methods: {
    GetCommunityListIS(){
      GetCommunityList().then(
        res=>{
          this.tableData=res.data
        }
      ).catch(e=>{
        console.log('e :>> ', e);
      })
    }

  },
  mounted(){
    this.GetCommunityListIS()
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