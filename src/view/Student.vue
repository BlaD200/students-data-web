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
                        <div class="mb-2">
                            <h4 class="d-inline-block align-middle mb-0">
                                <span v-b-tooltip.right
                                      title='Всі відомості, в яких є даний студент'>
                                Відомості
                                </span>
                            </h4>
                            <b-button v-show="loadStatements"
                                      @click="loadStatements = false"
                                      size="sm" class="float-right" variant="outline-secondary">
                                Сховати
                            </b-button>
                        </div>

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
                            v-model="statementsPagination.currentPage"
                            :total-rows="statementsPagination.totalElements"
                            :per-page="statementsPagination.perPage"
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
                        <div class="mb-2">
                            <h4 class="d-inline-block align-middle mb-0">
                                <span v-b-tooltip.right
                                      title='Всі бігунці, в яких є даний студент'>
                                Бігунці
                                </span>
                            </h4>
                            <b-button v-show="loadBiguntsi"
                                      @click="loadBiguntsi = false"
                                      size="sm" class="float-right" variant="outline-secondary">Сховати
                            </b-button>
                        </div>

                        <b-row v-if="!loadBiguntsi" class="text-center mt-2">
                            <b-col>
                                <b-button variant="outline-secondary"
                                          @click="onLoadBiguntsi">
                                    Завантажити бігунці
                                </b-button>
                            </b-col>
                        </b-row>
                        <bigunets-table v-else
                                        :statements="biguntsi" :loading="loadingBiguntsi"></bigunets-table>
                        <b-pagination
                            v-if="loadBiguntsi && !loadingBiguntsi"
                            v-model="biguntsiPagination.currentPage"
                            :total-rows="biguntsiPagination.totalElements"
                            :per-page="biguntsiPagination.perPage"
                            first-number
                            last-number
                            align="center"
                            @change="(e) => $emit('change', e)"
                        ></b-pagination>
                    </b-col>
                </b-row>

                <hr>
            </div>

        </b-col>

    </b-row>
</template>

<script>
import StatementsTable from "/src/components/tables/StatementsTable";
import BigunetsTable from "../components/tables/BigunetsTable.vue";

export default {
    name: "Student",
    components: {
        StatementsTable, BigunetsTable
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
            statementsPagination: {
                currentPage: 1,
                totalElements: 5,
                perPage: 4
            },

            loadBiguntsi: false,
            loadingBiguntsi: false,
            biguntsi: [
                {
                    statement_no: 2222222,
                    tutor: "Черкасов Дмитро Іванович",
                    control_type: "екзамен",
                    postp_reason: "хвороба",
                    exam_date: "2021-05-25",
                    valid_until: "2021-05-24"
                }, {
                    statement_no: 2222222,
                    tutor: "Черкасов Дмитро Іванович",
                    control_type: "екзамен",
                    postp_reason: "",
                    exam_date: "2021-05-25",
                    valid_until: null
                }
            ],
            biguntsiPagination: {
                currentPage: 1,
                totalElements: 5,
                perPage: 4
            },
        }
    },
    created() {
        this.getStudentInfo()
    },
    methods: {
        getStudentInfo() {
            const config = {
                params: {}
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
            if (this.statements.length > 0)
                return

            this.loadingStatements = true

            setTimeout(() => {
                this.loadingStatements = false
            }, 500)

            this.$http
                .get(`${this.apiURl}/statements`, this.config)
                .then(response => {
                    this.statements = []
                    response.data.data.forEach(statement => this.statements.push(statement))
                    this.statementsPagination.totalElements = response.data.totalElements // TODO Use pageable
                    this.loading = false
                })
                .catch(error => {
                    this.$root.defaultRequestErrorHandler(error)
                    this.loading = false
                })
        },
        onLoadBiguntsi() {
            this.loadBiguntsi = true
            if (this.biguntsi.length > 0)
                return

            this.loadingBiguntsi = true
            setTimeout(() => this.loadingBiguntsi = false, 500)

            this.$http
                .get(`${this.apiURl}/biguntsi`, this.config)
                .then(response => {
                    this.biguntsi = []
                    response.data.data.forEach(bigunets => this.biguntsi.push(bigunets))
                    this.biguntsiPagination.totalElements = response.data.totalElements // TODO Use pageable
                    this.loading = false
                })
                .catch(error => {
                    this.$root.defaultRequestErrorHandler(error)
                    this.loading = false
                })
        }
    },
    computed: {
        config() {
            return {params: {studentRecordBook: this.student.studentRecordBook}}
        }
    }
}
</script>

<style scoped>

</style>