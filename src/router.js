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
            path: '/document/:id',
            name: 'Statement',
            props: route => ({id: route.params.id, type: route.query.type}),
            component: () => import("@/view/Statement")
        },
        // {
        //     path: '/document/:id/?type=bigunets',
        //     name: 'Bigunets',
        //     props: true,
        //     component: () => import("@/view/Statement")
        // },
        {
            path: '/subject',
            name: 'SubjectSearch',
            component: () => import("@/view/Subject")
        },
        {
            path: '/subject/:id',
            name: 'Subject',
            props: true,
            component: () => import("@/view/Subject")
        }
    ]
})
