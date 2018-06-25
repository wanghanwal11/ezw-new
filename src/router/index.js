import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const load = (...p )=> resolve => require([`@/${p[1] || 'page'}/${p[0]}.vue`], resolve)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      meta: { title: "login"},
      component: load('login'),
    },
    {
      path: '/login1',
      name: 'login1',
      meta: { title: "login1"},
      component: load('login1'),
    },
    {
      path: '/admin',
      name: 'index',
      meta: { title: "index"},
      component: load('admin'),
      children:[
        {
          path: 'shouye',
          meta: { title: "shouye"},
          component: load('index')
        },
        {
          path: 'tongji',
          meta: { title: "tongji"},
          component: load('tongji')
        }, {
          path: 'wode',
          meta: { title: "wode"},
          component: load('wode')
        }
      ]
    },{
      path: '/moudlelist',
      name: 'moudlelist',
      meta: { title: "moudlelist"},
      component: load('moudlelist'),
    },{
      path: '/wghxq',
      name: 'wghxq',
      meta: { title: "wghxq"},
      component: load('wghxq'),
    },{
      path: '/wghlistxq',
      name: 'wghlistxq',
      meta: { title: "wghlistxq"},
      component: load('wghlistxq'),
    },{
      path: '/hujiaozhongxin',
      name: 'hjzxxq',
      meta: { title: "hjzxxq"},
      component: load('hjzxxq'),
    },{
      path: '/hjzxlistxq',
      name: 'hjzxlistxq',
      meta: { title: "hjzxlistxq"},
      component: load('hjzxlistxq'),
    },{
      path: '/test',
      name: 'test',
      meta: { title: "test"},
      component: load('test'),
    },{
      path: '/grxx',
      name: 'grxx',
      meta: { title: "grxx"},
      component: load('grxx'),
    },{
      path: '/shezhi',
      name: 'shezhi',
      meta: { title: "shezhi"},
      component: load('shezhi'),
    },{
      path: '/aqzx',
      name: 'aqzx',
      meta: { title: "aqzx"},
      component: load('aqzx'),
    },{
      path: '/shenqing',
      name: 'shenqing',
      meta: { title: "shenqing"},
      component: load('shenqing'),
    },{
      path: '/checktime',
      name: 'checktime',
      meta: { title: "checktime"},
      component: load('checktime'),
    },{
      path: '/checkzuzhi',
      name: 'checkzuzhi',
      meta: { title: "checkzuzhi"},
      component: load('checkzuzhi'),
    },{
      path: '/checkpeople',
      name: 'checkpeople',
      meta: { title: "checkpeople"},
      component: load('checkpeople'),
    },{
      path: '/shenpi',
      name: 'daishenpi',
      meta: { title: "daishenpi"},
      component: load('daishenpi'),
    },{
      path: '/shenqingxq',
      name: 'shenqingxq',
      meta: { title: "shenqingxq"},
      component: load('shenqingxq'),
    },{
      path: '/shenqingbanli',
      name: 'shenqingbanli',
      meta: { title: "shenqingbanli"},
      component: load('shenqingbanli'),
    },{
      path: '/gonggao',
      name: 'gonggao',
      meta: { title: "gonggao"},
      component: load('gonggao'),
    },{
      path: '/xiegonggao',
      name: 'xiegonggao',
      meta: { title: "xiegonggao"},
      component: load('xiegonggao'),
    },{
      path: '/gonggaoxq',
      name: 'gonggaoxq',
      meta: { title: "gonggaoxq"},
      component: load('gonggaoxq'),
    },{
      path: '/xierizhi',
      name: 'xierizhi',
      meta: { title: "xierizhi"},
      component: load('xierizhi'),
    },{
      path: '/xiezhoubao',
      name: 'xiezhoubao',
      meta: { title: "xiezhoubao"},
      component: load('xiezhoubao'),
    },{
      path: '/xieyuebao',
      name: 'xieyuebao',
      meta: { title: "xieyuebao"},
      component: load('xieyuebao'),
    },{
      path: '/rizhichakan',
      name: 'rizhilist',
      meta: { title: "rizhilist"},
      component: load('rizhilist'),
    },{
      path: '/qiandao',
      name: 'qiandaolist',
      meta: { title: "qiandaolist"},
      component: load('qiandaolist'),
    },{
      path: '/rizhilistxq',
      name: 'rizhilistxq',
      meta: { title: "rizhilistxq"},
      component: load('rizhilistxq'),
    },{
      path: '/xieqiandao',
      name: 'qiandao',
      meta: { title: "qiandao"},
      component: load('qiandao'),
    },{
      path: '/qiandaolistxq',
      name: 'qiandaolistxq',
      meta: { title: "qiandaolistxq"},
      component: load('qiandaolistxq'),
    },{
      path: '/kaoqin',
      name: 'kaoqin',
      meta: { title: "kaoqin"},
      component: load('kaoqin'),
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
router.beforeEach(function (to, from, next) {
  next()
})

router.afterEach(function (to) {
})
export default router
