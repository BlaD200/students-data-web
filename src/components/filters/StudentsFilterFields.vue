<template>
    <div>
        <b-form-select v-model="yearSelected"
                       v-on:input="$emit('yearChanged', yearSelected)"
                       :options="yearOptions">
            <template #first>
                <b-form-select-option :value="null" class="text-muted">-- Рік навчання --</b-form-select-option>
            </template>
        </b-form-select>

        <b-form-input class="mt-2" type="text" v-model="subjectInput"
                      v-on:input="$emit('subjectInput', subjectInput)"
                      placeholder="Предмет"></b-form-input>
        <b-form-input class="mt-2" type="text" v-model="tutorInput"
                      v-on:input="$emit('tutorInput', tutorInput)"
                      placeholder="Викладач"
        ></b-form-input>
        <span class="d-flex mt-2"
              v-b-tooltip.top
              :title='!canSearchByGroup ? "Введіть назву передмету або ім`я викладача" : ""'
              :disabled="canSearchByGroup"
        >
            <b-form-input type="text"
                          v-model="groupInput"
                          v-on:input="$emit('groupInput', groupInput)"
                          placeholder="Група"
                          :disabled="!canSearchByGroup"
            ></b-form-input>
        </span>


        <b-form-select class="mt-2" v-model="semesterSelected" :options="semesterOptions"
                       v-on:input="$emit('semesterChanged', semesterSelected)">
            <template #first>
                <b-form-select-option :value="''" class="text-muted">-- Семестр --</b-form-select-option>
            </template>
        </b-form-select>
        <b-form-select class="mt-2" v-model="courseSelected" :options="courseOptions"
                       v-on:input="$emit('courseChanged', courseSelected)">
            <template #first>
                <b-form-select-option :value="''" class="text-muted">-- Курс --</b-form-select-option>
            </template>
        </b-form-select>
    </div>
</template>

<script>
export default {
    name: "students-filter-fields",
    props: {
        yearOptions: {
            type: Array,
            required: true
        },
        semesterOptions: {
            type: Array,
            required: true,
        },
        courseOptions: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            yearSelected: null,
            semesterSelected: '',
            courseSelected: '',
            subjectInput: '',
            tutorInput: '',
            groupInput: ''
        }
    },
    computed: {
        isSubjectValid() {
            return this.isInputValid(this.subjectInput)
        },
        isTutorValid() {
            return this.isInputValid(this.tutorInput)
        },
        canSearchByGroup() {
            return this.isSubjectValid || this.isTutorValid
        }
    },
    methods: {
        isInputValid(input) {
            return input.length >= 3
        },
    }
}
</script>

<style scoped>

</style>