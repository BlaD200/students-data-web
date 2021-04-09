<template>
    <div class="m-2">

        <b-row class="mb-3">
            <b-col class="p-2 p-lg-3 bg-white rounded-lg shadow">
                <b-row>
                    <b-col>
                        <b-form-group
                            id="fieldset-1"
                            description="Почніть вводити прізвіще ім`я або по-батькові студента"
                            label="Пошук студента за ПІБ"
                            label-for="student-search"
                            invalid-feedback="Введіть щонайменше 4 символи"
                            :state="searchValid"
                        >
                            <b-input-group class="mb-2">
                                <b-input-group-prepend is-text>
                                    <b-icon icon="search"></b-icon>
                                </b-input-group-prepend>
                                <b-form-input id="student-search"
                                              v-model="searchStudentPIBInput"
                                              @input="showStudents"
                                              :state="searchValid"
                                              placeholder="Введіть ПІБ студента"></b-form-input>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row v-show="searchValid" class="my-2">
                    <b-col>
                        <studentTable :students="students" :loading="loadStudents"
                                      @studentTableRowClicked="studentIdChosen = $event"
                        ></studentTable>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <div v-show="showStudentDetails" class="mt-4">
            <b-row>
                <b-col class="p-2 p-lg-3 bg-white rounded-lg shadow">
                    <h2 class="mb-0 m-1">
                        {{ studentFullName }}
                    </h2>
                </b-col>
            </b-row>

            <b-row class="mt-3">
                <b-col class="p-2 p-lg-3 bg-white rounded-lg shadow">
                    <div class="mb-2 m-1 d-flex justify-content-between align-items-center">
                        <h4 class=" align-middle mb-0">
                                    <span v-b-tooltip.right
                                          title='Всі відомості, в яких є даний студент'>
                                    Оцінки
                                    </span>
                        </h4>

                        <div>
                            <b-button v-if="!loadGrades"
                                      class=""
                                      size="sm" variant="outline-secondary"
                                      @click="onLoadGrades">
                                Завантажити оцінки
                            </b-button>

                            <b-button v-else
                                      @click="loadGrades = false"
                                      size="sm" class=" mb-n1" variant="outline-secondary">
                                Сховати
                            </b-button>
                        </div>
                    </div>

                    <div v-show="loadGrades" class="py-2">
                        <b-tabs v-model="courseTab" justified class="mb-3"
                                active-nav-item-class="bg-secondary text-light"
                        >
                            <b-tab v-for="tabCourseTitle in courseTabTitles"
                                   :key="courseTabTitles.indexOf(tabCourseTitle)"
                                   :title="tabCourseTitle" class="p-0"
                                   :disabled="student.studentCourse-1 < courseTabTitles.indexOf(tabCourseTitle)"
                                   :title-link-class="student.studentCourse-1 < courseTabTitles.indexOf(tabCourseTitle) ?
                                                        'bg-light' : ''"
                            >
                                <b-tabs v-model="courseTab" card pills end class="mb-3" align="center"
                                        active-nav-item-class=" btn-outline-secondary"
                                        nav-class="text-dark"
                                        nav-wrapper-class="bg-light"
                                        content-class="p-0 m-0"
                                >
                                    <b-tab v-for="tabSemesterTitle in semesterTabTitles"
                                           :key="semesterTabTitles.indexOf(tabSemesterTitle)"
                                           :title="tabSemesterTitle" class=""
                                    >


                                        <b-pagination
                                            v-if="loadGrades && !loadingGrades"
                                            v-model="subjectsPagination.currentPage"
                                            :total-rows="subjectsPagination.totalElements"
                                            :per-page="subjectsPagination.perPage"
                                            first-number
                                            last-number
                                            align="center"
                                            @change="(e) => $emit('change', e)"
                                        ></b-pagination>
                                    </b-tab>
                                </b-tabs>
                            </b-tab>
                        </b-tabs>
                    </div>
                </b-col>
            </b-row>

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
        </div>


    </div>
</template>

<script>
import StatementsTable from "/src/components/tables/StatementsTable";
import BigunetsTable from "../components/tables/BigunetsTable.vue";
import StudentTable from "@/components/tables/StudentTable";

