<template>
    <div v-if="review" class="m-3">
        <div class="card mt-3">
            <div class="card-header">
                <h4>Hiệu chỉnh Review</h4>
            </div>
            <div class="card-body">
                <ReviewForm :review="review" @submit:review="updateReview" @delete:review="deleteReview" />
                <p>{{ message }}</p>
            </div>
        </div>
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
            review: null,
            message: "",
        };
    },
    methods: {
        async getReview(id) {
            try {
                this.review = await ReviewService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateReview(data) {
            try {
                await ReviewService.update(this.review._id, data);
                this.message = "Review được cập nhật thành công.";
                this.$router.push({ name: "review" });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteReview() {
            if (confirm("Bạn muốn xóa Review này?")) {
                try {
                    await ReviewService.delete(this.review._id);
                    this.$router.push({ name: "review" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getReview(this.id);
        this.message = "";
    },
};
</script>