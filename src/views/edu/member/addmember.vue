<template>
  <div class="app-container">
    
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-tag type="danger" style="margin: 10px">头像等其他信息为默认信息，密码默认为：123456</el-tag>
      <el-form-item label="请选择用户类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择用户类型">
          <el-option label="管理员" value="1"></el-option>
          <el-option label="普通会员" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="mobile" label="用户账号">
        <el-input placeholder="手机账号" v-model.number="ruleForm.mobile" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item  prop="nickname" label="昵称">
        <el-input placeholder="昵称" v-model="ruleForm.nickname" auto-complete="off"></el-input>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="用户头像">

            <!-- 头衔缩略图 -->
            <pan-thumb :image="ruleForm.avatar"/>
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

        </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

  </el-form>
  </div>
</template>

<script>

import member from '@/api/member'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  layout: 'sign',
  components: {ImageCropper,PanThumb},
  data() {
      var checkMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确的手机号码!'));
          } else {
            this.checkIsExist(value)
            if(this.mobileisExist ==true){
              callback(new Error('该手机号码已存在!'));
            }
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        mobileisExist: false,
        ruleForm: {
          nickname:'',
          mobile:'',
          type: '',
          avatar: "https://gdpuxjl-edu.oss-cn-shenzhen.aliyuncs.com/default.png"
        },
        BASE_API: process.env.BASE_API, // 接口API地址
        imagecropperShow: false,
        imagecropperKey:0,
        rules: {
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          mobile: [
            { validator: checkMobile, trigger: ['change', 'blur'] },
            { required: true},
          ],
          
          type: [
            { required: true, message: '请选择用户类型', trigger: 'change' }
          ],
        }
      };
    },
  created() {
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
            this.ruleForm.avatar = data
            //重新加载上传组件
            this.imagecropperKey = this.imagecropperKey + 1

        },
    //检查手机号是否注册
    checkIsExist(mobile){
      member.checkMobileIsExist(mobile,this.ruleForm.type)
      .then( response => {
        this.mobileisExist = false
      })
      .catch( response =>{
          this.mobileisExist = true

      })
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addMember()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //添加用户
    addMember(){
      // alert(this.ruleForm.nickname)
      member.memberadd(this.ruleForm)
      .then( response =>{
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
      }).then(() => {
                    //回到列表页面中，通过路由跳转回到列表页面中
                    this.$router.push({path: '/member'})
                })
      .catch(response=>{
          this.$message({
            type: 'error',
            message: '添加失败，请稍候再试!'
          })
          
      })

    },
    resetForm(){
      this.ruleForm.nickname = '',
      this.ruleForm.mobile = ''
      this.ruleForm.type = '',
      this.ruleForm.avatar = 'https://gdpuxjl-edu.oss-cn-shenzhen.aliyuncs.com/default.png'
      
    }
  },
}
</script>

