<template>
    <div class="row page">
        <div class="col-md-12 p-0">
            <InputSearch v-model="searchText" :pagename="'Review'" />
        </div>
        <div class="mt-3 col-md-5">
            <!-- <h4>
                Review
                <i class="fas fa-comments"></i>
            </h4> -->
            <ReviewList v-if="filteredReviewsCount > 0" :reviews="filteredReviews" v-model:activeIndex="activeIndex" />
            <p v-else class="text-white">Không có review nào.</p>
            <div class="mt-3 d-flex justify-content-around align-items-center">
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
        <div class="mt-3 col-md-7">
            <div v-if="activeReview">
                <!-- <h4>
                    Chi tiết Review
                    <i class="fas fa-comments"></i>
                </h4> -->
                <ReviewCard :review="activeReview" />
                <router-link :to="{
                    name: 'review.edit',
                    params: { id: activeReview._id },   
                }">
                    <button class="btn btn-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</button>
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
                const { name, content, book_id, user_id } = review;
                return [name, content, book_id, user_id].join("");
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
                if (localStorage.getItem('role') == 'admin')
                    this.reviews = await ReviewService.getAll();
                else
                    this.reviews = await ReviewService.findAllReviewByUserId(localStorage.getItem('userid'));
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
                    if (localStorage.getItem("role") == "admin") {
                        await ReviewService.deleteAll();
                        this.refreshList();
                    }
                    else {
                        await ReviewService.deleteByUserId(localStorage.getItem('userid'));
                        this.refreshList();
                    }
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