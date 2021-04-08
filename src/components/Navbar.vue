<template>
    <div>
        <b-navbar class="fixed-top" toggleable="lg" type="dark" variant="dark">
            <router-link :to="{name: 'Home'}" class="navbar-brand">Students data</router-link>

            <b-navbar-nav class="ml-auto float-right" v-if="!$root.currentUser.username">
                <b-nav-item class="ml-auto"
                            v-b-modal.loginModal
                ><em>Log in</em></b-nav-item>
            </b-navbar-nav>

            <b-navbar-toggle target="nav-collapse" v-else></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav v-if="$root.currentUser.username">
                <!--            <b-collapse id="nav-collapse" is-nav>-->
                <b-navbar-nav>
                    <router-link :to="{name: 'LoadDocument'}"
                                 class="nav-link"
                    >
                        Завантажити
                    </router-link>

                    <b-nav-item-dropdown text="Запити">
                        <b-dropdown-item :to="{name: 'StudentsQueries'}">Студенти</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'StudentQueries'}">Студент</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'DataQueries'}">Відомості</b-dropdown-item>
                        <b-dropdown-item :to="{name: 'CalculationQueries'}">Обрахунки</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <!--                    <router-link :to="{name: 'Producers'}"-->
                    <!--                                 class="nav-link"-->
                    <!--                    >Producers-->
                    <!--                    </router-link>-->

                    <!--                    <router-link :to="{name: 'Users'}"-->
                    <!--                                 class="nav-link"-->
                    <!--&lt;!&ndash;                                 v-if="$root.currentUser.userAuthorities.includes('GET_USER')"&ndash;&gt;-->
                    <!--                    >Users-->
                    <!--                    </router-link>-->
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