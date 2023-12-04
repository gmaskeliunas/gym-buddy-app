import { defineStore } from 'pinia'
import { ref, toRaw, watch } from 'vue';

interface Exercise {
  id: string;
  personalRecord: number;
  successRatio: number;
}

interface MuscleGroup {
  name: string;
  exercises: Exercise[];
}

interface Day {
  name: string;
  muscleGroups: MuscleGroup[];
}

interface UserActivity {
  userId: string;
  days: Day[];
}

interface Exercises {
  id: number;
  name: string;
  timesShowed: number;
  timesCompleted: number;
  personalBest: number;
  reps: number;
  completedToday: boolean;
  enabled: boolean;
}

interface MuscleGroups {
  name: string;
  selected: boolean;
  exercises: Exercises[];
}


export const useExerciseStore = defineStore('exercise', () => {

  // Define loading and saving functions for saving and loading to and from the Local Storage.
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

  // Define the user ref object and watch any changes that occur to that object, then save changes to the Local Storage.

  const user = ref<UserActivity>(loadState('user', {
    userId: 'user',
    days: []
  }));

  watch(user, (newVal) => saveState('user', toRaw(newVal)), { deep: true });

  const resetSelected = () => {
    defaultMuscleGroups.value.forEach(el => el.selected = false);
  }

  // This function adds days that were selected by the user to the user object.

  const updateUserDays = (selectedDays: object[]) => {
    user.value.days = [];
    const target_copy = toRaw(selectedDays);
    target_copy.forEach(el => user.value.days.push({
      // @ts-ignore
      name: el.text,
      muscleGroups: []
    }))
  }

  // Function below adds muscle groups for training routine for the specified day.

  const assignMuscleGroupsToDay = (muscleGroups: object[], index: number) => {
    user.value.days[index].muscleGroups = []
    muscleGroups.forEach(el => {
      // @ts-ignore
      user.value.days[index].muscleGroups.push({name: el.muscles, exercises: []})
    })
    console.log(user.value.days);
  }

  const finalizeUserSetup = () => {
    console.log(user.value);
    console.log(defaultMuscleGroups.value);
  }


  let id = 0;

  // Here muscle groups and exercises are defined. Each exercise also has properties, which are important for tracking the specific ones and allowing to display some statistics.
  // App also watches any changes made to this object, since it is important to keep the state of the objects in the Local Storage if the refresh of the page occurs.

  const defaultMuscleGroups = ref<MuscleGroups[]>(loadState('defaultMuscleGroups', [
    {
      name: 'Back',
      selected: false,
      exercises: [
        {
          id: id++,
          name: 'Shrugs',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Lat pulldowns',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Straight arm lat pulldowns',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Deadlift',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Seated chest supported row',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        }
      ]
    },
    {
      name: 'Arms',
      selected: false,
      exercises: [
        {
          id: id++,
          name: 'Bicep curls',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Pronated curls',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Preacher curls',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Seated dips',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Tricep Pressdowns',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Skull crushers',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        }
      ]
    },
    {
      name: 'Chest',
      selected: false,
      exercises: [
        {
          id: id++,
          name: 'Flat Bench press',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Inclined dumbell press',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Declined dumbell press',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Machine press',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Dips',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        }
      ]
    },
    {
      name: 'Legs',
      selected: false,
      exercises: [
        {
          id: id++,
          name: 'Squats',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Leg press',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Leg extensions',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Hamstring curls',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Bulgarian split squat',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        }
      ]
    },
    {
      name: 'Shoulders',
      selected: false,
      exercises: [
        {
          id: id++,
          name: 'Reverse peck deck',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Side lateral raises',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Seated overhead press',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Standing upright rows',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        },
        {
          id: id++,
          name: 'Face pulls',
          timesShowed: 0,
          timesCompleted: 0,
          personalBest: 0,
          reps: 0,
          completedToday: false,
          enabled: false
        }
      ]
    }
  ]));

  watch(defaultMuscleGroups, (newVal: MuscleGroups[]) => saveState('defaultMuscleGroups', toRaw(newVal)), { deep: true });

  // Here this function updates the user selected exercises in the defaultMuscleGroups object during the initial setup.

  const updateUserExercises = (computedMuscleGroups: string[]) => {
    computedMuscleGroups.forEach((muscleGroup: string) => {
      defaultMuscleGroups.value
      .filter(el => el.name === muscleGroup)[0].exercises.forEach(exercise => {
        if (exercise.enabled) {
          exercise.timesShowed++;
          if (exercise.completedToday) {
            exercise.timesCompleted++;
            exercise.completedToday = false;
          }
        }
      })
    })
    console.log(defaultMuscleGroups.value)
  }


  return {
    user,
    resetSelected,
    updateUserDays,
    assignMuscleGroupsToDay,
    finalizeUserSetup,
    updateUserExercises,
    defaultMuscleGroups
  }
})