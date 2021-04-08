<template>
    <div class="m-2">
        <b-row>
            <b-col class="p-2 p-lg-3 bg-white rounded-lg shadow">
                <h2 class="mb-0 m-1">
                    {{ student.studentSurname }} {{ student.studentName }} {{ student.studentPatronymic }}
                </h2>
            </b-col>
        </b-row>

<!--        <hr>-->

        <!--        <div class="px-2 mt-4 ">-->
        <b-row class="mt-3">
            <b-col class="p-2 p-lg-3 bg-white rounded-lg shadow">
                <div class="mb-2 m-1 d-flex justify-content-between align-items-center">
                    <h4 class=" align-middle mb-0">
                                    <span v-b-tooltip.right
                                          title='Всі відомості, в яких є даний студент'>
                                    Відомості
                                    </span>
                    </h4>

                    <div>
                        <b-button v-if="!loadStatements"
                                  class=""
                                  size="sm" variant="outline-secondary"
                                  @click="onLoadStatements">
                            Завантажити відомості
                        </b-button>

                        <b-button v-else
                                  @click="loadStatements = false"
                                  size="sm" class=" mb-n1" variant="outline-secondary">
                            Сховати
                        </b-button>
                    </div>
                </div>

                <div v-show="loadStatements" class="py-2">
                    <statements-table :statements="statements"
                                      :loading="loadingStatements"></statements-table>
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
                </div>

            </b-col>
        </b-row>

<!--        <hr>-->

        <b-row class="mt-3">
            <b-col class="p-2 p-lg-3 bg-white rounded-lg shadow">
                <div class="mb-2 m-1 d-flex justify-content-between align-items-center">
                    <h4 class="d-inline-block align-middle mb-0">
                                    <span v-b-tooltip.right
                                          title='Всі бігунці, в яких є даний студент'>
                                    Бігунці
                                    </span>
                    </h4>

                    <b-button v-if="!loadBiguntsi"
                              size="sm" variant="outline-secondary"
                              @click="onLoadBiguntsi">
                        Завантажити бігунці
                    </b-button>
                    <b-button v-else
                              @click="loadBiguntsi = false"
                              size="sm" class="float-right" variant="outline-secondary">Сховати
                    </b-button>
                </div>

                <div v-show="loadBiguntsi">
                    <bigunets-table v-show="loadBiguntsi"
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
                </div>
            </b-col>
        </b-row>

        <hr>
        <!--        </div>-->

    </div>
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
                    subject: 'Технології сучасних дата - центрів',
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