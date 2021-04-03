<template>
    <span>
        {{ errorText }}
    </span>
</template>

<script>
export default {
    name: "document-error",
    props: {
        errorText: String
    }
}
</script>

<style scoped>

</style>