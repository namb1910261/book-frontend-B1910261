<template>
    <Form @submit="submitUser" :validation-schema="userFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="userLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="text" class="form-control" v-model="userLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div v-if="!userLocal._id">
            <div class="form-group">
                <label for="password">Mật khẩu</label>
                <Field name="password" type="password" class="form-control" v-model="userLocal.password" />
                <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="form-group" v-if="$route.name != 'login'">
                <label for="passwordConfirmation">Nhập lại mật khẩu</label>
                <Field name="passwordConfirmation" type="password" class="form-control" />
            </div>
        </div>
        <br>
        <div class="form-group d-flex gap-1">
            <button 
                v-if="this.$route.name == 'login'" class="btn btn-primary">Đăng nhập</button>
            <button 
                v-else-if="this.$route.name == 'user.add'" class="btn btn-primary">Đăng ký</button>
            <button 
                v-else class="btn btn-primary">lưu</button>
            <button v-if="userLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteUser">
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
    emits: ["submit:user", "delete:user"],
    props: {
        user: { type: Object, required: true }
    },
    data() {
        const userFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự.").nullable(),
            email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự.").nullable()
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // userLocal để liên kết với các input trên form
            userLocal: this.user,
            userFormSchema,
        };
    },
    methods: {
        submitUser() {
            this.$emit("submit:user", this.userLocal);
        },
        deleteUser() {
            this.$emit("delete:user", this.userLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>