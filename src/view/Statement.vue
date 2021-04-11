<template>
    <div>
        <b-row class="justify-content-center">
            <b-col class="bg-white shadow rounded-lg" cols="12" lg="10">
                <b-row class="mt-4 mb-3">
                    <b-col>
                        <h5 class="text-center"><b>ЗАЛІКОВО-ЕКЗАМЕНАЦІЙНА ВІДОМІСТЬ № {{ id }}</b></h5>
                    </b-col>
                </b-row>

                <b-row class="justify-content-center px-2">
                    <b-col lg="10">
                        <h6 class="statement-info-common">
                            Освітній рівень
                            <span class="statement-info-uncommon"
                                  :class="headerErrors.eduLevelErrorText ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.right
                                  :title='headerErrors.eduLevelErrorText'
                                  :disabled='!headerErrors.eduLevelErrorText'
                            ><u>{{ statementHeader.eduLevel || "&#95;&#95;&#95;&#95;" }}</u></span>
                        </h6>
                        <h6 class="statement-info-common">
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.facultyErrorText ? 'text-danger' : ''"
                                  v-b-tooltip.top
                                  v-b-tooltip.v-danger
                                  :title='headerErrors.facultyErrorText'
                                  :disabled='!headerErrors.facultyErrorText'
                            ><u>{{ statementHeader.faculty || "&#95;&#95;&#95;&#95;" }}</u></span>
                            Рік навчання
                            <span class="statement-info-uncommon"
                                  :class="headerErrors.courseErrorText  ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger
                                  :title='headerErrors.courseErrorText'
                                  :disabled='(headerErrors.courseErrorText === null)'
                            ><u>{{ statementHeader.course || "&#95;&#95;&#95;&#95;" }}</u></span>
                            Група
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.groupErrorText  ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger
                                  :title='headerErrors.groupErrorText'
                                  :disabled='headerErrors.groupErrorText === null'
                            ><b>{{ statementHeader.group || "&#95;&#95;&#95;&#95;" }}</b></span>
                        </h6>
                        <h6 class="statement-info-common">
                            Дисципліна
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.subjectNameErrorText ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.right
                                  :title='headerErrors.subjectNameErrorText'
                                  :disabled='!headerErrors.subjectNameErrorText'
                            ><u>{{ statementHeader.subjectName || "&#95;&#95;&#95;&#95;" }}</u></span>
                        </h6>
                        <h6 class="statement-info-common">
                            Семестр
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.semesterErrorText ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger
                                  :title='headerErrors.semesterErrorText'
                                  :disabled='!headerErrors.semesterErrorText'
                            ><u>{{ statementHeader.semester || "&#95;&#95;&#95;&#95;" }}</u></span>
                            Залікові бали
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.creditNumberErrorText ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.right
                                  :title='headerErrors.creditNumberErrorText'
                                  :disabled='!headerErrors.creditNumberErrorText'
                            ><u>{{ statementHeader.creditNumber || "&#95;&#95;&#95;&#95;" }}</u></span>
                        </h6>
                        <h6 class="statement-info-common">
                            Форма контролю:
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.controlTypeErrorText ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.top
                                  :title='headerErrors.controlTypeErrorText'
                                  :disabled='!headerErrors.controlTypeErrorText'
                            ><u>{{ statementHeader.controlType || "&#95;&#95;&#95;&#95;" }}</u></span>.
                            Дата
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.examDateErrorText ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.right
                                  :title='headerErrors.examDateErrorText'
                                  :disabled='!headerErrors.examDateErrorText'
                            ><u>{{ statementHeader.examDate || "&#95;&#95;&#95;&#95;" }}</u></span>
                        </h6>
                    </b-col>
                </b-row>

                <b-row class="mt-3">
                    <b-col>
                        <h6 class=" text-center">
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.tutorFullNameErrorText ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger
                                  :title='headerErrors.tutorFullNameErrorText'
                                  :disabled='!headerErrors.tutorFullNameErrorText'
                            ><u>{{statementHeader.tutorFullName || "&#95;&#95;&#95;&#95;" }}, </u></span>
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.tutorAcademicStatusErrorText ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger
                                  :title='headerErrors.tutorAcademicStatusErrorText'
                                  :disabled='!headerErrors.tutorAcademicStatusErrorText'
                            ><u>{{ statementHeader.tutorAcademicStatus || "&#95;&#95;&#95;&#95;" }}, </u></span>
                            <span class="statement-info-uncommon font"
                                  :class="headerErrors.tutorPositionErrorText ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger
                                  :title='headerErrors.tutorPositionErrorText'
                                  :disabled='!headerErrors.tutorPositionErrorText'
                            ><u>{{ statementHeader.tutorPosition || "&#95;&#95;&#95;&#95;" }}</u></span>
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

                <b-row class="justify-content-center mt-3 mb-5">
                    <b-col lg="10">
                        <h6 class="statement-info-common">
                            Кількість студентів на екзамені / тезі / заліку
                            <span class="statement-info-uncommon font"
                                  :class="footerErrors.presentCountErrorText  ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.right
                                  :title='footerErrors.presentCountErrorText'
                                  :disabled='footerErrors.presentCountErrorText === null'
                            ><u>{{ statementFooter.presentCount || "&#95;&#95;&#95;&#95;" }}</u></span>
                        </h6>
                        <h6 class="statement-info-common">
                            Кількість студентів, які не з’явились на екзамен / тезу / залік
                            <span class="statement-info-uncommon font"
                                  :class="footerErrors.absentCountErrorText  ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.right
                                  :title='footerErrors.absentCountErrorText'
                                  :disabled='footerErrors.absentCountErrorText === null'
                            ><u>{{ statementFooter.absentCount || "&#95;&#95;&#95;&#95;" }}</u></span>
                        </h6>
                        <h6 class="statement-info-common">
                            Кількість студентів, недопущених до екзамену / тези / заліку
                            <span class="statement-info-uncommon font"
                                  :class="footerErrors.rejectedCountErrorText  ? 'text-danger' : ''"
                                  v-b-tooltip.v-danger.right
                                  :title='footerErrors.rejectedCountErrorText'
                                  :disabled='footerErrors.rejectedCountErrorText === null'
                            ><u>{{ statementFooter.rejectedCount || "&#95;&#95;&#95;&#95;" }}</u></span>
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
            required: true
        }
    },
    data() {
        return {
            statementHeader: {
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
            statementFooter: {
                presentCount: 6,
                absentCount: 0,
                rejectedCount: 0
            },

            students: [
                {
                    studentId: 23,
                    studentPIB: "Бойчук Олег Романович",
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
                eduLevelErrorText: 'Відсутній освітній рівень',
                facultyErrorText: 'Факультет інформатики',
                courseErrorText:0,
                groupErrorText:0,
                subjectNameErrorText: 'Технології сучасних дата - центрів',
                semesterErrorText: '6д',
                creditNumberErrorText: null,
                controlTypeErrorText: 'екзамен',
                examDateErrorText: '2021-05-24',
                tutorFullNameErrorText: 'Черкасов Дмитро Іванович',
                tutorPositionErrorText: 'старший викладач',
                tutorAcademicStatusErrorText: 'кандидат технічних наук'
            },
            studentErrors: {
                // 23: {
                //     totalGradeError: 'Не вказано суму балів'
                // },
                25: {
                    studentRecordBookError: 'Відсутній номер залікової книжки',
                    totalGradeError: 'Не вказано суму балів'
                }
            },
            footerErrors: {
                presentCountErrorText: null, //6,
                absentCountErrorText: null, //0,
                rejectedCountErrorText: null, //0
            }
        }
    },
    methods: {},
    computed: {
    }
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