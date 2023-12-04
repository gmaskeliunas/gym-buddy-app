# Gym Buddy App

This is the source code for my Gym Buddy App!

Gym Buddy is designed for individuals who are either already attending the gym or planning to incorporate gym workouts into their routine. The app allows users to track exercises tailored to specific muscle groups included in their workout routine.

After launching the app, users are greeted with a user-friendly interface. They can easily navigate through the main home screen, edit screen, statistics screen, and settings screen.

The Home screen initially presents a user setup wizard, guiding users through the process of establishing their gym routine. Users first select their preferred gym days, then choose the muscle groups they wish to target on each day. The final step involves selecting specific exercises for each muscle group. Once setup is complete, users are ready to make the most of Gym Buddy!

In future updates, users will have the ability to edit their routine choices.

Gym Buddy also provides a feature to view workout success ratios. These statistics represent the percentage of times a user successfully completes an exercise presented during their workout.

In the settings menu the user is able to change their username as well as reset the app.

Please note that this is a developer preview version of the app. If any rendering bugs occur, I recommend resetting the app and trying again.

## Known Bugs

Rendering of a very large list of empty elements instead of days of the week, just after pressing 'Get Started' button in the home view.

Solution: Go to settings and press reset the app button. After that it should render days normally in the routine setup wizard.


Horizontal slider becomes visible after setting up the routine.

Need some more time with tailwind CSS, since its my first time using it. 

## Notes

For state management I figured I should use Pinia, since its relatively straight forward and easy to implement. 

For styling I used tailwind CSS and DaisyUI.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