export default {
    name: "Student",
    components: {
        StudentTable, StatementsTable, BigunetsTable
    },
    props: {
        id: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            apiURl: 'http://localhost:8000/api',

            students: [],
            loadStudents: false,
            searchStudentPIBInput: '',
            studentIdChosen: null,

            student: {
                studentCourse: 2
            },

            loadGrades: true,
            loadingGrades: false,
            courseTabTitles: ['Курс 1', 'Курс 2', 'Курс 3', 'Курс 4'],
            semesterTabTitles: ['Осінь', 'Весна', 'Літо'],
            courseTab: -1,
            semesterTab: -1,
            subjectsPagination: {
                currentPage: 1,
                totalElements: 5,
                perPage: 4
            },

            loadStatements: false,
            loadingStatements: false,
            statements: [
                {
                    statementNo: 2222222,
                    tutor: "Черкасов Дмитро Іванович",
                    subject: 'Технології сучасних дата - центрів',
                    group: "1",
                    controlType: "екзамен",
                    presentCount: 30,
                    absentCount: 2,
                    rejectedCount: 0,
                    examDate: "2021-05-25"
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
                    statementNo: 2222222,
                    tutor: "Черкасов Дмитро Іванович",
                    controlType: "екзамен",
                    postponeReason: "хвороба",
                    examDate: "2021-05-25",
                    validUntil: "2021-05-24"
                }, {
                    statementNo: 2222222,
                    tutor: "Черкасов Дмитро Іванович",
                    controlType: "екзамен",
                    postponeReason: "",
                    examDate: "2021-05-25",
                    validUntil: null
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
        showStudents() {
            if (this.searchValid) {
                console.log("searching...")
                this.loadStudents = true
                setInterval(() => this.loadStudents = false, 100)
                this.$http
                    .get(this.apiURl + '/students')
                    .then(response => {
                        this.students = []
                        response.data.data.forEach(user => this.students.push(user))
                        this.students = this.students.filter(student => {
                            console.log(student)
                            return student.studentSurname.toLowerCase().includes(this.searchStudentPIBInput.toLowerCase());
                        })
                        this.totalElements = response.data.totalElements // TODO Use pageable
                        this.loading = false
                    })
                    .catch(error => {
                        // this.$root.defaultRequestErrorHandler(error)
                        console.log(error, "179")
                        this.loading = false
                    })
            }
        },
        getStudentInfo() {
            const config = {
                params: {}
            }
            this.$http
                .get(`${this.apiURl}/student/${this.id}`, config)
                .then(response => {
                    this.student = response.data
                    this.loading = false
                })
                .catch(error => {
                    error
                    // this.$root.defaultRequestErrorHandler(error)
                    this.loading = false
                })
        },
        onLoadGrades() {
            this.loadGrades = true
            // if (this.statements.length > 0)
            //     return

            this.loadingGrades = true

            setTimeout(() => {
                this.loadingGrades = false
            }, 500)

            // this.$http
            //     .get(`${this.apiURl}/statements`, this.config)
            //     .then(response => {
            //         this.statements = []
            //         response.data.data.forEach(statement => this.statements.push(statement))
            //         this.statementsPagination.totalElements = response.data.totalElements // TODO Use pageable
            //         this.loading = false
            //     })
            //     .catch(error => {
            //         this.$root.defaultRequestErrorHandler(error)
            //         this.loading = false
            //     })
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
        },
        searchValid() {
            if (this.searchStudentPIBInput.length === 0)
                return null
            return this.searchStudentPIBInput.length >= 4
        },
        showStudentDetails() {
            return (this.searchValid && this.studentIdChosen) || this.id
        }, studentFullName() {
            return `${this.student.studentSurname} ${this.student.studentName} ${this.student.studentPatronymic}`
        }
    }
}
</script>

<style>
/*.tab-title-text {*/
/*    color: #2c3e50;*/
/*}*/
.nav-tabs a:not(.active):not(.disabled) {
    color: #495057 !important;
}

.nav-tabs a:not(.active):hover {
    color: #09223b !important;
}

.nav-tabs .nav-link.disabled {
    background-color: #e9ecef!important;
    border: 1px solid #ced4da;
}
</style>