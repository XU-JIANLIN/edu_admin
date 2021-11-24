<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.mobile" placeholder="用户名"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.nickname" placeholder="昵称"/>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="searchObj.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
    
      <el-button type="primary" icon="el-icon-search" @click="getListuser()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

        <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"  
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="用户头像" width="150" align="center">
            <template slot-scope="scope">
            <div class="info">
                <div class="pic">
                <img :src="scope.row.avatar" :alt="scope.row.name" width="100px" height="100px">
                </div>
            </div>
            </template>
        </el-table-column>
      <el-table-column prop="mobile" label="用户名" width="110" />
      <el-table-column prop="nickname" label="nickname" width="120" />

      <el-table-column prop="sign" label="个性签名" width="200" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit"  @click="resetPass(scope.row.id)">重置密码</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

  <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getListuser"
    />
  </div>
</template>

<script>
import member from '@/api/member'

export default {
    //定义变量和初始值
    data() {
        return {
            listLoading: true, // 是否显示loading信息
            list:null, //每页数据list集合
            total:0, //总记录数
            page:1,//当前页
            limit:5,//每页显示记录数
            type: 2, //用户type为2
            searchObj:{}//条件封装对象
        }
    },
    //在页面渲染之前调用，调用具体的某个方法
    created () {
        //调用方法
        this.getListuser()
    },
    //写具体的方法调用
    methods: {
        //1 查询用户列表
        getListuser(page=1) {
            this.page = page
            this.listLoading = true
            member.getMemberPageList(this.page,this.limit,this.type,this.searchObj)
                .then(response => { //如果请求成功，返回状态码20000，执行then里面操作
                   // console.log(response)
                   //每页数据
                  this.list = response.data.items
                   //总记录数
                  this.total = response.data.total

                  this.listLoading = false
                }) 
                .catch(response => { //如果请求失败，执行catch里面操作
                    console.log(response)
                })
        },
        resetData() {//重置查询信息
            this.searchObj = {}
            this.getListuser()
        },
        //2 删除的方法
        removeDataById(id) {
            //console.log(id)
            //调用方法根据id删除
            // teacher.deleteTeacherId(id)
            //     .then()
            //     .catch()
            this.$confirm('此操作将永久删除该会员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用方法进行删除
                //return 表示后面then还会执行
                return member.deleteMemberId(id)
            }).then(() => {
                //刷新整个页面
                this.getListuser()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(response => {
                //判断点击取消，还是删除失败
                console.log(response)
                if (response === 'cancel') {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '删除失败'
                    })
                }        
            })
        },
        //4 重置密码的方法
        resetPass(id) {
            //console.log(id)
            //调用方法根据id删除
            // teacher.deleteTeacherId(id)
            //     .then()
            //     .catch()
            this.$confirm('此操作将重置该会员密码, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用方法进行删除
                //return 表示后面then还会执行
                return member.resetMemberPass(id)
            }).then(() => {
                //刷新整个页面
                this.getListuser()
                this.$message({
                    type: 'success',
                    message: '重置成功!'
                })
            }).catch(response => {
                //判断点击取消，还是删除失败
                console.log(response)
                if (response === 'cancel') {
                    this.$message({
                        type: 'info',
                        message: '已取消重置'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '重置失败'
                    })
                }        
            })
        }
    }
}
</script>


<style lang="scss" scoped>


</style>
