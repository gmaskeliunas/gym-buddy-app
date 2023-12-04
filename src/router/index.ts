import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/edit',
      name: 'Edit',
      component: () => import('@/views/EditView.vue'),
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: () => import('@/views/StatisticsView.vue'),
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/views/SettingsView.vue'),
    }
  ]
})

export default router
