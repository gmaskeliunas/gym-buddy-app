<script setup lang='ts'>
import { useRouter } from 'vue-router'
import HomeIcon from './icons/IconHome.vue'
import EditIcon from './icons/IconEdit.vue'
import StatisticsIcon from './icons/IconStatistics.vue'
import SettingsIcon from './icons/IconSettings.vue'
import { useMainStore } from '../stores/MainStore';

const mainStore = useMainStore();

const router = useRouter()
const isActive = (route: string) => router.currentRoute.value.path === route
const navigate = (route: string) => router.push(route)
</script>

<template>
  <div class="btm-nav">
    <button data-testid="home" :class="{ active: isActive('/') }" @click="navigate('/')">
      <HomeIcon />
    </button>
    <button data-testid="edit" :class="{ active: isActive('/edit'), disabled: !mainStore.showHomeView  }" @click="navigate('/edit')">
      <EditIcon />
    </button>
    <button data-testid="statistics" :class="{ active: isActive('/statistics'), disabled: !mainStore.showHomeView  }" @click="navigate('/statistics')">
      <StatisticsIcon />
    </button>
    <button data-testid="settings" :class="{ active: isActive('/settings') }" @click="navigate('/settings')">
      <SettingsIcon />
    </button>
  </div>
</template>

<style scoped>

</style>