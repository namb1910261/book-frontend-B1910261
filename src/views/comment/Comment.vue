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
            <CommentList v-if="filteredCommentsCount > 0" :comments="filteredComments" v-model:activeIndex="activeIndex" />
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
                <!-- <router-link :to="{
                    name: 'comment.edit',
                    params: { id: activeComment._id },
                }">
                    <button class="btn btn-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</button>
                </router-link> -->
                <div class="card mt-3">
                    <div class="card-header">
                        <h4>Hiệu chỉnh Comment</h4>
                    </div>
                    <div class="card-body">
                        <CommentForm :comment="activeComment" @submit:comment="updateComment" @delete:comment="deleteComment" />
                        <p>{{ message }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CommentCard from "@/components/comment/CommentCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import CommentList from "@/components/comment/CommentList.vue";
import CommentService from "@/services/comment.service";
import CommentForm from "@/components/comment/CommentForm.vue";
export default {
    components: {
        CommentCard,
        InputSearch,
        CommentList,
        CommentForm
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            comments: [],
            activeIndex: -1,
            searchText: "",
            comment: null,
            message: "",
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
            if (this.activeIndex < 0) {
                this.message = ''
                return null;
            }
            else{
                this.message = ''
                return this.filteredComments[this.activeIndex];
            }
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
                    if (localStorage.getItem("role") == "admin") {
                        await CommentService.deleteAll();
                        this.refreshList();
                    }
                    else {
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

        async updateComment(data) {
            try {
                await CommentService.update(this.activeComment._id, data);
                this.message = "Thể loại được cập nhật thành công.";
                this.$router.push("comment");
            } catch (error) {
                console.log(error);
            }
        },
        async deleteComment() {
            if (confirm("Bạn muốn xóa Thể loại này?")) {
                try {
                    await CommentService.delete(this.activeComment._id);
                    this.retrieveComments()
                    this.$router.push("comment");
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>