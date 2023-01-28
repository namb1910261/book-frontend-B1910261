<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng Quản lý sách</a>
        <div class="navbar-nav mr-auto">
            <div class="d-flex" v-if="isLogin == 'true'">
                <li class="nav-item">
                    <router-link :to="{ name: 'category' }" class="nav-link">
                        Thể loại
                        <i class="fas fa-list-alt"></i>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'book' }" class="nav-link">
                        Sách
                        <i class="fas fa-book"></i>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'review' }" class="nav-link">
                        Review
                        <i class="fas fa-comments"></i>
                    </router-link>
                </li>
                <li class="nav-item">
                </li>
            </div>
            <div class="d-flex my-2 my-lg-0" v-if="isLogin == 'true'">
                <router-link :to="{ name: 'user' }" class="nav-link">
                    {{ username }}
                    <i class="fas fa-user"></i>
                </router-link>
                <li class="nav-item ">
                    <a class="nav-link" @click="logOut">
                        Đăng xuất
                        <i class="fas fa-sign-out"></i>
                    </a>
                </li>
            </div>
            <div class="d-flex" v-else>
                <router-link :to="{ name: 'login' }" class="nav-link">
                    <li class="nav-item">
                        Đăng nhập
                        <i class="fas fa-sign-in"></i>
                    </li>
                </router-link>
                <li class="nav-item">
                    <router-link :to="{ name: 'user.add' }" class="nav-link">
                        Đăng ký
                        <i class="fas fa-sign-in"></i>
                    </router-link>
                </li>
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
            localStorage.setItem('isLogin', false);
            this.$router.push({ name: "login" });
            this.$router.go()
            this.$forceUpdate();
        },
    }
}
</script>