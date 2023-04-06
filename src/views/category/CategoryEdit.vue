<template>
    <div v-if="category" class="page">
        <div class="card mt-3">
            <div class="card-header">
                <h4>Hiệu chỉnh Thể loại</h4>
            </div>
            <div class="card-body">
                <CategoryForm :category="category" @submit:category="updateCategory" @delete:category="deleteCategory" />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            category: null,
            message: "",
        };
    },
    methods: {
        async getCategory(id) {
            try {
                this.category = await CategoryService.get(id);
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
        async updateCategory(data) {
            try {
                await CategoryService.update(this.category._id, data);
                this.message = "Thể loại được cập nhật thành công.";
                this.$router.push({ name: "category" });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCategory() {
            if (confirm("Bạn muốn xóa Thể loại này?")) {
                try {
                    await CategoryService.delete(this.category._id);
                    this.$router.push({ name: "category" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getCategory(this.id);
        this.message = "";
    },
};
</script>