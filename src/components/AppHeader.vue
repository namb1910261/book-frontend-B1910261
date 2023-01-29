<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-4" v-if="isLogin != 'true'">
        <div class="container-fluid">
            <!-- <a class="navbar-brand" href="#"><b>Ứng dụng Review sách</b></a> -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <div class="d-flex" v-if="isLogin != 'true'">
                        <router-link :to="{ name: 'login' }" class="nav-link">
                            <li class="nav-item">
                                Đăng nhập
                            </li>
                        </router-link>
                        <a class="nav-link">
                            <li class="nav-item">
                                |
                            </li>
                        </a>
                        <li class="nav-item">
                            <router-link :to="{ name: 'user.add' }" class="nav-link">
                                Đăng ký
                            </router-link>
                        </li>
                    </div>
                </ul>
                <!-- <div class="d-flex" v-if="isLogin == 'true'">
                    <router-link :to="{ name: 'user' }" class="nav-link">
                        <b>{{ username }}</b>
                        <i class="fas fa-user"></i>
                    </router-link>
                    <br>
                    <a class="nav-link mx-3" @click="logOut">
                        Đăng xuất
                        <i class="fas fa-sign-out"></i>
                    </a>
                </div> -->
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    data() {
        return {
            isLogin: localStorage.getItem('isLogin'),
            username: localStorage.getItem('username')
        }
    },
    methods: {
        logOut() {
            localStorage.removeItem('username');
            localStorage.removeItem('userid');
            localStorage.setItem('isLogin', false);
            this.$router.push({ name: "login" });
            this.$router.go()
            this.$forceUpdate();
        },
    }
}
</script>