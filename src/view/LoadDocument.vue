<template>
    <div>
        <b-row class="mb-3 justify-content-center">
            <b-col cols="12" lg="10" class="p-2 bg-white shadow-sm">
                <h2 class="text-center">Завантажити документ</h2>
            </b-col>
        </b-row>

        <b-row class="justify-content-center">
            <b-col cols="12" lg="10" class="bg-white shadow rounded-lg p-0">
                <b-tabs justified card pills class="" @activate-tab="onDocumentUnload">
                    <b-tab title="Відомість">
                        <document-loader document-name="відомість"
                                         load-url="statement/process"
                                         v-on:loadedExample="onStatementLoad"
                                         @fileRemoved="onDocumentUnload"
                        ></document-loader>
                    </b-tab>
                    <b-tab title="Бігунець" title-link-class="" lazy>
                        <document-loader document-name="бігунець"
                                         load-url="bigunets/process"
                                         v-on:loadedExample="onBigunetsLoad"
                                         @fileRemoved="onDocumentUnload"
                        ></document-loader>
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>

        <statement
            v-show="loadedStatement"
            :statement-report="statementReport"
            class="mt-2"></statement>

        <statement
            v-show="loadedBigunets"
            :statement-report="bigunetsReport"
            class="mt-2"></statement>

        <b-row class="mt-2 mb-5 justify-content-center" v-show="loadedStatement || loadedBigunets">
            <b-col cols="12" lg="10" class="bg-white shadow rounded-lg">
                <b-row class="text-center" v-show="loadedStatement || loadedBigunets">
                    <b-col class="p-2 mt-2">
                        <div>
                            <span tabindex="0"
                                  v-b-tooltip.v-warning.right
                                  :title="saveButtonTooltipTitle">
                                <b-button
                                    id="fix-button"
                                    size="lg"
                                    variant="success"
                                    :disabled="isErrors || !dataAccepted"
                                    @click="tryToSaveData"
                                >
                                Зберегти відомість
                                </b-button>
                            </span>
                        </div>
                    </b-col>
                </b-row>

                <b-row class="justify-content-center" v-show="loadedStatement || loadedBigunets">
                    <b-col lg="10" class="px-2 pt-0 mb-2">
                        <div class="text-center">
                            <b-form-checkbox
                                id="checkbox-1"
                                v-model="dataAccepted"
                                :disabled="isErrors"
                                name="checkbox-1"
                            >
                                <span v-if="isErrors"
                                      class="d-block" tabindex="0"
                                      v-b-tooltip.top
                                      :title="fixErrorsMessage"
                                >
                                  Дані мною перевірені, їх коректність підтверджую
                                </span>
                                <span v-else>Дані мною перевірені, їх коректність підтверджую</span>
                            </b-form-checkbox>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>

</template>

<script>
import DocumentLoader from "@/components/DocumentLoader";
import Statement from "@/view/Statement";

export default {
    name: "LoadDocument",
    components: {
        DocumentLoader, Statement
    },
    data() {
        return {
            apiURl: 'http://localhost:8000/api',

            loadedStatement: false,
            loadedBigunets: false,
            dataAccepted: false,

            statementReport: {
                statementErrors: {
                    headerErrors: null,
                    footerErrors: null,
                    studentErrorsMap: null
                },
                statementInfo: null
            },
            bigunetsReport: null,

            isMinorErrors: false
        };
    },
    created() {
        this.onDocumentUnload()
    },
    methods: {
        onStatementLoad(statementReport) {
            this.statementReport = statementReport
            this.loadedStatement = true;
        },
        onBigunetsLoad(bigunetsReport) {
            this.bigunetsReport = bigunetsReport
            this.loadedBigunets = true
        },
        onDocumentUnload() {
            this.loadedStatement = false;
            this.loadedBigunets = false
            this.statementReport = null
            this.bigunetsReport = null
            this.dataAccepted = false
        },
        tryToSaveData() {
            if (this.isMinorErrors)
                this.$root.messageBoxConfirm('Підтвердіть збереження документу',
                    "У документі все ще наявні помилки. Ви впевнені, що хочете його зберегти?",
                    'warning'
                ).then(res => {
                    if (res) {
                        this.saveData()
                    }
                })
            else
                this.saveData()
        },
        saveData() {
            let apiUrl;
            let data;
            let redirectUrl;
            if (this.loadedStatement) {
                apiUrl = this.apiURl + '/statement/save'
                data = {statementInfo: this.statementReport.statementInfo}
                redirectUrl = '/statement/'
            } else if (this.loadedBigunets) {
                apiUrl = this.apiURl + '/bigunets/save'
                data = {bigunetsReport: this.bigunetsReport}
                redirectUrl = '/bigunets/'
            }

            this.$http
                .post(apiUrl, data)
                .then(response => {
                    this.$router.push(redirectUrl + response.data)
                })
                .catch(error => {
                    this.$root.defaultRequestErrorHandler(error)
                    this.loadingStudents = false
                })
        },
        checkForErrors() {
            for (let statementErrorBlock of
                [this.statementReport.statementErrors.footerErrors,
                    this.statementReport.statementErrors.headerErrors]) {
                console.log(statementErrorBlock)

                for (let key in statementErrorBlock) {
                    if (Object.prototype.hasOwnProperty.call(statementErrorBlock, key)) {
                        console.log(key)
                        if (statementErrorBlock[key].length !== 0) {
                            if (key === 'tutorPositionErrorText' ||
                                key === 'tutorAcademicStatusErrorText') {
                                this.isMinorErrors = true
                                continue
                            }
                            // console.log("error", statementErrorBlock, statementErrorBlock[key])
                            return true;
                        }
                    }
                }
            }
        }
    },
    computed: {
        isErrors() {
            // console.log(this.statementReport)
            if (!this.statementReport)
                return true

            if (this.checkForErrors())
                return true

            let statementStudentsErrorsMap = this.statementReport.statementErrors.studentErrorsMap.statementStudentsErrorsMap;
            // console.log(statementStudentsErrorsMap)
            for (let key in statementStudentsErrorsMap) {
                // console.log(key)
                for (let statementErrorBlock in statementStudentsErrorsMap[key]) {
                    if (statementStudentsErrorsMap[key][statementErrorBlock].length !== 0) {
                        // console.log("error stud", statementErrorBlock, statementStudentsErrorsMap[key][statementErrorBlock])
                        return true;
                    }
                }
            }
            return false
        },
        fixErrorsMessage() {
            return 'Спочатку необхідно виправити всі помилки'
        },
        saveButtonTooltipTitle() {
            if (this.isErrors)
                return this.fixErrorsMessage
            else if (!this.dataAccepted)
                return 'Підтвердіть, що ви перевірили дані'
            return ''
        }
    }
}
</script>

<style scoped>
h2 {
    text-align: center;
}
</style>