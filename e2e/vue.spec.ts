import { test, expect } from '@playwright/test';

test('Check routing', async ({ page }) => {
  // Go to your Vue.js application
  await page.goto('http://localhost:5173');

  // Define the buttons and their expected routes
  const buttons = [
    { selector: 'home', route: '/' },
    { selector: 'edit', route: '/edit' },
    { selector: 'statistics', route: '/statistics' },
    { selector: 'settings', route: '/settings' },
  ];

  // Go to hosting url
  await page.goto('http://localhost:5173');
  // Enter the user setup wizard for the app
  await page.getByRole('button', { name: 'Get Started' }).click();
  // Select Sunday for the day of exercising
  await page.locator('li').filter({ hasText: 'Sunday' }).getByRole('checkbox').click();
  // Proceed with the setup
  await page.getByRole('button', { name: 'Next' }).click();
  // Select two exercises for shoulders muscle group
  await page.locator('li').filter({ hasText: 'Shoulders' }).getByRole('checkbox').click();

  await page.getByRole('button', { name: 'Choose exercises' }).click();

  await page.locator('li').filter({ hasText: 'Standing upright rows' }).getByRole('checkbox').click();

  await page.locator('li').filter({ hasText: 'Face pulls' }).getByRole('checkbox').click();
  // End setup
  await page.getByRole('button', { name: 'Finish setup' }).click();
  // Click away from the modal element
  await page.getByRole('button', { name: 'Close' }).click();

  for (const button of buttons) {
    // Click the button
    await page.getByTestId(button.selector).click();

    // Check that the URL is correct
    await expect(page).toHaveURL(`http://localhost:5173${button.route}`);

    // Check that the button has the 'active' class
    const locator = page.getByTestId(button.selector)
    await expect(locator).toHaveClass('active');
    // const isActive = await page.$eval(button.selector, (el) => el.classList.contains('active'));
    // expect(isActive).toBe(true);
  }
});

test('Test user setup', async ({ page }) => {
  // Go to hosting url
  await page.goto('http://localhost:5173');
  // Enter the user setup wizard for the app
  await page.getByRole('button', { name: 'Get Started' }).click();
  // Select Sunday for the day of exercising
  await page.locator('li').filter({ hasText: 'Sunday' }).getByRole('checkbox').click();
  // Proceed with the setup
  await page.getByRole('button', { name: 'Next' }).click();
  // Select two exercises for shoulders muscle group
  await page.locator('li').filter({ hasText: 'Shoulders' }).getByRole('checkbox').click();

  await page.getByRole('button', { name: 'Choose exercises' }).click();

  await page.locator('li').filter({ hasText: 'Standing upright rows' }).getByRole('checkbox').click();

  await page.locator('li').filter({ hasText: 'Face pulls' }).getByRole('checkbox').click();
  // End setup
  await page.getByRole('button', { name: 'Finish setup' }).click();
  // Click away from the modal element
  await page.getByRole('button', { name: 'Close' }).click();
  // Check if the pages has the elements of selected exercises
  await expect(page.getByText('Standing upright rows')).toHaveText('Standing upright rows');

  await expect(page.getByText('Face pulls')).toHaveText('Face pulls');
})


