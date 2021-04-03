<template>
    <div>
        <h2>Document loading</h2>

        <br>

        <div>
            <b-card no-body>
                <b-tabs justified>
                    <b-tab title="Відомість">
                        <document-loader v-on:loadedExample="onDocumentLoad"></document-loader>
                    </b-tab>
                    <b-tab title="Бігунець" title-link-class="text-warning">
                        <document-loader v-on:loadedExample="onDocumentLoad"></document-loader>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>

        <br>

        <b-row class="justify-content-center" v-show="loadedExample">
            <b-col cols="12" md="8">
                <hr>

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

export default {
    name: "LoadDocument",
    components: {
        DocumentLoader, DocumentError
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