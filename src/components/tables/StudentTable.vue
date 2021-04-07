<template>
    <div>
        <loader v-if="loading" class="text-center mb-0 p-2" size="sm"/>

        <table v-if="students.length > 0 & !loading" id="students-table"
               class="table table-hover table-responsive-sm b-table-no-border-collapse">
            <thead class="thead-light">
            <tr>
                <th>№</th>
                <th>Прізвище</th>
                <th>Ім'я</th>
                <th>По-батькові</th>
            </tr>
            </thead>

            <tbody>

            <tr :key="student.studentCode" v-for="student in students"
                @click="$router.push({name: 'Student', params: {id: student.studentRecordBook}})" style="cursor: pointer;">
                    <th>{{ student.studentRecordBook }}</th>
                    <td>{{ student.studentSurname }}</td>
                    <td>{{ student.studentName }}</td>
                    <td>{{ student.studentPatronymic }}</td>
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
    }
}
</script>

<style scoped>

</style>