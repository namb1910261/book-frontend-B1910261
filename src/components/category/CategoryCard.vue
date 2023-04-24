<script>
import UserService from "@/services/user.service";
export default {
    data() {
        return {
            users: [],
        };
    },
    props: {
        category: { type: Object, required: true },
    },
    methods: {
        async retrieveUsers() {
            try {
                this.users = await UserService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveUsers();
    },
};
</script>
<template class="page">
    <!-- <div>
                <div class="p-1">
                    <strong>Tên:</strong>
                    {{ category.name }}
                </div>
            </div> -->
    <div class="d-flex my-1">
        <div class="card col-12">
            <div class="card-header">
                <b>
                    Chi tiết thể loại
                    <i class="fas fa-list-alt"></i>
                </b>
            </div>
            <div class="mx-4"><b>Tên:</b> {{ category.name }}</div>
            <div class="mx-4 mb-4"><b>User: </b>
                <span v-for="(user) in users"><span></span>
                    <span v-if="category.user_id == user._id">
                        {{ user.name }}
                    </span>
                </span>
            </div>

        </div>
    </div>
</template>