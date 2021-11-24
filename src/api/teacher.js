import request from '@/utils/request' //模板提供的组件，axios封装

const apiurl = "/online/teachers"

export default {

    // 获取所有讲师信息
    getTeacherList() {
        return request({
            //后端controller里面的路径
            url: `${apiurl}`,
            //提交方式
            method: 'get'
            //传递条件对象,如果传递json数据，使用data。如果不是json，使用params
        
        })


    },
    //分页条件查询的方法
    //三个参数：当前页，每页记录数，条件封装对象
    getTeacherPageList(page,limit,searchObj) {
        return request({
            //后端controller里面的路径
            url: `${apiurl}/${page}/${limit}`,
            //提交方式
            method: 'post',
            //传递条件对象,如果传递json数据，使用data。如果不是json，使用params
            data: searchObj
        })
    },
    //根据id删除讲师
    deleteTeacherId(id) {
        return request({
            //后端controller里面的路径
            url: `${apiurl}/${id}`,
            //提交方式
            method: 'delete',
             //传递条件对象,如果传递json数据，使用data。如果不是json，使用params
            
        })

    },
  //添加
    saveTeacher(teacher) {
        return request({
            //后端controller里面的路径
            url: `${apiurl}`,
            //提交方式
            method: 'post',
            data: teacher
        })
    },
    
    findTeacherById(id) {
        return request({
            //后端controller里面的路径
            url: `${apiurl}/${id}`,
            method: 'get'
        })
    },
     //修改讲师
     updateTeacherId(id,teacherinfo) {
        return request({
            //后端controller里面的路径
            url: `${apiurl}/${id}`,
            //提交方式
            method: 'put',
            data: teacherinfo
        })
    }
}