<script>
import UserService from "@/services/user.service";
export default {
    data() {
        return {
            users: [],
        };
    },
    props: {
        comments: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        async retrieveUsers() {
            try {
                this.users = await UserService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    },
    mounted() {
        this.retrieveUsers();
    },
};
</script>
<template>
    <div class="card">
          <div class="card-header pb-0 p-3 d-flex justify-content-between">
            <h6 class="mb-0">Comment</h6>
            <i class="fas fa-list mx-4"></i>
        </div>
        <div class="card-body p-3">
            <ul class="list-group">
                <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
                    v-for="(comment, index) in comments" :key="comment._id">
                    <div class="d-flex align-items-center" @click="updateActiveIndex(index)">
                        <div class="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                            <i class="fas fa-list"></i>
                        </div>
                        <div class="d-flex flex-column">
                            <h6 class="mb-1 text-sm " :class="{ 'text-primary': index === activeIndex }">
                                <span v-for="(user) in users"><span></span>
                                    <span v-if="comment.user_id == user._id">
                                        {{ user.name }}
                                    </span>
                                </span>
                            </h6>
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