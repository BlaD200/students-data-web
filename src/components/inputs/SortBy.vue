<template>
    <b-input-group>
        <b-form-select size="sm" v-model="sortBy" :options="sortByOptions" @change="onSortBy"></b-form-select>
        <b-input-group-append>
            <b-button-group>
                <b-button size="sm" variant="secondary"
                          v-bind:class="{'btn-success': desc}"
                          @click="onClick(true)">
                    <b-icon icon="chevron-down" aria-hidden="true"
                            v-bind:class="{'btn-outline-success': false}"></b-icon>
                </b-button>
                <b-button size="sm" variant="secondary"
                          v-bind:class="{'btn-success': !desc}"
                          @click="onClick(false)">
                    <b-icon icon="chevron-up" aria-hidden="true"
                            v-bind:class="{'btn-outline-success': false}"></b-icon>
                </b-button>
            </b-button-group>
        </b-input-group-append>
    </b-input-group>
</template>

<script>
export default {
    name: "StudentsSort",
    props: {
        sortByDefault: {
            type: String,
            required: true
        },
        sortByOptions: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            sortBy: '',
            desc: true
        }
    },
    methods: {
        onClick(desc) {
            this.desc = desc
            this.$emit('sortDesc', desc)
        },
        onSortBy() {
            this.$emit('sortBy', this.sortBy)
        }
    },
    beforeMount() {
        this.sortBy = this.sortByDefault
    }
}
</script>

<style scoped>

</style>