<script>
export default {
    props: {
        categorys: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>
<template>
    <div class="card">
        <div class="card-header pb-0 p-3 d-flex justify-content-between">
            <h6 class="mb-0">Thể loại</h6>
            <i class="fas fa-list mx-4"></i>
        </div>
        <div class="card-body p-3">
            <ul class="list-group">
                <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
                    v-for="(category, index) in categorys" :key="category._id">
                    <div class="d-flex align-items-center" @click="updateActiveIndex(index)">
                        <div class="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                            <i class="fas fa-list text-white opacity-10"></i>
                        </div>
                        <div class="d-flex flex-column">
                            <h6 class="mb-1 text-sm " :class="{ 'text-primary': index === activeIndex }">{{ category.name }}</h6>
                        </div>
                    </div>
                    <div class="d-flex">
                        <button @click="updateActiveIndex(index)"
                            class="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"><i
                                class="ni ni-bold-right" aria-hidden="true"></i></button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>