<template>
    <div v-if="book" class="m-3">
        <div class="card">
            <div class="card-header">
                <h4>Hiệu chỉnh Sách</h4>
            </div>
            <div class="card-body">
                <BookForm :book="book" @submit:book="updateBook" @delete:book="deleteBook" :categorys="filteredCategorys" :cat="book.category_id"/>
                <p>{{ message }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import BookForm from "@/components/book/BookForm.vue";
import BookService from "@/services/book.service";
import CategoryService from "@/services/category.service";
export default {
    components: {
        BookForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            categorys: [],
            book: null,
            message: "",
        };
    },
    computed: {
        // Chuyển các đối tượng category thành chuỗi để tiện cho tìm kiếm.
        categoryStrings() {
            return this.categorys.map((category) => {
                const { name, image, favorite, category_id, user_id, } = category;
                return [name, image, favorite, category_id, user_id,].join("");
            });
        },
        // Trả về các category có chứa thông tin cần tìm kiếm.
        filteredCategorys() {
            return this.categorys.filter((_category, index) =>
                this.categoryStrings[index]
            );
        },
    },
    methods: {
        async retrieveCategorys() {
            try {
                this.categorys = await CategoryService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async getBook(id) {
            try {
                this.book = await BookService.get(id);
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
        async updateBook(data) {
            try {
                await BookService.update(this.book._id, data);
                this.message = "Sách được cập nhật thành công.";
                this.$router.push({ name: "book" });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteBook() {
            if (confirm("Bạn muốn xóa Sách này?")) {
                try {
                    await BookService.delete(this.book._id);
                    this.$router.push({ name: "book" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getBook(this.id);
        this.message = "";
    },
    mounted() {
        this.retrieveCategorys();
    },
};
</script>