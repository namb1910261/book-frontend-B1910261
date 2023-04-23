<script>
import BookService from "@/services/book.service";
import UserService from "@/services/user.service";
import CategoryService from "@/services/category.service";
import CommentForm from "@/components/comment/CommentForm.vue";
import CommentService from "@/services/comment.service";
export default {
    components: {
        CommentForm,
    },
    data() {
        return {
            books: [],
            users: [],
            categorys: [],
            comment: {
                user_id: localStorage.getItem('userid'),
                content: '',
                review_id: this.review._id,
            },
            message: "",
            commentByReview: [],
        };
    },
    props: {
        review: { type: Object, required: true },
        userid: { type: String, required: true },
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
        async retrieveCommentsByReview() {
            try {
                this.commentByReview = await CommentService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async addComment(data) {
            try {
                await CommentService.create(data);
                this.message = "Comment được thêm thành công.";
                this.retrieveCommentsByReview()
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveBooks();
        this.retrieveUsers();
        this.retrieveCategorys();
        this.retrieveCommentsByReview();
    },
};
</script>
<template>
    <div class="d-flex my-1">
        <div class="card col-12">
            <div class="card-body">
                <div class="d-flex">
                    <div>
                        <div v-for="(book) in books">
                            <div v-if="review.book_id == book._id">
                                <div class="d-flex">
                                    <img :src="'./book_image/' + book.image" :alt="book.name">
                                    <div class="card rounded-start col-9">
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
                <br>
                <strong>Bình luận:</strong>
                <CommentForm :comment="comment" @submit:comment="addComment" />
                <p>{{ message }}</p>
                <div class="mt-3">
                    <p><b>Các bình luận:</b></p>
                    <!-- {{ review._id }} -->
                    <ul class="list-group" v-for="(comt) in commentByReview">
                        <li class="list-group-item border-0 px-0 d-flex align-items-center" v-if="comt.review_id == review._id">
                            <span v-for="(user) in users">
                                <span v-if="comt.user_id == user._id">
                                    <b>{{ user.name }}</b>: {{ comt.content }}
                                </span>
                            </span>
                            <router-link class="ms-auto" :to="{
                                    name: 'comment.edit',
                                    params: { id: comt._id },
                                }" v-if="comt.user_id == userid">
                                <button class="badge bg-warning border-0">
                                    <i class="fas fa-edit"></i> Hiệu chỉnh</button>
                            </router-link>
                        </li>
                    </ul>
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