<script>
import Sidebar from "@/components/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
};
</script>

<template>
  <link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png">
  <link rel="icon" type="image/png" href="assets/img/favicon.png">
  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
  <!-- Nucleo Icons -->
  <link href="assets/css/nucleo-icons.css" rel="stylesheet" />
  <link href="assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- Font Awesome Icons -->
  <link href="assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- CSS Files -->
  <link id="pagestyle" href="assets/css/argon-dashboard.css?v=2.0.4" rel="stylesheet" />
  
  <div id="app">
    <Sidebar />
    <main class="main-content position-relative border-radius-lg ">
      <div class="container-fluid py-1 px-3">
        <router-view v-slot="{ Component }">
          <transition 
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutLeft"
            >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style>
body {
  background-image: url("/book_image/bg-03.jpg");
  background-repeat: repeat;
}
.page {
  max-width: 1500px;
  width: 1200px;
  margin: auto;
  position: absolute;
  top:0px
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>