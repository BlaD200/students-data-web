<template>
    <div>
        <b-input-group append="Рік">
            <b-form-select v-model="yearSelected"
                           v-on:input="$emit('yearChanged', yearSelected)"
                           :options="yearOptions">
                <template #first>
                    <b-form-select-option :value="''" class="text-muted">-- Рік навчання --</b-form-select-option>
                </template>
            </b-form-select>
        </b-input-group>

        <b-v-select
            class="mt-2"
            :placeholder="'Предмет'"
            :append="'Предмет'"
            v-model="subjectInput" :options="subjectOptions"
            v-on:input="$emit('subjectInput', subjectInput)"
        ></b-v-select>

        <b-v-select
            class="mt-2"
            :options="tutorOptions"
            :placeholder="'Викладач'"
            :append="'Викладач'"
            v-model="tutorInput"
            v-on:input="$emit('tutorInput', tutorInput)"
        ></b-v-select>

        <div class="mt-2"
             v-b-tooltip.right
             :title='!canSearchByGroup ? "Введіть назву передмету або ім`я викладача" : ""'
             :disabled="canSearchByGroup">
            <b-v-select
                :options="groupOptions"
                :placeholder="'Група'"
                :append="'Група'"
                v-model="groupInput"
                v-on:input="$emit('groupInput', groupInput)"
                :disabled="!canSearchByGroup"
            ></b-v-select>
        </div>

        <b-input-group append="Семестр" class="mt-2">
            <b-form-select class="" v-model="semesterSelected" :options="semesterOptions"
                           v-on:input="$emit('semesterChanged', semesterSelected)">
                <template #first>
                    <b-form-select-option :value="''" class="text-muted">-- Семестр --</b-form-select-option>
                </template>
            </b-form-select>
        </b-input-group>

        <b-input-group append="Курс" class="mt-2">
            <b-form-select class="" v-model="courseSelected" :options="courseOptions"
                           v-on:input="$emit('courseChanged', courseSelected)">
                <template #first>
                    <b-form-select-option :value="''" class="text-muted">-- Курс --</b-form-select-option>
                </template>
            </b-form-select>
        </b-input-group>

    </div>
</template>

<script>
import BVSelect from "@/components/BVSelect";

export default {
    name: "students-filter-fields",
    components: {
        BVSelect
    },
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
        },
        tutorOptions: {
            type: Array,
            required: true
        },
        subjectOptions: {
            type: Array,
            required: true
        },
        groupOptions: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            yearSelected: '',
            semesterSelected: '',
            courseSelected: '',
            subjectInput: '',
            tutorInput: '',
            groupInput: '',
            Deselect: {
                render: createElement => createElement('b-icon', {
                    attrs: {icon: "backspace"}
                }),
            },
            OpenIndicator: {
                render: createElement => createElement('b-icon', {
                    attrs: {icon: "chevron-down"}
                }),
            },
        }
    },
    computed: {
        isSubjectValid() {
            return this.isInputValid(this.subjectInput ? this.subjectInput : '')
        },
        isTutorValid() {
            return this.isInputValid(this.tutorInput? this.tutorInput : '')
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

<style>

</style>