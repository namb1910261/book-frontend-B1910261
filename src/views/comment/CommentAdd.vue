<template>
    <div v-if="comment" class="page" id="smallerfrom">
        <div class="card mt-3">
            <div class="card-header">
                <h4>Thêm Thể loại</h4>
            </div>
            <div class="card-body">
                <CommentForm :comment="comment" @submit:comment="addComment"/>
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
        reviewid: { type: String, required: true },
    },
    data() {
        return {
            comment: {
                user_id: localStorage.getItem('userid'),
                content: '',
                review_id: '',
            },
            message: "",
        };
    },
    methods: {
        async addComment(data) {
            try {
                this.review.review_id = this.reviewid;
                await CommentService.create(data);
                this.message = "Comment được thêm thành công.";
                this.$router.push({ name: "comment" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
<style>
#smallerfrom {
    text-align: left;
    max-width: 350px;
}
</style>