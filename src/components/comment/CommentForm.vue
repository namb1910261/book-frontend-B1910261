<template>
    <Form @submit="submitComment" :validation-schema="commentFormSchema">
        <div class="form-group">
            <Field name="content" as="textarea" className="form-control" placeholder="Review" rows="2"
                v-model="comment.content" />
            <ErrorMessage name="content" class="error-feedback" />
        </div>
        <div class="form-group d-flex gap-1">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="comment._id" type="button" class="ml-2 btn btn-danger" @click="deleteComment">
                Xóa
            </button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:comment", "delete:comment"],
    props: {
        comment: { type: Object, required: true },
    },
    data() {
        const commentFormSchema = yup.object().shape({
            content: yup
                .string()
                .required("Nội dung phải có giá trị.").nullable(),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // commentLocal để liên kết với các input trên form
            commentLocal: this.comment,
            commentFormSchema,
        };
    },
    methods: {
        submitComment() {
            this.$emit("submit:comment", this.comment);
        },
        deleteComment() {
            this.$emit("delete:comment", this.comment.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>