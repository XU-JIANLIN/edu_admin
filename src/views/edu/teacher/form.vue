<template>
    <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacherinfo.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacherinfo.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacherinfo.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacherinfo.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacherinfo.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">

            <!-- 头衔缩略图 -->
            <pan-thumb :image="teacherinfo.avatar"/>
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
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacher from '@/api/teacher'

import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

const defaultForm = {
  name: '',
  sort: 0,
  level: '',
  career: '',
  intro: '',
  avatar: 'https://gdpuxjl-edu.oss-cn-shenzhen.aliyuncs.com/default.png'
}

export default {

    components: {ImageCropper,PanThumb},

    data() {
        return {
          BASE_API: process.env.BASE_API, // 接口API地址
          imagecropperShow: false,
          imagecropperKey:0,

          teacherinfo: defaultForm
        }
    },
    watch: {
        $route(to, from) {
            this.init()
        }
    },
    created() {
      // console.log("url--info",this.$route.path);
      this.init()
        
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
            this.teacherinfo.avatar = data
            //重新加载上传组件
            this.imagecropperKey = this.imagecropperKey + 1

        },

        init() {
          //判断当前的url地址，根据用户的url执行相应的业务
          if(this.$route.path == "/teacher/form"){
              this.teacherinfo = { ...defaultForm }
          }else{
              const id = this.$route.params.id
              //调用方法根据id查询
              this.getTeacherById(id)
              
          }
        
      },
        //根据 id 查询讲师
        getTeacherById(id){
           teacher.findTeacherById(id)
           .then( response => {
                this.teacherinfo = response.data
                // console.log(this.teacherinfo)
           })

        },
        saveOrUpdate() {
           
            //判断点击保存，执行添加操作 还是修改操作
            if(!this.teacherinfo.id) {
                //调用添加的方法
                this.saveTeacher()
            } else {
                this.updateTeacher()
            }
        },
        // 保存讲师

         //添加讲师的方法
        saveTeacher() {
            //调用后台接口的方法实现添加
            teacher.saveTeacher(this.teacherinfo)
                .then(() => {
                    //请求之后，添加之后，提示用户,
                    return this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                }).then(() => {
                    //回到列表页面中，通过路由跳转回到列表页面中
                    this.$router.push({path: '/teacher'})
                })
                .catch(() => {
                    this.$message({
                        type: 'success',
                        message: '添加失败!'
                    })
                })
        },
          //修改讲师的方法
        updateTeacher() {
            teacher.updateTeacherId(this.teacherinfo.id,this.teacherinfo)
                .then(() => {
                    //请求之后，添加之后，提示用户,
                    return this.$message({
                        type: 'success',
                        message: '修改成功!'
                    })
                }).then(() => {
                    //路由跳转
                    this.$router.push({path: '/teacher'})
                }).catch(() => {
                    this.$message({
                        type: 'success',
                        message: '修改失败!'
                    })
                })
        }

    },
        
}


</script>