import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// This storage is used more for the user routine setup section that is shown the first time the app is loaded.

export const useSetupStore = defineStore('setup', () => {
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

  const mG = [
    {
      muscles:'Back',
      selected: false
    },
    {
      muscles:'Arms',
      selected: false
    },
    {
      muscles:'Chest',
      selected: false
    },
    {
      muscles:'Legs',
      selected: false
    },
    {
      muscles:'Shoulders',
      selected: false
    }
  ];
  let id = 0

  // It so happens that I need to have a selection of muscle groups for each day in the days object.

  const days = ref<any[]>(loadState('days', [
    { id: id++, text: 'Monday', done: false, muscleGroups: JSON.parse(JSON.stringify(mG)) },
    { id: id++, text: 'Tuesday', done: false, muscleGroups: JSON.parse(JSON.stringify(mG)) },
    { id: id++, text: 'Wednesday', done: false, muscleGroups: JSON.parse(JSON.stringify(mG)) },
    { id: id++, text: 'Thursday', done: false, muscleGroups: JSON.parse(JSON.stringify(mG)) },
    { id: id++, text: 'Friday', done: false, muscleGroups: JSON.parse(JSON.stringify(mG)) },
    { id: id++, text: 'Saturday', done: false, muscleGroups: JSON.parse(JSON.stringify(mG)) },
    { id: id++, text: 'Sunday', done: false, muscleGroups: JSON.parse(JSON.stringify(mG)) }
  ]));
  watch(days, (newVal) => saveState('days', newVal));

  const showHero = ref<boolean>(loadState('showHero', true));
  watch(showHero, (newVal) => saveState('showHero', newVal));

  const userFinishedSetup = ref<boolean>(loadState('userFinishedSetup', true));
  watch(userFinishedSetup, (newVal) => saveState('userFinishedSetup', newVal));

  const firstStep = ref<boolean>(loadState('firstStep', true));
  watch(firstStep, (newVal) => saveState('firstStep', newVal));

  const secondStep = ref<boolean>(loadState('secondStep', false));
  watch(secondStep, (newVal) => saveState('secondStep', newVal));

  const thirdStep = ref<boolean>(loadState('thirdStep', false));
  watch(thirdStep, (newVal) => saveState('thirdStep', newVal));

  const currentDayIndex = ref<number>(loadState('currentDayIndex', 0));
  watch(currentDayIndex, (newVal) => saveState('currentDayIndex', newVal));

  const currentMuscleIndex = ref<number>(loadState('currentMuscleIndex', 0));
  watch(currentMuscleIndex, (newVal) => saveState('currentMuscleIndex', newVal));

  const selectedDays = ref(computed(() => days.value.filter(day => day.done)));

  const nextBtnDisabled = ref(computed(() => {
    if (selectedDays.value) {
      return !selectedDays.value[currentDayIndex.value]?.muscleGroups.some((element: any) => element.selected === true)
    }
    return true
  }))

  // Here I calculate the unique muscle groups, since in the user setup, the user is prompted to select exercises for each muscle group.
  // So to account for the fact that each day can have multiple muscle groups, I find all the unique muscle groups and cycle through them,
  // which would be a logical thing to do instead of cycling through all of the possible combinations

  const uniqueMuscleGroups = ref(computed(() => {
    const muscleArray: string[] = [];

    selectedDays.value.forEach(el => el.muscleGroups.forEach((muscleElement: any) => {
      if (muscleElement.selected === true) {
        muscleArray.push(muscleElement.muscles)
      }
    }))
    const uniqueMuscleArray: string[] = [...new Set(muscleArray)];
    return uniqueMuscleArray;
  }))


  const cleanSelectedDays = () => {
    days.value.forEach(element => {
      if (!element.done) {
        element.muscleGroups = structuredClone(mG);
      }
    });
  }

  const togglePages = () => {
    firstStep.value = !firstStep.value;
    secondStep.value = !secondStep.value;
  }

  const toggleThirdStep = () => {
    thirdStep.value = false;
  }

  const nextDay = () => {
    if (currentDayIndex.value < selectedDays.value.length - 1) {
      currentDayIndex.value++;
    }
  }

  const previousDay = () => {
    if (currentDayIndex.value > 0) {
      currentDayIndex.value--;
    }
  }

  const nextMuscle = () => {
    if (currentMuscleIndex.value < uniqueMuscleGroups.value.length - 1) {
      currentMuscleIndex.value++;
    }
  }

  const previousMuscle = () => {
    if (currentMuscleIndex.value > 0) {
      currentMuscleIndex.value--;
    }
  }

  const toggleUserFinishedSetup = () => {
    userFinishedSetup.value = !userFinishedSetup.value;
  }

  const toggleHeroSection = () => {
    showHero.value = !showHero.value;
  }

  return {
    days,
    showHero,
    userFinishedSetup,
    firstStep,
    secondStep,
    thirdStep,
    currentDayIndex,
    currentMuscleIndex,
    selectedDays,
    nextBtnDisabled,
    uniqueMuscleGroups,
    cleanSelectedDays,
    togglePages,
    toggleThirdStep,
    nextDay,
    previousDay,
    nextMuscle,
    previousMuscle,
    toggleUserFinishedSetup,
    toggleHeroSection
  };
})