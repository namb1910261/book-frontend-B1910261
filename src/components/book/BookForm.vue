<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="bookLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Hình</label>
            <Field name="image" type="file" class="form-control" v-model="bookLocal.image"
                @change="onFileInput($event)" />
            <ErrorMessage name="image" class="error-feedback" />
        </div>
        <!-- <div class="form-group">
            <label for="category_id">Thể loại</label>
            <select class="form-control" id="category_id" v-model="bookLocal.category_id">
                <option v-for="(category) in categorys" :value="category">{{ category.name }}</option>
            </select>
        </div> -->
        <div class="card bg-white border-0 m-0 p-0 shadow-none">
            <label for="category_id">Thể loại</label>
            <div class="card-body">
                <div class="form-check" v-for="(category) in categorys">
                    <input class="form-check-input" type="checkbox" :id="category._id" :value="category._id" v-model="cate"
                    @change="onCheckboxInput">
                    <label class="form-check-label" :for="category._id">
                        {{ category.name }}
                    </label>
                </div>
            </div>
        </div>
        
        <div class="form-group form-check">
            <input name="favorite" type="checkbox" class="form-check-input" v-model="bookLocal.favorite" />
            <label for="favorite" class="form-check-label">
                <strong>Sách yêu thích</strong>
            </label>
        </div>
        <br>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="bookLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteBook">
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
    emits: ["submit:book", "delete:book"],
    props: {
        categorys: { type: Array, default: [] },
        book: { type: Object, required: true },
    },
    data() {
        const bookFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            image: yup
                .string()
                .required("Hình phải có giá trị."),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // bookLocal để liên kết với các input trên form
            cate: [],
            bookLocal: this.book,
            bookFormSchema,
        };
    },
    methods: {
        submitBook() {
            this.$emit("submit:book", this.bookLocal);
        },
        deleteBook() {
            this.$emit("delete:book", this.bookLocal.id);
        },
        onFileInput(event) {
            this.bookLocal.image = event.target.files[0].name;
        },
        onCheckboxInput(){
            this.bookLocal.category_id = this.cate;
        }
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>