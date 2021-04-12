<template>
    <div>
        <loader v-if="loading" class="text-center mb-0 p-2" size="sm"/>

        <table v-if="statementStudents.length > 0 & !loading"
               class="text-wrap text-break
               table table-hover table-bordered table-responsive-sm b-table-no-border-collapse">
            <thead class="thead-light">
            <tr class="text-center">
                <th>№</th>
                <th>ПІБ студента</th>
                <th>№ залікової книжки</th>
                <th v-b-tooltip.top
                    title='За роботу в триместрі'>
                    Триместр
                </th>
                <th v-b-tooltip.top
                    title='За тезу / залік / екзамен'>
                    Контроль
                </th>
                <th>Разом</th>
                <th>Нац. оцінка</th>
                <th>Оцінка ЄКТС</th>
            </tr>
            </thead>

            <tbody>

            <tr class="text-center align-middle"
                :key="student.studentId" v-for="student in statementStudents"
            >
                <th class="align-middle">{{ statementStudents.indexOf(student) + 1 }}</th>
                <td class="align-middle"
                    :class="pibErrorText(student) ? 'text-danger' : ''"
                    v-b-tooltip.top
                    v-b-tooltip.v-danger
                    :title='pibErrorText(student)'
                    :disabled='!pibErrorText(student)'
                >
                    {{ (student.studentPI + ' ' + student.studentPatronymic) || "&#8212;" }}
                </td>
                <td class="align-middle"
                    :class="studentRecordBookErrorText(student) ? 'text-danger' : ''"
                    v-b-tooltip.top
                    v-b-tooltip.v-danger
                    :title='studentRecordBookErrorText(student)'
                    :disabled='!studentRecordBookErrorText(student)'
                >
                    {{ student.studentRecordBook || "&#8212;" }}
                </td>
                <td class="align-middle"
                    :class="semesterGradeErrorText(student) ? 'text-danger' : ''"
                    v-b-tooltip.top
                    v-b-tooltip.v-danger
                    :title='semesterGradeErrorText(student)'
                    :disabled='!semesterGradeErrorText(student)'
                >
                    {{ student.semesterGrade || "&#8212;" }}
                </td>
                <td class="align-middle"
                    :class="controlGradeErrorText(student) ? 'text-danger' : ''"
                    v-b-tooltip.top
                    v-b-tooltip.v-danger
                    :title='controlGradeErrorText(student)'
                    :disabled='!controlGradeErrorText(student)'
                >
                    {{ student.controlGrade || "&#8212;" }}
                </td>
                <td class="align-middle"
                    :class="totalGradeErrorText(student) ? 'text-danger' : ''"
                    v-b-tooltip.top
                    v-b-tooltip.v-danger
                    :title='totalGradeErrorText(student)'
                    :disabled='!totalGradeErrorText(student)'
                >
                    {{ student.totalGrade || "&#8212;" }}
                </td>
                <td class="align-middle"
                    :class="nationalGradeErrorText(student) ? 'text-danger' : ''"
                    v-b-tooltip.top
                    v-b-tooltip.v-danger
                    :title='nationalGradeErrorText(student)'
                    :disabled='!nationalGradeErrorText(student)'
                >
                    {{ student.nationalGrade || "&#8212;" }}
                </td>
                <td class="align-middle"
                    :class="ectsGradeErrorText(student) ? 'text-danger' : ''"
                    v-b-tooltip.top
                    v-b-tooltip.v-danger
                    :title='ectsGradeErrorText(student)'
                    :disabled='!ectsGradeErrorText(student)'
                >
                    {{ student.ectsGrade || "&#8212;" }}
                </td>
            </tr>
            </tbody>
        </table>

        <div v-else-if="!loading">
            <h3 class="text-center mt-3 text-muted mb-0"> Дані відсутні </h3>
        </div>
    </div>
</template>

<script>
import Loader from "@/components/Loader";

export default {
    name: "StatementStudentsTable",
    components: {
        Loader
    },
    props: {
        statementStudents: {
            type: Array,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        },
        studentErrors: {
            required: true,
            type: Object,
        },
        studentId: {
            pibError: String,
            studentRecordBookError: String,
            semesterGradeError: String,
            controlGradeError: String,
            totalGradeError: String,
            nationalGradeError: String,
            ectsGradeError: String
        }
    },
    methods: {
        errorsForStudentExists(student) {
            // console.log(this.studentErrors[student.studentId])
            return Boolean(this.studentErrors[student.studentId])
        },
        pibErrorText(student) {
            return this.errorsForStudentExists(student) ?
                this.studentErrors[student.studentId].pibErrorText.join(', ') : ''
        },
        studentRecordBookErrorText(student) {
            return this.errorsForStudentExists(student) ?
                this.studentErrors[student.studentId].studentRecordBookErrorText.join(', ') : ''
        },
        semesterGradeErrorText(student) {
            // console.log(this.studentErrors[student.studentId].semesterGradeError)
            return this.errorsForStudentExists(student) ?
                this.studentErrors[student.studentId].semesterGradeErrorText.join(', ') : ''
        },
        controlGradeErrorText(student) {
            return this.errorsForStudentExists(student) ?
                this.studentErrors[student.studentId].controlGradeErrorText.join(', ') : ''
        },
        totalGradeErrorText(student) {
            return this.errorsForStudentExists(student) ?
                this.studentErrors[student.studentId].totalGradeErrorText.join(', ') : ''
        },
        nationalGradeErrorText(student) {
            return this.errorsForStudentExists(student) ?
                this.studentErrors[student.studentId].nationalGradeErrorText.join(', ') : ''
        },
        ectsGradeErrorText(student) {
            return this.errorsForStudentExists(student) ?
                this.studentErrors[student.studentId].ectsGradeErrorText.join(', ') : ''
        },
    }
}
</script>

<style scoped>
td {
    /*color: #dc3545;*/
}

/* Small devices (landscape phones, 576px and up)*/
@media (max-width: 576px) {
    table {
        word-break: normal!important;
    }
}
</style>