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

                        <b-row v-if="!loadStatements" class="text-center m-2">
                            <b-col>
                                <b-button variant="outline-secondary"
                                          @click="onLoadStatements">
                                    Завантажити відомості
                                </b-button>
                            </b-col>
                        </b-row>
                        <statements-table v-else
                                       :statements="statements" :loading="loadingStatements"></statements-table>
                        <b-pagination
                            v-if="loadStatements && !loadingStatements"
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

<script lang="ts">
import StudentTable from "/src/components/tables/StudentTable";
import StatementsTable from "/src/components/tables/StatementsTable";

export default {
    name: "Student",
    components: {
        StudentTable, StatementsTable
    },
    data() {
        return {
            apiURl: 'http://localhost:8000/api',
            student: {},

            loadStatements: false,
            loadingStatements: false,
            statements: [
                {
                    statement_no: 2222222,
                    tutor: "Черкасов Дмитро Іванович",
                    group: "1",
                    control_type: "екзамен",
                    present_count: 30,
                    absent_count: 2,
                    rejected_count: 0,
                    exam_date: "2021-05-25"
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
        onLoadStatements() {
            this.loadStatements = true
            this.loadingStatements = true
            setTimeout(() => {
                console.log("Loaded vidomosti")
                this.loadingStatements = false
                console.log(this.loadingStatements)
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