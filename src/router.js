import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import("@/view/Home")
        },
        {
            path: '/loadDocument',
            name: 'LoadDocument',
            component: () => import("@/view/LoadDocument")
        },
        {
            path: '/queries/students',
            name: 'StudentsQueries',
            component: () => import("@/view/StudentsQueries")
        },
        {
            path: '/queries/statements',
            name: 'DataQueries',
            component: () => import("@/view/DataQueries")
        },
        {
            path: '/student',
            name: 'StudentSearchDetails',
            component: () => import("@/view/Student")
        },
        {
            path: '/student/:id',
            name: 'Student',
            props: true,
            component: () => import("@/view/Student")
        },
        {
            path: '/statement/:id',
            name: 'Statement',
            props: true,
            component: () => import("@/view/Statement")
        },
        {
            path: '/bigunets/:id',
            name: 'Bigunets',
            props: true,
            component: () => import("@/view/Statement")
        }
    ]
})
