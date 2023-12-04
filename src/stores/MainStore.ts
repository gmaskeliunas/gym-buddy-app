import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// Main Store uses pinia state management to store the general states
// of variables that are related to general functionality of the program, like showing specific sections of the program.

export const useMainStore = defineStore('mainStore', () => {
  const loadState = (key: string, defaultValue: any) => {
    try {
      const savedValue = localStorage.getItem(key);
      return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
    } catch (e) {
      console.error(`Error loading item ${key} from localStorage`, e);
      return defaultValue;
    }
  }

  const saveState = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving item ${key} to localStorage`, e);
    }
  }

  // Here some variables related to general functionality of the app. They are loaded and saved from and to the Local Storage.

  const showHomeView = ref<boolean>(loadState('showHomeView', false));
  const showFinishedExerciseView = ref<boolean>(loadState('showFinishedExerciseView', false));
  const showIntro = ref<boolean>(loadState('showIntro', true));
  // const date = ref(new Date());
  const dayIndex = ref<number>(loadState('dayIndex', 0));
  const days = ref<string[]>(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
  // const dayName = ref(days[date.value.getDay()]);
  const dayName = computed<string>(() => days.value[dayIndex.value]);

  watch(showHomeView, (newVal: boolean) => saveState('showHomeView', newVal));
  watch(showFinishedExerciseView, (newVal: boolean) => saveState('showFinishedExerciseView', newVal));
  watch(showIntro, (newVal: boolean) => saveState('showIntro', newVal));
  watch(dayIndex, (newVal: number) => saveState('dayIndex', newVal));

  const nextDay = () => {
    if (dayIndex.value < 6) {
      dayIndex.value = dayIndex.value+1;
    } else {
      dayIndex.value = 0;
    }
  }

  const toggleShowHomeView = () => {
    showHomeView.value = !showHomeView.value
  }
  const toggleShowFinishedExerciseView = () => {
    showFinishedExerciseView.value = !showFinishedExerciseView.value
  }

  const toggleShowIntro = () => {
    showIntro.value = !showIntro.value
  }

  return {
    showHomeView,
    showFinishedExerciseView,
    showIntro,
    dayIndex,
    days,
    dayName,
    nextDay,
    toggleShowHomeView,
    toggleShowFinishedExerciseView,
    toggleShowIntro
  }
})