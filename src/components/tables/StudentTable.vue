<template>
    <div>
        <loader v-if="loading" class="text-center mb-0 p-2" size="sm"/>

        <table v-if="students.length > 0 & !loading" id="students-table"
               class="text-center table table-hover table-responsive-sm b-table-no-border-collapse">
            <thead class="thead-light">
            <tr>
                <th>№</th>
                <th>ПІБ</th>
                <th>Факультет</th>
                <th>Курс</th>
                <th>Рейтинг</th>
            </tr>
            </thead>

            <tbody>
            <tr :key="student.studentRecordBook" v-for="student in students"
                @click="$emit('studentTableRowClicked', student.studentId)"
                style="cursor: pointer;">
                <th>{{ student.studentRecordBook }}</th>
                <td>{{ studentFullName(student) }}</td>
                <td>{{ studentFacultyInitials(student)  }}</td>
                <td>{{ student.studentCourse }}</td>
                <td>{{ student.studentRating }}</td>
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
    name: "student-table",
    components: {Loader},
    props: {
        students: {
            type: Array,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        studentFullName(student) {
            return `${student.studentSurname} ${student.studentName} ${student.studentPatronymic}`
        },
        studentFacultyInitials(student) {
            let string = student.faculty ?
                student.faculty.split(' ').map(word => word.charAt(0).toUpperCase()).join('') : '';
            console.log(string)
            return string
        }
    },
    computed: {}
}
</script>

<style scoped>
/* Small devices (landscape phones, 576px and up)*/
@media (max-width: 992px) {
    table {
        word-break: normal!important;
    }
}
</style>