<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { useExerciseStore } from '../stores/ExerciseStore';

const exerciseStore = useExerciseStore();
const clearLocalStorage = () => {
  localStorage.clear();
  location.reload();
  alert('Local storage has been cleared!');
};

</script>

<template>
  <div class="absolute inset-0 w-screen bg-gray-100">
    <div class="w-11/12 md:w-3/5 flex flex-col mx-auto mt-4 p-4 bg-white rounded-lg shadow-xl">
      <form class="flex flex-col">
        <label for="username" class="block text-gray-700 font-bold mb-2">Username:</label>
        <input type="text" id="username" v-model="exerciseStore.user.userId" class="shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" maxlength="25" required>
        <button
          type="button"
          class="btn w-min self-center bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 whitespace-normal mt-4"
          onclick="usernameChangedModal.showModal()"
        >
          Change username
        </button>
      </form>
      <dialog id="usernameChangedModal" class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Your username was changed successfully!</h3>
          <p>Your current username is: <span class="font-semibold text-primary">{{ exerciseStore.user.userId }}.</span></p>
          <p class="py-4">Press ESC key or click the button below to close</p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <!-- This allows to reset the local storage thus reseting the user setup wizard and defaulting other values as well -->
      <button class="btn bg-primary self-center text-white mt-4" @click="clearLocalStorage">Clear Local Storage (reset the app)</button>
    </div>
    <NavBar />
  </div>
</template>

<style scoped></style>
