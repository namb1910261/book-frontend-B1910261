import { createWebHistory, createRouter } from "vue-router";
import CategoryBook from "@/views/category/CategoryBook.vue";
const routes = [
    // category
    {
        path: "/category",
        name: "category",
        component: CategoryBook,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/categorys/:id",
        name: "category.edit",
        component: () => import("@/views/category/CategoryEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/category/add",
        name: "category.add",
        component: () => import("@/views/category/CategoryAdd.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;