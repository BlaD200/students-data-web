<template>
    <div>
        <b-v-select
            class="mt-2"
            :placeholder="'Предмет'"
            :append="'Предмет'"
            v-model="subjectInput" :options="subjectOptions"
            v-on:input="onSubjectInput"
        ></b-v-select>

        <b-v-select
            class="mt-2"
            :options="tutorOptions"
            :placeholder="'Викладач'"
            :append="'Викладач'"
            v-model="tutorInput"
            v-on:input="onTutorInput"
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
    </div>
</template>

<script>
import BVSelect from "@/components/inputs/BVSelect";

export default {
    name: "StatementsFilterFields",
    components: {BVSelect},
    props: {
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
        onSubjectInput(subjectInput){
            this.$emit('subjectInput', subjectInput)
            this.groupInput = null
        },
        onTutorInput(tutorInput){
            this.$emit('tutorInput', tutorInput)
            this.groupInput = null
        }
    }
}
</script>

<style scoped>

</style>