<template>
    <Form @submit="submitReview" :validation-schema="reviewFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="reviewLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="content">Nội dung</label>
            <Field name="content" as="textarea" className="form-control" placeholder="Review"
                v-model="reviewLocal.content" />
            <ErrorMessage name="content" class="error-feedback" />
        </div>
        <br>
        <div class="form-group d-flex gap-1">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="reviewLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteReview">
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
    emits: ["submit:review", "delete:review"],
    props: {
        review: { type: Object, required: true }
    },
    data() {
        const reviewFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự.").nullable(),
            content: yup
                .string()
                .required("Nội dung phải có giá trị.")
                .min(2, "Nội dung phải ít nhất 2 ký tự.").nullable()
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // reviewLocal để liên kết với các input trên form
            reviewLocal: this.review,
            reviewFormSchema,
        };
    },
    methods: {
        submitReview() {
            this.$emit("submit:review", this.reviewLocal);
        },
        deleteReview() {
            this.$emit("delete:review", this.reviewLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>