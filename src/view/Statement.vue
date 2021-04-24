<template>
    <div>
        <b-row class="justify-content-center">
            <b-col class="bg-white shadow rounded-lg" cols="12" lg="10">
                <b-row class="mt-4 mb-3">
                    <b-col>
                        <h5 class="text-center"><b>ЗАЛІКОВО-ЕКЗАМЕНАЦІЙНА ВІДОМІСТЬ № {{
                                documentHeader.statementNo || documentHeader.bigunNo
                            }}</b></h5>
                    </b-col>
                </b-row>

                <b-row class="justify-content-center px-2">
                    <b-col lg="10">
                        <h6 class="statement-info-common">
                            Освітній рівень
                            <span class="statement-info-uncommon"
                                  :class="headerErrors.eduLevelErrorText.length ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.right
                                  :title='headerErrors.eduLevelErrorText.join(",")'
                                  :disabled='!headerErrors.eduLevelErrorText.join(",")'
                            ><u>{{ documentHeader.eduLevel || "&#95;&#95;&#95;&#95;" }}</u></span>
                        </h6>
                        <h6 class="statement-info-common">
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.facultyErrorText.length ? 'text-danger' : ''"
                                  v-b-tooltip.top
                                  v-b-tooltip.v-danger
                                  :title='headerErrors.facultyErrorText.join(",")'
                                  :disabled='!headerErrors.facultyErrorText.join(",")'
                            ><u>{{ documentHeader.faculty || "&#95;&#95;&#95;&#95;" }}</u></span>
                            Рік навчання
                            <span class="statement-info-uncommon"
                                  :class="headerErrors.courseErrorText.length  ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger
                                  :title='headerErrors.courseErrorText.join(",")'
                                  :disabled='(headerErrors.courseErrorText === null)'
                            ><u>{{ documentHeader.course || "&#95;&#95;&#95;&#95;" }}</u></span>
                            Група
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.groupErrorText.length  ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger
                                  :title='headerErrors.groupErrorText.join(",")'
                                  :disabled='headerErrors.groupErrorText === null'
                            ><b>{{ documentHeader.group || "&#95;&#95;&#95;&#95;" }}</b></span>
                        </h6>
                        <h6 class="statement-info-common">
                            Дисципліна
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.subjectNameErrorText.length ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.right
                                  :title='headerErrors.subjectNameErrorText.join(",")'
                                  :disabled='!headerErrors.subjectNameErrorText.join(",")'
                            ><u>{{ documentHeader.subjectName || "&#95;&#95;&#95;&#95;" }}</u></span>
                        </h6>
                        <h6 class="statement-info-common">
                            Семестр
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.semesterErrorText.length ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger
                                  :title='headerErrors.semesterErrorText.join(",")'
                                  :disabled='!headerErrors.semesterErrorText.join(",")'
                            ><u>{{ documentHeader.semester || "&#95;&#95;&#95;&#95;" }}</u></span>
                            Залікові бали
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.creditNumberErrorText.length ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.right
                                  :title='headerErrors.creditNumberErrorText.join(",")'
                                  :disabled='!headerErrors.creditNumberErrorText.join(",")'
                            ><u>{{ documentHeader.creditNumber || "&#95;&#95;&#95;&#95;" }}</u></span>

                            <span v-if="isBigunets" class="pl-5">
                            Направлення дійсне до
                                <span class="statement-info-uncommon font"
                                      :class="headerErrors.dueToErrorText.length ? 'text-danger' : ''"
                                      v-b-tooltip.v-danger.right
                                      :title='headerErrors.dueToErrorText.join(",")'
                                      :disabled='!headerErrors.dueToErrorText.join(",")'
                                ><u>{{ documentHeader.dueTo || "&#95;&#95;&#95;&#95;" }}</u></span>
                            </span>

                        </h6>
                        <h6 v-if="isBigunets" class="statement-info-common">
                            Причина перенесення:
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.postponeReasonErrorText.length ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.top
                                  :title='headerErrors.postponeReasonErrorText.join(",")'
                                  :disabled='!headerErrors.postponeReasonErrorText.join(",")'
                            ><u>{{ documentHeader.postponeReason || "&#95;&#95;&#95;&#95;" }}</u></span>
                        </h6>
                        <h6 class="statement-info-common">
                            Форма контролю:
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.controlTypeErrorText.length ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.top
                                  :title='headerErrors.controlTypeErrorText.join(",")'
                                  :disabled='!headerErrors.controlTypeErrorText.join(",")'
                            ><u>{{ documentHeader.controlType || "&#95;&#95;&#95;&#95;" }}</u></span>.
                            Дата
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.examDateErrorText.length ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.right
                                  :title='headerErrors.examDateErrorText.join(",")'
                                  :disabled='!headerErrors.examDateErrorText.join(",")'
                            ><u>{{ documentHeader.examDate || "&#95;&#95;&#95;&#95;" }}</u></span>
                        </h6>
                    </b-col>
                </b-row>

                <b-row class="mt-3">
                    <b-col>
                        <h6 class=" text-center">
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.tutorFullNameErrorText.length ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger
                                  :title='headerErrors.tutorFullNameErrorText.join(",")'
                                  :disabled='!headerErrors.tutorFullNameErrorText.join(",")'
                            ><u>{{ documentHeader.tutorFullName || "&#95;&#95;&#95;&#95;" }}, </u></span>
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.tutorAcademicStatusErrorText.length ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger
                                  :title='headerErrors.tutorAcademicStatusErrorText.join(",")'
                                  :disabled='!headerErrors.tutorAcademicStatusErrorText.join(",")'
                            ><u>{{ documentHeader.tutorAcademicStatus || "&#95;&#95;&#95;&#95;" }}, </u></span>
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.tutorPositionErrorText.length ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger
                                  :title='headerErrors.tutorPositionErrorText.join(",")'
                                  :disabled='!headerErrors.tutorPositionErrorText.join(",")'
                            ><u>{{ documentHeader.tutorPosition || "&#95;&#95;&#95;&#95;" }}</u></span>
                        </h6>
                    </b-col>
                </b-row>

                <b-row class="justify-content-center mt-3">
                    <b-col lg="10">
                        <statement-students-table
                            :statement-students="students" :loading="loadingStudents" :student-errors="studentErrors">
                        </statement-students-table>
                    </b-col>
                </b-row>

                <b-row v-if="isFooterPresent" class="justify-content-center mt-3 mb-5">
                    <b-col lg="10">
                        <h6 class="statement-info-common">
                            Кількість студентів на екзамені / тезі / заліку
                            <span class="statement-info-uncommon font"
                                  :class="footerErrors.presentCountErrorText.length ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.right
                                  :title='footerErrors.presentCountErrorText.join(",")'
                                  :disabled='!footerErrors.presentCountErrorText.join(",")'
                            ><u>{{
                                    documentFooter.presentCount === null ?
                                        "&#95;&#95;&#95;&#95;" : documentFooter.presentCount
                                }}</u></span>
                        </h6>
                        <h6 class="statement-info-common">
                            Кількість студентів, які не з’явились на екзамен / тезу / залік
                            <span class="statement-info-uncommon font"
                                  :class="footerErrors.absentCountErrorText.length ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.right
                                  :title='footerErrors.absentCountErrorText.join(",")'
                                  :disabled='!footerErrors.absentCountErrorText.join(",")'
                            ><u>{{
                                    documentFooter.absentCount === null ?
                                        "&#95;&#95;&#95;&#95;" : documentFooter.absentCount
                                }}</u></span>
                        </h6>
                        <h6 class="statement-info-common">
                            Кількість студентів, недопущених до екзамену / тези / заліку
                            <span class="statement-info-uncommon font"
                                  :class="footerErrors.rejectedCountErrorText.length ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.right
                                  :title='footerErrors.rejectedCountErrorText.join(",")'
                                  :disabled='!footerErrors.rejectedCountErrorText.join(",")'
                            ><u>{{
                                    documentFooter.rejectedCount === null ?
                                        "&#95;&#95;&#95;&#95;" : documentFooter.rejectedCount
                                }}</u></span>
                        </h6>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import StatementStudentsTable from "@/components/tables/StatementStudentsTable";

