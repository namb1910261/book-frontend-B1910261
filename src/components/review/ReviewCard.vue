<script>
import BookService from "@/services/book.service";
export default {
    data() {
        return {
            books: [],
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
    },
    mounted() {
        this.retrieveBooks();
    },
};
</script>
<template>
    <div>
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
    </div>
</template>

<style>
img {
    height: 300px;
}
</style>