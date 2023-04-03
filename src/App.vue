<script>
import Sidebar from "@/components/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
};
</script>

<template>
  <div id="app">
    <div class="row">
      <div class="col-auto">
        <Sidebar />
      </div>
      <div class="col-9 my-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>