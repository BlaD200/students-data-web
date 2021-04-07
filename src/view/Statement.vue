<template>
    <div>
        <b-row class="p-2 justify-content-center">
            <b-col class="bg-white shadow rounded-lg" sm="12" lg="10">
                <b-row class="mt-4 mb-3">
                    <b-col>
                        <h4 class="text-center">ЗАЛІКОВО-ЕКЗАМЕНАЦІЙНА ВІДОМІСТЬ № {{ $route.params.id }}</h4>
                    </b-col>
                </b-row>

                <b-row class="justify-content-center px-2">
                    <b-col lg="10">
                        <h6 class="statement-header-common">
                            Освітній рівень
                            <span class="statement-header-uncommon"><u>{{ statementHeader.eduLevel }}</u></span>
                        </h6>
                        <h6 class="statement-header-common">
                            <span class="statement-header-uncommon"><u>{{ statementHeader.faculty }}</u></span>
                            Рік навчання <span class="statement-header-uncommon"><u>{{
                                statementHeader.course
                            }}</u></span>
                            Група <span class="statement-header-uncommon"><b>{{ statementHeader.group }}</b></span>
                        </h6>
                        <h6 class="statement-header-common">
                            Дисципліна <span class="statement-header-uncommon"><u>{{ statementHeader.subjectName }}</u></span>
                        </h6>
                        <h6 class="statement-header-common">
                            Семестр <span class="statement-header-uncommon"><u>{{ statementHeader.semester }}</u></span>
                            Залікові бали <span class="statement-header-uncommon"><u>{{
                                statementHeader.creditNumber
                            }}</u></span>
                        </h6>
                        <h6 class="statement-header-common">
                            Форма контролю: <span class="statement-header-uncommon"><u>{{
                                statementHeader.controlType
                            }}</u></span>.
                            Дата <span class="statement-header-uncommon"><u>{{ statementHeader.examDate }}</u></span>
                        </h6>
                    </b-col>
                </b-row>

                <b-row class="mt-3">
                    <b-col>
                        <h6 class=" text-center">
                            <span class="statement-header-uncommon"><u>
                                {{ statementHeader.tutorFullName }},
                                {{ statementHeader.tutorAcademicStatus ? `${statementHeader.tutorAcademicStatus},` : '' }}
                                {{ statementHeader.tutorPosition }}
                            </u></span>
                        </h6>
                    </b-col>
                </b-row>

                <b-row class="justify-content-center mt-3 mb-5">
                    <b-col lg="10">
                        <statement-students-table
                            :statement-students="students" :loading="studentsLoading">
                        </statement-students-table>
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

            students: [
                {
                    studentPIB: "Бойчук Олег Романович",
                    studentNo: "І 303/10бп",
                    semesterGrade: 60,
                    controlGrade: 30,
                    totalGrade: 90,
                    nationalGrade: "Добре",
                    ectsGrade: 'B'
                }, {
                    "studentCode": 3,
                    "studentSurname": "Євтушенко",
                    "studentName": "Ігор",
                    "studentPatronymic": "Олегович",
                    "studentRecordBook": "83921"
                }, {
                    "studentCode": 7,
                    "studentSurname": "Залізний",
                    "studentName": "Антон",
                    "studentPatronymic": "Вячеславович",
                    "studentRecordBook": "32432"
                }, {
                    "studentCode": 8,
                    "studentSurname": "Іванюк",
                    "studentName": "Назар",
                    "studentPatronymic": "Олександрович",
                    "studentRecordBook": "34123"
                }, {
                    "studentCode": 6,
                    "studentSurname": "Крейдун",
                    "studentName": "Андрій",
                    "studentPatronymic": "Миколайович",
                    "studentRecordBook": "33122"
                }],
            studentsLoading: false
        }
    }
}
</script>

<style>
body {
    background-color: #f8f9fa !important;
}

.statement-header-common {
    font-weight: 400;
}

.statement-header-uncommon {
    font-weight: 500;
}
</style>