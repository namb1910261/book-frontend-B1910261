<template>
    <div v-if="comment" class="page" id="smallerfrom">
        <div class="card mt-3">
            <div class="card-header">
                <h4>Hiệu chỉnh Thể loại</h4>
            </div>
            <div class="card-body">
                <CommentForm :comment="comment" @submit:comment="updateComment" @delete:comment="deleteComment" />
                <p>{{ message }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import CommentForm from "@/components/comment/CommentForm.vue";
import CommentService from "@/services/comment.service";
export default {
    components: {
        CommentForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            comment: null,
            message: "",
        };
    },
    methods: {
        async getComment(id) {
            try {
                this.comment = await CommentService.get(id);
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
        async updateComment(data) {
            try {
                await CommentService.update(this.comment._id, data);
                this.message = "Thể loại được cập nhật thành công.";
                this.$router.go(-1);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteComment() {
            if (confirm("Bạn muốn xóa Thể loại này?")) {
                try {
                    await CommentService.delete(this.comment._id);
                    this.$router.go(-1);
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getComment(this.id);
        this.message = "";
    },
};
</script>
<style>
#smallerfrom {
    text-align: left;
    max-width: 350px;
}
</style>