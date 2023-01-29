<template>
    <div v-if="book" class="page">
        <h4>Thêm Sách</h4>
        <BookForm :book="book" @submit:book="addBook" :categorys="filteredCategorys" />
        <p>{{ message }}</p>
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
    data() {
        return {
            categorys:[],
            book: {
                name: null,
                image: null,
                favorite: null,
                category_id: null,
                user_id: null,
            },
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

        async addBook(data) {
            try {
                this.book.user_id = localStorage.getItem('userid');
                await BookService.create(data);
                this.message = "Sách được thêm thành công.";
                this.$router.push({ name: "book" });
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveCategorys();
    },
};
</script>