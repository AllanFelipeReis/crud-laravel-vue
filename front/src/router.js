import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/people",
    name: "list-person",
    component: () => import("./components/Person/ListPerson")
  },
  {
    path: "/person/:id",
    name: "update-person",
    component: () => import("./components/Person/UpdatePerson")
  },
  {
    path: "/add",
    name: "add-person",
    component: () => import("./components/Person/AddPerson")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
