<template>
    <div>
        <loader v-if="loading" class="text-center mb-0 p-2" size="sm"/>

        <table v-if="statements.length > 0 & !loading" id="students-table"
               class="table tab table-hover table-responsive-sm b-table-no-border-collapse">
            <thead class="thead-light">
            <tr class="text-center">
                <th>№</th>
                <th>Викладач</th>
                <th>Предмет</th>
                <th>Тип контролю</th>
                <th>Причина перенесення</th>
                <th>Дата</th>
                <th>Дійсний до</th>
            </tr>
            </thead>

            <tbody>

            <tr class="text-center"
                :key="statements.indexOf(statement)" v-for="statement in statements"
                @click="$router.push({name: 'Statement', params: {id: `${statement.statementNo}`}})"
                style="cursor: pointer;">
                <th>{{ statement.statementNo }}</th>
                <td>{{ statement.tutor }}</td>
                <td>{{ statement.subject }}</td>
                <td>{{ statement.controlType }}</td>
                <td>{{ statement.postponeReason ? statement.postponeReason : "&#8212;" }}</td>
                <td>{{ statement.examDate }}</td>
                <td>{{ statement.validUntil ? statement.validUntil : "&#8212;" }}</td>
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
    name: "bigunets-table",
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
        validUntil(statement) {
            return statement.validUntil ? statement.validUntil : "&#8212;"
        }
    }
}
</script>

<style scoped>

</style>