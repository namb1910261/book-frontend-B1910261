<script>
import CategoryService from "@/services/category.service";
export default {
    data() {
        return {
            categorys: [],
        };
    },
    props: {
        book: { type: Object, required: true },
    },
    methods: {
        async retrieveCategorys() {
            try {
                this.categorys = await CategoryService.getAll();
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
<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ book.name }}
        </div>
        <div class="p-1">
            <strong>Hình:</strong>
            <br>
            <img :src="'./book_image/' + book.image" :alt="book.name">
        </div>
        <div class="p-1">
            <strong>Yêu thích:</strong>
            {{ book.favorite }}
        </div>
        <div class="p-1">
            <strong>Thể loại:</strong>
            <div v-for="(category) in book.category_id">
                <div v-for="(cate) in categorys">
                    <div v-if="category == cate._id">
                        {{ cate.name }}
                    </div>
                </div>
            </div>
        </div>
        <div class="p-1">
            <strong>User:</strong>
            {{ book.user_id }}
        </div>
    </div>
</template>

<style>
img {
    height: 300px;
}
</style>