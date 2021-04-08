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
                            <span class="statement-info-uncommon"><u>{{ statementHeader.eduLevel }}</u></span>
                        </h6>
                        <h6 class="statement-info-common">
                            <span class="statement-info-uncommon"><u>{{ statementHeader.faculty }}</u></span>
                            Рік навчання <span class="statement-info-uncommon"><u>{{
                                statementHeader.course
                            }}</u></span>
                            Група <span class="statement-info-uncommon"><b>{{ statementHeader.group }}</b></span>
                        </h6>
                        <h6 class="statement-info-common">
                            Дисципліна <span class="statement-info-uncommon"><u>{{
                                statementHeader.subjectName
                            }}</u></span>
                        </h6>
                        <h6 class="statement-info-common">
                            Семестр <span class="statement-info-uncommon"><u>{{ statementHeader.semester }}</u></span>
                            Залікові бали <span class="statement-info-uncommon"><u>{{
                                statementHeader.creditNumber
                            }}</u></span>
                        </h6>
                        <h6 class="statement-info-common">
                            Форма контролю: <span class="statement-info-uncommon"><u>{{
                                statementHeader.controlType
                            }}</u></span>.
                            Дата <span class="statement-info-uncommon"><u>{{ statementHeader.examDate }}</u></span>
                        </h6>
                    </b-col>
                </b-row>

                <b-row class="mt-3">
                    <b-col>
                        <h6 class=" text-center">
                            <span class="statement-info-uncommon"><u>
                                {{ tutorFullInfo }}
                            </u></span>
                        </h6>
                    </b-col>
                </b-row>

                <b-row class="justify-content-center mt-3">
                    <b-col lg="10">
                        <statement-students-table
                            :statement-students="students" :loading="studentsLoading">
                        </statement-students-table>
                    </b-col>
                </b-row>

                <b-row class="justify-content-center mt-3 mb-5">
                    <b-col lg="10">
                        <h6 class="statement-info-common">
                            Кількість студентів на екзамені / тезі / заліку
                            <span class="statement-info-uncommon"><u>{{ statementFooter.presentCount }}</u></span>
                        </h6>
                        <h6 class="statement-info-common">
                            Кількість студентів, які не з’явились на екзамен / тезу / залік
                            <span class="statement-info-uncommon"><u>{{ statementFooter.absentCount }}</u></span>
                        </h6>
                        <h6 class="statement-info-common">
                            Кількість студентів, недопущених до екзамену / тези / заліку
                            <span class="statement-info-uncommon"><u>{{ statementFooter.rejectedCount }}</u></span>
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
                    studentPIB: "Бойчук Олег Романович",
                    studentNo: "І 303/10бп",
                    semesterGrade: 60,
                    controlGrade: 30,
                    totalGrade: 90,
                    nationalGrade: "Добре",
                    ectsGrade: 'B'
                },
                {
                    studentPIB: "Бойчук Олег Романович",
                    studentNo: "І 303/10бп",
                    semesterGrade: 60,
                    controlGrade: 30,
                    totalGrade: 90,
                    nationalGrade: "Добре",
                    ectsGrade: 'B'
                },
                {
                    studentPIB: "Бойчук Олег Романович",
                    studentNo: "І 303/10бп",
                    semesterGrade: 60,
                    controlGrade: 30,
                    totalGrade: 90,
                    nationalGrade: "Добре",
                    ectsGrade: 'B'
                },
            ],
            studentsLoading: false
        }
    },
    computed: {
        tutorFullInfo() {
            return (
                `${this.statementHeader.tutorFullName}
                ${this.statementHeader.tutorAcademicStatus ? `${this.statementHeader.tutorAcademicStatus},` : ''}
                ${this.statementHeader.tutorPosition}`
            )
        }
    }
}
</script>

<style>
body {
    background-color: #f8f9fa !important;
}

.statement-info-common {
    font-weight: 400;
}

.statement-info-uncommon {
    font-weight: 500;
}
</style>