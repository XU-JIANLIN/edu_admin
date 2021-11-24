<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
        <!-- 所属分类：级联下拉列表 -->
        <!-- 一级分类 -->
        <el-form-item label="课程类别">
            <el-select
            v-model="searchObj.subjectParentId"
            placeholder="请选择"
            @change="subjectLevelOneChanged">
            <el-option
                v-for="subject in subjectOneList"
                :key="subject.id"
                :label="subject.title"
                :value="subject.id"/>
            </el-select>

            <!-- 二级分类 -->
            <el-select v-model="searchObj.subjectId" placeholder="请选择">
            <el-option
                v-for="subject in subjectTwoList"
                :key="subject.id"
                :label="subject.title"
                :value="subject.id"/>
            </el-select>
        </el-form-item>

        <!-- 标题 -->
        <el-form-item>
            <el-input v-model="searchObj.title" placeholder="课程标题"/>
        </el-form-item>
        <!-- 讲师 -->
        <el-form-item>
            <el-select
            v-model="searchObj.teacherId"
            placeholder="请选择讲师">
            <el-option
                v-for="teacher in teacherList"
                :key="teacher.id"
                :label="teacher.name"
                :value="teacher.id"/>
            </el-select>
        </el-form-item>

        <el-button type="primary" icon="el-icon-search" @click="getListCourse()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>


   <!-- 表格 -->
    <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="数据加载中"
        border
        fit
        highlight-current-row
        row-class-name="myClassList">

        <el-table-column label="序号" width="70" align="center">
            <template slot-scope="scope">
                {{ (page - 1) * limit + scope.$index + 1 }}
            </template>
        </el-table-column>

        <el-table-column label="课程信息" width="470" align="center">
            <template slot-scope="scope">
            <div class="info">
                <div class="pic">
                <img :src="scope.row.cover" :alt="scope.row.name" width="150px">
                </div>
                <div class="title">
                <a href="">{{ scope.row.title }}</a>
                <p>{{ scope.row.lessonNum }}课时</p>
                </div>
            </div>

            </template>
        </el-table-column>

        <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">
            {{ scope.row.gmtCreate.substr(0, 10) }}
            </template>
        </el-table-column>

        <el-table-column label="发布时间" align="center">
            <template slot-scope="scope">
            {{ scope.row.gmtModified.substr(0, 10) }}
            </template>
        </el-table-column>

        <el-table-column label="价格" width="100" align="center" >
            <template slot-scope="scope">
            {{ Number(scope.row.price) === 0 ? '免费' :
            '¥' + scope.row.price.toFixed(2) }}
            </template>
        </el-table-column>

        <el-table-column prop="buyCount" label="付费学员" width="100" align="center" >
            <template slot-scope="scope">
            {{ scope.row.buyCount }}人
            </template>
        </el-table-column>

        <!-- 课程操作 -->
        <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
            <router-link :to="'/course/info/'+scope.row.id">
                <el-button type="text" size="mini" icon="el-icon-edit">编辑课程信息</el-button>
            </router-link>
            <router-link :to="'/course/chapter/'+scope.row.id">
                <el-button type="text" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
            </router-link>
            <el-button type="text" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
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
        @current-change="getListCourse"
    />

  </div>
</template>

<script>
import course from '@/api/course'
import teacher from '@/api/teacher'
import subject from '@/api/subject'

export default {
    //定义变量和初始值
    data() {
        return {
            listLoading: true, // 是否显示loading信息
            list:null, //每页数据list集合
            total:0, //总记录数
            page:1,//当前页
            limit:5,//每页显示记录数
            searchObj:{},//条件封装对象
            teacherList:[],  //教师列表
            subjectOneList:[], //一级课程标题
            subjectTwoList:[]  //二级课程标题
        }
    },
    //在页面渲染之前调用，调用具体的某个方法
    created () {
        //调用方法
        this.getListCourse()
        this.getTeacherList()
        this.getOneSubject()
    },
    //写具体的方法调用
    methods: {
        //选择以及标题后，二级标题进行显示
        subjectLevelOneChanged(parentId) {
              //获取选择一级分类的id值
            //根据一级分类id值，获取下面的所有二级分类

            //1 遍历所有一级分类集合
            //2 获取每个一级分类
            //3 判断value值和遍历出来的每个一级分类id值是否一样，
            //如果一样，获取下面二级分类，是child
            for(var i=0;i<this.subjectOneList.length;i++) {
                //获取每个一级分类
                var levelOne = this.subjectOneList[i]
                //判断value值和遍历出来的每个一级分类id值是否一样
                if(levelOne.id === parentId) {
                    //获取下面二级分类，是children
                    this.subjectTwoList = levelOne.children
                }
            }
        },
        // 3.查询所有一级列表
        getOneSubject() {
            subject.getAllSubjectList()
            .then( response =>{
                this.subjectOneList = response.data
            })
            .catch( response =>{

            })

        },
        // 2.查询所有教师
        getTeacherList() {
            teacher.getTeacherList()
            .then( response =>{
                this.teacherList = response.data
            })
            .catch( response =>{
            
            })
        },
        resetData() {//重置
            this.searchObj = {}
            this.getListCourse()
        },
        //2 删除课程的方法
        removeDataById(id) {
            this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用方法进行删除
                //return 表示后面then还会执行
                return course.deleteCourseId(id)
            }).then(() => {
                //刷新整个页面
                this.getListCourse()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
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
        },
        //1 课程列表
        getListCourse(page=1) {
            this.page = page
            this.listLoading = true
            course.getCourseList(this.page,this.limit,this.searchObj)
                .then(response => { //如果请求成功，返回状态码20000，执行then里面操作
                   // console.log(response)
                   //每页数据
                    this.list = response.data.items
                    this.total = response.data.total
                    this.listLoading = false
                }) 
                .catch(response => { //如果请求失败，执行catch里面操作
                    console.log(response)
                })
        }
    }
}
</script>
<style scoped>
.myClassList .info {
    width: 450px;
    overflow: hidden;
}
.myClassList .info .pic {
    width: 150px;
    height: 90px;
    overflow: hidden;
    float: left;
}
.myClassList .info .pic a {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.myClassList .info .pic img {
    display: block;
    width: 100%;
}
.myClassList td .info .title {
    width: 280px;
    float: right;
    height: 90px;
}
.myClassList td .info .title a {
    display: block;
    height: 48px;
    line-height: 24px;
    overflow: hidden;
    color: #00baf2;
    margin-bottom: 12px;
}
.myClassList td .info .title p {
    line-height: 20px;
    margin-top: 5px;
    color: #818181;
}
</style>
