<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" v-if="isLogin == 'true'"
        style="width: 38vh; height: 97vh;">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none mx-4">
            <span class="fs-4"><i class="fas fa-book-open"></i> Review sách</span>
        </a>
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
            <a class="nav-link mx-3 logout" @click="logOut" >
                Đăng xuất
                <i class="fas fa-sign-out"></i>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
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
            this.$router.push({ name: "login" });
            this.$router.go()
            this.$forceUpdate();
        },
    }
}
</script>
<style>
    .logout{
        cursor: pointer;
    }
</style>