<template>
    <div v-if="user" class="page">
        <h4>Thêm User</h4>
        <UserForm :user="user" @submit:user="addUser" />
        <p>{{ message }}</p>
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