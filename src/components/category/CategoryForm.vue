<template>
    <Form @submit="submitCategory" :validation-schema="categoryFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="category.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <br>
        <div class="form-group d-flex gap-1">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="category._id" type="button" class="ml-2 btn btn-danger" @click="deleteCategory">
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
    emits: ["submit:category", "delete:category"],
    props: {
        category: { type: Object, required: true }
    },
    data() {
        const categoryFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự.").nullable(),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // categoryLocal để liên kết với các input trên form
            categoryLocal: this.category,
            categoryFormSchema,
        };
    },
    methods: {
        submitCategory() {
            this.$emit("submit:category", this.category);
        },
        deleteCategory() {
            this.$emit("delete:category", this.category.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>