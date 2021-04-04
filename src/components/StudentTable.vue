<template>
    <div>
        <table v-if="students.length > 0" id="students-table"
               class="table table-striped table-hover table-responsive-sm">
            <thead>
            <tr>
                <th>№</th>
                <td>Ім'я</td>
                <td>Прізвище</td>
                <td>По-батькові</td>
                <td>Курс</td>
            </tr>
            </thead>

            <tbody>
            <tr :key="student.studentCode" v-for="student in students"
                @click="showStudentDetails(student)" style="cursor: pointer;">
                <th>{{ student.studentRecordBook }}</th>
                <td>{{ student.studentName }}</td>
                <td>{{ student.studentSurname }}</td>
                <td>{{ student.studentPatronymic }}</td>
                <td>{{ student.studentRecordBook }}</td>
            </tr>
            </tbody>
        </table>

        <div v-else>
            <h2 class="text-center mt-3 text-muted mb-0"> Дані відсутні </h2>
        </div>
    </div>
</template>

<script>
export default {
    name: "student-table",
    props: {
        students: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

</style>