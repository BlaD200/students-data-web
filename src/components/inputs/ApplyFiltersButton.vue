<template>
    <b-row class="m-0 p-0">
        <b-col class="m-0 p-0">
            <div>
                <b-button @click="onClick" variant="primary" class="float-right">Шукати</b-button>
            </div>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: "apply-filters-button",
    methods: {
        onClick() {
            console.log("hire1")
            this.$emit('applyFilters')
        }
    }
}
</script>

<style scoped>

</style>