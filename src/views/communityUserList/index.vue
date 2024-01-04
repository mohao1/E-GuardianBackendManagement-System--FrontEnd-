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
                        <el-form-item label="性别">
                            <span>{{ props.row.sex === 1 ? "男" : "女" }}</span>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <span>{{ props.row.age }}</span>
                        </el-form-item>
                        <el-form-item label="用户ID">
                            <span>{{ props.row.userId }}</span>
                        </el-form-item>
                        <el-form-item label="社区ID">
                            <span>{{ props.row.communityId }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="编号" type="index" width="200" sortable>
            </el-table-column>
            <el-table-column label="用户名称" prop="name" sortable>
            </el-table-column>
            <el-table-column label="年龄" prop="age" sortable>
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
import { GetCommunityUserList } from '@/api/community'
export default {
    name: "CommunityUserList",
    data() {
        return {
            tableData: [
                {
                    "userId": "5946343e655a459b8209174fcd1f5651",
                    "communityId": "123456",
                    "name": "小王",
                    "age": 18,
                    "sex": 0
                }
            ],
            search: '',
        }
    },
    methods: {
        GetUserList(){
            GetCommunityUserList().then(
                res=>{
                    this.tableData=res.data
                }
            ).catch(error=>{

            })
        }
    },
    mounted(){
        this.GetUserList()
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