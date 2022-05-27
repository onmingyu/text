import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import DnaOrderlist from './views/report/DnaOrder-list.vue'
import ApptOrderlist from './views/report/ApptOrder-list.vue'
import HealthQuestionList from './views/report/health-question-list.vue'
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '核酸检测',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/DnaOrderlist', component: DnaOrderlist, name: '核酸检测登记信息' },
            { path: '/ApptOrderlist', component: ApptOrderlist, name: '网上预约信息' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '调查问卷',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/healthquestionlist', component: HealthQuestionList, name: '核酸检测筛查表' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;