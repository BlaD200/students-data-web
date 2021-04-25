<template>
    <queries title="Відомості"
             :show-pagination="true"
             :show-sort="false"
             :current-page="currentPage"
             :rows="totalElements"
             :per-page="perPage"
             :is-any-filters-applied="isAnyFilters"
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
                            @subjectInput="onSubjectInput"
                            @tutorInput="onTutorInput"
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
    data() {
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
            subjectInput: '',
            tutorInput: '',
            groupInput: '',

            currentPage: 1,
            totalElements: 0,
            perPage: 10,

            loadingStatements: false,
            statements: [],

            loadingBiguntsi: false,
            biguntsi: [],
        }
    },
    created() {
        this.$http
            .get(this.apiURl + '/subjectNames')
            .then(response => {
                this.subjectOptions = response.data
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
        onChangePage(page) {
            this.currentPage = page
            if (this.tabIndex === 0) {
                this.getStatements()
            } else
                this.getBiguntsi()
        },
        onChangeTab(tabIndex) {
            this.tabIndex = tabIndex
            if (this.tabIndex === 0) {
                this.getStatements()
            } else
                this.getBiguntsi()
        },
        onSubjectInput(input) {
            this.subjectInput = input
            if (!input){
                this.groupInput = null
                return
            }
            this.getGroups()
        },
        onTutorInput(input) {
            this.tutorInput = input
            if (!input){
                this.groupInput = null
                return
            }
            this.getGroups()
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
        getGroups() {
            this.$http
                .get(this.apiURl + '/info/groups', {
                    params: {
                        tutorName: this.tutorInput,
                        subjectName: this.subjectInput
                    }
                })
                .then(response => {
                    this.groupOptions = response.data
                })
                .catch(error => {
                    // this.$root.defaultRequestErrorHandler(error)
                    console.log(error)
                })
        },
        getStatements() {
            // const config = {
            //     params: {
            //         tutorName: this.tutorName,
            //         subjectName: this.subjectName,
            //         group: this.group
            //     }
            // }
            // this.$http
            // .get(this.apiURl + '/students', config)
            // .then(response => {
            //     this.students = []
            //     response.data.content.forEach(user => this.students.push(user))
            //     this.totalElements = response.data.totalElements // TODO Use pageable
            //     this.loading = false
            // })
            // .catch(error => {
            //     // this.$root.defaultRequestErrorHandler(error)
            //     console.log(error, "179")
            //     this.loading = false
            // })
            const config = {
                params: {
                    tutorName: this.tutorInput,
                    subjectName: this.subjectInput,
                    group: this.groupInput
                }
            }
            this.loadingStatements = true
            this.$http
                .get(`${this.apiURl}/statements`, config)
                .then(response => {
                    this.statements = []
                    response.data.content.forEach(statement => this.statements.push(statement))
                    this.totalElements = response.data.totalElements // TODO Use pageable
                    this.loadingStatements = false
                })
                .catch(error => {
                    this.$root.defaultRequestErrorHandler(error)
                    // this.statements = []
                    this.loadingStatements = false
                })
        },
        getBiguntsi() {
            const config = {
                params: {
                    tutorName: this.tutorName,
                    subjectName: this.subjectName,
                    group: this.group // TODO pages
                }
            }
            this.loadingBiguntsi = true
            this.$http
                .get(`${this.apiURl}/biguntsi`, config)
                .then(response => {
                    this.biguntsi = []
                    response.data.content.forEach(statement => this.biguntsi.push(statement))
                    this.totalElements = response.data.totalElements
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
    },
    computed: {
        isAnyFilters() {
            return (Boolean)(this.subjectInput || this.tutorInput || this.groupInput)
        }
    }
}
</script>

<style scoped>

</style>