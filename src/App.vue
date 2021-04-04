<template>
    <div id="app">
        <navbar @signOut="signOut"></navbar>

        <b-container class="pt-4 mt-5">
            <router-view></router-view>
        </b-container>
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import navbar from "@/components/Navbar";

export default {
    name: 'App',
    components: {
        navbar
        // HelloWorld
    },
    methods: {
        signOut() {
            localStorage.setItem("currentUser", "")
            localStorage.setItem("authorizationToken", "")
            console.log()
            if (this.$route.path === '/')
                this.$router.go(0)
            else {
                this.$router.push('/')
                this.$router.go(0)
            }
        },
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
