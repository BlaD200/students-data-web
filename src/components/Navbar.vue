<template>
    <div>
        <b-navbar class="fixed-top" toggleable="lg" type="dark" variant="dark">
            <router-link :to="{name: 'Home'}" class="navbar-brand">Менеджер відомостей</router-link>

            <b-navbar-nav class="ml-auto float-right" v-if="!$root.currentUser.username">
                <b-nav-item class="ml-auto"
                            v-b-modal.loginModal
                ><em>Увійти</em></b-nav-item>
            </b-navbar-nav>

            <b-navbar-toggle target="nav-collapse" v-else></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav v-if="$root.currentUser.username">
                <b-navbar-nav>
                    <router-link :to="{name: 'LoadDocument'}"
                                 class="nav-link"
                    >
                        Завантажити
                    </router-link>
                    <b-nav-item-dropdown text="Пошук">
                        <b-dropdown-item :to="{name: 'StudentsQueries'}">Студентів</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'StudentSearchDetails'}">Студента</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'DataQueries'}">Відомостей</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'SubjectSearch'}">Предмета</b-dropdown-item>
                    </b-nav-item-dropdown>

                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right v-if="$root.currentUser.username">
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <b>{{ $root.currentUser.username }}</b>
                        </template>
                        <b-dropdown-item @click="$emit('signOut')">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <loginForm/>
    </div>

</template>

<script>
import loginForm from './LoginForm'

export default {
    name: "navbar",
    components: {
        loginForm
    }
}
</script>

<style scoped>

</style>