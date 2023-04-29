<script>
import BookService from "@/services/book.service";
import UserService from "@/services/user.service";
import CategoryService from "@/services/category.service";
export default {
    data() {
        return {
            books: [],
            users: [],
            categorys: []
        };
    },
    props: {
        review: { type: Object, required: true },
    },
    methods: {
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveUsers() {
            try {
                this.users = await UserService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveCategorys() {
            try {
                this.categorys = await CategoryService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveBooks();
        this.retrieveUsers();
        this.retrieveCategorys();
    },
};
</script>
<template class="page">
    <div class="d-flex my-1">
        <div class="card col-12">
            <div class="card-header">
                <b>{{ review.name }}</b>
                <div class="mt-3">
                    <strong>Review:</strong>
                    {{ review.content }}
                </div>
                <div class="mt-3 d-flex gap-1">
                    <strong>Người viết:</strong>
                    <div v-for="(user) in users">
                        <div v-if="review.user_id == user._id">
                            {{ user.name }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="d-flex">
                    <div>
                        <div v-for="(book) in books">
                            <div v-if="review.book_id == book._id">
                                <div class="d-flex">
                                    <img :src="'./book_image/' + book.image" :alt="book.name">
                                    <div class="card rounded-start col-9" style="width: 27rem;">
                                        <div class="card-header">
                                            <b>{{ book.name }}</b>
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex">
                                                <div>
                                                    <div class="p-1">
                                                        <strong>Tên:</strong>
                                                        {{ book.name }}
                                                    </div>
                                                    <div class="p-1 d-flex gap-2">
                                                        <strong>Yêu thích:</strong>
                                                        <span v-if="book.favorite">
                                                            <i class="fas fa-heart text-danger"></i>
                                                        </span>
                                                    </div>
                                                    <div class="p-1 d-flex">
                                                        <strong>Thể loại:</strong>
                                                        <div v-for="(category) in book.category_id" class="mx-1">
                                                            <div v-for="(cate) in categorys">
                                                                <div v-if="category == cate._id" class="badge bg-gradient-primary">
                                                                    {{ cate.name }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="p-1 d-flex">
                                                        <strong>User:</strong>
                                                        <div v-for="(user) in users" class="mx-1">
                                                            <div v-if="user._id == book.user_id">
                                                                {{ user.name }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
img {
    height: 300px;
}
</style>