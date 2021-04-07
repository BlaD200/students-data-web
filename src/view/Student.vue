<template>
    <b-row>
        <b-col>
            <h2 class="">
                {{ student.studentSurname }} {{ student.studentName }} {{ student.studentPatronymic }}
            </h2>

            <hr>

            <div class="px-2">
                <b-row class="mt-4">
                    <b-col>
                        <h4>
                        <span v-b-tooltip.right
                              title='Всі відомості, в яких є даний студент'>
                        Відомості
                        </span>
                        </h4>

                        <b-row v-if="!loadVidomosti" class="text-center m-2">
                            <b-col>
                                <b-button variant="outline-secondary"
                                          @click="onLoadVidomosty">
                                    Завантажити відомості
                                </b-button>
                            </b-col>
                        </b-row>
                        <student-table v-else
                                       :students="vidomosty" :loading="loadingVidomosti"></student-table>
                        <b-pagination
                            v-if="loadVidomosti && !loadingVidomosti"
                            v-model="vidomostiPagination.currentPage"
                            :total-rows="vidomostiPagination.totalElements"
                            :per-page="vidomostiPagination.perPage"
                            first-number
                            last-number
                            align="center"
                            @change="(e) => $emit('change', e)"
                        ></b-pagination>
                    </b-col>
                </b-row>

                <hr>

                <b-row class="mt-4">
                    <b-col>
                        <h4>
                        <span v-b-tooltip.right
                              title='Всі бігунці, в яких є даний студент'>
                        Бігунці
                        </span>
                        </h4>

                        <b-row v-if="!loadBiguntsi" class="text-center mt-2">
                            <b-col>
                                <b-button variant="outline-secondary"
                                          @click="onLoadBiguntsi">
                                    Завантажити бігунці
                                </b-button>
                            </b-col>
                        </b-row>
                        <student-table v-else
                                       :students="biguntsi" :loading="loadingBiguntsi"></student-table>
                    </b-col>
                </b-row>
            </div>

        </b-col>

    </b-row>
</template>

<script>
import StudentTable from "@/components/tables/StudentTable";

export default {
    name: "Student",
    components: {
        StudentTable
    },
    data() {
        return {
            apiURl: 'http://localhost:8000/api',
            student: {},

            loadVidomosti: false,
            loadingVidomosti: false,
            vidomosty: [
                {
                    "studentCode": 2,
                    "studentSurname": "Синицин",
                    "studentName": "Владислав",
                    "studentPatronymic": "Олександрович",
                    "studentRecordBook": "32432"
                }, {
                    "studentCode": 2,
                    "studentSurname": "Синицин",
                    "studentName": "Владислав",
                    "studentPatronymic": "Олександрович",
                    "studentRecordBook": "32432"
                }, {
                    "studentCode": 5,
                    "studentSurname": "Ландяк",
                    "studentName": "Андрій",
                    "studentPatronymic": "Петрович",
                    "studentRecordBook": "22113"
                }, {
                    "studentCode": 1,
                    "studentSurname": "Кучерявий",
                    "studentName": "Вадим",
                    "studentPatronymic": "Юрійович",
                    "studentRecordBook": "13113"
                }, {
                    "studentCode": 6,
                    "studentSurname": "Крейдун",
                    "studentName": "Андрій",
                    "studentPatronymic": "Миколайович",
                    "studentRecordBook": "33122"
                }],
            vidomostiPagination: {
                currentPage: 1,
                totalElements: 5,
                perPage: 4
            },

            loadBiguntsi: false,
            loadingBiguntsi: false,
            biguntsi: [],
        }
    },
    created() {
        this.getStudentInfo()
    },
    methods: {
        getStudentInfo() {
            const config = {
                params: this.params
            }
            this.$http
                .get(`${this.apiURl}/student/${this.$route.params.id}`, config)
                .then(response => {
                    this.student = response.data
                    this.loading = false
                })
                .catch(error => {
                    this.$root.defaultRequestErrorHandler(error)
                    this.loading = false
                })
        },
        onLoadVidomosty() {
            this.loadVidomosti = true
            this.loadingVidomosti = true
            setTimeout(() => {
                console.log("Loaded vidomosti")
                this.loadingVidomosti = false
                console.log(this.loadingVidomosti)
            }, 500)
        },
        onLoadBiguntsi() {
            this.loadBiguntsi = true
            this.loadingBiguntsi = true
            setTimeout(() => this.loadingBiguntsi = false, 500)
        }
    }
}
</script>

<style scoped>

</style>