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
        }
    ]
})
