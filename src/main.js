import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import router from './router'

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
    data: {
        currentUser: {
            id: -1,
            username: '',
            userAuthorities: []
        },
        apiURL: 'http://localhost:8080/api/'
    },
    methods: {
        messageBoxOk(title, bodyText, okBtnStyle) {
            this.$bvModal.msgBoxOk(bodyText, {
                title: title,
                size: 'sm',
                buttonSize: 'sm',
                okVariant: okBtnStyle ? okBtnStyle : 'success',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                centered: true,
                autoFocusButton: 'ok'
            })
        },
        defaultRequestErrorHandler(error) {
            if (error.response) {
                console.log(error.response.status)
                if (error.response.status === 403)
                    this.messageBoxOk('Помилка отримання даних',
                        "Ви не маєте достатньо прав, щоб переглянути цю сторінку або виконати дану дію.")
                else
                    this.messageBoxOk('Error while loading users user',
                        error.response.statusText + '' + error.response.status)
            } else if (error.request) {
                console.log(error.request)
                this.messageBoxOk('Помилка отримання даних',
                    "Помилка з'єднання з сервером")
            } else {
                this.messageBoxOk('Помилка отримання даних',
                    "Будь ласка, зв'яжіться з адміністратором сайту.")
            }
        }
    },
    created() {
        if (localStorage.getItem('currentUser')/* && localStorage.getItem("authorizationToken")*/) {
            try {
                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                let authToken = localStorage.getItem('authorizationToken')
                if (!authToken)
                    throw new Error("Missing auth token")
                axios.defaults.headers.common['Authorization'] = authToken
            } catch (e) {
                localStorage.removeItem('currentUser');
            }
        }
    },
    router,
    render: h => h(App),
}).$mount('#app')
