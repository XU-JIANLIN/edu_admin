import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  //后台管理首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard',
      title:'首页',
      component: () => import('@/views/dashboard/index')
    }]
  },

  // 讲师管理
  
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    name: '讲师管理',
    meta: { title: '讲师管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '讲师列表',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: '讲师列表', icon: 'table' }
      },
      {
        path: 'form',
        name: '添加讲师',
        component: () => import('@/views/edu/teacher/form'),
        meta: { title: '添加讲师', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '修改讲师',
        component: () => import('@/views/edu/teacher/form'),
        meta: { title: '修改讲师', icon: 'tree' },
        hidden: true
      }
    ]
  },
  // 课程分类管理
  
  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/index',
    name: '分类管理',
    meta: { title: '分类管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '分类列表',
        component: () => import('@/views/edu/subject/list'),
        meta: { title: '分类列表', icon: 'table' }
      },
      {
        path: 'form',
        name: '导入分类',
        component: () => import('@/views/edu/subject/import'),
        meta: { title: '导入分类', icon: 'tree' }
      }
    ]
  },
  //课程管理
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'example' },
    children: [
      { 
        path: 'list',
        name: '课程列表',
        component: () => import('@/views/edu/course/index'),
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path: 'info',
        name: '发布课程',
        component: () => import('@/views/edu/course/info'),
        meta: { title: '发布课程', icon: 'tree' }
      },
      {
        path: 'info/:id',
        name: 'EduCourseInfoEdit',
        component: () => import('@/views/edu/course/info'),
        meta: { title: '编辑课程基本信息', noCache: true },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'EduCourseChapterEdit',
        component: () => import('@/views/edu/course/chapter'),
        meta: { title: '编辑课程大纲', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/edu/course/publish'),
        meta: { title: '发布课程', noCache: true },
        hidden: true
      }
    ]
  },
  //网站管理
  {
    path: '/web',
    component: Layout,
    redirect: '/web/index',
    name: '网站管理',
    meta: { title: '网站管理', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '首页信息',
        component: () => import('@/views/edu/web/index'),
        meta: { title: '首页信息', icon: 'tree' }
      },
      {
        path: 'lunbotu',
        name: '轮播管理',
        component: () => import('@/views/edu/web/lunbotu'),
        meta: { title: '轮播管理', icon: 'table' }
      }
    ]
  },
   //个人设置
  {
    path: '/myinfo',
    component: Layout,
    redirect: '/myinfo/index',
    name: '个人设置',
    meta: { title: '个人设置', icon: 'example' },
    children: [
      {
        path: 'index/',
        name: '个人信息',
        component: () => import('@/views/edu/myinfo/index'),
        meta: { title: '个人信息', icon: 'table' }
      },
      {
        path: 'pass',
        name: '修改密码',
        component: () => import('@/views/edu/myinfo/pass'),
        meta: { title: '修改密码', icon: 'table' }
      }
    ]
  },

  //用户管理
  {
    path: '/member',
    component: Layout,
    redirect: '/member/adminlist',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'adminlist',
        name: '管理员列表',
        component: () => import('@/views/edu/member/adminlist'),
        meta: { title: '管理员列表', icon: 'table' }
      },
      {
        path: 'userlist',
        name: '会员列表',
        component: () => import('@/views/edu/member/userlist'),
        meta: { title: '会员列表', icon: 'table' }
      },
      {
        path: 'addmember',
        name: '添加用户',
        component: () => import('@/views/edu/member/addmember'),
        meta: { title: '添加用户', icon: 'table' }
      }
    ]
  },
  //订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: '订单管理',
    meta: { title: '订单管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '订单列表',
        component: () => import('@/views/edu/order/list'),
        meta: { title: '订单列表', icon: 'table' }
      },
    ]
  },

  

  { path: '*', redirect: '/404', hidden: true }
]
import { mapGetters } from 'vuex'
export default new Router({
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
