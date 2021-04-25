<template>
    <div>
        <loader v-if="loading" class="text-center mb-0 p-2" size="sm"/>

        <table v-if="biguntsi.length > 0 & !loading" id="students-table"
               class="table table-sm tab table-hover table-responsive-xl b-table-no-border-collapse">
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
                :key="biguntsi.indexOf(bigunets)" v-for="bigunets in biguntsi"
                @click="$router.push({name: 'Statement', params: {id: `${bigunets.statementNo}`, type: 'bigunets'}})"
                style="cursor: pointer;">
                <th>{{ bigunets.statementNo }}</th>
                <td>{{ bigunets.tutorFullName }}</td>
                <td>{{ bigunets.subjectName }}</td>
                <td>{{ bigunets.controlType }}</td>
                <td>{{ bigunets.postponeReason ? bigunets.postponeReason : "&#8212;" }}</td>
                <td>{{ bigunets.examDate }}</td>
                <td>{{ bigunets.validUntil ? bigunets.validUntil : "&#8212;" }}</td>
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
        biguntsi: {
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