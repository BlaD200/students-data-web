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
            path: '/queries/student',
            name: 'StudentQueries',
            component: () => import("@/view/StudentQueries")
        },
        {
            path: '/queries/student',
            name: 'StudentQueries',
            component: () => import("@/layouts/Queries")
        },
        {
            path: '/student/:id',
            name: 'Student',
            component: () => import("@/view/Student")
        }
    ]
})
