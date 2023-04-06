<template>
    <div v-if="category" class="page">
        <div class="card mt-3">
            <div class="card-header">
                <h4>Thêm Thể loại</h4>
            </div>
            <div class="card-body">
                <CategoryForm :category="category" @submit:category="addCategory"/>
                <p>{{ message }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import CategoryForm from "@/components/category/CategoryForm.vue";
import CategoryService from "@/services/category.service";
export default {
    components: {
        CategoryForm,
    },
    data() {
        return {
            category: {
                name: null,
            },
            message: "",
        };
    },
    methods: {
        async addCategory(data) {
            try {
                await CategoryService.create(data);
                this.message = "Thể loại được thêm thành công.";
                this.$router.push({ name: "category" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>