import request from '@/utils/request' //模板提供的组件，axios封装

const apiurl = "/ucenter/lunbotu/"

export default {

  //更新轮播图
  updateLunbotu(lunbotuInfo){
    return request({
      //后端controller里面的路径
      url: `${apiurl}`,
      //提交方式
      method: 'put',
      data: lunbotuInfo
    })
  },
  //添加轮播图
  addLunbotu(lunbotuInfo){
    return request({
      //后端controller里面的路径
      url: `${apiurl}`,
      //提交方式
      method: 'post',
      data: lunbotuInfo
    })
  },

  //删除轮播图
  deleteLunbotu(id){
    return request({
      //后端controller里面的路径
      url: '/ucenter/lunbotu/'+`${id}`,
      //提交方式
      method: 'delete'
    })
  },
  //更新轮播图的状态
  changeLunbotuStatus(id,status){
    return request({
      //后端controller里面的路径
      url: '/ucenter/lunbotu/'+`${id}/${status}`,
      //提交方式
      method: 'put'
    })
  },
  //分页查询的方法
  //三个参数：当前页，每页记录数
  getLunbotuPage(page,limit) {
      return request({
          //后端controller里面的路径
          url: '/ucenter/lunbotu/'+`${page}/${limit}`,
          //提交方式
          method: 'get'
      })
  },
  

 
    
}