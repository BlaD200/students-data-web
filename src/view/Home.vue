<template>
    <div>
        <b-row v-if="isLoggedIn" class="justify-content-center">
            <b-col cols="12" md="8" lg="6" class="mt-5 text-center">
                <b-row>
                    <b-col>
                        <h5 class="text-center">
                            <b>Користувач</b>
                        </h5>
                        <h6>{{ $root.currentUser.username }}</h6>
                    </b-col>
                </b-row>
                <hr>

                <b-row class="mb-2 mt-4">
                    <b-col>
                        <h3><router-link to="LoadDocument" class="text-info">Завантажити документ</router-link></h3>
                    </b-col>
                </b-row>


                <b-row>
                    <b-col>
                        <h3 class="mt-5 mb-3">Знайти: </h3>
                        <hr>
                        <b-row class="justify-content-center text-center">
                            <b-col cols="4">
                                <router-link :to="{name: 'StudentsQueries'}" class="btn btn-primary">Студентів</router-link>
                            </b-col>
                            <b-col cols="4" class="">
                                <router-link :to="{name: 'StudentSearchDetails'}" class="btn btn-primary">Студента</router-link>
                            </b-col>
                        </b-row>
                        <b-row class="justify-content-center">
                            <b-col cols="4" class="text-center">
                                <h5><router-link :to="{name: 'DataQueries'}" class="btn btn-primary">Відомості</router-link></h5>
                            </b-col>
                            <b-col cols="4" class=" text-center">
                                <h5><router-link :to="{name: 'SubjectSearch'}" class="btn btn-primary">Предмет</router-link></h5>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <b-row v-else class="justify-content-center">
            <b-col cols="12" md="8" class="mt-5 text-center">
                <h3 class="">
                    Ви не увійшли в систему. Будь ласка, зробіть це зараз
                </h3>

                <b-button class="mt-3"
                          v-b-modal.loginModal
                >
                    Увійти
                </b-button>
            </b-col>
        </b-row>


    </div>
</template>

<script>

export default {
    name: "Home",
    components: {

    },
    created() {
    },
    computed: {
        isLoggedIn(){
            return (Boolean)(localStorage.getItem('currentUser'))
        }
    }
}
</script>

<style scoped>
    h3 {
        text-align: center;
    }
    h5 {
        margin: 0.75rem 0 0.75rem 0;
    }
</style>