test('Test exercise completion', async ({ page }) => {
  // Go to hosting url
  await page.goto('http://localhost:5173');
  // Enter the user setup wizard for the app
  await page.getByRole('button', { name: 'Get Started' }).click();
  // Select Sunday for the day of exercising
  await page.locator('li').filter({ hasText: 'Sunday' }).getByRole('checkbox').click();
  // Proceed with the setup
  await page.getByRole('button', { name: 'Next' }).click();
  // Select two exercises for shoulders muscle group
  await page.locator('li').filter({ hasText: 'Shoulders' }).getByRole('checkbox').click();

  await page.getByRole('button', { name: 'Choose exercises' }).click();

  await page.locator('li').filter({ hasText: 'Standing upright rows' }).getByRole('checkbox').click();

  await page.locator('li').filter({ hasText: 'Face pulls' }).getByRole('checkbox').click();
  // End setup
  await page.getByRole('button', { name: 'Finish setup' }).click();
  // Click away from the modal element
  await page.getByRole('button', { name: 'Close' }).click();
  // Click exercises
  await page.locator('li').filter({ hasText: 'Standing upright rows' }).getByRole('checkbox').click();

  await page.locator('li').filter({ hasText: 'Face pulls' }).getByRole('checkbox').click();
  // End the workout
  await page.getByRole('button', { name: 'Complete your workout' }).click();
  // Check if the home view changes to desired output after completing the workout
  await expect(page.getByRole('heading', { name: 'Congratulations!' })).toHaveText('Congratulations!');

})

test('Change username', async ({ page }) => {
  // Go to hosting url
  await page.goto('http://localhost:5173');
  // Enter the user setup wizard for the app
  await page.getByRole('button', { name: 'Get Started' }).click();
  // Select Sunday for the day of exercising
  await page.locator('li').filter({ hasText: 'Sunday' }).getByRole('checkbox').click();
  // Proceed with the setup
  await page.getByRole('button', { name: 'Next' }).click();
  // Select two exercises for shoulders muscle group
  await page.locator('li').filter({ hasText: 'Shoulders' }).getByRole('checkbox').click();

  await page.getByRole('button', { name: 'Choose exercises' }).click();

  await page.locator('li').filter({ hasText: 'Standing upright rows' }).getByRole('checkbox').click();

  await page.locator('li').filter({ hasText: 'Face pulls' }).getByRole('checkbox').click();
  // End setup
  await page.getByRole('button', { name: 'Finish setup' }).click();
  // Click away from the modal element
  await page.getByRole('button', { name: 'Close' }).click();
  // Navigate to settings
  await page.getByTestId('settings').click();
  // Set new username
  await page.getByLabel('Username:').fill('TestUsername');
  // Press the button to set the username
  await page.getByRole('button', { name: 'Change username' }).click();
  // Click away the modal
  await page.getByRole('button', { name: 'Close' }).click();
  // Navigate back to the home view
  await page.getByTestId('home').click();
  // check if the new username exists in the home view
  await expect(page.getByTestId('username')).toHaveText('TestUsername');
})

test('Reset the whole app', async ({ page }) => {
  // Go to hosting url
  await page.goto('http://localhost:5173');
  // Enter the user setup wizard for the app
  await page.getByRole('button', { name: 'Get Started' }).click();
  // Select Sunday for the day of exercising
  await page.locator('li').filter({ hasText: 'Sunday' }).getByRole('checkbox').click();
  // Proceed with the setup
  await page.getByRole('button', { name: 'Next' }).click();
  // Select two exercises for shoulders muscle group
  await page.locator('li').filter({ hasText: 'Shoulders' }).getByRole('checkbox').click();

  await page.getByRole('button', { name: 'Choose exercises' }).click();

  await page.locator('li').filter({ hasText: 'Standing upright rows' }).getByRole('checkbox').click();

  await page.locator('li').filter({ hasText: 'Face pulls' }).getByRole('checkbox').click();
  // End setup
  await page.getByRole('button', { name: 'Finish setup' }).click();
  // Click away from the modal element
  await page.getByRole('button', { name: 'Close' }).click();
  // Navigate to settings
  await page.getByTestId('settings').click();
  // Set new username
  await page.getByRole('button', { name: 'Clear Local Storage (reset the app)' }).click();

  page.on('dialog', async dialog => {
    // Verify type of dialog
    expect(dialog.type()).toContain('alert');

    // verify message of alert
    expect(dialog.message()).toContain('This is an Alert Box.');

    //click on alert ok button
    await dialog.accept();
  });
  // Navigate back to the home view
  await page.getByTestId('home').click();
  // Test if get started button exists thus concluding the test
  await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible();
})
