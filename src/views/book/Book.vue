<template>
    <div class="row page">
        <div class="col-md-12 p-0">
            <InputSearch v-model="searchText" :pagename="'Sách'" />
        </div>
        <div class="mt-3 col-md-5">
            <!-- <h4>
                Sách
                <i class="fas fa-book"></i>
            </h4> -->
            <BookList v-if="filteredBooksCount > 0" :books="filteredBooks" v-model:activeIndex="activeIndex" />
            <p v-else class="text-white">Không có sách nào.</p>
            <div class="mt-3 d-flex justify-content-around align-items-center gap-1">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddBook">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllBooks">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeBook">
                <!-- <h4>
                    Chi tiết Sách
                    <i class="fas fa-book"></i>
                </h4> -->
                <BookCard :book="activeBook" />
                <span class="d-flex gap-1">
                    <router-link :to="{
                        name: 'book.edit',
                        params: { id: activeBook._id },
                    }">
                        <button class="btn btn-warning">
                            <i class="fas fa-edit"></i> Hiệu chỉnh</button>
                    </router-link>

                    <router-link :to="{
                        name: 'review.add',
                        params: { id: activeBook._id },
                    }">
                        <button class="btn btn-primary">
                            <i class="fas fa-comments"></i> Tạo review</button>
                    </router-link>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import BookCard from "@/components/book/BookCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/book/BookList.vue";
import BookService from "@/services/book.service";
export default {
    components: {
        BookCard,
        InputSearch,
        BookList,
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
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
        // Chuyển các đối tượng book thành chuỗi để tiện cho tìm kiếm.
        bookStrings() {
            return this.books.map((book) => {
                const { name, email, address, phone } = book;
                return [name, email, address, phone].join("");
            });
        },
        // Trả về các book có chứa thông tin cần tìm kiếm.
        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter((_book, index) =>
                this.bookStrings[index].includes(this.searchText)
            );
        },
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.filteredBooks[this.activeIndex];
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },
    methods: {
        async retrieveBooks() {
            try {
                if (localStorage.getItem('role') == 'admin')
                    this.books = await BookService.getAll();
                else
                    this.books = await BookService.findAllBookByUserId(localStorage.getItem('userid'));
                console.log(this.book)
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },

        async removeAllBooks() {
            if (confirm("Bạn muốn xóa tất cả Sách?")) {
                try {
                    if (localStorage.getItem("role") == "admin") {
                        await BookService.deleteAll();
                        this.refreshList();
                    }
                    else {
                        await BookService.deleteByUserId(localStorage.getItem('userid'));
                        this.refreshList();
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddBook() {
            this.$router.push({ name: "book.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>