import request from '@/utils/request' //模板提供的组件，axios封装

const apiurl = "/online/subject"

export default {

    getAllSubjectList() {
        return request({
            //后端controller里面的路径
            url: `${apiurl}`,
            //提交方式
            method: 'get',
            //传递条件对象,如果传递json数据，使用data。如果不是json，使用params
        })
    },
    removeSubjectId(id) {
        return request({
            url: '/online/subject/'+id,
            method: 'delete'
        })
    },
    addSubjectOne(subject) {
        return request({
            url: '/online/subject/addOneLevel',
            method: 'post',
            data:subject
        })
    },
    addSubjectTwo(subject) {
        return request({
            url: '/online/subject/addTwoLevel',
            method: 'post',
            data:subject
        })
    }
}