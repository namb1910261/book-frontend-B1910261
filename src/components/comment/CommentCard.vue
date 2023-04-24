<script>
import UserService from "@/services/user.service";
import ReviewService from "@/services/review.service";
export default {
    data() {
        return {
            users: [],
            reviews: [],
        };
    },
    props: {
        comment: { type: Object, required: true },
    },
    methods: {
        async retrieveUsers() {
            try {
                this.users = await UserService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveReviews() {
            try {
                this.reviews = await ReviewService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveUsers();
        this.retrieveReviews();
    },
};
</script>
<template class="page">
    <div class="d-flex my-1">
        <div class="card col-12">
            <div class="card-header">
                <b>
                    Chi tiết Comment
                    <i class="fas fa-comments"></i>
                </b>
            </div>
            <div class="mx-4"><b>Nội dung:</b> {{ comment.content }}</div>
            <div class="mx-4"><b>Review: </b>
                <span v-for="(review) in reviews"><span></span>
                    <span v-if="comment.review_id == review._id">
                        {{ review.name }}
                    </span>
                </span>
            </div>
            <div class="mx-4 mb-4"><b>user: </b>
                <span v-for="(user) in users"><span></span>
                    <span v-if="comment.user_id == user._id">
                        {{ user.name }}
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>