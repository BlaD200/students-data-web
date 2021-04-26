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
                <th>Група</th>
                <th>Тип контролю</th>
                <th>Дата</th>
                <th>
                    <span v-b-tooltip.top
                          title='Кількість студентів, які були присутні/відсутні/недопущені'>
                        Оцінка
                    </span>
                </th>
            </tr>
            </thead>

            <tbody>

            <tr class="text-center"
                :key="subject.subjectID" v-for="subject in subjects"
                @click="$emit('studentSubjectTableRowClicked', subject.subjectID)"
                style="cursor: pointer;">
                <th>{{ subjects.indexOf(subject) + 1 }}</th>
                <td>{{ subject.subjectName }}</td>
                <td>{{ subject.tutorFullName }}</td>
                <td>{{ subject.group }}</td>
                <td>{{ subject.controlType }}</td>
                <td>{{ subject.examDate }}</td>
                <td>{{ subject.grade }}</td>
            </tr>
            </tbody>
        </table>

        <div v-else-if="!loading">
            <h3 class="text-center mt-3 text-muted mb-0 p-3"> Дані відсутні </h3>
        </div>
    </div>
</template>

<script>
import Loader from "@/components/Loader";

export default {
    name: "StudentSubjectTable",
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
              subjectID: 1,
              subjectName: 'Технології сучасних дата - центрів',
              tutorFullName: "Черкасов Дмитро Іванович",
              group: "1",
              controlType: "екзамен",
              examDate: "2021-05-25",
              grade: 90
          }
      }
    },
    methods: {
    }
}
</script>

<style scoped>

</style>