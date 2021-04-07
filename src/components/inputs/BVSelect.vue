<template>
    <div class="d-flex vs-append">
        <v-select class="style-chooser" type="text"
                  :components="{Deselect, OpenIndicator}"
                  :label="label" :options="options"
                  :placeholder="placeholder"
                  :disabled="disabled"
                  v-bind:value="value"
                  v-on:input="$emit('input', $event)">
            <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                    <span class="text-warning">Нічого не знайдено</span>
                </template>
                <!--                <em style="opacity: 0.5;" v-else>Start typing to search for a country.</em>-->
            </template>
        </v-select>

        <div class="input-group-append">
            <b-input-group-text>{{ append }}</b-input-group-text>
        </div>
    </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
    name: "b-v-select",
    components: {
        vSelect
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        placeholder: {
            type: String,
            required: false,
            default: ""
        },
        options: {
            type: Array,
            required: true
        },
        label: {
            type: String,
            required: false,
            default: ""
        },
        append: {
            type: String,
            required: false,
            default: ""
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        value: null
    },
    data() {
        return {
            Deselect: {
                render: createElement => createElement('b-icon', {
                    attrs: {icon: "backspace"}
                }),
            },
            OpenIndicator: {
                render: createElement => createElement('b-icon', {
                    attrs: {icon: "chevron-down"}
                }),
            }
        }
    },
}
</script>

<!--suppress CssUnusedSymbol -->
<style>
/*noinspection CssInvalidPropertyValue*/
.style-chooser {
    width: 100%;
    width: -moz-available; /* WebKit игнор. */
    width: -webkit-fill-available; /* Mozilla игнор. */
    width: fill-available;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.vs-append /*> .input-group-append*/
{
    height: calc(1.5em + 0.75rem + 2px);
}

.vs-append > .input-group-append > .input-group-text {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.vs__dropdown-toggle {
    height: calc(1.5em + 0.75rem + 2px);
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem 0 0 0.25rem;
    padding: 0;
}

.vs__selected-options {
    padding: 0.375rem 0 0.375rem 0.75rem;
    width: 0;
}

.vs__selected {
    margin: 0;
    display: block;
    /*max-width: inherit;*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 1px solid #000000;
    /*width: 100px;*/
    /*width: -moz-available; !* WebKit игнор. *!*/
    /*width: -webkit-fill-available; !* Mozilla игнор. *!*/
    /*width: fill-available;*/
    max-width: 60%;
    width: 60%;
}

.vs__search, .vs__search:focus {
    padding: 0 0;
    margin-top: 0;
    /*width: min-content;*/
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
}

.vs__search::placeholder {
    color: #636c72;
}

.vs__open-indicator {
    fill: black !important;
}

.vs__actions {
    padding: 4px 8px 2px 3px;
}

.vs__dropdown-menu {
    width: fit-content;
}

</style>