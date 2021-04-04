<template>
    <div>
        <h2 class="text-center">{{ title }}</h2>

        <div v-show="isShowSort">
            <hr>

            <b-row>
                <b-col cols="5" md="6">
                    <b-row>
                        <b-col cols="12" md="10" lg="4">
                            <div>
                                <b-button size="sm" v-b-toggle.sidebar-filters
                                          id="filter-btn" ref="filterBtn"
                                          class="btn-secondary btn-block filter-side-toggle"
                                          variant="primary">
                                    <b-icon icon="filter" class="mr-2" aria-hidden="true"></b-icon>
                                    Фільтри
                                </b-button>
                            </div>
                        </b-col>
                    </b-row>


                </b-col>
                <b-col cols="7" md="6">
                    <b-row class="justify-content-end">
                        <b-col cols="12" md="10" lg="8">
                            <slot name="sorting"></slot>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

            <hr>
        </div>


        <b-row id="row1">
            <b-col class="mx-3 p-0 border-top">
                <b-row>
                    <b-col md="auto" class="pr-0">
                        <filter-layout class="" @applyFilters="$emit('applyFilters')">
                            <div slot="filters">
                                <slot name="filters"></slot>
                            </div>
                        </filter-layout>
                    </b-col>

                    <b-col class="pl-md-0">
                        <div>
                            <slot name="content"></slot>
                        </div>

                        <hr>

                        <div v-show="showPagination">
                            <b-pagination
                                v-model="pagination.currentPage"
                                :total-rows="rows"
                                :per-page="perPage"
                                :aria-controls="controls"
                                first-number
                                last-number
                                align="center"
                                @change="(e) => $emit('change', e)"
                            ></b-pagination>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import FilterLayout from "@/components/filters/FilterLayout";

export default {
    name: "Queries",
    components: {
        FilterLayout
    },
    props: {
        title: {
            type: String,
            required: true,
            validator: (val) => {
                return val && val.length > 0
            }
        },
        showPagination: {
            type: Boolean,
            default: false
        },
        currentPage: {
            type: Number,
            default: 1
        },
        rows: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        },
        controls: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isMounted: false,
            pagination: {currentPage: this.currentPage}
            // isShowSort: true
        }
    },
    computed: {
        isShowSort() {
            if (!this.isMounted) return null;
            // console.log('mounted, ', this.$refs['filterBtn'].has)
            let elem = this.$refs['filterBtn']
            let displayable = window.getComputedStyle(elem, null).display
            // console.log(displayable)
            return this.showPagination || displayable === 'block'
        }
    },
    created() {
    // console.log('created, ', this.$refs['filterBtn'])
    },
    mounted() {
        this.isMounted = true
        // console.log('mounted, ', this.$refs['filterBtn'].has)
        // let elem = this.$refs['filterBtn']
        // let displayable = window.getComputedStyle(elem, null).display
        // console.log(displayable)
        // this.isShowSort = this.showPagination || displayable === 'block'
    }
}
</script>

<style scoped>
/*Extra small devices (portrait phones, less than 576px)*/
@media (max-width: 575.98px) {
    .filter-large {
        display: none;
    }

    .filter-side-toggle {
        display: block;
    }
}

/* Small devices (landscape phones, 576px and up)*/
@media (min-width: 576px) {
    .filter-large {
        display: none;
    }

    .filter-side-toggle {
        display: block;
    }
}

/* Medium devices (tablets, 768px and up)*/
@media (min-width: 768px) {

}

/*Large devices (desktops, 992px and up)*/
@media (min-width: 992px) {
    .filter-large {
        display: block;
    }

    .filter-side-toggle {
        display: none;
    }
}

</style>