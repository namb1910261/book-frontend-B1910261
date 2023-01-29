<script>
import BookService from "@/services/book.service";
import UserService from "@/services/user.service";
export default {
    data() {
        return {
            books: [],
            users: [],
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
    },
    mounted() {
        this.retrieveBooks();
        this.retrieveUsers();
    },
};
</script>
<template>
    <div class="d-flex my-1">
        <div class="card rounded-0 col-12">
            <div class="card-header">
                <b>{{ review.name }}</b>
            </div>
            <div class="card-body">
                <div class="d-flex">
                    <div>
                        <div class="p-1">
                            <strong>Review:</strong>
                            {{ review.content }}
                        </div>
                        <div class="p-1">
                            <div v-for="(book) in books">
                                <div v-if="review.book_id == book._id">
                                    <div class="d-flex my-1">
                                        <img :src="'./book_image/' + book.image" :alt="book.name">
                                        <div class="card rounded-0 col-11">
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
                                                        <div class="p-1">
                                                            <strong>Yêu thích:</strong>
                                                            {{ book.favorite }}
                                                        </div>
                                                        <div class="p-1 d-flex">
                                                            <strong>Thể loại:</strong>
                                                            <div v-for="(category) in book.category_id" class="mx-1">
                                                                <div v-for="(cate) in categorys">
                                                                    <div v-if="category == cate._id">
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
    </div>
    <!-- <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ review.name }}
        </div>
        <div class="p-1">
            <strong>Review:</strong>
            {{ review.content }}
        </div>
        <div class="p-1">
            <strong>Sách:</strong>
            <div v-for="(book) in books">
                <div v-if="review.book_id == book._id">
                    {{ book.name }}
                    <br>
                    <strong>Hình:</strong>
                    <br>
                    <img :src="'./book_image/' + book.image" :alt="book.name">
                </div>
            </div>
        </div>
    </div> -->
</template>

<style>
img {
    height: 300px;
}
</style>