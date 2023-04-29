<script>
import CategoryService from "@/services/category.service";
import UserService from "@/services/user.service";
export default {
    data() {
        return {
            categorys: [],
            users: [],
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
        async retrieveUsers() {
            try {
                this.users = await UserService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveCategorys();
        this.retrieveUsers();
    },
};
</script>
<template class="page">
    <div class="d-flex my-1">
        <img :src="'./book_image/' + book.image" :alt="book.name">
        <div class="card rounded-start col-10">
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
                                    <div v-if="category == cate._id" class="badge bg-primary">
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
</template>

<style>
img {
    height: 300px;
}
</style>