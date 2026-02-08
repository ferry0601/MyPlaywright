// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries:1,
  timeout: 30*1000,
  expect:{
    timeout: 5000,
  },
  reporter: 'html',
  
    use: {
    browserName: 'chromium',
    headless: false,
    screenshot:'on', //only-on-failure
    video:'retain-on-failure',
    trace: 'on',
    ignoreHTTPSErrors:true,
    permissions:['geolocation'],
    // ...devices[''],
    // viewport:{width:720,height:720}
  },

 
});

