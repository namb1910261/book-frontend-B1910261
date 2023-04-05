<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 38vh; height: 97vh;">
        <router-link :to="{ name: 'home' }" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none mx-4">
            <span class="fs-4"><i class="fas fa-book-open"></i> Review sách</span>
        </router-link>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <router-link :to="{ name: 'category' }" class="nav-link text-black"
                    :class="{ active: this.$route.name == 'category', 'text-white': this.$route.name == 'category' }">
                    <svg class="bi me-2" width="16" height="16">
                        <use xlink:href="#home" />
                    </svg>
                    <i class="fas fa-list"></i>
                    Thể loại
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'book' }" class="nav-link text-black"
                    :class="{ active: this.$route.name == 'book', 'text-white': this.$route.name == 'book' }">
                    <svg class="bi me-2" width="16" height="16">
                        <use xlink:href="#speedometer2" />
                    </svg>
                    <i class="fas fa-book"></i>
                    Sách
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'review' }" class="nav-link text-black"
                    :class="{ active: this.$route.name == 'review', 'text-white': this.$route.name == 'review' }">
                    <svg class="bi me-2" width="16" height="16">
                        <use xlink:href="#table" />
                    </svg>
                    <i class="fas fa-comments"></i>
                    Review
                </router-link>
            </li>
        </ul>
        <hr>
        <div class="d-flex" v-if="isLogin == 'true'">
            <router-link :to="{ name: 'user' }" class="nav-link">
                <b>{{ username }}</b>
                <i class="fas fa-user"></i>
            </router-link>
            <br>
            <button class="nav-link mx-3 logout btn" @click="logOut">
                Đăng xuất
                <i class="fas fa-sign-out"></i>
            </button>
        </div>
    </div>
    <div v-if="isLogin != 'true' && this.$route.name == 'login'">
        <div v-if="user" class="page" id="loginpage">
            <h4>Đăng nhập</h4>
            <UserForm :user="user" @submit:user="checkUser" />
            <br>
            <router-link :to="{ name: 'user.add' }" class="nav-link"
            @click="setFalseLoginPage" @clicked="setloginpage">
                Đăng ký
            </router-link>
            <br>
            <p>{{ message }}</p>
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
            routename: this.$route.name,
            isLogin: localStorage.getItem('isLogin'),
            username: localStorage.getItem('username')
        }
    },
    methods: {
        logOut() {
            localStorage.removeItem('username');
            localStorage.removeItem('userid');
            localStorage.setItem('isLogin', false);
            
            this.isLogin = 'false'
            this.username = localStorage.getItem('username')

            this.$router.push({ name: "login" });
            
            this.$forceUpdate();
        },
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
                                localStorage.setItem('username', this.users[i].name);
                                localStorage.setItem('userid', this.users[i]._id);
                                localStorage.setItem('isLogin', true);

                                this.isLogin = 'true'
                                this.username = localStorage.getItem('username')

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
    }
}
</script>
<style>
.logout {
    cursor: pointer;
}
#loginpage{
    position: absolute;
    left: 594px;
    bottom: 208px;
}
</style>