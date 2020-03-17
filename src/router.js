import home from './component/home.vue'
import dzlx from './component/dzlx.vue'
import jdcx from './component/jdcx.vue'
import detail from './component/detail.vue'
import login from './component/login.vue'
import register from './component/register.vue'
import lxgh from './component/lxgh.vue'
import changePassword from './component/changePassword.vue'
import routeDetail from './component/routeDetail.vue'
import navi from './component/navi.vue'
import znwd from './component/znwd.vue'

const routers = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/dzlx',
        name: 'dzlx',
        component: dzlx
    },
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
        path: '/jdcx',
        name: 'jdcx',
        component: jdcx
    },
    {
        path: '/lxgh',
        name: 'lxgh',
        component: lxgh
    },
    {
        path: '/detail',
        name: 'detail',
        component: detail
    },
    {
        path: '/login',
        name:'login',
        component: login
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/changePassword',
        name: 'changePassword',
        component: changePassword
    },
    {
        path: '/route',
        name: 'route',
        component: routeDetail
    },
    {
        path: '/navi',
        name: 'navi',
        component: navi
    },
    {
        path: '/znwd',
        name: 'znwd',
        component: znwd
    }
]

export default routers
