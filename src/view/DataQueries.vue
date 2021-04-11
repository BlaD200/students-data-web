<template>
    <queries title="Відомості"
             :show-pagination="true"
             :show-sort="false"
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
                <b-tab title="Відомості" class="px-2">
                    <statements-table :statements="statements" :loading="loadingStatements"
                                   @studentTableRowClicked="showStatementDetails"></statements-table>
                </b-tab>
                <b-tab title="Бігунці" lazy>
                    <bigunets-table :biguntsi="biguntsi" :loading="loadingBiguntsi"
                                   @studentTableRowClicked="showBigunetsDetails"></bigunets-table>
                </b-tab>
            </b-tabs>
        </b-card>

        <data-filter-fields slot="filters"
                                :subject-options="subjectOptions"
                                :tutor-options="tutorOptions"
                                :group-options="groupOptions"
                                @yearChanged="yearSelected = $event"
                                @semesterChanged="semesterSelected = $event"
                                @courseChanged="courseSelected = $event"
                                @subjectInput="subjectInput = $event"
                                @tutorInput="tutorInput = $event"
                                @groupInput="groupInput = $event"
        ></data-filter-fields>
    </queries>
</template>

<script>
import Queries from "@/layouts/Queries";
import DataFilterFields from "@/components/filters/DataFilterFields"
import StatementsTable from "@/components/tables/StatementsTable";
import BigunetsTable from "@/components/tables/BigunetsTable";

// import Requests from "@/requests/requests"

export default {
    name: "DataQueries",
    components: {
        Queries, StatementsTable, BigunetsTable, DataFilterFields
    },
    data(){
        return {
            apiURl: 'http://localhost:8000/api',
            tabIndex: 0,

            sortBy: 'student_surname',
            sortByOptions: [
                {value: "complete_mark", text: 'За викладачем'},
                {value: "student_surname", text: 'За предметом'}
            ],
            sortDesc: true,

            subjectOptions: [],
            tutorOptions: [],
            groupOptions: [],

            currentPage: 1,
            totalElements: 0,
            perPage: 10,

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
        }
    },
    methods: {
        onChangePage(page) {
            this.currentPage = page
            this.getStudents()
        },
        onChangeTab(tabIndex) {
            this.tabIndex = tabIndex
            if (this.tabIndex === 0) {
                this.getStatements()
            } else
                this.getBiguntsi()
        },
        onRefresh() {
            this.onChangeTab(this.tabIndex)
        },
        applyFilters() {
            // TODO make button disabled if nothing entered
            if (this.tabIndex === 0) {
                this.getStatements()
            } else
                this.getBiguntsi()
        },
        getStatements() {
            this.loadingStatements = true
            this.$http
                .get(`${this.apiURl}/statements`, this.config)
                .then(response => {
                    this.statements = []
                    response.data.data.forEach(statement => this.statements.push(statement))
                    this.totalElements = response.data.totalElements // TODO Use pageable
                    this.loadingStatements = false
                })
                .catch(error => {
                    this.$root.defaultRequestErrorHandler(error)
                    // this.statements = []
                    this.loadingStatements = false
                })
        },
        getBiguntsi(){
            this.loadingBiguntsi = true
            this.$http
                .get(`${this.apiURl}/statements`, this.config)
                .then(response => {
                    this.biguntsi = []
                    response.data.data.forEach(statement => this.biguntsi.push(statement))
                    this.totalElements = response.data.totalElements // TODO Use pageable
                    this.loadingBiguntsi = false
                })
                .catch(error => {
                    this.$root.defaultRequestErrorHandler(error)
                    // this.biguntsi = []
                    this.loadingBiguntsi = false
                })
        },
        showStatementDetails(statementId) {
            this.$router.push({name: 'Statement', params: {id: statementId}})
        },
        showBigunetsDetails(bigunets) {
            this.$router.push({name: 'Bigunets', params: {id: bigunets}})
        }
    }
}
</script>

<style scoped>

</style>