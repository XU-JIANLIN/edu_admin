import request from '@/utils/request' //模板提供的组件，axios封装

const api_name = '/ucenter/member'


export default {
    //根据id重置用户密码
    resetMemberPass(id) {
        return request({
            //后端controller里面的路径
            url: `${api_name}/${id}`,
            //提交方式
            method: 'get',
             //传递条件对象,如果传递json数据，使用data。如果不是json，使用params

        })

    },

    //根据id删除用户
    deleteMemberId(id) {
        return request({
            //后端controller里面的路径
            url: `${api_name}/${id}`,
            //提交方式
            method: 'delete',
             //传递条件对象,如果传递json数据，使用data。如果不是json，使用params

        })

    },
    //分页条件查询的方法
    //三个参数：当前页，每页记录数，条件封装对象
    getMemberPageList(page,limit,type,searchObj) {
        return request({
            //后端controller里面的路径
            url: `${api_name}/${page}/${limit}/${type}`,
            //提交方式
            method: 'post',
            //传递条件对象,如果传递json数据，使用data。如果不是json，使用params
            data: searchObj
        })
    },
    //用户修改密码
    updatepass(id,curpass,newpass){
        return request({
            url: `${api_name}/updatepass`,
            method: 'post',
            data: {
                id,
                curpass,
                newpass
            }
        })
    },
    //用户修改个人信息
    updateInfo(member){
        return request({
            url: `${api_name}/updateinfo/`,
            method: 'post',
            data: member
        })

    },
    // 检查用户手机号是否存在
    checkMobileIsExist(mobile,type) {
        return request({
            url: `${api_name}/checkmobile/${mobile}/${type}`,
            method: 'get'
        })
    },
    // 根据token获取用户信息
    getInfoByToken(token) {
        return request({
            url: `${api_name}/info/`,
            method: 'post',
            params:{token}
        })
    },
    // 添加用户
    memberadd(member) {
        return request({
            url: `${api_name}/addmember`,
            method:'post',
            data: member
        })
    }


}