<template>
    <queries title="Студенти"
             show-pagination
             :current-page="currentPage"
             :rows="rows"
             :per-page="perPage"
             controls="my-table"
             @change="changePage">
        }
        <b-card slot="content" no-body class="border-0">
            <b-tabs v-model="tabIndex" justified card pills>
                <b-tab title="Студенти">
                    <table id="students-table" class="table table-striped table-hover table-responsive-sm">
                        <thead>
                        <tr>
                            <th>Ім'я</th>
                            <th> Прізвище</th>
                            <th> По-батькові</th>
                            <th>Курс</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr :key="student.id" v-for="student in items"
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
            tabIndex: 0,
            sortBy: 'За рейтингом',
            sortByOptions: [
                'За рейтингом',
                'За прізвищем',
            ],
            perPage: 3,
            currentPage: 1,
            items: [],
            courseOptions: [1, 2, 3, 4],
            yearOptions: [2020, 2021],
            semesterOptions: ['Осінь', 'Весна', 'Літо']
        }
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
        changePage(page) {
            this.currentPage = page

            this.items = [
                {id: 1, first_name: 'Fred', last_name: 'Flintstone'},
                {id: 2, first_name: 'Wilma', last_name: 'Flintstone'},
                {id: 3, first_name: 'Barney', last_name: 'Rubble'},
                {id: 4, first_name: 'Betty', last_name: 'Rubble'},
                {id: 5, first_name: 'Pebbles', last_name: 'Flintstone'},
                {id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble'},
                {id: 7, first_name: 'The Great', last_name: 'Gazzoo'},
                {id: 8, first_name: 'Rockhead', last_name: 'Slate'},
                {id: 9, first_name: 'Pearl', last_name: 'Slaghoople'}
            ].slice((page - 1) * this.perPage, page * this.perPage)
        },
        showStudentDetails(student) {
            console.log(student)
        }
    },
    created() {
        this.changePage(1)
    },
    computed: {
        rows() {
            return [
                {id: 1, first_name: 'Fred', last_name: 'Flintstone'},
                {id: 2, first_name: 'Wilma', last_name: 'Flintstone'},
                {id: 3, first_name: 'Barney', last_name: 'Rubble'},
                {id: 4, first_name: 'Betty', last_name: 'Rubble'},
                {id: 5, first_name: 'Pebbles', last_name: 'Flintstone'},
                {id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble'},
                {id: 7, first_name: 'The Great', last_name: 'Gazzoo'},
                {id: 8, first_name: 'Rockhead', last_name: 'Slate'},
                {id: 9, first_name: 'Pearl', last_name: 'Slaghoople'}
            ].length
        }
    }
}
</script>

<style scoped>

</style>