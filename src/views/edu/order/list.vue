<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="用户账号">
        <el-input v-model="searchObj.mobile"  placeholder="用户账号"/>
      </el-form-item>
      <el-form-item label="课程标题">
        <el-input v-model="searchObj.title" placeholder="课程标题"/>
      </el-form-item>
      <el-form-item  prop="type" label="支付状态">
        <el-select v-model="searchObj.tradeStatus" placeholder="支付状态">
          <el-option label="未支付" value="0"></el-option>
          <el-option label="已支付" value="1"></el-option>
        </el-select>
      </el-form-item><br>
      <el-form-item label="创建订单时间">
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
    
      <el-button type="primary" icon="el-icon-search" @click="getListOrder()">查询</el-button>
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
      <el-table-column prop="mobile" label="用户账号" width="110" />
      <el-table-column prop="nickname" label="昵称" width="120" />

      <el-table-column prop="title" label="课程标题" width="180" />
      <el-table-column prop="totalAmount" label="订单金额" width="80" />
      <el-table-column
        label="支付状态"
        width="80">
        <template slot-scope="scope">
            {{ scope.row.tradeStatus == 0 ? "未支付" : "已支付"  }}
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="订单创建时间" width="160"/>
      <el-table-column
        label="订单支付时间"
        width="160">
        <template slot-scope="scope">
          {{ scope.row.tradeStatus == 0 ? "未支付" : scope.row.gmtModified  }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" @click="removeDataById(scope.row.id)" circle></el-button>
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
      @current-change="getListOrder"
    />
  </div>
</template>

<script>
import order from '@/api/order'

export default {
    //定义变量和初始值
    data() {
        return {
            listLoading: true, // 是否显示loading信息
            list:null, //每页数据list集合
            total:0, //总记录数
            page:1,//当前页
            limit:5,//每页显示记录数
            type: 1, //管理员type为1
            searchObj:{}//条件封装对象
        }
    },
    //在页面渲染之前调用，调用具体的某个方法
    created () {
        //调用方法
        this.getListOrder()
    },
    //写具体的方法调用
    methods: {
        //1 查询用户列表
        getListOrder(page=1) {
            this.page = page
            this.listLoading = true
            order.getOrderPageList(this.page,this.limit,this.searchObj)
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
        resetData() {//重置订单查询信息
            this.searchObj = {}
            this.getListOrder()
        },
        //2 删除的方法
        removeDataById(id) {
            //console.log(id)
            //调用方法根据id删除
            // teacher.deleteTeacherId(id)
            //     .then()
            //     .catch()
            this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用方法进行删除
                //return 表示后面then还会执行
                return order.deleteOrderId(id)
            }).then(() => {
                //刷新整个页面
                this.getListOrder()
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
    }
}
</script>


<style lang="scss" scoped>


</style>
