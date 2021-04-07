<template>
    <queries title="Студенти"
             :show-pagination="true"
             :current-page="currentPage"
             :rows="totalElements"
             :per-page="perPage"
             controls="my-table"
             @change="onChangePage"
             @applyFilters="applyFilters"
             @refresh="onRefresh">
        }
        <b-card slot="content" no-body class="border-0">
            <b-tabs @input="onChangeTab" justified card pills>
                <b-tab title="Студенти">
                    <student-table :students="students" :loading="loading"
                                   @showStudentDetails="showStudentDetails"></student-table>
                </b-tab>
                <b-tab title="Боржники" lazy>
                    <student-table :students="debtors" :loading="loading"
                                   @showStudentDetails="showStudentDetails"></student-table>
                </b-tab>
            </b-tabs>
        </b-card>

        <students-filter-fields slot="filters"
                                :course-options="courseOptions"
                                :year-options="yearOptions"
                                :semester-options="semesterOptions"
                                :subject-options="subjectOptions"
                                :tutor-options="tutorOptions"
                                :group-options="groupOptions"
                                @yearChanged="yearSelected = $event"
                                @semesterChanged="semesterSelected = $event"
                                @courseChanged="courseSelected = $event"
                                @subjectInput="subjectInput = $event"
                                @tutorInput="tutorInput = $event"
                                @groupInput="groupInput = $event"
        ></students-filter-fields>
        <sort-by slot="sorting"
                 :sort-by-default="sortBy" :sort-by-options="sortByOptions"
                 @sortBy="onSortBy" @sortDesc="onSortDesc"></sort-by>
    </queries>
</template>

<script>
import Queries from "@/view/Queries";
import StudentsFilterFields from "@/components/filters/StudentsFilterFields"
import SortBy from "@/components/SortBy";
import StudentTable from "@/components/StudentTable";

export default {
    name: "Students",
    components: {
        Queries, StudentsFilterFields, SortBy, StudentTable
    },
    data: () => {
        return {
            apiURl: 'http://localhost:8000/api',
            tabIndex: 0,
            loading: false,

            sortBy: 'student_surname',
            sortByOptions: [
                {value: "complete_mark", text: 'За рейтингом'},
                {value: "student_surname", text: 'За прізвищем'}
            ],
            sortDesc: true,

            students: [],
            debtors: [],
            totalElements: -1,
            currentPage: 1,
            perPage: 5,

            yearOptions: [],
            courseOptions: [1, 2, 3, 4],
            semesterOptions: [
                {value: 1, text: 'Осінь'},
                {value: 2, text: 'Весна'},
                {value: 3, text: 'Літо'}
            ],
            subjectOptions: [],
            tutorOptions: [],
            groupOptions: [],
            yearSelected: null,
            courseSelected: null,
            semesterSelected: null,
            subjectInput: null,
            tutorInput: null,
            groupInput: null
        }
    },
    created() {
        this.onChangePage(1)

        this.$http
            .get(this.apiURl + '/info/years')
            .then(response => {
                this.yearOptions = response.data
            })
            .catch(error => {
                // this.$root.defaultRequestErrorHandler(error)
                console.log(error)
                this.yearOptions = [new Date().getFullYear()]
            })

        this.$http
            .get(this.apiURl + '/subjects')
            .then(response => {
                this.subjectOptions = response.data.flatmap(subject => subject.name)
            })
            .catch(error => {
                // this.$root.defaultRequestErrorHandler(error)
                console.log(error)
            })

        this.$http
            .get(this.apiURl + '/tutorNames')
            .then(response => {
                this.tutorOptions = response.data//.flatmap(tutor => tutor.fullname)
            })
            .catch(error => {
                // this.$root.defaultRequestErrorHandler(error)
                console.log(error)
            })
    },
    methods: {
        // :title-link-class="linkClass(1)"
        // linkClass(idx) {
        //     if (this.tabIndex === idx) {
        //         return ['bg-primary', 'text-light']
        //     } else {
        //         return ['bg-light', 'text-dark']
        //     }
        // }
        onSortBy(byWhat) {
            this.sortBy = byWhat
            this.getStudents()
        },
        onSortDesc(desc) {
            this.sortDesc = desc
            this.getStudents()
        },
        onChangePage(page) {
            this.currentPage = page
            this.getStudents()
        },
        onChangeTab(tabIndex) {
            this.tabIndex = tabIndex
            if (this.tabIndex === 0) {
                this.getStudents()
            } else
                this.getDebtors()
        },
        onRefresh() {
            this.onChangeTab(this.tabIndex)
        },
        applyFilters() {
            if (this.tabIndex === 0) {
                this.getStudents()
            } else
                this.getDebtors()
        },
        getStudents() {
            this.loading = true
            const config = {
                params: this.params
            }
            this.$http
                .get(this.apiURl + '/students', config)
                .then(response => {
                    this.students = []
                    response.data.data.forEach(user => this.students.push(user))
                    this.totalElements = response.data.totalElements // TODO Use pageable
                    this.loading = false
                })
                .catch(error => {
                    this.$root.defaultRequestErrorHandler(error)
                    this.loading = false
                })
        },
        getDebtors() {
            this.loading = true
            const config = {
                params: this.params
            }
            this.$http
                .get(this.apiURl + '/debtors', config)
                .then(response => {
                    this.debtors = []
                    response.data.data.forEach(user => this.debtors.push(user))
                    this.totalElements = response.data.totalElements
                    this.loading = false
                })
                .catch(error => {
                    this.$root.defaultRequestErrorHandler(error)
                    this.loading = false
                })
        },
        showStudentDetails(student) {
            console.log(student)
        }
    },
    computed: {
        params() {
            return {
                page: this.currentPage,
                numberPerPage: this.perPage,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc,

                year: this.yearSelected,
                subject: this.subjectInput,
                tutor: this.tutorInput,
                group: this.groupInput,
                semester: this.semesterSelected,
                course: this.courseSelected
            }
        }
    }
}
</script>

<style scoped>

</style>