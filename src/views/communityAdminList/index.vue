<template>
    <div>
        <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="用户名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="管理人员ID">
                            <span>{{ props.row.adminId }}</span>
                        </el-form-item>
                        <el-form-item label="社区ID">
                            <span>{{ props.row.communityId }}</span>
                        </el-form-item>
                        <el-form-item label="登录账号">
                            <span>{{ props.row.adminName }}</span>
                        </el-form-item>
                        <el-form-item label="登录密码">
                            <span>{{ props.row.adminPassword }}</span>
                        </el-form-item>
                        
                        
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="编号" type="index" width="200" sortable>
            </el-table-column>
            <el-table-column label="管理人员ID" prop="adminId" sortable>
            </el-table-column>
            <el-table-column label="用户名称" prop="name" sortable>
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
import { GetCommunityAdminList } from '@/api/community'
export default {
    name: "CommunityAdminList",
    data() {
        return {
            tableData: [
            ],
            search: '',
        }
    },
    methods: {
        GetAdminList(){
            GetCommunityAdminList().then(
                res=>{
                    this.tableData=res.data
                }
            ).catch(error=>{

            })
        }
    },
    mounted(){
        this.GetAdminList()
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