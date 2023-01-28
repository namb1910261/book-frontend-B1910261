import { createWebHistory, createRouter } from "vue-router";
import Category from "@/views/category/Category.vue";
import Book from "@/views/book/Book.vue";
import User from "@/views/user/User.vue";
import Review from "@/views/review/Review.vue";
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
    // user
    {
        path: "/user",
        name: "user",
        component: User,
    },
    {
        path: "/users/:id",
        name: "user.edit",
        component: () => import("@/views/user/UserEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/user/add",
        name: "user.add",
        component: () => import("@/views/user/UserAdd.vue"),
    },
    // review
    {
        path: "/review",
        name: "review",
        component: Review,
    },
    {
        path: "/reviews/:id",
        name: "review.edit",
        component: () => import("@/views/review/ReviewEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/review/add/:id",
        name: "review.add",
        component: () => import("@/views/review/ReviewAdd.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    // login
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/auth/Login.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/user/add'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('username');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });
export default router;