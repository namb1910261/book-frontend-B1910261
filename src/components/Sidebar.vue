<template>
    <!-- <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 38vh; height: 97vh;">
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
    </div> -->

    <!-- <div class="min-height-300 bg-primary position-absolute w-100">
    </div> -->
    <img src="/book_image/bg-02.jpg" class="card rounded-0 min-height-300 bg-primary position-absolute w-100">

    <aside class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4"
        id="sidenav-main">
        <div class="sidenav-header">
            <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                aria-hidden="true" id="iconSidenav"></i>
            <a class="navbar-brand m-0" href=" https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html "
                target="_blank">
                <img src="/assets/img/logo-ct-dark.png" class="navbar-brand-img h-100" alt="main_logo">
                <span class="ms-1 font-weight-bold">Book review</span>
            </a>
        </div>
        <hr class="horizontal dark mt-0">
        <div class=" w-auto " id="sidenav-collapse-main">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'category' }"
                        :class="{ active: this.$route.name == 'category', 'active': this.$route.name == 'category' }">
                        <div class="me-3">
                            <svg class="bi me-0" width="16" height="16">
                                <use xlink:href="#home" />
                            </svg>
                            <i class="fas fa-list text-info"></i>
                        </div>
                        <span class="nav-link-text ms-1">Thể loại</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'book' }"
                        :class="{ active: this.$route.name == 'book', 'active': this.$route.name == 'book' }">
                        <div class="me-3">
                            <svg class="bi me-0" width="16" height="16">
                                <use xlink:href="#home" />
                            </svg>
                            <i class="fas fa-book text-warning"></i>
                        </div>
                        <span class="nav-link-text ms-1">Sách</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'review' }"
                        :class="{ active: this.$route.name == 'review', 'active': this.$route.name == 'review' }">
                        <div class="me-3">
                            <svg class="bi me-0" width="16" height="16">
                                <use xlink:href="#home" />
                            </svg>
                            <i class="fas fa-comments text-primary"></i>
                        </div>
                        <span class="nav-link-text ms-1">Review</span>
                    </router-link>
                </li>
                <span v-if="isLogin == 'true'">
                    <li class="nav-item mt-3">
                        <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Tài khoản</h6>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link " :to="{ name: 'user' }"
                            :class="{ active: this.$route.name == 'user', 'active': this.$route.name == 'user' }">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
                            </div>
                            <span class="nav-link-text ms-1">{{ username }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-link mx-3 logout btn" @click="logOut">
                            Đăng xuất
                            <i class="fas fa-sign-out"></i>
                        </button>
                    </li>
                </span>
            </ul>
        </div>
    </aside>
    <div v-if="isLogin != 'true' && this.$route.name == 'login'" class="row">
        <div v-if="user" class="page col-5 mt-3 " id="loginpage2">
            <div class="card mt-3 col rounded-0 bg-transparent shadow-none">
                <img class="col" src="book_image/bg-01.jpg" width="450">
            </div>
        </div>
        <div v-if="user" class="page col-5" id="loginpage">
            <div class="card rounded-0 mt-3">
                <div class="card-header">
                    <h4>Đăng nhập</h4>
                </div>
                <div class="card-body">
                    <UserForm :user="user" @submit:user="checkUser" />
                    <br>
                    <router-link :to="{ name: 'user.add' }" class="nav-link">
                        Đăng ký
                    </router-link>
                    <br>
                    <p>{{ message }}</p>
                </div>
            </div>
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
            username: localStorage.getItem('username'),
            userid: localStorage.getItem('userid'),
            role: localStorage.getItem('role')
        }
    },
    methods: {
        logOut() {
            localStorage.removeItem('username');
            localStorage.removeItem('userid');
            localStorage.removeItem('role');
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
                                localStorage.setItem('role', this.users[i].role);
                                localStorage.setItem('isLogin', true);

                                this.isLogin = 'true'
                                this.username = localStorage.getItem('username')
                                this.userid = localStorage.getItem('userid')
                                this.role = localStorage.getItem('role')

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

#loginpage {
    position: absolute;
    left: 425px;
    bottom: 84px;
    width: 500px;
}

#loginpage2 {
    position: absolute;
    left: 900px;
    bottom: 85px;
    width: 500px;
}
</style>