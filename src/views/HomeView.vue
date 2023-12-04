<script setup lang="ts">
import { ref, computed } from 'vue'
import NavBar from '@/components/NavBar.vue';
import UserSetup from '@/components/UserSetup.vue';
import { useExerciseStore } from '../stores/ExerciseStore';
import { useSetupStore } from '@/stores/SetupStore';
import { useMainStore } from '@/stores/MainStore';

const exerciseStore = useExerciseStore()
const setupStore = useSetupStore();
const mainStore = useMainStore();

const computedMuscleGroups = ref(computed(() => {
  return exerciseStore.user.days.find(el => el.name === days[mainStore.dayIndex])?.muscleGroups.map(el => el.name)
}))

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

</script>

<template>
  <div class="absolute inset-0 w-screen h-screen bg-gray-100">
    <!-- Conditional rendering of user setup wizard -->
    <div v-if="mainStore.showIntro"
      class="w-11/12 md:w-3/5 flex flex-col mx-auto mt-4 p-4 bg-white rounded-lg shadow-xl">
      <div class="hero" v-if="setupStore.showHero">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Hello!</h1>
            <p class="py-6">Welcome to Gym Buddy, your personal app for tracking gym routines and progress! With Gym Buddy, you can customize your workout plan by assigning specific exercises to different days of the week. Ready to start your fitness journey? <br/><br/> Press ‘Get Started’ to set up your routine!</p>
            <button class="btn btn-primary shadow-lg" @click="setupStore.toggleHeroSection(); setupStore.toggleUserFinishedSetup();">Get Started</button>
          </div>
        </div>
      </div>
      <div v-if="!setupStore.userFinishedSetup">
        <h2> Welcome, <span class="font-semibold text-primary">{{ exerciseStore.user.userId }}</span>!</h2>
        <UserSetup />
      </div>
    </div>
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Your Gym Buddy App setup is completed!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
    <div v-if="mainStore.showHomeView" class="flex flex-col mt-4 pb-20 bg-gray-100 items-center justify-center">
      <div v-if="
        exerciseStore.user.days.some(el => el.name === days[mainStore.dayIndex]) && !mainStore.showFinishedExerciseView
        "
        class="bg-white p-6 rounded-lg shadow-md"
      >
        <p class="text-xl mb-4">
          Hello <span class="font-semibold text-primary" data-testid="username">{{ exerciseStore.user.userId }}</span>! <br/> Today is
          <span class="text-primary font-semibold">{{ days[mainStore.dayIndex] }}</span>
        </p>
        <p>Your gym schedule for today:</p>
        <!-- Here I iterate through muscle groups that were selected by the user -->
        <div class="mt-4"
          v-for="
          muscleGroup in exerciseStore.user.days.find(el => el.name === days[mainStore.dayIndex])?.muscleGroups"
          :key="muscleGroup.name
        ">
          <h2 class="text-lg font-semibold">{{ muscleGroup.name }}:</h2>
          <!-- We filter the defaultMuscleGroups array to find the relevant exercises (that were enabled/selected by the user) for particular muscle group -->
          <li class="flex items-center mt-2" v-for="exercise in exerciseStore.defaultMuscleGroups.filter(el => el.name === muscleGroup.name)[0].exercises.filter(exercise => exercise.enabled === true)" :key="exercise.name">
              <input type="checkbox" class="checkbox checkbox-primary h-5 w-5 mr-2" v-model="exercise.completedToday">
              <span :class="{ 'line-through': exercise.completedToday, selected: exercise.completedToday }">{{ exercise.name }}</span>
          </li>
        </div>
        <button
          @click="// @ts-ignore
          exerciseStore.updateUserExercises(computedMuscleGroups);
            mainStore.toggleShowFinishedExerciseView();
          "
          class="btn mt-4 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 shadow-sm"
        >
          Complete your workout
        </button>
      </div>
      <!-- After clicking the button above, this is showed to inform that the user completed their workout -->
      <div v-else-if="mainStore.showFinishedExerciseView" class="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 class="text-xl font-bold">
          Congratulations!
        </h1>
        <p class="mt-4">
          You have finished your workout for today!
        </p>
      </div>
      <div v-else class="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1>
          <span class="text-primary">{{ days[mainStore.dayIndex] }}</span> is your rest day!
        </h1>
      </div>
      <!-- This button scrolls through the days for this preview build and is used as a debugging tool-->
      <!-- We want to simulate how it would look like for the user that would use this app for the whole week -->
      <!-- Some days might be empty so we display that that particular day is their rest day -->
      <!-- In the public version of this app the button wouldn't exist -->
      <button
        class="btn mt-4 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4"
        @click="
          mainStore.nextDay();
          mainStore.showFinishedExerciseView = false;
        ">
        Next Day
      </button>
    </div>
    <NavBar />
  </div>
</template>

<style scoped></style>
