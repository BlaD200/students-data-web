<template>
    <queries title="Студенти"
             show-pagination
             :current-page="currentPage"
             :rows="totalElements"
             :per-page="perPage"
             controls="my-table"
             @change="onChangePage">
        }
        <b-card slot="content" no-body class="border-0">
            <b-tabs v-model="tabIndex" justified card pills>
                <b-tab title="Студенти">
                    <table id="students-table" class="table table-striped table-hover table-responsive-sm">
                        <thead>
                        <tr>
                            <th># Заліковки</th>
                            <td>Ім'я</td>
                            <td>Прізвище</td>
                            <td>По-батькові</td>
                            <td>Курс</td>
                        </tr>
                        </thead>

                        <tbody>
                        <tr :key="student.id" v-for="student in students"
                            @click="showStudentDetails(student)" style="cursor: pointer;">
                            <th>{{ student.studentRecordBook }}</th>
                            <td>{{ student.studentName }}</td>
                            <td>{{ student.studentSurname }}</td>
                            <td>{{ student.studentPatronymic }}</td>
                            <td>{{ student.studentRecordBook }}</td>
                        </tr>
                        </tbody>
                    </table>
                </b-tab>
                <b-tab title="Боржники"><p>I'm the second tab</p></b-tab>
            </b-tabs>
        </b-card>

        <students-filter-fields slot="filters"
                                :course-options="courseOptions"
                                :year-options="yearOptions"
                                :semester-options="semesterOptions"
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

export default {
    name: "Students",
    components: {
        Queries, StudentsFilterFields, SortBy
    },
    data: () => {
        return {
            apiURl: 'http://localhost:8000/api',
            tabIndex: 0,
            sortBy: 'rating',
            sortByOptions: [
                {value: "rating", text: 'За рейтингом'},
                {value: "surname", text: 'За прізвищем'}
            ],
            sortDesc: true,
            students: [],
            totalElements: -1,
            currentPage: 1,
            perPage: 10,
            courseOptions: [1, 2, 3, 4],
            yearOptions: [],
            semesterOptions: ['Осінь', 'Весна', 'Літо']
        }
    }
    ,
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
        getStudents() {
            const config = {
                params: {
                    page: this.currentPage,
                    numberPerPage: this.perPage,
                    sortBy: this.sortBy,
                    sortDesc: this.sortDesc
                }
            }
            this.$http
                .get(this.apiURl + '/students', config)
                .then(response => {
                    this.students = []
                    response.data.forEach(user => this.students.push(user))
                    this.totalElements = this.students.length
                })
                .catch(error => {
                    this.$root.defaultRequestErrorHandler(error)
                })
        },
        onChangePage(page) {
            this.currentPage = page
            this.getStudents()
        },
        showStudentDetails(student) {
            console.log(student)
        }
    }
}
</script>

<style scoped>

</style>