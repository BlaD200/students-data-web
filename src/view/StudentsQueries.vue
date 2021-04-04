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
                            <th>Ім'я</th>
                            <th>Прізвище</th>
                            <th>По-батькові</th>
                            <th>Курс</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr :key="student.id" v-for="student in students"
                            @click="showStudentDetails(student)" style="cursor: pointer;">

                            <th>{{ student.first_name }}</th>
                            <th>{{ student.last_name }}</th>
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
                 @sortBy="onSortBy" @sortDesc="sortDesc"></sort-by>
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
            sortBy: 'За рейтингом',
            sortByOptions: [
                'За рейтингом',
                'За прізвищем',
            ],
            students: [],
            totalElements: -1,
            currentPage: 1,
            perPage: 20,
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
            console.log(byWhat)
            console.log(this.$refs)
        },
        sortDesc(desc) {
            console.log(desc)
        },
        getStudents(){
            const config = {
                params: {
                    page: this.currentPage,
                    numberPerPage: this.perPage
                }
            }
            this.$http
                .get(this.apiURl + '/students', config)
                .then(response => {
                    this.students = []
                    response.data.content.forEach(user => this.students.push(user))
                    this.totalElements = response.data.totalElements
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