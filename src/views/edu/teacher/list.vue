<template>
  <div class="app-container">
    讲师列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="讲师名"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchObj.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
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
    
      <el-button type="primary" icon="el-icon-search" @click="getListTeacher()">查询</el-button>
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

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">

          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60" />
   
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
            <router-link :to="'/teacher/edit/'+scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
            </router-link>
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
      @current-change="getListTeacher"
    />
  </div>
</template>

<script>
import teacher from '@/api/teacher'

export default {
    //定义变量和初始值
    data() {
        return {
            listLoading: true, // 是否显示loading信息
            list:null, //每页数据list集合
            total:0, //总记录数
            page:1,//当前页
            limit:5,//每页显示记录数
            searchObj:{}//条件封装对象
        }
    },
    //在页面渲染之前调用，调用具体的某个方法
    created () {
        //调用方法
        this.getListTeacher()
    },
    //写具体的方法调用
    methods: {
        //1 讲师列表
        getListTeacher(page=1) {
            this.page = page
            this.listLoading = true
            teacher.getTeacherPageList(this.page,this.limit,this.searchObj)
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
        resetData() {//查询全部讲师
            this.searchObj = {}
            this.getListTeacher()
        },
        //2 删除的方法
        removeDataById(id) {
            //console.log(id)
            //调用方法根据id删除
            // teacher.deleteTeacherId(id)
            //     .then()
            //     .catch()
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用方法进行删除
                //return 表示后面then还会执行
                return teacher.deleteTeacherId(id)
            }).then(() => {
                //刷新整个页面
                this.getListTeacher()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(response => {
                //判断点击取消，还是删除失败
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
        }
    }
}
</script>


<style lang="scss" scoped>


</style>
