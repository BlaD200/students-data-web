<template>
    <div>
        <div class="p-2 mb-3 bg-white shadow-sm">
            <h2 class="text-center">{{ title }}</h2>
        </div>

        <div class=" p-2 p-lg-3 mb-3 bg-white shadow">
            <div v-show="isShowSort">
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
            </div>

            <b-row class="mt-3">
                <b-col class="mx-md-3 p-md-0">
                    <div class="border-top">
                        <b-row>
                            <b-col md="auto" lg="4" class="pr-0">
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
                    </div>

                </b-col>
            </b-row>
        </div>

        <b-button @click="$emit('refresh')" id="refresh" class="shadow d-flex border-0">
            <svg class="refreshicon" id="Capa_1" x="0px" y="0px" width="25px" height="25px"
                 viewBox="0 0 322.447 322.447" style="enable-background:new 0 0 322.447 322.447;"
                 xml:space="preserve">
            <path
                d="M321.832,230.327c-2.133-6.565-9.184-10.154-15.75-8.025l-16.254,5.281C299.785,206.991,305,184.347,305,161.224 c0-84.089-68.41-152.5-152.5-152.5C68.411,8.724,0,77.135,0,161.224s68.411,152.5,152.5,152.5c6.903,0,12.5-5.597,12.5-12.5 c0-6.902-5.597-12.5-12.5-12.5c-70.304,0-127.5-57.195-127.5-127.5c0-70.304,57.196-127.5,127.5-127.5 c70.305,0,127.5,57.196,127.5,127.5c0,19.372-4.371,38.337-12.723,55.568l-5.553-17.096c-2.133-6.564-9.186-10.156-15.75-8.025 c-6.566,2.134-10.16,9.186-8.027,15.751l14.74,45.368c1.715,5.283,6.615,8.642,11.885,8.642c1.279,0,2.582-0.198,3.865-0.614 l45.369-14.738C320.371,243.946,323.965,236.895,321.832,230.327z"/> </svg>
        </b-button>
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

<!--suppress CssUnusedSymbol -->
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

#check path {
    stroke: #ffffff;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: .85px;
    stroke-dasharray: 60px 300px;
    stroke-dashoffset: -166px;
    fill: rgba(255, 255, 255, .0);
    transition: stroke-dashoffset 2s ease .5s, fill 1.5s ease 1.0s
}

#check.checked path {
    stroke-dashoffset: 33px;
    fill: rgba(255, 255, 255, .03)
}

#refresh {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #ffffff;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1);
    padding: 13px 0 0 13px
}

.refreshicon {
    fill: #5c83ae;
    transform: rotate(0deg);
    transition: fill .25s ease, transform .25s ease
}

.refreshicon:hover {
    cursor: pointer;
    fill: #1059FF;
    transform: rotate(180deg)
}

</style>