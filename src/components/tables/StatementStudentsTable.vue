<template>
    <div>
        <loader v-if="loading" class="text-center mb-0 p-2" size="sm"/>

        <table v-if="statementStudents.length > 0 & !loading"
               class="text-wrap text-break table table-hover table-bordered table-responsive-sm b-table-no-border-collapse"
        >
            <thead class="thead-light">
            <tr class="text-center">
                <th>№</th>
                <th>ПІБ студента</th>
                <th>№ залікової книжки</th>
                <th>
                    <span v-b-tooltip.top
                          title='Форма контролю: теза/залік/екзамен'>
                        Триместр
                    </span>
                </th>
                <th>
                    <span v-b-tooltip.top
                          title='Форма контролю: теза/залік/екзамен'>
                        Контроль
                    </span>
                </th>
                <th>Разом</th>
                <th>Нац. оцінка</th>
                <th>Оцінка ЄКТС</th>
            </tr>
            </thead>

            <tbody>

            <tr class="text-center align-middle"
                :key="student.statement_no" v-for="student in statementStudents"
                @click="$router.push({name: 'Student', params: {id: `${student.studentNo}`}})"
                style="cursor: pointer;">
                <th class="align-middle">{{ statementStudents.indexOf(student) + 1 }}</th>
                <td class="align-middle">{{ student.studentPIB }}</td>
                <td class="align-middle">{{ student.studentNo }}</td>
                <td class="align-middle">{{ student.semesterGrade }}</td>
                <td class="align-middle">{{ student.controlGrade }}</td>
                <td class="align-middle">{{ student.totalGrade }}</td>
                <td class="align-middle">{{ student.nationalGrade }}</td>
                <td class="align-middle">{{ student.ectsGrade }}</td>
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
        }
    },
    methods: {}
}
</script>

<style scoped>

</style>