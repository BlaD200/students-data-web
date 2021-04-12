<template>
    <div>
        <loader v-if="loading" class="text-center mb-0 p-2" size="sm"/>

        <table v-if="statements.length > 0 & !loading" id="students-table"
               class="text-wrap  table table-hover table-responsive-xl b-table-no-border-collapse">
            <thead class="thead-light">
            <tr class="text-center">
                <th>№</th>
                <th>Викладач</th>
                <th>Предмет</th>
                <th>Група</th>
                <th>Тип контролю</th>
                <th>
                    <span v-b-tooltip.top
                          title='Кількість студентів, які були присутні/відсутні/недопущені'>
                        Кількість студентів
                    </span>
                </th>
                <th>Дата</th>
            </tr>
            </thead>

            <tbody>

            <tr class="text-center"
                :key="statement.statementNo" v-for="statement in statements"
                @click="$router.push({name: 'Statement', params: {id: `${statement.statementNo}`}})"
                style="cursor: pointer;">
                <th>{{ statement.statementNo }}</th>
                <td>{{ statement.tutorFullName }}</td>
                <td>{{ statement.subjectName }}</td>
                <td>{{ statement.group }}</td>
                <td>{{ statement.controlType }}</td>
                <td>{{ studentsCount(statement) }}</td>
                <td>{{ statement.examDate }}</td>
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
    components: {
        Loader
    },
    props: {
        statements: {
            type: Array,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        studentsCount(statement) {
            return statement.studentsCount ?
                `${statement.studentsCount.presentCount} / ${statement.studentsCount.absentCount} / ${statement.studentsCount.rejectedCount}`
                : ''
        }
    }
}
</script>

<style scoped>

</style>