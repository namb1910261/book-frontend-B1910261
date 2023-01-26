import { createWebHistory, createRouter } from "vue-router";
import Category from "@/views/category/Category.vue";
import Book from "@/views/book/Book.vue";
const routes = [
    // Not found 
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/",
        name: "home",
        component: Category,
    },
    // category
    {
        path: "/category",
        name: "category",
        component: Category,
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
    // book
    {
        path: "/book",
        name: "book",
        component: Book,
    },
    {
        path: "/books/:id",
        name: "book.edit",
        component: () => import("@/views/book/BookEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/book/add",
        name: "book.add",
        component: () => import("@/views/book/BookAdd.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;