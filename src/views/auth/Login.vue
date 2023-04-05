<template>
    <div v-if="user" class="page">
        <h4>Đăng nhập</h4>
        <UserForm :user="user" @submit:user="checkUser" />
        <br>
        <router-link :to="{ name: 'user.add' }" class="nav-link">
            Đăng ký
        </router-link>
        <br>
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
            users: {
                name: null,
                email: null,
                password: null,
            },
            user: {
                name: null,
                email: null,
                password: null,
            },
            message: "",
        };
    },
    methods: {
        async checkUser(data) {
            try {
                const passphrase = '123456'

                this.users = await UserService.getAll();

                for (var i = 0; i < this.users.length; i++) {
                    if (this.users[i].name != data.name) {
                        this.message = "Username không tồn tại .";
                    }
                    else {
                        if (this.users[i].email != data.email) {
                            this.message = "Email không tồn tại .";
                        }
                        else {
                            const bytes = CryptoJS.AES.decrypt(this.users[i].password, passphrase)
                            this.users[i].password = bytes.toString(CryptoJS.enc.Utf8)
                            if (this.users[i].password != data.password) {
                                this.message = "Mật khẩu sai .";
                            }
                            else {
                                this.message = "Đăng nhập thành công .";
                                localStorage.setItem('username', this.users[i].name);
                                localStorage.setItem('userid', this.users[i]._id);
                                localStorage.setItem('isLogin', true);
                                
                                this.$router.push({ name: "category" });
                                break;
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>