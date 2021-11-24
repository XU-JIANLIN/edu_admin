<template>
    <div class="app-container">
      <div class="sign-up-container" >
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
    
          <el-form-item  label="原密码" prop="curpassword" >
            <el-input placeholder="原密码" type="password" v-model="ruleForm.curpassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password" >
            <el-input placeholder="新密码" type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input placeholder="确认密码" type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button  class="sign-up-button" type="primary" @click="submitForm('ruleForm')">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import member from '@/api/member'
import { getToken, setToken, removeToken } from '@/utils/auth'


export default {
    data() {
      var validatecurPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入当前密码'));
        } else {
          
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
        ruleForm: {
          curpassword:'',
          password: '',
          checkPass: '', 
        },
        rules: {
          curpassword: [
            { validator: validatecurPass, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }, 
        token: '',
        formLabelWidth: '100px',
        loginInfo: {},
      
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.changepass()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //修改密码
      changepass(){
        member.updatepass(this.loginInfo.id,this.ruleForm.curpassword,this.ruleForm.password)
        .then(response =>{
          if(response.code == 20000){
              //修改成功
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
          }
        })
        .catch(response =>{
          this.$message({
                type: 'error',
                message: '当前密码错误!'
              })
        })
        this.ruleForm.curpassword="",
        this.ruleForm.password="",
        this.ruleForm.checkPass=""
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
    }

};
</script>
<style>
.app-container .sign-up-container{
  margin-top: 50px;
  width: 600px
}
.app-container .sign-up-container .btn{
  margin-top: 50px;
  float: right;
}
</style>