export default {
    name: "Statement",
    components: {StatementStudentsTable},
    props: {
        id: {
            type: String,
            required: false
        },
        documentReport: Object,
        type: String
    },
    data() {
        return {
            apiUrl: 'http://localhost:8000/api',

            documentHeader: {
                statementNo: '',
                eduLevel: 'Бакалавр',
                faculty: 'Факультет інформатики',
                course: 3,
                group: 1,
                subjectName: 'Технології сучасних дата - центрів',
                semester: '6д',
                creditNumber: '?',
                controlType: 'екзамен',
                examDate: '2021-05-24',
                tutorFullName: 'Черкасов Дмитро Іванович',
                tutorPosition: 'старший викладач',
                tutorAcademicStatus: 'кандидат технічних наук'
            },
            documentFooter: {
                presentCount: 6,
                absentCount: 0,
                rejectedCount: 0
            },

            students: [
                {
                    studentId: 23,
                    studentPI: "Бойчук Олег",
                    studentPatronymic: "Романович",
                    studentRecordBook: "І 303/10 бп",
                    semesterGrade: 60,
                    controlGrade: 30,
                    totalGrade: null,
                    nationalGrade: "Добре",
                    ectsGrade: 'B'
                },
                {
                    studentId: 24,
                    studentPIB: "Бойчук Олег Романович",
                    studentRecordBook: "І 303/10бп",
                    semesterGrade: 60,
                    controlGrade: 30,
                    totalGrade: 90,
                    nationalGrade: "Добре",
                    ectsGrade: 'B'
                },
                {
                    studentId: 25,
                    studentPIB: "Бойчук Олег Романович",
                    studentRecordBook: null,
                    semesterGrade: 60,
                    controlGrade: 30,
                    totalGrade: null,
                    nationalGrade: "Добре",
                    ectsGrade: 'B'
                },
            ],
            loadingStudents: false,

            headerErrors: {
                eduLevelErrorText: [],
                facultyErrorText: [],
                courseErrorText: [],
                groupErrorText: [],
                subjectNameErrorText: [],
                semesterErrorText: [],
                creditNumberErrorText: [],
                controlTypeErrorText: [],
                examDateErrorText: [],
                tutorFullNameErrorText: [],
                tutorPositionErrorText: [],
                tutorAcademicStatusErrorText: [],

                dueToErrorText: [],
                postponeReasonErrorText: []
            },
            studentErrors: {
                // 23: {
                //     totalGradeError: 'Не вказано суму балів'
                // },
                // 25: {
                //     studentRecordBookError: ['Відсутній номер залікової книжки'],
                //     totalGradeError: ['Не вказано суму балів']
                // }
            },
            footerErrors: {
                presentCountErrorText: [], //6],
                absentCountErrorText: [], //0],
                rejectedCountErrorText: [], //]0
            }
        }
    },
    created() {
        this.getDocumentInfo()
    },
    mounted() {
        console.log("i'm called when element's have mounted")
    },
    methods: {
        getDocumentInfo() {
            if (this.id) {
                this.loadingStudents = true
                this.$http
                    .get(this.apiUrl + '/statement/' + this.id)
                    .then(response => {
                        console.log(response)

                        this.documentFooter = response.data.statementFooter
                        this.documentHeader = response.data.statementHeader

                        this.students = []
                        response.data.statementStudents.forEach(user => this.students.push(user))
                        this.totalElements = response.data.totalElements
                        this.loadingStudents = false
                    })
                    .catch(error => {
                        this.$root.defaultRequestErrorHandler(error)
                        console.log(error, "179")
                        this.loadingStudents = false
                    })
            }
        }
    },
    computed: {
        isBigunets() {
            return this.type === 'bigunets'
        },
        isFooterPresent() {
            console.log("i'm computting 'isFooterPresent'. footer: ", this.documentFooter)
            return this.documentFooter !== null &&
                this.documentFooter.presentCount !== null && this.documentFooter.absentCount !== null
                && this.documentFooter.rejectedCount !== null
        }
    },
    watch: {
        documentReport() {
            console.log("i'm watching documentReport. report: ", this.documentReport)
            if (this.documentReport) {
                if (this.type === 'statement') {
                    this.documentHeader = this.documentReport.statementInfo.statementHeader
                    this.documentFooter = this.documentReport.statementInfo.statementFooter
                    this.students = this.documentReport.statementInfo.statementStudents

                    this.headerErrors = this.documentReport.statementErrors.headerErrors
                    this.footerErrors = this.documentReport.statementErrors.footerErrors
                    this.studentErrors = this.documentReport.statementErrors.studentErrorsMap.statementStudentsErrorsMap
                } else if (this.type === 'bigunets') {
                    this.documentHeader = this.documentReport.bigunetsInfo.bigunetsHeader
                    this.students = this.documentReport.bigunetsInfo.bigunetsStudents
                    this.documentFooter = null/*{
                        presentCount: null,
                        absentCount: null,
                        rejectedCount: null
                    }*/

                    this.headerErrors = this.documentReport.bigunetsErrors.headerErrors
                    this.studentErrors = this.documentReport.bigunetsErrors.studentErrorsMap.bigunStudentErrorsMap
                    this.footerErrors = {
                        presentCountErrorText: [], //6],
                        absentCountErrorText: [], //0],
                        rejectedCountErrorText: [], //]0
                    }
                }
            }
            this.$emit('statementDataChanged')
        }
    },
}
</script>

<style scoped>
.statement-info-common {
    font-weight: 400;
}

.statement-info-uncommon {
    font-weight: 500;
    /*color: #ffc107;*/
    /*color: #dc3545;*/
    /*border: 2px solid #dc3545;*/
}
</style>