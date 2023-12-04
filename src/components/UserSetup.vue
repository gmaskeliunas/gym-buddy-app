<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useExerciseStore } from '../stores/ExerciseStore';
import { useSetupStore } from '../stores/SetupStore';
import { useMainStore } from '@/stores/MainStore';

// Add pinia storages

const exerciseStore = useExerciseStore();
const setupStore = useSetupStore();
const mainStore = useMainStore();

// Compute the the exercises that belong to the muscle groups that were selected by the user.

const matchingExercises = ref(computed(()=> {
  return exerciseStore.defaultMuscleGroups
  .find(neededGroup => neededGroup.name === setupStore.uniqueMuscleGroups[setupStore.currentMuscleIndex])
  ?.exercises
}))

// Used by the buttons. Checks if at least one option in setup is selected.

const isAnyExerciseSelected = ref(computed(() => {
  return matchingExercises.value?.some(exercise => exercise.enabled);
}))
</script>

<template>
  <div v-if="setupStore.firstStep" class="flex flex-col justify-between mt-4">
    <p class="text-xl font-bold mb-4">
      Please select the days you are going to the gym and click next:
    </p>

    <!-- Show all the days in the week and allow selecting wanted -->
    <li class="list-none flex justify-start mt-1" v-for="day in setupStore.days" :key="day.id">
      <input type="checkbox" class="checkbox checkbox-primary" v-model="day.done">
      <span class="m-1" :class="{ done: day.done }">{{ day.text }}</span>
    </li>

    <!-- Update the users selected days -->
    <button
      class="btn w-min self-end shadow-md mt-4"
      :disabled="setupStore.selectedDays.length === 0"
      @click="
        setupStore.firstStep = !setupStore.firstStep;
        setupStore.secondStep = !setupStore.secondStep;
        setupStore.cleanSelectedDays();
        exerciseStore.updateUserDays(setupStore.selectedDays);
        "
      >
        Next
      </button>
  </div>
  <div
    class="flex flex-col justify-between mt-4"
    v-if="setupStore.secondStep"
  >
    <p class="text-xl mb-4">
      Please select which muscle group(s) you would like to train on <span class="font-bold">{{ setupStore.selectedDays[setupStore.currentDayIndex]?.text }}</span>:
    </p>
    <ul>
      <!-- Iterating through all available muscle groups, allowing selection -->
      <li class="flex justify-start mt-1" v-for="muscleGroup in setupStore.selectedDays[setupStore.currentDayIndex]?.muscleGroups" :key="muscleGroup.muscles">
        <input type="checkbox" class="checkbox checkbox-primary" v-model="muscleGroup.selected">
        <span class="m-1" :class="{ selected: muscleGroup.selected }">{{ muscleGroup.muscles }}</span>
      </li>
    </ul>
    <div class="flex justify-between mt-4">
      <button class="btn shadow-md" v-if="setupStore.currentDayIndex !== 0" @click="setupStore.previousDay">Previous day</button>
      <button class="btn w-min shadow-md" v-if="setupStore.currentDayIndex === 0" @click="setupStore.togglePages">Back</button>
      <!-- This button below adds selected muscle groups to the corresponding day and proceeds the setup to the next day -->
      <button
        class="btn self-end shadow-md"
        :disabled="setupStore.nextBtnDisabled"
        v-if="setupStore.currentDayIndex !== setupStore.selectedDays.length - 1"
        @click="
          setupStore.nextDay();
          exerciseStore.assignMuscleGroupsToDay(
            // @ts-ignore
            setupStore.selectedDays[setupStore.currentDayIndex-1].muscleGroups.filter(el => el.selected === true),
            setupStore.currentDayIndex-1
          );
        "
      >
        Next day
      </button>
      <!-- This button finalizes the second step and proceeds to the exercise selection -->
      <button
        class="btn self-end shadow-md"
        :disabled="setupStore.nextBtnDisabled"
        v-if="setupStore.currentDayIndex === setupStore.selectedDays.length - 1"
        @click="
          exerciseStore.assignMuscleGroupsToDay(
            // @ts-ignore
            setupStore.selectedDays[setupStore.currentDayIndex].muscleGroups.filter((el: object) => el.selected === true),
            setupStore.currentDayIndex
          );
          // Disables the view of second step of user setup and proceeds to the third and final
          setupStore.secondStep = !setupStore.secondStep;
          setupStore.thirdStep = !setupStore.thirdStep;
        "
      >
        Choose exercises
      </button>
    </div>
  </div>
  <div
    class="flex flex-col justify-between mt-4"
    v-if="setupStore.thirdStep"
  >
    <div>
      <p>
        Please select exercise(s) for your <span class="font-semibold">{{ setupStore.uniqueMuscleGroups[setupStore.currentMuscleIndex] }}</span>:
      </p>
      <ul>
        <!-- Last step is to iterate throug all the user selected exercises and allow the user to select which ones fit them -->
        <li class="list-none flex justify-start mt-1" v-for="exercise in matchingExercises" :key="exercise.name">
          <input type="checkbox" class="checkbox checkbox-primary" v-model="exercise.enabled">
          <span class="m-1" :class="{ selected: exercise.enabled }">{{ exercise.name }}</span>
        </li>
      </ul>
    </div>
    <div class="flex justify-between mt-4">
      <button
        class="btn shadow-md"
        v-if="setupStore.currentMuscleIndex === 0"
        @click="
          setupStore.secondStep = !setupStore.secondStep;
          setupStore.thirdStep = !setupStore.thirdStep;
        "
      >
        Back
      </button>

      <button
        class="btn shadow-md"
        v-if="setupStore.currentMuscleIndex !== 0"
        @click="setupStore.previousMuscle"
      >
        Back
      </button>

      <button
        class="btn shadow-md"
        :disabled="!isAnyExerciseSelected"
        v-if="setupStore.currentMuscleIndex !== setupStore.uniqueMuscleGroups.length-1"
        @click="setupStore.nextMuscle"
      >
        Next
      </button>

      <button
        class="btn shadow-md"
        :disabled="!isAnyExerciseSelected"
        v-if="setupStore.currentMuscleIndex === setupStore.uniqueMuscleGroups.length-1"
        onclick="my_modal_1.showModal()"
        @click="
          // Disables the user setup view and enables the main home view
          mainStore.toggleShowIntro();
          mainStore.toggleShowHomeView();
          setupStore.toggleUserFinishedSetup();
          setupStore.toggleThirdStep();
        "
      >
        Finish setup
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>