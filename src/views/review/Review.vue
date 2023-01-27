<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Review
                <i class="fas fa-list-alt"></i>
            </h4>
            <ReviewList v-if="filteredReviewsCount > 0" :reviews="filteredReviews"
                v-model:activeIndex="activeIndex" />
            <p v-else>Không có review nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <!-- <button class="btn btn-sm btn-success" @click="goToAddReview">
                    <i class="fas fa-plus"></i> Thêm mới
                </button> -->
                <button class="btn btn-sm btn-danger" @click="removeAllReviews">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeReview">
                <h4>
                    Chi tiết Review
                    <i class="fas fa-address-card"></i>
                </h4>
                <ReviewCard :review="activeReview" />
                <router-link :to="{
                    name: 'review.edit',
                    params: { id: activeReview._id },
                }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import ReviewCard from "@/components/review/ReviewCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ReviewList from "@/components/review/ReviewList.vue";
import ReviewService from "@/services/review.service";
export default {
    components: {
        ReviewCard,
        InputSearch,
        ReviewList,
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            reviews: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng review thành chuỗi để tiện cho tìm kiếm.
        reviewStrings() {
            return this.reviews.map((review) => {
                const { name, content, book_id } = review;
                return [name, content, book_id].join("");
            });
        },
        // Trả về các review có chứa thông tin cần tìm kiếm.
        filteredReviews() {
            if (!this.searchText) return this.reviews;
            return this.reviews.filter((_review, index) =>
                this.reviewStrings[index].includes(this.searchText)
            );
        },
        activeReview() {
            if (this.activeIndex < 0) return null;
            return this.filteredReviews[this.activeIndex];
        },
        filteredReviewsCount() {
            return this.filteredReviews.length;
        },
    },
    methods: {
        async retrieveReviews() {
            try {
                this.reviews = await ReviewService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveReviews();
            this.activeIndex = -1;
        },

        async removeAllReviews() {
            if (confirm("Bạn muốn xóa tất cả Review?")) {
                try {
                    await ReviewService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddReview() {
            this.$router.push({ name: "review.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>