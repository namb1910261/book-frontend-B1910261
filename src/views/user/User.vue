<template>
    <div class="row">
        <div class="col-md-12 p-0">
            <InputSearch v-model="searchText" :pagename="'User'"/>
        </div>
        <div class="mt-3 col-md-5">
            <!-- <h4>
                User
                <i class="fas fa-user"></i>
            </h4> -->
            <UserList v-if="filteredUsersCount > 0" :users="filteredUsers"
                v-model:activeIndex="activeIndex" />
            <p v-else class="text-white">Không có user nào.</p>
            <div class="mt-3 d-flex justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <!-- <button class="btn btn-sm btn-success" @click="goToAddUser">
                    <i class="fas fa-plus"></i> Thêm mới
                </button> -->
                <button class="btn btn-sm btn-danger" @click="removeAllUsers">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeUser">
                <UserCard :user="activeUser" />
                <router-link :to="{
                    name: 'user.edit',
                    params: { id: activeUser._id },
                }">
                    <button class="btn btn-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</button>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import UserCard from "@/components/user/UserCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import UserList from "@/components/user/UserList.vue";
import UserService from "@/services/user.service";
export default {
    components: {
        UserCard,
        InputSearch,
        UserList,
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            users: [],
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
        // Chuyển các đối tượng user thành chuỗi để tiện cho tìm kiếm.
        userStrings() {
            return this.users.map((user) => {
                const { name, email, password, } = user;
                return [name, email, password, ].join("");
            });
        },
        // Trả về các user có chứa thông tin cần tìm kiếm.
        filteredUsers() {
            if (!this.searchText) return this.users;
            return this.users.filter((_user, index) =>
                this.userStrings[index].includes(this.searchText)
            );
        },
        activeUser() {
            if (this.activeIndex < 0) return null;
            return this.filteredUsers[this.activeIndex];
        },
        filteredUsersCount() {
            return this.filteredUsers.length;
        },
    },
    methods: {
        async retrieveUsers() {
            try {
                this.users = await UserService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveUsers();
            this.activeIndex = -1;
        },

        async removeAllUsers() {
            if (confirm("Bạn muốn xóa tất cả User?")) {
                try {
                    await UserService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddUser() {
            this.$router.push({ name: "user.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>