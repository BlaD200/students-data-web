<template>
    <div>
        <loader v-if="loading" class="text-center mb-0 p-2" size="sm"/>

        <table v-if="students.length > 0 & !loading" id="students-table"
               class="table table-striped table-hover table-responsive-sm">
            <thead>
            <tr>
                <th>№</th>
                <td>Прізвище</td>
                <td>Ім'я</td>
                <td>По-батькові</td>
            </tr>
            </thead>

            <tbody>
            <tr :key="student.studentCode" v-for="student in students"
                @click="$emit('showStudentDetails', student)" style="cursor: pointer;">
                <th>{{ student.studentRecordBook }}</th>
                <td>{{ student.studentSurname }}</td>
                <td>{{ student.studentName }}</td>
                <td>{{ student.studentPatronymic }}</td>
            </tr>
            </tbody>
        </table>

        <div v-else-if="!loading">
            <h2 class="text-center mt-3 text-muted mb-0"> Дані відсутні </h2>
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
    }
}
</script>

<style scoped>

</style>