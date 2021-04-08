<template>
    <b-row class="justify-content-md-center">

        <b-col cols="12" md="8">
            <b-row>
                <b-col>
                    <!--                    v-on:processfile="handleFilePondLoad"-->
                    <file-pond
                        id="file-upload"
                        ref="pond"
                        name="file"
                        label-idle='

                            <div class="d-inline-block mr-md-2" style="height: 36px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-file-earmark-arrow-up-fill" viewBox="0 0 16 16">
                                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707L6.354 9.854z"/>
                                </svg>
                            </div>
                            <div class="d-inline-block align-middle" >
                                Перетягніть сюди файл або <span class="filepond--label-action"> Оберіть </span>
                            </div>'
                                                allow-brouse="true"
                        :allow-multiple="false"
                        :max-files="1"
                        accepted-file-types="application/pdf"
                        v-bind:files="myFiles"
                        v-on:addfile="handleFilePondLoad"
                    >

                    </file-pond>
                </b-col>
            </b-row>

            <b-row v-if="!loading">
                <b-col></b-col>
                <b-col cols="12" md="8" class="text-center my-2">
                    <span class="d-inline-block" tabindex="0"
                          v-b-tooltip.hover.top
                          :title="myFiles.length === 0 ? 'Спочатку виберіть документ' : ''"
                    >
                        <b-button
                            variant="outline-success"
                            size="lg"
                            :disabled="myFiles.length === 0"
                            @click="loadData"
                        >
                        Завантажити {{ documentName }}
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
    baseURL: 'http://localhost:9000/api/'
});

// const FileSaver = require('file-saver');

export default {
    name: "document-loader",
    components: {
        FilePond
    },
    props: {
        documentName: {
            type: String,
            required: true
        },
        loadUrl: {
            type: String,
            required: true
        }
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
            instance.get(`/${this.loadUrl}`, {
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

<style>
.filepond--panel-root {
    background-color: #f0f4fe;
    border: 2px dashed #6e8eda;
}

/* the text color of the drop label*/
.filepond--drop-label label {
    color: #406cd2;
    font-weight: 500!important;
}

.filepond--label-action {
    color: #343a40;
    text-decoration-color: inherit;
}

.filepond--label-action:hover {
    color: #6c757d;
}

</style>