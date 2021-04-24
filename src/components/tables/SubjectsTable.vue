<template>
    <div>
        <loader v-if="loading" class="text-center mb-0 p-2" size="sm"/>

        <table v-if="subjects.length > 0 & !loading" id="students-table"
               class="text-wrap  table table-hover table-responsive-md b-table-no-border-collapse">
            <thead class="thead-light">
            <tr class="text-center">
                <th>№</th>
                <th>Предмет</th>
                <th>Викладач</th>
                <th>
                    <span v-b-tooltip.top
                          title='Середня оцінка, яку отримали студенти з цього предмету за весь час'>
                        Оцінка
                    </span>
                </th>
            </tr>
            </thead>

            <tbody>

            <tr class="text-center"
                :key="subject.subjectId" v-for="subject in subjects"
                @click="$emit('subjectTableRowClicked', subject.subjectId)"
                style="cursor: pointer;">
                <th>{{ subjects.indexOf(subject) + 1 }}</th>
                <td>{{ subject.subjectName }}</td>
                <td>{{ subject.tutorFullName }}</td>
                <td>{{ subject.averageGrade }}</td>
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
    name: "SubjectsTable",
    components: {
        Loader
    },
    props: {
        subjects: {
            type: Array,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            subject: {
                subjectId: 1,
                subjectName: 'Технології сучасних дата - центрів',
                tutorFullName: "Черкасов Дмитро Іванович",
                averageGrade: 86.68
            }
        }
    },
}
</script>

<style scoped>

</style>