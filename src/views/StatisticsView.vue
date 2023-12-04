<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { useExerciseStore } from '../stores/ExerciseStore';
const exerciseStore = useExerciseStore();
const { defaultMuscleGroups } = exerciseStore

const calculatePercentage = (timesCompleted: number, timesShowed: number) => {
  const percentage = timesShowed ? Math.round(timesCompleted / timesShowed * 100) : 0;
  return percentage.toString();
};
</script>

<template>
  <div class="absolute w-screen bg-gray-100">
    <div class="w-11/12 md:w-3/5 mx-auto mt-4 flex flex-col p-4 mb-20 bg-white rounded-lg shadow-xl">
      <div class="m-4 self-center">
        <p>Here you can browse the success rate of your routine exercises!</p>
      </div>
      <div class="flex flex-col" v-for="muscleGroup in defaultMuscleGroups.map(el => el.name)" :key="muscleGroup">
        <p class="font-bold self-center">
          {{ muscleGroup }}
        </p>
        <li
          class="list-none flex ml-8 mb-1"
          v-for="exercise in defaultMuscleGroups.filter(el => el.name === muscleGroup)[0].exercises.filter(el => el.enabled === true)"
          :key="exercise.id"
        >
          <p class="mr-3">{{ exercise.name }}:</p>
          <div
            class="radial-progress text-xs"
            :style="{ '--size': '2rem' ,'--value': calculatePercentage(exercise.timesCompleted, exercise.timesShowed) }"
          >
            {{ calculatePercentage(exercise.timesCompleted, exercise.timesShowed) }}%
          </div>
        </li>
      </div>
    </div>
    <NavBar />
  </div>
</template>

<style scoped></style>
