<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng Quản lý sách</a>
        <div class="navbar-nav mr-auto">
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
        </div>
    </nav>
</template>