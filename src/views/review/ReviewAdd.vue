<template>
    <div v-if="review" class="page">
        <h4>Thêm Review</h4>
        <ReviewForm :review="review" @submit:review="addReview"/>
        <p>{{ message }}</p>
    </div>
</template>
<script>
import ReviewForm from "@/components/review/ReviewForm.vue";
import ReviewService from "@/services/review.service";
export default {
    components: {
        ReviewForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            review: {
                name: null,
                content: null,
                book_id: null,
            },
            message: "",
        };
    },
    methods: {
        async addReview(data) {
            try {
                this.review.book_id = this.id;
                await ReviewService.create(data);
                this.message = "Review được thêm thành công.";
                this.$router.push({ name: "review" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>