<template>
    <div class="row page">
        <div class="col-md-12 p-0">
            <InputSearch v-model="searchText" :pagename="'Thể loại'" />
        </div>
        <div class="mt-3 col-md-5">
            <!-- <h4 class="card-label">
                Thể loại
                <i class="fas fa-list-alt"></i>
            </h4> -->
            <CategoryList v-if="filteredCategorysCount > 0" :categorys="filteredCategorys"
                v-model:activeIndex="activeIndex" />
            <p v-else class="text-white">Không có thể loại nào.</p>
            <div class="mt-3 d-flex justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddCategory">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllCategorys">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeCategory">

                <CategoryCard :category="activeCategory" />
                <!-- <router-link :to="{
                        name: 'category.edit',
                        params: { id: activeCategory._id },
                    }">
                    <button class="btn btn-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</button>
                </router-link> -->
                <div class="card mt-3">
                    <div class="card-header">
                        <h4>Hiệu chỉnh Thể loại</h4>
                    </div>
                    <div class="card-body">
                        <CategoryForm :category="activeCategory" @submit:category="updateCategory"
                            @delete:category="deleteCategory" />
                        <p>{{ message }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CategoryCard from "@/components/category/CategoryCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import CategoryList from "@/components/category/CategoryList.vue";
import CategoryService from "@/services/category.service";
import CategoryForm from "@/components/category/CategoryForm.vue";
export default {
    components: {
        CategoryCard,
        InputSearch,
        CategoryList,
        CategoryForm
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            categorys: [],
            activeIndex: -1,
            searchText: "",
            category: null,
            message: "",
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
        // Chuyển các đối tượng category thành chuỗi để tiện cho tìm kiếm.
        categoryStrings() {
            return this.categorys.map((category) => {
                const { name, email, address, phone } = category;
                return [name, email, address, phone].join("");
            });
        },
        // Trả về các category có chứa thông tin cần tìm kiếm.
        filteredCategorys() {
            if (!this.searchText) return this.categorys;
            return this.categorys.filter((_category, index) =>
                this.categoryStrings[index].includes(this.searchText)
            );
        },
        activeCategory() {
            if (this.activeIndex < 0) {
                this.message=''
                return null;
            }
            else{
                this.message='';
                return this.filteredCategorys[this.activeIndex];
            }
        },
        filteredCategorysCount() {
            return this.filteredCategorys.length;
        },
    },
    methods: {
        async retrieveCategorys() {
            try {
                if (localStorage.getItem('role') == 'admin')
                    this.categorys = await CategoryService.getAll();
                else
                    this.categorys = await CategoryService.findAllCategoryByUserId(localStorage.getItem('userid'));
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveCategorys();
            this.activeIndex = -1;
        },

        async removeAllCategorys() {
            if (confirm("Bạn muốn xóa tất cả Thể loại?")) {
                try {
                    if (localStorage.getItem("role") == "admin") {
                        await CategoryService.deleteAll();
                        this.refreshList();
                    }
                    else {
                        await CategoryService.deleteByUserId(localStorage.getItem('userid'));
                        this.refreshList();
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddCategory() {
            this.$router.push({ name: "category.add" });
        },

        async updateCategory(data) {
            try {
                await CategoryService.update(this.activeCategory._id, data);
                this.message = "Thể loại được cập nhật thành công.";
                this.$router.push({ name: "category" });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCategory() {
            if (confirm("Bạn muốn xóa Thể loại này?")) {
                try {
                    await CategoryService.delete(this.activeCategory._id);
                    this.retrieveCategorys()
                    this.$router.push({ name: "category" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>