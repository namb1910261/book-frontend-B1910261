<template>
    <div class="row m-5 px-5">
        <div class="card col-6 rounded-0">
            <div class="card-header">
                <h4>Đăng ký</h4>
            </div>
            <div class="card-body">
                <UserForm :user="user" @submit:user="addUser" />
                <router-link :to="{ name: 'login' }" class="nav-link">
                    Đăng nhập
                </router-link>
                <br>
                <p>{{ message }}</p>
            </div>
        </div>
        <div class="col p-0">
            <img src="/book_image/bg-01.jpg" width="495" class="card rounded-0">
        </div>
    </div>
</template>
<script>
import UserForm from "@/components/user/UserForm.vue";
import UserService from "@/services/user.service";
import * as CryptoJS from 'crypto-js';
export default {
    components: {
        UserForm,
    },
    data() {
        return {
            user: {
                name: null,
                email: null,
                password: null,
            },
            message: "",
        };
    },
    methods: {
        async addUser(data) {
            try {
                const passphrase = '123456'
                data.password = CryptoJS.AES.encrypt(data.password, passphrase).toString()
                await UserService.create(data);
                this.message = "User được thêm thành công.";
                this.$router.push({ name: "user" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>