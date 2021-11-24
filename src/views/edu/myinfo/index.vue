<template>
<div class="app-container">
    <!--主要中间区域-->
      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      
      <div class="memberinfo">
            <!-- 头衔缩略图 -->
            <pan-thumb :image="loginInfo.avatar"/>
            <!-- 文件上传按钮 -->
            <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
            </el-button>

            <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
            <image-cropper
                        v-show="imagecropperShow"
                        :width="300"
                        :height="300"
                        :key="imagecropperKey"
                        :url="BASE_API+'/online/oss/fileupload?host=photo'"
                        field="file"
                        @close="close"
                        @crop-upload-success="cropSuccess"/>

      </div>
        <div class="memberinfo">
          <div class="pull-left">昵称</div>
          <div class="pull-right">{{ loginInfo.nickname }}</div>
        </div>
        <div class="memberinfo">
          <div class="pull-left">性别</div>
          <div class="pull-right">{{ loginInfo.sex == 0? "未设置" : loginInfo.sex == '1'? "女" : '男'}}</div>
        </div>
        <div class="memberinfo">
          <div class="pull-left">年龄</div>
          <div class="pull-right">{{ loginInfo.age == 0 ? "未设置" : loginInfo.age}}</div>
        </div>
        <div class="memberinfo">
          <div class="pull-left">个性签名</div>
          <div class="pull-right">{{ loginInfo.sign == null? "未设置" : loginInfo.sign }}</div>
        </div>
        <div class="memberinfo">
            <el-button class="anniu" type="primary" @click="dialogFormVisible = true">编辑</el-button>
        </div>


        <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
          <el-form :model="loginInfo">
            <el-form-item label="昵称" :label-width="formLabelWidth">
              <el-input v-model="loginInfo.nickname" auto-complete="off" ></el-input>
            </el-form-item>
            
            <el-form-item label="年龄" :label-width="formLabelWidth">
              <el-input v-model="loginInfo.age" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="个性签名" :label-width="formLabelWidth">
              <el-input v-model="loginInfo.sign" auto-complete="off"></el-input>
              </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio-group v-model="loginInfo.sex">
                <el-radio :label="0">保密</el-radio>
                <el-radio :label="2">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
              



            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeInfo()">确 定</el-button>
          </div>
        </el-dialog>
</div>
</template>
<script>
import axios from 'axios'
import member from '@/api/member'
import { getToken, setToken, removeToken } from '@/utils/auth'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
    
    components: {ImageCropper,PanThumb},
    data() {
      return {
        imageUrl: 'https://gdpuxjl-edu.oss-cn-shenzhen.aliyuncs.com/default.png',
        token: '',
        loginInfo: {
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        BASE_API: process.env.BASE_API, // 接口API地址
        imagecropperShow: false,
        imagecropperKey:0,

      };
    },
    created() {
    // console.log(this.$route.query.token)

    // TODO: 登录获取信息
    this.token = getToken();
    if (this.token) {
      this.showInfo(this.token)
    }else{
        this.$router.push("/login");
    }
  },

    
    methods: {
      //关闭上传头像的窗口
        close() {
            //点击×，关闭弹框
            this.imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey + 1
        },
        cropSuccess(data) {

            console.log(data)
            this.imagecropperShow = false
            //获取后台返回图片地址，显示到页面中
            this.loginInfo.avatar = data
            this.changeInfo()
            //重新加载上传组件
            this.imagecropperKey = this.imagecropperKey + 1

        },

      showInfo() {
        console.log("用户查看信息")
        member.getInfoByToken(this.token)
          .then(response => {
            // console.log( response.data.loginInfo)
              this.loginInfo = response.data.loginInfo
              
          })
          .catch(response => {

          })
    },
      //修改个人信息
      changeInfo(){
        member.updateInfo(this.loginInfo)
          .then(response =>{
             //修改成功
              this.confirm();
          })
          .catch( response =>{
            this.$message({
                type: 'error',
                message: '网络异常，晚点在试!'
              })
              this.dialogFormVisible = false
          })
      },
      confirm() {
        this.$alert('修改成功', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.dialogFormVisible = false
            this.$router.go(0)
          }
        });
      }
    }

};
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
    width: 128px;
    height: 128px;
    display: block;
  }
  .memberinfo{
    float: left;
    margin-top: 20px;
    margin-left: 50px;
   
    
  }
  .memberinfo .pull-left{
    font-size: 15px;
    width: 120px; 
    color: #07111b;
    line-height: 20px;
    padding: 20px 0;
    text-align: center;
    background-color: #f3f5f7;
    float: left;
  }
  .memberinfo .pull-right{
    margin-left: 20px;
    font-size: 15px;
    width: 750px; 
    height: 58;
    color: #07111b;
    line-height: 20px;
    padding: 20px 0;
    float: left;
    border-bottom: 2px solid  #e7e7e7;
  }
  .memberinfo .anniu{
    margin-left: 820px;
  }

</style>
