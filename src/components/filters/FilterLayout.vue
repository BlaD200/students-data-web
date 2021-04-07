<template>
    <div class="border-right">
        <b-sidebar id="sidebar-filters" title="Sidebar"
                   bg-variant="dark" text-variant="light"
                   class=""
                   backdrop shadow="lg" no-header>
            <div class="p-3">
                <b-button id="filter-close-title" class="p-0 mb-4 bg-dark border-0" size="lg" v-b-toggle.sidebar-filters>
                    <b-icon icon="chevron-left" aria-hidden="true"></b-icon>
                    Фільтри
                </b-button>

                <slot name="filters"></slot>

                <apply-filters-button @applyFilters="onApplyFilters" class="mt-4"></apply-filters-button>
            </div>
        </b-sidebar>

        <div class="filter-large px-0 mr-0">
            <div class="pr-3 py-3">
                <slot name="filters"></slot>
            </div>

            <apply-filters-button class="mt-2 mr-2 p-2"
                                  @applyFilters="onApplyFilters"></apply-filters-button>

        </div>
    </div>
</template>

<script>
import ApplyFiltersButton from "@/components/inputs/ApplyFiltersButton";

export default {
    name: "filter-layout",
    components: {
        ApplyFiltersButton
    },
    methods: {
        onApplyFilters(){
            console.log("hire2")
            this.$emit('applyFilters')
            // this.$emit('sortBy2')
        }
    }
}
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
.sidebar-border-dark {
    border-color: #2A2E33 !important;
}

#filter-close-title:hover {
    color: #cacccf;
    background-color: #343a40 !important;
}

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