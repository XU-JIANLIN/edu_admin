<template>
    <div class="app-container">
        <!--添加轮播图-->
        <el-form :inline="true" class="demo-form-inline">
            <el-button class="addbotton" type="primary" @click="add">添加轮播图</el-button>
        </el-form>
        <!-- 添加轮播图弹出框 -->
        <el-dialog title="轮播图信息" :visible.sync="dialogFormVisible">
            <el-form :model="lunbotuInfo" :label-width="formLabelWidth" >
                <el-form-item label="上传轮播图">
                    <el-upload
                    class="avatar-uploader"
                    :action="BASE_API+'/online/oss/fileupload?host=lunbotu'"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="lunbotuInfo.photo" :src="lunbotuInfo.photo" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="轮播图描述" :label-width="formLabelWidth" >
                    <el-input v-model="lunbotuInfo.name" autocomplete="off"   ></el-input>
                </el-form-item>
                <el-form-item label="轮播图跳转链接"  :label-width="formLabelWidth">
                    <el-input v-model="lunbotuInfo.cover" autocomplete="off"  ></el-input>
                </el-form-item>
                <el-form-item label="轮播图权重"  :label-width="formLabelWidth">
                    <el-input v-model="lunbotuInfo.sort" autocomplete="off"  ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 表格 -->
        <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="数据加载中"
            border
            fit
            highlight-current-row
            row-class-name="myClassList">

            <el-table-column label="序号" width="50" align="center">
                <template slot-scope="scope">
                    {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column label="图片" width="259" align="center">
                <template slot-scope="scope">
                <div class="info">
                    <div class="pic">
                    <img :src="scope.row.photo" :alt="scope.row.name" width="150px">
                    </div>
                </div>

                </template>
            </el-table-column>

            <el-table-column label="图片描述" width="200" align="center" >
                <template slot-scope="scope">
                    {{ scope.row.name}}
                </template>
            </el-table-column>

            <el-table-column label="跳转链接" align="center" width="200">
                <template slot-scope="scope">
                    {{ scope.row.cover}}
                </template>
            </el-table-column>

            <el-table-column label="权重" width="80" align="center" >
                <template slot-scope="scope">
                    {{ scope.row.sort}}
                </template>
            </el-table-column>

            <el-table-column  label="是否启用" width="80" align="center" >
                <template slot-scope="scope">
                        <el-switch
                            class="switchStyle"
                            v-model="scope.row.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="Normal"
                            inactive-value="Draft"
                            active-text="启用"
                            inactive-text="禁用"
                            @change="switchstatus(scope.row.id,scope.row.status)">
                        </el-switch>
                </template>
            </el-table-column>
            <!-- 轮播图操作 -->
            <el-table-column label="操作" width="190" align="center">
                <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateInfo(scope.row.id)">修改</el-button> 
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
            @current-change="getPageLunbotu"
        />
    </div>
</template>


<script>

import lunbotu from "@/api/websetting"
const defaultForm = {
    id:"",
    cover: "",
    name: "",
    photo: "",
    sort: 0,
}
export default {
    //定义变量和初始值
    data() {
        return {
            BASE_API: process.env.BASE_API, // 接口API地址
            listLoading: true, // 是否显示loading信息
            list:null, //每页数据list集合
            total:0, //总记录数
            page:1,//当前页
            limit:5,//每页显示记录数
            dialogTableVisible: false, //弹出弹框
            dialogFormVisible: false,
            formLabelWidth: '120px',// 内容框宽度
            lunbotuInfo: defaultForm
        
        }
    },
    //在页面渲染之前调用，调用具体的某个方法
    created () {
        //调用方法
        this.getPageLunbotu();
    },
    //写具体的方法调用
    methods: {
        //点击修改按钮
        updateInfo(id){
            for(var i=0; i < this.list.length; i++) {
                var tmp = this.list[i]
                if(tmp.id === id){
                    this.lunbotuInfo = tmp
                }
            }
            this.dialogFormVisible = true
        },
        //确定上传或修改轮播图信息
        save(){
            if(this.lunbotuInfo.id === ''){
                lunbotu.addLunbotu(this.lunbotuInfo)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '添加轮播图信息成功!'
                    })                  
                })
                .catch(response => {
                    this.$message({
                        type: 'error',
                        message: '添加轮播图信息失败!'
                    })
                })
            } else{
                lunbotu.updateLunbotu(this.lunbotuInfo)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '修改轮播图信息成功!'
                    })                  
                })
                .catch(response => {
                    this.$message({
                        type: 'error',
                        message: '修改轮播图信息失败!'
                    })
                })
            }
            this.dialogFormVisible = false
            
            //调用方法,更新页面
            this.getPageLunbotu();
        },
        //取消添加、修改轮播图;
        cancel(){
            
            this.dialogFormVisible = false
        },
        //点击添加轮播图
        add(){
            this.lunbotuInfo = { ...defaultForm}
            this.dialogFormVisible = true
        },
        //上传封面之前调用的方法
        beforeAvatarUpload(file) {
            //设置允许上传图片格式，上传图片大小
            const isJPG = file.type === 'image/jpeg'
            //M
            const isLt2M = file.size / 1024 / 1024 < 10

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 10MB!')
            }
            return isJPG && isLt2M
        },
        //上传成功之后调用的方法
        handleAvatarSuccess(res, file) {
            //上传成功之后，获取上传图片的oss的路径，赋值给课程封面字段
            
            this.lunbotuInfo.photo = res.data
        },
        //设置轮播图的状态
        switchstatus(id,status){
            lunbotu.changeLunbotuStatus(id,status)
            .then(response =>{
                //如果请求成功，返回状态码20000，执行then里面操作
                var type = status ==="Normal"? "success" :"error"
                var message = status ==="Normal"? "已启用" :"已禁用"
                this.$message({
                    type: type,
                    message: message
                })
            })
             .catch(response => { //如果请求失败，执行catch里面操作
                    this.$message({
                    type: 'error',
                    message: '修改失败!'
                })
            })
            
        },
        //删除轮播图
        removeDataById(id){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用方法进行删除
                //return 表示后面then还会执行
                return  lunbotu.deleteLunbotu(id)
            }).then(() => {
                //刷新整个页面
                this.getPageLunbotu()
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
        },
        //分页查询轮播图
        getPageLunbotu(page=1){
            this.page = page
            this.listLoading = true
            lunbotu.getLunbotuPage(this.page,this.limit)
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
<style >
.addbotton{
    margin-bottom: 20px;
}

.myClassList .info {
    height: 100px;
    overflow: hidden;
}
.myClassList .info .pic {
    width: 250px;
    height: 100px;
    overflow: hidden;
    float: left;
}
.myClassList .info .pic img{
    width: 240px;
    height: 96px;
    
}

.switchStyle .el-switch__label {
position: absolute;
display: none;
color: #fff;
}
.switchStyle .el-switch__label--left {
z-index: 9;
left: 6px;
}
.switchStyle .el-switch__label--right {
z-index: 9;
left: -14px;
}
.switchStyle .el-switch__label.is-active {
display: block;
}
.switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
width: 50px !important;
}

.avatar-uploader .el-upload {
border: 1px dashed #d9d9d9;
border-radius: 6px;
cursor: pointer;
position: relative;
overflow: hidden;
width: 470px;
height: 192px;

}
.avatar-uploader .el-upload:hover {
border-color: #409EFF;
}
.avatar-uploader-icon {
font-size: 28px;
color: #8c939d;
width: 178px;
height: 178px;
line-height: 178px;
text-align: center;
}
.avatar {
width: 470px;
height: 192px;
display: block;
}

</style>
