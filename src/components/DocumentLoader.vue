<template>
    <b-row class="justify-content-md-center">

        <b-col cols="12" md="8">
            <hr>

            <b-row>
                <b-col>
                    <!--                    v-on:processfile="handleFilePondLoad"-->
                    <file-pond
                        id="file-upload"
                        name="file"
                        ref="pond"
                        :allow-multiple="false"
                        :max-files="1"
                        accepted-file-types="application/pdf"
                        v-bind:files="myFiles"
                        v-on:addfile="handleFilePondLoad"
                    />
                </b-col>
            </b-row>

            <b-row v-if="!loading">
                <b-col></b-col>
                <b-col cols="12" md="8" class="text-center my-2">
                    <span class="d-inline-block" tabindex="0"
                          v-b-tooltip.hover.top
                          :title="myFiles.length === 0 ? 'Upload file/s first' : ''"
                    >
                        <b-button
                            variant="outline-success"
                            size="lg"
                            :disabled="myFiles.length === 0"
                            @click="loadData"
                        >
                        Load students' data
                        </b-button>
                    </span>
                </b-col>
                <b-col></b-col>
            </b-row>
            <b-row v-else>
                <b-col></b-col>
                <b-col cols="6" class="text-center mx-5 my-2">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
// Import Vue FilePond
import vueFilePond from 'vue-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType);

const axios = require('axios');
const instance = axios.create({
    baseURL: 'http://localhost:9000/algorithm/'
});

// const FileSaver = require('file-saver');

export default {
    name: "document-loader",
    components: {
        FilePond
    },
    data() {
        return {
            myFiles: [],
            loading: false,
            loadedExample: false
        }
    },
    methods: {
        handleFilePondLoad(data) {
            if (data) {
                console.log(data.error);
                console.log(data.code);
                if (data.code === 200) {
                    this.myFiles = this.$refs.pond.getFiles();
                }
            } else {
                this.myFiles = this.$refs.pond.getFiles();
            }
        },
        loadData() {
            this.loading = true;
            this.$refs.pond.removeFiles();
            this.myFiles = this.$refs.pond.getFiles();
            instance.get("/start", {
                params: {},
                responseType: 'blob'
            }).then(response => {
                if (response.headers['correct'] === "true")
                    this.downloadTimetable(response.data)
                else {
                    const h = this.$createElement
                    const messageVNode = h('div', [
                        h('p', [
                            'This could happen because of some incorrect data provided, ' +
                            'or because of setting. ' +
                            'Try to review your data and/or change population/iterations/mutations to bigger size. '
                        ]),
                        h('p', [
                            'Despite of message bellow, you still could download generated timetable ' +
                            'and fix some problems by hand. '
                        ]),
                        h('p', [
                            h('b', [
                                'Do you want to download it?'
                            ])
                        ])
                    ])
                    this.$bvModal.msgBoxConfirm([messageVNode], {
                        title: "Cannot generate correct timetable",
                        size: 'md',
                        buttonSize: 'sm',
                        okVariant: 'outline-success',
                        cancelVariant: 'outline-secondary',
                        headerClass: 'border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true,
                        autoFocusButton: 'ok'
                    }).then(choice => {
                        if (choice)
                            this.downloadTimetable(response.data)
                    })
                }
                this.loading = false;
            }).catch(error => {
                if (error.response) {
                    this.$bvModal.msgBoxOk(
                        "Response code: " + error.response.status +
                        " Message: " + error.response.data, {
                            title: "Error when processing request",
                            size: 'md',
                            buttonSize: 'sm',
                            okVariant: 'outline-info',
                            cancelVariant: 'outline-secondary',
                            headerClass: 'border-bottom-0',
                            footerClass: 'p-2 border-top-0',
                            centered: true,
                            autoFocusButton: 'ok'
                        })
                } else {
                    this.$bvModal.msgBoxOk(
                        "Cannot establish connection with the server. Try to check your internet connection." +
                        "\nIf this error won't gone, please contact administrator.", {
                            title: "Cannot connect to the server",
                            size: 'md',
                            buttonSize: 'sm',
                            okVariant: 'outline-info',
                            cancelVariant: 'outline-secondary',
                            headerClass: 'border-bottom-0',
                            footerClass: 'p-2 border-top-0',
                            centered: true,
                            autoFocusButton: 'ok'
                        })
                }
                this.loading = false

                this.$emit('loadedExample')

                this.loadedExample = true
            })
        },
        downloadTimetable(data) {
            data
            // FileSaver.saveAs(data, "TimeTable.xlsx");
        }
    }
}
</script>

<style scoped>

</style>