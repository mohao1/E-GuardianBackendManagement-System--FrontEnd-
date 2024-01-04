import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/oldsterList/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/myData',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'Data',
  //       name: 'myData',
  //       component: () => import('@/views/myData/index'),
  //       // meta: { title: '个人主页', icon: 'table'}
  //     }
  //   ]
  // },

  {
    path: '/oldsterList',
    component: Layout,
    children: [
      {
        path: 'oldster',
        name: 'oldsterList',
        component: () => import('@/views/oldsterList/index'),
        meta: { title: '长辈管理', icon: 'el-icon-user' }
      }
    ]
  },
  {
    path: '/youngerList',
    component: Layout,
    children: [
      {
        path: 'younger',
        name: 'youngerList',
        component: () => import('@/views/youngerList/index'),
        meta: { title: '晚辈管理', icon: 'el-icon-user-solid' }
      }
    ]
  },

  {
    path: '/homeList',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'homeList',
        component: () => import('@/views/homeList/index'),
        meta: { title: '家庭管理', icon: "el-icon-s-home"  }
      }

    ]
  },

  {
    path: '/communityList',
    component: Layout,
    children: [
      {
        path: 'community',
        name: 'communityList',
        component: () => import('@/views/communityList/index'),
        meta: { title: '社区管理', icon: 'el-icon-office-building' }
      }
    ]
  },

  {
    path: '/CommunityUserList',
    component: Layout,
    children: [
      {
        path: 'CommunityUser',
        name: 'CommunityUserList',
        component: () => import('@/views/communityUserList/index'),
        meta: { title: '社区人员管理', icon: 'peoples' }
      }
    ]
  },
  
  {
    path: '/CommunityAdminList',
    component: Layout,
    children: [
      {
        path: 'CommunityAdmin',
        name: 'CommunityAdminList',
        component: () => import('@/views/communityAdminList/index'),
        meta: { title: '社区管理人员管理', icon: 'el-icon-s-custom' }
      }
    ]
  },

  {
    path: '/sosDataList',
    component: Layout,
    children: [
      {
        path: 'sosData',
        name: 'sosDataList',
        component: () => import('@/views/SosDataList/index'),
        meta: { title: '求救信息管理', icon: 'message' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // equire service supportr
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
