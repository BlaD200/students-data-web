<template>
    <div>
        <b-row class="mb-3 justify-content-center">
            <b-col cols="12" lg="10" class="p-2 bg-white shadow-sm">
                <h2 class="text-center">Завантажити документ</h2>
            </b-col>
        </b-row>

        <b-row class="justify-content-center">
            <b-col cols="12" lg="10" class="bg-white shadow rounded-lg p-0">
                <b-tabs justified card pills class="">
                    <b-tab title="Відомість">
                        <document-loader document-name="відомість"
                                         load-url="statement/load"
                                         v-on:loadedExample="onDocumentLoad"></document-loader>
                    </b-tab>
                    <b-tab title="Бігунець" title-link-class="">
                        <document-loader document-name="бігунець"
                                         load-url="bigunets/load"
                                         v-on:loadedExample="onDocumentLoad"></document-loader>
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>

        <statement v-show="loadedExample" class="mt-2" id="22222"></statement>

        <b-row class="mt-2 mb-5 justify-content-center" v-show="loadedExample">
            <b-col cols="12" lg="10" class="bg-white shadow rounded-lg">
                <b-row class="text-center" v-show="loadedExample">
                    <b-col class="p-2 mt-2">
                        <div>
                            <span tabindex="0"
                                  v-b-tooltip.v-warning.right
                                  :title="saveButtonTooltipTitle">
                                <b-button
                                    id="fix-button"
                                    size="lg"
                                    variant="success"
                                    :disabled="isErrors || !dataAccepted"
                                    @click="saveData"
                                >
                                Зберегти відомість
                                </b-button>
                            </span>
                        </div>
                    </b-col>
                </b-row>

                <b-row class="justify-content-center" v-show="loadedExample">
                    <b-col lg="10" class="px-2 pt-0 mb-2">
                        <div class="text-center">
                            <b-form-checkbox
                                id="checkbox-1"
                                v-model="dataAccepted"
                                :disabled="isErrors"
                                name="checkbox-1"
                            >
                                <span v-if="isErrors"
                                      class="d-block" tabindex="0"
                                      v-b-tooltip.top
                                      :title="fixErrorsMessage"
                                >
                                  Дані мною перевірені, їх коректність підтверджую
                                </span>
                                <span v-else>Дані мною перевірені, їх коректність підтверджую</span>
                            </b-form-checkbox>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>

</template>

<script>
import DocumentLoader from "@/components/DocumentLoader";
import Statement from "@/view/Statement";

export default {
    name: "LoadDocument",
    components: {
        DocumentLoader, Statement
    },
    data() {
        return {
            loadedExample: false,
            dataAccepted: false
        };
    },
    methods: {
        onDocumentLoad() {
            this.loadedExample = true;
        },
        saveData() {
        }
    },
    computed: {
        isErrors() {
            for (let statementErrorBlock of
                [Statement.data().headerErrors, Statement.data().studentErrors, Statement.data().footerErrors]) {
                console.log(statementErrorBlock)
                for (let key in statementErrorBlock) {
                    if (statementErrorBlock[key] !== null)
                        return true;
                }
            }
            return false
        },
        fixErrorsMessage() {
            return 'Спочатку необхідно виправити всі помилки'
        },
        saveButtonTooltipTitle() {
            if (this.isErrors)
                return this.fixErrorsMessage
            else if (!this.dataAccepted)
                return 'Підтвердіть, що ви перевірили дані'
            return ''
        }
    }
}
</script>

<style scoped>
h2 {
    text-align: center;
}
</style>