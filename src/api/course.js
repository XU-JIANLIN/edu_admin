import request from '@/utils/request' //模板提供的组件，axios封装

const apiurl = "/online/course"

export default {
    //根据课程id查询课程详情信息
    getAllCourseInfo(id) {
        return request({
            url: '/online/course/getAllCourseInfo/'+id,
            method: 'get'
        })
    },
    //根据课程id更新课程详情信息
    updateCourseStatus(id) {
        return request({
            url: '/online/course/publishCourse/'+id,
            method: 'get'
        })
    },

    //修改课程信息的方法
    updateCourseInfoById(id,courseInfo) {
        return request({
            url:  `${apiurl}/${id}`,
            method: 'post',
            data:courseInfo
        })
    },
    //根据课程id查询课程信息
    getCourseInfoById(id) {
        return request({
            url: `${apiurl}/${id}`,
            method: 'get'
        })
    },
    // 添加课程信息
    addCourseInfo(courseInfo){
        return request({
            //后端controller里面的路径
            url: `${apiurl}`,
            //提交方式
            method: 'post',
            //传递条件对象,如果传递json数据，使用data。如果不是json，使用params
            data: courseInfo
        })
    },

    //分页查询
    getCourseList(page,limit,searchObj) {
        return request({
            //后端controller里面的路径
            url: `${apiurl}/${page}/${limit}`,
            //提交方式
            method: 'post',
            //传递条件对象,如果传递json数据，使用data。如果不是json，使用params
            data: searchObj
        })
    },
    //根据课程ID删除课程
    deleteCourseId(courseId) {
        return request({
            //后端controller里面的路径
            url: `${apiurl}/${courseId}`,
            //提交方式
            method: 'delete',
        
        
        })
    }
   
}