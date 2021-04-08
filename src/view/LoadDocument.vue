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

        <statement v-show="false" class="mt-2" id="22222"></statement>

        <b-row class="justify-content-center" v-show="loadedExample">
            <b-col cols="12" md="8">
                <b-row v-show="handledErrors.length > 0">
                    <b-col>
                        <div class="py-2 pl-1 border border-warning rounded">
                            <ul class="m-0">
                                <li
                                    v-for="error in handledErrors"
                                    :key="handledErrors.indexOf(error)">
                                    <document-error
                                        :error-text="error"
                                    ></document-error>
                                </li>
                            </ul>
                        </div>
                    </b-col>
                </b-row>

                <br>

                <b-row v-show="unhandledErrors.length > 0">
                    <b-col>
                        <div class="py-2 pl-1 border border-danger rounded">
                            <ul class="m-0">
                                <li
                                    v-for="error in unhandledErrors"
                                    :key="unhandledErrors.indexOf(error)">
                                    <document-error
                                        :error-text="error"
                                    ></document-error>
                                </li>
                            </ul>
                        </div>
                    </b-col>
                </b-row>

                <b-row class="float-right" v-show="errors">
                    <b-col>
                        <div>
                            <span class="d-inline-block" tabindex="0"
                                  v-b-tooltip.left
                                  title="There're some errors, that couldn't be fixed automatically.">
                                <b-button
                                    id="fix-button"
                                    class="m-2"
                                    :disabled="unhandledErrors.length > 0"
                                    @click="fixErrors"
                                >
                                Fix automatically
                                </b-button>
                            </span>
                        </div>
                    </b-col>
                </b-row>

            </b-col>


        </b-row>
    </div>

</template>

<script>
import DocumentLoader from "@/components/DocumentLoader";
import DocumentError from "@/components/DocumentError";
import Statement from "@/view/Statement";

export default {
    name: "LoadDocument",
    components: {
        DocumentLoader, DocumentError, Statement
    },
    data() {
        return {
            loadedExample: false,
            handledErrors: [
                "не вказано науковий ступінь викладача",
                "не вказано суму балів ",
                "не вказано кількість студентів, що не з’явилися",
                "невідповідність ЄКТС оцінки"
            ],
            unhandledErrors: [
                "неповна\\відсутня дата",
                "відсутні бали за роботу в семестрі студента",
                "відсутній номер відомості"
            ]
        };
    },
    methods: {
        onDocumentLoad() {
            this.loadedExample = true;
        },
        fixErrors() {
            this.handledErrors = []
            this.unhandledErrors = []
        }
    },
    computed: {
        errors() {
            return this.handledErrors.length > 0 || this.unhandledErrors.length > 0
        }
    }
}
</script>

<style scoped>
h2 {
    text-align: center;
}
</style>