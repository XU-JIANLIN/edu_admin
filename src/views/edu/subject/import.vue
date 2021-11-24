<template>
    <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'/static/课程分类.xls'">点击下载模版</a>
        </el-tag>

      </el-form-item>

      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :file-list="fileList"
          :disabled="importBtnDisabled"
          :on-change="onChange"
          :limit="1"
          :action="BASE_API+'/online/subject/import'"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            :disabled="importUpload"
            style="margin-left: 10px;"
            size="small"
            type="success"
            
            @click="submitUpload"  >上传到服务器</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
    data() {
        return {
            flag :false,
            fileList:[],
            BASE_API: process.env.BASE_API, // 接口API地址
            importBtnDisabled:false,// 按钮是否禁用,
            importUpload:false,// 按钮是否禁用,
            loading: false
        }
    },
    created () {
        
    },
    methods: {
        //提交表单的方法
        submitUpload(file) {
        
            //判断此时是否上传文件 TODO
            if(this.flag == true){
              //doucment.getElementById("formid").submit();
              this.importBtnDisabled = true
              this.loading = true
              //提交表单
              this.$refs.upload.submit()
            }else {
                this.$message({
                  type: 'error',
                  message: '请先选择文件'
            })

            }
            
        },
        //上传成功调用的方法
        fileUploadSuccess(response) {
            if (response.success==true) {
                this.loading = false
                this.$message({
                    type: 'success',
                    message: '导入成功'
                })
            } 
            if (response.data != null){
               
                //获取返回list集合
                const messages = response.data
                let msgString = '<ul>'
                messages.forEach(msg => {
                    msgString += `<li>${msg}</li>`
                })
                msgString += '</ul>'
                this.$alert(msgString, response.message, {
                    dangerouslyUseHTMLString: true
                })
            }
            this.fileList = []
            this.importBtnDisabled =false// 按钮是否禁用
            //是否刷新页面
           // this.$router.go(0);
        },
        //上传失败调用的方法
        fileUploadError() {
            this.loading = false
            this.$message({
                type: 'error',
                message: '导入失败'
            })
            //是否刷新页面
            //this.$router.go(0); 
        },
        onChange(){
          
          this.flag = !this.flag
          

        }
        
    }
}
</script>