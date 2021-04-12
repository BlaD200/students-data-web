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
    </div>
</template>

<script>
import SearchWithTable from "@/components/inputs/SearchWithTable";
import SubjectsTable from "@/components/tables/SubjectsTable";

export default {
    name: "Subject",
    components: {
        SearchWithTable, SubjectsTable
    },
    props: {
        id: String
    },
    data() {
        return {
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
            }
        }
    },
    methods: {
        getSubjectInfo(){
            this.subject = this.subjects[this.subjectIdChosen]
        },
        onLoadSubjects(input) {
            this.subjectSearchInput = input
            if (this.searchValid) {
                this.loadingSubjects = true
                // if (this.statements.length > 0)
                //     return

                this.loadingSubjects = true
                this.$http
                    .get(`${this.apiURl}/subjects`, {
                        params: {
                            subjectName: this.courseTab,
                            page: this.currentPage,
                            numberPerPage: this.perPage,
                        }
                    })
                    .then(response => {

                        response.data.data.forEach(subject => this.subjects.push(subject))
                        this.totalElements = response.data.totalElements // TODO Use pageable

                        this.loadingSubjects = false
                    })
                    .catch(error => {
                        error
                        // TODO remove test data
                        for (let i = 0; i < 10; i++) {
                            this.subjects.push({
                                subjectID: i,
                                subjectName: 'Технології сучасних дата - центрів ' + i,
                                tutorFullName: "Черкасов Дмитро Іванович",
                                averageGrade: 86.68
                            })
                        }
                        let start = (this.currentPage - 1) * this.perPage;
                        let end = this.currentPage * this.perPage;
                        console.log(start, end)
                        this.subjects = this.subjects.slice(start, end)
                        // response.data.data.forEach(statement => this.statements.push(statement))
                        this.totalElements = 10 //response.data.totalElements // TODO Use pageable
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
        onSubjectChosen(event){
            this.subjectIdChosen = event
            this.getSubjectInfo()
        }
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