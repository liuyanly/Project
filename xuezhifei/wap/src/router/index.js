import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 老师
const teacher = {
    path: '/teacher',
    name: 'teacher',
    component: resolve => require(['../pages/teacher/teacher.vue'], resolve),
    // children: [
    //     //详情
    //     {
    //         path: 'detail',
    //         name: 'detail',
    //         component: resolve => require(['../pages/teacher/detail.vue'], resolve)
    //     },
    // ]
}
const detail = {
    path: '/detail',
    name: 'detail',
    component: resolve => require(['../pages/teacher/detail.vue'], resolve)

}
const selected = {
    path: '/selected',
    name: 'selected',
    component: resolve => require(['../pages/teacher/selected.vue'], resolve)
}
//家长
const patriarch = {
    path: '/patriarch',
    name: 'patriarch',
    component: resolve => require(['../pages/patriarch/patriarch.vue'], resolve)
}
const test = {
    path: '/test',
    name: 'test',
    component: resolve => require(['../pages/patriarch/test.vue'], resolve)
}
const report = {
    path: '/report',
    name: 'report',
    component: resolve => require(['../pages/patriarch/report.vue'], resolve)
}
const wrongList = {
    path: '/wrongList',
    name: 'wrongList',
    component: resolve => require(['../pages/patriarch/wrongList.vue'], resolve)
}
const wrongDetail = {
    path: '/wrongDetail',
    name: 'wrongDetail',
    component: resolve => require(['../pages/patriarch/wrongDetail.vue'], resolve)
}
const onceAgainTest = {
    path: '/onceAgainTest',
    name: 'onceAgainTest',
    component: resolve => require(['../pages/patriarch/onceAgainTest.vue'], resolve)
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/teacher'
    },
    teacher,
    detail,
    selected,
    patriarch,
    test,
    report,
    wrongList,
    wrongDetail,
    onceAgainTest
  ]
})
