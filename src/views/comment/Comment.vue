<template>
    <div class="row page">
        <div class="col-md-12 p-0">
            <InputSearch v-model="searchText" :pagename="'Bình luận'" />
        </div>
        <div class="mt-3 col-md-5">
            <!-- <h4 class="card-label">
                Thể loại
                <i class="fas fa-list-alt"></i>
            </h4> -->
            <CommentList v-if="filteredCommentsCount > 0" :comments="filteredComments"
                v-model:activeIndex="activeIndex" />
            <p v-else class="text-white">Không có thể loại nào.</p>
            <div class="mt-3 d-flex justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <!-- <button class="btn btn-sm btn-success" @click="goToAddComment">
                    <i class="fas fa-plus"></i> Thêm mới
                </button> -->
                <button class="btn btn-sm btn-danger" @click="removeAllComments">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeComment">

                <CommentCard :comment="activeComment" />
                <router-link :to="{
                    name: 'comment.edit',
                    params: { id: activeComment._id },
                }">
                    <button class="btn btn-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</button>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import CommentCard from "@/components/comment/CommentCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import CommentList from "@/components/comment/CommentList.vue";
import CommentService from "@/services/comment.service";
export default {
    components: {
        CommentCard,
        InputSearch,
        CommentList,
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            comments: [],
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
        // Chuyển các đối tượng comment thành chuỗi để tiện cho tìm kiếm.
        commentStrings() {
            return this.comments.map((comment) => {
                const { user_id, content, review_id } = comment;
                return [user_id, content, review_id].join("");
            });
        },
        // Trả về các comment có chứa thông tin cần tìm kiếm.
        filteredComments() {
            if (!this.searchText) return this.comments;
            return this.comments.filter((_comment, index) =>
                this.commentStrings[index].includes(this.searchText)
            );
        },
        activeComment() {
            if (this.activeIndex < 0) return null;
            return this.filteredComments[this.activeIndex];
        },
        filteredCommentsCount() {
            return this.filteredComments.length;
        },
    },
    methods: {
        async retrieveComments() {
            try {
                if (localStorage.getItem('role') == 'admin')
                    this.comments = await CommentService.getAll();
                else
                    this.comments = await CommentService.findAllCommentByUserId(localStorage.getItem('userid'));
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveComments();
            this.activeIndex = -1;
        },

        async removeAllComments() {
            if (confirm("Bạn muốn xóa tất cả Thể loại?")) {
                try {
                    if(localStorage.getItem("role")=="admin"){
                        await CommentService.deleteAll();
                        this.refreshList();
                    }
                    else{
                        await CommentService.deleteByUserId(localStorage.getItem('userid'));
                        this.refreshList();
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddComment() {
            this.$router.push({ name: "comment.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>