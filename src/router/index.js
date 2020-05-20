import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    redirect: "/"
  },
  {
    path: '/',
    name: "rooms",
    component: () => import("../views/Rooms.vue")
  },
  {
    name: "roominfo",
    path: "/roominfo/:id",
    component: () => import("../views/RoomInfo.vue")
  }
];

const scrollBehavior = () => {
  return {
    x: 0,
    y: 0
  }
}

const router = new VueRouter({
  routes,
  scrollBehavior,
})

export default router