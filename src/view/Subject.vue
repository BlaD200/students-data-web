<template>
    <div class="m-2">
        <div v-show="showSubjectDetails" class="mb-3">
            <b-row>
                <b-col class="p-2 p-lg-3 bg-white rounded-lg shadow">
                    <h2 class="mb-0 m-1">
                        {{ subject.subjectName }}
                    </h2>
                    <hr>
                    <b-row>
                        <b-col cols="12" lg="7">
                            <h4>Викладач: <b>{{ subject.tutorFullName }}</b></h4>
                        </b-col>
                        <b-col cols="12" lg="5" class="text-lg-right">
                            <h4>Середній бал: <b>{{ subject.averageGrade }}</b></h4>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

        </div>

        <b-row class="mb-3">
            <b-col class="p-2 p-lg-3 bg-white rounded-lg shadow">
                <search-with-table
                    @input="onLoadSubjects"
                    description="Почніть вводити назву предмета"
                    label="Пошук предмета за назвою"
                    placeholder="Введіть назву предмета"
                >
                    <div slot="table">
                        <subjects-table
                            :subjects="subjects" :loading="loadingSubjects"
                            @subjectTableRowClicked="onSubjectChosen"
                        ></subjects-table>
                        <b-pagination
                            v-if="!loadingSubjects &&
                                    totalElements > perPage"
                            v-model="currentPage"
                            :total-rows="totalElements"
                            :per-page="perPage"
                            first-number
                            last-number
                            align="center"
                            @change="onSubjectsPageChanged"
                        ></b-pagination>
                    </div>
                </search-with-table>
            </b-col>
        </b-row>

        <div v-show="showSubjectDetails" class="mb-3">
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
                            v-if="loadStatements && !loadingStatements
                                    && statementsPagination.totalElements > statementsPagination.perPage"
                            v-model="statementsPagination.currentPage"
                            :total-rows="statementsPagination.totalElements"
                            :per-page="statementsPagination.perPage"
                            first-number
                            last-number
                            align="center"
                            @change="onStatementsPageChanged"
                        ></b-pagination>
                    </div>

                </b-col>
            </b-row>

        </div>

    </div>
</template>

<script>
import SearchWithTable from "@/components/inputs/SearchWithTable";
import SubjectsTable from "@/components/tables/SubjectsTable";
import StatementsTable from "@/components/tables/StatementsTable";

export default {
    name: "Subject",
    components: {
        SearchWithTable, SubjectsTable, StatementsTable
    },
    props: {
        id: String
    },
    data() {
        return {
            apiUrl: 'http://localhost:8000/api',

            loadingSubjects: false,
            subjects: [],
            subjectSearchInput: '',
            subjectIdChosen: null,
            currentPage: 1,
            totalElements: 0,
            perPage: 10,

            subject: {
                subjectID: 1,
                subjectName: 'Технології сучасних дата - центрів',
                tutorFullName: 'Черкасов Дмитро Іванович',
                averageGrade: 87.33,
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
                totalElements: 0,
                perPage: 10
            },
        }
    },
    methods: {
        getSubjectInfo() {
            this.subject = this.subjects.find(subject => subject.subjectId === this.subjectIdChosen)
        },
        onLoadSubjects(input) {
            this.subjectSearchInput = input
            if (this.searchValid) {
                this.loadingSubjects = true
                // if (this.statements.length > 0)
                //     return

                this.subjects.push({
                    subjectId: 1,
                    subjectName: 'Технології сучасних дата - центрів',
                    tutorFullName: "Черкасов Дмитро Іванович",
                    averageGrade: 86.68
                })

                this.loadingSubjects = true
                this.$http
                    .get(`${this.apiUrl}/subjects`, {
                        params: {
                            subjectName: this.subjectSearchInput,
                            page: this.currentPage,
                            numberPerPage: this.perPage,
                        }
                    })
                    .then(response => {

                        // response.data.data.forEach(subject => this.subjects.push(subject))
                        this.totalElements = response.data.totalElements // TODO Use pageable

                        this.loadingSubjects = false
                    })
                    .catch(error => {
                        error
                        // this.$root.defaultRequestErrorHandler(error)
                        this.averageGrade = ""
                        this.loadingSubjects = false
                    })
            }
        },
        onSubjectsPageChanged(page) {
            console.log(page)
            this.currentPage = page
            this.onLoadSubjects()
        },
        onSubjectChosen(event) {
            this.subjectIdChosen = event
            this.getSubjectInfo()
        },
        onLoadStatements() {
            this.loadStatements = true
            // if (this.statements.length > 0)
            //     return

            const config = {
                params: {
                    subjectName: this.subject.subjectName,
                    page: this.statementsPagination.currentPage,
                    numberPerPage: this.statementsPagination.perPage
                }
            }

            this.loadingStatements = true
            this.$http
                .get(`${this.apiUrl}/statements`, config)
                .then(response => {
                    this.statements = []
                    response.data.content.forEach(statement => this.statements.push(statement))
                    this.statementsPagination.totalElements = response.data.totalElements
                    this.loadingStatements = false
                })
                .catch(error => {
                    this.$root.defaultRequestErrorHandler(error)
                    this.statements = []
                    this.loadingStatements = false
                })
        },
    },
    computed: {
        searchValid() {
            if (this.subjectSearchInput.length === 0)
                return null
            return this.subjectSearchInput.length >= 4
        },
        showSubjectDetails() {
            return (this.searchValid && this.subjectIdChosen !== null) || this.id
        },
    }
}
</script>

<style scoped>

</style>