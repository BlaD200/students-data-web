<template>
    <div>
        <b-row>
            <b-col>
                <b-form-group
                    id="fieldset-1"
                    :description="description"
                    :label="label"
                    label-for="search-input"
                    invalid-feedback="Введіть щонайменше 4 символи"
                    :state="searchValid"
                >
                    <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                            <b-icon icon="search"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input id="search-input"
                                      v-model="searchInput"
                                      @input="$emit('input', $event)"
                                      :state="searchValid"
                                      :placeholder="placeholder"></b-form-input>
                    </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row v-show="searchValid" class="my-2">
            <b-col>
                <slot name="table"></slot>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: "SearchWithTable",
    props: {
        label: String,
        description: String,
        placeholder: String
    },
    data() {
        return {
            searchInput: '',
        }
    },
    computed: {
        searchValid() {
            if (this.searchInput.length === 0)
                return null
            return this.searchInput.length >= 4
        },
    }
}
</script>

<style scoped>

</style>